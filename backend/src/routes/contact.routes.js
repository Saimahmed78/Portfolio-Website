import { Router } from "express";
import { submitContactForm } from "../controllers/contact.controller.js";

const router = Router();

// POST /api/v1/contact  — public, no auth
router.post("/submit", submitContactForm);

export default router;