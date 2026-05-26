import * as TaskModel from "../models/taskModel.js";

function parseId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ erro: "ID inválido" });
    return null;
  }
  return id;
}

export async function listar(req, res) {
  try {
    const tasks = await TaskModel.listar();
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao listar tasks" });
  }
}

export async function buscarPorId(req, res) {
  const id = parseId(req, res);
  if (!id) return;

  try {
    const task = await TaskModel.buscarPorId(id);
    if (!task) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao buscar task" });
  }
}

export async function criar(req, res) {
  const { title, description, completed, categoryId } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ erro: "title é obrigatório" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ erro: "description deve ser string" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ erro: "completed deve ser boolean" });
  }

  if (
    categoryId !== undefined &&
    categoryId !== null &&
    (!Number.isInteger(categoryId) || categoryId <= 0)
  ) {
    return res.status(400).json({ erro: "categoryId deve ser inteiro positivo ou null" });
  }

  try {
    const created = await TaskModel.criar({
      title: title.trim(),
      description: description === undefined ? undefined : description,
      completed,
      categoryId
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao criar task" });
  }
}

export async function atualizar(req, res) {
  const id = parseId(req, res);
  if (!id) return;

  const { title, description, completed, categoryId } = req.body;

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ erro: "title inválido" });
  }

  if (description !== undefined && description !== null && typeof description !== "string") {
    return res.status(400).json({ erro: "description deve ser string ou null" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ erro: "completed deve ser boolean" });
  }

  if (
    categoryId !== undefined &&
    categoryId !== null &&
    (!Number.isInteger(categoryId) || categoryId <= 0)
  ) {
    return res.status(400).json({ erro: "categoryId deve ser inteiro positivo ou null" });
  }

  const hasAnyField =
    title !== undefined ||
    description !== undefined ||
    completed !== undefined ||
    categoryId !== undefined;

  if (!hasAnyField) {
    return res.status(400).json({ erro: "Envie ao menos um campo para atualizar" });
  }

  try {
    const updated = await TaskModel.atualizar(id, {
      title: title === undefined ? undefined : title.trim(),
      description,
      completed,
      categoryId
    });

    if (!updated) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar task" });
  }
}

export async function excluir(req, res) {
  const id = parseId(req, res);
  if (!id) return;

  try {
    const deleted = await TaskModel.excluir(id);
    if (!deleted) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json(deleted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao excluir task" });
  }
}
