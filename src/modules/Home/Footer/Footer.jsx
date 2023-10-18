import React from 'react'
import {Link} from "react-router-dom"

export default function Footer() {
  return (
    <div className="footer pt-5">
        <div className="container row text-white text-center">
        <div className='social col-lg-3 col-sm-6 mb-4'>
            <p>SOCIAL</p>
            <i className="bi bi-facebook mx-1"></i>
            <i className="bi bi-instagram mx-1"></i>
            <i className="bi bi-youtube mx-1"></i>
            <i className="bi bi-google mx-1"></i>
        </div>
        <div className='contact col-lg-3 col-sm-6 mb-4'>
            <p>LIÊN HỆ</p>
            <p><Link className="text-decoration-none text-white">FQA</Link></p>
            <p><Link className="text-decoration-none text-white">Quy Chuẩn Thương Hiệu</Link></p>
            <p><Link className="text-decoration-none text-white">Thoả Thuận Sử Dụng</Link></p>
            <p><Link className="text-decoration-none text-white">Chính Sách Bảo Mật</Link></p>
            
        </div>
        <div className='contact col-lg-3 col-sm-6 mb-4'>
          <p>ĐỐI TÁC</p>
          <img className="me-2" src="https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png" width={25} height={25} alt="" />
          <img className="me-2" src="https://movienew.cybersoft.edu.vn/hinhanh/cgv.png" width={25} height={25} alt="" />
          <img className="me-2" src="https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png" width={25} height={25} alt="" />
          <img className="me-2" src="https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png" width={25} height={25} alt="" />
          <img className="me-2" src="https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png" width={25} height={25} alt="" />
          <img className="me-2" src="https://movienew.cybersoft.edu.vn/hinhanh/megags.png" width={30} height={30} alt="" />
        </div>
        <div className='contact col-lg-3 col-sm-6 mb-4'>
            <p>MOBILE APP</p>
             <i class="bi bi-apple mx-1"></i>
             <i class="bi bi-android2 mx-1"></i>
        </div>
    </div>
    </div>

  )
}
