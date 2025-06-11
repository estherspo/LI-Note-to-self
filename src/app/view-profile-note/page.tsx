
// src/app/view-profile-note/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StickyNote } from "lucide-react";

export default function ViewProfileNotePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://placehold.co/128x128.png" alt="John Smith" data-ai-hint="man professional" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-3xl">View Connection Note: John Smith</CardTitle>
              <CardDescription>
                Product Manager at Future Gadgets Co.
              </CardDescription>
            </div>
          </div>
          <CardDescription>
            This is a placeholder page for the "Viewing a Connection's Profile & Note" feature.
            Detailed profile information and the private note for an existing connection would be displayed here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <StickyNote className="h-5 w-5 text-primary" />
                Private Note (Placeholder)
              </h3>
              <div className="p-4 bg-muted/50 rounded-md">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  Met John at the 2023 Tech Conference. Discussed potential collaboration on product strategy. He's particularly interested in AI applications for e-commerce. Follow up regarding that idea we discussed.
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" asChild>
                <Link href="/">Back to My Network</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
