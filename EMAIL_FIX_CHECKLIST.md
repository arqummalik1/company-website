# 📧 Critical Fix: EmailJS Dashboard Check

We have updated the code to send the correct data, but **you must verify one setting in your EmailJS Dashboard** to ensure the Owner email arrives.

## 1. Check "To Email" for Owner Template
1. Go to **[EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates)**
2. Open your **Owner Notification Template** (the one for `audentix@gmail.com`)
3. Click on **"Settings"** (or look at the top of the email editor)
4. Find the **"To Email"** field.
5. **IMPORTANT:** It must say `audentix@gmail.com` specifically.
    *   ❌ DO NOT use `{{to_email}}` here.
    *   ❌ DO NOT use `{{email}}` here.
    *   ✅ JUST PUT: `audentix@gmail.com`

## 2. Check "Service" Variable
The code now sends `{{service}}` correctly (mapped from the "Subject" field). You don't need to change your template body, it should now populate automatically!

## 3. Verify IDs
Ensure your `.env` file has the correct:
- `VITE_EMAILJS_TEMPLATE_OWNER` = ID of the Owner Template
- `VITE_EMAILJS_TEMPLATE_CUSTOMER` = ID of the Customer Template

*If these are swapped, you might be getting the wrong emails!*
