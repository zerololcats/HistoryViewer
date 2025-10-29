
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
import { Plus } from "lucide-react";
import { AddEventModal } from "@/components/add-event-modal";
import { EventCard } from "@/components/event-card";
import { cn } from "@/lib/utils";

export default function Home() {
  const [timelines, setTimelines] = useState<Timeline[]>(initialTimelines);
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>(
    initialTimelines[0]?.id || ""
  );
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [zoom, setZoom] = useState(0.9);

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

  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('button, a, input, [role="button"], [role="dialog"]')) {
        return;
      }
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
      const walk = (x - startX) * 2;
      timeline.scrollLeft = scrollLeft - walk;
    };
    
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((prevZoom) => {
        const newZoom = prevZoom - e.deltaY * 0.001;
        return Math.min(Math.max(newZoom, 0.5), 2); // Clamp zoom between 0.5 and 2
      });
    };

    timeline.addEventListener('mousedown', onMouseDown);
    timeline.addEventListener('mouseleave', onMouseLeave);
    timeline.addEventListener('mouseup', onMouseUp);
    timeline.addEventListener('mousemove', onMouseMove);
    timeline.addEventListener('wheel', onWheel, { passive: false });


    return () => {
      timeline.removeEventListener('mousedown', onMouseDown);
      timeline.removeEventListener('mouseleave', onMouseLeave);
      timeline.removeEventListener('mouseup', onMouseUp);
      timeline.removeEventListener('mousemove', onMouseMove);
      timeline.removeEventListener('wheel', onWheel);
    };
  }, [isDragging, startX, scrollLeft]);


  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="sticky top-0 z-20 w-full border-b bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <h1 className="text-2xl font-headline font-bold text-foreground">History Viewer</h1>
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
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col overflow-hidden">
        {selectedTimeline ? (
           <div
            ref={timelineRef}
            className={cn(
              "flex-grow overflow-auto cursor-grab flex items-center",
              { 'cursor-grabbing': isDragging }
            )}
          >
            <div 
              className="relative flex items-center h-full px-16 py-8"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center'
              }}
            >
              {/* Central Timeline Bar */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2" />

              <div className="relative flex justify-start items-start gap-x-60">
                {selectedTimeline.events.map((event, index) => {
                  const position = index % 2 === 0 ? "top" : "bottom";
                  return (
                    <div key={event.id} className="relative flex flex-col items-center">
                      
                      {/* Event Card */}
                      <div className={cn("w-72", {
                        "absolute bottom-full mb-8": position === "top",
                        "absolute top-full mt-8": position === "bottom",
                      })}>
                        <EventCard
                          event={event}
                          onDelete={() => handleDeleteEvent(event.id)}
                        />
                      </div>
                      
                      {/* Timeline Marker */}
                      <div className="relative flex flex-col items-center">
                         {/* Connecting Line */}
                         <div className={cn("w-px bg-border", {
                            "h-8": true,
                            "absolute bottom-full": position === "top",
                            "absolute top-full": position === "bottom",
                          })}></div>

                        {/* Dot on Timeline */}
                        <div className="relative h-3 w-3 rounded-full bg-primary border-2 border-background z-10"></div>
                        
                        {/* Year Marker on Timeline */}
                        <div className="absolute top-full mt-2 text-xs font-semibold text-muted-foreground bg-background px-1 z-10">
                          {new Date(event.date).getUTCFullYear()}
                        </div>
                      </div>
                    </div>
                  );
                })}
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

      <Button
        onClick={() => setAddModalOpen(true)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-110 border-2 border-accent"
        aria-label="Add Event"
      >
        <Plus className="h-10 w-10" />
      </Button>

      <AddEventModal
        isOpen={isAddModalOpen}
        onOpenChange={setAddModalOpen}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
