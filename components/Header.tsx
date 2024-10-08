import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, Menu } from 'lucide-react'

interface HeaderProps {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-4 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">SalesConnect</h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <img src="/images/us.png" alt="US Flag" className="w-5 h-5" />
                  <span>English</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <img src="/images/us.png" alt="US Flag" className="w-5 h-5 mr-2" />
                  English
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <img src="/images/jpn.png" alt="Japan Flag" className="w-5 h-5 mr-2" />
                  日本語
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <img src="/images/avatar.jpg" alt="User Avatar" className="h-8 w-8 rounded-full" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
