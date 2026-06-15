# BikkoChain

> **Instant agricultural loans for smallholder farmers powered by the Lisk blockchain.**

BikkoChain is a decentralized financial and agricultural platform enabling smallholder cocoa and coffee farmers in Ghana to access near-instant micro-loans. By leveraging tokenized future harvests as collateral, BikkoChain bridges the gap between traditional agricultural assets and Web3 liquidity, empowering farmers to secure financing without physical assets.

---

## 🌾 Mission & Context

Ghanaian smallholder farmers are often excluded from traditional financial systems due to a lack of formal collateral and credit histories. BikkoChain solves this by:
* **Tokenizing Future Harvests:** Allowing farmers to pledge their upcoming cocoa or coffee yields as digital collateral.
* **Instant Blockchain Loans:** Minting/disbursing stablecoins or local currency equivalents immediately upon collateral validation.
* **Accessible Interfaces:** Designing for low-resource environments using USSD, WhatsApp bots, and lightweight web dashboards.

---

## ⚙️ Core System Architecture

### Frontend (User & Admin Portals)
* **Framework:** Next.js (App Router, React Server Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS & vanilla CSS configurations
* **UI Components:** shadcn/ui (Radix Primitives)

### Backend (Services & Integrations)
* **Runtime:** Node.js (TypeScript)
* **Database:** PostgreSQL
* **External Services:** 
  * **Kotani Pay:** Off-ramp solutions to convert digital tokens/stablecoins into mobile money (MTN, Vodafone, AirtelTigo).
  * **Chainlink:** Decentralized price feeds and weather oracles to manage harvest risk.

### Blockchain Layer
* **Network:** Lisk Blockchain (EVM-compatible L2 ecosystem)
* **Smart Contracts:** Solidity (Harvest tokenization, loan escrow, liquidation logic)

---

## 📂 Repository Directory Structure

```
BikkoFarms-Website/
├── .ai/                      # AI development context & guidance (AI OS)
│   ├── context/              # Product and architectural context
│   ├── skills/               # Reusable engineering skill manuals
│   ├── rules/                # Global agent constraints and guidelines
│   ├── agents/               # Specific instructions for specialized AI roles
│   ├── workflows/            # Standard operating procedures (e.g. Feature Dev)
│   ├── checks/               # Quality gates (frontend, backend, security)
│   ├── decisions/            # Architecture Decision Records (ADRs)
│   ├── templates/            # PR, issue, and document templates
│   └── prompts/              # Reusable agent prompt blueprints
├── .github/                  # GitHub Actions CI and community templates
│   ├── ISSUE_TEMPLATE/       # Templates for bug reports & feature requests
│   └── workflows/            # GitHub Actions workflow configurations
├── docs/                     # General engineering and product docs
│   ├── architecture/         # System design diagrams and deep dives
│   ├── product/              # User personas, journeys, and product specs
│   ├── api/                  # Swagger/OpenAPI specifications
│   ├── onboarding/           # Developer onboarding manuals
│   └── runbooks/             # Operations and deployment runbooks
└── [source directories]      # Main application codebase (created during next phase)
```

---

## 🤖 AI-Assisted Engineering Environment

This repository utilizes an **AI Engineering Operating System** situated under `.ai/`. If you are developing this project with the help of an LLM or AI coding assistant (like Claude or Antigravity):
1. **Always refer to `.ai/rules/agent-rules.md`** first.
2. **Review `CLAUDE.md`** at the repository root for code styling, naming, and execution commands.
3. Use the **Workflows** in `.ai/workflows/` to carry out tasks (e.g., bug fixes, features, or contract deployments).
4. Run the validation checks in `.ai/checks/` before requesting reviews or merging PRs.

---

## 🛠️ Getting Started

### Prerequisites
* **Node.js:** v20+
* **Package Manager:** npm (v10+)
* **Docker:** Recommended for local PostgreSQL instance

### Quick Setup
1. Clone the repository and navigate to the directory:
   ```bash
   git clone https://github.com/BikkoChain/BikkoFarms-Website.git
   cd BikkoFarms-Website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start local development server:
   ```bash
   npm run dev
   ```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.