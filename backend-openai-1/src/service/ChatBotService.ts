import { ChatCompletionMessageParam } from "openai/resources.js";
import { DevTreeService } from "./DevTreeService";
import { PostService } from "./PostService";
import { OpenAIConfig } from "../config/OpenAiConfig";
import { DevTreeTool } from "../tool/DevTreeTools";
import { PostTools } from "../tool/PostTools";
import { BaseTool } from "../tool/common/BaseTool";

export class ChatBotService {
    private tools: BaseTool[] = [];

    constructor(
        private readonly postService: PostService,
        private readonly devTreeService: DevTreeService,
    ) {
        this.registerTools();
    }


    private registerTools(): void {
        this.tools = [
            new DevTreeTool(this.devTreeService),
            new PostTools(this.postService),
            // new UserTools(this.userService),
        ];
    }

    private getAllToolDefinitions() {
        return this.tools.flatMap(tool => tool.getTools());
    }

    async simpleChatProcess(userMessage: string) {
        const openaiConfig = new OpenAIConfig();

        const messages: ChatCompletionMessageParam[] = [
            {
                role: "system",
                content: this.SimplePrompt(),
            },
            {
                role: "user",
                content: userMessage,
            },
        ];
        const response = await openaiConfig.chat(messages, []);

        return {
            response: response.choices[0].message.content,
        };
    }

    async processMessage(userMessage: string, conversationHistory: ChatCompletionMessageParam[] = []) {
        const openaiConfig = new OpenAIConfig();

        const messages: ChatCompletionMessageParam[] = [
            {
                role: "system",
                content: this.SystemPrompt(),
            },
            ...conversationHistory,
            {
                role: "user",
                content: userMessage,
            },
        ];

        const allToolDefinitions = this.getAllToolDefinitions();

        let response = await openaiConfig.chat(messages, allToolDefinitions);
        let assistantMessage = response.choices[0].message;

        // Manejo de function calling
        while (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
            messages.push(assistantMessage);

            // Ejecutar todas las funciones llamadas
            for (const toolCall of assistantMessage.tool_calls) {

                if (toolCall.type === 'function' && 'function' in toolCall) {
                    const functionName = toolCall.function.name;
                    const functionArgs = JSON.parse(toolCall.function.arguments);

                    console.log(`Ejecutando función: ${functionName}`, functionArgs);

                    const functionResult = await this.executeFunction(
                        functionName,
                        functionArgs
                    );

                    messages.push({
                        role: "tool",
                        content: functionResult,
                        tool_call_id: toolCall.id,
                    });
                }
            }

            response = await openaiConfig.chat(messages, allToolDefinitions);
            assistantMessage = response.choices[0].message;
        }

        return {
            response: assistantMessage.content,
            conversationHistory: messages,
        }

    }

    private async executeFunction(functionName: string, functionArgs: any): Promise<string> {
        const tool = this.tools.find(t => t.canHandle(functionName));

        if (tool) {
            return await tool.executeTools(functionName, functionArgs);
        }

        return JSON.stringify({
            error: `Función no reconocida: ${functionName}. No hay ninguna tool registrada que pueda manejarla.`
        });
    }

    private SimplePrompt() {
        return `
        Eres un asistente inteligente que ayuda a gestionar  un blog personal.
        
        💡 **Instrucciones:**
        - Responde usando un lenguaje natural, claro y profesional
        - Siempre sé amable y servicial 😊
        - Si el usuario te pregunta por sus datos, usa el contexto del usuario proporcionado
        - Proporciona respuestas concisas pero completas
        `;
    }

    private SystemPrompt() {
        return `
        Eres un asistente inteligente que ayuda a gestionar  un blog personal. 
        
        📋 **Capacidades con DevTrees:**
        - Buscar DevTrees por ID o slug
        - Obtener todos los DevTrees de un usuario
        - Crear nuevos DevTrees
        - Cambiar la disponibilidad de un DevTree
        - Eliminar DevTrees
        
        📝 **Capacidades con Posts:**
        - Buscar posts por ID o slug
        - Obtener todos los posts de un usuario
        - Crear nuevos posts
        - Cambiar la disponibilidad de un post
        - Eliminar posts
        
        💡 **Instrucciones:**
        - Responde usando un lenguaje natural, claro y profesional
        - Siempre sé amable y servicial 😊
        - Si necesitas ejecutar una acción, usa las herramientas disponibles
        - Si el usuario te pregunta por sus datos, usa el contexto del usuario proporcionado
        - Confirma las acciones importantes antes de ejecutarlas (como eliminaciones)
        - Proporciona respuestas concisas pero completas
        - No compartas información sensible como contraseñas
        
        💡 **Importante:**
        - Cuando el usuario solicite crear un DevTree o Post SIN proporcionar todos los campos Genera contenido inteligente para campos faltantes
        
        `;
    }
}