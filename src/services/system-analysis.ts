'use server';

export async function analyzeSystem(): Promise<string> {
    if (typeof window !== 'undefined' && (window as any).__TAURI__) {
        try {
            const {invoke} = await import('@tauri-apps/api/tauri');
            // Call Tauri command to get system information
            const systemInfo = await invoke<string>('get_system_info');
            return systemInfo;
        } catch (error) {
            console.error('Falha ao analisar o sistema via Tauri:', error);
            return 'Falha ao analisar o sistema via Tauri.';
        }
    } else {
        console.log('Tauri não está disponível, executando versão web.');
        let browserInfo = 'Navegador: Não disponível\nMemória disponível (aproximada): Não disponível\nPlataforma: Não disponível';

        if (typeof window !== 'undefined') {
            browserInfo = `Navegador: ${navigator.userAgent}\nMemória disponível (aproximada): ${
                (navigator as any).deviceMemory ? (navigator as any).deviceMemory + ' GB' : 'Não disponível'
            }\nPlataforma: ${navigator.platform}`;
        }

        return `Análise básica do navegador:\n${browserInfo}`;
    }
}
