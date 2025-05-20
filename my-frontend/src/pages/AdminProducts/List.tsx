// src/pages/AdminProducts/ProductList.tsx
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getProducts, deleteProduct, ProductDTO } from "@/services/productAdminApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box, IconButton, Button, Stack, Dialog, DialogTitle, DialogContent
} from "@mui/material";
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
  const [editing, setEditing] = useState<ProductDTO | null>(null);

  const del = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      enqueueSnackbar("Đã xoá!", { variant: "info" });
    },
    onError: () => {
      enqueueSnackbar("Xoá thất bại!", { variant: "error" });
    },
  });

  const cols: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "ma_san_pham", headerName: "Mã", width: 120 },
    { field: "ten_san_pham", headerName: "Tên", width: 220, flex: 1 },
    { field: "loai", headerName: "Loại", width: 130 },
    {
      field: "gia_thanh",
      headerName: "Giá",
      width: 120,
      valueFormatter: ({ value }) =>
        value != null
          ? (value as number).toLocaleString("vi-VN",
              { maximumFractionDigits: 0 }) + " ₫"
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
        return (
          <Stack direction="row">
            <IconButton onClick={onEdit}><Edit /></IconButton>
            <IconButton color="error" onClick={() => del.mutate(p.row.id)}>
              <Delete />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          setEditing(null);
          setOpen(true);
        }}
      >
        Thêm sản phẩm
      </Button>

      <Box sx={{ height: 560, mt: 2 }}>
        <DataGrid
          rows={data}
          columns={cols}
          loading={isLoading}
          pageSizeOptions={[10, 20, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
      </Box>

      {/* Modal form thêm/sửa sản phẩm */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</DialogTitle>
        <DialogContent>
          <ProductForm
            initial={editing || undefined}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
