import API_LIST from "../apiList";

export const ENV = import.meta.env.VITE_ENV || "development";

// This will be updated on window load
export let OPENAI_API_KEY: string | undefined = import.meta.env.VITE_CHAT_GPT_KEY || localStorage.getItem("OPENAI_API_KEY");

window.onload = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_LIST.GET_CREDENTIALS, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    if (res.ok && Array.isArray(response.data)) {
      const chatGptCred = response.data.find((cred: any) => cred.name === "OPENAI_API_KEY");
      console.log(response.data);
      if (chatGptCred) {
        localStorage.setItem("OPENAI_API_KEY", chatGptCred.value);
      }
    }
  } catch {
    // Optionally handle errors here
  }
};
