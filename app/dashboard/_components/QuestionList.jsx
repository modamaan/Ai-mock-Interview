"use client";
import React, { useEffect, useState } from "react";
import QuestionItemCard from "./QuestionItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const QuestionList = () => {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetQuestionList();
  }, []);

  const GetQuestionList = async () => {
    try {
      const res = await fetch("/api/questions/list");
      if (!res.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await res.json();
      setQuestionList(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load previous mock questions");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="my-10 flex flex-col gap-5">
        <Skeleton className="w-full sm:w-[20rem] h-10 rounded-full" />
        <Skeleton className="w-full sm:w-[20rem] h-10 rounded-full" />
      </div>
    );
  }

  return (
    <div>
      {questionList.length > 0 ? (
        <>
          <h2 className="font-medium text-xl">Previous Mock Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
            {questionList.map((question, index) => (
              <QuestionItemCard key={index} question={question} />
            ))}
          </div>
        </>
      ) : (
        <div className="my-10 flex flex-col gap-2 opacity-50">
          <p>No previous generated questions found.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
