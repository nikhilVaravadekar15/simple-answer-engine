import OpenAI from "openai";
import { ChatCompletionMessageParam } from "ai/prompts";

class OpenaiService {
  private openai: OpenAI | null = null;

  private OPENAI_API_KEY: string = process.env.OPENAI_API_KEY!;
  private OPENAI_API_BASEURL: string = process.env.OPENAI_API_BASEURL!;
  private CHAT_COMPLETIONS_MODEL: string = process.env.CHAT_COMPLETIONS_MODEL!;

  constructor() {
    try {
      if (!this.OPENAI_API_KEY || !this.CHAT_COMPLETIONS_MODEL) {
        throw new Error(
          "Undefined OPENAI_API_KEY | CHAT_COMPLETIONS_MODEL in .env"
        );
      }

      this.openai = new OpenAI({
        baseURL: this.OPENAI_API_BASEURL!,
        apiKey: this.OPENAI_API_KEY!,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async chatCompletion(messages: Array<ChatCompletionMessageParam>) {
    return await this.openai?.chat.completions.create({
      model: this.CHAT_COMPLETIONS_MODEL!,
      messages: messages,
      stream: true,
    });
  }
}

const openaiService = new OpenaiService();
export default openaiService;
