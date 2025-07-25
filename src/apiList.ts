import { ENV } from "./utils/config";

const API_BASE =
  ENV === "production"
    ? "https://botify.exyconn.com"
    : "http://localhost:4001";

const API_LIST = {
  // Auth APIs
  LOGIN: `${API_BASE}/auth/signin`,
  SIGNUP: `${API_BASE}/auth/signup`,
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  UPDATE_PROFILE: `${API_BASE}/auth/update-profile`,
  UPDATE_PASSWORD: `${API_BASE}/auth/update-password`,
  SEND_VERIFICATION_OTP: `${API_BASE}/auth/send-verification-otp`,
  VERIFY_USER_OTP: `${API_BASE}/auth/verify-otp`,
  GOOGLE_SIGNIN: `${API_BASE}/auth/signin-google`,
  GOOGLE_SIGNUP: `${API_BASE}/auth/signup-google`,

  // Bot APIs
  GET_BOTS: `${API_BASE}/bot/bots`,
  GET_CHILD_BOTS: `${API_BASE}/bot/child-bots`,
  CREATE_CHILD_BOT: `${API_BASE}/bot/child-bots`,
  UPDATE_CHILD_BOT: (botId: string) => `${API_BASE}/bot/child-bots/${botId}`,
  DELETE_CHILD_BOT: (botId: string) => `${API_BASE}/bot/child-bots/${botId}`,

  // Chat Settings APIs
  GET_CHAT_SETTING: (chatBotId: string) => `${API_BASE}/bot/chat-setting/${chatBotId}`,
  UPDATE_CHAT_SETTING: (chatBotId: string) => `${API_BASE}/bot/chat-setting/${chatBotId}`,

  // Prompt APIs
  GET_PROMPT: (chatBotId: string) => `${API_BASE}/bot/prompt/${chatBotId}`,
  UPDATE_PROMPT: (chatBotId: string) => `${API_BASE}/bot/prompt/${chatBotId}`,

  // Manage Credentials APIs
  CREATE_CREDENTIAL: `${API_BASE}/v1/api/manage-credentials`,
  GET_CREDENTIALS: `${API_BASE}/v1/api/manage-credentials`,
  GET_CREDENTIAL_BY_ID: (id: string | number) => `${API_BASE}/v1/api/manage-credentials/${id}`,
  UPDATE_CREDENTIAL: (id: string | number) => `${API_BASE}/v1/api/manage-credentials/${id}`,
  DELETE_CREDENTIAL: (id: string | number) => `${API_BASE}/v1/api/manage-credentials/${id}`,

  // Subscription Usage APIs
  GET_SUBSCRIPTION_USAGE: (userId: string, startDate: string, endDate: string) =>
    `${API_BASE}/v1/api/subscription-usage/user/${userId}/date-range?startDate=${startDate}&endDate=${endDate}`,

  // Design System APIs
  DESIGN_SYSTEM_BASE: `${API_BASE}/design-system`,

  // Docker Management APIs
  DOCKER_CONTAINERS: `${API_BASE}/v1/api/code-run/docker/containers`,
  DOCKER_CONTAINER: (containerId: string) => `${API_BASE}/v1/api/code-run/docker/container/${containerId}`,
  DOCKER_CONTAINER_START: (containerId: string) => `${API_BASE}/v1/api/code-run/docker/container/${containerId}/start`,
  DOCKER_CONTAINER_STOP: (containerId: string) => `${API_BASE}/v1/api/code-run/docker/container/${containerId}/stop`,
  DOCKER_CONTAINER_RESTART: (containerId: string) => `${API_BASE}/v1/api/code-run/docker/container/${containerId}/restart`,
  DOCKER_CONTAINER_DELETE: (containerId: string) => `${API_BASE}/v1/api/code-run/docker/container/${containerId}`,
  DOCKER_CONTAINER_RENAME: (containerId: string) => `${API_BASE}/v1/api/code-run/docker/container/${containerId}/rename`,
  DOCKER_NETWORK_CREATE: `${API_BASE}/v1/api/code-run/docker/network/create`,
  DOCKER_CONTAINER_CREATE: `${API_BASE}/v1/api/code-run/docker/container/create`,
  DOCKER_CONTAINER_TERMINAL: (containerId: string) => `${API_BASE}/v1/api/code-run/docker/container/${containerId}/terminal`,
  DOCKER_CONTAINER_EXEC: (containerId: string) => `${API_BASE}/v1/api/code-run/docker/container/${containerId}/exec`,
  DOCKER_INFO: `${API_BASE}/v1/api/code-run/docker-info`,

  // Bot APIs
  BOT_BASE: `${API_BASE}/bot`,
  BOT_CREATE_CHILD: `${API_BASE}/bot/create/child-bot`,
  BOT_UPDATE_CHILD: (botId: string) => `${API_BASE}/bot/update/child-bot/${botId}`,
  BOT_DELETE_CHILD: (botId: string) => `${API_BASE}/bot/delete/child-bot/${botId}`,

  // MCP Server APIs
  MCP_SERVER_LIST: `${API_BASE}/v1/api/mcp-server/list`,
  MCP_SERVER_GET: (mcpServerId: string) => `${API_BASE}/v1/api/mcp-server/get/${mcpServerId}`,
  MCP_SERVER_UPDATE: (mcpServerId: string) => `${API_BASE}/v1/api/mcp-server/update/${mcpServerId}`,
  MCP_SERVER_DELETE: (mcpServerId: string) => `${API_BASE}/v1/api/mcp-server/delete/${mcpServerId}`,
  MCP_SERVER_TOOL_LIST: (mcpServerId: string) => `${API_BASE}/v1/api/mcp-server/tool/list/${mcpServerId}`,
  MCP_SERVER_TOOL_GET: (toolId: string) => `${API_BASE}/v1/api/mcp-server/tool/get/${toolId}`,
  MCP_SERVER_TOOL_UPDATE: (toolId: string) => `${API_BASE}/v1/api/mcp-server/tool/update/${toolId}`,
  MCP_SERVER_TOOL_CREATE: `${API_BASE}/v1/api/mcp-server/tool/create`,
  MCP_SERVER_TOOL_DELETE: (toolId: string) => `${API_BASE}/v1/api/mcp-server/tool/delete/${toolId}`,
  MCP_SERVER_TOOL_CODE_BASE: `${API_BASE}/v1/api/mcp-server/tool-code`,
  MCP_SERVER_TOOL_BASE: `${API_BASE}/v1/api/mcp-server/tool`,

  // Organization APIs
  ORGANIZATION_BASE: `${API_BASE}/v1/api/organization`,

  // ImageKit APIs
  IMAGEKIT_UPLOAD: `${API_BASE}/v1/api/imagekit/upload`,

  // ChatGPT Prompt APIs
  CHAT_GPT_PROMPT: `${API_BASE}/chat-gpt/prompt`,

  CHAT_GPT_3RD_PARTY_BASE: `https://api.openai.com/v1/chat/completions`,
};

export default API_LIST;
