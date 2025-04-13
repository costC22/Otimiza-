'use server';

import { invoke } from '@tauri-apps/api';

export async function analyzeSystem(): Promise<string> {
  try {
    const osInfo = await invoke<string>('get_os_info');
    const cpuInfo = await invoke<string>('get_cpu_info');
    const memoryInfo = await invoke<string>('get_memory_info');
    const diskSpace = await invoke<string>('get_disk_space');

    return `
      Resultados da Análise do Sistema:
      - Informações do SO: ${osInfo}
      - Informações da CPU: ${cpuInfo}
      - Informações da Memória: ${memoryInfo}
      - Espaço em Disco: ${diskSpace}
    `;
  } catch (error: any) {
    console.error('Erro durante a análise do sistema:', error);
    throw new Error(error.message || 'Falha ao analisar o sistema.');
  }
}
