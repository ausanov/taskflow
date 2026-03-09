import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center font-sans">
          <h2 className="text-red-600">Something went wrong</h2>
          <p className="text-gray-500">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-lg cursor-pointer transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
