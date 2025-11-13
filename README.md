# Claude Backlog Agent

🚀 **Zero-context Backlog integration for Claude Code**

A dynamic MCP agent that provides full Backlog functionality without consuming context tokens until actively used.

## ✨ Features

- **🎯 Zero Context Consumption**: Agent only loads when you need it, keeping your Claude Code context clean
- **📊 Full Backlog API**: Access all Backlog features (issues, projects, wiki, git, notifications)
- **💬 Natural Language**: Control Backlog with conversational commands through Claude
- **🔄 Auto-Updates**: Always uses the latest `backlog-mcp-server` without manual updates
- **🛡️ Secure**: API keys stored in environment variables, never in code

## 📦 Installation

### Option 1: From Marketplace (Recommended)

```bash
# Add marketplace
/plugin marketplace add ryotsukuda333/claude-backlog-agent

# Install plugin
/plugin install backlog@claude-backlog-agent
```

### Option 2: Manual Installation

```bash
# Clone repository
git clone https://github.com/ryotsukuda333/claude-backlog-agent.git
cd claude-backlog-agent/scripts

# Install dependencies
npm install
```

## ⚙️ Configuration

### 1. Get Backlog API Key

1. Log in to your Backlog space
2. Go to **Settings** → **API Settings** → **Register New API Key**
3. Copy your API key

### 2. Configure in Claude Code Settings

Add your credentials to `~/.claude/settings.json`:

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

**Note**: Replace `yourspace.backlog.com` with your actual Backlog domain (use `.backlog.jp` if applicable).

### 3. Restart Claude Code

After updating `settings.json`, restart Claude Code to apply the configuration.

## 🎯 Usage

### Through Claude Code

Simply ask Claude to interact with Backlog using natural language:

```
"Create a new issue in PROJECT-1: Fix login bug with high priority"

"Show me all open issues assigned to me"

"Add a comment to PROJ-123: Fixed in commit abc123"

"Get details for issue PROJ-456"

"List all projects I have access to"
```

The agent handles all API calls automatically through natural language - no need to use scripts directly!

## 📚 Available Operations

### Issue Management
- Create, update, and search issues
- Add comments to issues
- Count issues with filters
- Get issue details

### Project Operations
- List projects
- Get project details
- Manage categories and issue types
- Access custom fields

### Wiki Operations
- List wiki pages
- Get page content
- Create new pages

### User & Space
- Get space information
- List users
- Get current user details

### Notifications
- List notifications
- Count notifications
- Mark as read

See [docs/USAGE.md](docs/USAGE.md) for detailed examples.

## 🏗️ Architecture

```
┌─────────────────┐
│  Claude Code    │
│   (User Input)  │
└────────┬────────┘
         │ Natural Language
         ▼
┌─────────────────┐
│ Backlog Agent   │  ← Zero context (just definition)
│ (agents/backlog)│
└────────┬────────┘
         │ Execute Script
         ▼
┌─────────────────┐
│ backlog-        │  ← Dynamic execution
│ connector.mjs   │
└────────┬────────┘
         │ MCP Protocol (stdio)
         ▼
┌─────────────────┐
│ backlog-mcp-    │  ← Official Backlog MCP Server
│ server (npx)    │
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────┐
│  Backlog API    │
└─────────────────┘
```

## 📖 Documentation

- [Installation Guide](docs/INSTALLATION.md)
- [Configuration Guide](docs/CONFIGURATION.md)
- [Usage Examples](docs/USAGE.md)
- [Workflow Examples](examples/workflows.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Credits

- Built on [backlog-mcp-server](https://github.com/nulab/backlog-mcp-server) by Nulab
- Uses [Model Context Protocol](https://modelcontextprotocol.io) SDK
- Inspired by the Claude Code plugin ecosystem

## 🔗 Links

- [Backlog Official](https://backlog.com/)
- [Backlog API Documentation](https://developer.nulab.com/docs/backlog/)
- [Claude Code Documentation](https://code.claude.com/)
- [MCP Documentation](https://modelcontextprotocol.io/)

## ⚠️ Requirements

- Node.js >= 18.0.0
- Claude Code
- Backlog account with API access

## 🐛 Troubleshooting

### "Missing environment variables" error
1. Check that `~/.claude/settings.json` has the `env` section with your credentials
2. Restart Claude Code after updating settings
3. Verify the credentials are correct (check for typos)

### "Authentication failure" error
- Verify your Backlog API key is valid and not expired
- Regenerate API key from Backlog settings if needed
- Ensure your Backlog domain is correct (`yourspace.backlog.com` or `yourspace.backlog.jp`)

### "Command not found: npx"
Install Node.js from [nodejs.org](https://nodejs.org/)

### "Connection failed"
- Check your internet connection
- Verify the Backlog domain format (with or without `https://`)
- Ensure you have access to the Backlog space

For more help, see [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) or open an issue.

---

Made with ❤️ for the Claude Code and Backlog communities
