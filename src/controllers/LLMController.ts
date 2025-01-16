import { NextFunction, Request, Response } from "express";
import LLMService from "../services/LLMService";
import prompts, { PromptKeys } from "../utils/prompts";
import BookService from "../services/BookService";

const MAX_BOOK_LENGTH = 6000;

class LLMController {
  static async getCompletion(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, action } = req.body;

      const actionKeys = Object.keys(prompts);

      if (!actionKeys.includes(action)) {
        res.status(400).send("Invalid action");
        return;
      }

      const bookText = await BookService.getTextById(id);
      const metadata = await BookService.getMetadataById(id);
      const book = { id, ...metadata, text: bookText };

      const prompt = prompts[action as PromptKeys]?.replace(
        "{{book}}",
        JSON.stringify(book).slice(0, MAX_BOOK_LENGTH)
      );

      const llmService = new LLMService();
      const completion = await llmService.getCompletion(prompt);

      res.status(200).send(completion);
    } catch (error) {
      next(error);
    }
  }
}

export default LLMController;
