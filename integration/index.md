---
title: Counterpoint API — Integration Surface
tags: [integration, counterpoint, api, endpoints]
---

# Counterpoint API — Integration Surface

Canary connects to NCR Counterpoint via the Counterpoint REST API. This section describes the endpoints Canary uses, the Document model that underpins most data flow, and the polling architecture.

## Connection model

Canary uses **polling, not webhooks**. Counterpoint does not push events; Canary pulls on a configurable cadence (60s steady-state, 15s during active store hours).

Authentication: Counterpoint API key + company ID. Canary requires a read-tier key for all standard modules. Module O (PO write-back, v3 optional) requires a write-tier key.

## The Document omnibus

The Document family is Counterpoint's central data structure. Sales, returns, voids, transfers, purchase orders, receivers, and RTVs all travel through it, distinguished by `DOC_TYP`.

| `DOC_TYP` | What it is | Canary module |
|---|---|---|
| `SALE` | Point-of-sale transaction | T, Q |
| `RTRN` | Customer return | T, Q |
| `VOID` | Voided transaction | Q |
| `XFER` | Inter-location transfer | D |
| `PO` | Purchase order | J |
| `PREQ` | Purchase requisition | J |
| `RECVR` | Receiving document | J, F, D |
| `RTV` | Return to vendor | J, Q |

## Key endpoint families

| Endpoint family | Canary use |
|---|---|
| `Document` (GET) | T ingestion — the primary poll target |
| `Document` (POST) | J PO write-back (v3+, optional) |
| `Customer` | R customer registry |
| `Items_ByLocation` | D inventory snapshot |
| `Inventory_ByLocation` | D per-location attribution |
| `InventoryControl` | D replenishment parameters |
| `InventoryCost` | D + F cost basis |
| `InventoryLocations` | D location registry |
| `VendorItem` | J vendor-item relationships |
| `PS_WRK_STA` | N device registry |
| `PS_DRW` / `PS_DRW_SESSION` | Q drawer integrity |

## Garden-center adapter notes

- **Thin receiver metadata:** Paper-invoice receives may have missing or defaulted fields. Canary flags-and-ingests rather than rejecting.
- **Item-code drift:** Same plant variety may appear under multiple `ITEM_NO` over time. Adapter tolerates this; joins use fuzzy matching where needed.
- **DOC_TYP for live-goods write-offs:** TBD — verify against real Rapid Garden POS install. (ASSUMPTION-T-07)
- **Multi-company setup:** Some operators run multiple Counterpoint companies on one server. Canary supports multi-company tenants; each company maps to a separate tenant context.

## Sandbox access

See [Sandbox](../sandbox/index) for how to get API key access to a Rapid Garden POS Counterpoint instance for evaluation.
