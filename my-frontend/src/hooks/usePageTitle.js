// hooks/usePageTitle.ts
import { useEffect } from 'react';
export const usePageTitle = (title) => {
    useEffect(() => {
        const prev = document.title;
        document.title = title;
        return () => { document.title = prev || 'EGA Pets'; };
    }, [title]);
};
