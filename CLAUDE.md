# GrowDirect-NCR — Companion Vault

This repo is a **vendor-specific companion vault** — a curated projection of
GrowDirect Brain content shaped for NCR Counterpoint VARs. It is one of three
companion vaults published at `*.growdirect.io`.

**Source of truth:** `GrowDirect/Brain/wiki/` — never edit content in this repo
directly. All content originates in Brain; this vault is a publication, not an
authoring surface.

**Audience:** NCR Counterpoint VARs (Rapid POS and others evaluating Canary as
an analytics and MCP layer on Counterpoint).

---

## How to Update Content

1. Write or update the Brain wiki article in `GrowDirect/Brain/wiki/`
2. Re-seed the memory bus:
   ```bash
   docker run --rm \
     --network growdirect \
     -v ~/GrowDirect:/repo \
     -e DATABASE_URL=postgresql://growdirect:growdirect_dev@growdirect_postgres:5432/growdirect_memory \
     -e OLLAMA_URL=http://growdirect_ollama:11434 \
     -e EMBEDDING_MODEL=qwen3-embedding:8b \
     -w /app \
     growdirect-memory-bus \
     python3 /repo/services/memory-bus/scripts/seed_clean.py --drop-first
   ```
3. Update the corresponding file in this vault to match
4. Push to `main` — GitHub Pages deploys automatically

---

## Build

```bash
python3 build.py          # → _site/
```

Requires `markdown` and `pyyaml` (`pip install markdown pyyaml`). Output goes
to `_site/`, which GitHub Pages serves from `ncr.growdirect.io`.

---

## Vault Structure

| Section | Content |
|---------|---------|
| `agents/` | MCP stack architecture, VSM, agent roadmap |
| `modules/` | Canary 13-module functional decomposition (ARTS-aligned) |
| `ncr-context/` | NCR ecosystem analysis for VARs |
| `integration/` | Counterpoint API integration surface |
| `deployment/` | Module activation and go-live sequence |
| `verticals/` | Vertical playbooks (L&G lead, Armstrong proof case, stubs) |
| `sandbox/` | Evaluation and demo path |
| `why-canary/` | Positioning and co-sell story |
| `pitch/` | VAR leave-behind assets |

---

## Key Brain Articles Backing This Vault

### NCR-specific
- `ncr-counterpoint-api-reference.md`
- `ncr-counterpoint-endpoint-spine-map.md`
- `ncr-counterpoint-connection-runbook.md`
- `ncr-counterpoint-document-model.md`
- `ncr-counterpoint-phase-0-context-brief.md`
- `ncr-counterpoint-sandbox-setup-checklist.md`
- `ncr-counterpoint-rapid-pos-relationship.md`

### Canary platform
- `canary-mcp-stack-architecture.md`
- `canary-agent-roadmap-batch-to-realtime.md`
- `canary-module-*-functional-decomposition.md` (all 13 modules)
- `canary-module-q-counterpoint-rule-catalog.md`
- `canary-ej-spine-and-sales-audit.md`
- `canary-raas-positioning.md`
- `canary-sales-strategy.md`
- `canary-data-model.md`

### Verticals
- `garden-center-operating-reality.md`
- `socal-home-garden-target-customers-brief.md`
- `armstrong-garden-centers-proof-case.md`
- `bart-mccleskey-rapid-garden-pos.md`
- `rapid-pos-counterpoint-market-research-tam.md`
- `rapid-pos-counterpoint-user-pain-points.md`

### Engagement
- `engagement-shape-100-day-deployment.md`
- `voyix-counterpoint-rapid-pos-engagement-context.md`

---

## Gap Ledger

Coverage audit: `GrowDirect/Brain/wiki/ncr-vault-gap-ledger.md` (2026-04-27).
25 Covered, 7 Forward-only, 3 back-filled during wiring.
