import { GoogleGenerativeAI } from "@google/generative-ai"

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY)
const gemini = googleai.getGenerativeModel({ model: 'gemini-1.5-flash' })
const chat = gemini.startChat({ history: [] })

export class Assistant{
    #chat
    
    constructor(model = 'gemini-1.5-flash'){
        const gemini = googleai.getGenerativeModel({ model })
        this.#chat = gemini.startChat({ history: [] })
    }

    async chat(content) {
        try {
            const result = await chat.sendMessage(content)
            return result.response.text()
        } catch (error) {
            throw error
        }
    }
}