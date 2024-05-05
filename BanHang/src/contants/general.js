export const MODAL_TYPE = {
  login: "login",
  register: "register",
};
export const THUNK_STATUS = {
  pending: "pending",
  fullfilled: "fullfilled",
  rejected: "rejected",
};
export const PRICE_FIlTER = {
  minPrice: 0,
  maxPrice: 70000000,
};
export const SHIPPING_OPTIONS = [
  {
    id: 1,
    label: "Free Shipping",
    price: 0,
  },
  {
    id: 2,
    label: "Standard",
    price: 10000,
  },
  {
    id: 3,
    label: "Express",
    price: 20000,
  },
];

export const STATUSORDER = [
  {
    value: 1,
    label: "Đã xác nhận",
  },
  {
    value: 2,
    label: "Đang chuẩn bị hàng",
  },
  {
    value: 3,
    label: "Đã gửi hàng",
  },
  {
    value: 4,
    label: "Đang vận chuyển",
  },
  {
    value: 5,
    label: "Giao hàng thành công",
  },
  {
    value: 6,
    label: "Giao hàng thất bại",
  },
];
