---
title: J — Forecast & Order
tags: [module, forecast, order, otb, counterpoint-partial]
---

# J — Forecast & Order

**Coverage:** ◐ Partial — Counterpoint covers PO/PREQ/RECVR/RTV via Document family; demand forecasting, replenishment parameters, and OTB management are Canary-native gaps
**Ring:** v2 — design complete, implementation in progress
**Ledger role:** Subscriber (sales history) + Publisher (orders)

## What it does

Counterpoint is the *order* platform. It does POs, purchase requests, receiving, and returns-to-vendor extremely well — all through the Document omnibus. What it doesn't do: forecast demand, enforce open-to-buy constraints, or recommend replenishment. J fills the plan side natively while reading the order side as substrate.

For a Lawn & Garden operator, J matters more than in most retail verticals. Spring revenue is 40–60% of annual revenue. Cash flow is negative in winter. An overbuy in spring compounds into a cash-flow problem by summer. An underbuy means empty shelves during the peak 6-week window. J's OTB guardrails and seasonal demand model are the difference between a profitable spring and a liquidity crisis.

## L2 process areas

### J.1 Demand forecasting ★ Canary-native

Counterpoint exposes no forecast endpoint. Canary builds the demand model from T module transaction history.

**L&G shape:** Standard retail forecasting assumes a stable SKU base with stable seasonality. Garden centers break both assumptions. Items appear mid-season as new growers show up. Spring demand is weather-dependent — a cold April compresses the peak window, a warm March expands it. Canary's L&G demand model is weather-adjusted and treats the catalog as dynamic.

**L4 key activities:**

| Activity | Counterpoint input | Canary-native logic |
|---|---|---|
| Historical sales pull | `PS_DOC_LIN` via T module (2+ years) | Seasonal decomposition; spring/fall/shoulder segmentation |
| Weather adjustment | External API (NOAA or similar) | Degree-day model for spring demand onset |
| Promotion lift isolation | P module event feed | Promotional periods quarantined from base forecast |
| New item handling | Items_ByLocation delta | No history = supplier-average default; update on first 4 weeks of sales |

### J.2 Replenishment parameters ★ Canary-native

Min/max, lead time, safety stock per SKU-location. Counterpoint stores these but doesn't derive them.

**L&G adaptation:** Replenishment for live goods isn't the same as replenishment for hard goods. Lead time from a mid-tier grower (PDF/email order) is 2–3 weeks. Lead time from a hobbyist grower is undefined — they show up when they have plants. Safety stock for live goods must account for shrink rate (dead-on-arrival + in-store decay), not just demand variance.

### J.3 Open-to-Buy management ★ Canary-native

OTB pyramid: plan (season-level budget) → commit (POs placed) → receipt (goods received). Canary enforces guardrails at the commit stage — a buyer can't place a PO that would breach their seasonal OTB without an escalation.

**L&G relevance:** OTB is critical during spring build. Buyers face strong vendor pressure to commit early. Canary's OTB guardrails prevent spring overbuy — the most common cash-flow error at independent garden centers.

### J.4 PO recommendation + approval — bridge

Canary forecasts demand → derives replenishment need → generates a PO recommendation → buyer reviews in Canary → approves → PO enters Counterpoint.

Default posture (v2): buyer-enters-in-Counterpoint-UI. Canary shows the recommended quantities; the buyer creates the PO manually in Counterpoint. Low coupling, zero API write-back risk.

Optional (v3+): Canary `POST /Document` with `DOC_TYP=PO`. Requires write-tier API key permissions. Buyer approves in Canary; Canary writes the PO into Counterpoint directly.

### J.5 PO generation + transmission ◐ Counterpoint-substrate

`DOC_TYP=PO` via Document omnibus. Three vendor tiers on a typical L&G installation:

| Vendor tier | Tech profile | PO transmission |
|---|---|---|
| Large commercial nursery | EDI-capable | EDI 850 or Counterpoint PO print/email |
| Mid-tier wholesale grower | PDF/email | Counterpoint PO → PDF → email |
| Hobbyist/specialty grower | Cash-and-paper | No PO; back-door verbal; post-facto receipt entry |

Canary produces a PO for tiers 1 and 2. Tier 3 is tracked post-receipt only.

### J.6 Receiving + 3-way match ◐ Counterpoint-substrate

`DOC_TYP=RECVR` via Document omnibus. Canary reads the receiver to validate against the original PO: PO quantity vs received quantity vs vendor invoice.

**L&G adaptation:** Receivers from paper-invoice vendors will have thin metadata — fields missing or defaulted. Adapter flags-and-ingests; it does not reject. Missing cost-basis fields are filled from the PO or from InventoryCost.

### J.7 Short-ship + RTV ◐ Counterpoint-substrate

`DOC_TYP=RTV` via Document omnibus. Live-goods RTV (dead-on-arrival plants, wrong cultivar) is a distinct pattern from standard merchandise RTV. Q module monitors RTV patterns for potential receiving fraud (ASSUMPTION-J-12).

### J.8 Promotional demand isolation — cross-module contract

Spring promotions drive significant demand lift. That lift must be quarantined from the next-year base forecast. J contracts with P (Pricing & Promotion) module for a promotion calendar feed. Periods flagged as promotional are excluded from the base demand model and tracked separately.

## L&G-specific open questions

1. How does a Rapid Garden POS installation handle live-goods RTV — is there a specific `DOC_TYP` or is it a standard RTV with a reason code? (ASSUMPTION-J-12)
2. Does the buyer at a typical L&G chain use Counterpoint's replenishment UI, or is replenishment done externally (spreadsheet / vendor portal)? (ASSUMPTION-J-08)
3. What is the typical spring PO commit window — when do large nurseries require binding commitments? (ASSUMPTION-J-03)

Resolve against the Monday Bart call (2026-04-27) and subsequent sandbox access.
