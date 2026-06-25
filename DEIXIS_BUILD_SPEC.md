# DEIXIS — MASTER BUILD SPEC (SCOPE LOCK v1)

Status: LOCKED 2026-06-24
Owner: Ro (RedLantern Studios) · Client: Bilal Mohamed, Deixis Gallery
Domain: deixisofficial.com

---

## 0. WHAT DEIXIS IS

A curated, multi-artist consignment art gallery + online store (Barrio Logan, San Diego).

Revenue splits:
| Category | Split (Artist) | Basis | Fulfillment |
|---|---|---|---|
| Fine Art Prints | 60% | Net (after Prodigi + ship) | Prodigi POD |
| Original Artworks | 60% | Gross | Manual |
| Consignment Merch | 65% | Gross | Manual |
| Collaboration (Deixis-produced) | 50% | Net after production recouped | Manual |
| Deixis-produced, Artist-licensed | 40% | Gross | Manual |

A two-sided marketplace: buyer side (browse/checkout) + artist side (onboard -> upload -> approve -> list -> get paid monthly).

## 1. LOCKED ARCHITECTURE

Next.js storefront -> Shopify Storefront API (cart/checkout/orders) -> n8n (all business logic) -> Prodigi, Supabase, DocuSign, Drive, Stripe

Platform decisions: Shopify headless, Prodigi for POD, Supabase operational DB, n8n for all rules, DocuSign for agreements/W-9, Drive for artist folders.

## 2. ENTITY MODEL

Tables: artists, works, listings, asset_files, test_prints, sale_lines, payout_statements, salon_events.

## 3. STATE MACHINES

Artist Onboarding: applied -> reviewing -> accepted -> agreement_sent -> signed -> w9_received -> active. Gate: cannot reach active without signed agreement AND w9_on_file=true.

Listing (print): draft -> asset_uploaded -> qc_pass -> testprint_pending -> testprint_review -> approved -> live. Gate: NO listing goes live without artist sign-off on test print.

Order to Payout: order_paid -> fulfilled -> sale_line_recorded -> [month close] -> statement_draft -> statement_approved -> paid. Gate: payout blocked if w9_on_file=false.

## 4. n8n FLOWS

onboard-artist, agreement-signed, asset-qc, testprint-order, testprint-approval, order-ingest, fulfill-print, monthly-payout, salon-drop.

## 5. STOREFRONT

Brand: Orpheus Pro (titles), Aktiv Grotesk (body). Gyroscope logo. Palette: black/gray/blue/brown/yellow.
Pages: Home, Shop, Product (print/original), Artist, Salon, Cart, About, Artist portal.

## 6. PHASES

Phase 0: Foundations. Phase 1: Buyer storefront. Phase 2: Artist onboarding. Phase 3: Listing + approval gate. Phase 4: Payout ledger. Phase 5: Salon drops + portal + domain.

## 7. EDGE CASES / RISKS

Originals 1-of-1 sold-out instantly. Live Prodigi costs for net math. Edition-size lock. W-9 missing blocks payout but statement generates. Asset QC manual override. Tax/nexus via Shopify.

## 8. OPEN BLOCKERS

1. Domain registrar login
2. Shopify account
3. Prodigi API key
4. Stripe account
5. DocuSign templates
6. Airtable API access
