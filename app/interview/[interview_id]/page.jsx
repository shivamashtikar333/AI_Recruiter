"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { useRouter } from "next/navigation";

const Interview = () => {
  const { interview_id } = useParams();
  console.log(interview_id);

  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { InterviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select(
          "JobPosition, JobDescription, InterviewDuration, ExperienceLevel"
        )
        .eq("interview_id", interview_id);

      setInterviewData(Interviews[0]);
      console.log("data", Interviews[0]);
      setLoading(false);

      if (Interviews.length === 0) {
        toast.error("Interview not found", {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            border: "1px solid #fca5a5",
          },
        });
      }
    } catch (error) {
      toast.error("Incorrect Interview Link", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
    }
    setLoading(false);
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interview_id);
    console.log("interview", Interviews[0]);
    if (error) {
      toast.error("Error fetching interview data", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
      setLoading(false);
      return;
    }
    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0],
    });
    router.push("/interview/" + interview_id + "/start");

    setLoading(false);
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-10 ">
      <div className="flex flex-col justify-center items-center border rounded-xl bg-white px-6 py-6 w-full max-w-2xl mx-auto ">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[140px] mt-3"
        />
        <h2 className="mt-3">AI-Powered Interview Platform</h2>
        <Image
          src={"/interview.webp"}
          alt="interview"
          width={500}
          height={500}
          className="w-[280px] my-6"
        />
        <h2 className="text-xl font-bold mb-2">{interviewData?.JobPosition}</h2>
        <h2 className="flex gap-2 items-center text-gray-500 ">
          <Clock className="h-4 w-4 mt-0.5" />
          {interviewData?.InterviewDuration}
        </h2>
        <div className="w-full">
          <h2 className="text-md ">Enter your full name</h2>
          <Input
            placeholder="e.g. John Smith"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <h2 className="text-md ">Enter your Email</h2>
          <Input
            placeholder="e.g. john@gmail.com"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="p-3 bg-blue-100 flex gap-4 rounded-lg m-4">
          <Info className="text-primary" />
          <div>
            <h2 className="font-bold">Before you begin</h2>
            <ul>
              <li className="text-sm text-primary">
                - Test your camera and microphone
              </li>
              <li className="text-sm text-primary">
                - Ensure you have a stable internet connection
              </li>
              <li className="text-sm text-primary">
                - Find a Quiet place for interview
              </li>
            </ul>
          </div>
        </div>
        <Button
          className={"mt-3 mb-7 w-full font-bold"}
          disabled={loading || !userName}
          onClick={() => onJoinInterview()}
        >
          <Video /> {loading && <Loader2Icon />} Join Interview
        </Button>
      </div>
    </div>
  );
};

export default Interview;
