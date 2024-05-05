import React, { useState } from "react";
import Input from "../../component/Input";
import { MESSAGE, REGREX } from "../../contants/regex";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/format";
import { Select, message } from "antd";
import { orderService } from "../../services/orderService";
import useQuery from "../../hooks/useQuery";
import Button from "../../component/Button";
import useCheckoutPage from "./useCheckoutPage";

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const { checkoutProps, handleCheckout } = useCheckoutPage();
  const [typeship, settypeship] = useState(1);
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);
  const { data: shippingData } = useQuery(orderService.getShipping);
  const shippingArray = shippingData?.data?.shippingTypes || {};
  var transformedShippingArray = [];
  if (shippingArray?.length > 0) {
    transformedShippingArray = shippingArray?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }

  let total = 0;

  if (cartInfo.length > 0) {
    cartInfo?.map((product) => (total = total + product.subTotal));
  }

  if (typeship == 2 || typeship == 3) {
    total = total + shippingArray[typeship - 1].price;
  }

  var shippingChoice = shippingArray[typeship - 1];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onChangeTypeShip = (data) => {
    settypeship(data);
  };

  const _onSubmit = (data) => {
    if (!data.check) {
      message.warning("Bạn chưa xác nhân");
      return false;
    } else {
      const payload = {
        address: data.address,
        id_statusOrder: 1,
        id_shippingtype: shippingChoice.id,
      };
      handleCheckout?.(payload);
    }
  };
  return (
    <div>
      {/* BREADCRUMB */}
      <div id="breadcrumb" className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-md-12">
              <h3 className="breadcrumb-header">Checkout</h3>
              <ul className="breadcrumb-tree">
                <li>
                  <a href="#">Home</a>
                </li>
                <li className="active">Checkout</li>
              </ul>
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* /BREADCRUMB */}
      {/* SECTION */}
      <div className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <form className="row" onSubmit={handleSubmit(_onSubmit)}>
            <div className="col-md-7">
              {/* Billing Details */}
              <div className="billing-details">
                <div className="section-title">
                  <h3 className="title">Billing address</h3>
                </div>
                <Input
                  placeholder="Address"
                  {...register("address", {
                    required: MESSAGE.require,
                  })}
                  errors={errors?.address?.message || ""}
                />
                <Input
                  name="Phone"
                  required
                  placeholder="Your Phone"
                  {...register("phone", {
                    required: MESSAGE.require,
                    pattern: {
                      value: REGREX.phone,
                      message: MESSAGE.phone,
                    },
                  })}
                  errors={errors?.phone?.message || ""}
                />
                <Input
                  name="typeship"
                  renderInput={() => {
                    return (
                      <>
                        <Select
                          style={{
                            width: "100%",
                          }}
                          className="customSelect form-control"
                          suffixIcon={<></>}
                          placeholder="Please select type ship"
                          options={transformedShippingArray}
                          value={typeship}
                          defaultValue={typeship}
                          onChange={_onChangeTypeShip}
                        />
                      </>
                    );
                  }}
                />
              </div>
            </div>
            {/* Order Details */}
            <div className="col-md-5 order-details">
              <div className="section-title text-center">
                <h3 className="title">Your Order</h3>
              </div>
              <div className="order-summary">
                <div className="order-col">
                  <div>
                    <strong>PRODUCT</strong>
                  </div>
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                </div>
                {cartInfo?.length > 0 && (
                  <div className="order-products">
                    {cartInfo.map((product, index) => {
                      const { quantity, subTotal, Product } = product || {};
                      const { name } = Product || {};
                      return (
                        <div className="order-col" key={product.id || index}>
                          <div>
                            {quantity} x {name}
                          </div>
                          <div>{formatCurrency(subTotal)}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="order-col">
                  <div>{shippingChoice?.name}</div>
                  <div>
                    <strong>{formatCurrency(shippingChoice?.price)}</strong>
                  </div>
                </div>
                <div className="order-col">
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                  <div>
                    <strong className="order-total">{formatCurrency(total)}</strong>
                  </div>
                </div>
              </div>
              {/* <div className="payment-method">
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-1" />
                  <label htmlFor="payment-1">
                    <span />
                    Direct Bank Transfer
                  </label>
                  <div className="caption">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-2" />
                  <label htmlFor="payment-2">
                    <span />
                    Cheque Payment
                  </label>
                  <div className="caption">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
                <div className="input-radio">
                  <input type="radio" name="payment" id="payment-3" />
                  <label htmlFor="payment-3">
                    <span />
                    Paypal System
                  </label>
                  <div className="caption">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div> */}
              <div className="input-checkbox">
                <Input
                  type="checkbox"
                  name="check"
                  className="customCheckbox"
                  {...register("check", {})}
                  // errors={errors?.check && message.warning("Bạn chưa xác thực")}
                />
                <label htmlFor="terms">
                  <span />
                  I've read and accept the <a href="#">terms &amp; conditions</a>
                </label>
              </div>
              <Button
                className="primary-btn order-submit"
                style={{ width: "100%" }}
                type="submit"
              >
                Place order
              </Button>
            </div>
            {/* /Order Details */}
          </form>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* /SECTION */}
      {/* NEWSLETTER */}
      <div id="newsletter" className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-md-12">
              <div className="newsletter">
                <p>
                  Sign Up for the <strong>NEWSLETTER</strong>
                </p>
                <form>
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter Your Email"
                  />
                  <button className="newsletter-btn">
                    <i className="fa fa-envelope" /> Subscribe
                  </button>
                </form>
                <ul className="newsletter-follow">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-pinterest" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* /NEWSLETTER */}
    </div>
  );
};

export default CheckoutPage;
