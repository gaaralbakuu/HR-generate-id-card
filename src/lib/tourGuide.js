import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = ({ onOpenModal = null, onCloseModal = null }) => {
  const driverObj = driver({
    showProgress: true,
    allowClose: true,
    overlayOpacity: 0.5,
    smoothScroll: true,
    steps: [
      {
        element: "#btn-management-data",
        popover: {
          title: "Bước 1: Quản lý dữ liệu",
          description: "Nhấn nút này để mở cửa sổ quản lý nhân viên, hình ảnh và nhập dữ liệu từ Excel.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#tab-employees",
        popover: {
          title: "Bước 2: Tab Danh sách",
          description: "Tab Danh sách cho phép bạn xem và quản lý danh sách nhân viên.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#btn-add-employee",
        popover: {
          title: "Bước 3: Thêm nhân viên",
          description: "Nhấn nút này để thêm một nhân viên mới vào danh sách.",
          side: "top",
          align: "start",
        },
      },
      {
        element: "table tbody tr:first-child td:nth-child(3)",
        popover: {
          title: "Bước 4: Cập nhật thông tin",
          description: "Click vào các ô để chỉnh sửa thông tin nhân viên (họ tên, mã NV, chức vụ, v.v).",
          side: "top",
          align: "start",
        },
      },
      {
        element: "button#btn-download-template",
        popover: {
          title: "Bước 5: Tải template Excel",
          description: "Tải file template Excel để nhập nhiều nhân viên cùng lúc.",
          side: "top",
          align: "start",
        },
      },
      {
        element: "button#btn-import-excel",
        popover: {
          title: "Bước 6: Nhập dữ liệu",
          description: "Sau khi điền thông tin vào template Excel, nhấn nút này để nhập dữ liệu vào hệ thống.",
          side: "top",
          align: "start",
        },
      },
      {
        element: "#tab-images",
        popover: {
          title: "Bước 7: Tab Hình ảnh",
          description: "Chuyển sang tab Hình ảnh để tải lên ảnh nhân viên.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: 'button#btn-select-images',
        popover: {
          title: "Bước 8: Tải lên hình ảnh",
          description:
            "Nhấn nút này để chọn và tải lên hình ảnh nhân viên. Tên file phải là mã NV (ví dụ: 123456.jpg).",
          side: "top",
          align: "start",
        },
      },
      {
        element: 'button[data-slot="dialog-close"]',
        popover: {
          title: "Bước 9: Thoát",
          description: "Nhấn nút X hoặc bên ngoài hộp thoại để thoát khỏi cửa sổ quản lý dữ liệu.",
          side: "left",
          align: "start",
        },
      },
      {
        element: '#area-templates',
        popover: {
          title: "Bước 10: Chọn mẫu thẻ",
          description: "Chọn mẫu thẻ nhân viên mà bạn muốn sử dụng từ khu vực này.",
          side: "top",
          align: "center",
        },
      },
      {
        element: '#a4-preview-container',
        popover: {
          title: "Bước 11: Xem trước thẻ",
          description: "Xem trước thẻ nhân viên ở kích thước A4 trước khi in.",
          side: "top",
          align: "center",
        },
      },
      {
        element: 'button#btn-print-a4',
        popover: {
          title: "Bước 12: In thẻ A4",
          description: "Nhấn nút này để in thẻ nhân viên ở kích thước A4.",
          side: "bottom",
          align: "start",
        },
      },
    ],

    onPrevClick: (el, step, opts) => {
      if(opts.state.activeIndex == 1) {
        onCloseModal && onCloseModal();
        driverObj.movePrevious();
      }else if(opts.state.activeIndex == 6) {
        document.querySelector("#tab-employees").dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        setTimeout(() => {
          driverObj.movePrevious();
        }, 50);
      }else if(opts.state.activeIndex == 9) {
        onOpenModal && onOpenModal();
        setTimeout(() => {
          document.querySelector("#tab-images").dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
          driverObj.movePrevious();
        }, 50);
      }else{
        driverObj.movePrevious();
      }
    },

    onNextClick: (el, step, opts) => {
      console.log(opts.state.activeIndex);
      if (opts.state.activeIndex == 0) {
        // Ẩn tour để chờ modal hiện lên
        driverObj.destroy();

        onOpenModal && onOpenModal();

        // Sau 500ms, tiếp tục tour
        setTimeout(() => {
          driverObj.drive(1);
          document.querySelector("#tab-employees").dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        }, 50);
      } else if (opts.state.activeIndex == 5) {
        document.querySelector("#tab-images").dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        driverObj.moveNext();
      } else if (opts.state.activeIndex == 8) {
        onCloseModal && onCloseModal();
        driverObj.moveNext();
      } else {
        driverObj.moveNext();
      }
    },
  });

  driverObj.drive();
};

export const stopTour = () => {
  // Tour sẽ tự dừng khi nhấn Close hoặc Finish
};
