import { inngest } from "./client";
import { createAgent, openai } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    rateLimit: {
      limit: 10,
      period: "1m",
    },
  },
  { event: "agent/hello" },

  async () => {
    const helloAgent = createAgent({
      name: "hello-agent",
      description: "A simple agent that says hello",
      system: "You are a helpful assistant. Always greet with enthusiasm.",
      model: openai({
        model: "openai/gpt-4o-mini",
        apiKey: process.env.OPENROUTER_API_KEY,
        baseUrl: process.env.OPENROUTER_BASE_URL,
      }),
    });

    const { output } = await helloAgent.run("Say hello to Bibek 👋");

    return {
      message: output,
    };
  },

  // async ({ event, step }) => {
  //   const helloAgent = createAgent({
  //     name: "hello-agent",
  //     description: "A simple agent that say hello",
  //     system: "You are a helpful assistant. Alway greet with enthusiasm",
  //     model: gemini({ model: "gemini-2.0-flash" }),
  //   });

  //   const { output } = await helloAgent.run("Say Hello to user!");

  //   return {
  //     message: output[0].content,
  //   };
  // },
);
