# Global AI Agent Rules: BikkoChain

This document defines the strict rule set that governs all AI coding tools and agents working on this repository.

---

## 📐 General Code Directives

1. **Never generate code without checking context:**
   Always locate and inspect relevant architecture files under `.ai/context/` and skill guides in `.ai/skills/` before proposing, creating, or editing components.
2. **Simplicity over abstraction:**
   Do not introduce complex design patterns or premature abstractions. Keep implementations simple, straightforward, and readable.
3. **Strict TypeScript compilation:**
   Implicit and explicit `any` statements are strictly banned. Define robust interface definitions and utilize schema validations (Zod) for incoming API inputs.
4. **Follow existing patterns:**
   Ensure new code conforms perfectly to the structures, styling, naming conventions, and file divisions present in the current codebase.

---

## 🔒 Security & Reliability Guidelines

5. **Security first:**
   Never output hardcoded keys, passwords, private variables, or configuration secrets. Always implement reentrancy guards, roles validation, and parameterized database queries.
6. **Robust error handling:**
   Do not swallow errors. Every asynchronous action must have a try/catch handler with logging, and every UI layout must contain a fallback loading/error boundary.
7. **Verify dependencies before adding them:**
   Do not install external npm modules unless absolutely required. Always check if existing native/pre-installed packages can accomplish the same task.

---

## 📈 Quality Assurance

8. **Co-develop test coverages:**
   Whenever editing or creating API routes, smart contracts, or core hooks, generate matching test scripts alongside.
9. **Document architectural shifts:**
   Any changes to core data structures, smart contracts, or system integrations must be documented using an Architectural Decision Record (ADR) under `.ai/decisions/`.
10. **Aria & Semantic HTML Compliance:**
    UI elements must be accessible. Ensure correct ARIA attributes are placed and native tag wrappers are structured.
