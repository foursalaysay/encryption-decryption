'use client'

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Cipher Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Caesar Cipher Calculator",
    url: "/caesar",
    icon: Inbox,
  },
  {
    title: "Vigenere Cipher",
    url: "/vigenere",
    icon: Calendar,
  },
  {
    title: "Playfair",
    url: "/playfair",
    icon: Search,
  },
  {
    title: "Single Columnar",
    url: "/single-columnar",
    icon: Settings,
  },
  {
    title: "Double Columnar",
    url: "/double-columnar",
    icon: Settings,
  },
  {
    title: "Advance Encryption Standard",
    url: "/aes",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Encryptor | Decryptor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='flex flex-col gap-3 mt-10'>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
