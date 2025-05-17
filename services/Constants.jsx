import {
  Calendar,
  LayoutDashboard,
  List,
  Settings,
  WalletCards,
} from "lucide-react";

import {
  Code2Icon,
  User2Icon,
  BriefcaseBusiness,
  Puzzle,
  ShieldCheckIcon, // Added for Leadership
} from "lucide-react"; // Adjust if you're using a different icon library

export const SideBarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Schedule Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: ShieldCheckIcon,
  },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.

Generate a list of high-quality interview questions based on the following inputs:

Job Title: {{jobTitle}}  
Job Description: {{jobDescription}}  
Interview Duration: {{duration}} minutes  
Interview Type: {{type}}  
Candidate Experience: {{experience}} (Fresher, 1–3 years, 3–5 years, or 5+ years)

📌 Instructions:
- Analyze the job description to extract required skills, responsibilities, and tools/technologies.
- Tailor the difficulty and depth of questions based on candidate experience:
  - **Fresher**: Focus on fundamentals, learning mindset, and academic/project experience.
  - **1–3 years**: Ask practical questions, real-world problem-solving, exposure to tools.
  - **3–5 years**: Cover system thinking, autonomy, tradeoffs in decisions, and ownership.
  - **5+ years**: Emphasize leadership, architecture, scalability, cross-team communication.
- Match questions to the interview type: e.g., technical interviews = focus on coding/system design; behavioral = focus on soft skills, decision-making.
- Scale the number of questions and their depth based on interview duration.
- Only include questions highly relevant to the role and candidate level.
- Categorize each question into: Technical, Behavioral, Experience, Problem Solving, or Leadership.
- Only include leadership questions if the job role or experience level (e.g., 5+ years) justifies it.

🧩 Output Format:  
Return **only** a JSON object in the format also append the job title, job description, interview duration, interview type, and experience level in the JSON Object.:

json
{
  "interviewQuestions": [
    {
      "question": "Your question here",
      "type": "Technical" | "Behavioral" | "Experience" | "Problem Solving" | "Leadership"
    }
  ]
}
`;
export const FEEDBACK_PROMPT = `{{conversation}}

Depends on this Interview Conversation between assitant and user, 

Give me feedback for user interview. Give me rating out of 10 for technical Skills, 

Communication, Problem Solving, Experince. Also give me summery in 3 lines 

about the interview and one line to let me know whether is recommanded 

for hire or not with msg. Give me response in JSON format

{

    feedback:{

        rating:{

            techicalSkills:5,

            communication:6,

            problemSolving:4,

            experince:7

        },

        summery:<in 3 Line>,

        Recommendation:'',

        RecommendationMsg:''



    }

}

`;
