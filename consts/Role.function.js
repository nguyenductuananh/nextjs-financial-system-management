export const getFunction = (role) => {
  switch (role) {
    case "sale": {
      return [...sale];
    }
    case "manager": {
      return [...manager];
    }
    case "warehousestaff": {
      return [...warehousestaff];
    }
    default: {
      return [...manager, ...warehousestaff, ...sale];
    }
  }
};
const sale = [
  { title: "Xử lí hóa đơn", href: "/sale/xu-li-hoa-don" },
  { title: "Thêm mặt hàng", href: "/them-mat-hang" },
  { title: "Thêm loại", href: "/them-loai" },
];
const manager = [
  {
    title: "Xem thống kê doanh thu",
    href: "/manager/xem-thong-ke-doanh-thu",
  },
  {
    title: "Xem thống kê thu",
    href: "/manager/xem-thong-ke-thu",
  },
  {
    title: "Xem thống kê chi",
    href: "/manager/xem-thong-ke-chi",
  },
  {
    title: "Xem thống kê phí duy trì",
    href: "/manager/xem-thong-ke-phi-duy-tri",
  },
  {
    title: "Xem thống kê phí nhập hàng",
    href: "/manager/xem-thong-ke-phi-nhap-hang",
  },
];
const warehousestaff = [
  {
    title: "Xuất kho",
    href: "/warehousestaff/xuat-kho",
  },
  {
    title: "Nhập kho",
    href: "/warehousestaff/nhap-kho",
  },
];
