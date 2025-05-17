import { Button } from "@/components/ui/button";
import React from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

const CandidateList = ({ candidateList }) => {
  console.log(candidateList, "Candidate List");

  return (
    <div className="">
      <h2 className="font-bold my-5">Candidates ({candidateList?.length})</h2>
      {candidateList?.map((candidate, index) => (
        <div
          key={index}
          className="p-5 flex justify-between gap-3 items-center bg-white"
        >
          <div className="flex items-center gap-5">
            <h2 className="bg-primary p-3 px-4.5 font-bold rounded-full text-white">
              {candidate.userName[0]}
            </h2>
            <div>
              <h2 className="font-bold">{candidate?.userName}</h2>
              <h2 className="text-sm text-gray-500">Completed</h2>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <CandidateFeedbackDialog candidate={candidate} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
