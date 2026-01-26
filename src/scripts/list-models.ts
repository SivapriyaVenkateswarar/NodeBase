// scripts/list-gemini-models.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const models = await genAI.listModels();

  console.log(
    models.models.map((m) => ({
      name: m.name,
      supportedMethods: m.supportedGenerationMethods,
    }))
  );
}

main().catch(console.error);
