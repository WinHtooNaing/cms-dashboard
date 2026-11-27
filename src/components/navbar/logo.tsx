import fallbackLogo from "../../assets/logo/logo.png"

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSiteLogo } from "@/hooks/cms/useSiteSettings"

export function Logo() {
  const { state, toggleSidebar, isMobile } = useSidebar()
  const { data: logoData } = useSiteLogo()

  const isCollapsed = state === "collapsed"

  const logo = logoData?.imageUrl || fallbackLogo
  const alt = logoData?.alt || "Company Logo"

  return (
    <SidebarMenu className="w-full">
      <SidebarMenuItem
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <div className="flex-1">
            <img
              src={logo}
              alt={alt}
              width={150}
              className="h-auto max-w-full object-contain"
              onError={(event) => {
                event.currentTarget.src = fallbackLogo
              }}
            />
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
