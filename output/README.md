# Output Directory

This directory contains all generated content and deliverables organized by type and date.

## Directory Structure

```
output/
├── articles/           # SEO articles and blog posts
│   └── YYYY-MM-DD-article-name/
│       ├── article.md          # Main article content
│       ├── summary.txt         # Delivery summary
│       └── assets/            # Related images/files (optional)
├── skills/            # Generated skill files
└── documents/         # Other generated documents
```

## Naming Convention

### Article Folders
Format: `YYYY-MM-DD-article-slug/`

Example: `2026-01-23-best-tumbler-manufacturers-china/`

### Files
- Main article: Use descriptive filename with keyword
- Summary: `article-summary.txt` or `summary.txt`
- Assets: Store in `assets/` subfolder if needed

## Current Contents

### Articles

#### 2026-01-23: Best Tumbler Manufacturers in China
- **Client:** Ningbo Maxlink Home & Gift Co., Ltd.
- **Keyword:** Best Tumbler Manufacturers in China
- **Word Count:** 2,590 words
- **Status:** Completed and delivered
- **Files:**
  - `best-tumbler-manufacturers-china-2026.md`
  - `article-summary.txt`

## Guidelines

1. **One folder per deliverable** - Each article, skill, or document gets its own dated folder
2. **Include summary** - Always include a summary or metadata file
3. **Keep assets together** - Store related images, templates, or files in the same folder
4. **Date prefix** - Use YYYY-MM-DD format for chronological sorting
5. **Descriptive names** - Use clear, keyword-rich folder names

## Usage

When creating new content:

```bash
# Create new article folder
mkdir -p output/articles/YYYY-MM-DD-article-name

# Create new skill folder
mkdir -p output/skills/skill-name

# Create new document folder
mkdir -p output/documents/YYYY-MM-DD-document-name
```
