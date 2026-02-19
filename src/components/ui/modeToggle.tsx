"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-[#254F22]/20 dark:border-[#A3DC9A]/20 hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 transition-colors"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-[#254F22]" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-[#A3DC9A]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-xl border-[#254F22]/10 dark:border-[#A3DC9A]/10 bg-white dark:bg-[#0f1a0e] shadow-md"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer rounded-lg text-[#254F22] dark:text-[#e8f5e4]/70 hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 dark:hover:text-[#A3DC9A]"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer rounded-lg text-[#254F22] dark:text-[#e8f5e4]/70 hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 dark:hover:text-[#A3DC9A]"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer rounded-lg text-[#254F22] dark:text-[#e8f5e4]/70 hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 dark:hover:text-[#A3DC9A]"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}