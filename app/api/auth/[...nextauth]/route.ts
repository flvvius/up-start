import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { writeClient } from "@/sanity/lib/write-client";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "github") {
          const { name, email, image } = user;
          const githubProfile = profile as any;
          const id = parseInt(githubProfile?.id?.toString(), 10);
          const login = githubProfile?.login;
          const bio = githubProfile?.bio || "";

          if (id) {
            const existingUser = await client
              .withConfig({
                useCdn: false, // Disable caching for this query
              })
              .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                id: id,
              });

            if (!existingUser) {
              await writeClient.create({
                _type: "author",
                id,
                name,
                username: login,
                email,
                image,
                bio: bio || "",
              });
            }
          }
        }
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const githubProfile = profile as any;
        const id = parseInt(githubProfile?.id?.toString(), 10);

        const user = await client
          .withConfig({
            useCdn: false, // Disable caching for this query
          })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: id,
          });
        if (user) {
          token.id = user?._id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
