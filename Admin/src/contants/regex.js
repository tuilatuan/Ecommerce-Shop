export const REGREX = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};
export const MESSAGE = {
  require: "Please Enter Your Info! ",
  email: "Please Enter Format Email!",
  phone: "Please Enter Format Phone",
  password: {
    regex: "Please Enter Format Password!",
    length: "Length Better Than 6!",
  },
};
