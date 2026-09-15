import { FeaturedGame, OpenGame, SportCategory } from "./types";

/**
 * ⚠️ MOCK DATA — backend hazır olanda bu fayl SİLİNMƏLİDİR.
 * Bunun əvəzinə app/page.tsx içində real API-dən fetch ediləcək.
 * Aşağıdakı hər massiv, backend-in qaytaracağı JSON strukturuna uyğun yazılıb —
 * "Backend API gələndə" bölməsinə bax (README.md).
 */

export const sportCategories: SportCategory[] = [
  { id: "futbol", label: "Futbol", icon: "⚽", openGamesCount: 18 },
  { id: "tennis", label: "Tennis", icon: "🎾", openGamesCount: 7 },
  { id: "basketbol", label: "Basketbol", icon: "🏀", openGamesCount: 9 },
];

export const featuredGames: FeaturedGame[] = [
  {
    id: "f5",
    sport: "futbol",
    sportLabel: "Futbol",
    dateLabel: "Bu gün · 17:00",
    title: "Cümə axşamı 5-ə-5",
    location: "Aku Arena · Nizami, Bakı · Orta səviyyə",
    currentPlayers: 11,
    maxPlayers: 12,
    players: [
      { id: "p1", name: "Elvin" },
      { id: "p2", name: "Vüqar" },
      { id: "p3", name: "Rəşad" },
    ],
  },{
    id: "f4",
    sport: "futbol",
    sportLabel: "Futbol",
    dateLabel: "Bu gün · 17:00",
    title: "Cümə axşamı 5-ə-5",
    location: "Aku Arena · Nizami, Bakı · Orta səviyyə",
    currentPlayers: 11,
    maxPlayers: 12,
    players: [
      { id: "p1", name: "Elvin" },
      { id: "p2", name: "Vüqar" },
      { id: "p3", name: "Rəşad" },
    ],
  },{
    id: "f1",
    sport: "futbol",
    sportLabel: "Futbol",
    dateLabel: "Bu gün · 17:00",
    title: "Cümə axşamı 5-ə-5",
    location: "Aku Arena · Nizami, Bakı · Orta səviyyə",
    currentPlayers: 11,
    maxPlayers: 12,
    players: [
      { id: "p1", name: "Elvin" },
      { id: "p2", name: "Vüqar" },
      { id: "p3", name: "Rəşad" },
    ],
  },
  {
    id: "f2",
    sport: "futbol",
    sportLabel: "Futbol",
    dateLabel: "Bu gün · 17:00",
    title: "Cümə axşamı 5-ə-5",
    location: "Aku Arena · Nizami, Bakı · Orta səviyyə",
    currentPlayers: 6,
    maxPlayers: 12,
    players: [
      { id: "p1", name: "Elvin" },
      { id: "p2", name: "Vüqar" },
      { id: "p3", name: "Rəşad" },
    ],
  },
  {
    id: "f3",
    sport: "futbol",
    sportLabel: "Futbol",
    dateLabel: "Bu gün · 17:00",
    title: "Cümə axşamı 5-ə-5",
    location: "Nizami, Bakı · Orta səviyyə",
    currentPlayers: 8,
    maxPlayers: 12,
    players: [
      { id: "p1", name: "Elvin" },
      { id: "p2", name: "Vüqar" },
      { id: "p3", name: "Rəşad" },
    ],
  },
];

export const openGames: OpenGame[] = [
  {
    id: "g1",
    sport: "futbol",
    sportLabel: "Futbol",
    level: "Orta səviyyə",
    imageUrl:
      "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=800&auto=format&fit=crop",
    title: "Futbol • 07.06.26",
    location: "Inter Arena, Nərimanov",
    dateLabel: "Cüm, 2 Avq",
    timeLabel: "20:00",
    currentPlayers: 6,
    maxPlayers: 10,
    host: { id: "u1", name: "Elvin Məmmədov",avatarUrl: "/pp.jpg"},
  },
  {
    id: "g2",
    sport: "basketbol",
    sportLabel: "Basketbol",
    level: "Yüksək",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
    title: "Basketbol • 21.06.26",
    location: "Inter Arena, Nərimanov",
    dateLabel: "Cüm, 2 Avq",
    timeLabel: "20:00",
    currentPlayers: 6,
    maxPlayers: 10,
    host: { id: "u1", name: "Elvin Məmmədov",avatarUrl: "/pp.jpg" },
  },
  {
    id: "g3",
    sport: "tennis",
    sportLabel: "Tennis",
    level: "Başlanğıc",
    imageUrl:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop",
    title: "Tenis • 13.06.26",
    location: "Inter Arena, Nərimanov",
    dateLabel: "Cüm, 2 Avq",
    timeLabel: "20:00",
    currentPlayers: 6,
    maxPlayers: 10,
    host: { id: "u1", name: "Elvin Məmmədov",avatarUrl: "/pp.jpg" },
  },
];
