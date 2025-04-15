'use server';

export async function analyzeSystem(): Promise<string> {
    if (typeof window !== 'undefined' && window.__TAURI__) {
        try {
            const { invoke } = await import('@tauri-apps/api');
            // Call Tauri command to get system information
            const systemInfo = await invoke<string>('get_system_info');
            return `Análise do sistema via Tauri:\n${systemInfo}`;
        } catch (error) {
            console.error('Falha ao analisar o sistema via Tauri:', error);
            return 'Falha ao analisar o sistema via Tauri.';
        }
    } else {
        console.log('Tauri não está disponível, executando versão web.');
        const browserInfo = `Navegador: ${navigator.userAgent}\nMemória disponível (aproximada): ${
            navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Não disponível'
        }\nPlataforma: ${navigator.platform}`;

        return `Análise básica do navegador:\n${browserInfo}`;
    }
}
