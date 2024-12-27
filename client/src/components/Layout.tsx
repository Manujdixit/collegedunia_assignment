import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "./Header";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-[#F6F8FA] dark:bg-neutral-950 w-screen h-screen overflow-auto">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full h-full">
          <div className="w-full flex items-center justify-between sticky top-0 bg-[#F6F8FA] dark:bg-neutral-950 z-40 p-3 border-b border-neutral-200 dark:border-neutral-800">
            <SidebarTrigger className="text-neutral-900 dark:text-neutral-100" onClick={handleClick} size="lg" />
            <Header />
          </div>
          <div className="px-4 pb-4 rounded-xl">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
