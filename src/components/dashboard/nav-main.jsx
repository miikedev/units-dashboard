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
import { fetchPositions } from "@/apis/positions"
import { QueryClient } from "@tanstack/react-query"
const queryClient = new QueryClient();
export function NavMain({
    features,
}) {
    const prefetchedPositions = async () => {
            try {
              // Prefetch the data using React Query
              await queryClient.prefetchQuery({
                queryKey: ['positions'],
                queryFn: () => fetchPositions(),
                staleTime: 2 * 1000, // Data will be fresh for 5 seconds
              });
            } catch (error) {
              console.error("Prefetch failed:", error);
              // Handle error appropriately
            }
          };
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Dashboard Features</SidebarGroupLabel>
            <SidebarMenu>
                {features.map((item) => {
                    console.log('item', item)
                    return (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild>
                                <NavLink to={item.url} onMouseEnter={() => {
                                    if(item.name === 'ရာထူးခြုံငုံသုံးသပ်ခြင်း'){
                                        console.log('prefetching...')
                                        prefetchedPositions();
                                    }
                                }} >
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
