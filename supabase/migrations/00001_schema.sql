-- DEIXIS Schema v1
-- Core tables for artist management, listings, sales, and payouts

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ARTISTS
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  legal_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied','reviewing','accepted','agreement_sent','signed','w9_received','active','paused','rejected')),
  payout_method TEXT CHECK (payout_method IN ('ach','paypal','check')),
  payout_details JSONB,
  w9_on_file BOOLEAN DEFAULT FALSE,
  agreement_envelope_id TEXT,
  drive_folder_id TEXT,
  airtable_record_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- WORKS
CREATE TABLE works (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  year INTEGER,
  medium TEXT,
  type TEXT NOT NULL CHECK (type IN ('print_source','original','product')),
  description TEXT,
  dimensions TEXT,
  provenance TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LISTINGS
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('print','original','merch','collab','licensed')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','asset_uploaded','qc_pass','qc_fail','testprint_pending','testprint_review','approved','live','sold_out','archived')),
  edition_type TEXT CHECK (edition_type IN ('open','limited')),
  edition_size INTEGER,
  paper TEXT CHECK (paper IN ('EMA','hahnemuhle_etching','photo_rag')),
  price_cents INTEGER NOT NULL,
  artist_split_pct NUMERIC DEFAULT 60,
  shopify_product_id TEXT,
  shopify_variant_id TEXT,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ASSET FILES
CREATE TABLE asset_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  drive_file_id TEXT,
  filename TEXT NOT NULL,
  file_format TEXT,
  dpi INTEGER,
  color_profile TEXT,
  pixel_w INTEGER,
  pixel_h INTEGER,
  qc_status TEXT DEFAULT 'pending' CHECK (qc_status IN ('pending','pass','fail')),
  qc_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TEST PRINTS
CREATE TABLE test_prints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  prodigi_order_id TEXT,
  status TEXT DEFAULT 'ordered' CHECK (status IN ('ordered','received','sent_to_artist','approved','rejected')),
  artist_response_at TIMESTAMPTZ,
  file_version TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SALE LINES
CREATE TABLE sale_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shopify_order_id TEXT NOT NULL,
  listing_id UUID NOT NULL REFERENCES listings(id),
  artist_id UUID NOT NULL REFERENCES artists(id),
  category TEXT NOT NULL,
  gross_cents INTEGER NOT NULL,
  prodigi_cost_cents INTEGER,
  shipping_cost_cents INTEGER,
  net_cents INTEGER,
  artist_split_pct NUMERIC,
  artist_payout_cents INTEGER,
  deixis_cents INTEGER,
  sold_at TIMESTAMPTZ DEFAULT NOW(),
  payout_statement_id UUID
);

-- PAYOUT STATEMENTS
CREATE TABLE payout_statements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID NOT NULL REFERENCES artists(id),
  period_month DATE NOT NULL,
  total_units INTEGER,
  total_gross_cents INTEGER,
  total_deductions_cents INTEGER,
  total_payout_cents INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','approved','paid')),
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  statement_pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SALON EVENTS
CREATE TABLE salon_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  event_date DATE,
  drop_starts_at TIMESTAMPTZ,
  drop_ends_at TIMESTAMPTZ,
  listing_ids UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_prints ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE payout_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE salon_events ENABLE ROW LEVEL SECURITY;

-- Artists see only own rows
CREATE POLICY artist_own_rows ON artists FOR ALL USING (id = auth.uid());
CREATE POLICY artist_own_works ON works FOR ALL USING (artist_id = auth.uid());
CREATE POLICY artist_own_listings ON listings FOR ALL USING (work_id IN (SELECT id FROM works WHERE artist_id = auth.uid()));
CREATE POLICY artist_own_assets ON asset_files FOR ALL USING (work_id IN (SELECT id FROM works WHERE artist_id = auth.uid()));
CREATE POLICY artist_own_testprints ON test_prints FOR ALL USING (listing_id IN (SELECT id FROM listings WHERE work_id IN (SELECT id FROM works WHERE artist_id = auth.uid())));
CREATE POLICY artist_own_sales ON sale_lines FOR ALL USING (artist_id = auth.uid());
CREATE POLICY artist_own_payouts ON payout_statements FOR ALL USING (artist_id = auth.uid());

-- Admin sees all (role-based)
CREATE POLICY admin_all_artists ON artists FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_all_works ON works FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_all_listings ON listings FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_all_assets ON asset_files FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_all_testprints ON test_prints FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_all_sales ON sale_lines FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_all_payouts ON payout_statements FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY admin_all_salons ON salon_events FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Salons are public read
CREATE POLICY salon_public_read ON salon_events FOR SELECT USING (TRUE);

-- Seed test artist
INSERT INTO artists (legal_name, display_name, email, status) VALUES ('Test Artist', 'Test Artist', 'test@deixisgallery.com', 'active');