import { cache } from "react";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { courses, userProgress } from "./schema";
import { eq } from "drizzle-orm";

// Fetches user progress for the authenticated user
export const getUserProgress = cache(async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null; // Return null if no userId is found
    }

    // Query the userProgress table and include related activeCourse data
    const data = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    throw error; // Rethrow error to handle it at a higher level if needed
  }
});

// Fetches all courses
export const getCourses = cache(async () => {
  try {
    // Query the courses table to get all course records
    const data = await db.select().from(courses);
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // Rethrow error to handle it at a higher level if needed
  }
});

export const getCourseById = cache(async (courseId: number) => {
  try {
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
      //Populate units and lessons
    });
    return data;
  } catch (error) {
    console.error("Error fetching Courses By Id:", error);
    throw error;
  }
});
