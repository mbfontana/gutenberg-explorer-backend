import { NextFunction, Request, Response } from "express";
import LLMService from "../services/LLMService";

class LLMController {
  static async getCompletion(req: Request, res: Response, next: NextFunction) {
    try {
      const prompt: string = req.body.prompt;

      const llmService = new LLMService();

      const completion = await llmService.getCompletion(prompt);

      res.status(200).send(completion);
    } catch (error) {
      next(error);
    }
  }
}

export default LLMController;
