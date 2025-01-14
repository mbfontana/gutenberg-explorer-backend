import express from "express";
import BookController from "./controllers/BookController";
import LLMController from "./controllers/LLMController";

const router = express.Router();

// router.get("/health-check", (req, res) => res.sendStatus(200));

router.get("/book/:id", BookController.getTextById);
router.get("/book/:id/metadata", BookController.getMetadataById);

router.post("/llm/completion", LLMController.getCompletion);

export default router;
