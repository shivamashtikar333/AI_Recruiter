"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { CameraIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

const LatestInterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false })
      .limit(6);

    console.log(Interviews);
    setInterviewList(Interviews);
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl">Previously Created Interview</h2>
      {interviewList?.length === 0 ? (
        <div className="p-5 flex flex-col items-center gap-3 mt-5 bg-white rounded-xl shadow-md">
          <CameraIcon className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>Create New Interview</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {interviewList.map((interview, index) => (
            <InterviewCard key={index} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestInterviewList;
