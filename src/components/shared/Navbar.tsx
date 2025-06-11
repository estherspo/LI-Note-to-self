
"use client";

import Link from 'next/link';
import { Linkedin, Search, Home, Users, Briefcase, MessageSquareText, Bell, User, LayoutGrid, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const isOnInvitePage = pathname.startsWith('/invite/');
  const isOnAcceptRequestPage = pathname === '/accept-request';

  // Determine if specific interactive elements should be disabled
  const disableProfileInteractions = isOnInvitePage || isOnAcceptRequestPage;

  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={isOnInvitePage ? "#" : "/"} className={cn("flex items-center text-primary", isOnInvitePage && "pointer-events-none")}>
            <Linkedin className="h-10 w-10" fill="currentColor" />
          </Link>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8 h-9 w-[200px] sm:w-[240px] lg:w-[280px] bg-slate-100 focus:bg-white rounded-sm border-gray-400 focus:border-primary"
              disabled={disableProfileInteractions}
            />
          </div>
        </div>
        
        <nav className="flex items-center h-full">
          <Button variant="ghost" asChild className="h-full px-1.5 sm:px-2 py-0 w-[65px] sm:w-[75px] rounded-none hover:bg-slate-100 flex-shrink-0" disabled>
            <Link href="#" className="flex flex-col items-center justify-center text-center text-muted-foreground hover:text-primary">
              <Home className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" />
              <span className="text-xs leading-tight">Home</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            asChild 
            className="relative h-full px-1.5 sm:px-2 py-0 w-[65px] sm:w-[75px] rounded-none hover:bg-slate-100 flex-shrink-0" 
            disabled={isOnInvitePage}
          >
            <Link 
              href={isOnAcceptRequestPage ? '/accept-request' : '/'} 
              className={cn(
                "flex flex-col items-center justify-center text-center text-muted-foreground hover:text-primary",
                isOnInvitePage && "opacity-50 cursor-not-allowed"
              )}
              aria-disabled={isOnInvitePage}
              tabIndex={isOnInvitePage ? -1 : undefined}
            >
              <Users className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" />
              <span className="text-xs leading-tight">My Network</span>
              {pathname === '/accept-request' && (
                <span className="absolute top-3 right-3 sm:right-4 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-card"></span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" asChild className="h-full px-1.5 sm:px-2 py-0 w-[65px] sm:w-[75px] rounded-none hover:bg-slate-100 flex-shrink-0" disabled>
            <Link href="#" className="flex flex-col items-center justify-center text-center text-muted-foreground hover:text-primary">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" />
              <span className="text-xs leading-tight">Jobs</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="h-full px-1.5 sm:px-2 py-0 w-[65px] sm:w-[75px] rounded-none hover:bg-slate-100 flex-shrink-0" disabled>
            <Link href="#" className="flex flex-col items-center justify-center text-center text-muted-foreground hover:text-primary">
              <MessageSquareText className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" />
              <span className="text-xs leading-tight">Messaging</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="h-full px-1.5 sm:px-2 py-0 w-[65px] sm:w-[75px] rounded-none hover:bg-slate-100 flex-shrink-0" disabled>
            <Link href="#" className="flex flex-col items-center justify-center text-center text-muted-foreground hover:text-primary">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" />
              <span className="text-xs leading-tight">Notifications</span>
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-full px-1.5 sm:px-2 py-0 w-[65px] sm:w-[75px] rounded-none hover:bg-slate-100 flex flex-col items-center justify-center text-muted-foreground hover:text-primary flex-shrink-0"
                disabled={disableProfileInteractions}
              >
                <Avatar className="h-6 w-6 rounded-full mb-0.5">
                  <AvatarImage src="https://placehold.co/24x24.png" alt="User Avatar" data-ai-hint="person avatar" />
                  <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                </Avatar>
                <div className="flex items-center text-xs leading-tight">
                  Me <ChevronDown className="h-3 w-3 ml-0.5" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem disabled>Profile</DropdownMenuItem>
              <DropdownMenuItem disabled>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="h-10 self-center mx-1 hidden sm:block" />

          <div className="hidden sm:flex items-center h-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-full px-1.5 sm:px-2 py-0 w-[80px] sm:w-[90px] rounded-none hover:bg-slate-100 flex flex-col items-center justify-center text-muted-foreground hover:text-primary flex-shrink-0"
                  disabled={disableProfileInteractions}
                >
                  <LayoutGrid className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" />
                  <div className="flex items-center text-xs leading-tight">
                    For Business <ChevronDown className="h-3 w-3 ml-0.5" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem disabled>Explore Services</DropdownMenuItem>
                <DropdownMenuItem disabled>Post a Job</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex flex-col items-start justify-center text-center pl-2 pr-1 h-full flex-shrink-0">
              <Link 
                href="#"
                aria-disabled={disableProfileInteractions}
                className={cn(
                  "text-xs text-amber-700 hover:underline leading-tight whitespace-nowrap",
                  disableProfileInteractions && "opacity-50 pointer-events-none cursor-not-allowed"
                )}
                tabIndex={disableProfileInteractions ? -1 : undefined} 
              >
                Reactivate
              </Link>
              <Link 
                href="#"
                aria-disabled={disableProfileInteractions}
                className={cn(
                  "text-xs text-amber-700 hover:underline leading-tight whitespace-nowrap",
                  disableProfileInteractions && "opacity-50 pointer-events-none cursor-not-allowed"
                )}
                tabIndex={disableProfileInteractions ? -1 : undefined}
              >
                Premium: 50% Off
              </Link>
            </div>
          </div>

        </nav>
      </div>
    </header>
  );
}
