
"use client";

import type { Dispatch, SetStateAction } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";
import type { Timeline, TimelineEvent } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface EditableTimelinesTableProps {
  timelines: Timeline[];
  setTimelines: Dispatch<SetStateAction<Timeline[]>>;
}

export function EditableTimelinesTable({ timelines, setTimelines }: EditableTimelinesTableProps) {

  const handleTimelineChange = (timelineId: string, field: keyof Timeline, value: any) => {
    setTimelines(prev => prev.map(t => t.id === timelineId ? { ...t, [field]: value } : t));
  };

  const handleAddTimeline = () => {
    const newTimeline: Timeline = {
      id: `timeline-${Date.now()}`,
      name: "New Timeline",
      category: "general",
      events: [],
    };
    setTimelines(prev => [...prev, newTimeline]);
  };

  const handleDeleteTimeline = (timelineId: string) => {
    setTimelines(prev => prev.filter(t => t.id !== timelineId));
  };

  const handleEventChange = (timelineId: string, eventId: string, field: keyof TimelineEvent, value: any) => {
    setTimelines(prev => prev.map(t => {
      if (t.id === timelineId) {
        const updatedEvents = t.events.map(e => e.id === eventId ? { ...e, [field]: value } : e);
        return { ...t, events: updatedEvents };
      }
      return t;
    }));
  };

  const handleAddEvent = (timelineId: string) => {
    const newEvent: TimelineEvent = {
      id: `event-${Date.now()}`,
      title: "New Event",
      date: new Date().toISOString().split('T')[0],
      description: "",
      wikipediaUrl: "",
      imageUrl: "",
      imageHint: "",
    };
    setTimelines(prev => prev.map(t => {
      if (t.id === timelineId) {
        return { ...t, events: [...t.events, newEvent] };
      }
      return t;
    }));
  };

  const handleDeleteEvent = (timelineId: string, eventId: string) => {
    setTimelines(prev => prev.map(t => {
      if (t.id === timelineId) {
        return { ...t, events: t.events.filter(e => e.id !== eventId) };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full">
        {timelines.map(timeline => (
          <AccordionItem value={timeline.id} key={timeline.id}>
             <div className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-4 flex-grow mr-4">
                    <Input
                        value={timeline.name}
                        onChange={(e) => handleTimelineChange(timeline.id, "name", e.target.value)}
                        className="font-semibold text-lg flex-grow"
                    />
                    <Select
                        value={timeline.category}
                        onValueChange={(value) => handleTimelineChange(timeline.id, 'category', value)}
                    >
                        <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="space">Space</SelectItem>
                        <SelectItem value="war">War</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTimeline(timeline.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
                <AccordionTrigger />
            </div>
            <AccordionContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[15%]">Title</TableHead>
                      <TableHead className="w-[10%]">Date</TableHead>
                      <TableHead className="w-[25%]">Description</TableHead>
                      <TableHead className="w-[15%]">Image URL</TableHead>
                      <TableHead className="w-[15%]">Wikipedia URL</TableHead>
                      <TableHead className="w-[10%]">Image Hint</TableHead>
                      <TableHead className="w-[10%] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeline.events.map(event => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <Input value={event.title} onChange={e => handleEventChange(timeline.id, event.id, "title", e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input type="date" value={event.date} onChange={e => handleEventChange(timeline.id, event.id, "date", e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input value={event.description} onChange={e => handleEventChange(timeline.id, event.id, "description", e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input value={event.imageUrl || ''} onChange={e => handleEventChange(timeline.id, event.id, "imageUrl", e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input value={event.wikipediaUrl} onChange={e => handleEventChange(timeline.id, event.id, "wikipediaUrl", e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Input value={event.imageHint || ''} onChange={e => handleEventChange(timeline.id, event.id, "imageHint", e.target.value)} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(timeline.id, event.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => handleAddEvent(timeline.id)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button variant="default" className="mt-4" onClick={handleAddTimeline}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Timeline
      </Button>
    </div>
  );
}
