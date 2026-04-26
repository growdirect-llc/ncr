---
title: Q — Loss Prevention
tags: [module, loss-prevention, counterpoint, canary-native]
---

# Q — Loss Prevention

**Coverage:** ★ Canary native (non-negotiable core in every Counterpoint Solution Map)
**Ring:** v1 — shipping
**Ledger role:** Reconciler (sale exceptions)

## What it does

Counterpoint exposes the full audit substrate — drawer sessions, void/comp reasons, pricing decisions, discount codes, payment types, line-level overrides — but no detection layer. Q is that detection layer. It reads the Counterpoint Document history through the CRDM (via T module ingestion) and runs 23 detection rules across 10 rule families, surfacing exceptions through Owl (analyst NL interface) and Fox (case management).

Cashiers ring sales. Q watches the Documents arrive. The store GM reviews exceptions. The LP analyst works cases. None of that changes the customer's Counterpoint workflow.

## L2 process areas

### Q.1 Substrate ingestion

Q reads CRDM only. It never reaches Counterpoint directly — T ingests, Q consumes.

| CRDM entity | Counterpoint source | Key fields |
|---|---|---|
| `Events.transactions` | `PS_DOC_HDR` | DOC_ID, STR_ID, STA_ID, DRW_SESSION_ID, USR_ID, SLS_REP, CUST_NO, TKT_NO |
| `Events.transaction_lines` | `PS_DOC_LIN[]` | LIN_TYP, ITEM_NO, QTY_SOLD, PRC, REG_PRC, EXT_COST, MIX_MATCH_COD, HAS_PRC_OVRD |
| `Events.payments` | `PS_DOC_PMT[]` | PAY_COD, PAY_COD_TYP, AMT, SWIPED, EDC_AUTH_FLG |
| `Events.voids` | `PS_DOC` (VOID type) | VOID_RSN_COD, voiding USR_ID vs original USR_ID |
| `Events.drawers` | `PS_DRW`, `PS_DRW_SESSION` | OPEN_AMT, CLOSE_AMT, SHORT_OVER, LOAN_AMT, PICKUP_AMT |
| `Devices.stations` | `PS_WRK_STA` via N module | STA_ID, station type, workgroup |

### Q.2 Detection rule execution

23 rules across 10 families. Chirp executes all rules on every ingested Document.

| Rule family | Count | Counterpoint fields driving the rule |
|---|---|---|
| Discount abuse | 4 | `MIX_MATCH_COD`, `HAS_PRC_OVRD`, `DISC_AMT`, `DISC_PCT` |
| Void and return patterns | 3 | `VOID_RSN_COD`, refund `PAY_COD`, time-delta between sale and void |
| Drawer integrity | 3 | `SHORT_OVER`, `LOAN_AMT`, `PICKUP_AMT` vs declared |
| Manager override frequency | 2 | `MGR_PASS` flag, override USR_ID vs transaction USR_ID |
| Sweethearting | 2 | `QTY_SOLD`, `EXT_PRC` vs `REG_PRC * QTY`, line suppression patterns |
| Payment anomalies | 3 | `PAY_COD_TYP`, split tender patterns, card-not-swiped frequency |
| Refund without receipt | 2 | `IS_REL_TKT`, `ORIG_DOC_ID` null patterns |
| Shift-end concentration | 2 | Void/discount clustering within 30min of drawer close |
| Dead stock write-off | 1 | Live-goods shrink via adjustment Document type |
| Multi-store anomalies | 1 | Cross-location user activity (N module-derived) |

### Q.3 Detection lifecycle

Alert generated → surfaced in Owl → GM reviews → Fox case opened → investigation → disposition.

Alerts that clear the GM triage threshold auto-open Fox cases. Cleared alerts are retained in the detection log for trend analysis.

### Q.4 Tuning & allow-list management

Garden centers require 5 named allow-lists that prevent rule misfires on normal L&G operations:

| Allow-list | Why needed |
|---|---|
| Cash vendor payments | Cash-out-of-pocket at the back door is normal; triggers payment-anomaly rules without this exclusion |
| Fractional unit transactions | Partial flat / cut quantity sales suppress QTY-based rules |
| Dead-count write-off DOC_TYP | Live-goods shrink Documents are legitimate; exclude from sweethearting detection |
| Mix-and-match pricing | `MIX_MATCH_COD` pricing is a marketed Rapid Garden POS feature; suppress discount-abuse false positives |
| Ad-hoc vendor onboarding | New vendor added mid-season during receiving; suppress "unknown vendor" alerts |

VAR deploys the L&G allow-list bundle as a named preset at tenant onboarding.

### Q.5 Investigator & analyst surface

**Owl:** Natural-language query interface. Store GM asks "which cashier had the most voids last week?" and gets a ranked answer with transaction links. No SQL required.

**Fox:** Case management. Exception → case → evidence attach → disposition log → outcome tag (founded / unfounded / policy change). Case history persists for trend analysis.

### Q.6 Vertical configuration

The L&G vertical preset (Q.4 allow-lists + seasonal threshold calendar) ships as a named configuration block. VAR selects "Lawn & Garden" at tenant setup; Canary applies the preset. Founder overrides any rule weight post-deployment.

### Q.7 Deployment phasing

| Phase | What's active | What's not |
|---|---|---|
| 1 — Observer | T ingestion + Q rule execution + internal alert log | No GM alerts; no Fox cases |
| 2 — Alert | Phase 1 + GM dashboard + Owl queries | No Fox case management |
| 3 — Full | Phase 2 + Fox case auto-open + LP analyst workflow | — |

Phase 1 is zero-disruption to the store workflow. Recommended for first 30 days on any new tenant.

## L&G-specific open questions

1. Which `DOC_TYP` does a real Rapid Garden POS installation use for dead-count write-offs? (ASSUMPTION-Q-07)
2. What is the standard `VOID_RSN_COD` vocabulary on a garden-center Counterpoint install? (ASSUMPTION-Q-03)
3. Do seasonal staff receive the same USR_ID class as full-time staff, or is there a hire-type field? (ASSUMPTION-Q-11)

These resolve against a Rapid Garden POS sandbox database. See [Sandbox](../sandbox/index) for access.
