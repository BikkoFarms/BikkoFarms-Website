# Skill Manual: Blockchain Integration

Rules for communicating with the Lisk L2 network, reading chain states, and relaying EVM transactions.

---

## 🎯 Purpose
To secure the communications bridge between traditional web clients (and USSD/WhatsApp gateways) and the Lisk smart contract lending registry.

---

## 💡 Best Practices

* **Robust RPC Provider Failover:** Maintain a list of backup RPC nodes. If the primary Lisk RPC times out, auto-switch to a backup node.
* **Gas Price Estimations:** Automatically retrieve gas fees before submitting transactions. Apply a 1.2x multiplier during network congestion to ensure quick validation.
* **Event Indexing:** Cache smart contract events in the PostgreSQL database using indexers (e.g. Subgraph, Envio, or local polling logs). Never rely on real-time RPC searches for loading list layouts.
* **Transaction Relaying:** For farmers interacting via USSD/WhatsApp, use custodian wallets or gas station relayers (like ERC-2771 meta-transactions) to pay gas on their behalf.

---

## 🛑 Constraints

* **Private Key Security:** Never write private keys to log outputs. Relayer keys must be injected into the runtime environment variables only.
* **Transaction Replay Protections:** Track account nonces in-memory or in database records to avoid duplicate transaction submittals.

---

## 📐 Code Conventions

* **Viem Client Configuration with Failover:**
  ```typescript
  import { createPublicClient, fallback, http } from 'viem';
  import { lisk } from 'viem/chains';
  
  export const getLiskClient = () => {
    return createPublicClient({
      chain: lisk,
      transport: fallback([
        http(process.env.LISK_PRIMARY_RPC_URL),
        http(process.env.LISK_BACKUP_RPC_URL),
        http('https://rpc.api.lisk.com') // Official public endpoint fallback
      ]),
    });
  };
  ```

---

## ⚠️ Common Pitfalls

* **Ignoring Reverted Transactions:** Not tracking transaction hash receipts, leaving loan statuses in "pending" forever if a transaction reverts. Always await `.wait()` or read the transaction receipt status.
* **RPC Rate Limiting:** Making raw `eth_call` queries inside loops. Batch read requests using multicall contracts.

---

## ✅ Acceptance Criteria

1. **Transaction Lifecycle tracking:** Backend monitors transaction receipt logs and updates DB state immediately on validation or failure.
2. **Error Recovery:** API retries network transactions up to 3 times upon RPC timeout failures.
3. **Multi-signature/Security verification:** Key transactions check and assert signature origins.
