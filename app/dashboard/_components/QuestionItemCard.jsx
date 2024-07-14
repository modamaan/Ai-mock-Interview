import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };
  return (
    <div className="border border-gray-500 shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{question?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {question?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-400">Created At:{question.createdAt}</h2>

      <div className="flex justify-between mt-2 gap-5 ">
        <Button onClick={onStart} size="sm" className="w-full">
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;
