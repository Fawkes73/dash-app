import { Home, User, Search, Settings, MessageSquare, FileText, Menu, Sun, Moon } from "lucide-react";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Dashboard from "@/app/Components/Dashboardcard";
import Profile from "@/app/Components/Profile/Profile";
import UserComponent from "@/app/Components/User/User";
import Posts from "@/app/Components/Posts/Posts";
import Comments from "@/app/Components/Comments/Comments";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// Sidebar items
const items = [
  { title: "Dashboard", component: <Dashboard />, icon: Home },
  { title: "Profile", component: <Profile />, icon: User },
  { title: "Users", component: <UserComponent />, icon: User },
  { title: "Search", component: <div>Search Component</div>, icon: Search },
  { title: "Settings", component: <div>Settings Component</div>, icon: Settings },
  { title: "Posts", component: <Posts />, icon: FileText },
  { title: "Comments", component: <Comments />, icon: MessageSquare },
];

const SideMenu: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<Dashboard />);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div style={{ display: "flex", height: "100vh", background: isDarkMode ? "#000" : "#fff", color: isDarkMode ? "#fff" : "#000" }}>
      {/* Sidebar */}
      <Sidebar style={{ width: isCollapsed ? "60px" : "220px", height: "100vh", display: "flex", flexDirection: "column", background: isDarkMode ? "#000" : "#fff", color: isDarkMode ? "#fff" : "#000", transition: "width 0.3s ease" }}>
        <SidebarHeader style={{ padding: "20px", textAlign: "center", fontWeight: "bold", fontSize: "20px", borderBottom: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {!isCollapsed && "logo"}
          <Button variant="ghost" style={{ background: "transparent", border: "none", padding: 0 }} onClick={() => setIsCollapsed(!isCollapsed)}>
            <Menu size={20} color={isDarkMode ? "white" : "black"} />
          </Button>
          <Button variant="ghost" style={{ background: "transparent", border: "none", padding: 0 }} onClick={() => setTheme(isDarkMode ? "light" : "dark")}>
            {isDarkMode ? <Sun size={20} color="white" /> : <Moon size={20} color="black" />}
          </Button>
        </SidebarHeader>

        {/* Scrollable Content */}
        <SidebarContent style={{ flexGrow: 1, overflowY: "auto", padding: "10px" }}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    onClick={() => setActiveComponent(item.component)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "8px 15px", borderRadius: "5px", transition: "background 0.2s ease", color: isDarkMode ? "white" : "black" }}
                  >
                    <item.icon size={20} color={isDarkMode ? "white" : "black"} />
                    {!isCollapsed && <span style={{ fontSize: "16px" }}>{item.title}</span>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter style={{ padding: "15px", textAlign: "center", fontSize: "22", borderTop: "3px solid #ddd" }}>
          {!isCollapsed && "© 2025 Surve Mandar"}
        </SidebarFooter>
      </Sidebar>

      {/* Right-Side Dynamic Content */}
      <div style={{ flexGrow: 1, padding: "20px", width: "100%" }}>
        {activeComponent}
      </div>
    </div>
  );
};

export default SideMenu;
