/**
 * Bu tiplər backend API-nin qaytaracağı data strukturunu əks etdirir.
 * Backend hazır olanda bu fayl DƏYİŞMƏMƏLİDİR (əgər sahə adları eynidirsə) —
 * sadəcə mock-data.ts əvəzinə real fetch/axios çağırışı istifadə olunacaq.
 */

export type SportSlug = "futbol" | "tennis" | "basketbol";

export interface SportCategory {
  id: SportSlug;
  label: string;
  icon: string; // emoji və ya icon adı
  openGamesCount: number;
}

export type GameLevel = "Başlanğıc" | "Orta səviyyə" | "Yüksək";

export interface Player {
  id: string;
  name: string;
  avatarUrl?: string;
}

/** Hero bölməsindəki karusel kartı üçün */
export interface FeaturedGame {
  id: string;
  sport: SportSlug;
  sportLabel: string;
  dateLabel: string; // məs: "Bu gün · 17:00"
  title: string;
  location: string;
  currentPlayers: number;
  maxPlayers: number;
  players: Player[];
}

/** "Açıq oyunlar" grid-indəki kart üçün */
export interface OpenGame {
  id: string;
  sport: SportSlug;
  sportLabel: string;
  level: GameLevel;
  imageUrl: string;
  title: string;
  location: string;
  dateLabel: string; // məs: "Cüm, 2 Avq"
  timeLabel: string; // məs: "20:00"
  currentPlayers: number;
  maxPlayers: number;
  host: Player;
}
