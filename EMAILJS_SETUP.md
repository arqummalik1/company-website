# EmailJS Setup Guide for Qubitt Technologies Contact Form

This guide will walk you through setting up EmailJS to enable dual email functionality for your contact form.

---

## 📧 What You'll Achieve

When someone submits the contact form:
1. **You receive** an email at `arqummalik1@gmail.com` with all form details
2. **Customer receives** a personalized thank you email at their provided email address

---

## 🚀 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to **[https://www.emailjs.com/](https://www.emailjs.com/)**
2. Click **"Sign Up"** (top right)
3. Create account with your email
4. Verify your email address

---

### Step 2: Add Email Service (Gmail)

1. In EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with **arqummalik1@gmail.com**
6. Grant permissions
7. **Copy the Service ID** (e.g., `service_abc1234`)
   - Save this for later!

---

### Step 3: Create Owner Notification Template

This template sends form data to **you** (arqummalik1@gmail.com).

1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. Fill in the template:

**Template Settings:**
- **Template Name**: `Contact Form - Owner Notification`

**Email Content:**

**To Email:**
```
arqummalik1@gmail.com
```

**From Name:**
```
Qubitt Contact Form
```

**From Email:**
```
noreply@qubitt.tech
```

**Subject:**
```
New Contact Form Submission - {{from_name}}
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4F46E5; margin-bottom: 20px;">New Contact Form Submission</h2>
        
        <div style="background-color: #F3F4F6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> {{from_name}}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> {{from_email}}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> {{phone}}</p>
            <p style="margin: 5px 0;"><strong>Company:</strong> {{company}}</p>
            <p style="margin: 5px 0;"><strong>Service:</strong> {{service}}</p>
        </div>
        
        <div style="background-color: #EEF2FF; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #4F46E5; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">{{message}}</p>
        </div>
        
        <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">
            Submitted at: {{submission_time}}
        </p>
    </div>
</div>
```

4. Click **"Save"**
5. **Copy the Template ID** (e.g., `template_xyz5678`)
   - Save this for later!

---

### Step 4: Create Customer Thank You Template

This template sends a thank you email to **the customer**.

1. Click **"Create New Template"** again
2. Fill in the template:

**Template Settings:**
- **Template Name**: `Contact Form - Customer Thank You`

**Email Content:**

**To Email:**
```
{{to_email}}
```

**From Name:**
```
Qubitt Technologies
```

**From Email:**
```
arqummalik1@gmail.com
```

**Subject:**
```
Thank You for Reaching Out - Qubitt Technologies
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <!-- Header with gradient -->
        <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Qubitt Technologies</h1>
        </div>
        
        <h2 style="color: #1F2937; margin-bottom: 20px;">Hi {{from_name}},</h2>
        
        <p style="color: #4B5563; line-height: 1.6; margin-bottom: 15px;">
            Thank you for contacting <strong>Qubitt Technologies</strong>! We're excited about the opportunity to work together.
        </p>
        
        <p style="color: #4B5563; line-height: 1.6; margin-bottom: 15px;">
            We've received your inquiry regarding <strong>{{service}}</strong> and our team will review your message carefully. One of our experts will get back to you within <strong>24 hours</strong> to discuss how we can help bring your vision to life.
        </p>
        
        <!-- What to Expect -->
        <div style="background-color: #EEF2FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">What to Expect Next:</h3>
            <ul style="color: #4B5563; line-height: 1.8;">
                <li>✓ Personalized consultation within 24 hours</li>
                <li>✓ Tailored solution proposal</li>
                <li>✓ Transparent pricing and timeline</li>
            </ul>
        </div>
        
        <p style="color: #4B5563; line-height: 1.6; margin-bottom: 20px;">
            We're looking forward to building something amazing together!
        </p>
        
        <p style="color: #4B5563; line-height: 1.6; margin-bottom: 5px;">
            Best regards,<br>
            <strong>The Qubitt Technologies Team</strong>
        </p>
        
        <!-- Footer -->
        <div style="border-top: 1px solid #E5E7EB; margin-top: 30px; padding-top: 20px;">
            <p style="color: #9CA3AF; font-size: 12px; margin: 5px 0;">
                This is an automated response. Please do not reply to this email.
            </p>
            <p style="color: #9CA3AF; font-size: 12px; margin: 5px 0;">
                For urgent inquiries, email us at <a href="mailto:arqummalik1@gmail.com" style="color: #4F46E5;">arqummalik1@gmail.com</a>
            </p>
        </div>
    </div>
</div>
```

3. Click **"Save"**
4. **Copy the Template ID** (e.g., `template_def9012`)
   - Save this for later!

---

### Step 5: Get Your Public Key

1. Click **"Account"** (left sidebar)
2. Click **"General"** tab
3. Find **"Public Key"** section
4. **Copy the Public Key** (e.g., `user_ghi3456`)
   - Save this for later!

---

### Step 6: Update .env File

1. Open the file: `/Users/arqummalik/Software Development/vibe code/qubit-v1/.env`
2. Replace the placeholder values with your actual values:

```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_OWNER=template_xyz5678
VITE_EMAILJS_TEMPLATE_CUSTOMER=template_def9012
VITE_EMAILJS_PUBLIC_KEY=user_ghi3456
```

3. Save the file

---

### Step 7: Test the Contact Form

1. **Restart your dev server** (if running):
   ```bash
   npm run dev
   ```

2. Open the website in your browser

3. Fill out the contact form with test data:
   - Use a real email address you have access to
   - Fill all required fields

4. Click **"Send Message"**

5. **Verify**:
   - ✅ Success toast appears
   - ✅ You receive email at `arqummalik1@gmail.com`
   - ✅ Test email address receives thank you email
   - ✅ Both emails are properly formatted

---

## 🎯 Expected Results

### Owner Email (arqummalik1@gmail.com)
- **Subject**: "New Contact Form Submission - [Customer Name]"
- **Content**: All form details in a clean, organized format
- **Includes**: Name, Email, Phone, Company, Service, Message, Timestamp

### Customer Email
- **Subject**: "Thank You for Reaching Out - Qubitt Technologies"
- **Content**: Personalized thank you message with Qubitt branding
- **Includes**: Customer name, service they're interested in, what to expect next

---

## 🔧 Troubleshooting

### Emails Not Sending?

1. **Check Console**: Open browser DevTools → Console for error messages
2. **Verify .env**: Make sure all 4 values are correct (no typos)
3. **Restart Server**: Stop and restart `npm run dev`
4. **Check EmailJS Dashboard**: Go to "Logs" to see if requests are coming through
5. **Gmail Permissions**: Make sure Gmail service is properly connected

### Error: "Email service not configured"
- This means the `.env` file values are missing or incorrect
- Double-check all 4 environment variables

### Emails Going to Spam?
- Check your Gmail spam folder
- Mark EmailJS emails as "Not Spam"
- Add `noreply@emailjs.com` to your contacts

---

## 📊 EmailJS Free Tier Limits

- **200 emails/month** (100 form submissions = 200 emails total)
- If you need more, upgrade to EmailJS paid plan ($15/month for 1000 emails)

---

## ✅ Checklist

- [ ] Created EmailJS account
- [ ] Connected Gmail service
- [ ] Created owner notification template
- [ ] Created customer thank you template
- [ ] Copied all 4 IDs/keys
- [ ] Updated `.env` file
- [ ] Restarted dev server
- [ ] Tested contact form
- [ ] Verified both emails received
- [ ] Checked email formatting

---

## 🎉 You're Done!

Your contact form is now fully functional with dual email capabilities. Every submission will notify you and send a professional thank you to your potential clients!
