"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useUser } from "./provider";

const HomePage = () => {
  const router = useRouter();
  const { user } = useUser;

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">
        <div className="text-2xl font-bold text-primary">AIcruiter</div>
        <Button
          onClick={() => router.push("/signin")}
          className="px-6 py-2 text-white bg-primary hover:bg-primary/90"
        >
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-blue-100 to-white">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          AI-Driven Interviews, <br /> Hassle-Free Hiring
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Create, send, and manage interviews in minutes with smart automation.
        </p>
        <Button
          onClick={() => {
            if (user) {
              router.push("/dashboard");
            } else {
              router.push("/auth");
            }
          }}
          className="mt-6 px-6 py-3 text-white bg-primary hover:bg-primary/90"
        >
          Get Started <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </section>

      <section className="py-16 px-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg text-primary">Create Interviews</h3>
          <p className="mt-2 text-sm text-gray-600">
            Build structured interviews for any role in seconds.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg text-primary">Track Candidates</h3>
          <p className="mt-2 text-sm text-gray-600">
            Manage and review candidate reports with AI-generated feedback.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg text-primary">
            Automate Follow-ups
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Send invites and follow-ups effortlessly from one dashboard.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} AIcruiter. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
