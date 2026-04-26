---
title: T — Transaction Pipeline
tags: [module, counterpoint, stub]
---

# T — Transaction Pipeline

**Coverage:** ● Full direct
**Ring:** v1 shipping
**Ledger role:** Publisher (sale events)

Counterpoint Document family (11 endpoints). Every spine module traces back to a T write. L2: T.1 Adapter ingress (poll, 60s cadence) · T.2 Sealing & integrity (hash chain) · T.3 DOC_TYP routing (SALE/RTRN/VOID/XFER/PO/RECVR/RTV) · T.4 Canonical event publication · T.5 Merkle anchoring · T.6 Replay & idempotency · T.7 Cross-module substrate contracts (12). L&G note: live-goods write-off DOC_TYP is an open question — verify against real garden-center Counterpoint install (ASSUMPTION-T-07).

---

*Full article coming soon. See the [module index](index) for the complete L1–L4 framework.*
