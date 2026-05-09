# CMS setup (one-time)

This site uses [Sanity](https://www.sanity.io/) as its CMS. The Studio is embedded in this Next.js app at `/studio` — no separate hosting.

## 1. Create the Sanity project

1. Go to https://www.sanity.io/manage and sign in (free).
2. Click **Create new project**. Name it "Pull Up Neighbor". Use the **production** dataset.
3. Copy the **Project ID** from the project dashboard.

## 2. Create API tokens

In the project dashboard, go to **API → Tokens → Add API token**. Create two tokens:

| Name              | Permissions | Used for                                   |
| ----------------- | ----------- | ------------------------------------------ |
| `read-token`      | Viewer      | Draft-mode previews                        |
| `write-token`     | Editor      | Initial seed script (one-time)             |

Copy both immediately — you can't see them again.

## 3. Add CORS origin

In **API → CORS Origins**, add:

- `http://localhost:3097` (allow credentials: yes)
- Your production URL, e.g. `https://pull-up-neighbor.vercel.app` (allow credentials: yes)
- Your custom domain when you add one

## 4. Local environment

Create `.env.local` in the repo root (copy from `.env.example`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-09
SANITY_API_READ_TOKEN=your-read-token
SANITY_API_WRITE_TOKEN=your-write-token
SANITY_REVALIDATE_SECRET=any-random-string-32-chars-or-longer
```

## 5. Seed the dataset

This imports the current hardcoded content into Sanity so the editor doesn't start with a blank slate.

```bash
npm run seed
```

Re-runnable. Documents have stable IDs, so this overwrites instead of duplicating.

## 6. Vercel environment

In the Vercel project → Settings → Environment Variables, add the same five variables for **Production** and **Preview**:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2025-05-09`
- `SANITY_API_READ_TOKEN`
- `SANITY_REVALIDATE_SECRET`

Do **not** add `SANITY_API_WRITE_TOKEN` to Vercel — only the local seed script needs it.

Redeploy. The Studio is now live at `https://your-domain/studio`.

## 7. Configure the publish webhook

This is what makes edits appear instantly on the live site.

1. In sanity.io/manage → **API → Webhooks → Create webhook**.
2. Configure:
   - **Name**: `Revalidate Next.js`
   - **URL**: `https://your-domain/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: leave blank (fires on all documents)
   - **Projection**: `{_type, _id}`
   - **HTTP method**: `POST`
   - **HTTP Headers**: leave blank (signature is sent automatically)
   - **Secret**: paste the value of `SANITY_REVALIDATE_SECRET`
3. Save.

## 8. Invite the editor

In sanity.io/manage → **Members → Invite member**. Send an invitation to the editor's email. Default role "Editor" is correct.

The editor will now be able to log in at `https://your-domain/studio`.
