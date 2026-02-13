import { inngest } from "./client";
import { createAgent, openai } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    rateLimit: {
      limit: 10,
      period: "1m",
    },
  },
  { event: "agent/hello" },

  async ({ step }) => {
    const sandboxId = await step.run("generate-sandbox-id", async () => {
      const sandbox = await Sandbox.create("devbibek25/autopilot-dev", {
        apiKey: process.env.E2B_API_KEY,
      });
      return sandbox.sandboxId;
    });

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

    const sandboxUrl = await step.run("generate-sandbox-url", async () => {
      const sandbox = await Sandbox.connect(sandboxId, {
        apiKey: process.env.E2B_API_KEY,
      });
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });

    return {
      message: output,
      sandboxUrl,
    };
  },
);
