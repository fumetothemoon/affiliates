---
description: "Add a Shopee product to the affiliate catalog from a Shopee product URL"
name: "add shopee product"
argument-hint: "Paste the Shopee product URL (long or s.shopee.tw short link)"
agent: "agent"
tools: [search, editFiles, vscode_askQuestions]
---

Add a new Shopee product entry to [products.ts](../../src/data/products.ts) from a Shopee URL supplied by the user.

## Input

- Required: a Shopee product URL — either a full `shopee.tw/...-i.<shopid>.<itemid>` link or an `s.shopee.tw/...` short link.

## Reading the listing

Do **not** try to fetch or scrape the page. Shopee sits behind a login wall, returns 403 on its item API, and answers every non-allowlisted user agent with an anti-bot JSON blob — so `#tool:fetch` and `curl` both fail, including for the Open Graph tags that power link previews.

Do not infer the product name from the page; ask for it as a text input instead.

## Steps

1. Set `link` to the product URL as given (keep the short link if that is what the user pasted).
2. Use `#tool:vscode_askQuestions` to collect all four fields — never ask in plain chat text:

- **Name** — a _required free-form input_ question for the short, human-readable product name, in the listing's language, with no SEO-stuffed title copy.
- **Category** — a _required picker_ question whose options are exactly the members of the `CategoryName` enum in [categories.ts](../../src/data/categories.ts), plus a `➕ New category…` option. If `➕ New category…` is chosen, ask a _required free-form input_ question for the new category name, then add it as a new `CategoryName` member (PascalCase key, the display name as its string value).
- **Note** — a _required free-form input_ question for the short selling point / reason to buy.
- **Image** — a _required free-form input_ question for the image URL. Tell the user to right-click the Shopee product photo and copy the image address (`https://down-tw.img.susercontent.com/file/<hash>`).
  You may suggest a default value in a question, but never select, assign, or write that value without the user's explicit answer. For the four field questions in Step 2, do not treat dismissing a question, skipping it, or submitting a blank/whitespace-only answer as consent; re-ask until the user supplies a non-empty answer. Batch the initial four questions into a single `#tool:vscode_askQuestions` call; follow-up questions may be separate calls.

3. Show the complete drafted object to the user, then use `#tool:vscode_askQuestions` to request approval before writing. Use a freeform input question asking "Any changes to make?" with a suggestion message like "Leave blank to confirm and add, or describe what to change". Write the entry when the user submits an empty/whitespace-only answer. If the user provides feedback, re-ask which field to update, collect the new value, show the updated draft, and repeat the approval question until they confirm with a blank answer.
4. Insert the entry at the end of the chosen category's `items` array. Generate `id` by taking the highest existing numeric `id` in that category and adding 1, stored as a string — e.g. last item `"3"` → new item `"4"`. A brand-new category starts at `"1"`. Create the category object if it is new.

## Output shape

Must match `productCategories` in [types.ts](../../src/data/types.ts):

```ts
{
  id: "<highest id in category + 1>",
  name: "<short product name>",
  note: "<user-supplied selling point>",
  image: "<image url>",
  link: "<product url>",
}
```

The enclosing category object uses `category: CategoryName.<Member>`.

## Rules

- Never fabricate `name`, `note`, or `image`; always ask via `#tool:vscode_askQuestions` and require a non-empty user answer.
- Never guess or silently choose a category; always ask via `#tool:vscode_askQuestions` with a picker sourced from `CategoryName` and require the user's selection.
- Never treat a suggested default as an answer. Defaults are hints only and may be used only when the user explicitly confirms or submits them.
- Always request final approval through `#tool:vscode_askQuestions` (freeform input) after showing the complete drafted object. Loop to collect feedback and update fields until the user submits a blank answer to confirm. Never treat displaying the draft, a prior field answer, or a plain-chat reply as approval.
- Never edit [products.ts](../../src/data/products.ts) or [categories.ts](../../src/data/categories.ts) until the user confirms with a blank/whitespace-only answer to the approval question.
- Never try to fetch, scrape, or curl the Shopee page — it is blocked. `image` comes from the user only and must not be `""`.
- `id` is always the highest existing `id` in the target category plus 1 — never reuse or renumber existing ids, and never restart from `"1"` in a category that already has items.
- `category` must be written as a `CategoryName` member (e.g. `CategoryName.MustHave`), never a raw string; adding a new one means editing [categories.ts](../../src/data/categories.ts) first.
- All questions go through `#tool:vscode_askQuestions`, not plain chat prose.
- Match the existing formatting and key order in [products.ts](../../src/data/products.ts).
- Only edit [products.ts](../../src/data/products.ts) and, when adding a category, [categories.ts](../../src/data/categories.ts).
