import { generateText } from 'ai'
import { openai } from '../ai/openai'

interface AnswerUserMessageParams {
    message: string
}

export async function answerUserMessage({ message }: AnswerUserMessageParams){
    const answer = await generateText({
        model: openai, 
        prompt: message,
        system: 'Responda toda pergunta com "não sei"'
    })
    return { response: answer.text }
}
