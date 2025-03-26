import StartupForm from "@/components/startup-form";
import getServerSession from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit your startup</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default page;
