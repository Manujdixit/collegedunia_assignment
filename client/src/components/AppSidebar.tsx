import {  HelpCircle, Home, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },  
  {
    title: "Help",
    url: "/help",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar>
      <div className="py-7 px-3 h-full bg-white dark:bg-neutral-950">
        <SidebarHeader className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-7">
          Notes
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton size="lg">
                      <NavLink
                        to={item.url}
                        onClick={() => handleClick(item.url)}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 block w-full"
                            : "text-gray-600 dark:text-gray-300 p-2 block w-full"
                        }
                      >
                        <div className="flex gap-3">
                          <item.icon className="h-6 w-6" />
                          <span className="text-base text-neutral-900 dark:text-neutral-100 font-bold">
                            {item.title}
                          </span>
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
