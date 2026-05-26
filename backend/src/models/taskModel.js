import { prisma } from "../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";

function isNotFoundError(error) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

export async function listar() {
  return prisma.task.findMany({
    orderBy: { id: "asc" }
  });
}

export async function buscarPorId(id) {
  return prisma.task.findUnique({
    where: { id }
  });
}

export async function criar({ title, description, completed, categoryId }) {
  return prisma.task.create({
    data: {
      title,
      description,
      completed,
      categoryId
    }
  });
}

export async function atualizar(id, { title, description, completed, categoryId }) {
  const data = {};

  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (completed !== undefined) data.completed = completed;
  if (categoryId !== undefined) data.categoryId = categoryId;

  try {
    return await prisma.task.update({
      where: { id },
      data
    });
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

export async function excluir(id) {
  try {
    return await prisma.task.delete({
      where: { id }
    });
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}
