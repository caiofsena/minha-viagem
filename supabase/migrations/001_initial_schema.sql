-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trips table
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  destino TEXT NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Places table
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  categoria TEXT NOT NULL DEFAULT 'outro',
  data DATE NOT NULL,
  hora_entrada TIME,
  hora_saida TIME,
  visitado BOOLEAN DEFAULT FALSE,
  ordem INTEGER DEFAULT 0,
  notas TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_places_trip ON places(trip_id);
CREATE INDEX idx_places_data ON places(data);

-- RLS: trips
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trips"
  ON trips FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trips"
  ON trips FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips"
  ON trips FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips"
  ON trips FOR DELETE
  USING (auth.uid() = user_id);

-- RLS: places
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view places from own trips"
  ON places FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM trips
    WHERE trips.id = places.trip_id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert places to own trips"
  ON places FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM trips
    WHERE trips.id = places.trip_id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can update places from own trips"
  ON places FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM trips
    WHERE trips.id = places.trip_id
    AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete places from own trips"
  ON places FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM trips
    WHERE trips.id = places.trip_id
    AND trips.user_id = auth.uid()
  ));
