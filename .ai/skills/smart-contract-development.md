# Skill Manual: Smart Contract Development

Development guidelines, patterns, and deployment safety measures for Solidity smart contracts.

---

## 🎯 Purpose
Define engineering standards for the core financial layer of BikkoChain. These contracts tokenize harvests, lock collateral assets, process escrow payouts, and reconcile repayments.

---

## 💡 Best Practices

* **Use OpenZeppelin Contracts:** Inherit battle-tested contracts for standards (ERC721, ERC1155, AccessControl, SafeERC20, Pausable, ReentrancyGuard).
* **Upgradability vs Immutability:** Keep core escrow logic immutable to maximize farmer and lender trust. Use proxy interfaces (`UUPS`) only when business rules are guaranteed to evolve.
* **Events for State Tracking:** Emit descriptive events on all state changes (e.g. `CollateralLocked`, `LoanDisbursed`, `RepaymentProcessed`) to facilitate indexing and auditing.

---

## 🛑 Constraints

* **Strict Solidity Version:** Use `pragma solidity ^0.8.20;` or higher.
* **Access Control:** All state-modifying admin functions must be restricted via `onlyRole` custom modifiers.
* **No Floating Pragmas:** Never deploy contracts with floating version requirements (e.g., avoid `pragma solidity >=0.8.0;` in deployment files).

---

## 📐 Code Conventions

* **Function Layout Order:**
  * Constructor / Initializers
  * Receive & Fallback functions
  * External functions
  * Public functions
  * Internal functions
  * Private functions
* **Naming Conventions:**
  * Custom modifiers: `only...` (e.g., `onlySupervisor`)
  * State variables: camelCase (e.g., `loanRepaymentDeadline`)
  * Events: UpperCamelCase (e.g., `LoanRepaid`)

---

## ⚠️ Common Pitfalls

* **Arithmetic Underflow/Overflow:** Prior to Solidity 0.8.0, variables could overflow. For newer compilers, do not use `unchecked` blocks unless gas gains are massive and safety is mathematically proven.
* **Locked Ether/Tokens:** Failing to write recovery/withdraw functions for ERC-20 tokens sent accidentally to the contract.
* **Block Timestamp Manipulation:** Avoid using `block.timestamp` for critical cryptographic random sources. It is acceptable for standard loan durations and expiry checks (variation window is small).

---

## ✅ Acceptance Criteria

1. **Slither / Mythril Check:** Automated audits compile with zero high/medium security warnings.
2. **100% Branch Coverage:** Unit tests cover all conditional execution branches.
3. **Optimized Gas Consumption:** Execution gas is tracked and optimized for deployment on the Lisk Layer-2 node.
