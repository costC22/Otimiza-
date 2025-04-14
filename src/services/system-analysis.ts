'use server';

export async function analyzeSystem(): Promise<string> {
  if (typeof window !== 'undefined') {
    // Executa no navegador
    const browserInfo = `Navegador: ${navigator.userAgent}\nMemória disponível (aproximada): ${
      navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Não disponível'
    }\nPlataforma: ${navigator.platform}`;

    return `Análise básica do navegador:\n${browserInfo}`;
  } else {
    // Executa no servidor (e Tauri não está disponível)
    return 'Análise do sistema não implementada para versão web. Por favor, use o aplicativo Tauri.';
  }
}
