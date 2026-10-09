import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../hooks/useToast';
import { cn } from '../../lib/utils';

export interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200",
              isSuccess && "bg-[#0d1612]/95 border-[#00ff88]/40 text-white",
              isError && "bg-[#180d0d]/95 border-red-500/40 text-white",
              !isSuccess && !isError && "bg-[#111116]/95 border-white/20 text-white"
            )}
          >
            <div className="flex items-start gap-2.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#00ff88] shrink-0 mt-0.5" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-[#00d2ff] shrink-0 mt-0.5" />}
              
              <div className="text-xs sm:text-sm font-medium leading-snug">
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="p-1 rounded text-[#8e8e9f] hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
