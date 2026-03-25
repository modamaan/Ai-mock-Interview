"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/utils/db";
import { getCourseById, getUserProgress } from "@/utils/queries";
import { userProgress } from "@/utils/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db
      .update(userProgress)
      .set({
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/logo.svg",
      })
      .where(eq(userProgress.userId, userId)); // ← was missing: updated ALL users before

    revalidatePath("/dashboard/courses");
    revalidatePath("/dashboard/learn");
    redirect("/dashboard/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/logo.svg",
  });

  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/learn");
  redirect("/dashboard/learn");
};

