import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/AdminProducts/ProductForm.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "@/services/productAdminApi";
import { TextField, Stack, Button } from "@mui/material";
import { useSnackbar } from "notistack";
export default function ProductForm({ initial, onClose, }) {
    const qc = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const empty = {
        ma_san_pham: "",
        ten_san_pham: "",
        loai: "",
        gia_thanh: 0,
        giam_gia: 0,
    };
    const [form, setForm] = useState(initial ?? empty);
    const valid = form.ma_san_pham.trim() !== "" &&
        form.ten_san_pham.trim() !== "" &&
        form.gia_thanh > 0 &&
        form.gia_thanh <= 2_000_000_000; // int32 upper bound
    const mut = useMutation({
        mutationFn: (d) => initial ? updateProduct(initial.id, d) : createProduct(d),
        async onSuccess() {
            await qc.invalidateQueries({ queryKey: ["admin-products"] });
            onClose();
            enqueueSnackbar(initial ? "Đã cập nhật!" : "Đã thêm sản phẩm!", { variant: "success" });
        },
        onError: () => enqueueSnackbar("Có lỗi xảy ra, vui lòng thử lại!", {
            variant: "error",
        }),
    });
    const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    return (_jsxs(Stack, { spacing: 2, sx: { mt: 1 }, children: [_jsxs(Stack, { direction: { sm: "row" }, spacing: 2, children: [_jsx(TextField, { fullWidth: true, label: "M\u00E3 SP", value: form.ma_san_pham, onChange: change("ma_san_pham") }), _jsx(TextField, { fullWidth: true, label: "T\u00EAn SP", value: form.ten_san_pham, onChange: change("ten_san_pham") })] }), _jsxs(Stack, { direction: { sm: "row" }, spacing: 2, children: [_jsx(TextField, { fullWidth: true, label: "Lo\u1EA1i", value: form.loai, onChange: change("loai") }), _jsx(TextField, { fullWidth: true, type: "number", label: "Gi\u00E1 (\u0111)", inputProps: { min: 0, max: 2_000_000_000 }, value: form.gia_thanh, onChange: (e) => setForm({
                            ...form,
                            gia_thanh: Number(e.target.value || 0),
                        }) })] }), _jsx(Button, { variant: "contained", disabled: !valid, onClick: () => mut.mutate(form), children: initial ? "Cập nhật" : "Thêm mới" })] }));
}
