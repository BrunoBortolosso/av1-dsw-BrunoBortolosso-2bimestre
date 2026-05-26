import "dotenv/config";
import { prisma } from "./prisma.js";

async function testConnection() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("[Prisma] Conexão com o banco: OK");
  } catch (error) {
    console.error("[Prisma] Conexão com o banco: FALHOU");
    console.error(error);
    process.exitCode = 1;
  } finally {
    try {
      await prisma.$disconnect();
    } catch {
      // ignore
    }
  }
}

testConnection();
