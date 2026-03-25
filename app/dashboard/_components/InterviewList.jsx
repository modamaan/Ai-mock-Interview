"use client";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await fetch("/api/interviews/list");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setInterviewList(data);
    } catch {
      // silently fail — user just won't see the list
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : interviewList.length === 0 ? (
        <p className="text-gray-500 my-3">No interviews yet. Create one above!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
