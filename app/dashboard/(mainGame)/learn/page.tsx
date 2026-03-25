export const dynamic = "force-dynamic";

import React from "react";
import { getUserProgress } from "@/utils/queries";
import { redirect } from "next/navigation";
import MobileHeader from "@/components/MobileHeader";
import StickyWrapper from "@/components/StickyWrapper";
import FeedWrapper from "@/components/FeedWrapper";
import GameHeader from "../../_components/(GameComponents)/GameHeader";
import UserProgress from "../../_components/(GameComponents)/UserProgress";


const MainGame = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/dashboard/courses")
  }
  return (
    <div>
      <MobileHeader />
      <div className="flex flex-row-reverse gap-[58px] px-6 pt-5">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={false}
          />
        </StickyWrapper>
        <FeedWrapper>
          <GameHeader title={userProgress.activeCourse.title} />
          <div className="space-y-4"></div>
        </FeedWrapper>
      </div>
    </div>
  );
};

export default MainGame;
