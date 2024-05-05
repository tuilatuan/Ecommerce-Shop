const PRODUCT_PATH = "/products";
const PROFILE_PATH = "/profile";
const ORDER_PATH = "/order";

const ACCOUNT_PATH = "/account";
const PATHS = {
  HOME: "/",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDER: {
    INDEX: ORDER_PATH,
    DETAIL: "/orderDetail/:orderID",
  },
  PRODUCT: {
    INDEX: PRODUCT_PATH,
    DETAIL: PRODUCT_PATH + "/:productID",
    CATE: PRODUCT_PATH + "/cate",
    NEW: PRODUCT_PATH + "/new",
  },
  ACCOUNT: {
    INDEX: ACCOUNT_PATH,
    NEW: ACCOUNT_PATH + `/new`,
  },
  OTHER: "/other",
  USER: "/user",
  PROFILE: {
    INDEX: PROFILE_PATH,
  },
};

export default PATHS;
