# Add Webhook Directive

**Goal:** Add a new webhook to the system.

**Inputs:**
- Webhook name/slug
- Function logic description

**Steps:**
1.  Define the new webhook behavior.
2.  Update `execution/webhooks.json` with the new mapping.
3.  Implement the logic in a new python script in `execution/`.
4.  Deploy using `execution/modal_webhook.py`.
