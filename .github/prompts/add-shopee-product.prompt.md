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
2. Use `#tool:vscode_askQuestions` to collect the missing fields — never ask in plain chat text:
   - **Name** — a _free-form input_ question for the short, human-readable product name, in the listing's language, with no SEO-stuffed title copy.
   - **Category** — a _picker_ question whose options are exactly the members of the `CategoryName` enum in [categories.ts](../../src/data/categories.ts), plus a `➕ New category…` option. If `➕ New category…` is chosen, follow up with a _free-form input_ question for the new category name, then add it as a new `CategoryName` member (PascalCase key, the display name as its string value).
   - **Note** — a _free-form input_ question for the short selling point / reason to buy.
   - **Image** — a _free-form input_ question for the image URL. Tell the user to right-click the Shopee product photo and copy the image address (`https://down-tw.img.susercontent.com/file/<hash>`). An empty answer leaves `image` as `""`.
     Batch these questions into a single `#tool:vscode_askQuestions` call.
3. Show the drafted object to the user and confirm the entered `name` looks right before writing.
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

- Never fabricate `name` or `note`; always ask via `#tool:vscode_askQuestions`.
- Never guess the category; always ask via `#tool:vscode_askQuestions` with a picker sourced from `CategoryName`.
- Never try to fetch, scrape, or curl the Shopee page — it is blocked. `image` comes from the user only.
- `id` is always the highest existing `id` in the target category plus 1 — never reuse or renumber existing ids, and never restart from `"1"` in a category that already has items.
- `category` must be written as a `CategoryName` member (e.g. `CategoryName.MustHave`), never a raw string; adding a new one means editing [categories.ts](../../src/data/categories.ts) first.
- All questions go through `#tool:vscode_askQuestions`, not plain chat prose.
- Match the existing formatting and key order in [products.ts](../../src/data/products.ts).
- Only edit [products.ts](../../src/data/products.ts) and, when adding a category, [categories.ts](../../src/data/categories.ts).
