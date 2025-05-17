import React from "react";
import { CheckCircle } from "lucide-react"; // or use another icon library
import Image from "next/image";
import interviewIllustration from "@/public/interview-complete.png"; // Replace with your image path

const InterviewComplete = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      {/* Green checkmark */}
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />

      {/* Title */}
      <h1 className="text-3xl font-bold text-black mb-2">
        Interview Complete!
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6">
        Thank you for participating in the AI-driven interview with{" "}
        <span className="font-semibold">AIcruiter</span>
      </p>

      {/* Illustration */}
      <div className="mb-6">
        <Image
          src={interviewIllustration}
          alt="Interview Illustration"
          width={600}
          height={300}
          className="rounded-xl"
        />
      </div>

      {/* What's Next Section */}
      <div className="bg-gray-100 p-6 rounded-lg max-w-md w-full shadow-md">
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 p-3 rounded-full mb-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10l11 2-11 2v2l18-4-18-4v2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">What's Next?</h2>
          <p className="text-gray-600 text-sm">
            The recruiter will review your interview responses and will contact
            you soon regarding the next steps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewComplete;
