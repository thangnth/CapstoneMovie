import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {useForm} from "react-hook-form"
import { addMovie } from "../../../apis/movieAPI";


export default function AdminMovie() {
  //Tao form them movie
  const {register, handleSubmit, watch } = useForm({
    defaultValues : {
      tenPhim : "",
      biDanh: "",
      mota: "",
      hinhAnh : "",
      trailer: "",
      ngayKhoiChieu: ""
    }
  })
  const hinhAnh = watch("hinhAnh")
  const [imgPreview, setImgReview] = useState ("")

  //Voi form co file dang hinh anh thi chuyen thanh dang formData.append 
  const {mutate : onSubmit} = useMutation({
    mutationFn : (values)=>{
      //Su dung kieu du lieu ... de them du lieu kieu file vao server
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]); //
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP01");

      return addMovie(formData)
    },
    onSuccess: ()=>{
      //dong modal hoac chuyen trang 
      //Su dung queryClient.invalidateQueries de goi lai API get danh sach phim 
    }
  });
// Khi hinh anh thay doi , chay vao useEffect va thay doi hinh anh moi 
  useEffect(()=>{
    const file = hinhAnh?.[0];
    //CHuyen file hinh anh thanh chuoi base64 de dua vao src : su dung FileReader
    if(!file)return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    //Sau khi load xong hinh thi xu ly dua ra 
    fileReader.onload = (evt)=>{
      setImgReview(evt.target.result)
    }

  }, [hinhAnh])
  
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
           <input placeholder="Tên Phim" {...register("tenPhim")}/>
          </div>
          <div>
          <input placeholder="Bí Danh" {...register("biDanh")}/>
          </div>
          <div>
          <input placeholder="Mô Tả" {...register("moTa")}/>
          </div>
        
          <div>
              {/* Neu up nhieu file dung tu khoa multiple  trong input */}
          <input type="file" placeholder="Hình ảnh" {...register("hinhAnh")}/>
          <img src={imgPreview} alt="preview" width={200} height={200}/>
          </div>
          <div>
          <input placeholder="Trailer" {...register("trailer")}/>
          </div>
          <div>
          <input type="date" placeholder="Ngày Khởi Chiếu" {...register("ngayKhoiChieu", {setValueAs : (value)=>{return dayjs(value).format("DD/MM/YYYY")}})}/>
          </div>
          <button>Thêm Phim</button>
    </form>

  );
}

