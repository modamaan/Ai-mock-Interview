"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import QuestionItemCard from "./QuestionItemCard";

const QuestionList = () => {
  const { user } = useUser();
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    user && GetQuestionList();
  }, [user]);

  const GetQuestionList = async () => {
    const result = await db
      .select()
      .from(Question)
      .where(eq(Question.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Question.id));

    console.log(result);
    setQuestionList(result);
  };
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {questionList &&
          questionList.map((question, index) => (
            <QuestionItemCard key={index} question={question} />
          ))}
      </div>
    </div>
  );
};

export default QuestionList;
