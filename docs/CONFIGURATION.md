# Configuration Guide

Advanced configuration options for Claude Backlog Agent.

## Environment Variables

### Required Variables

#### BACKLOG_DOMAIN
Your Backlog space domain.

**Format**: `yourspace.backlog.com` or `yourspace.backlog.jp`

**Examples**:
```bash
export BACKLOG_DOMAIN="mycompany.backlog.com"
export BACKLOG_DOMAIN="team.backlog.jp"
```

**How to find**:
- Look at your Backlog URL: `https://[yourspace].backlog.com`
- Use the part inside brackets plus `.backlog.com`

#### BACKLOG_API_KEY
Your personal Backlog API key.

**How to get**:
1. Log in to Backlog
2. Profile → Settings → API Settings
3. Register New API Key
4. Copy the generated key

**Example**:
```bash
export BACKLOG_API_KEY="abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
```

**Security Notes**:
- Never commit API keys to version control
- Use `.env` files for local development (already gitignored)
- Rotate keys periodically for security
- Each team member should use their own key

### Optional Variables

#### NODE_OPTIONS
Configure Node.js memory limits if needed for large operations.

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
```

## Configuration Files

### Local Development: .env File

For local testing, create `scripts/.env`:

```bash
cd scripts
cp .env.example .env
# Edit .env with your credentials
```

**scripts/.env**:
```bash
BACKLOG_DOMAIN=yourspace.backlog.com
BACKLOG_API_KEY=your_api_key_here
```

**Important**: The `.env` file is gitignored and will not be committed.

### Shell Configuration

For persistent configuration across sessions, add to your shell config:

#### Bash (~/.bashrc)
```bash
# Backlog Configuration
export BACKLOG_DOMAIN="yourspace.backlog.com"
export BACKLOG_API_KEY="your_api_key_here"
```

#### Zsh (~/.zshrc)
```bash
# Backlog Configuration
export BACKLOG_DOMAIN="yourspace.backlog.com"
export BACKLOG_API_KEY="your_api_key_here"
```

#### Fish (~/.config/fish/config.fish)
```fish
# Backlog Configuration
set -gx BACKLOG_DOMAIN "yourspace.backlog.com"
set -gx BACKLOG_API_KEY "your_api_key_here"
```

Apply changes:
```bash
source ~/.bashrc  # or source ~/.zshrc, or restart terminal
```

## Claude Code Configuration

### Plugin Configuration

Claude Code automatically loads the plugin from the marketplace. For advanced configuration, you can override settings in your Claude Code config.

### Agent Preferences

You can configure how Claude interacts with the Backlog agent:

```json
{
  "agentPreferences": {
    "backlog": {
      "autoConfirm": false,
      "verboseLogging": true
    }
  }
}
```

## Backlog MCP Server Options

The Backlog agent uses `backlog-mcp-server` under the hood. You can pass options via environment variables:

### Enable Specific Toolsets

```bash
export BACKLOG_TOOLSETS="space,project,issue"
```

Available toolsets:
- `space` - Space and user operations
- `project` - Project management
- `issue` - Issue operations
- `wiki` - Wiki management
- `git` - Git repository operations
- `notifications` - Notification management
- `document` - Document operations

### Optimize Response Size

```bash
export BACKLOG_OPTIMIZE_RESPONSE="true"
```

Reduces response size for better performance.

### Custom Tool Prefix

```bash
export BACKLOG_PREFIX="my_backlog_"
```

Adds a custom prefix to all tool names (e.g., `my_backlog_get_issues`).

## Workspace-Specific Configuration

### Multiple Backlog Spaces

If you work with multiple Backlog spaces, use different profiles:

**~/.bashrc**:
```bash
# Function to switch Backlog profiles
backlog_profile() {
  case "$1" in
    work)
      export BACKLOG_DOMAIN="mycompany.backlog.com"
      export BACKLOG_API_KEY="work_api_key"
      ;;
    personal)
      export BACKLOG_DOMAIN="personal.backlog.jp"
      export BACKLOG_API_KEY="personal_api_key"
      ;;
    *)
      echo "Usage: backlog_profile [work|personal]"
      ;;
  esac
}
```

Usage:
```bash
backlog_profile work     # Switch to work profile
backlog_profile personal # Switch to personal profile
```

### Project-Specific Configuration

Use `.env` files in project directories:

**project-a/.env**:
```bash
BACKLOG_DOMAIN=projecta.backlog.com
BACKLOG_API_KEY=projecta_api_key
```

Load before running:
```bash
cd project-a
export $(cat .env | xargs)
# Now use Claude Code with project-a Backlog
```

## Security Best Practices

### API Key Management

1. **Never commit API keys**:
   - Use `.gitignore` for `.env` files
   - Use environment variables for production
   - Use secret management services (AWS Secrets Manager, etc.)

2. **Rotate keys regularly**:
   - Change API keys every 90 days
   - Revoke unused keys immediately
   - Monitor API key usage in Backlog

3. **Limit key permissions**:
   - Use read-only keys when possible
   - Create separate keys for different purposes
   - Revoke keys when team members leave

### Access Control

Configure Backlog permissions appropriately:
- Limit API access to necessary projects
- Use role-based access control
- Monitor API usage logs

## Performance Tuning

### Connection Timeout

```bash
export BACKLOG_TIMEOUT="30000"  # 30 seconds
```

### Retry Configuration

```bash
export BACKLOG_MAX_RETRIES="3"
export BACKLOG_RETRY_DELAY="1000"  # milliseconds
```

### Rate Limiting

Backlog API has rate limits. The agent handles this automatically, but you can configure:

```bash
export BACKLOG_RATE_LIMIT="60"  # requests per minute
```

## Debugging

### Enable Verbose Logging

```bash
export DEBUG="backlog:*"
export NODE_ENV="development"
```

### Test Configuration

Verify your configuration:

```bash
cd scripts
node backlog-connector.mjs list
```

Expected output: JSON list of available tools

### Common Issues

**Issue**: Empty tool list
- Check environment variables are set
- Verify API key has proper permissions

**Issue**: Connection timeout
- Increase `BACKLOG_TIMEOUT`
- Check internet connection
- Verify Backlog service status

**Issue**: Authentication error
- Verify API key is correct and not expired
- Check Backlog domain is correct
- Ensure API access is enabled for your account

## Configuration Validation

Create a validation script:

**scripts/validate-config.sh**:
```bash
#!/bin/bash

echo "Validating Backlog configuration..."

if [ -z "$BACKLOG_DOMAIN" ]; then
  echo "❌ BACKLOG_DOMAIN is not set"
  exit 1
fi

if [ -z "$BACKLOG_API_KEY" ]; then
  echo "❌ BACKLOG_API_KEY is not set"
  exit 1
fi

echo "✅ Environment variables are set"

# Test connection
node backlog-connector.mjs list > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "✅ Connection to Backlog MCP server successful"
else
  echo "❌ Connection failed - check your credentials"
  exit 1
fi
```

Run validation:
```bash
chmod +x scripts/validate-config.sh
./scripts/validate-config.sh
```

## Next Steps

- [Usage Guide](USAGE.md) - Learn how to use the agent
- [Workflow Examples](../examples/workflows.md) - Common patterns and use cases

---

Need help? [Open an issue](https://github.com/tsukuda/claude-backlog-agent/issues)
