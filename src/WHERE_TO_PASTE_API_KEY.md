# Where to Paste Your API Key

## 📍 File Location

```
/config/api-keys.ts
```

---

## 🔍 Find This Line

Look for line ~31 in `/config/api-keys.ts`:

```typescript
NEMOTRON_API_KEY: 'PASTE_YOUR_NEMOTRON_API_KEY_HERE',
```

---

## ✏️ Replace It

Change it to:

```typescript
NEMOTRON_API_KEY: 'nvapi-your-actual-key-from-nvidia',
```

---

## 🎯 Full Example

### Before:
```typescript
export const API_CONFIG = {
  NEMOTRON_API_KEY: 'PASTE_YOUR_NEMOTRON_API_KEY_HERE',
  NEMOTRON_API_URL: 'https://integrate.api.nvidia.com/v1',
  SLACK_WEBHOOK_URL: 'PASTE_YOUR_SLACK_WEBHOOK_URL_HERE',
  MODEL: {
    NAME: 'nvidia/nemotron-4-340b-instruct',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2048,
  },
};
```

### After:
```typescript
export const API_CONFIG = {
  NEMOTRON_API_KEY: 'nvapi-abc123xyz789-your-real-key-here',  // ← Changed!
  NEMOTRON_API_URL: 'https://integrate.api.nvidia.com/v1',
  SLACK_WEBHOOK_URL: 'PASTE_YOUR_SLACK_WEBHOOK_URL_HERE',
  MODEL: {
    NAME: 'nvidia/nemotron-4-340b-instruct',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2048,
  },
};
```

---

## ✅ That's It!

Just that one line. Don't change anything else.

1. Save the file
2. Refresh your browser
3. Start using real AI!

---

## 🔗 Get Your API Key

Don't have a key yet?

👉 https://build.nvidia.com/nvidia/nemotron-4-340b-instruct

1. Click "Get API Key"
2. Sign up (free)
3. Copy the key
4. Paste it as shown above

---

## ⚠️ Important

### ✅ DO:
- Copy the **entire** key (starts with `nvapi-`)
- Keep the **single quotes** around it
- Remove any **extra spaces**
- **Save** the file after editing

### ❌ DON'T:
- Don't share this file publicly
- Don't commit it to Git (it's already protected)
- Don't remove the quotes
- Don't add spaces before/after the key

---

## 🆘 Troubleshooting

### "Invalid API key" error?

**Check:**
- ✅ You copied the full key
- ✅ Key is between single quotes: `'nvapi-...'`
- ✅ No spaces before/after
- ✅ You saved the file
- ✅ You refreshed your browser

### Still not working?

1. Copy your key again from NVIDIA
2. Delete the entire line
3. Retype it fresh
4. Save and refresh

---

## 📸 Visual Guide

```
File: /config/api-keys.ts

Line 31: Look for this
     ↓
NEMOTRON_API_KEY: 'PASTE_YOUR_NEMOTRON_API_KEY_HERE',
                  ^------- Replace this text --------^

After pasting:
     ↓
NEMOTRON_API_KEY: 'nvapi-abc123...',
                  ^-- Your actual key --^
```

---

## 🎓 What Happens Next?

Once you paste your key:

1. **App detects** the real API key
2. **Banner disappears** (no more setup reminder)
3. **Generate button** will use real AI
4. **Results** will be custom for your product
5. **Response time** will be 5-10 seconds (real AI processing)

---

## 💡 Pro Tip

Test your key immediately:

1. Fill out the product form
2. Click "Generate Lifecycle Plan"
3. Wait 5-10 seconds
4. You should see custom AI-generated data

If you get an error, double-check your key!

---

## 📚 More Help

- **Full setup guide:** [QUICK_START_API.md](./QUICK_START_API.md)
- **What changed:** [SETUP_COMPLETE.md](./SETUP_COMPLETE.md)
- **Config docs:** [config/README.md](./config/README.md)

---

**That's it! Super simple.** 🚀

Just one file, one line, paste your key. Done!
