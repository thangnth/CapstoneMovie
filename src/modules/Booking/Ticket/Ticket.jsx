import React from 'react'
import swal from 'sweetalert';

export default function Ticket({selectedSeats , onSelectedSeatsChange, movieInfo}) {
  const handleRemoveSeat = (seat)=>{
    onSelectedSeatsChange (selectedSeats.filter((selectedSeat)=>{return selectedSeat !==seat}))
  };
  const totalPrice = selectedSeats.reduce((result, selectedSeat)=>{
    return result + selectedSeat.giaVe
  },0)

  const handleConfirmBooking = ()=>{
    if(totalPrice > 0 ){
      swal({
        title: "Bạn đã đặt vé thành công!",
        icon: "success",
      });
    } else {
      swal({
        title: "Bạn chưa chọn ghế!",
        icon: "warning",
      });
    }

  }

  return (
    <div className='col-lg-5'> 
      <div className='d-flex justify-content-round text-warning'>
      <img className="col-2"src={movieInfo.hinhAnh} alt="" />
      <div className="ps-2">
        <h6 className="text-white">{movieInfo.tenPhim}</h6>
        <span>Cụm rạp : {movieInfo.tenCumRap} - {movieInfo.tenRap}</span>
        <p>Thời gian chiếu: {movieInfo.ngayChieu} - {movieInfo.gioChieu}</p>
      </div>
      </div>
    <h4 className="m-2 text-white text-center">Danh Sách Ghế Bạn Chọn</h4>
    <table className="table table-bordered table-dark text-center">
      <tbody>
        <tr>
          <th>STT</th>
          <th className="text-center" width="10%">
            Số Ghế
          </th>
          <th>Loại vé</th>
          <th width="10%">Giá</th>
          <th width="10%">Huỷ</th>
        </tr>
        {selectedSeats.map((selectedSeat, index) => {
          return (
            <tr key={selectedSeat.maGhe}>
              <td width="10%">{index + 1}</td>
              <td width="10%">{selectedSeat.tenGhe}</td>
              <td width="10%">{selectedSeat.loaiGhe}</td>
              <td width="10%">{selectedSeat.giaVe}</td>
              <td
                className="text-warning" width="10%"
                onClick={() => {
                  handleRemoveSeat(selectedSeat);
                }}
              >
                X
              </td>
            </tr>
          );
        })}
        <tr>
          <td colspan="3">Tổng tiền (VND)</td>
          <td colspan="2">{totalPrice}</td>
        </tr>
      </tbody>
    </table>
    <div className="d-flex justify-content-center">
    <button className="btn btn-success" onClick={()=>{handleConfirmBooking()}}>
      Xác nhận đặt vé
    </button>
    </div>

  </div>
);
}

