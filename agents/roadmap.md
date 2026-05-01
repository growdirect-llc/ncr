---
title: Roadmap — Pilot Through Holiday 2027
tags: [roadmap, pilot, retail-calendar, phases]
---

# Roadmap — Pilot Through Holiday 2027

The roadmap is anchored to the retail calendar, not to the engineering team's preferred quarters. Two windows govern: **Holiday 2026** and **Holiday 2027**. The 18-month arc between them is the work; everything else is sequencing to feed those windows.

## What the pilot looks like

One Lawn & Garden retailer running NCR Counterpoint, deployed by Rapid POS. One read-tier API key. No new hardware. No POS workflow change. No staff retraining. Canary connects, ingests, and produces operational signal on day one.

What lands at the retailer in the pilot:

- **Daily transaction ingest** — every PS_DOC SALES, RETURN, ADJUSTMENT, XFER, RECVR pulled from Counterpoint and sealed into the EJ Spine
- **23 detection rules running 24/7** — garden-center-tuned: drawer discrepancy, abnormal discount, void clustering, refund pattern, after-hours adjustment, multi-authority tax mismatch, the full Q catalog
- **Weekly LP review surface** — Fox cases ranked by severity, evidence chain attached, owner assigned
- **Operational dashboard** — store-by-store sell-through, margin variance, shrink concentration, refreshed against the EJ Spine
- **VAR-led onboarding** — Rapid POS owns the merchant relationship; Canary owns the data layer and the operator surface

What does **not** land in the pilot: customer-facing AI, touchless checkout, agent-mediated ordering. Those are 2027 capabilities. The pilot proves the substrate; the agent layer comes after the substrate is stable.

## The next 90 days — May–Jul 2026 (pilot launch)

Spring 2026's transaction tail is the richest signal we will see for nine months. Peak-season data is what calibrates Q's rule thresholds and surfaces the patterns LP would otherwise wait a full year to observe.

| Week | Milestone |
|---|---|
| 1–2 | Counterpoint REST API connection live; auth adapter validated; Company-ID resolution complete |
| 3–4 | Historical backfill — 12 months of transactions pulled, sealed, parsed into the EJ Spine |
| 5–6 | Module T live; Module Q rules firing; first Fox cases generated; LP review cadence established |
| 7–8 | Module S substrate (item master, store/station config) live; multi-store reconciliation surface online |
| 9–12 | Performance tuning; rule threshold calibration to retailer-specific patterns; operator training; first weekly business review with retailer GM |

**By end of Jul 2026:** modules T, Q, S running; weekly LP cadence in operation; first 30 Fox cases reviewed; performance baseline established against summer transaction volume.

## Pre-holiday hardening — Aug–Oct 2026

Three months to finish Phase 1 and lock the stack down before peak. This is where rule thresholds get calibrated to the retailer's seasonal staff patterns and where multi-store reconciliation comes online.

- Module R (Customer) ingestion live
- Module N (Device) telemetry live
- Module D (Distribution) — transfer-loss reconciliation operational
- Performance testing against Holiday-equivalent transaction load
- Detection rules calibrated to seasonal-staff baseline (the cashier turnover problem is structurally different in Nov–Dec)
- LP escalation playbook signed off with the retailer's GM and LP lead

## Holiday 2026 — first scale test (Nov–Dec 2026)

The retailer's busiest weeks. Canary's first proof-of-load.

What we expect to demonstrate:

- Phase 1 spine (T, Q, S, R, N, D) running under peak transaction volume without degradation
- Real-time Q detection during peak hours — abnormal void / discount / drawer-discrepancy patterns surfaced within minutes, not next-day
- Holiday shrink concentration visible by store, by category, by tender type
- Operational dashboard refresh latency under 2 seconds at peak load
- Audit-grade evidence chain on every transaction — year-end close completes in days, not weeks

What we explicitly do **not** promise at Holiday 2026: customer-facing agent transactions, touchless checkout, MCP-mediated ordering. Those ship in 2027.

## Q1 2027 — post-holiday review + Phase 2 build

Holiday data is the input for Phase 2. Three modules enter build:

- **Module C (Commercial)** — B2B/landscaper account risk scoring; AR aging exception detection
- **Module F (Finance)** — supplier invoice 3-way match (PO + ASN + invoice); COGS posting via OAuth bridge to the merchant's QuickBooks / Xero
- **Module J (Forecast & Order)** — demand forecast using the full 12-month + holiday baseline; OTB enforcement; replenishment recommendation engine

Multi-store pilot expansion: a second pilot site joins, then a third. Each addition stress-tests multi-tenant scale before the spring peak.

## Spring 2027 — the L&G peak (Apr–May 2027)

L&G's spring is 40–60% of annual revenue. It is where Module J earns its keep or doesn't. Forecast, OTB, and buyer workflow run live for the first time against real seasonal demand.

What we expect to demonstrate:

- Module J producing demand forecasts that match buyer instinct on the routine SKUs and surface insight on the surprises
- OTB enforcement preventing overbuy without slowing the buyer down
- Multi-store transfer recommendations actively executed against transit inventory
- Module C surfacing landscaper account credit risk before the spring AR balance balloons

This is where the platform stops being an LP-and-analytics layer and becomes merchandising infrastructure.

## Q3 2027 — vertical expansion + Phase 3 design

Two parallel tracks:

- **Vertical pack development** — Feed & Tack, Gun & Sporting, Beverage, Wine & Spirits. Each pack defines its own detection rules, pricing patterns, and seasonal calendar overlay; all built on the same 13-module spine.
- **Phase 3 module design** — Module S (Space, Range, Display) v3, Module P (Pricing & Promotion) v3, Module L (Labor) v3, Module W (Work Execution) v3. These are v3 capabilities with longer build cycles.

Multi-VAR onboarding: a second Counterpoint VAR begins channel partnership; the Rapid POS deployment becomes the published proof case.

## Holiday 2027 — full stack at scale (Nov–Dec 2027)

The 18-month finish line. By this window:

- All Phase 1 modules (T, Q, S, R, N, D) running at multiple retailers under peak load
- All Phase 2 modules (C, F, J) in production at the lead pilots; rolling out at expansion sites
- ALX/VSM customer-facing read surface live — customer Claude can query inventory, get plant diagnostics, surface store-specific recommendations via MCP. Transaction authorization via MCP is in beta, not GA.
- Cross-store back-office hub active — multi-store pilots running through the network
- Four+ verticals supported by named vertical packs

What we explicitly do **not** have at Holiday 2027: full Phase 3 (S, P, L, W) — that is 2028 work. Autonomous ALX (proactive customer outreach, demand prediction) — that is post-2027.

## The two-window summary

| Window | What's live | What it proves |
|---|---|---|
| **Holiday 2026** | T, Q, S, R, N, D — Phase 1 spine | Canary survives peak load; LP + operations baseline established |
| **Spring 2027** | + C, F, J — Phase 2 commercial spine | Forecasting, OTB, and B2B intelligence land at L&G's peak revenue window |
| **Holiday 2027** | + multi-vertical, + customer-facing read MCP | Multi-retailer scale; customer-agent surface live (read-tier) |

Everything else is timing. The pilot launches now; the calendar does the rest.

## See also

- [Deployment Guide](../deployment/index) — Phase 1 module activation sequence and the 7-day onboarding cadence
- [Modules](../modules/index) — L1–L4 process decomposition for the 13-module spine
- [Sandbox](../sandbox/index) — path to a working demo environment
