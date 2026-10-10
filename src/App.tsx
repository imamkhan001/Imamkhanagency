/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppRouter } from './router';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { LoadingProvider } from './context/LoadingContext';

function MainApp() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const finishLoading = () => {
      if (!isMounted) return;
      setIsFadingOut(true);
      setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 150); // Quick fade-out transition
    };

    // Hard ceiling: Loading animation MUST last maximum 0.5s (500ms)
    const maxTimer = setTimeout(finishLoading, 500);

    // Central initialization promise wrapping initial setup safely
    const centralInitPromise = new Promise<void>((resolve) => {
      try {
        if (typeof document !== 'undefined') {
          if (document.readyState === 'complete' || document.readyState === 'interactive') {
            resolve();
          } else {
            const onReady = () => resolve();
            window.addEventListener('DOMContentLoaded', onReady, { once: true });
            window.addEventListener('load', onReady, { once: true });
          }
        } else {
          resolve();
        }
      } catch (err) {
        console.warn('Central initialization error handled:', err);
        resolve(); // Always resolve, never reject to prevent infinite hang
      }
    });

    // Catch any error in central init
    centralInitPromise
      .catch((err) => {
        console.warn('Initialization caught error:', err);
      })
      .finally(() => {
        // If ready earlier than 500ms, finish immediately
        if (isMounted) {
          clearTimeout(maxTimer);
          finishLoading();
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(maxTimer);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-200 ease-out ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <LoadingScreen isOverlay={true} />
        </div>
      )}
      <AppRouter />
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <MainApp />
    </LoadingProvider>
  );
}
