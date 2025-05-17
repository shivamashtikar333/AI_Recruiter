import { Calendar, Clock } from "lucide-react";
import React from "react";
import moment from "moment";

const InterviewDetailContainer = ({ interviewDetail }) => {
  console.log(interviewDetail?.questionList, "question List");
  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      <h2>{interviewDetail?.JobPosition}</h2>

      <div className="mt-4 flex justify-between">
        <div>
          <h2 className="text-sm text-gray-500">Duration</h2>
          <h2 className="flex text-sm font-bold items-center gap-3">
            <Clock className="h-4 w-4" />
            {interviewDetail?.InterviewDuration}
          </h2>
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Creted On</h2>
          <h2 className="flex text-sm font-bold items-center gap-3">
            <Calendar className="h-4 w-4" />
            {moment(interviewDetail?.created_at).format("MMM DD, YYYY")}
          </h2>
        </div>
        {interviewDetail?.InterviewType && (
          <div>
            <h2 className="text-sm text-gray-500">Interview Type</h2>
            <h2 className="flex text-sm font-bold items-center gap-3">
              <Clock className="h-4 w-4" />
              {JSON.parse(interviewDetail?.InterviewType)[0]}
            </h2>
          </div>
        )}
      </div>
      <div className="mt-5">
        <h2 className="font-bold">Job Description</h2>
        <p className="text-sm leading-6">{interviewDetail?.JobDescription}</p>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">Interview Questions</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {interviewDetail?.questionList?.map((item, index) => (
            <h2 className="text-xs flex" key={index}>
              {index + 1}. {item?.question}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailContainer;
