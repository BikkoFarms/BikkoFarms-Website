# Skill Manual: WhatsApp Bot Development

Guidelines for developing conversational lending and harvest-tracking interfaces via WhatsApp.

---

## 🎯 Purpose
Provide an alternative, interactive, and visually supported interface for farmers and co-op agents. WhatsApp allows document transfers (e.g. photos of national IDs, weight scale tickets) and features rich message templates.

---

## 💡 Best Practices

* **Use Standard Flow Models:** Support interactive buttons and list selectors instead of plain text matching to make navigation straightforward.
* **Media Processing & Validation:** When a cooperative supervisor uploads a photo of a cocoa delivery receipt, validate the image size, download it securely, and run OCR or queuing pipelines asynchronously.
* **Interactive Templates:** Utilize WhatsApp/Meta pre-approved message templates for outbound notifications (e.g. loan approval notifications, repayment reminders).
* **Fallback to Human Agent:** If the bot cannot parse farmer input 3 times consecutively, redirect the session to a human support desk queue and notify the user.

---

## 🛑 Constraints

* **Webhook Signature Validation:** Always validate incoming webhook requests using the Twilio signature header or Meta Hub Verification token to prevent sender spoofing.
* **Rate Limits:** Throttle conversational messages to comply with WhatsApp Business API messaging rules.
* **Document Retention Policies:** Do not store sensitive farmer identity documents (like Ghana Card pictures) in public cloud buckets. Encrypt documents at rest.

---

## 📐 Code Conventions

* **Interactive Menu Construction (Meta API JSON structure example):**
  ```json
  {
    "type": "interactive",
    "interactive": {
      "type": "button",
      "body": {
        "text": "Welcome to BikkoChain. Please select an option:"
      },
      "action": {
        "buttons": [
          { "type": "reply", "reply": { "id": "btn_apply", "title": "Apply for Loan" } },
          { "type": "reply", "reply": { "id": "btn_balance", "title": "Check Balance" } }
        ]
      }
    }
  }
  ```

---

## ⚠️ Common Pitfalls

* **Storing Media URLs in Plaintext:** Leaking links to download farmer IDs or crop receipt tickets. Always use signed, expiring URLs (S3 Pre-signed URLs) for dashboard review views.
* **Template Rejections:** Sending free-form marketing/outbound messages outside the 24-hour customer window. Always send template-approved messages for notification triggers.

---

## ✅ Acceptance Criteria

1. **Secure Endpoints:** All webhook controllers verify signature payloads.
2. **Dynamic UI:** Option lists, select buttons, and text messages match localization configurations.
3. **Robust Media Processing:** Document/photo uploads are successfully logged and queued without server memory leaks.
