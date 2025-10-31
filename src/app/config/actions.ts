'use server';

import type { Timeline } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

type PlaceholderImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

function generateTimelineDataContent(timelines: Timeline[]): string {
  const getImageCalls = new Set<string>();

  const stringifiedTimelines = timelines.map(timeline => {
    const events = timeline.events.map(event => {
      // Find a unique ID for the image if it exists
      const imageId = event.imageUrl ? `img-${timeline.id}-${event.id}`.replace(/[^a-zA-Z0-9-]/g, '') : null;
      if (imageId) {
        getImageCalls.add(JSON.stringify({
          id: imageId,
          description: event.title,
          imageUrl: event.imageUrl,
          imageHint: event.imageHint || '',
        }));
      }
      
      const eventImagePart = imageId ? `, ...getImage("${imageId}")` : ', imageUrl: "", imageHint: ""';

      return `{
        id: "${event.id}", title: "${event.title.replace(/"/g, '\\"')}", date: "${event.date}", 
        description: "${event.description.replace(/"/g, '\\"')}",
        wikipediaUrl: "${event.wikipediaUrl}"${eventImagePart}
      }`;
    }).join(',\n      ');

    return `{
    id: "${timeline.id}",
    name: "${timeline.name.replace(/"/g, '\\"')}",
    category: "${timeline.category}",
    events: [
      ${events}
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  }`;
  }).join(',\n  ');

  const allImages = Array.from(getImageCalls).map(s => JSON.parse(s));

  return {
    timelineContent: `import type { Timeline } from "./types";
import { PlaceHolderImages } from "./placeholder-images";

const getImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  if (!img) {
    return { imageUrl: "", imageHint: "" };
  }
  return { imageUrl: img.imageUrl, imageHint: img.imageHint };
}

export const initialTimelines: Timeline[] = [
  ${stringifiedTimelines}
];
`,
    placeholderImagesContent: JSON.stringify({ placeholderImages: allImages }, null, 2)
  };
}


export async function saveTimelines(timelines: Timeline[]) {
  try {
    const { timelineContent, placeholderImagesContent } = generateTimelineDataContent(timelines);
    
    const timelineDataPath = path.join(process.cwd(), 'src', 'lib', 'timeline-data.ts');
    const placeholderImagesPath = path.join(process.cwd(), 'src', 'lib', 'placeholder-images.json');
    
    // NOTE: This is a placeholder. The AI agent will perform the actual file write.
    // In a real environment, you would use fs.writeFile here.
    console.log("---- AI: PLEASE UPDATE THE FOLLOWING FILES ----");
    console.log("File: " + timelineDataPath);
    console.log(timelineContent);
    console.log("----");
    console.log("File: " + placeholderImagesPath);
    console.log(placeholderImagesContent);
    console.log("-------------------------------------------");

    return { success: true };
  } catch (error) {
    console.error("Error saving timelines:", error);
    return { success: false, error: "Failed to save timelines." };
  }
}
