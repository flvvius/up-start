import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../../components/search-form";
import StartupCard, { StartupTypeCard } from "../../components/startup-card";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const sesssion = await getServerSession(authOptions);
  console.log(sesssion);

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

  return (
    <>
      <section className="pink-container">
        <h1 className="heading">
          pitch your startup, <br /> connect with entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Join a community of entrepreneurs and get your startup in front of
          potential investors.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Results for "${query}"` : "All results"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No posts found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
