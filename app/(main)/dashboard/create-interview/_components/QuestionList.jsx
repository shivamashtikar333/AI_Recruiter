"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import axios from "axios";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const QuestionList = ({
  formData,
  onCreateLink,
  questionList,
  setQuestionList,
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

  const generateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });

      const parsed = result.data.result;
      const FINAL_PARSED = parsed.replace("```json", "").replace("```", "");
      const PARSED_DATA = JSON.parse(FINAL_PARSED);
      const PARSED_INTERVIEW_QUESTIONS = PARSED_DATA.interviewQuestions;

      setQuestionList(PARSED_INTERVIEW_QUESTIONS);
      setLoading(false);
    } catch (error) {
      toast.error("Server Error", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
      console.log("Error", error);
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    setQuestionList((prev) => prev.filter((_, i) => i !== index));
  };

  const onFinish = async () => {
    const interview_id = uuidv4();

    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          JobPosition: formData.JobPosition,
          JobDescription: formData.JobDescription,
          InterviewDuration: formData.InterviewDuration,
          InterviewType: formData.InterviewType,
          ExperienceLevel: formData.ExperienceLevel,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();

    // Update user Query

    if (error) {
      toast.error("Failed to create interview");
      console.error("Supabase Error:", error);
      return;
    }

    onCreateLink(interview_id);
  };

  return (
    <div className="relative p-5 bg-blue-50 rounded-xl shadow-md border border-gray-100">
      {loading ? (
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-12 h-12">
            <Loader2Icon className="animate-spin text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-800">
              Generating Interview Questions
            </h2>
            <p className="text-sm text-blue-700">
              Our AI is crafting personalized questions based on your job
              position and job description.
            </p>
          </div>
        </div>
      ) : questionList.length > 0 ? (
        <>
          <h2 className="text-xl font-bold mb-4 text-blue-800">
            Generated Interview Questions
          </h2>
          <ul className="list-disc pl-5 space-y-3">
            {questionList.map((q, index) => (
              <li key={index} className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-gray-800">{q.type}:</span>{" "}
                  {q.question}
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="ml-3 text-red-500 hover:text-red-700 cursor-pointer"
                  title="Delete question"
                >
                  <Trash2Icon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
              onClick={onFinish}
            >
              Create Interview Link & Finish
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No questions generated yet.</p>
      )}
    </div>
  );
};

export default QuestionList;
