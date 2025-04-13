'use server';

import os from 'os';
import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const execPromise = promisify(exec);
const fsPromises = fs.promises;

export async function runOptimization(): Promise<string> {
  try {
    // Clear temporary files
    const tempDir = os.tmpdir();
    const files = await fsPromises.readdir(tempDir);

    for (const file of files) {
      const filePath = path.join(tempDir, file);
      try {
        await fsPromises.unlink(filePath);
      } catch (e: any) {
        console.error(`Failed to delete ${filePath}:`, e);
      }
    }

    // Flush DNS cache
    await execPromise('ipconfig /flushdns');

    return 'Sistema otimizado: Arquivos temporários limpos e cache DNS liberado.';
  } catch (error: any) {
    console.error('Erro durante a otimização do sistema:', error);
    throw new Error(error.message || 'A otimização do sistema falhou.');
  }
}
