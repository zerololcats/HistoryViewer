
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialTimelines } from "@/lib/timeline-data";
import { ArrowLeft, Download } from "lucide-react";

export default function ConfigPage() {
  const handleExport = () => {
    const dataStr = JSON.stringify(initialTimelines, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'timelines.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
       <header className="sticky top-0 z-20 w-full border-b bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/">
                <ArrowLeft />
              </Link>
            </Button>
            <h1 className="text-2xl font-headline font-bold text-foreground">Configuration</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export your timeline data to a JSON file for backup or external editing. 
                To import data, paste the content of your modified JSON file into the chat, 
                and the AI assistant will update the application for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Timelines
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
