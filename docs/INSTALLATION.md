# Installation Guide

Complete installation instructions for Claude Backlog Agent.

## Prerequisites

Before installing, ensure you have:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **Claude Code** installed and configured
- **Backlog Account** with API access

## Installation Methods

### Method 1: Marketplace Installation (Recommended)

This is the easiest way to install the plugin.

#### Step 1: Add Marketplace

In Claude Code, run:

```bash
/plugin marketplace add tsukuda/claude-backlog-agent
```

This adds the Claude Backlog Agent marketplace to your available plugin sources.

#### Step 2: Install Plugin

```bash
/plugin install backlog@claude-backlog-agent
```

#### Step 3: Verify Installation

Check that the agent is available:

```bash
/agents
```

You should see `backlog` in the list of available agents.

### Method 2: Manual Installation

For development or customization purposes.

#### Step 1: Clone Repository

```bash
cd ~/projects  # or your preferred directory
git clone https://github.com/tsukuda/claude-backlog-agent.git
cd claude-backlog-agent
```

#### Step 2: Install Dependencies

```bash
cd scripts
npm install
```

#### Step 3: Link to Claude Code

Add to your Claude Code configuration:

```json
{
  "plugins": [
    {
      "source": "~/projects/claude-backlog-agent"
    }
  ]
}
```

#### Step 4: Reload Claude Code

Restart Claude Code or reload the configuration to activate the plugin.

## Post-Installation Setup

### 1. Get Backlog API Key

1. Log in to your Backlog space
2. Click your profile icon → **Settings**
3. Navigate to **API Settings**
4. Click **Register New API Key**
5. Give it a name (e.g., "Claude Code Integration")
6. Copy the generated API key

**Important**: Save this key securely. You won't be able to see it again.

### 2. Configure Environment Variables

#### On macOS/Linux:

Add to `~/.bashrc`, `~/.zshrc`, or `~/.profile`:

```bash
# Backlog Configuration
export BACKLOG_DOMAIN="yourspace.backlog.com"
export BACKLOG_API_KEY="your_api_key_here"
```

Apply changes:

```bash
source ~/.bashrc  # or source ~/.zshrc
```

#### On Windows:

##### PowerShell:
Add to your PowerShell profile:

```powershell
$env:BACKLOG_DOMAIN="yourspace.backlog.com"
$env:BACKLOG_API_KEY="your_api_key_here"
```

##### Command Prompt:
```cmd
setx BACKLOG_DOMAIN "yourspace.backlog.com"
setx BACKLOG_API_KEY "your_api_key_here"
```

Restart your terminal after setting environment variables.

### 3. Verify Configuration

Test that everything is working:

```bash
cd ~/projects/claude-backlog-agent/scripts  # adjust path as needed
node backlog-connector.mjs list
```

You should see a JSON list of available Backlog tools.

## Troubleshooting

### Issue: "Command not found: npx"

**Solution**: Install or update Node.js from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version
npm --version
```

### Issue: "Missing environment variables"

**Solution**: Ensure environment variables are exported correctly.

Check if they're set:
```bash
echo $BACKLOG_DOMAIN
echo $BACKLOG_API_KEY
```

If empty, re-add them to your shell configuration file and restart your terminal.

### Issue: "API authentication failed"

**Solution**:
- Verify your API key is correct
- Check that you have permission to access the Backlog API
- Ensure your API key hasn't been revoked

### Issue: Plugin not showing in Claude Code

**Solution**:
1. Verify the plugin is installed: `/plugin list`
2. Check marketplace is added: `/plugin marketplace list`
3. Try reinstalling: `/plugin uninstall backlog@claude-backlog-agent` then reinstall
4. Restart Claude Code

### Issue: "Cannot find module '@modelcontextprotocol/sdk'"

**Solution**: Install dependencies:
```bash
cd scripts
npm install
```

## Updating

### Marketplace Installation

```bash
# Check for updates
/plugin update backlog@claude-backlog-agent
```

### Manual Installation

```bash
cd ~/projects/claude-backlog-agent
git pull origin main
cd scripts
npm install
```

## Uninstalling

### Marketplace Installation

```bash
/plugin uninstall backlog@claude-backlog-agent
```

### Manual Installation

1. Remove the plugin source from Claude Code configuration
2. Delete the cloned repository:
   ```bash
   rm -rf ~/projects/claude-backlog-agent
   ```

## Next Steps

- [Configuration Guide](CONFIGURATION.md) - Learn about advanced configuration options
- [Usage Guide](USAGE.md) - Start using the agent with examples
- [Workflow Examples](../examples/workflows.md) - Common use cases and patterns

---

Need help? [Open an issue](https://github.com/tsukuda/claude-backlog-agent/issues)
