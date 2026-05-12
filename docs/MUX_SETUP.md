# Mux video setup (one-time)

This site uses Mux for video uploads — the industry standard. Mux handles the upload, transcoding, and adaptive streaming so:

- Editors can drop in videos of any size without freezing the browser
- Videos play smoothly on every connection (auto bitrate)
- The Studio shows a real progress bar instead of hanging

## 1. Create a free Mux account

1. Sign up at https://www.mux.com/ (free dev tier — generous for marketing sites)
2. Verify your email and finish onboarding

## 2. Generate API tokens

1. Go to **Settings → API Access Tokens**
2. Click **Generate new token**
3. Permissions: enable **Mux Video** with **Read** and **Write**
4. Environment: choose **Production**
5. Click **Generate token**
6. **Copy the Token ID and Secret Key** — you'll only see the secret once

## 3. Plug the tokens into Studio

1. Open https://pull-up-neighbor.vercel.app/studio
2. Go to any page that has a video field — e.g. **In Action Items → + Create new**
3. Pick **Upload Video (Mux)** as the media type
4. The first time you use it, Studio shows a Mux configuration prompt
5. Paste your **Token ID** and **Secret Key**
6. Save — the credentials are stored as a private document in your Sanity dataset (not the codebase)

After that, every video field across the site uses these credentials. The editor never has to touch the tokens again.

## 4. (Optional) Add Mux env vars to Vercel

Not strictly required for uploads — the plugin reads tokens from the Sanity dataset. But if you want analytics or playback metrics, add to Vercel project settings:

```
MUX_TOKEN_ID=...
MUX_TOKEN_SECRET=...
```

## What it costs

Mux's free tier covers ~1,000 monthly views with ~100 minutes stored. Beyond that:

- **Storage**: $0.005 / minute / month
- **Streaming**: $0.001 / minute viewed (Smart Encoding)

For a marketing site with ~10–30 videos and modest traffic, expect **$0–20/month**.

## Switching back to direct MP4 upload

The old direct-upload field is still in the schema as "Legacy MP4 Upload — small files only" — only for clips under ~30 MB. Use Mux for anything bigger.

## YouTube / Vimeo as an alternative

If you'd rather not host the video at all, every video field has a **YouTube / Vimeo URL** option. Paste a link and the site embeds the player. No upload, no cost.
