import axios from "axios";
import Groq from "groq-sdk";

class LLMService {
  private groq: any;

  constructor() {
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  public async getCompletion(prompt: string): Promise<string> {
    const completion = await this.groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2048,
      stream: false, // TODO: stream the response
    });

    return completion.choices[0].message.content;
  }
}

export default LLMService;
