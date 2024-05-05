const PRODUCT_PATH = "/product";
const PROFILE_PATH = "/profile";

const PATHS = {
  HOME: "/",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PRODUCT: {
    INDEX: PRODUCT_PATH,
    DETAIL: PRODUCT_PATH + "/:productID",
  },
  PROFILE: {
    INDEX: PROFILE_PATH,
  },
};

export default PATHS;
