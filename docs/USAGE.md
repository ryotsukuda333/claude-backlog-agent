# Usage Guide

Learn how to use Claude Backlog Agent effectively.

## Basic Usage

### Natural Language Commands

The simplest way to use the agent is through natural language in Claude Code:

```
"Create a new issue in PROJECT-1 to fix the login bug with high priority"

"Show me all open issues assigned to me in the mobile app project"

"Add a comment to PROJ-123 saying the bug is fixed in commit abc123"
```

Claude will automatically invoke the Backlog agent and execute the appropriate operations.

### Direct Agent Invocation

You can also explicitly call the agent:

```
"Use the backlog agent to list all projects I have access to"

"Ask the backlog agent to get details for issue PROJ-456"
```

## Common Operations

### Issue Management

#### Create an Issue

```
"Create an issue in project ID 12345:
- Summary: Fix authentication timeout
- Type: Bug
- Priority: High
- Description: Users are experiencing timeout errors during login"
```

#### Search Issues

```
"Find all open bugs in project 12345 assigned to user ID 67890"

"Show me issues created in the last 7 days with high priority"

"List all issues with status 'In Progress' in PROJECT-KEY"
```

#### Update an Issue

```
"Update issue PROJ-123:
- Change status to 'Resolved'
- Add comment: Fixed by implementing retry logic"

"Change the priority of PROJ-456 to 'High' and assign to user 789"
```

#### Add Comments

```
"Add a comment to issue PROJ-123:
'Fixed in PR #45. Waiting for code review.'"

"Comment on PROJ-456 with the deployment schedule"
```

### Project Operations

#### List Projects

```
"List all projects I can access"

"Show me archived projects"
```

#### Get Project Details

```
"Get detailed information about project with ID 12345"

"Show me the categories and issue types for PROJECT-KEY"
```

#### Get Project Metadata

```
"What are the available issue types in project 12345?"

"List all categories in PROJECT-KEY"

"Show me the custom fields for project 12345"
```

### Wiki Operations

#### List Wiki Pages

```
"List all wiki pages in project 12345"

"Find wiki pages containing 'architecture' in project ID 12345"
```

#### Get Wiki Page

```
"Show me the content of wiki page with ID 98765"
```

#### Create Wiki Page

```
"Create a wiki page in project 12345:
- Title: API Documentation
- Content: [your markdown content here]"
```

### User & Space Information

#### Get Current User

```
"Show me my Backlog user information"

"What's my user ID and email in Backlog?"
```

#### List Users

```
"List all users in the Backlog space"

"Show me users with admin role"
```

#### Get Space Info

```
"Show me information about our Backlog space"
```

### Notifications

#### List Notifications

```
"Show me my recent Backlog notifications"

"List unread notifications"
```

#### Count Notifications

```
"How many unread notifications do I have?"
```

## Advanced Usage

### Using Field Selection

When you need specific fields, you can request them explicitly:

```
"Get issues from project 12345, but only show ID, issue key, summary, and status"
```

The agent will translate this to the appropriate GraphQL field selection.

### Filtering and Searching

#### By Status

```
"Find all issues with status 'Open' or 'In Progress' in project 12345"
```

#### By Assignee

```
"Show me issues assigned to user ID 67890"

"List unassigned issues in project 12345"
```

#### By Date Range

```
"Find issues created between 2025-01-01 and 2025-01-31"

"Show issues updated in the last 3 days"
```

#### By Keyword

```
"Search for issues containing 'authentication' in project 12345"
```

#### Combined Filters

```
"Find high-priority bugs assigned to me that were created this week"
```

### Batch Operations

#### Create Multiple Issues

```
"Create 3 issues in project 12345:
1. Fix login timeout - Bug - High priority
2. Update user documentation - Task - Medium priority
3. Optimize database queries - Improvement - Low priority"
```

#### Update Multiple Issues

```
"Change the status of issues PROJ-123, PROJ-124, and PROJ-125 to 'Resolved'"
```

## Direct Script Usage

For automation or scripting purposes, you can use the connector directly:

### List Available Tools

```bash
cd scripts
node backlog-connector.mjs list
```

Output: JSON array of all available Backlog tools with their parameters.

### Call a Specific Tool

```bash
node backlog-connector.mjs call <tool_name> '<json_arguments>'
```

### Examples

#### Get Project List

```bash
node backlog-connector.mjs call backlog_get_project_list '{
  "fields": "{ id projectKey name archived }"
}'
```

#### Create Issue

```bash
node backlog-connector.mjs call backlog_add_issue '{
  "fields": "{ id issueKey summary }",
  "projectId": 12345,
  "summary": "Fix authentication bug",
  "issueTypeId": 1,
  "priorityId": 3,
  "description": "Users experiencing timeout during login"
}'
```

#### Search Issues

```bash
node backlog-connector.mjs call backlog_get_issues '{
  "fields": "{ id issueKey summary status priority assignee }",
  "projectId": [12345],
  "statusId": [1, 2, 3],
  "count": 20
}'
```

#### Add Comment

```bash
node backlog-connector.mjs call backlog_add_issue_comment '{
  "fields": "{ id content created }",
  "issueKey": "PROJ-123",
  "content": "Fixed in commit abc123"
}'
```

## GraphQL Field Selection

Backlog MCP uses GraphQL-style field selection. Here are common patterns:

### Issue Fields

```graphql
{
  id
  issueKey
  summary
  description
  status
  priority
  assignee
  category
  versions
  milestone
  startDate
  dueDate
  estimatedHours
  actualHours
  created
  updated
  createdUser
  updatedUser
}
```

### Project Fields

```graphql
{
  id
  projectKey
  name
  chartEnabled
  subtaskingEnabled
  useWiki
  useGit
  archived
  textFormattingRule
}
```

### User Fields

```graphql
{
  id
  userId
  name
  mailAddress
  roleType
  lang
  lastLoginTime
}
```

## Tips and Best Practices

### 1. Be Specific

❌ "Show me issues"
✅ "Show me open issues in project 12345 assigned to me"

### 2. Use Project IDs When Possible

Project IDs are faster than project keys. Get them once and reuse:

```
"What's the project ID for PROJECT-KEY?"
```

Then use the ID in subsequent requests.

### 3. Limit Results

For large projects, limit the number of results:

```
"Show me the 10 most recent issues in project 12345"
```

### 4. Specify Required Fields

Request only the fields you need for better performance:

```
"Get issues from project 12345, showing only issue key, summary, and status"
```

### 5. Use Issue Keys for Updates

Issue keys (e.g., PROJ-123) are more readable than IDs:

```
"Update PROJ-123 to status 'Resolved'"
```

### 6. Batch Similar Operations

When possible, batch related operations:

```
"For project 12345:
1. Get project details
2. List issue types
3. List categories
4. Get the 10 most recent issues"
```

## Error Handling

The agent provides helpful error messages:

### Missing Configuration

```
❌ Error: Missing required environment variables:
BACKLOG_DOMAIN and BACKLOG_API_KEY must be set
```

**Solution**: Set environment variables (see [Configuration Guide](CONFIGURATION.md))

### Authentication Failed

```
❌ API authentication failed
```

**Solution**: Verify your API key is correct and not expired

### Invalid Project ID

```
❌ Project not found: 99999
```

**Solution**: Verify the project ID or use project key instead

### Permission Denied

```
❌ You don't have permission to access this resource
```

**Solution**: Check your Backlog permissions for the project

## Integration with Workflows

### Code Review Workflow

```
1. "Create a code review checklist in PROJ-123"
2. "Add comment to PROJ-123: Code review completed, approved"
3. "Update PROJ-123 status to 'Ready for Deploy'"
```

### Bug Tracking Workflow

```
1. "Create a bug report in project 12345: Login timeout error"
2. "Assign PROJ-[new-issue] to developer user ID 789"
3. "Set priority to High and due date to 2025-01-31"
```

### Sprint Planning Workflow

```
1. "List all open issues in project 12345"
2. "Show issues with no milestone in project 12345"
3. "Create milestone 'Sprint 5' for project 12345"
4. "Assign issues PROJ-10, PROJ-11, PROJ-12 to Sprint 5"
```

## Next Steps

- [Workflow Examples](../examples/workflows.md) - Complete workflow examples
- [Configuration Guide](CONFIGURATION.md) - Advanced configuration options
- [Troubleshooting](../README.md#troubleshooting) - Common issues and solutions

---

Need help? [Open an issue](https://github.com/ryotsukuda333/claude-backlog-agent/issues)
