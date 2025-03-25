"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
export const createPitch = async (
  state: any,
  formData: FormData,
  pitch: string
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return parseServerActionResponse({
      error: "Unauthorized",
      status: "ERROR",
    });
  }

  const userId = (session as any).id;

  if (!userId) {
    console.error("Session doesn't contain user ID:", session);
    return parseServerActionResponse({
      error: "User ID not found in session",
      status: "ERROR",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(formData).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      pitch,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: userId,
      },
      views: 0,
    };

    console.log("Creating startup:", startup);

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      status: "SUCCESS",
      error: "",
    });
  } catch (error) {
    console.error("Error creating startup:", error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
