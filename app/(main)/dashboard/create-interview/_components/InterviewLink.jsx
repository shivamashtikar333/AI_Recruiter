import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Clock, Copy, List, Mail, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

const InterviewLink = ({ interview_id, formData, questionList }) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link Copied to Clipboard", {
      style: {
        background: "#d1fae5",
        color: "#065f46",
        border: "1px solid #bbf7d0",
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/check.png"}
        alt="check"
        width={200}
        height={200}
        className="w-[50px] h-[50px]"
      />
      <h2 className="font-bold text-lg mt-4"> Your AI Interview is Ready</h2>
      <p className="mt-3">
        Share this Link with your candidates to start the interview process
      </p>

      <div className="w-full p-7 mt-6 rounded-xl bg-white shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-4xl">
            Valid for 30 Days
          </h2>
        </div>

        <div className="mt-3 flex gap-3 items-center">
          <Input defaultValue={url} disabled />
          <Button onClick={onCopyLink} className="cursor-pointer">
            <Copy /> Copy Link
          </Button>
        </div>

        <hr className="my-7" />

        <div className="flex gap-5">
          <h3 className="text-sm text-gray-500 flex gap-3 items-center">
            <Clock className="h-4 w-4" />
            {formData?.InterviewDuration || "N/A"}
          </h3>
          <h3 className="text-sm text-gray-500 flex gap-3 items-center">
            <List className="h-4 w-4" />
            {questionList?.length ?? 0}{" "}
            {questionList?.length === 1 ? "Question" : "Questions"}
          </h3>
        </div>
      </div>

      <div className="mt-7 bg-white p-5 rounded-xl shadow-md w-full">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-5 mt-4 justify-evenly">
          <Button variant={"outline"} className="cursor-pointer">
            <Mail /> Email
          </Button>
          <Button variant={"outline"} className="cursor-pointer">
            <Mail /> Slack
          </Button>
          <Button variant={"outline"} className="cursor-pointer">
            <Mail /> WhatsApp
          </Button>
        </div>
      </div>

      <div className="flex w-full gap-5 justify-between items-center mt-5">
        <Link href={"/dashboard"}>
          <Button variant={"outline"} className="cursor-pointer">
            <ArrowLeft className="mr-2" /> Back to Dashboard
          </Button>
        </Link>
        <Link href={"/create-interview"}>
          <Button className="cursor-pointer">
            <Plus className="mr-2" /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewLink;
