---
title: Canary for Counterpoint — Deployment Guide
tags: [deployment, solution-guide, phase-1, activation]
---

# Canary for Counterpoint — Deployment Guide

> **Governing thesis:** NCR Counterpoint is the richest data source in SMB retail — tender taxonomy, item cost floors, drawer flags, inventory snapshots, customer tiers — and it has never been wired to a detection layer. Canary closes that gap. Six modules, one activation sequence, one agent layer on top. Every alert is traceable back to a Counterpoint record.

---

## Executive Summary

Canary ingests the Counterpoint data that operators already generate — transactions, tender types, item costs, inventory levels — and continuously evaluates it against a detection rule set tuned for the garden center and hardgoods verticals.

Phase 1 delivers six interconnected modules:

| Module | What it does |
|---|---|
| [S — Store & Device](../modules/S-space) | Establishes operational context: which store, which station, which session |
| [I — Item Catalog](../modules/index) | Sets the cost and margin floor for every item sold |
| [F — Finance/Tender](../modules/F-finance) | Classifies how money moves: cash, card, AR, gift card |
| [C — Customer](../modules/C-customer) | Identifies who is buying, their tier, and their AR standing |
| [D — Distribution/Inventory](../modules/D-distribution) | Tracks on-hand quantity against what the register reports sold |
| [Q — Loss Prevention](../modules/Q-loss-prevention) | Detects when S/I/F/R/D signals diverge from expected patterns |

The detection output surfaces as Chirp alerts in the Canary dashboard. ALX — the Canary retail ops agent — explains every alert in plain language and holds context across sessions. A human investigator owns every case from triage to closure.

---

## 1. Frame — Strategy

### The problem Counterpoint merchants actually have

NCR Counterpoint gives SMB operators more operational data than any other SMB POS: cost-of-goods on every line item, a tender taxonomy with drawer flags, per-customer AR balances, and a full transaction audit log. Most merchants have none of that wired to anything. They get a Z-report at the end of the day and a gut feeling.

The result is predictable. Margin erosion happens at the item level — a cashier discounts below cost on an item the owner never flagged as discountable. Cash handling problems accumulate across sessions before they're visible in the bank account. Inventory shrinkage in a garden center is written off to plant death when it's actually a receiving dock pattern. None of these are caught by the POS. All of them are detectable with the data Counterpoint already holds.

### Why these six modules

The six Phase 1 modules are not six features. They are one system. S, I, F, and R are **substrates** — they supply the context that makes detection meaningful. D is **enrichment** — it adds the inventory signal that transactions alone can't provide. Q is the **output** — it fires when the substrates diverge from the norm.

You cannot run Q without S (no store context), I (no cost floor), or F (no tender classification). The activation sequence enforces this dependency. The detection rules are as good as the substrate data beneath them.

### The Rapid POS angle

Rapid POS deploys and supports Counterpoint for garden centers and hardgoods retailers. The VAR relationship means:

- Rapid POS already holds the merchant relationship and trust
- Installation is a field operation — the VAR rep runs activation
- Calibration draws on the VAR rep's knowledge of how each merchant has configured their system

Canary doesn't replace the VAR relationship. It gives the VAR something to sell on renewal and a reason for the merchant to stay on the platform.

### Phase 1 scope

| Capability | Phase |
|---|---|
| Discount / margin detection | **1** |
| Void and return anomalies | **1** |
| Cash handling and tender mix | **1** |
| Inventory shrinkage | **1** |
| Labor / timecard anomalies | 6 |
| Pricing & promotion analysis | 3 |
| Gift card fraud | 2 |
| Loyalty manipulation | 2 |

---

## 2. People — Roles & Responsibilities

### Tenant side

| Role | What they do in Canary |
|---|---|
| **Owner / Operator** | Reviews Chirp alerts, approves Fox case findings, sets rule calibration with VAR rep at go-live |
| **Store Manager** | Receives location-scoped alerts, provides context on flagged sessions |
| **LP Investigator** | Works Fox cases from triage to closure — reviews evidence, documents findings |
| **Cashier / Associate** | Subject of detection. Never interacts with Canary directly. No visibility into the system. |

### Delivery side

| Role | What they do |
|---|---|
| **VAR Installer** | Runs the onboarding wizard, enters Counterpoint credentials, validates reference data, sets vertical profile and dry-run duration |
| **Canary Platform** | Monitors activation health, resolves credential errors. Not in the activation flow for standard deployments. |

### Responsibility matrix

| Action | Owner/Op | Store Mgr | LP Inv | VAR Installer |
|---|---|---|---|---|
| Counterpoint credential entry | | | | **R** |
| Activation (Phase A–C) | | | | **R** |
| Dry-run → live decision | **R** | | | consult |
| Alert triage | consult | **R** | consult | |
| Fox case investigation | consult | consult | **R** | |
| Case closure | **R** | | consult | |
| Rule threshold adjustment | **R** | | | consult |

### Who never touches the system

Cashiers and associates have no Canary account and no visibility into alerts during Phase 1. Investigation is conducted by the LP investigator reviewing transaction records. Canary surfaces evidence; it does not confront individuals.

---

## 3. Agents — Automation Layer

Canary operates on two planes: **automated** (runs without human instruction) and **assisted** (responds to human queries). The line between them is fixed and intentional.

### The four agents

**Chirp — Detection Engine**
Automated. Runs continuously. Evaluates every ingested Counterpoint transaction against the active rule set the moment it is parsed. No human triggers it. Chirp fires or it doesn't — the result is a Chirp alert or silence.

**ALX — Retail Ops Agent**
Assisted. Responds to queries from the merchant owner and LP investigator. ALX holds the full context of the tenant's Canary deployment — alert history, active Fox cases, and the Counterpoint data that feeds them. Ask "why did this alert fire on Tuesday afternoon?" and ALX traces it back to the specific transaction, tender type, and rule threshold.

ALX informs. It does not close cases, adjust thresholds, or send communications without a human instruction.

**Owl — Analytics AI**
Assisted. Period-over-period comparisons, cash share trends, category margin drift, drawer session anomaly frequency. Owl operates at the aggregate level — patterns that Chirp's per-transaction evaluation misses because they only become visible across sessions or weeks.

**Onboarding Agent**
Assisted, activation-scoped. Guides the VAR installer through the four-step wizard. Surfaces issues against the tenant's specific configuration (unexpected pay code values, walk-in sentinel discovery, store count mismatch). Retired after activation completes.

### Where automation stops and people start

```
Counterpoint data → Chirp (automated) → Alert created
                                              │
                                        ALX available for context
                                              │
                                        Store manager triages
                                              │
                                        LP investigator reviews evidence
                                              │
                                        Owner approves / closes case
```

**Nothing in Canary closes a case without a human decision.** This is a design constraint, not a limitation. Loss prevention findings that drive HR or legal action require a documented human decision chain. Canary preserves that chain.

---

## 4. Model — How the Six Modules Operate as a System

The six modules do not run in parallel — they run in a dependency order that mirrors how a retail operation produces observable data.

### Substrate → Enrichment → Detection

```
SUBSTRATES
  S — Store/Device     What store? What session? What drawer policy?
  I — Item Catalog     What was sold? At what cost? Is it discountable?
  F — Finance/Tender   How did money move? Cash, card, or AR?
        │
        ▼
ENRICHMENT
  C — Customer         Who bought? Known account or walk-in?
  D — Inventory        What should be on the shelf vs. what the register shows?
        │
        ▼
DETECTION
  Q — Loss Prevention  Where do the signals diverge from expected?
```

Every Counterpoint transaction arrives with a store ID, line items, payment lines, and optionally a customer. Each field resolves through a substrate:

- Store ID → **S** supplies session context and drawer policy
- Each item → **I** supplies cost floor, margin target, discount authorization
- Each payment → **F** supplies canonical tender type and drawer-open flag
- Customer → **R** supplies tier and AR standing (or flags as walk-in)
- Inventory snapshot → **D** supplies the delta: what disappeared vs. what sold

**Q** evaluates the assembled record. Every rule has an explicit substrate dependency — no rule fires against raw Counterpoint fields. If a substrate is missing, the transaction is queued and the missing sync is triggered. Detection does not proceed on incomplete data.

### Activation enforces the dependency

```
Phase A — Reference data (same day, ~15 min)
  Store & station sync → Item categories → PayCode sync

Phase B — Entity seeding (overnight, parallel)
  Customer roster ‖ Item catalog

Phase C — Live (after B complete)
  Transaction polling → Inventory polling → Chirp evaluates every document
```

A transaction evaluated before Phase B completes would have no item cost floor and no customer context. The activation service enforces the gate. There is no bypass.

---

## 5. Blueprint — Module by Module

### S — Store & Device

**What it does:** Establishes the operational context for every transaction — which store, which station, which session, what drawer policy applies.

**Counterpoint source:** Store config, station config, customer control settings.

**What Canary produces:**
- Canonical location record per store
- Per-store configuration: discount limits, drawer policy, after-hours timezone
- Per-station profile: EDC presence, drawer presence
- Walk-in customer sentinel per store (the anonymous customer code this store uses)

**Phase 1 scope:** Store and station configuration. Multi-company (multiple companies on one Counterpoint server) is deferred.

→ [Module S article](../modules/S-space)

---

### I — Item Catalog

**What it does:** Sets the cost and margin floor for every item in the merchant's catalog. Without this substrate, Canary cannot detect below-cost sales or unauthorized discounts.

**Counterpoint source:** Item master, item categories and subcategories.

**What Canary produces:**
- Per-item cost floor (last purchase cost)
- Per-item and per-category margin targets
- Discount authorization flag: is this item discountable at all?
- Open-price flag: items where the cashier enters the price (elevated risk)
- Restricted-item flags for compliance rules

**Phase 1 scope:** Item master and categories. Bill-of-materials / kit components deferred.

---

### F — Finance/Tender

**What it does:** Classifies every payment method the merchant accepts into a canonical taxonomy. Cash-share analysis, drawer-open detection, and tender-swap rules all depend on this substrate.

**Counterpoint source:** PayCode table — the merchant's configured payment methods.

**Canonical tender types:**

| Counterpoint PAY_TYP | Canary canonical |
|---|---|
| C — Cash | `cash` |
| K — Check | `check` |
| E — Electronic/Card | `card` |
| A — A/R charge | `ar` |
| G / V — Gift card | `gift_card` |
| S — Store credit | `store_credit` |
| F — Foreign currency | `foreign` |

Every payment line on every transaction is classified at parse time. The raw pay code is preserved for audit.

**Phase 1 scope:** Tender classification and cash-share substrate. Gift card reconciliation deferred to Phase 2.

→ [Module F article](../modules/F-finance)

---

### C — Customer

**What it does:** Identifies who is buying and what their standing is — account tier, AR balance, authorized discount level. A 40% discount to a Gold AR account is expected. The same discount to a walk-in is a red flag.

**Counterpoint source:** Customer master (AR_CUST).

**What Canary produces:**
- Customer identity bridge (no PII stored — names, addresses, contact details stripped at ingest)
- Customer tier (CATEG_COD — Gold/Silver/Bronze or merchant equivalent)
- AR balance and payment terms
- Authorized discount percentage
- Walk-in resolution: if the customer number matches the store's walk-in sentinel, the transaction is treated as anonymous

**Phase 1 scope:** Customer identity and tier context. Loyalty manipulation rules seeded but not surfaced until Phase 2.

→ [Module C article](../modules/C-customer)

---

### D — Distribution/Inventory

**What it does:** Tracks on-hand quantity against what the register reports sold. When inventory drops faster than sales explain, something is wrong — whether theft, write-off, receiving fraud, or data entry error.

**Counterpoint source:** Inventory locations table (IM_INV), polled hourly per store.

**What Canary produces:**
- Hourly point-in-time inventory snapshots per item per location
- Delta computation: snapshot-before minus snapshot-after minus qty-sold = unexplained drop
- 90-day rolling history for trend analysis

**Garden center context:**
Live-goods write-offs are legitimate inventory drops without corresponding sales. Seasonal write-off baselines (quarterly) are seeded at vertical activation and suppress false positives during expected die-off periods. Vendor cash payments (receiving + cash tender) are pre-classified as legitimate via the allow-list.

**Phase 1 scope:** Inventory snapshot and shrinkage detection. Receiving dock variance starts in calibration mode (informational only, not surfaced as alerts) for the first 30 days.

→ [Module D article](../modules/D-distribution)

---

### Q — Loss Prevention

**What it does:** Evaluates every transaction against the active rule set using the substrates above. Q is the synthesis layer — it sees the full assembled picture: who bought what, how they paid, whether the inventory moved accordingly, whether the discount was authorized.

**Phase 1 active rule families:**

| Family | What it detects |
|---|---|
| Discount / Markdown | Discount cap exceeded; below-cost sale |
| Void | Void without original transaction; return without original |
| Audit Trail | Transaction edited after payment |
| Margin Erosion | Below category margin target; free-item override |
| Inventory Shrink | Cash vendor payment anomaly; session inventory drop; receive with no inventory increase |
| Tender Mix | Cash-only register session; tender type swap mid-transaction |
| Drawer Session | Drawer session shrinkage vs. tender count |

**Deployment model — dry run first:**
All rules activate in calibration mode at go-live. No alerts are surfaced to the tenant during the calibration period (default 7 days). The VAR installer and owner review the alert volume before flipping live. This prevents false-positive floods on day one.

**Garden center allow-lists** are pre-seeded at vertical activation:
- Cash vendor payments → informational, routed to ad-hoc vendor review
- Seasonal write-off spikes → suppressed against quarterly baselines
- Mix-and-match pricing → expected overlap suppressed

**Phase 1 scope:** The rule families above. Loyalty manipulation, gift card fraud, and labor rules are loaded but held in calibration mode.

→ [Module Q article](../modules/Q-loss-prevention)

---

## 6. Activation — How It Goes Live

```
Day 0 — Installation (~15 minutes)
  VAR installer enters Counterpoint credentials
  Connection test validates against server
  Phase A: stores → item categories → pay codes loaded

Day 0–1 — Seeding (overnight)
  Phase B: customer roster ‖ item catalog loaded in parallel

Day 1 — Go Live (calibration mode)
  Transaction polling starts (every 5 minutes)
  Inventory snapshots start (hourly)
  All rules fire internally — nothing surfaces to tenant yet

Days 1–7 — Calibration
  VAR installer + owner review internal alert volume
  Adjust thresholds: cash-share, discount cap, write-off baseline
  Confirm allow-lists match this merchant's patterns

Day 7 — Live flip
  Owner approves
  Alerts appear in dashboard
  ALX available for explanation
```

Total VAR time on-site: under 1 hour for a standard two-store garden center.

---

## 7. What Phase 2 Adds

Phase 1 delivers the substrate and detection foundation. Phase 2 builds on it without requiring new Counterpoint endpoints.

| Phase 2 capability | Enabled by |
|---|---|
| Gift card fraud detection | F tender substrate (gift_card type already classified) |
| Loyalty point manipulation | R customer substrate (loyalty balance already tracked) |
| Pricing & promotion analysis | I item catalog (price points already loaded) |
| Commercial AR monitoring | R customer substrate (AR balance already tracked) |

The data is already flowing. Phase 2 is rule development against an established substrate.

---

*→ [Integration surface](../integration/index) · [Module index](../modules/index) · [Agent network](../agents/index) · [Sandbox access](../sandbox/index)*
