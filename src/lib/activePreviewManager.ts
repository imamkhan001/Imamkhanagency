type ActiveListener = (activeId: string | null) => void;

class ActivePreviewManager {
  private activeId: string | null = null;
  private listeners: Set<ActiveListener> = new Set();
  private pageReady: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const onReady = () => {
        if ('requestIdleCallback' in window) {
          (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number })
            .requestIdleCallback(() => {
              this.pageReady = true;
            }, { timeout: 1500 });
        } else {
          setTimeout(() => {
            this.pageReady = true;
          }, 300);
        }
      };

      if (document.readyState === 'complete') {
        onReady();
      } else {
        window.addEventListener('load', onReady, { once: true });
      }
    }
  }

  public isReady(): boolean {
    return this.pageReady;
  }

  public getActiveId(): string | null {
    return this.activeId;
  }

  public setActive(id: string | null) {
    if (this.activeId === id) return;
    this.activeId = id;
    this.listeners.forEach((fn) => fn(this.activeId));
  }

  public subscribe(listener: ActiveListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const activePreviewManager = new ActivePreviewManager();
