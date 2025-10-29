"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
import { cn } from "@/lib/utils";

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
    const eventYears = selectedTimeline.events.map(event => new Date(event.date).getUTCFullYear());
    return Array.from(new Set(eventYears)).sort();
  }, [selectedTimeline]);

  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - timeline.offsetLeft);
      setScrollLeft(timeline.scrollLeft);
      timeline.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
      setIsDragging(false);
      timeline.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      setIsDragging(false);
      timeline.style.cursor = 'grab';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - timeline.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      timeline.scrollLeft = scrollLeft - walk;
    };

    timeline.addEventListener('mousedown', onMouseDown);
    timeline.addEventListener('mouseleave', onMouseLeave);
    timeline.addEventListener('mouseup', onMouseUp);
    timeline.addEventListener('mousemove', onMouseMove);

    return () => {
      timeline.removeEventListener('mousedown', onMouseDown);
      timeline.removeEventListener('mouseleave', onMouseLeave);
      timeline.removeEventListener('mouseup', onMouseUp);
      timeline.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging, startX, scrollLeft]);


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

      <main className="flex flex-col flex-grow overflow-hidden">
        {selectedTimeline ? (
          <div 
            ref={timelineRef}
            className={cn("relative flex-grow overflow-x-auto cursor-grab", { 'cursor-grabbing': isDragging })}
            style={{ WebkitOverflowScrolling: 'touch' }}
            >
            <div className="relative h-full flex items-center px-8">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-border" />
              <div className="relative flex h-full items-center gap-8 py-8 w-max">
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
