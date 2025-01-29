import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, LayoutGrid, LayoutList, Search, User } from 'lucide-react'

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useLocation } from "react-router"
import { currentTabName } from "@/utils"
// import { useParams } from "react-router"


export function DashboardNav() {
//   const {courseId, moduleId} = useParams() 
  const {pathname} = useLocation()
  return (
    <nav className="w-full border-border/40 bg-background/95 sticky top-0 z-50">
      <div className="flex h-14 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-2">
          
            <SidebarTrigger className="-ml-1" />
            
            <h1 className="font-regular">{currentTabName(pathname) == 'Dashboard' ? "ခြုံငုံသုံးသပ်ခြင်း စာမျက်နှာ": "ခန့်အပ်မှုအခြေနေပြ စာမျက်နှာ"}</h1>
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/course">Course</BreadcrumbLink>
              </BreadcrumbItem>
              {courseId && 
              <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/dashboard/course/${courseId}/module`}>Module</BreadcrumbLink>
              </BreadcrumbItem>
              </>
              }
              
              {courseId && moduleId && 
              <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/dashboard/course/${courseId}/module/${moduleId}/activity`}>Activity</BreadcrumbLink>
              </BreadcrumbItem>
              </>
              }

            </BreadcrumbList>
          </Breadcrumb> */}
        </div>
        {/* <div className="flex gap-4 items-center">
          <Input type="search" placeholder="Search" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div> */}
      </div>
      {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <div className="flex justify-start w-full">
            <div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(event) => console.log(event.target)}
              >
                <LayoutGrid />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-[#dfdfdf50]"
                onClick={(event) => console.log(event.target)}
              >
                <LayoutList className=" z-10"/>
              </Button>
            </div>
          </div>
        </div>
      </header> */}
    </nav>
  )
}

