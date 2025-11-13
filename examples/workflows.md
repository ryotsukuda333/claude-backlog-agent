# Workflow Examples

Complete workflow examples for common Backlog operations using Claude Code.

## Quick Reference

Copy these commands directly into Claude Code and modify as needed.

### Project Setup

```
"List all projects I can access and show their IDs and keys"
```

### Daily Standup

```
"Show me:
1. All issues assigned to me
2. Issues I created in the last 24 hours
3. My recent notifications"
```

### Issue Creation

```
"Create a bug in project 12345:
- Summary: Fix mobile app crash on startup
- Priority: High
- Description: App crashes when opening on iOS 17.2"
```

## Complete Workflows

### 1. Bug Report and Tracking Workflow

#### Step 1: Create Bug Report

```
"Create a bug report in project PROJECT-WEB:
- Summary: Login page shows 500 error
- Priority: Critical
- Description: Users unable to login since deployment v2.3.1
- Category: Frontend
- Due Date: 2025-01-20"
```

**Expected Response**: Issue key (e.g., PROJ-456)

#### Step 2: Assign to Developer

```
"Assign PROJ-456 to user ID 789 and set status to 'In Progress'"
```

#### Step 3: Add Investigation Notes

```
"Add comment to PROJ-456:
Investigation findings:
- Error occurs in auth middleware
- Related to session timeout configuration
- Fix in progress, targeting v2.3.2"
```

#### Step 4: Update Status

```
"Update PROJ-456:
- Status: Resolved
- Comment: Fixed in commit abc123, deployed in v2.3.2"
```

#### Step 5: Verify Resolution

```
"Get details for PROJ-456 to verify current status"
```

---

### 2. Sprint Planning Workflow

#### Step 1: Review Backlog

```
"Get all open issues in project 12345 sorted by priority,
showing issue key, summary, priority, and estimated hours"
```

#### Step 2: Filter Issues for Sprint

```
"From project 12345, show me:
- High priority issues
- Issues with no milestone
- Estimated total hours under 80"
```

#### Step 3: Create Sprint Milestone

```
"Create a new milestone 'Sprint 15' for project 12345 with due date 2025-02-15"
```

#### Step 4: Assign Issues to Sprint

```
"Update issues PROJ-10, PROJ-11, PROJ-12, PROJ-13:
- Add to milestone 'Sprint 15'
- Set status to 'Ready for Development'"
```

#### Step 5: Generate Sprint Summary

```
"For project 12345 milestone 'Sprint 15', show me:
- Total number of issues
- Sum of estimated hours
- Breakdown by issue type
- List of assigned developers"
```

---

### 3. Code Review Workflow

#### Step 1: Create Review Request

```
"Create a task in project 12345:
- Summary: Code review: User authentication refactoring (PR #45)
- Description: Please review authentication module changes
- Assign to: reviewer user ID 456
- Priority: Medium"
```

#### Step 2: Add Review Comments

```
"Add comment to PROJ-789:
Code review feedback:
✅ Authentication logic looks good
✅ Tests are comprehensive
⚠️ Consider adding error handling for edge cases
⚠️ Update documentation for new endpoints"
```

#### Step 3: Request Changes

```
"Update PROJ-789:
- Status: 'In Review'
- Comment: Changes requested, please address feedback"
```

#### Step 4: Approve and Close

```
"Update PROJ-789:
- Status: 'Resolved'
- Comment: All feedback addressed. Code review approved. Ready to merge."
```

---

### 4. Release Management Workflow

#### Step 1: Create Release Issue

```
"Create a release task in project 12345:
- Summary: Release v2.5.0
- Description: Production deployment for Q1 features
- Milestone: Q1-2025
- Due Date: 2025-03-31"
```

#### Step 2: List Issues for Release

```
"Find all resolved issues in project 12345 with:
- Milestone: Q1-2025
- Status: Resolved or Closed
- Updated in last 30 days"
```

#### Step 3: Create Release Notes

```
"For project 12345 milestone Q1-2025, generate release notes showing:
- All resolved issues grouped by type (Bug, Feature, Improvement)
- Issue keys and summaries"
```

#### Step 4: Update Release Status

```
"Add comment to release issue PROJ-999:
✅ Release v2.5.0 deployed to production
- Deployment time: 2025-01-15 10:00 UTC
- All 15 issues successfully deployed
- No rollback required
- Monitoring for 24 hours"
```

#### Step 5: Close Release

```
"Update PROJ-999:
- Status: Closed
- Comment: Release v2.5.0 completed successfully. Monitoring stable."
```

---

### 5. Documentation Workflow

#### Step 1: Create Documentation Wiki

```
"Create a wiki page in project 12345:
- Title: API Authentication Guide
- Content: [Your markdown content]"
```

#### Step 2: List Existing Documentation

```
"List all wiki pages in project 12345 containing 'API' in the title"
```

#### Step 3: Update Documentation

```
"Get wiki page ID 567 content from project 12345"
```

Then update with new content.

#### Step 4: Link Documentation to Issues

```
"Add comment to PROJ-123:
Documentation updated:
- API Authentication Guide: [wiki link]
- See section 3.2 for new OAuth flow details"
```

---

### 6. Team Standup Workflow

#### Morning Standup

```
"For my daily standup, show me:
1. Issues I worked on yesterday (updated by me in last 24 hours)
2. Issues currently assigned to me with status 'In Progress'
3. My upcoming tasks (assigned to me, status 'Open', due within 7 days)"
```

#### Update Status

```
"Update my issues:
- PROJ-123: Add comment 'Completed testing, ready for review'
- PROJ-124: Change status to 'In Progress'
- PROJ-125: Add comment 'Blocked waiting for API documentation'"
```

#### Team Overview

```
"For project 12345, show me:
- All issues in 'In Progress' status
- Group by assignee
- Show issue key, summary, and last update time"
```

---

### 7. Customer Support Workflow

#### Step 1: Create Support Ticket

```
"Create a support issue in project SUPPORT:
- Summary: Customer report: Cannot export CSV data
- Priority: High
- Description: Customer ID: 12345, Error occurs on export page
- Category: Bug
- Customer Impact: High"
```

#### Step 2: Investigate and Update

```
"Add comment to SUPPORT-456:
Investigation update:
- Reproduced issue in staging environment
- Root cause: Database query timeout for large datasets
- Fix in progress: Implementing pagination
- ETA: 2 hours"
```

#### Step 3: Request Customer Feedback

```
"Update SUPPORT-456:
- Status: 'Waiting for Customer'
- Comment: Fix deployed. Please test and confirm resolution."
```

#### Step 4: Close Ticket

```
"Update SUPPORT-456:
- Status: 'Closed'
- Comment: Customer confirmed issue resolved. Closing ticket."
```

---

### 8. Multi-Project Coordination Workflow

#### Step 1: List All Projects

```
"List all my projects showing:
- Project ID
- Project key
- Project name
- Number of open issues"
```

#### Step 2: Cross-Project Issue Search

```
"Find all high-priority issues assigned to me across all projects,
created in the last 7 days"
```

#### Step 3: Create Coordination Issue

```
"Create a task in project COORDINATION:
- Summary: Cross-team dependency: API changes for mobile app
- Description: Requires coordination between Backend (PROJ-123) and Mobile (MOBILE-456)
- Link to related issues"
```

#### Step 4: Update Multiple Projects

```
"Add comment to both PROJ-123 and MOBILE-456:
Coordination update:
- API changes finalized
- Mobile team can proceed with integration
- Backend changes deployed to staging
- Ready for mobile team testing"
```

---

### 9. Automated Reporting Workflow

#### Weekly Team Report

```
"Generate weekly team report for project 12345:
- Issues created this week
- Issues resolved this week
- Issues still open
- Top 3 contributors (by issues updated)
- Average resolution time"
```

#### Project Health Check

```
"For project 12345, show me:
- Issues past due date
- Issues without assignee
- High priority issues open > 7 days
- Issues with no activity in 14 days"
```

#### Personal Productivity Report

```
"Show me my productivity metrics:
- Issues created this month
- Issues resolved this month
- Average time to resolve issues
- My top 3 most active projects"
```

---

### 10. Git Integration Workflow

#### Create Pull Request Issue

```
"Create a task in project 12345:
- Summary: Review PR #78: Implement user profile feature
- Description: GitHub PR: https://github.com/org/repo/pull/78
- Assign to: reviewer ID 456
- Add label: code-review"
```

#### Link Commits to Issues

```
"Add comment to PROJ-123:
Commits for this issue:
- abc123: Implement user profile API endpoint
- def456: Add frontend components
- ghi789: Update documentation
PR #78 ready for review"
```

#### Deploy Notification

```
"Update PROJ-123:
- Status: 'Deployed'
- Comment: Deployed to production in release v2.5.0
  Commit: abc123
  Deploy time: 2025-01-15 10:00 UTC"
```

---

## Tips for Effective Workflows

### 1. Use Templates

Create issue templates for common types:

```
"Create a [BUG/FEATURE/TASK] template with standard fields"
```

### 2. Batch Operations

Combine related operations:

```
"For issues PROJ-10 through PROJ-15:
1. Add comment 'Sprint 15 starting'
2. Change status to 'In Progress'
3. Add to milestone 'Sprint 15'"
```

### 3. Regular Cleanup

```
"Find and list issues in project 12345 that are:
- Resolved over 30 days ago
- Not in any milestone
These can be archived or closed"
```

### 4. Notification Management

```
"Show me unread notifications and mark the ones I've addressed as read"
```

### 5. Custom Queries

```
"Create a saved search for:
- My high priority issues
- Due within 7 days
- Status: Open or In Progress"
```

---

## Automation Ideas

### Daily Digest Email

Schedule daily to run:
```
"Generate my daily digest:
- New issues assigned to me
- Comments on my issues
- Issues approaching due date
Format as email-ready summary"
```

### Weekly Team Sync

Before team meeting:
```
"Prepare team sync report:
- This week's completed issues
- Next week's planned issues
- Blockers and dependencies
- Team velocity metrics"
```

### End of Sprint Report

```
"Generate sprint retrospective data:
- Sprint goal completion rate
- Issues completed vs planned
- Carryover issues
- Average cycle time
- Team capacity utilization"
```

---

Need help? [Open an issue](https://github.com/ryotsukuda333/claude-backlog-agent/issues)
