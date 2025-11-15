import { ChatCompletionTool } from "openai/resources/chat/completions";


export interface BaseTool {
    getTools(): ChatCompletionTool[];

    executeTools(functionName: string, args: any): Promise<string>;

    // verificar si la tool puede manejar una función específica
    canHandle(functionName: string): boolean;
}
