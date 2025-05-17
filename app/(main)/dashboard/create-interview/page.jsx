"use client";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";

const CreateInterview = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [InterviewID, setInterviewID] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const router = useRouter();

  const onInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onGoToNext = () => {
    if (
      !formData?.JobPosition ||
      !formData?.JobDescription ||
      !formData?.InterviewDuration ||
      !formData?.ExperienceLevel ||
      !formData?.InterviewType
    ) {
      toast.error("Please fill all the fields", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (interview_id) => {
    setInterviewID(interview_id);
    setStep(step + 1);
  };

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />

      {step === 1 ? (
        <FormContainer onInputChange={onInputChange} GotoNext={onGoToNext} />
      ) : step === 2 ? (
        <QuestionList
          formData={formData}
          onCreateLink={onCreateLink}
          setQuestionList={setQuestionList}
          questionList={questionList}
        />
      ) : step === 3 ? (
        <InterviewLink
          interview_id={InterviewID}
          formData={formData}
          questionList={questionList}
        />
      ) : null}
    </div>
  );
};

export default CreateInterview;
