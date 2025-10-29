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
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: TimelineEvent;
  onDelete: () => void;
}

export function EventCard({ event, onDelete }: EventCardProps) {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <Card className="transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
          <CardHeader>
            <CardTitle
              className="cursor-pointer hover:text-primary"
              onClick={() => setDetailModalOpen(true)}
            >
              {event.title}
            </CardTitle>
            <CardDescription>{event.date}</CardDescription>
          </CardHeader>
          <CardContent className="h-48" onClick={() => setDetailModalOpen(true)}>
            {event.imageUrl ? (
              <div className="relative h-full w-full overflow-hidden rounded-md cursor-pointer">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={event.imageHint}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md bg-secondary cursor-pointer">
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
