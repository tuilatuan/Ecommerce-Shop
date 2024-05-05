import { useParams, useNavigate } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";
import { message } from "antd";

const useProductDetail = () => {
  const { productID } = useParams();
  const navigate = useNavigate();
  const { data: productData } = useQuery(
    () => productService.getProductDetail(productID),
    [productID]
  );

  const { data: cateData } = useQuery(productService.getAllCategory);
  const product = productData?.product;
  const categories = cateData?.data.categories || {};

  const onUpdateProduct = async (data) => {
    console.log(data);

    try {
      const res = await productService.updateProduct(data);
      console.log("res :>> ", res);
      if (res.status == 200) {
        message.success("Cập nhật thành công ");
        navigate(`/products/${product.slug}`);
      } else {
        message.error("Cập nhật thất bại ");
        navigate(`/products/${product.slug}`);
      }
    } catch (error) {}
  };

  const productProps = { product, onUpdateProduct };

  return { productProps, categories };
};

export default useProductDetail;
