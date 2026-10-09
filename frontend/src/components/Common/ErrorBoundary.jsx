import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleResetCache = () => {
        try {
            localStorage.removeItem('aayush_custom_courses');
            localStorage.removeItem('aayush_university_courses_custom');
            localStorage.removeItem('aayush_news_custom');
        } catch {}
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50">
                    <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
                        <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
                            ⚠️
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                            Something went wrong
                        </h2>
                        <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed">
                            A display error occurred while rendering this page. You can reload the page or reset the cache to restore normal view.
                        </p>
                        {this.state.error && (
                            <div className="mb-5 text-left p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-mono overflow-auto max-h-32">
                                {this.state.error.message || String(this.state.error)}
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button
                                onClick={this.handleReload}
                                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                            >
                                Reload View
                            </button>
                            <button
                                onClick={this.handleResetCache}
                                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                            >
                                Reset Cache & Reload
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
