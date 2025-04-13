'use client';

import {useEffect, useState} from 'react';

export function useTauri() {
  const [tauri, setTauri] = useState<typeof import('@tauri-apps/api') | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.__TAURI__) {
      // tauri is available
      setTauri(window.__TAURI__);
    } else {
      console.warn('Tauri API not available.');
      setTauri(null);
    }
  }, []);

  return tauri;
}
