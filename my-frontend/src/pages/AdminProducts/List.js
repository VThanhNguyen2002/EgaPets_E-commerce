import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/AdminProducts/ProductList.tsx
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getProducts, deleteProduct } from "@/services/productAdminApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, IconButton, Button, Stack, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ProductForm from "./ProductForm";
import { useSnackbar } from "notistack";
export default function ProductList() {
    const qc = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const { data = [], isLoading } = useQuery({
        queryKey: ["admin-products"],
        queryFn: () => getProducts().then((r) => r.data),
    });
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const del = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-products"] });
            enqueueSnackbar("Đã xoá!", { variant: "info" });
        },
        onError: () => {
            enqueueSnackbar("Xoá thất bại!", { variant: "error" });
        },
    });
    const cols = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "ma_san_pham", headerName: "Mã", width: 120 },
        { field: "ten_san_pham", headerName: "Tên", width: 220, flex: 1 },
        { field: "loai", headerName: "Loại", width: 130 },
        {
            field: "gia_thanh",
            headerName: "Giá",
            width: 120,
            valueFormatter: ({ value }) => value != null
                ? value.toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + " ₫"
                : "—",
        },
        { field: "giam_gia", headerName: "%", width: 80 },
        {
            field: "actions",
            headerName: "",
            width: 120,
            sortable: false,
            renderCell: (p) => {
                const onEdit = () => {
                    setEditing(p.row);
                    setOpen(true);
                };
                return (_jsxs(Stack, { direction: "row", children: [_jsx(IconButton, { onClick: onEdit, children: _jsx(Edit, {}) }), _jsx(IconButton, { color: "error", onClick: () => del.mutate(p.row.id), children: _jsx(Delete, {}) })] }));
            },
        },
    ];
    return (_jsxs(Box, { children: [_jsx(Button, { variant: "contained", onClick: () => {
                    setEditing(null);
                    setOpen(true);
                }, children: "Th\u00EAm s\u1EA3n ph\u1EA9m" }), _jsx(Box, { sx: { height: 560, mt: 2 }, children: _jsx(DataGrid, { rows: data, columns: cols, loading: isLoading, pageSizeOptions: [10, 20, 100], initialState: {
                        pagination: { paginationModel: { pageSize: 10, page: 0 } },
                    } }) }), _jsxs(Dialog, { open: open, onClose: () => setOpen(false), maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: editing ? "Cập nhật sản phẩm" : "Thêm sản phẩm" }), _jsx(DialogContent, { children: _jsx(ProductForm, { initial: editing || undefined, onClose: () => setOpen(false) }) })] })] }));
}
