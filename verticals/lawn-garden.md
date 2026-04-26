---
title: Lawn & Garden — Vertical Playbook
tags: [vertical, lawn-garden, rapid-pos, counterpoint]
---

# Lawn & Garden — Vertical Playbook

**POS platform:** NCR Counterpoint via Rapid Garden POS
**VAR:** Rapid Garden POS (Rapid POS LLC)
**Status:** Lead vertical — full playbook

## The customer in one paragraph

A garden center on Rapid Garden POS is a Counterpoint installation with vertical-specific configuration layered on top: mix-and-match pricing for pot/plant/accessory bundles, fractional unit tracking for partial flats and cut quantities, grow-care instruction printing at POS, and retail + wholesale workflows on the same system. The customer is sophisticated enough to be on Counterpoint but not large enough to have an enterprise BI layer on top. That gap is the Canary opportunity.

## Who runs these stores

| Profile | Scale | Counterpoint usage |
|---|---|---|
| Regional multi-store chain | 5–30 locations | Full Counterpoint; multi-store transfers; some OTB discipline |
| Destination independent | 1–3 large-format stores | Full Counterpoint; omnichannel (online + store + landscape) |
| Single-location independent | 1 store | Counterpoint basics; minimal analytics; everything on intuition |

All three are Canary targets. Priority order for initial channel outreach: regional multi-store (distribution and transfer modules have immediate ROI), then destination independent (LP module and commercial intelligence), then single-location (foundation modules only).

## Pain catalog

These 10 pain themes emerged from public Counterpoint community research. Validate and prioritize against Bart's customer knowledge.

| # | Pain | Canary module | Counterpoint gap |
|---|---|---|---|
| 1 | No visibility into transfer losses between locations | D | Transfers via Document XFER; no reconciliation layer |
| 2 | Spring overbuy creates summer cash-flow crunch | J | Counterpoint has no OTB enforcement; replenishment is UI-only |
| 3 | Dead-count shrink is tracked manually or not at all | Q + D | Write-off DOC_TYP exists; no analytics over it |
| 4 | Discount abuse by seasonal staff is invisible | Q | Rules exist in Counterpoint; no detection engine |
| 5 | Landscaper/commercial account risk is unknown | C | CATEG_COD + AR exist; no risk scoring |
| 6 | Multi-store stock rebalancing is a whiteboard exercise | D | Inventory_ByLocation is rich; no recommendation engine |
| 7 | Demand forecasting is "same as last year" | J | No forecast endpoint in Counterpoint |
| 8 | Vendor data quality is inconsistent (paper invoices, cash) | T + F | Counterpoint stores what staff enter; no flagging layer |
| 9 | Cash vendor payments create audit trail gaps | Q + F | Cash pay-outs exist in Counterpoint; no digital trail capture |
| 10 | Seasonal staff ramp creates LP blind spot | Q | Rule thresholds don't adjust for seasonal staffing patterns |

## Canary module fit by priority

| Priority | Module | Why |
|---|---|---|
| 1 | Q — Loss Prevention | Every Counterpoint L&G install has the audit substrate; detection layer is universal |
| 2 | D — Distribution | Multi-location transfer loss and rebalancing are felt pains at any chain |
| 3 | J — Forecast & Order | OTB enforcement matters most for spring-driven cash flow |
| 4 | C — Commercial | Landscaper account intelligence is a revenue-protection play |
| 5 | T — Transaction Pipeline | Foundation for all of the above; ships first |

## The operating environment

Garden centers have three unusual characteristics that affect integration design:

**Vendor heterogeneity.** Large nurseries are EDI-capable. Mid-tier growers use PDF/email. Hobbyist and specialty growers are cash-and-paper. The same item may come from all three in a single season. Canary's integration must tolerate thin metadata on receivers without rejecting.

**Seasonal revenue concentration.** Spring (March–May) is 40–60% of annual revenue in temperate zones. Peak-season staff is 2–4x baseline. Loss prevention rules must be calibrated for seasonal staff patterns; demand forecasts must be weather-adjusted.

**Live goods perishability.** Dead-count shrink is a real P&L line item — plants that die before sale. This is distinct from standard merchandise shrink and requires its own tracking path in Q and D.

## How to pitch Canary to an L&G retailer

One sentence: **"Canary is the enterprise analytics and operations layer you'd get from a custom BI build, deployed on top of the Counterpoint installation you already run — no changes to your POS workflow."**

Key angles by audience:

| Audience | Lead with |
|---|---|
| Store owner / GM | Reduce spring overbuy; catch shrink earlier |
| LP manager | 23 detection rules running on every transaction, 24/7 |
| Operations director | Multi-store transfer visibility + distribution recommendations |
| CFO / controller | 3-way match on every PO; landscaper account risk scoring |

## What Canary does NOT do

- Replace Counterpoint
- Change how cashiers ring transactions
- Require a separate POS terminal or hardware
- Require EDI capability from the retailer

## See also

- [Module Q — Loss Prevention](../modules/Q-loss-prevention)
- [Module J — Forecast & Order](../modules/J-forecast-order)
- [Module D — Distribution](../modules/D-distribution)
- [Integration — Counterpoint API surface](../integration/index)
- [Sandbox — path to demo](../sandbox/index)
