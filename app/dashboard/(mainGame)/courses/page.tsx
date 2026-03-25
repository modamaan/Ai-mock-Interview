export const dynamic = "force-dynamic";

import MobileHeader from "@/components/MobileHeader";
import { getCourses, getUserProgress } from "@/utils/queries";
import React from "react";
import { List } from "./list";

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);
  return (
    <div className="lg:my-5 lg:ml-8">
      <MobileHeader />
      <div className="h-full max-w-[912px] px-3 mx-auto ">
        <h1 className="text-2xl font-bold text-neutral-700">
          Language Courses
        </h1>
      </div>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
