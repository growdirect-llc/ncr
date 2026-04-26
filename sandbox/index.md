---
title: Sandbox — Path to Demo
tags: [sandbox, demo, counterpoint, setup]
---

# Sandbox — Path to Demo

Getting Canary connected to a Counterpoint instance for evaluation requires an API key from an active installation. This page describes the options.

## Option 1: Rapid Garden POS shared sandbox

Rapid Garden POS maintains a shared Counterpoint sandbox environment for partner evaluation. Contact Bart McCleskey (bart@rapidpos.com) to request sandbox credentials.

What you get: a Counterpoint installation with representative L&G data — items, customers, transactions, inventory positions, transfers. Enough to run all five priority modules (T, Q, D, J, C) end-to-end.

## Option 2: Customer pilot installation

The cleanest evaluation is against a real customer's Counterpoint data. If you have a customer willing to run a 30-day pilot:

1. Customer grants Canary a read-tier API key from their Counterpoint installation
2. GrowDirect provisions a tenant in the Canary environment
3. T module begins ingesting; Q alerts start appearing within 24-48 hours of the first full transaction day
4. GM reviews the first exception dashboard at end of week 1

No changes to the customer's POS workflow at any point.

## Option 3: GrowDirect-hosted sandbox

GrowDirect maintains its own Counterpoint sandbox with synthetic L&G data. Contact gclyle@growdirect.io to request access.

## Connection checklist

Before connecting, verify:

- [ ] Counterpoint version 8.5.6 or later (REST API required)
- [ ] API key with read permissions for: Document, Customer, Items_ByLocation, Inventory_ByLocation, InventoryControl, InventoryCost
- [ ] Company ID(s) for the target companies
- [ ] Network: API accessible from Canary cloud (IP allowlist may need GrowDirect's egress IPs)

Full setup runbook: contact GrowDirect.
