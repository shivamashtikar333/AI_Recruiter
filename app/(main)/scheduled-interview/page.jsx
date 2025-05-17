"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import { CameraIcon } from "lucide-react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Button } from "@/components/ui/button";

const ScheduledInterview = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        "JobPosition, InterviewDuration, interview_id, interview-feedback(userEmail)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    console.log(result);
    setInterviewList(result.data);
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-xl">
        Interview List with Candidate Feedback
      </h2>
      {interviewList?.length === 0 ? (
        <div className="p-5 flex flex-col items-center gap-3 mt-5 bg-white rounded-xl shadow-md">
          <CameraIcon className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>Create New Interview</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {interviewList.map((interview, index) => (
            <InterviewCard
              key={index}
              interview={interview}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduledInterview;
