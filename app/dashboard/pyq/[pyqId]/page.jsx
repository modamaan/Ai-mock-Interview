"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const page = ({ params }) => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestionDetails();
  }, []);

  const getQuestionDetails = async () => {
    try {
      const res = await fetch(`/api/questions/${params.pyqId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch mock question details");
      }
      
      const result = await res.json();
      const parsedData = JSON.parse(result.MockQuestionJsonResp);
      setQuestionData(parsedData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load question details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 my-5 flex flex-col gap-4">
        <Skeleton className="h-14 w-full rounded-md" />
        <Skeleton className="h-14 w-full rounded-md" />
        <Skeleton className="h-14 w-full rounded-md" />
      </div>
    );
  }

  return (
    <div className="p-10 my-5">
      {questionData && questionData.length > 0 ? (
        <Accordion type="single" collapsible>
          {questionData.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index} className="mb-5">
              <AccordionTrigger className="text-left font-semibold">{item?.Question}?</AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md mt-2">
                {item?.Answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center text-gray-500 py-10">No questions data available.</div>
      )}
    </div>
  );
};

export default page;
