'use server';

import os from 'os';
import { promisify } from 'util';
import { exec } from 'child_process';
import { glob } from 'glob';

const globPromise = promisify(glob);
const execPromise = promisify(exec);

export async function analyzeSystem(): Promise<string> {
  try {
    const tempDir = os.tmpdir();
    const tempFiles = await globPromise(`${tempDir}/*`);
    const processInfo = await execPromise('tasklist');

    return `
      Resultados da Análise do Sistema:
      - Número de arquivos temporários: ${tempFiles.length}
      - Processos em execução: ${processInfo.stdout.split('\\r\\n').length - 2}
    `;
  } catch (error: any) {
    console.error('Erro durante a análise do sistema:', error);
    throw new Error(error.message || 'Falha ao analisar o sistema.');
  }
}
