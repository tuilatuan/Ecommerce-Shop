export const formatCurrency = (value) => {
  // Chuyển đổi số thành chuỗi và đảm bảo là kiểu số
  value = Number(value);

  // Kiểm tra xem giá trị có phải là một số hợp lệ không
  if (isNaN(value)) {
    return "Không hợp lệ";
  }

  // Chuyển đổi số thành chuỗi với dấu phân cách hàng nghìn
  let formattedValue = value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formattedValue;
};
