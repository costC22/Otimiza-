'use client';

import { useEffect, useState } from 'react';

export function useTauri() {
  const [tauri, setTauri] = useState<typeof import('@tauri-apps/api') | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importa dinamicamente o módulo @tauri-apps/api
      import('@tauri-apps/api')
        .then((tauriApi) => {
          setTauri(tauriApi);
        })
        .catch((error) => {
          console.error('Failed to load Tauri API:', error);
          setTauri(null);
        });
    }
  }, []);

  return tauri;
}
