export interface SampleContent {
  id: string;
  title: string;
  category: string;
  duration: string;
  rating: number;
  description: string;
  gradientClass: string;
  iconType: "book" | "mic" | "film";
}

export const sampleContent: SampleContent[] = [
  {
    id: "sample-1",
    title: "The Midnight Chronicles",
    category: "audiobook",
    duration: "2h 14m",
    rating: 4.8,
    description:
      "A sweeping epic set in a world where night never ends. Follow the last ember-keeper as she navigates a city of shadows and forgotten magic.",
    gradientClass: "gradient-poster-1",
    iconType: "book",
  },
  {
    id: "sample-2",
    title: "Echoes of the Void",
    category: "story",
    duration: "45m",
    rating: 4.6,
    description:
      "A short story about a deep-space radio operator who picks up transmissions from a ship that disappeared 200 years ago.",
    gradientClass: "gradient-poster-2",
    iconType: "mic",
  },
  {
    id: "sample-3",
    title: "Neon Shadows",
    category: "movie",
    duration: "1h 52m",
    rating: 4.9,
    description:
      "A neo-noir thriller set in a rain-soaked megalopolis. A disgraced detective uncovers a conspiracy that reaches the very stars.",
    gradientClass: "gradient-poster-3",
    iconType: "film",
  },
  {
    id: "sample-4",
    title: "Whispers in the Dark",
    category: "audiobook",
    duration: "1h 08m",
    rating: 4.7,
    description:
      "Narrated entirely in hushed tones, this horror anthology weaves six tales of dread around a single, ancient lantern.",
    gradientClass: "gradient-poster-4",
    iconType: "book",
  },
  {
    id: "sample-5",
    title: "The Last Signal",
    category: "story",
    duration: "32m",
    rating: 4.5,
    description:
      "In the last hours before a solar storm silences all communication, one scientist tries to reach her daughter across the globe.",
    gradientClass: "gradient-poster-5",
    iconType: "mic",
  },
  {
    id: "sample-6",
    title: "Crimson Horizon",
    category: "movie",
    duration: "2h 01m",
    rating: 4.8,
    description:
      "An astronaut stranded on a dying moon must choose between survival and the salvation of a planet she's never seen.",
    gradientClass: "gradient-poster-6",
    iconType: "film",
  },
];
