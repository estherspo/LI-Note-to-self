
"use client";

import Link from 'next/link';
import type { PendingInvitation } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Link2, MoreHorizontal } from 'lucide-react';

interface PendingInvitationItemProps {
  inviter: PendingInvitation;
  onAccept: (inviter: PendingInvitation) => void;
  onIgnore: (inviterId: string) => void;
}

export function PendingInvitationItem({ inviter, onAccept, onIgnore }: PendingInvitationItemProps) {
  return (
    <li className="px-4 py-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 border">
          <AvatarImage src={inviter.avatarUrl} alt={inviter.name} data-ai-hint={inviter.dataAiHint || "profile person"} />
          <AvatarFallback>{inviter.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h3 className="text-lg font-semibold text-foreground hover:underline">
              <Link href={`/invite/${inviter.id}`}>{inviter.name}</Link>
            </h3>
            {inviter.isVerified && (
              <ShieldCheck className="h-4 w-4 ml-1" fill="white" stroke="black" />
            )}
            {inviter.showLinkedInIcon && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-primary">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            )}
            {inviter.showLinkedInPremiumIcon && (
              <span className="ml-1 inline-flex items-center justify-center h-[16px] w-[16px] bg-amber-500 rounded-sm p-0.5 align-middle">
                <span className="text-white text-[9px] font-bold leading-none">in</span>
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-snug">{inviter.headline}</p>
          {inviter.mutualConnectionsText && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Link2 className="h-3 w-3 mr-1" />
              {inviter.mutualConnectionsText}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 shrink-0">
          <Button variant="outline" size="sm" onClick={() => onIgnore(inviter.id)} className="text-muted-foreground hover:border-primary">Ignore</Button>
          <Button size="sm" onClick={() => onAccept(inviter)}>Accept</Button>
        </div>
      </div>
      {inviter.message && (
        <Card className="mt-3 ml-0 sm:ml-[72px] bg-muted/30 shadow-sm">
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                {inviter.message.length > 150 ? (
                  <>
                    {inviter.message.substring(0, 150)}...
                    <Button variant="link" className="text-xs p-0 h-auto ml-1" disabled>show more</Button>
                  </>
                ) : inviter.message}
              </p>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-background/50" disabled>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="link" className="p-0 h-auto text-sm mt-2" disabled>Reply to {inviter.name.split(' ')[0]}</Button>
          </CardContent>
        </Card>
      )}
    </li>
  );
}
