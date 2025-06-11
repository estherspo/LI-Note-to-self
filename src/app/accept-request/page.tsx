
// src/app/accept-request/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AcceptRequestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Accept Connection Request</CardTitle>
          <CardDescription>
            This is a placeholder page for the "Accepting a Connection Request" feature.
            Content and functionality for managing incoming requests will be built here.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Imagine you've received an invitation and you're reviewing it before accepting.
          </p>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link href="/">Back to My Network</Link>
            </Button>
            <Button>Accept (Placeholder)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
