---
owner: Bauhinia AI
status: draft
last_updated: 2026-06-27
confidentiality: internal-public
source: User request; public 2026 Gaokao Chinese essay prompt reporting; OpenAI API docs
---

# 高考语文模拟器

移动端网页小游戏：玩家选择 2026 高考语文作文题，输入创作目标或语音输入，和 AI 教练多轮打磨作文，再由严格考官按统一 60 分制评分，生成本机排行榜和可分享战报图。

## Run

Static fallback mode:

```bash
open index.html
```

Real LLM mode:

```bash
OPENAI_API_KEY="..." node server.js
```

Then open:

```text
http://localhost:4177
```

Optional environment variables:

- `OPENAI_MODEL`: defaults to `gpt-5.4-mini`.
- `OPENAI_BASE_URL`: defaults to `https://api.openai.com/v1`.
- `PORT`: defaults to `4177`.

Do not commit API keys. This project lives in an internal-public workspace, so `server.js` only reads keys from environment variables.

GitHub Pages mode:

```text
https://oliveryounger.github.io/gaokao-essay-simulator-2026-06-27/
```

GitHub Pages is static hosting. To use a real LLM from that URL, deploy the included `api/*.js` serverless functions to Vercel or another backend, set `OPENAI_API_KEY` there, then put that backend origin in `config.js`:

```js
window.GAOKAO_API_BASE = "https://your-vercel-project.vercel.app";
```

Vercel mode:

```bash
vercel
vercel env add OPENAI_API_KEY production
vercel --prod
```

If the whole repo is served from Vercel, the frontend can call same-origin `/api/*` and `config.js` can stay empty.

## Gameplay

- Choose one of six 2026 main作文题: 全国 I、全国 II、北京议论文、北京记叙文、天津、上海.
- Use prompt chips or browser speech recognition to describe the desired style.
- Generate an initial draft, then repeatedly ask the AI coach to diagnose, rebuild outline, revise, rewrite opening, add detail, remove AI tone, improve ending, or polish language.
- Draft history supports undoing the last AI rewrite.
- AI writing endpoint returns title, essay, outline, and risk warnings.
- AI coach endpoint returns a player-facing reply, optional rewritten essay, patch summary, and remaining warnings.
- Grading endpoint returns:
  - content / expression / development, each 20 points
  - total score out of 60
  - strict examiner comment
  - red flags and improvement suggestions
  - viral label for sharing
- Local fallback writer/grader keeps the game playable without network or API key.
- LocalStorage leaderboard stores only alias, score, prompt title, and date. It does not store full essays.

## Viral Hooks

- Same-topic challenge code in the share copy.
- Canvas-generated poster with score stamp and examiner label.
- Local leaderboard seeded with meme-style rivals.
- Scoring comments are strict enough to invite replay and comparison.
- Works as a single mobile-first page for group chat sharing.

## Safety Notes

- Entertainment and writing-practice simulator only; not for real exam cheating.
- No real personal information is requested.
- AI prompts forbid names, schools, ID numbers, admission ticket numbers, and contact details.
- API key is never embedded in client code.
- For public deployment in China, put `server.js` behind a serverless function or backend proxy with rate limiting and abuse monitoring.

## Sources

- 2026 essay prompt roundup: `https://cn.chinadaily.com.cn/a/202606/07/WS6a24f2efa310942cc49b0582.html`
- Xinhua analysis page: `https://app.xinhuanet.com/news/article.html?articleId=20260607bb187509af0e46139a7d5e7dd1ce4fab`
- OpenAI Responses API guide: `https://developers.openai.com/api/docs/guides/responses`
- OpenAI Structured Outputs guide: `https://developers.openai.com/api/docs/guides/structured-outputs`

## Files

- `index.html`: mobile-first game structure.
- `styles.css`: responsive visual design, answer sheet, score stamp, modal poster.
- `app.js`: game state, speech input, local AI fallback, scoring, leaderboard, sharing.
- `server.js`: no-dependency Node static server and LLM proxy.
- `api/*.js`: Vercel serverless LLM endpoints.
- `config.js`: optional external API base for GitHub Pages.
