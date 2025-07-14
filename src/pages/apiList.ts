const API_LIST = {
  // Auth APIs
  LOGIN: "https://botify.exyconn.com/auth/signin",
  SIGNUP: "https://botify.exyconn.com/auth/signup",
  FORGOT_PASSWORD: "https://botify.exyconn.com/auth/forgot-password",
  RESET_PASSWORD: "https://botify.exyconn.com/auth/reset-password",
  UPDATE_PROFILE: "https://botify.exyconn.com/auth/update-profile",
  UPDATE_PASSWORD: "https://botify.exyconn.com/auth/update-password",
  SEND_VERIFICATION_OTP: "https://botify.exyconn.com/auth/send-verification-otp",
  VERIFY_USER_OTP: "https://botify.exyconn.com/auth/verify-otp",
  GOOGLE_SIGNIN: "https://botify.exyconn.com/auth/signin-google",
  GOOGLE_SIGNUP: "https://botify.exyconn.com/auth/signup-google",

  // Bot APIs
  GET_BOTS: "https://botify.exyconn.com/bot/bots",
  GET_CHILD_BOTS: "https://botify.exyconn.com/bot/child-bots",
  CREATE_CHILD_BOT: "https://botify.exyconn.com/bot/child-bots",
  UPDATE_CHILD_BOT: (botId: string) => `https://botify.exyconn.com/bot/child-bots/${botId}`,
  DELETE_CHILD_BOT: (botId: string) => `https://botify.exyconn.com/bot/child-bots/${botId}`,

  // Chat Settings APIs
  GET_CHAT_SETTING: (chatBotId: string) => `https://botify.exyconn.com/bot/chat-setting/${chatBotId}`,
  UPDATE_CHAT_SETTING: (chatBotId: string) => `https://botify.exyconn.com/bot/chat-setting/${chatBotId}`,

  // Prompt APIs
  GET_PROMPT: (chatBotId: string) => `https://botify.exyconn.com/bot/prompt/${chatBotId}`,
  UPDATE_PROMPT: (chatBotId: string) => `https://botify.exyconn.com/bot/prompt/${chatBotId}`,

  // Integrations (example, add more as needed)
  GET_INTEGRATIONS: "https://botify.exyconn.com/integrations",

  // Add more APIs as you add features...
};

export default API_LIST;
