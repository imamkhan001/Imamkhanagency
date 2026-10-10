import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Hard ceiling: Maximum 500ms animation duration as strictly required
    const maxTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 500);

    // Central initialization promise that catches ALL errors to prevent any infinite spinner
    const centralInitPromise = new Promise<void>((resolve) => {
      try {
        if (typeof document !== 'undefined') {
          if (document.readyState === 'complete' || document.readyState === 'interactive') {
            resolve();
          } else {
            const handleReady = () => resolve();
            window.addEventListener('DOMContentLoaded', handleReady, { once: true });
            window.addEventListener('load', handleReady, { once: true });
          }
        } else {
          resolve();
        }
      } catch (err) {
        console.warn('Central initialization error handled:', err);
        resolve(); // Always resolve, never reject
      }
    });

    centralInitPromise
      .catch((err) => {
        console.warn('Initialization promise catch:', err);
      })
      .finally(() => {
        // If ready earlier than 500ms, display immediately
        if (isMounted) {
          setIsLoading(false);
          clearTimeout(maxTimer);
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(maxTimer);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
