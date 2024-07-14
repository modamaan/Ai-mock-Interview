import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddQuestions from "../_components/AddQuestions";
import QuestionList from "../_components/QuestionList";

const Questions = () => {
  return (
    <div className="p-10" >
      <h2 className="font-bold text-2xl" >Master Your Interviews</h2>
      <h2 className="text-gray-500" >Comprehensive Question Preparation with AI</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5" >
        <AddQuestions/>
      </div>

      <QuestionList/>
    </div>
  );
};

export default Questions;