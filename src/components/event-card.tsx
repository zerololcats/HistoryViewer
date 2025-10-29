"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import type { TimelineEvent } from "@/lib/types";
import { EventDetailModal } from "./event-detail-modal";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: TimelineEvent;
  category: "general" | "space" | "war";
  onDelete: () => void;
  position: "top" | "bottom";
}

export function EventCard({ event, category, onDelete, position }: EventCardProps) {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const CategoryIcon = Icons[category];

  const eventYear = new Date(event.date).getUTCFullYear();

  return (
    <>
      <div
        className={cn("relative w-80 shrink-0", {
          "self-start": position === "bottom",
          "self-end": position === "top",
        })}
      >
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" style={position === 'top' ? { bottom: '-1.5rem' } : { top: '-1.5rem' }}/>
        <div className="absolute left-1/2 -translate-x-1/2" style={position === 'top' ? { bottom: '-2.75rem' } : { top: '-2.75rem' }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background">
                <CategoryIcon className="h-5 w-5 text-accent" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs font-semibold text-muted-foreground bg-background px-1">
              {eventYear}
            </div>
        </div>

        <Card className="transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10">
          <CardHeader>
            <CardTitle
              className="cursor-pointer hover:text-accent"
              onClick={() => setDetailModalOpen(true)}
            >
              {event.title}
            </CardTitle>
            <CardDescription>{event.date}</CardDescription>
          </CardHeader>
          <CardContent className="h-48">
            {event.imageUrl ? (
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={event.imageHint}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md bg-secondary">
                <p className="text-muted-foreground">No Image</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the event &quot;{event.title}&quot;.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>

      <EventDetailModal
        event={event}
        isOpen={isDetailModalOpen}
        onOpenChange={setDetailModalOpen}
      />
    </>
  );
}
