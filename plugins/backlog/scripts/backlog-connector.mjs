#!/usr/bin/env node

/**
 * Backlog MCP Connector
 *
 * Dynamic MCP client that connects to backlog-mcp-server on-demand
 * to minimize context consumption in Claude Code.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

class BacklogConnector {
  constructor() {
    this.client = null;
    this.transport = null;
  }

  /**
   * Initialize connection to Backlog MCP server
   */
  async connect() {
    try {
      // Validate environment variables
      if (!process.env.BACKLOG_DOMAIN || !process.env.BACKLOG_API_KEY) {
        throw new Error(
          'Missing required environment variables: BACKLOG_DOMAIN and BACKLOG_API_KEY must be set'
        );
      }

      // Create stdio transport to npx backlog-mcp-server
      this.transport = new StdioClientTransport({
        command: 'npx',
        args: ['backlog-mcp-server'],
        env: {
          ...process.env,
          BACKLOG_DOMAIN: process.env.BACKLOG_DOMAIN,
          BACKLOG_API_KEY: process.env.BACKLOG_API_KEY,
        },
      });

      // Initialize MCP client
      this.client = new Client(
        {
          name: 'claude-backlog-agent',
          version: '1.0.0',
        },
        {
          capabilities: {},
        }
      );

      // Connect to server
      await this.client.connect(this.transport);

      console.error('✅ Connected to Backlog MCP server');
    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      throw error;
    }
  }

  /**
   * List available tools from Backlog MCP server
   */
  async listTools() {
    try {
      const response = await this.client.listTools();
      return response.tools || [];
    } catch (error) {
      console.error('❌ Failed to list tools:', error.message);
      throw error;
    }
  }

  /**
   * Call a specific Backlog tool
   *
   * @param {string} toolName - Name of the tool to call
   * @param {object} args - Tool arguments
   */
  async callTool(toolName, args = {}) {
    try {
      const response = await this.client.callTool({
        name: toolName,
        arguments: args,
      });

      return response;
    } catch (error) {
      console.error(`❌ Tool call failed [${toolName}]:`, error.message);
      throw error;
    }
  }

  /**
   * Disconnect from MCP server
   */
  async disconnect() {
    try {
      if (this.client) {
        await this.client.close();
        console.error('✅ Disconnected from Backlog MCP server');
      }
    } catch (error) {
      console.error('⚠️ Disconnect warning:', error.message);
    }
  }
}

/**
 * Main CLI interface
 */
async function main() {
  const connector = new BacklogConnector();

  try {
    // Parse command line arguments
    const args = process.argv.slice(2);

    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
      console.log(`
Backlog MCP Connector - Dynamic Backlog integration for Claude Code

Usage:
  node backlog-connector.mjs list                     List all available tools
  node backlog-connector.mjs call <tool> <json>      Call a specific tool with JSON arguments

Examples:
  node backlog-connector.mjs list
  node backlog-connector.mjs call backlog_get_issues '{"fields":"{ id issueKey summary }", "projectId":[123]}'

Environment Variables:
  BACKLOG_DOMAIN    Your Backlog space domain (e.g., yourspace.backlog.com)
  BACKLOG_API_KEY   Your Backlog API key
`);
      process.exit(0);
    }

    const command = args[0];

    // Connect to MCP server
    await connector.connect();

    // Handle commands
    if (command === 'list') {
      const tools = await connector.listTools();
      console.log(JSON.stringify(tools, null, 2));
    } else if (command === 'call' && args.length >= 2) {
      const toolName = args[1];
      const toolArgs = args[2] ? JSON.parse(args[2]) : {};

      const result = await connector.callTool(toolName, toolArgs);
      console.log(JSON.stringify(result, null, 2));
    } else {
      throw new Error(`Unknown command: ${command}`);
    }

    // Disconnect
    await connector.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await connector.disconnect();
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default BacklogConnector;
