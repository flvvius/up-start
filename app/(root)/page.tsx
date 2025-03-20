import SearchForm from "../components/search-form";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
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
    </>
  );
}
