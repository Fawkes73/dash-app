import Header from "@/app/Components/Header/Header";
import SideMenu from "@/app/Components/SideMenu/SideMenu";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <section className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <SideMenu />
        </SidebarProvider>
      </div>
    </section>
  );
}
