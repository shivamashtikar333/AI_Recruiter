import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CandidateFeedbackDialog = ({ candidate, onFeedbackChange }) => {
  const feedback = candidate?.feedback?.feedback;

  const overallFeedback =
    (feedback?.rating?.technicalSkills ?? 0) +
    (feedback?.rating?.communication ?? 0) +
    (feedback?.rating?.problemSolving ?? 0) +
    (feedback?.rating?.experience ?? 0);

  const average = feedback ? overallFeedback / 4 : null;

  useEffect(() => {
    if (onFeedbackChange && candidate?.userEmail && average !== null) {
      onFeedbackChange(candidate.userEmail, average);
    }
  }, [candidate?.userEmail, average, onFeedbackChange]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className={"text-primary"}>
            View Report
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription asChild>
              <div>
                {/* Candidate Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <h2 className="bg-primary p-3 px-4.5 font-bold rounded-full text-white">
                      {candidate.userName[0]}
                    </h2>
                    <div>
                      <h2 className="font-bold">{candidate?.userName}</h2>
                      <h2 className="text-sm text-gray-500">
                        {candidate?.userEmail}
                      </h2>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <h2 className="text-primary font-bold text-lg">
                      {average?.toFixed(1) ?? "N/A"}/10
                    </h2>
                  </div>
                </div>

                {/* Skill Assessment */}
                <div className="mt-5">
                  <h2 className="font-bold">Skill Assessment</h2>
                  <div className="mt-3 grid grid-cols-2 gap-10">
                    {[
                      "technicalSkills",
                      "communication",
                      "problemSolving",
                      "experience",
                    ].map((skill) => (
                      <div key={skill}>
                        <h2 className="flex justify-between">
                          {skill
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          <span>{feedback?.rating?.[skill] ?? 0}/10</span>
                        </h2>
                        <Progress
                          value={(feedback?.rating?.[skill] ?? 0) * 10}
                          className={"mt-1"}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-5">
                  <h2 className="font-bold">Performance Summary</h2>
                  <div className="p-5 bg-seconadry my-2 rounded-md">
                    <p>{feedback?.summary}</p>
                  </div>
                </div>

                {/* Recommendation */}
                <div
                  className={`p-5 rounded-md ${
                    feedback?.Recommendation === "Not Recommended"
                      ? "bg-red-100"
                      : "bg-green-100"
                  }`}
                >
                  <h2
                    className={`${
                      feedback?.Recommendation === "Not Recommended"
                        ? "text-red-700"
                        : "text-green-700"
                    } font-bold`}
                  >
                    Recommendation
                  </h2>
                  <p
                    className={`${
                      feedback?.Recommendation === "Not Recommended"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {feedback?.RecommendationMsg}
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CandidateFeedbackDialog;
