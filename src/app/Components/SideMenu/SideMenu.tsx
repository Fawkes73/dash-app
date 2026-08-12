"use client";

import { Home, User, Search, Settings, MessageSquare, Youtube, Menu, Sun, Moon, Radio } from "lucide-react";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Dashboard from "@/app/Components/Dashboardcard";
import LiveStream from "@/app/Components/LiveStream/LiveStream";
import Profile from "@/app/Components/Profile/Profile";
import UserComponent from "@/app/Components/User/User";
import Videos from "@/app/Components/Videos/Videos";
import Comments from "@/app/Components/Comments/Comments";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// Sidebar items
const items = [
  { title: "Dashboard", component: <Dashboard />, icon: Home },
  { title: "Live Stream", component: <LiveStream />, icon: Radio },
  { title: "Profile", component: <Profile />, icon: User },
  { title: "Users", component: <UserComponent />, icon: User },
  { title: "Search", component: <div>Search Component</div>, icon: Search },
  { title: "Settings", component: <div>Settings Component</div>, icon: Settings },
  { title: "Videos", component: <Videos />, icon: Youtube },
  { title: "Comments", component: <Comments />, icon: MessageSquare },
];

const SideMenu: React.FC = () => {
  const [activeTitle, setActiveTitle] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const activeComponent = items.find((item) => item.title === activeTitle)?.component;

  return (
    <div className="flex h-full w-full bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar
        collapsible="none"
        className="border-r border-sidebar-border transition-[width] duration-200 ease-linear"
        style={{ width: isCollapsed ? "60px" : "220px" }}
      >
        <SidebarHeader className="flex flex-row items-center justify-between border-b border-sidebar-border px-3 py-4">
          {!isCollapsed && <span className="text-sm font-bold tracking-tight">DASH•APP</span>}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={activeTitle === item.title}
                      tooltip={isCollapsed ? item.title : undefined}
                      onClick={() => setActiveTitle(item.title)}
                      className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold"
                    >
                      <item.icon size={18} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border px-3 py-3 text-center text-xs text-sidebar-foreground/60">
          {!isCollapsed && "© 2026 Surve Mandar"}
        </SidebarFooter>
      </Sidebar>

      {/* Right-Side Dynamic Content */}
      <div className="flex-1 overflow-auto p-6">{activeComponent}</div>
    </div>
  );
};

export default SideMenu;
