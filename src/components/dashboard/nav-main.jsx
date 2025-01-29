"use client"

import { ChevronRight } from "lucide-react"
import { NavLink } from "react-router"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
    features,
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Dashboard Features</SidebarGroupLabel>
            <SidebarMenu>
                {features.map((item) => {
                    console.log('item', item)
                    return (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild>
                                <NavLink to={item.url} >
                                    <item.icon />
                                    <span>{item.name}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
