// ✅ src/hooks/useProvinces.ts
import { useEffect, useState } from "react";
export default function useProvinces() {
    const [provinces, setProvinces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/?depth=2")
            .then(res => {
            if (!res.ok)
                throw new Error("Lỗi khi lấy danh sách tỉnh/thành");
            return res.json();
        })
            .then(setProvinces)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);
    return { provinces, loading, error };
}
