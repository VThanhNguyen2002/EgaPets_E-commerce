import { jsx as _jsx } from "react/jsx-runtime";
import { useLoadingStore } from "../store/loadingStore";
export const LoadingSpinner = () => {
    const isLoading = useLoadingStore((state) => state.isLoading);
    if (!isLoading)
        return null;
    return _jsx("div", { className: "loading-spinner", children: "Loading..." });
};
