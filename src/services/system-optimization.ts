'use server';

import { invoke } from '@tauri-apps/api/tauri';

export async function runOptimization(): Promise<string> {
  try {
    // Clear temporary files
    const clearTempResult = await invoke<string>('clear_temp_files');
    console.log('clearTempResult', clearTempResult);

    // Flush DNS cache
    const flushDnsResult = await invoke<string>('flush_dns');
    console.log('flushDnsResult', flushDnsResult);

    const optimizeMemoryResult = await invoke<string>('optimize_memory');
    console.log('optimizeMemoryResult', optimizeMemoryResult);

    const diskCleanupResult = await invoke<string>('disk_cleanup');
    console.log('diskCleanupResult', diskCleanupResult);

    return `Sistema otimizado:
            ${clearTempResult}
            ${flushDnsResult}
            ${optimizeMemoryResult}
            ${diskCleanupResult}`;
  } catch (error: any) {
    console.error('Erro durante a otimização do sistema:', error);
    throw new Error(error.message || 'A otimização do sistema falhou.');
  }
}
