import { OpenAI } from "openai";
import { EnvConfig } from "./EnvCondig";
import { ChatCompletionMessageParam } from "openai/resources.js";

export class OpenAIConfig {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            baseURL: EnvConfig.OPENAI_API_URL,
            apiKey: EnvConfig.OPENAI_API_KEY,
        });
    }

    async chat(
        messages: ChatCompletionMessageParam[],
        tools?: OpenAI.Chat.Completions.ChatCompletionTool[]
    ) {
        const response = await this.openai.chat.completions.create({
            model: EnvConfig.OPENAI_MODEL,
            messages,
            tools: tools || undefined,
            tool_choice: tools ? "auto" : undefined,
        });

        return response;
    }
}