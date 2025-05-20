import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const ErrorContext = createContext(undefined);
export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const clearError = () => setError(null);
    return (_jsx(ErrorContext.Provider, { value: { error, setError, clearError }, children: children }));
};
export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError phải được sử dụng trong ErrorProvider");
    }
    return context;
};
