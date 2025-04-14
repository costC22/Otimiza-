'use server';

export async function analyzeSystem(): Promise<string> {
  if (typeof window !== 'undefined' && window.__TAURI__) {
    try {
      const { invoke } = await import('@tauri-apps/api');

      // Chama o comando Tauri para obter informações do sistema
      const systemInfo = await invoke<string>('get_system_info');
      return systemInfo;
    } catch (error) {
      console.error('Falha ao analisar o sistema via Tauri:', error);
      return 'Falha ao analisar o sistema via Tauri.';
    }
  } else {
    console.log('Tauri não está disponível, executando versão web.');
    // Implementa uma análise básica para a versão web
    const browserInfo = `Navegador: ${navigator.userAgent}\nMemória disponível (aproximada): ${
      navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Não disponível'
    }`;

    return `Análise básica do navegador:\n${browserInfo}\n\nPara uma análise completa, por favor, use o aplicativo Tauri.`;
  }
}
