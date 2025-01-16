import { Request, Response, NextFunction } from "express";
import BookService from "../services/BookService";

class BookController {
  static async getTextById(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = req.params.id;
      const bookText = await BookService.getTextById(bookId);
      res.status(200).send(bookText as string);
    } catch (error) {
      next(error);
    }
  }

  static async getMetadataById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bookId = req.params.id;
      const metadata = await BookService.getMetadataById(bookId);
      const cover = await BookService.getCoverById(bookId);
      res.status(200).send({ id: bookId, ...metadata, cover });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = req.params.id;
      const bookText = await BookService.getTextById(bookId);
      const metadata = await BookService.getMetadataById(bookId);
      res.status(200).send({ id: bookId, text: bookText, ...metadata });
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
