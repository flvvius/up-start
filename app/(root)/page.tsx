import SearchForm from "../../components/search-form";
import StartupCard from "../../components/startup-card";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: "2024-01-01",
      _id: "1",
      title: "We Robotics",
      category: "Robotics",
      description: "Description 1",
      author: {
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      },
      image: "https://via.placeholder.com/150",
      views: 100,
    },
    {
      _createdAt: "2024-01-01",
      _id: "1",
      title: "We AI",
      category: "AI",
      description: "Description 2",
      author: {
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      },
      image: "https://via.placeholder.com/150",
      views: 100,
    },
    {
      _createdAt: "2024-01-01",
      _id: "1",
      title: "AI is the future",
      category: "AI",
      description: "Description 3",
      author: {
        name: "John Doe",
        image: "https://via.placeholder.com/150",
      },
      image: "https://via.placeholder.com/150",
      views: 100,
    },
  ];

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
            posts.map((post: StartupsCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No posts found</p>
          )}
        </ul>
      </section>
    </>
  );
}
