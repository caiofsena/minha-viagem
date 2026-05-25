export type Category =
  | "hotel"
  | "restaurante"
  | "museu"
  | "parque"
  | "compras"
  | "aeroporto"
  | "outro";

export interface Place {
  id: string;
  trip_id: string;
  nome: string;
  lat: number;
  lng: number;
  categoria: Category;
  data: string;
  hora_entrada: string;
  hora_saida: string;
  visitado: boolean;
  ordem: number;
  notas: string;
  created_at: string;
}

export interface Trip {
  id: string;
  user_id: string;
  nome: string;
  destino: string;
  data_inicio: string;
  data_fim: string;
  created_at: string;
}

export interface DayGroup {
  data: string;
  places: Place[];
}

export const CATEGORY_LABELS: Record<Category, string> = {
  hotel: "Hotel",
  restaurante: "Restaurante",
  museu: "Museu",
  parque: "Parque",
  compras: "Compras",
  aeroporto: "Aeroporto",
  outro: "Outro",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  hotel: "#a78bfa",
  restaurante: "#f97316",
  museu: "#c084fc",
  parque: "#34d399",
  compras: "#f472b6",
  aeroporto: "#60a5fa",
  outro: "#94a3b8",
};
