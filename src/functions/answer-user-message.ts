import { generateText, tool } from 'ai'
import { openai } from '../ai/openai'
import { postgresTool } from '../ai/tools/postgres-tool'

interface AnswerUserMessageParams {
    message: string
}

export async function answerUserMessage({ message }: AnswerUserMessageParams){
    const answer = await generateText({
        model: openai, 
        prompt: message,
        tools: {
            postgres: postgresTool,
        },
        system: `
            Você é um assistente de IA responsável por responder dúvidas sobre um evento de programação.

            Inclua na resposta somente o que o usuário pediu, sem nenhum texto adicional.

            O retorno deve ser sempre em markdown (sem incluir \'\'\' no início ou no final).
        `.trim(),
        maxSteps: 3

    })
    return { response: answer.text }
}
