import Ping from "@/components/ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  const response = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  const totalViews = response?.views || 0;

  Promise.resolve().then(async () => {
    try {
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit();
    } catch (error) {
      console.error("Failed to update view count:", error);
    }
  });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">
          {totalViews > 1 ? `${totalViews} views` : `${totalViews} view`}
        </span>
      </p>
    </div>
  );
};
export default View;
