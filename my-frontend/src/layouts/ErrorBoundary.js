import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from "react";
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Lỗi trong component:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return _jsx("h2", { children: "C\u00F3 l\u1ED7i x\u1EA3y ra! H\u00E3y th\u1EED l\u1EA1i." });
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
