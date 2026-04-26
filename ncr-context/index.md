---
title: NCR Ecosystem — Context for VARs
tags: [ncr, counterpoint, platform, tech-debt, competitive]
---

# NCR Ecosystem — Context for VARs

Understanding where NCR sits — and what it can't do — is the foundation of the Canary co-sell story.

## What NCR is

A 140-year-old company that owns the physical retail transaction layer for approximately 80,000 store locations globally. The largest POS software supplier in the world. Currently in a painful transition from hardware company to software platform — shedding assets, cutting headcount, and chasing cloud margins while the market moves underneath them.

**Key facts:**
- ~11% global POS market share
- Split from NCR Atleos (ATMs) in October 2023
- Revenue $2.69B in 2025, declining — 2026 guidance $2.21–2.33B (down 13–18%)
- Stock down 40% since December 2025
- CEO Jim Kelly (ex-EVO Payments, ex-Global Payments): financial turnaround focus, not retail AI
- Jan 2026 NRF launch: "Voyix Commerce Platform" — microservices, AI analytics, all proprietary, no MCP

## The architecture problem

NCR Counterpoint was built for a world where stores close at night and reconcile their numbers at end-of-day. That is still the architecture:

- Inventory reconciliation: **batch** — end-of-day or scheduled interval
- Reporting: **batch** — snapshots, not live data
- Multi-store sync: **polling and batch replication** — not event-driven
- Loyalty updates: **post-transaction** — not in-flight

MCP requires millisecond responses. NCR's best honest answer is "near real-time." Agents don't do "near."

**The Voyix Commerce Platform launched in 2026 is microservices on top of legacy data models.** The plumbing changed. The data architecture did not. Real-time event streaming is not in the public roadmap.

## What NCR cannot build

NCR cannot:
- Expose an MCP endpoint that customer agents can query
- Enable touchless agent-authorised transactions
- Run ALX/VSM — a store-side AI agent that negotiates in real time with a customer's Claude
- Respond to customer agent queries in milliseconds at scale

And they won't build this soon: leadership is financial (not AI-native), the engineering challenge is structural (not a product cycle fix), and their VAR channel model means they'd have to cannibalise the partners who reach mid-market retail.

## Why this is good news for VARs

**NCR cannot control what VARs build on top of Counterpoint.**

A VAR that adds an MCP layer — that builds ALX — owns the agent interface between NCR's platform and every customer's Claude. NCR cannot easily replicate this without cannibalising the channel they depend on to reach mid-market retail.

The VAR owns Layer 4. NCR owns Layers 1–3. Both survive. The retailer wins. See [Architecture](../agents/architecture).

## The window

NCR is financially stressed, leadership is focused on cash flow, and no one at the top has retail AI vision. The window to establish the MCP layer in the NCR VAR channel is open right now. Shopify launched MCP in Summer 2025. Walmart's Sparky launched the same year. The enterprise reference points exist. Physical retail POS is the last frontier — and Counterpoint VARs are positioned to move first.

## Competitive context

| Tier | Competitors | MCP status |
|---|---|---|
| Enterprise POS | GK Software, Toshiba, Diebold | No MCP endpoint |
| Mid-market cloud | Lightspeed, Revel, Epos Now | No MCP endpoint |
| SMB cloud | Square, Shopify | Shopify: MCP live (Summer 2025). Square: no MCP |
| Restaurant | Toast | No retail MCP |

**No enterprise physical retail POS has a native MCP endpoint as of April 2026.** First mover in this category is available.

## Market size

| Stat | Source |
|---|---|
| POS market 2025 | $17–29B globally |
| POS market by 2033–2035 | $38–111B (CAGR 10–14%) |
| Agent-mediated consumer commerce by 2030 | $3–5 trillion (McKinsey) |
| Agent-mediated B2B purchasing by 2028 | $15 trillion (Gartner) |
| Consumers using AI during buying journeys (2025) | 45% (IBM/NRF, 18,000 respondents) |
| MCP SDK downloads per month (March 2026) | 97 million |
