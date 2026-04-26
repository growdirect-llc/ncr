---
title: VSM — Virtual Store Manager
tags: [vsm, alx, mcp, agent, store]
---

# VSM — Virtual Store Manager

ALX is the store agent. It is Canary's primary customer-facing differentiator.

## What ALX holds

At any moment, ALX has access to:

- Real-time inventory and SKU locations (from T module ingestion of Counterpoint)
- Live promotions and margin targets (P module)
- Active LP alerts and exception queue (Q module)
- Staff availability by zone (L module, where active)
- Device status and sensor data across the store (A module)
- Demand signals from other store agents that day (back office hub)
- Store brand voice, policies, and service standards
- 130+ years of domain knowledge (for L&G: plant diagnostics, care protocols, seasonal calendars)

## What ALX does

**Customer-facing:**
- Receives incoming customer Claude agent via MCP handshake
- Answers real-time inventory queries: "Is the 5-gallon Meyer lemon in stock?"
- Delivers domain-specific intelligence: diagnoses plant symptoms, recommends care protocols, suggests products
- Routes to human associates when the conversation requires it
- Settles transactions to customer accounts — touchless checkout
- Logs visit feedback and purchase context post-transaction

**Operator-facing:**
- Surfaces LP alerts to GM via Owl
- Reports exception queue to Fox for case management
- Feeds cross-store signals to the back office hub
- Monitors device heartbeats via Module A

## The interaction model

```
Customer's Claude (phone / wearable)
         │
         │ MCP / HTTPS + SSE / JSON-RPC 2.0
         ▼
    ALX (store MCP server)
         │
         ├── check_inventory(item, store)
         ├── get_diagnosis(symptom, plant_type, region)
         ├── get_product_recommendation(diagnosis, store)
         ├── get_pricing(sku, customer_tier)
         ├── find_in_store(product, store)
         ├── authorise_transaction(customer_id, basket)
         └── log_visit(customer_id, outcome)
         │
         ▼
    NCR Counterpoint (via REST API / ODBC)
```

Two agents. One conversation. No human required unless ALX decides otherwise.

## Why this is Canary's differentiator

Every other analytics layer on Counterpoint is a dashboard that humans read. ALX is an agent that *acts*. The spine modules (T/Q/D/J) are the knowledge engine. ALX is the interface. A VAR that deploys Canary doesn't just give retailers better reports — they give retailers a store agent that any customer's AI can talk to.

No other NCR Counterpoint VAR has built this. No other entity will build it before the window closes.

## Domain knowledge: the L&G example

For Lawn & Garden deployments, ALX encodes vertical domain knowledge that has never been in a machine-readable system:

| Knowledge type | Example |
|---|---|
| Plant diagnostics | Symptom → diagnosis → treatment tree for 500+ species |
| Zone-aware care | Sunset Climate Zone filtering on all recommendations |
| Seasonal availability | Month-by-month planting calendars for SoCal zones |
| Soil and amendment protocols | By plant type + current soil conditions |
| Pest identification | Symptom → pest → organic/conventional treatment |
| Companion planting | Compatible species combinations |

An Armstrong customer who walks in and says "My Meyer lemon leaves are yellowing" gets a 136-year-old horticulture firm's answer in their pocket before they reach the soil aisle.

→ [Architecture — the full stack](architecture)
→ [Verticals — L&G playbook](../verticals/lawn-garden)
→ [Armstrong Garden Centers — proof case](../verticals/armstrong)
