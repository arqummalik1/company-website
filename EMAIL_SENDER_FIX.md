# 📧 Designating Sender Email (Fix "From" Address)

If your emails are saying **"From: Arqum Malik <arqummalik1@gmail.com>"**, it is because `arqummalik1@gmail.com` is the account connected to EmailJS.

To allow Audentix to send emails, you must connect the `audentix@gmail.com` account instead.

## 🛑 Step 1: Delete Old Service
1. Go to **[EmailJS Dashboard](https://dashboard.emailjs.com/admin/services)**
2. Click on **"Email Services"** in the left sidebar.
3. Find the service connected to "Gmail (arqummalik1)".
4. Click the **Trash Icon** (Delete) to remove it.

## ✅ Step 2: Connect Audentix Account
1. Click **"Add New Service"**.
2. Select **"Gmail"**.
3. Click **"Connect Account"**.
4. **IMPORTANT:** Sign in with **`audentix@gmail.com`**.
5. ⚠️ **CRITICAL:** When Google asks for permissions, you **MUST** check the box that says:
   *   "Read, compose, send, and permanently delete all your email from Gmail"
   *   *If you don't check this, EmailJS cannot send emails.*
6. Click **"Create Service"**.

## 🔄 Step 3: Get New Service ID
1. You will see your new service in the list (e.g., `service_xyz123`).
2. **Copy this new Service ID.**

## 📝 Step 4: Update Code
1. Open your `.env` file:
   `/Users/arqummalik/Software Development/vibe code/audentix/.env`
2. Update the `VITE_EMAILJS_SERVICE_ID` with the **NEW** ID you just copied:

```env
VITE_EMAILJS_SERVICE_ID=service_NEW_ID_HERE
```
*(Leave the Template IDs and Public Key the same)*

3. **Restart your server:**
   ```bash
   npm run dev
   ```

## 🚀 Step 5: Test
Submit the form again. The email should now say:
**"From: Audentix <audentix@gmail.com>"**

## ❌ Still getting "Error Sending Message"?
If you see the error **"Request had insufficient authentication scopes"** in the console:
1. It means you **MISSED THE CHECKBOX** in Step 2.
2. You must **DELETE** the service and **ADD IT AGAIN**.
3. **WATCH CAREFULLY** for this screen and **Check the box**:
   > "Read, compose, send, and permanently delete all your email from Gmail"
