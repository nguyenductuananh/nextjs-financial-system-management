export const getFunction = (role) => {
  switch (role) {
    case "saler": {
      return [...all, ...saler];
    }
    case "manager": {
      return [...all, ...manager];
    }
    case "staff2": {
      return [...all, ...staff];
    }
    default: {
      return [...all, ...manager, ...staff, ...saler];
    }
  }
};
const saler = [
  { title: "Thêm hóa đơn", href: "/saler/xu-li-hoa-don" },
  { title: "Nhập phí duy trì", href: "/saler/them-phi-duy-tri" },
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
];
const staff = [
  {
    title: "Xuất kho",
    href: "/staff/xuat-kho",
  },
  {
    title: "Nhập kho",
    href: "/staff/nhap-kho",
  },
];
const all = [
  {
    title: "Thêm loại đồng hồ",
    href: "/them-loai",
  },
  {
    title: "Thêm đồng hồ",
    href: "/them-mat-hang",
  },
];
