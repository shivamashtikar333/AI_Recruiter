"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidateList from "./_components/CandidateList";

const InterviewDetail = () => {
  const { interview_id } = useParams();

  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState([]);

  useEffect(() => {
    user && GetInterviewDetails();
  }, [user]);

  const GetInterviewDetails = async () => {
    console.log("interview_id param:", interview_id, typeof interview_id);

    const result = await supabase
      .from("Interviews")
      .select(
        "created_at, JobDescription, JobPosition, InterviewType, InterviewDuration, interview_id, questionList, interview-feedback(userEmail, userName, feedback, created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);
    console.log(result);
    setInterviewDetail(result?.data[0]);
  };
  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidateList={interviewDetail["interview-feedback"]} />
    </div>
  );
};

export default InterviewDetail;
