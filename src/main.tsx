import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }

  handleResetAndReload = () => {
    try {
      localStorage.removeItem('mpi_curriculum_overrides_v1');
      localStorage.removeItem('mpi_spenmakro_progress_v1');
    } catch {
      // ignore storage errors
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-slate-900">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-lg space-y-4 text-center">
            <h1 className="text-lg font-extrabold text-slate-900">
              Muat Ulang Tampilan Aplikasi
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Terjadi kendala saat memuat data tampilan. Klik tombol di bawah untuk memuat ulang aplikasi.
            </p>
            <button
              type="button"
              onClick={this.handleResetAndReload}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
            >
              Muat Ulang Aplikasi
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
}

