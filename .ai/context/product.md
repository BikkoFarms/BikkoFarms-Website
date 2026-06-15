# Product Context: BikkoChain

This document details the product goals, business scope, target audience, and MVP boundaries for BikkoChain.

---

## 🔍 Problem Statement

Smallholder cocoa and coffee farmers in Ghana are the backbone of the country's agricultural economy. However, they face severe financial challenges:
1. **Collateral Deficit:** Traditional commercial banks require real estate, vehicles, or formal salaries as collateral, which smallholders do not possess.
2. **Exorbitant Interest Rates:** Local microfinance institutions charge interest rates exceeding 40-60% APY, trapping farmers in debt cycles.
3. **Delayed Financing:** Agricultural loan cycles take weeks to process, missing the critical windows for buying fertilizer, seeds, or hiring labor during sowing or harvesting seasons.
4. **Lack of Credit History:** Because most farmers operate in cash or mobile money without centralized logging, they lack formal credit ratings.

**BikkoChain's Solution:** A decentralized protocol that tokenizes future harvests (contracted coffee/cocoa crop yields) as collateral, facilitating near-instant micro-loans with low interest rates directly to farmers' mobile wallets using the EVM-compatible Lisk blockchain.

---

## 🎯 Target Users

* **Smallholder Cocoa and Coffee Farmers (Ghana):** Mostly rural, operating 2-10 acres of land. Tech literacy is low-to-medium; they rely heavily on basic feature phones (USSD) or entry-level smartphones (WhatsApp/Web).
* **Agricultural Cooperatives (Co-ops):** Organization bodies that aggregate farmers, verify crop conditions, and manage local distribution. They have higher technical literacy and use web dashboards.
* **Micro-Lenders / Liquidity Providers:** Institutional or decentralized Web3 investors looking to supply capital for real-world asset (RWA) micro-loans.

---

## 💼 Business Goals & Success Criteria

### Business Goals
* Provide competitive interest rates (12-18% APY) to farmers.
* Onboard 5,000+ farmers in the pilot regions (Ashanti, Western, and Eastern regions of Ghana) within the first 12 months.
* Maintain a default rate under 3% by leveraging cooperative verification and Chainlink weather oracles.

### Success Criteria
* **Disbursal Speed:** Loan application to mobile money cash out in under 10 minutes.
* **Usability:** 95% task completion rate on USSD/WhatsApp workflows without manual support.
* **Repayment Compliance:** Automated harvest-deduction mechanics or digital repayment workflows operating seamlessly.

---

## 📦 Scope of the MVP

### In-Scope Features
1. **Harvest Tokenization:** 
   * Cooperatives can verify and mint digital tokens (non-fungible or semi-fungible tokens) representing a farmer's contracted harvest yield (e.g., "5 bags of Grade-A cocoa").
2. **Escrow & Disbursement:** 
   * Collateralized smart contracts that lock harvest tokens and automatically disburse stablecoins (e.g., USDC/USDT) to a liquidity bridge.
3. **Off-Ramp Integration:** 
   * Automated conversion of stablecoins to Ghanaian Cedis (GHS) deposited directly into MTN Mobile Money, Telecel (Vodafone) Cash, or AT Money via Kotani Pay APIs.
4. **Repayment System:** 
   * Ability to repay loans through mobile money or by selling tokenized harvests to aggregate buyers who settle the loan directly in the smart contract.
5. **Basic User Dashboards:**
   * Cooperative Web App for onboarding, yield verification, and loan monitoring.
   * Simple public-facing marketing and information site.

### Out-of-Scope (Future Phases)
* Decentralized peer-to-peer bidding on individual crop loans (MVP uses single pooled liquidity).
* Automated yield estimation using satellite/AI imaging (MVP relies on cooperative physical inspection).
* Cross-border crop trading integrations.
* Native mobile app for farmers (MVP focuses on USSD, WhatsApp, and Web).

---

## 🛠️ Feature Roadmap Matrix

| Feature | MVP (Phase 1) | Phase 2 | Phase 3 |
| :--- | :--- | :--- | :--- |
| **Harvest NFT Minting** | Cooperative-initiated | Automated via sensor data | Multi-crop standard |
| **Loan Settlement** | Manual Mobile Money / Cash-out | Harvesting escrow deductions | Automated crop buyer split |
| **USSD Interface** | Basic registration & balance check | Full loan application | Offline-signatures |
| **WhatsApp Chatbot** | Yield verification upload | AI-assisted support | Interactive lending |
