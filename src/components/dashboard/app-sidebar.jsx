"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import LogoSvg from '../../assets/logo.svg'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { NavMain } from "./nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "./nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,              
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "ကာကွယ်ရေးဝန်ကြီးဌာန",
    email: "hr@mod.nug",
    avatar: "/src/assets/flag.svg",
  },
  features: [
    {
        name: "ခြုံငုံသုံးသပ်ခြင်း",
        url: "/dashboard",
        icon: PieChart,
    },
    {
        name: "ခန့်အပ်မှုအခြေနေများ",
        url: "/dashboard/units",
        icon: Frame,
    },
    {
      name: "ရာထူးခြုံငုံသုံးသပ်ခြင်း",
      url: "/dashboard/positions",
      icon: Frame,
    }
],
//   navMain: [
//     {
//       title: "ခြုံငုံသုံးသပ်ခြင်း",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//     },
//     {
//       title: "ခန့်အပ်မှု အခြေနေများ",
//       url: "#",
//       icon: Bot,
//     }
//   ]
}


export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} className="z-30">
      <SidebarHeader>
      <div className="flex items-center gap-4">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                        <Avatar className="h-10 w-10 rounded-lg">
                            <AvatarImage src={LogoSvg} alt={"someone"} className="scale-105" />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h3 className="font-semibold">ကာကွယ်ရေး ဝန်ကြီးဌာန</h3>
                        <p className="text-xs text-muted-foreground">Ministry of Defense</p>
                    </div>
                </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain features={data.features} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
