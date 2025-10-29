import type { Timeline } from "./types";
import { PlaceHolderImages } from "./placeholder-images";

const getImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  return { imageUrl: img?.imageUrl, imageHint: img?.imageHint };
}

export const initialTimelines: Timeline[] = [
  {
    id: "general-events",
    name: "General Events",
    category: "general",
    events: [
      {
        id: "ge-1", title: "Invention of the Printing Press", date: "1440-01-01", 
        description: "Johannes Gutenberg invents the printing press, revolutionizing the spread of information in Europe.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Printing_press", ...getImage("ge-1"),
      },
      {
        id: "ge-2", title: "Fall of Constantinople", date: "1453-05-29",
        description: "The capture of the capital of the Byzantine Empire by the Ottoman Empire, marking the end of the Roman Empire.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Fall_of_Constantinople", ...getImage("ge-2"),
      },
      {
        id: "ge-3", title: "Start of the Renaissance", date: "1400-01-01",
        description: "A period of great cultural change and achievement in Europe that spanned the period from the 14th to the 17th century.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Renaissance", ...getImage("ge-3"),
      },
      {
        id: "ge-4", title: "Columbus' First Voyage", date: "1492-08-03",
        description: "Christopher Columbus sets sail from Palos de la Frontera, Spain, leading to the European colonization of the Americas.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Voyages_of_Christopher_Columbus", ...getImage("ge-4"),
      },
      {
        id: "ge-5", title: "Protestant Reformation", date: "1517-10-31",
        description: "Martin Luther posts his Ninety-five Theses, sparking a schism in Western Christianity.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Reformation", ...getImage("ge-5"),
      },
      {
        id: "ge-6", title: "French Revolution Begins", date: "1789-07-14",
        description: "The storming of the Bastille in Paris marks a turning point in the French Revolution.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/French_Revolution", ...getImage("ge-6"),
      },
      {
        id: "ge-7", title: "Invention of the Telephone", date: "1876-03-10",
        description: "Alexander Graham Bell makes the first successful telephone call.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Invention_of_the_telephone", ...getImage("ge-7"),
      },
      {
        id: "ge-8", title: "First Powered Flight", date: "1903-12-17",
        description: "The Wright brothers, Orville and Wilbur, make the first controlled, sustained flight of a powered, heavier-than-air aircraft.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Wright_brothers", ...getImage("ge-8"),
      },
      {
        id: "ge-9", title: "Discovery of Penicillin", date: "1928-09-03",
        description: "Alexander Fleming discovers penicillin, a key development in medicine.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/History_of_penicillin", ...getImage("ge-9"),
      },
      {
        id: "ge-10", title: "Invention of the World Wide Web", date: "1989-03-12",
        description: "Tim Berners-Lee, a British scientist, invented the World Wide Web (WWW) in 1989.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/World_Wide_Web", ...getImage("ge-10"),
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  },
  {
    id: "space-race",
    name: "The Space Race",
    category: "space",
    events: [
      {
        id: "sr-1", title: "Sputnik 1 Launch", date: "1957-10-04",
        description: "The Soviet Union launches the first artificial satellite, Sputnik 1, into orbit, starting the Space Race.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Sputnik_1", ...getImage("sr-1"),
      },
      {
        id: "sr-2", title: "Explorer 1 Launch", date: "1958-01-31",
        description: "The United States launches its first satellite, Explorer 1.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Explorer_1", ...getImage("sr-2"),
      },
      {
        id: "sr-3", title: "First Man in Space", date: "1961-04-12",
        description: "Soviet cosmonaut Yuri Gagarin becomes the first human to journey into outer space.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Yuri_Gagarin", ...getImage("sr-3"),
      },
      {
        id: "sr-4", title: "First American in Space", date: "1961-05-05",
        description: "Astronaut Alan Shepard becomes the first American to travel into space.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Alan_Shepard", ...getImage("sr-4"),
      },
      {
        id: "sr-5", title: "First American to Orbit Earth", date: "1962-02-20",
        description: "John Glenn becomes the first American to orbit the Earth.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/John_Glenn", ...getImage("sr-5"),
      },
      {
        id: "sr-6", title: "First Woman in Space", date: "1963-06-16",
        description: "Soviet cosmonaut Valentina Tereshkova becomes the first woman to travel into space.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Valentina_Tereshkova", ...getImage("sr-6"),
      },
      {
        id: "sr-7", title: "First Spacewalk", date: "1965-03-18",
        description: "Alexei Leonov performs the first spacewalk, leaving his capsule for 12 minutes.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Alexei_Leonov", ...getImage("sr-7"),
      },
      {
        id: "sr-8", title: "Apollo 8 Orbits the Moon", date: "1968-12-24",
        description: "The first manned spacecraft to orbit the Moon, giving humanity its first view of the whole Earth.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Apollo_8", ...getImage("sr-8"),
      },
      {
        id: "sr-9", title: "Apollo 11 Moon Landing", date: "1969-07-20",
        description: "Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Apollo_11", ...getImage("sr-9"),
      },
      {
        id: "sr-10", title: "ISS First Module Launch", date: "1998-11-20",
        description: "The Zarya module, the first component of the International Space Station, is launched.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/International_Space_Station", ...getImage("sr-10"),
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  },
  {
    id: "world-war-2",
    name: "World War II",
    category: "war",
    events: [
      {
        id: "ww2-1", title: "Invasion of Poland", date: "1939-09-01",
        description: "Germany invades Poland, leading the United Kingdom and France to declare war on Germany, officially beginning World War II.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Invasion_of_Poland", ...getImage("ww2-1"),
      },
      {
        id: "ww2-2", title: "Battle of Britain", date: "1940-07-10",
        description: "The Royal Air Force (RAF) defends the United Kingdom against large-scale attacks by Nazi Germany's air force, the Luftwaffe.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Battle_of_Britain", ...getImage("ww2-2"),
      },
      {
        id: "ww2-3", title: "Operation Barbarossa", date: "1941-06-22",
        description: "The Axis powers invade the Soviet Union, opening the Eastern Front.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Operation_Barbarossa", ...getImage("ww2-3"),
      },
      {
        id: "ww2-4", title: "Attack on Pearl Harbor", date: "1941-12-07",
        description: "The Imperial Japanese Navy Air Service conducts a surprise military strike against the United States naval base at Pearl Harbor, Hawaii.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Attack_on_Pearl_Harbor", ...getImage("ww2-4"),
      },
      {
        id: "ww2-5", title: "Battle of Stalingrad", date: "1942-08-23",
        description: "A major and decisive battle of World War II in which Nazi Germany and its allies fought the Soviet Union for control of the city of Stalingrad.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Battle_of_Stalingrad", ...getImage("ww2-5"),
      },
      {
        id: "ww2-6", title: "D-Day", date: "1944-06-06",
        description: "The Allied forces launch the largest amphibious invasion in history, landing on the beaches of Normandy, France.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/D-Day", ...getImage("ww2-6"),
      },
      {
        id: "ww2-7", title: "Battle of the Bulge", date: "1944-12-16",
        description: "The last major German offensive campaign on the Western Front during World War II.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Battle_of_the_Bulge", ...getImage("ww2-7"),
      },
      {
        id: "ww2-8", title: "Victory in Europe Day", date: "1945-05-08",
        description: "The formal acceptance by the Allies of World War II of Nazi Germany's unconditional surrender of its armed forces.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Victory_in_Europe_Day", ...getImage("ww2-8"),
      },
      {
        id: "ww2-9", title: "Atomic Bombing of Hiroshima", date: "1945-08-06",
        description: "The United States drops an atomic bomb on the city of Hiroshima, Japan.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Atomic_bombings_of_Hiroshima_and_Nagasaki", ...getImage("ww2-9"),
      },
      {
        id: "ww2-10", title: "Victory over Japan Day", date: "1945-09-02",
        description: "Japan surrenders, officially ending World War II.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Victory_over_Japan_Day", ...getImage("ww2-10"),
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  },
];
