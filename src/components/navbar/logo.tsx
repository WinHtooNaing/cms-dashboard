import logo from "../../assets/logo/logo.png"

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { ChevronLeft, ChevronRight } from "lucide-react"

export function Logo() {
  const { state, toggleSidebar, isMobile } = useSidebar()

  const isCollapsed = state === "collapsed"

  return (
    <SidebarMenu className="w-full">
      <SidebarMenuItem
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <div className="flex-1">
            <img src={logo} alt="Company Logo" width={150} />
          </div>
        )}

        {!isMobile && (
          <button
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
