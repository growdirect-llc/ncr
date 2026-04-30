---
title: Canary for NCR Counterpoint
tags: [home, overview]
---

# Canary for NCR Counterpoint

**Partner vault for NCR Counterpoint VARs.** The co-sell resource for adding Canary's analytics and agent layer on top of the Counterpoint platform your customers already run.

## What Canary is

Canary is an agent-native store operating system that runs above NCR Counterpoint. Two surfaces: an **analytics spine** (13 ARTS modules that turn Counterpoint data into operational intelligence) and **ALX/VSM** (the store agent — the MCP endpoint that connects customer Claudes to the store in real time).

Counterpoint is the transaction engine. Canary is what makes it intelligent.

## The agent model

Canary runs a hub-and-spoke agent network. Every store gets an ALX (Virtual Store Manager) — the store's MCP endpoint. A back office hub connects all store agents and monitors cross-store LP, transfers, OTB, and device health via Module A. The hub scales to corporate level regardless of org structure.

**No other NCR Counterpoint VAR has built this. No enterprise physical retail POS has a native MCP endpoint as of April 2026.**

→ [Agent network — how it works](agents/index)

## Site sections

| Section | For |
|---|---|
| [**Deployment Guide**](deployment/index) | **Start here** — Frame, People, Agents, Model, and Blueprint for all 6 Phase 1 modules |
| [Agent Network](agents/index) | The VSM architecture, hub-and-spoke model, MCP stack, roadmap |
| [Verticals](verticals/lawn-garden) | Vertical playbooks — L&G full, Armstrong proof case, others in development |
| [Modules](modules/index) | L1–L4 process decomposition of the 13-module Canary Retail Spine |
| [Why Canary](why-canary/index) | Positioning, market context, co-sell story |
| [Modernization](modernization/index) | The five-phase Counterpoint modernization path — observer to spine to platform |
| [NCR Context](ncr-context/index) | NCR platform analysis — why they can't build Layer 4 |
| [Integration](integration/index) | Counterpoint API surface and connection model |
| [Specs](specs/index) | Architecture and integration depth — master SDD, endpoint catalog, document model, OpenAPI spec |
| [Sandbox](sandbox/index) | Path to demo |
| [Pitch](pitch/index) | Leave-behinds |

## Verticals covered

- [Lawn & Garden](verticals/lawn-garden) — lead vertical; full playbook + [Armstrong proof case](verticals/armstrong)
- [Feed & Tack](verticals/feed-tack), [Gun & Sporting](verticals/gun), [Beverage](verticals/beverage), [Wine & Spirits](verticals/wine-spirits) — in development
