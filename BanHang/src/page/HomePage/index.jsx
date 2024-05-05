import React, { useEffect } from "react";
import useHomePage from "../../hooks/useHomePage";
import RecomentProduct from "./RecomentProduct";
import TopSelling from "./TopSelling";
import NewProduct from "./NewProduct";
import PATHS from "../../contants/paths";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { newProducts, hotProduct } = useHomePage();
  useEffect(() => {
    $(".products-slick").each(function () {
      var $this = $(this),
        $nav = $this.attr("data-nav");
      $this.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        speed: 300,
        dots: false,
        arrows: true,
        appendArrows: $nav ? $nav : false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    });
  }, [newProducts, hotProduct]);
  return (
    <div>
      <RecomentProduct />
      {/* /SECTION */} {/* SECTION */}
      <NewProduct newProducts={newProducts} />
      {/* /SECTION */} {/* HOT DEAL SECTION */}
      <div id="hot-deal" className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-md-12">
              <div className="hot-deal">
                <ul className="hot-deal-countdown">
                  <li>
                    <div>
                      <h3>02</h3>
                      <span>Days</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>10</h3>
                      <span>Hours</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>34</h3>
                      <span>Mins</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>60</h3>
                      <span>Secs</span>
                    </div>
                  </li>
                </ul>
                <h2 className="text-uppercase">hot deal this week</h2>
                <p>New Collection Up to 50% OFF</p>
                <Link className="primary-btn cta-btn" to={PATHS.PRODUCT.INDEX}>
                  Shop now
                </Link>
              </div>
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* /HOT DEAL SECTION */} {/* SECTION */}
      <TopSelling hotProduct={hotProduct} />
      {/* /SECTION */} {/* NEWSLETTER */}
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
      <div>{/* <SpeechToText /> */}</div>
    </div>
  );
};

export default HomePage;
