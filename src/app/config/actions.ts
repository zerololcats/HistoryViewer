
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

function generateTimelineDataContent(timelines: Timeline[]): { timelineContent: string; placeholderImagesContent: string } {
  const getImageCalls = new Set<string>();

  const stringifiedTimelines = timelines.map(timeline => {
    const events = timeline.events.map(event => {
      // Find a unique ID for the image if it exists
      const imageId = event.imageUrl ? `img-${timeline.id}-${event.id}`.replace(/[^a-zA-Z0-9-]/g, '') : null;
      if (imageId && event.imageUrl) {
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
        description: "${event.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
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

  const timelineContent = `import type { Timeline } from "./types";
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
`;

  const placeholderImagesContent = JSON.stringify({ placeholderImages: allImages }, null, 2);

  return {
    timelineContent,
    placeholderImagesContent
  };
}


export async function saveTimelines(timelines: Timeline[]) {
  try {
    const { timelineContent, placeholderImagesContent } = generateTimelineDataContent(timelines);
    
    const timelineDataPath = path.join(process.cwd(), 'src', 'lib', 'timeline-data.ts');
    const placeholderImagesPath = path.join(process.cwd(), 'src', 'lib', 'placeholder-images.json');
    
    await fs.writeFile(timelineDataPath, timelineContent, 'utf-8');
    await fs.writeFile(placeholderImagesPath, placeholderImagesContent, 'utf-8');

    return { success: true };
  } catch (error) {
    console.error("Error saving timelines:", error);
    return { success: false, error: "Failed to save timelines." };
  }
}
