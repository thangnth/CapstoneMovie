import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Navigate, useSearchParams } from "react-router-dom";
import { signin } from "../../../../apis/userAPI";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";

const signupSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "mật khẩu ít nhất 8 ký tự , 1 ký tự hoa, 1 ký tự thường và 1 số"
    ),
});

export default function Signin() {
  // const navigate = useNavigate();
  const { currentUser, handleSignIn: onSignInSuccess } = useUserContext();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const {
    mutate: handleSignin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      localStorage.setItem("currentUser", JSON.stringify(data));
      onSignInSuccess(data);
      navigator("/");
    },
  });

  const onSubmit = (values) => {
    handleSignin(values);
  };
  //currentUser khác null -> user đã đăng nhập --> điều hướng về Home .
  if (currentUser) {
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return (
    <div className="auth text-center">
          <div className="container">
      <h4>ĐĂNG NHẬP</h4>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-center">
        <div className="me-2">
          <input placeholder="Tai khoan" {...register("taiKhoan")} />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Mat Khau"
            {...register("matKhau")}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>
        </div>
        <button type="submit" disabled={isLoading}>
          Đăng Nhập
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
    </div>

  );
}
