'use server';

export async function analyzeSystem(): Promise<string> {
  // Check if we are running in a Tauri environment
  if (typeof window !== 'undefined' && (window as any).__TAURI__) {
    try {
      const { invoke } = await import('@tauri-apps/api/tauri');
      // Call Tauri command to get system information
      const systemInfo = await invoke<string>('get_system_info');
      return systemInfo;
    } catch (error) {
      console.error('Failed to analyze system via Tauri:', error);
      return 'System analysis via Tauri failed.';
    }
  } else {
    console.log('Tauri is not available, running web version.');
    return 'Análise do sistema não implementada para a versão web. Por favor, use a aplicação Tauri.';
  }
}

