import * as yup from "yup";
export const registerSchema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: yup.string().min(12, "Mật khẩu phải ít nhất 12 ký tự").required(),
});
