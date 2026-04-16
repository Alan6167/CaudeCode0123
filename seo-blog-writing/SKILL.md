---
name: seo-blog-writing
description: Systematic workflow for creating high-quality, SEO-optimized blog articles. Use when creating content marketing or SEO articles that need keyword optimization, competitor analysis, source verification, and professional formatting. Ideal for B2B marketing content, product comparisons, and industry guides.
---

# SEO Blog Writing

## Overview

This skill provides a systematic workflow for creating high-quality, SEO-optimized blog articles. It covers the complete process from keyword research to final document creation.

Articles produced with this skill should follow a **Lite EEAT voice** — readable and practical, like advice from a senior sourcing advisor rather than an audit report. Trust signals (byline, update date, methodology, honest disclosures) are built in, but facts rely only on publicly available official sources, not gated databases or certification numbers. See `references/eeat-style-guide.md` for tone examples and comparison tables.

## Workflow

### Step 1: Understand Requirements

Gather the following information from the client:

**Required:**
- **Client's website URL** (the website/company to be marketed)
- **Target keyword** (main keyword to rank for)

**Optional (with defaults):**
- **Target audience** (default: potential B2B buyers)
- **Word count** (default: 2000+ words)
- **Tone** (default: neutral, professional)
- **Reading level** (default: general audience)
- **Language style** (default: Plain English)
- **Keyword density** (default: 2-3%)
- **Client positioning** (default: featured first or prominently in list articles)
- **Words to avoid** (default: AI-typical words - see references/ai-words-to-avoid.md)

**First Action:** Fetch and analyze the client's website to understand:
- Company name and full legal name
- Location and factory details
- Products and services offered
- Certifications and awards
- Key differentiators and strengths
- Any claims that need to be accurately represented

### Step 2: Keyword Research & Competitor Analysis

**Search the target keyword** to analyze top-ranking results using WebSearch tool.

**Analyze top 5-10 results for:**
- Content structure (H2/H3 headings)
- Word count
- Topics covered
- Types of information included
- Content gaps you can fill

**Create an outline** based on competitor analysis that:
- Covers all important topics competitors cover
- Adds unique value or information
- Has logical flow
- Includes target keyword in key headings

### Step 3: Source Verification (Lite)

**Rule: Only two sources are allowed — the official website, and general industry common sense.** If a company has no accessible official website, skip it entirely.

**Client's Website (Priority #1):**
- Fetch client's website first using WebFetch
- Document company name, location, founding year, product focus, stated certifications, OEM/ODM services
- Identify 2-3 genuine differentiators to highlight
- Note any client testimonials or partnerships publicly listed

**Competitor Websites:**
For each other company mentioned:

1. Search for official website using WebSearch
2. Fetch the official site using WebFetch
3. Extract only what the official site states
4. Record the URL for the closing Source Disclosure

**What to record (and what NOT to chase):**

| Record (Lite) | Skip (Heavy) |
|---|---|
| Certification names (e.g., "ISO 9001 certified") | Certificate numbers + validity dates |
| "LFGB compliant (per company site)" | Migration test report files |
| "Medium-to-large factory" | Exact employee counts, audited revenue |
| MOQ as a common-sense range | Precise MOQ tiers with tolerances |
| Stated product focus | Third-party audit reports (SGS/BV originals) |

**Client Positioning Guidelines:**
- In "Top X" list articles: position client as #1 or in top 3
- Give client's section slightly more detail than competitors
- Highlight genuine strengths stated on their website
- Keep tone factual and credible — avoid advertisement voice
- Balance with a small honest "Worth knowing" note where relevant (it raises credibility)

**DO NOT:**
- Pull facts from third-party blog aggregators or directories without the official site confirming
- Fabricate statistics, export figures, or client names
- Include companies without a working official website
- Exaggerate capabilities beyond what the website states
- Make the client section read like a brochure

### Step 4: Content Writing Guidelines

#### EEAT-Lite Voice & Trust Signals

Write like a senior sourcing advisor chatting with a buyer — knowledgeable but approachable. Trust comes from structure and honesty, not from jargon density.

**Byline Block (place directly under H1):**
```
By [Editor Name] · Updated [Month Year] · ~[X] min read
```

**Methodology Note (one short paragraph after the intro):**
```
This guide is based on a review of each company's official website
and general sourcing knowledge in the [industry]. Companies were
ordered based on [2-3 simple criteria, e.g., factory scale, export
experience, and clarity of their OEM services]. Information reflects
what's publicly available as of [month year].
```

**Tone Rules:**
- Speak to the reader as "you", reference yourself as "we" sparingly
- When a specialist term first appears, explain it in parentheses once (e.g., "MOQ (the smallest order a factory accepts)"). After that, use the term normally.
- Prefer concrete nouns over abstract adjectives ("1,000-piece minimum" > "flexible MOQ")
- Short sentences, short paragraphs (2-4 lines max)
- One honest "Worth knowing" note per company Profile is a feature, not a bug

**Trust Signal Placement Summary:**
| Signal | Where |
|---|---|
| Byline + update date | Under H1 |
| Methodology paragraph | After opening paragraph |
| "How We Picked" (optional) | Before the company list |
| "Worth knowing" note | Inside each company Profile |
| Source Disclosure | End of article, before Conclusion or in the footer |

#### SEO Title
- 50-60 characters maximum
- Include target keyword near the beginning
- Include year for freshness (e.g., [2026])
- Make it compelling and clickable

**Format:** `[Target Keyword]: [Value Proposition] [Year]`

**Example:** `10 Best Tumblers Manufacturers in China 2026 | Factory Guide`

#### Meta Description
- 150-155 characters maximum
- Include target keyword
- Summarize article value
- Include call-to-action

**Example:** `Find the best tumblers manufacturers in China. Compare top 10 factories with pricing, MOQ, certifications & OEM services. Source quality drinkware direct.`

#### Content Structure

```
H1: Main Title (include target keyword)

Opening Paragraph (include target keyword, bolded and italicized)

H2: Section 1
  H3: Subsection (if needed)

H2: Section 2
  H3: Subsection (if needed)

H2: FAQs (8-10 questions with H3 headers)

H2: Conclusion
```

#### Writing Style Rules

**DO:**
- Use short, clear sentences
- Write in active voice
- Use bullet points for lists
- Bold important keywords
- Include the target keyword naturally (aim for specified density)
- Use transition words between sections
- Break up long paragraphs

**DO NOT:**
- Use AI-typical words (see references/ai-words-to-avoid.md for full list)
- Use excessive adverbs
- Write overly long sentences
- Use passive voice excessively
- Stuff keywords unnaturally

#### Keyword Placement

Place target keyword in:
- H1 title
- First paragraph (bolded + italicized)
- At least one H2 heading
- Naturally throughout body text
- Conclusion

### Step 5: Section Templates

#### Company/Product Profile Template (EEAT-Lite)

```
### [Rank]. [Company Name]

**Website:** [URL] · **Based in:** [City, Country] · **Since:** [Year]

[One natural-sounding sentence introducing the company, like how
you'd describe it to a colleague. Example: "A large Ningbo-based
factory known for stainless steel tumblers and strong OEM support
for overseas brands."]

**What makes them stand out**

[2-3 sentences of plain description. Weave certifications into
sentences rather than bullet-listing them. Example: "Their product
range is wider than most competitors, covering everything from
kids' bottles to 40oz tumblers. They list FDA and LFGB compliance
on their product pages, which matters for US and EU buyers."]

**Good fit if you're...**

- A brand looking for [specific scenario]
- Comfortable with MOQ around [common-sense range]
- Needing [OEM / ODM / stock sourcing — whatever applies]

**Worth knowing**

[One honest, helpful note — not a warning, more like a friend's
tip. Example: "Their English catalog is limited, so expect to
request a full product list by email rather than browse it online."]
```

**Why this template works for EEAT:** the "Good fit if..." section signals buyer-journey experience, and the "Worth knowing" note signals Trust by showing the author isn't just promoting everyone equally. Both are required for every company profile.

#### FAQ Template (EEAT-Lite)

Each FAQ should feel like advice from someone who has sourced before, not a dictionary entry.

```
### [Question in natural buyer language]?

[2-4 sentences. Start with a direct answer, then add one
"experience tip" sentence that shows practical knowledge.]
```

**Example — weak (dictionary style):**
> **What is MOQ?** MOQ is the minimum order quantity a manufacturer accepts for production.

**Example — EEAT-Lite:**
> **What's a realistic minimum order when sourcing tumblers from China?** For most China-based factories, expect minimums around 1,000–3,000 pieces if you want a custom logo. Stock designs without branding can sometimes go lower. If a supplier says "no minimum" on a custom OEM run, they're usually a trading company reselling — not the factory itself.

Aim for 8-10 FAQs. Draw questions from Google's "People Also Ask", common buyer concerns (pricing, MOQ, lead time, shipping, quality control), and issues a new buyer might not know to ask.

#### Source Disclosure Template

Place at the end of the article, before or inside the Conclusion:

```
*Company information in this guide was sourced from each
manufacturer's official website (linked above). Industry
figures such as typical MOQ ranges reflect general sourcing
practice in the [industry] as of [month year]. Last reviewed:
[date].*
```

This one paragraph covers update date + source transparency + scope of claims — the minimum viable Trust signal.

### Step 6: Quality Checklist

Before finalizing, verify:

**SEO Basics**
- [ ] Target keyword appears in title, first paragraph, at least one H2, and conclusion
- [ ] Keyword density is within specified range
- [ ] Meta description is under 155 characters
- [ ] SEO title is under 60 characters
- [ ] Content meets minimum word count
- [ ] All sections have proper H1 > H2 > H3 structure

**Content Quality**
- [ ] All company information verified from official websites only
- [ ] No AI-typical words used (see `references/ai-words-to-avoid.md`)
- [ ] Reading level matches the target audience
- [ ] FAQs answer real buyer questions and include an "experience tip" where relevant

**EEAT-Lite Trust Signals**
- [ ] Byline + update date block present under H1
- [ ] One-paragraph methodology note placed after the intro
- [ ] Every company profile has both "Good fit if..." and "Worth knowing" sections
- [ ] Jargon (MOQ, OEM, ODM, etc.) is explained in parentheses on first use
- [ ] Certifications are stated by name only — no fake certificate numbers or validity dates
- [ ] Source Disclosure paragraph included at the end
- [ ] No unverifiable superlatives (e.g., "No.1 in China", "world-class") unless officially claimed and attributed

### Step 7: Document Creation

Use the docx skill to create the final document:

1. Read the docx skill documentation if available
2. Create document with proper formatting:
   - Arial font, 12pt body text
   - Proper heading hierarchy (H1 > H2 > H3)
   - Tables for comparison data
   - Consistent spacing

**Document Structure:**
```
SEO Title: [title]
Meta Description: [description]

H1: [Main Title]
[Body content with proper formatting]
```

## Example Workflow

### Client Request:
"Write an SEO article for our website www.example.com. Target keyword: 'best product manufacturers in China'."

### Execution Steps:

1. **Fetch client's website first using WebFetch**
   - Extract company details, products, certifications, strengths
   - This information will be used to position the client favorably

2. **Search competitors using WebSearch**
   - Analyze top-ranking articles for the target keyword

3. **Analyze top results and create outline**
   - Ensure client's company fits naturally as #1 or in prominent position
   - Structure content to highlight client's strengths

4. **For each other manufacturer, verify official website**
   - Search for official website using WebSearch
   - Fetch using WebFetch to verify information

5. **Write content following guidelines**
   - Client's company featured first with most detail
   - Factual, balanced tone (not overly promotional)
   - Natural integration of client's strengths

6. **Create Word document with docx skill**
   - Proper formatting and structure

7. **Deliver with SEO title and meta description**

## Common Mistakes to Avoid

1. **Using unverified information** - Always check official websites
2. **Keyword stuffing** - Keep density natural
3. **Skipping competitor analysis** - This informs content structure
4. **Ignoring reading level** - Match the target audience
5. **Using AI-typical language** - Sounds unnatural and hurts credibility
6. **Missing meta elements** - SEO title and description are essential
7. **Weak FAQs** - Answer real questions users search for
8. **No source verification** - Can lead to inaccurate content
9. **Fake precision** - Never invent cert numbers, audit dates, or exact export volumes to sound authoritative
10. **Skipping "Worth knowing" notes** - Profiles that only praise every company read as promotional and reduce trust
11. **Jargon walls** - Stacking terms like "OEM/ODM/BPA-free/LFGB" without explanation alienates general readers
12. **Missing byline and update date** - Anonymous, undated articles lose EEAT credit even if accurate

## Output Deliverables

1. **Word Document (.docx)** containing:
   - SEO Title
   - Meta Description
   - Full article with proper formatting

2. **Summary** of:
   - Total word count
   - Keyword density achieved
   - Number of sources verified
   - Key sections included
   - How client's company is positioned

## Notes

- Always prioritize accuracy over speed
- Verify every company/fact from official sources
- If official website is unavailable, skip that company
- Client's company should be positioned prominently but naturally
- Keep content credible - avoid sounding like an advertisement
- Update year references to current year (2026)
- The article should provide genuine value to readers while serving client's marketing goals
- Use WebSearch and WebFetch tools for all research
- Follow the quality checklist before finalizing content
- Maintain the Lite EEAT voice: trust signals built in (byline, date, methodology, honest notes, source disclosure) but facts sourced only from official websites — no fake precision, no audit-report bravado
- See `references/eeat-style-guide.md` for tone comparison tables and before/after examples
