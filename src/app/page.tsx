"use client";

import { useState, useMemo } from "react";
import { initialTimelines } from "@/lib/timeline-data";
import type { Timeline, TimelineEvent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { AddEventModal } from "@/components/add-event-modal";
import { EventCard } from "@/components/event-card";

export default function Home() {
  const [timelines, setTimelines] = useState<Timeline[]>(initialTimelines);
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>(
    initialTimelines[0]?.id || ""
  );
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const selectedTimeline = useMemo(
    () => timelines.find((t) => t.id === selectedTimelineId),
    [timelines, selectedTimelineId]
  );

  const handleTimelineChange = (id: string) => {
    setSelectedTimelineId(id);
  };

  const handleAddEvent = (newEventData: Omit<TimelineEvent, "id">) => {
    setTimelines((prevTimelines) =>
      prevTimelines.map((timeline) => {
        if (timeline.id === selectedTimelineId) {
          const newEvent: TimelineEvent = {
            ...newEventData,
            id: `event-${Date.now()}-${Math.random()}`,
          };
          const updatedEvents = [...timeline.events, newEvent].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          return { ...timeline, events: updatedEvents };
        }
        return timeline;
      })
    );
    setAddModalOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setTimelines((prevTimelines) =>
      prevTimelines.map((timeline) => {
        if (timeline.id === selectedTimelineId) {
          return {
            ...timeline,
            events: timeline.events.filter((event) => event.id !== eventId),
          };
        }
        return timeline;
      })
    );
  };

  const years = useMemo(() => {
    if (!selectedTimeline) return [];
    const eventYears = selectedTimeline.events.map(event => new Date(event.date).getFullYear());
    return Array.from(new Set(eventYears)).sort();
  }, [selectedTimeline]);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="sticky top-0 z-20 w-full border-b bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <h1 className="text-2xl font-bold text-primary">ChronoCanvas</h1>
          <div className="flex items-center gap-4">
            <Select
              value={selectedTimelineId}
              onValueChange={handleTimelineChange}
            >
              <SelectTrigger className="w-[180px] md:w-[240px]">
                <SelectValue placeholder="Select a timeline" />
              </SelectTrigger>
              <SelectContent>
                {timelines.map((timeline) => (
                  <SelectItem key={timeline.id} value={timeline.id}>
                    {timeline.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setAddModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-hidden">
        {selectedTimeline ? (
          <div className="relative flex-grow p-4 md:p-8 h-[600px] flex items-center">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-border" />
            <div className="relative flex items-center gap-8 overflow-x-auto p-8 h-full w-full">
              {selectedTimeline.events.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  category={selectedTimeline.category}
                  onDelete={() => handleDeleteEvent(event.id)}
                  position={index % 2 === 0 ? "top" : "bottom"}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              Select or create a timeline to begin.
            </p>
          </div>
        )}
      </main>

      <AddEventModal
        isOpen={isAddModalOpen}
        onOpenChange={setAddModalOpen}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}