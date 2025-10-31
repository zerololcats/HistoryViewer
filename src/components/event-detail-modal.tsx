
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { TimelineEvent } from "@/lib/types";

interface EventDetailModalProps {
  event: TimelineEvent;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function EventDetailModal({
  event,
  isOpen,
  onOpenChange,
}: EventDetailModalProps) {
  const [isFullImageOpen, setFullImageOpen] = useState(false);

  if (!event) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">{event.title}</DialogTitle>
            <DialogDescription>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {event.imageUrl && event.imageUrl.trim() !== '' ? (
              <button
                onClick={() => setFullImageOpen(true)}
                className="relative h-64 w-full overflow-hidden rounded-md cursor-pointer group"
                aria-label="View full image"
              >
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'contain' }}
                  data-ai-hint={event.imageHint}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ) : null}
            <p className="text-foreground/90">{event.description}</p>
            <Button asChild variant="outline">
              <a href={event.wikipediaUrl} target="_blank" rel="noopener noreferrer">
                Read more on Wikipedia
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {event.imageUrl && event.imageUrl.trim() !== '' && (
        <Dialog open={isFullImageOpen} onOpenChange={setFullImageOpen}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] h-auto w-auto flex items-center justify-center p-2 bg-transparent border-none shadow-none">
             <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    data-ai-hint={event.imageHint}
                />
             </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
