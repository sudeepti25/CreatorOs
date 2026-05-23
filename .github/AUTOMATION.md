# 🤖 GitHub Automation

This repository uses **simple, lightweight GitHub Actions** to automate issue management.

## What's Automated

### 1. **Auto-Label Issues** (`.github/workflows/auto-label.yml`)
Runs when issues are opened or edited.
- Detects: bug, enhancement, documentation, question
- Marks incomplete issues with `needs-info` label
- No configuration needed - works out of the box

**Script**: `scripts/auto-label.js`

### 2. **Issue Reminders** (`.github/workflows/issue-reminder.yml`)
Runs every 12 hours.
- Finds open assigned issues inactive for 32+ hours
- Comments reminder once (avoids spam)
- Asks for blockers, progress, and ETA

**Script**: `scripts/remind-issues.js`

## Local Testing

### Test Auto-Label
```bash
export GITHUB_TOKEN="your_token"
export GITHUB_REPOSITORY_OWNER="your_username"
export GITHUB_REPOSITORY="your_username/repo"
export GITHUB_EVENT_ISSUE_NUMBER="123"

node scripts/auto-label.js
```

### Test Reminders
```bash
export GITHUB_TOKEN="your_token"
export GITHUB_REPOSITORY_OWNER="your_username"
export GITHUB_REPOSITORY="your_username/repo"

node scripts/remind-issues.js
```

## Setup

1. **No setup needed!** Workflows use `${{ secrets.GITHUB_TOKEN }}` which GitHub provides automatically.

2. **To use locally**, generate a personal access token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Create token with `repo` and `issues` scopes
   - Export as `GITHUB_TOKEN`

## File Structure

```
.github/
  workflows/
    auto-label.yml        # Labels issues automatically
    issue-reminder.yml    # Reminds assignees
  ISSUE_TEMPLATE/         # Issue templates (optional)
  pull_request_template.md

scripts/
  auto-label.js           # Labeling logic
  remind-issues.js        # Reminder logic
```

## Design Philosophy

✓ **Boring** - Simple, predictable behavior  
✓ **Easy to debug** - Transparent logging  
✓ **No spam** - Reminds only once per issue  
✓ **Maintainable** - <100 lines per script  
✓ **Zero config** - Works immediately  

## Future Additions

When you have more contributors, consider:
- Stale issue auto-closing (30+ days inactive)
- PR greetings for first-time contributors
- Automatic assignment rotation
- Contributor milestone celebrations

For now: **Keep it simple**. Scale when needed.
