import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSideBar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

const DashboardProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="md:hidden p-4">
          <SidebarTrigger />
        </div>
        <div className="mt-10 mx-10">
          <WelcomeContainer />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardProvider;
