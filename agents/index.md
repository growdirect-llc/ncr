---
title: Canary Agent Network
tags: [agents, vsm, alx, mcp, hub-spoke, architecture]
---

# Canary Agent Network

## The model: hub and spoke

Canary's agent architecture is a hub-and-spoke network that scales from a single store to an enterprise with any org structure — flat, regional, or multi-tier corporate.

```
                         Corporate Agent
                               │
                    Back Office Agent (hub)
                    ├── Analytics + LP dashboard
                    ├── Module A heartbeat bus
                    └── Cross-store ops visibility
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
   Store Agent (VSM)   Store Agent (VSM)   Store Agent (VSM)
   ALX — Store A       ALX — Store B       ALX — Store C
          │                    │                    │
   NCR Counterpoint    NCR Counterpoint    NCR Counterpoint
          │                    │                    │
   Devices (A module)  Devices (A module)  Devices (A module)
```

**Store agent (ALX/VSM):** The store's MCP endpoint. Answers customer agents in real time. Handles inventory, pricing, account settlement, associate deployment.

**Back office agent (hub):** Connects to all store agents. Monitors LP alerts, transfer loss, OTB status, and device heartbeats across the network via Module A. The operator's cross-store intelligence surface.

**Module A — the heartbeat bus:** Device registry and telemetry layer. Back office agent queries Module A to check the status of any device at any store — POS terminals, self-checkout, edge nodes, sensors. Loss prevention signals from Module Q route through the back office hub for cross-store pattern detection.

**Corporate escalation:** The hub connects upward. Whether the org is a 3-store independent or a 30-store regional chain with a regional VP layer, the agent network conforms to whatever org structure exists. Flat orgs get a single hub. Complex orgs get a hub-of-hubs.

## Why this matters for VARs

You deploy ALX at the store level. The back office hub comes with it. The retailer gets enterprise-grade cross-store visibility without enterprise infrastructure. The network is the product.

→ [VSM — the store agent](vsm)
→ [Architecture — the MCP stack](architecture)
→ [Roadmap](roadmap)
