import { AppSidebar } from "../components/navbar/app-sidebar"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Main() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <div className="px-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
