// src/layouts/AdminLayout.tsx
import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function AdminLayout(){
  const { isLoggedIn, role, logout } = useAuthStore();

  if(!isLoggedIn || role!=="Admin") return <Navigate to="/admin/login" replace/>;

  return (
    <Box sx={{ display:"flex" }}>
      <AppBar position="fixed">
        <Toolbar sx={{gap:3}}>
          <Typography variant="h6" component="div" sx={{ flexGrow:1 }}>
            Admin Dashboard
          </Typography>
          <Button component={Link} to="/admin/products" color="inherit">Sản phẩm</Button>
          <Button onClick={logout} color="inherit">Đăng xuất</Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{flexGrow:1, p:3, mt:8}}>
        <Outlet/>
      </Box>
    </Box>
  );
}
