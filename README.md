# Cấu trúc project

src

- components/:
  - Chứa các component thuần UI được tái sử dụng ở nhiều nơi, ví dụ : header, footer , sidebar, button , card...
  - Các component này không chứa các logic của ứng dụng (vd callAPI)
  - Các component này được import vào các component module
- modules/ module-name:
  - Chứa các component cấu thành 1 page hoặc 1 chức năng cụ thể . vd : module-name home chứa component cha Home, ngoài ra tao thêm các folder chứa component con : Cinema , Showing, Banner
- layout : chứa các component layout cho react-router
- apis/:

  - setup các thư viện API : cấu hình các axios instance
  - setup các hàm gọi API

  carousel : reactslick / react swiper
