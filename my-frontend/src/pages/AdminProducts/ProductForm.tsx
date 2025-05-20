// src/pages/AdminProducts/ProductForm.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductDTO, createProduct, updateProduct } from "@/services/productAdminApi";
import { TextField, Stack, Button } from "@mui/material";
import { useSnackbar } from "notistack";

export default function ProductForm({
  initial,
  onClose,
}: {
  initial?: ProductDTO;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const empty: ProductDTO = {
    ma_san_pham: "",
    ten_san_pham: "",
    loai: "",
    gia_thanh: 0,
    giam_gia: 0,
  };

  const [form, setForm] = useState<ProductDTO>(initial ?? empty);

  const valid =
    form.ma_san_pham.trim() !== "" &&
    form.ten_san_pham.trim() !== "" &&
    form.gia_thanh > 0 &&
    form.gia_thanh <= 2_000_000_000; // int32 upper bound

  const mut = useMutation({
    mutationFn: (d: ProductDTO) =>
      initial ? updateProduct(initial.id!, d) : createProduct(d),
    async onSuccess(){
        await qc.invalidateQueries({ queryKey:["admin-products"] });
        onClose();
        enqueueSnackbar(initial?"Đã cập nhật!":"Đã thêm sản phẩm!",
                        {variant:"success"});
    },
    onError: () =>
      enqueueSnackbar("Có lỗi xảy ra, vui lòng thử lại!", {
        variant: "error",
      }),
  });

  const change = (k: keyof ProductDTO) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <Stack direction={{ sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          label="Mã SP"
          value={form.ma_san_pham}
          onChange={change("ma_san_pham")}
        />
        <TextField
          fullWidth
          label="Tên SP"
          value={form.ten_san_pham}
          onChange={change("ten_san_pham")}
        />
      </Stack>
      <Stack direction={{ sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          label="Loại"
          value={form.loai}
          onChange={change("loai")}
        />
        <TextField
          fullWidth
          type="number"
          label="Giá (đ)"
          inputProps={{ min: 0, max: 2_000_000_000 }}
          value={form.gia_thanh}
          onChange={(e) =>
            setForm({
              ...form,
              gia_thanh: Number(e.target.value || 0),
            })
          }
        />
      </Stack>
      <Button
        variant="contained"
        disabled={!valid}
        onClick={() => mut.mutate(form)}
      >
        {initial ? "Cập nhật" : "Thêm mới"}
      </Button>
    </Stack>
  );
}
