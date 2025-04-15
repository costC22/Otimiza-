'use client';

import {useEffect, useState} from 'react';

export function useTauri() {
  const [tauri, setTauri] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__TAURI__) {
      // tauri is available
      import('@tauri-apps/api')
        .then((tauriApi) => {
          setTauri(tauriApi);
        })
        .catch(err => {
          console.error('Failed to load Tauri API:', err);
          setTauri(null);
        });
    } else {
      console.warn('Tauri API not available.');
      setTauri(null);
    }
  }, []);

  return tauri;
}
