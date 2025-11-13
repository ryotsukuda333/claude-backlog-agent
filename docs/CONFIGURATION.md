# Configuration Guide

Configuration options for Claude Backlog Agent plugin.

## Basic Configuration

### Required Settings

Add your Backlog credentials to `~/.claude/settings.json`:

```json
{
  "enabledPlugins": {
    "backlog@claude-backlog-agent": true
  },
  "env": {
    "BACKLOG_DOMAIN": "yourspace.backlog.com",
    "BACKLOG_API_KEY": "your_api_key_here"
  }
}
```

### Configuration Parameters

#### BACKLOG_DOMAIN
Your Backlog space domain.

**Format**: `yourspace.backlog.com` or `yourspace.backlog.jp` (without `https://`)

**How to find**:
- Look at your Backlog URL: `https://[yourspace].backlog.com`
- Use the part `[yourspace].backlog.com`

**Examples**:
```json
"BACKLOG_DOMAIN": "mycompany.backlog.com"
"BACKLOG_DOMAIN": "team.backlog.jp"
```

#### BACKLOG_API_KEY
Your personal Backlog API key.

**How to get**:
1. Log in to Backlog
2. Profile → Settings → API Settings
3. Click "Register New API Key"
4. Give it a name (e.g., "Claude Code Integration")
5. Copy the generated key

**Example**:
```json
"BACKLOG_API_KEY": "abc123def456ghi789jkl012mno345pqr"
```

## Security Best Practices

### API Key Management

1. **Never commit API keys to version control**
   - Settings.json should not be committed if it contains credentials
   - Consider using `.claude/settings.local.json` for sensitive data

2. **Rotate keys regularly**
   - Change API keys every 90 days
   - Revoke unused keys immediately
   - Monitor API key usage in Backlog settings

3. **Limit key permissions**
   - Use read-only keys when possible
   - Create separate keys for different purposes
   - Revoke keys when team members leave

### Access Control

Configure appropriate Backlog permissions:
- Limit API access to necessary projects
- Use role-based access control
- Monitor API usage logs in Backlog

## Multiple Backlog Spaces

If you work with multiple Backlog spaces, you can:

### Option 1: Switch in Settings

Update `settings.json` when switching spaces and restart Claude Code:

```json
{
  "env": {
    "BACKLOG_DOMAIN": "work-space.backlog.com",
    "BACKLOG_API_KEY": "work_api_key"
  }
}
```

### Option 2: Project-Specific Settings

Use `.claude/settings.local.json` in each project directory:

**project-a/.claude/settings.local.json**:
```json
{
  "env": {
    "BACKLOG_DOMAIN": "projecta.backlog.com",
    "BACKLOG_API_KEY": "projecta_api_key"
  }
}
```

Claude Code will merge project settings with global settings automatically.

## Verification

### Test Configuration

After configuring and restarting Claude Code, test by asking:

```
"Show me my Backlog user information"
```

or

```
"List all Backlog projects I have access to"
```

If configured correctly, Claude will retrieve your Backlog data.

### Common Issues

**Issue**: "Missing environment variables" error

**Solution**:
1. Verify `env` section exists in `~/.claude/settings.json`
2. Check for typos in domain and API key
3. Restart Claude Code after updating settings

**Issue**: "Authentication failure" error

**Solution**:
- Verify API key is correct and not expired
- Check domain format (no `https://`, just `space.backlog.com`)
- Ensure API access is enabled for your account
- Try regenerating the API key in Backlog settings

**Issue**: "Not Found Space" error

**Solution**:
- Verify the space name is correct
- Check if using `.com` or `.jp` domain
- Ensure you have access to the Backlog space

## Performance Considerations

The Claude Backlog Agent is designed for zero-context consumption:
- Agent definition is lightweight (only loads when needed)
- All API calls are made dynamically
- No persistent connections or caching

For optimal performance:
- Keep API keys valid and don't let them expire
- Use specific queries rather than broad searches
- Backlog API rate limits apply (handled automatically)

## Next Steps

- [Usage Guide](USAGE.md) - Learn how to use the agent
- [Workflow Examples](../examples/workflows.md) - Common use cases and patterns
- [Troubleshooting](TROUBLESHOOTING.md) - Solutions to common problems

---

Need help? [Open an issue](https://github.com/ryotsukuda333/claude-backlog-agent/issues)
