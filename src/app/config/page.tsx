
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialTimelines } from "@/lib/timeline-data";
import { ArrowLeft, Download, Save } from "lucide-react";
import type { Timeline } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { EditableTimelinesTable } from "@/components/editable-timelines-table";
import { saveTimelines } from "./actions";

export default function ConfigPage() {
  const [timelines, setTimelines] = useState<Timeline[]>(initialTimelines);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleExport = () => {
    const dataStr = JSON.stringify(timelines, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'timelines.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await saveTimelines(timelines);
    if (result.success) {
      toast({
        title: "Changes Saved!",
        description: "Your timeline data has been updated. Refresh the page to see changes.",
      });
    } else {
       toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "Could not save your changes.",
      });
    }
    setIsSaving(false);
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
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export your current timeline data to a JSON file for backup. To save changes, edit the data below and click "Save Changes" in the header.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Timelines
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Timeline Editor</CardTitle>
              <CardDescription>
                Add, remove, or edit timelines and their events directly. Click "Save Changes" in the top header when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditableTimelinesTable timelines={timelines} setTimelines={setTimelines} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
