"use client";

import { useEffect, useState } from "react";
import Page from "../../page";
import Header from "@/app/Components/Header/Header";
import SideMenu from "@/app/Components/SideMenu/SideMenu";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No valid session found. Redirecting to Login...");
      setIsAuthenticated(false); // Update authentication state
    } else {
      try {
        const { exp } = JSON.parse(atob(token));
        if (Date.now() > exp) {
          alert("Session expired. Redirecting to Login...");
          localStorage.removeItem("token"); // Clear expired token
          setIsAuthenticated(false); // Update authentication state
        }
      } catch (error) {
        console.error("Invalid token:", error);
        alert("Invalid session. Redirecting to Login...");
        localStorage.removeItem("token"); // Clear invalid token
        setIsAuthenticated(false); // Update authentication state
      }
    }
  }, []);

  if (!isAuthenticated) {
    return <Page />; // Render Login page when not authenticated
  }



  return (
    <section className="flex flex-col h-screen">
      {/* Fixed Header at the top */}
      <Header />

      {/* Sidebar & Dashboard Content */}
      <div className="flex flex-1">
        {/* Sidebar (Fixed width) */}
        <SidebarProvider>
          <div className="w-64">
            <SideMenu />
          </div>
        </SidebarProvider>


      </div>
    </section>

  );
}
