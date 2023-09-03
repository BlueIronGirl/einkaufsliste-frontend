export interface Artikel {
  id: number;
  name: string;
  anzahl: number;
  gekauft: boolean;
  // TODO kategorie
  erstellungsZeitpunkt?: string;
  kaufZeitpunkt?: string;
}
