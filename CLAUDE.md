# CLAUDE.md — AI Assistant Guidelines

Welcome, AI Developer. This file serves as your primary reference guide for engineering within the BikkoChain codebase.

---

## 🚀 Project Overview

* **Project:** BikkoChain
* **Tagline:** Near-instant agricultural loans for coffee and cocoa farmers in Ghana using tokenized harvests on the Lisk blockchain.
* **Core Tech Stack:** Next.js (App Router, TS, Tailwind CSS, shadcn/ui), Node.js (TypeScript), PostgreSQL, Solidity/EVM (Lisk Network), Kotani Pay (USSD/Mobile Money off-ramp), Chainlink oracles.

---

## 🛠️ Build, Test & Lint Commands

Run these commands from the workspace root (ensure dependencies are installed):

* **Install dependencies:** `npm install`
* **Run web application (dev):** `npm run dev`
* **Build web application:** `npm run build`
* **Run linter:** `npm run lint`
* **Format code:** `npm run format`
* **Run frontend tests:** `npm run test` or `npm run test:watch`
* **Run backend tests:** `npm run test:backend`
* **Compile smart contracts:** `npm run compile:contracts` (using Hardhat/Foundry config)
* **Test smart contracts:** `npm run test:contracts`

---

## 💡 Coding Philosophy

1. **Simplicity Over Complexity:** Prioritize readable, maintainable, vanilla solutions. Avoid premature optimization or abstract patterns.
2. **Type Safety First:** Write strict, clean TypeScript. No `any` type usage. Use proper interfaces, types, and zod schemas for data validation.
3. **Security-First Mindset:** Evaluate all code changes for risks (e.g., reentrancy, access control bypasses, private key exposures, SQL injection, input validation errors).
4. **Resiliency:** Code with network failures, latency, and resource constraints in mind. Farmers use low-connectivity devices.

---

## 📐 Repository Standards & Naming Conventions

### File & Folder Naming
* **UI Components:** PascalCase (e.g., `LoanCard.tsx`, `FarmerStatus.tsx`)
* **Utilities & Hooks:** camelCase (e.g., `useWallet.ts`, `formatCurrency.ts`)
* **Pages & Routes:** kebab-case/lowercase for folder-based routing in Next.js (e.g., `app/loans/active/page.tsx`)
* **Contracts:** PascalCase (e.g., `HarvestCollateral.sol`, `LoanEscrow.sol`)
* **Tests:** Same name as the target with `.test.ts` or `.spec.ts` suffix.

### Code Conventions
* **React:** Prefer functional components with React Server Components (RSC) by default. Use `"use client"` only for files requiring state, hooks, or DOM interactions.
* **CSS/Styling:** Use Tailwind CSS utility classes where possible. For complex custom effects, use pure vanilla CSS in module files (`*.module.css`).
* **Error Handling:** Always write explicit error boundaries, custom try/catch blocks, and meaningful log outputs instead of silent failures.

---

## 🌿 Git & Branching Strategy

* **Main Branch:** `main` (production-ready).
* **Development Branch:** `dev` or feature-specific branches merged to `main` via PRs.
* **Branch Naming Pattern:**
  * `feature/[short-desc]` — New features/enhancements.
  * `fix/[short-desc]` — Bug fixes.
  * `chore/[short-desc]` — Package updates, configurations.
  * `docs/[short-desc]` — Documentation updates.
* **Commit Suffix / Prefix Format:**
  * Use [Conventional Commits](https://www.conventionalcommits.org/):
    * `feat: add collateral approval screen`
    * `fix: correct gas calculation in escrow transfer`
    * `docs: update deployment workflows`
    * `test: add unit test for weather oracle integration`

---

## ✅ Definition of Done (DoD)

A task is not complete until:
1. All linting and formatting issues are resolved.
2. Unit and integration tests cover the critical paths and all tests pass.
3. Code compiles and builds without warning.
4. Security checklists are checked and validated.
5. Code reviews are complete and PR templates are filled.
6. Local documentation and relevant `.ai/` context/decisions are updated.

---

## 🤖 How to Assist

* **Always check context:** Read `.ai/context/` files before making feature suggestions.
* **Update rules/checklists:** If you introduce a core database constraint or structural pattern, add it to `.ai/rules/agent-rules.md` or `.ai/checks/`.
* **Propose Implementation Plans:** For large tasks, output a clear design plan before editing existing components.
