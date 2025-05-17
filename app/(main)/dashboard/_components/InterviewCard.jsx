// "use client";
import React from "react";
import moment from "moment";
import { Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const InterviewCard = ({ interview, viewDetail = false }) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
  const CopyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard!");
    // alert("Link copied to clipboard!");
  };
  console.log("interview", interview);

  const onSend = () => {
    const url =
      process.env.NEXT_PUBLIC_HOST_URL +
      "/interview/" +
      interview?.interview_id;

    window.location.href =
      `mailto:${interview?.userEmail}?subject=` +
      encodeURIComponent("AiCruiter Link") +
      `&body=` +
      encodeURIComponent("Interview Link: " + url);
  };

  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
        <h2>{moment(interview?.created_at).format("MMM DD, YYYY")}</h2>
      </div>
      <h2 className="mt-3 font-bold text-lg">{interview?.JobPosition}</h2>
      <h2 className="mt-2 flex justify-between text-gray-500">
        {interview?.InterviewDuration}{" "}
        <span className="text-green-400">
          {interview["interview-feedback"]?.length} Candidates
        </span>
      </h2>
      <h2 className="text-xs text-gray-500 mt-2">
        {interview?.ExperienceLevel}
      </h2>
      {!viewDetail ? (
        <div className="flex justify-center gap-3 w-full mt-3">
          <div className="w-full">
            <Button variant="outline" className="w-full" onClick={CopyLink}>
              <Copy /> Copy
            </Button>
          </div>
          <div className="w-full">
            <Button className="w-full" onClick={onSend}>
              <Send /> Send
            </Button>
          </div>
        </div>
      ) : (
        <Link
          href={"/scheduled-interview/" + interview?.interview_id + "/details"}
        >
          <Button className={"mt-5 w-full"}>View Detail</Button>
        </Link>
      )}
    </div>
  );
};

export default InterviewCard;
