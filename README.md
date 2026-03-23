# TVS & SuperNova — Grant Tracker Dashboard

Live grant opportunities dashboard for TogetherVSmile (TVS) and SuperNova Club (Badminton), Melbourne's western suburbs.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update grant data

Replace `/data/grants.json` with the updated file and push to GitHub. Vercel auto-deploys on push.

Grant data is maintained by scanning via Claude.ai — ask Claude to check for open grants, then copy the generated JSON into this project.

## Deploy

Connected to Vercel via GitHub integration. No environment variables or database needed.
