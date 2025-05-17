"use client";
import { LoaderCircle, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Vapi from "@vapi-ai/web";
import { AlertConfirmation } from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient"; // Adjust the import path as necessary

const StartInterview = () => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false); // Optional for simulation
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  const startCall = () => {
    let questionList = "";
    interviewInfo?.interviewData?.questionList.forEach((item) => {
      questionList = item?.question + "," + questionList;
    });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.JobPosition +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: ` You are an AI voice assistant conducting interviews.
              Your job is to ask candidates provided interview questions and assess their responses.
              Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
              "Hey there! Welcome to your ${interviewInfo?.interviewData?.JobPosition} interview. Let’s get started with a few questions!"
              Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise.
              Questions: ${questionList}
              If the candidate struggles, offer hints or rephrase the question without giving away the answer.
              Provide brief, encouraging feedback after each answer.
              Keep the conversation natural and engaging.
              After 5-7 questions, wrap up the interview smoothly by summarizing their performance.
              End on a positive note:
              "Thanks for chatting! Hope to see you crushing projects soon!"
              Key Guidelines:
              ✅ Be friendly, engaging, and witty 🎤
              ✅ Keep responses short and natural, like a real conversation
              ✅ Adapt based on the candidate’s confidence level
              ✅ Ensure the interview remains focused on React`.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setSecondsElapsed(0); // Reset the timer
  };

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const stopInterview = async () => {
    setLoading(true);
    vapi.stop();
  };

  useEffect(() => {
    const handleMessage = (message) => {
      console.log("Message from VAPI:", message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message?.conversation);
        console.log("Conversation String:", convoString);
        setConversation(convoString);
      }
    };
    vapi.on("message", handleMessage);
    vapi.on("call-start", () => {
      console.log("Call has started");
      toast.success("Call has started");
      startTimer();
    });

    vapi.on("speech-start", () => {
      console.log("Assistant speech has started");
      setAiSpeaking(true);
      setUserSpeaking(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended");
      setAiSpeaking(false);
      // Optionally simulate user speaking briefly after AI
      setUserSpeaking(true);
      setTimeout(() => setUserSpeaking(false), 2500); // Clear after 2.5s
    });

    vapi.on("call-end", () => {
      console.log("Call has ended");
      toast.success("Interview has ended");
      setLoading(false);
      stopTimer();
      GenerateFeedback();
    });

    return () => {
      vapi.off("message", handleMessage); // Clean up the event listener
      vapi.off("call-start", () => console.log("Call has ended"));
      vapi.off("speech-start", () => console.log("Call has ended"));
      vapi.off("speech-end", () => console.log("Call has ended"));
      vapi.off("call-end", () => console.log("Call has ended"));
      // Stop the interview when the component unmounts
    };
  }, []);
  // Various assistant messages can come back (like function calls, transcripts, etc)

  const GenerateFeedback = async () => {
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });
    console.log("Feedback Result:", result?.data);
    const Content = result?.data?.result;
    const FINAL_CONTENT = Content?.replace("```json", "").replace("```", "");
    console.log("Final Content:", FINAL_CONTENT);

    // save feedback to database

    const { data, error } = await supabase
      .from("interview-feedback")
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: JSON.parse(FINAL_CONTENT),
          recommendation: false,
        },
      ])
      .select();
    console.log("Feedback Data:", data, error);
    router.push("/interview/" + interview_id + "/completed");
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <div className="p-20 lg:px-48 xl:px-56">
        <h2 className="font-bold text-xl flex justify-between">
          AI Interview Session
          <span className="flex gap-2 items-center">
            <Timer /> {formatTime(secondsElapsed)}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-10">
          {/* AI Section */}
          <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center relative">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {aiSpeaking && (
                <span className="absolute w-full h-full rounded-full bg-blue-500 opacity-75 animate-ping" />
              )}
              <Image
                src="/ai.avif"
                alt="ai"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover z-10"
              />
            </div>
            <h2 className="mt-2">AI Recruiter</h2>
          </div>

          {/* User Section */}
          <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center relative">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {userSpeaking && (
                <span className="absolute w-full h-full rounded-full bg-green-500 opacity-75 animate-ping" />
              )}
              <div className="text-2xl bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center z-10">
                {interviewInfo?.userName?.[0] || "U"}
              </div>
            </div>
            <h2 className="mt-2">{interviewInfo?.userName}</h2>
          </div>
        </div>

        <div className="flex items-center gap-5 justify-center mt-10">
          <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
          <AlertConfirmation stopInterview={() => stopInterview()}>
            {loading ? (
              <LoaderCircle className="h-12 w-12" />
            ) : (
              <Phone className="h-12 w-12 p-3 bg-red-600 rounded-full text-white cursor-pointer" />
            )}
          </AlertConfirmation>
        </div>

        <h2 className="text-sm text-gray-400 text-center mt-5">
          Interview in Progress...
        </h2>
      </div>
    </div>
  );
};

export default StartInterview;
