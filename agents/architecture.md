---
title: Architecture — The MCP Stack
tags: [architecture, mcp, counterpoint, layers]
---

# Architecture — The MCP Stack

## The five layers

```
┌─────────────────────────────────────────────┐
│  LAYER 5 — CUSTOMER                         │
│  Claude agent on phone / wearable           │
│  Knows: preferences, history, budget,       │
│  prior research, device ownership           │
└──────────────┬──────────────────────────────┘
               │  MCP protocol
               │  HTTPS + streaming (SSE)
               │  JSON-RPC 2.0
               ▼
┌─────────────────────────────────────────────┐ ◄── Canary owns this
│  LAYER 4 — ALX / VSM                        │
│  RapidPOS MCP Server (Canary-powered)       │
│  • Exposes MCP tools to customer agents     │
│  • Inventory, pricing, LP, diagnostics      │
│  • Payment / settlement trigger             │
│  • Associate deployment signal              │
│  • Back office hub connectivity             │
│  • Module A device heartbeat surface        │
└──────────────┬──────────────────────────────┘
               │  NCR REST API / ODBC
               │  (query-based, not event-driven)
               ▼
┌─────────────────────────────────────────────┐
│  LAYER 3 — NCR COUNTERPOINT                 │
│  POS Software Platform                      │
│  • Inventory (batch-reconciled)             │
│  • Customer / loyalty records               │
│  • Pricing engine + promotions              │
│  • Transaction processing                   │
│  • Document omnibus (all transaction types) │
└──────────────┬──────────────────────────────┘
               │  Store LAN
               ▼
┌─────────────────────────────────────────────┐
│  LAYER 2 — NCR HARDWARE                     │
│  POS terminals, self-checkout, mobile,      │
│  barcode / RFID / CV sensors, Edge node     │
└──────────────┬──────────────────────────────┘
               ▼
┌─────────────────────────────────────────────┐
│  LAYER 1 — THE STORE                        │
│  Products, associates, customers            │
└─────────────────────────────────────────────┘
```

## Why Layer 4 is the prize

NCR owns Layers 1–3. They cannot build Layer 4 — their batch architecture cannot deliver the millisecond responses MCP requires, and their payments-focused leadership is not thinking about agent protocols. See [NCR Context](../ncr-context/index).

The customer's Claude owns Layer 5.

**Layer 4 — the MCP server — is the only layer nobody owns yet.**

Whoever establishes Layer 4 across the NCR VAR channel controls the agent interface for every retailer on Counterpoint. That is the business.

## Hub and spoke at scale

A single-store deployment runs ALX at Layer 4 for that store. A multi-store deployment adds the back office hub:

```
Back Office Agent (hub)
    │
    ├── Aggregates Q alerts across all stores
    ├── Monitors D transfer positions network-wide
    ├── Reads Module A heartbeat on every device
    ├── Surfaces J OTB status by store / by category
    └── Connects upward to corporate if org requires it
    │
    ├── Store ALX — Location A
    ├── Store ALX — Location B
    └── Store ALX — Location C
```

The network scales to any org structure. The back office hub adds no new infrastructure — it runs on the same Canary stack as the store agents.

## MCP tool surface (Layer 4)

| MCP tool | Counterpoint source | Response time target |
|---|---|---|
| `check_inventory` | `Inventory_ByLocation` | < 200ms |
| `get_pricing` | Price levels + promotions | < 200ms |
| `get_customer_account` | Customer / loyalty records | < 200ms |
| `find_in_store` | Zone / aisle config | < 100ms (cached) |
| `diagnose_plant` | Domain knowledge vault | < 300ms |
| `get_product_recommendation` | Diagnosis tree + inventory | < 300ms |
| `authorise_transaction` | Payment gateway | < 500ms |
| `log_visit` | Customer record update | async |

Counterpoint's batch architecture means some queries hit stale data (last-reconcile-cycle inventory). ALX handles this by caching recent T module ingest — the last-known inventory state from the Canary perpetual ledger, not the Counterpoint snapshot. This is more accurate than Counterpoint's own reporting surface in high-velocity periods.
