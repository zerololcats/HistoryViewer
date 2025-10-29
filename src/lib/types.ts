export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
  wikipediaUrl: string;
}

export interface Timeline {
  id: string;
  name: string;
  category: "general" | "space" | "war";
  events: TimelineEvent[];
}
