import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { signup } from "../../../../apis/userAPI";

const signupSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "mật khẩu ít nhất 8 ký tự , 1 ký tự hoa, 1 ký tự thường và 1 số"
    ),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Họ tên không được để trống"),
  soDt: string().required("Số điện thoại không được để trống"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    resolver: yupResolver(signupSchema),
  });
  const {
    mutate: handleSignUp,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });
  const navigate = useNavigate();
  const onSubmit = ( values) => {
  
    console.log(values);
    //goi API dang ky
    handleSignUp(values);
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className="auth">
        <div className="container text-center">
            <h4>ĐĂNG KÝ TÀI KHOẢN</h4>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="d-flex justify-content-center">
                {/* flex lft */}
                <div className="me-2">
          <div>
          <input
            type="text"
            placeholder="Tài khoản"
            {...register("taiKhoan")}
          />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Mật khẩu"
            {...register("matKhau")}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>
        <div>
          <input type="text" placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
                </div>
                {/* Flex right */}
                <div>
                      <div>
                          <input type="text" placeholder="Họ Tên" {...register("hoTen")} />
                          {errors.hoTen && <p>{errors.hoTen.message}</p>}
                      </div>
                      <div>
                          <input
                            type="text"
                            placeholder="Số điện Thoại"
                            {...register("soDt")}
                          />
                          {errors.soDt && <p>{errors.soDt?.message}</p>}
                      </div>
                      <button type="submit" disabled={isLoading}>
                         Đăng Ký
                      </button>
                      {error && <p>{error}</p>}
                </div>
              </div>
            </form>
        </div>
    </div>
  );
}
//Lưu ý khi dùng material UI : Textfield {...register("taiKhoan", {required : {value : true , message "lỗi"}})}
//error = {!!errors.taiKhoan}
//helperText = {errors.taiKhoan.messgae}
