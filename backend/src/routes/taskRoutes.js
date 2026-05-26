import express from "express";
import * as TaskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", TaskController.listar);
router.get("/tasks/:id", TaskController.buscarPorId);
router.post("/tasks", TaskController.criar);
router.put("/tasks/:id", TaskController.atualizar);
router.delete("/tasks/:id", TaskController.excluir);

export default router;
