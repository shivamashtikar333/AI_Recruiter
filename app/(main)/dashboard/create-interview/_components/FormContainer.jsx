import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FormContainer = ({ onInputChange, GotoNext }) => {
  const [typeOfInterview, setTypeOfInterview] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");

  const experienceLevels = [
    { label: "Fresher", value: "fresher" },
    { label: "1–2 Years", value: "1-2" },
    { label: "3–5 Years", value: "3-5" },
    { label: "5+ Years", value: "5+" },
  ];

  const handleTypeSelection = (title) => {
    setTypeOfInterview((prev) => {
      if (prev.includes(title)) {
        return prev.filter((item) => item !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  useEffect(() => {
    onInputChange("InterviewType", typeOfInterview);
  }, [typeOfInterview]);

  useEffect(() => {
    onInputChange("ExperienceLevel", experienceLevel);
  }, [experienceLevel]);

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="Eg: Full Stack Developer"
          className="mt-2"
          onChange={(e) => onInputChange("JobPosition", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter Detail Description"
          className="mt-2 h-[150px]"
          onChange={(e) => onInputChange("JobDescription", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onInputChange("InterviewDuration", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 min">5 Minutes</SelectItem>
            <SelectItem value="15 min">15 Minutes</SelectItem>
            <SelectItem value="30 min">30 Minutes</SelectItem>
            <SelectItem value="45 min">45 Minutes</SelectItem>
            <SelectItem value="60 min">60 Minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Experience Level</h2>
        <Select onValueChange={(value) => setExperienceLevel(value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Experience Level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((exp) => (
              <SelectItem key={exp.value} value={exp.value}>
                {exp.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => {
            const isSelected = typeOfInterview.includes(type.title);
            return (
              <div
                key={index}
                className={`flex items-center gap-2 p-1 px-4 border rounded-2xl cursor-pointer transition
                  ${
                    isSelected
                      ? "bg-blue-50 border-blue-500 text-primary"
                      : "bg-white border-gray-300"
                  }
                  hover:bg-secondary`}
                onClick={() => handleTypeSelection(type.title)}
              >
                <type.icon className="h-4 w-4" />
                <span className="text-sm">{type.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-7 flex justify-end">
        <Button className="cursor-pointer" onClick={() => GotoNext()}>
          Generate Question <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
