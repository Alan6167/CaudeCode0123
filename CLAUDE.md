# CLAUDE.md - AI Assistant Guide

**Repository:** Alan6167/CaudeCode0123
**Last Updated:** 2026-01-23
**Status:** New/Empty Repository

---

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Codebase Structure](#codebase-structure)
3. [Development Workflows](#development-workflows)
4. [Key Conventions](#key-conventions)
5. [AI Assistant Guidelines](#ai-assistant-guidelines)
6. [Common Tasks](#common-tasks)
7. [Git Workflow](#git-workflow)
8. [Testing Guidelines](#testing-guidelines)
9. [Documentation Standards](#documentation-standards)

---

## Repository Overview

### Current State
This repository includes the Anthropic Skills toolkit for creating Claude skills. The skill-creator functionality allows you to build custom skills that extend Claude's capabilities.

### Purpose
Development repository with Anthropic Skills integration for creating and managing Claude skills.

### Technology Stack
- **Primary Language:** Python 3.11.14
- **Skills Framework:** Anthropic Skills (https://github.com/anthropics/skills)
- **Skill Creator:** Installed and operational

### Key Dependencies
- Python 3.11+ (installed)
- Anthropic Skills repository (cloned in `/skills/` directory)

---

## Codebase Structure

### Recommended Directory Structure

As this repository grows, the following structure is recommended:

```
/
├── src/                    # Source code
│   ├── components/        # Reusable components
│   ├── utils/            # Utility functions
│   ├── services/         # Business logic/services
│   ├── models/           # Data models
│   └── config/           # Configuration files
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── docs/                  # Documentation
├── scripts/              # Build/deployment scripts
├── .github/              # GitHub workflows and configs
├── README.md             # Project overview
├── CONTRIBUTING.md       # Contribution guidelines
├── LICENSE               # License file
└── CLAUDE.md             # This file

```

### Current Structure
```
/home/user/CaudeCode0123/
├── .git/                 # Git metadata
├── skills/               # Anthropic Skills repository (submodule)
│   ├── skills/          # Example skills
│   │   └── skill-creator/  # Skill creation toolkit
│   │       ├── scripts/    # Skill creation scripts
│   │       │   ├── init_skill.py      # Initialize new skill
│   │       │   ├── package_skill.py   # Package skill for distribution
│   │       │   └── quick_validate.py  # Validate skill structure
│   │       ├── references/ # Reference documentation
│   │       └── SKILL.md    # Skill creator guide
│   ├── spec/            # Agent Skills specification
│   └── template/        # Skill templates
├── seo-blog-writing/     # Custom SEO Blog Writing skill
│   ├── SKILL.md         # Skill definition
│   └── references/      # AI words to avoid reference
├── output/              # Generated content and deliverables
│   ├── articles/        # SEO articles organized by date
│   │   └── YYYY-MM-DD-article-name/
│   ├── skills/          # Generated skill packages
│   └── documents/       # Other generated documents
├── metadata-remover/     # AI Metadata Remover MVP website (static, 100% client-side)
│   ├── index.html       # Landing page + tool UI (SEO meta, FAQ, JSON-LD)
│   ├── css/styles.css   # Design system (light/dark, mobile-first)
│   ├── js/              # cleaners.js, exif-reader.js, zip.js, app.js
│   └── README.md        # Architecture and deployment notes
├── seo-blog-writing.skill  # Packaged skill file (5.3KB)
└── CLAUDE.md            # This file
```

---

## Development Workflows

### Skill Creation with skill-creator

The skill-creator toolkit enables you to build custom skills that extend Claude's capabilities.

#### What Are Skills?

Skills are modular packages containing:
- **Specialized workflows** - Multi-step procedures for specific domains
- **Tool integrations** - Instructions for working with specific file formats or APIs
- **Domain expertise** - Company-specific knowledge, schemas, business logic
- **Bundled resources** - Scripts, references, and assets for complex tasks

#### Creating a New Skill

**Step 1: Initialize a new skill**
```bash
python3 skills/skills/skill-creator/scripts/init_skill.py <skill-name> --path <output-directory>
```

Example:
```bash
python3 skills/skills/skill-creator/scripts/init_skill.py my-custom-skill --path .
```

This creates:
- `SKILL.md` - Main skill definition with YAML frontmatter
- `scripts/` - Executable code (Python/Bash)
- `references/` - Documentation loaded as needed
- `assets/` - Files used in output (templates, icons, etc.)

**Step 2: Edit the skill**

Update `SKILL.md` with:
- **Frontmatter** (YAML):
  ```yaml
  name: my-skill-name
  description: Complete description of what the skill does and when to use it
  ```
- **Body** (Markdown): Instructions, workflows, and resource usage

**Step 3: Add resources**
- `scripts/` - Python/Bash scripts for repetitive, deterministic tasks
- `references/` - Documentation (schemas, API docs, policies)
- `assets/` - Templates, images, boilerplate code

**Step 4: Validate the skill**
```bash
python3 skills/skills/skill-creator/scripts/quick_validate.py <skill-directory>
```

**Step 5: Package the skill**
```bash
python3 skills/skills/skill-creator/scripts/package_skill.py <skill-directory> [output-dir]
```

This creates a `.skill` file (ZIP with .skill extension) ready for distribution.

#### Skill Design Principles

1. **Concise is Key** - Only add context Claude doesn't already have
2. **Progressive Disclosure** - Use three-level loading:
   - Metadata (name + description) - always in context
   - SKILL.md body - when skill triggers
   - Bundled resources - loaded as needed
3. **Appropriate Freedom** - Match specificity to task fragility:
   - High freedom: text-based instructions
   - Medium freedom: pseudocode/scripts with parameters
   - Low freedom: specific scripts for fragile operations

#### Reference Documentation

- Full guide: `skills/skills/skill-creator/SKILL.md`
- Workflows: `skills/skills/skill-creator/references/workflows.md`
- Output patterns: `skills/skills/skill-creator/references/output-patterns.md`
- Agent Skills standard: http://agentskills.io

### Local Development
[To be documented when additional development environment is configured]

### Build Process
[To be documented when build system is implemented]

### Deployment
[To be documented when deployment process is established]

---

## Key Conventions

### Code Style

#### General Principles
- Write clean, readable, and maintainable code
- Follow the principle of least surprise
- Prefer explicit over implicit
- Keep functions small and focused (single responsibility)
- Avoid premature optimization
- Don't over-engineer solutions

#### Naming Conventions
- Use descriptive, meaningful names
- Functions/methods: verb-noun format (e.g., `getUserData`, `calculateTotal`)
- Variables: nouns (e.g., `userData`, `totalAmount`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- Classes: PascalCase (e.g., `UserService`, `DataProcessor`)

#### File Organization
- One primary export per file
- Group related functionality
- Keep files focused and cohesive
- Place tests adjacent to source files or in dedicated test directories

### Comments and Documentation
- Write self-documenting code first
- Add comments only where logic isn't self-evident
- Document complex algorithms and business logic
- Keep comments up-to-date with code changes
- Use JSDoc/docstrings for public APIs

### Error Handling
- Validate at system boundaries (user input, external APIs)
- Don't add error handling for scenarios that can't happen
- Use specific error types/classes
- Log errors with sufficient context
- Fail fast for programming errors

---

## AI Assistant Guidelines

### When Working on This Repository

#### DO:
- ✅ Read existing code before making changes
- ✅ Use TodoWrite tool to plan and track multi-step tasks
- ✅ Follow existing patterns and conventions in the codebase
- ✅ Keep solutions minimal and focused on the requested task
- ✅ Write secure code (avoid XSS, SQL injection, command injection)
- ✅ Test changes before committing
- ✅ Use descriptive commit messages
- ✅ Commit and push to the designated claude/* branch
- ✅ Include file paths and line numbers when referencing code
- ✅ Use parallel tool calls when operations are independent
- ✅ Mark todos as completed immediately after finishing each task

#### DON'T:
- ❌ Propose changes to code you haven't read
- ❌ Add features or refactoring beyond what was requested
- ❌ Add comments/docstrings to code you didn't change
- ❌ Create helpers/utilities for one-time operations
- ❌ Add error handling for scenarios that can't happen
- ❌ Use backwards-compatibility hacks for unused code
- ❌ Create files unless absolutely necessary (prefer editing)
- ❌ Push to branches other than those specified
- ❌ Give time estimates for tasks
- ❌ Use emojis unless explicitly requested
- ❌ Use bash echo to communicate with users (output text directly)

### Tool Usage Best Practices

#### File Operations
- Use **Read** for reading files (not cat/head/tail)
- Use **Edit** for modifying files (not sed/awk)
- Use **Write** for creating new files (not echo/heredoc)
- Use **Glob** for finding files by pattern (not find/ls)
- Use **Grep** for searching code (not grep/rg commands)

#### Task Management
- Use **TodoWrite** for planning multi-step tasks (3+ steps)
- Keep exactly ONE task in_progress at a time
- Mark tasks completed immediately after finishing
- Create specific, actionable todo items
- Use both content (imperative) and activeForm (continuous) for todos

#### Code Exploration
- Use **Task tool with Explore agent** for understanding codebase structure
- Use parallel tool calls when operations are independent
- Use specialized agents for their specific purposes

### Security Considerations
- Always validate user input
- Sanitize data before using in queries or commands
- Avoid hardcoding secrets or credentials
- Use parameterized queries for databases
- Follow OWASP top 10 guidelines
- Implement proper authentication and authorization
- Use HTTPS for external communications

---

## Common Tasks

### Creating a Custom Skill

**Example: Creating a database query skill**

```bash
# Step 1: Initialize the skill
python3 skills/skills/skill-creator/scripts/init_skill.py db-query-helper --path .

# Step 2: Edit db-query-helper/SKILL.md
# - Update description in frontmatter
# - Add workflow instructions
# - Document when to use the skill

# Step 3: Add resources
# - scripts/query_builder.py - Script for building SQL queries
# - references/schema.md - Database schema documentation
# - assets/query_templates/ - Common query templates

# Step 4: Validate
python3 skills/skills/skill-creator/scripts/quick_validate.py db-query-helper

# Step 5: Package
python3 skills/skills/skill-creator/scripts/package_skill.py db-query-helper ./
```

**Skill Structure Best Practices:**
- Keep SKILL.md under 500 lines
- Use imperative/infinitive form in writing
- Move detailed docs to `references/`
- Test scripts by actually running them
- Delete unused example files

### Using skill-creator Scripts

**Initialize a new skill:**
```bash
python3 skills/skills/skill-creator/scripts/init_skill.py <skill-name> --path <output-dir>
```

**Validate a skill:**
```bash
python3 skills/skills/skill-creator/scripts/quick_validate.py <skill-directory>
```

**Package a skill:**
```bash
python3 skills/skills/skill-creator/scripts/package_skill.py <skill-directory> [output-dir]
```

### Organizing Output Files

All generated content should be organized in the `output/` directory:

**Create article folder:**
```bash
mkdir -p output/articles/YYYY-MM-DD-article-name
```

**Create skill output folder:**
```bash
mkdir -p output/skills/skill-name
```

**Create document folder:**
```bash
mkdir -p output/documents/YYYY-MM-DD-document-name
```

**Naming Conventions:**
- Use `YYYY-MM-DD-` prefix for chronological sorting
- Use descriptive, keyword-rich folder names
- Store related files (article, summary, assets) together
- Always include a summary or metadata file

**Example Structure:**
```
output/articles/2026-01-23-best-tumbler-manufacturers-china/
├── best-tumbler-manufacturers-china-2026.md
├── article-summary.txt
└── assets/                    # Optional: images, charts, etc.
```

### Adding a New Feature
1. Read relevant existing code
2. Use TodoWrite to plan implementation steps
3. Implement the minimal changes needed
4. Test the feature
5. Commit with descriptive message
6. Push to the designated branch

### Fixing a Bug
1. Understand the bug by reading the code
2. Locate the root cause
3. Fix the specific issue (don't refactor surrounding code)
4. Verify the fix
5. Commit and push

### Refactoring Code
1. Only refactor when explicitly requested
2. Maintain existing behavior
3. Keep changes focused
4. Test thoroughly
5. Use clear commit messages explaining the refactoring

### Adding Tests
1. Follow existing test structure
2. Write focused, readable test cases
3. Test both happy paths and edge cases
4. Ensure tests are deterministic
5. Keep tests maintainable

---

## Git Workflow

### Branch Strategy

**Development Branch:** `claude/claude-md-mkqgss3gyfbzmwax-SHt7K`

All AI assistant development should happen on designated `claude/*` branches.

### Branch Naming
- Format: `claude/<descriptive-name>-<session-id>`
- Session ID must match for authentication
- Never push to main/master without explicit permission

### Commit Guidelines

#### Commit Message Format
```
<type>: <short summary>

<optional detailed description>

https://claude.ai/code/session_<session-id>
```

#### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

#### Best Practices
- Write clear, descriptive commit messages
- Focus on the "why" rather than the "what"
- Keep commits atomic and focused
- Never skip hooks (--no-verify) unless explicitly requested
- Stage specific files rather than using `git add -A`
- Avoid committing sensitive files (.env, credentials)

### Push Protocol
```bash
# Always use -u flag for pushing
git push -u origin <branch-name>

# Retry on network failures (up to 4 times with exponential backoff)
# 2s, 4s, 8s, 16s
```

### Pull/Fetch Protocol
```bash
# Prefer fetching specific branches
git fetch origin <branch-name>

# For pulls
git pull origin <branch-name>

# Retry on network failures (up to 4 times with exponential backoff)
```

### Git Safety
- **NEVER** run destructive commands without explicit permission:
  - `git push --force`
  - `git reset --hard`
  - `git checkout .`
  - `git clean -f`
  - `git branch -D`
- **NEVER** update git config
- **NEVER** skip hooks
- **NEVER** force push to main/master
- **ALWAYS** create NEW commits (don't amend unless explicitly requested)

---

## Testing Guidelines

### General Testing Principles
[To be defined based on chosen testing framework]

### Unit Tests
- Test individual functions/methods in isolation
- Mock external dependencies
- Keep tests fast and focused
- Aim for high code coverage on critical paths

### Integration Tests
- Test interactions between components
- Verify data flow and API contracts
- Test error scenarios

### End-to-End Tests
- Test complete user workflows
- Verify system behavior from user perspective
- Keep E2E tests stable and maintainable

### Test Organization
```
tests/
├── unit/
│   └── [mirror src structure]
├── integration/
│   └── [feature-based organization]
└── e2e/
    └── [user-journey-based organization]
```

---

## Documentation Standards

### Code Documentation
- Write self-documenting code first
- Add comments for complex business logic
- Document public APIs with proper docstrings
- Keep documentation in sync with code

### README.md
- Project overview and purpose
- Installation instructions
- Usage examples
- Configuration guide
- Contributing guidelines link
- License information

### CONTRIBUTING.md
- How to set up development environment
- Coding standards
- Pull request process
- Testing requirements
- Code review guidelines

### Inline Documentation
- Explain "why" not "what"
- Document edge cases and gotchas
- Link to relevant issues/tickets
- Keep comments concise

### API Documentation
- Document all public endpoints
- Include request/response examples
- List all parameters and their types
- Document error responses
- Provide usage examples

---

## Updates and Maintenance

This CLAUDE.md file should be updated whenever:
- New technologies or frameworks are added
- Development workflows change
- New conventions are established
- Directory structure is modified
- Important decisions are made about the project

### Update Process
1. Make necessary changes to CLAUDE.md
2. Commit with message: `docs: update CLAUDE.md - <brief description>`
3. Ensure all AI assistants are aware of changes

---

## Notes for Future Development

As this repository grows, remember to update this file with:
- [x] Actual technology stack when chosen (Python 3.11 + Anthropic Skills)
- [x] Directory structure as it's established (skills/ directory added)
- [ ] Build and deployment processes
- [x] Environment setup instructions (skill-creator documented)
- [ ] API documentation standards
- [ ] Specific testing patterns
- [ ] Performance considerations
- [ ] Security requirements
- [ ] Third-party integrations
- [ ] Common troubleshooting steps

### Installed Tools

- **Anthropic Skills** - Framework for creating Claude skills
  - Location: `/home/user/CaudeCode0123/skills/`
  - Repository: https://github.com/anthropics/skills
  - Documentation: See "Skill Creation with skill-creator" section above

---

**Last Updated:** 2026-01-23
**Maintained By:** AI Assistants working on this repository
**Version:** 1.0.0
