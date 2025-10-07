import React, { useEffect } from "react";
import { LinkOutlined } from "@ant-design/icons"
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../../images/hero-bg.png";
import logo from "../../images/logo.png";
import anh1 from "../../images/anh1.jpg";
import anh2 from "../../images/anh2.jpg";
import anh4 from "../../images/anh4.jpg";
import anh5 from "../../images/anh5.jpg";

import anhMenu1 from "../../images/imagesMenu/anh1.jpg";
import anhMenu2 from "../../images/imagesMenu/anh2.jpg";
import anhMenu3 from "../../images/imagesMenu/anh3.jpg";
import anhMenu4 from "../../images/imagesMenu/anh4.jpg";
import anhMenu5 from "../../images/imagesMenu/anh5.jpg";
import anhMenu6 from "../../images/imagesMenu/anh6.jpg";
import anhMenu7 from "../../images/imagesMenu/anh7.jpg";
import anhMenu8 from "../../images/imagesMenu/anh8.jpg";
import anhMenu9 from "../../images/imagesMenu/anh9.jpg";
import anhMenu10 from "../../images/imagesMenu/anh10.jpg";
import anhMenu11 from "../../images/imagesMenu/anh11.jpg";
import anhMenu12 from "../../images/imagesMenu/anh12.jpg";
import anhMenu13 from "../../images/imagesMenu/anh13.jpg";
import anhMenu14 from "../../images/imagesMenu/anh14.jpg";
import anhMenu15 from "../../images/imagesMenu/anh15.jpg";
import anhMenu16 from "../../images/imagesMenu/anh16.jpg";
import anhMenu17 from "../../images/imagesMenu/anh17.jpg";
import anhMenu19 from "../../images/imagesMenu/anh19.png";


import anhSection1 from "../../images/imagesSection5/anh1.png";
import anhSection2 from "../../images/imagesSection5/anh2.png";
import anhSection3 from "../../images/imagesSection5/anh3.png";
import anhSection4 from "../../images/imagesSection5/anh4.png";
import anhSection5 from "../../images/imagesSection5/anh5.png";
import anhSection6 from "../../images/imagesSection5/anh6.png";
import anhSection7 from "../../images/imagesSection5/anh7.png";
import anhSection8 from "../../images/imagesSection5/anh8.png";

import "./home.scss";

const menuImages = [
  [anhMenu1, anhMenu2],
  [anhMenu3, anhMenu4],
  [anhMenu5, anhMenu6],
  [anhMenu7, anhMenu8],
  [anhMenu9, anhMenu10],
  [anhMenu11, anhMenu12],
  [anhMenu13, anhMenu14],
  [anhMenu15, anhMenu16],
  [anhMenu17, anhMenu19],
];

function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home">
      <div className="home-section1">
        <img src={background} alt="hero" />
      </div>

      <div className="home-section2">
        <div className="container">
          <div className="home-section2__menu">
            <div className="home-section2__inerleft">
              <div className="home-section2__inerleft--logo">
                <img src={logo} alt="logo" />
                <span>qzain</span>
                <span className="home-section2__inerleft--span">.</span>
              </div>

              <div className="home-section2__inerleft--title">
                <h1>
                  Multistep <br /> Quiz Form
                </h1>
                <p>
                  Form is a pixel perfect multistep form. It was designed to
                  promote your mobile App, services or business projects
                </p>
              </div>

              <button className="home-section2__inerleft--button">
                Purchase Now
              </button>
            </div>

            <div className="home-section2__ineright">
              <div className="home-section2__img1">
                <img src={anh1} alt="img1" />
                <div className="home-section2__img2">
                  <img src={anh2} alt="img2" />
                  <div className="home-section2__img3">
                    <img src={anh4} alt="img3" />
                    <div className="home-section2__img4">
                      <img src={anh5} alt="img4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-section3 reveal">
        <div className="container">
          <h2>19+</h2>
          <h3>Unique Quiz Design</h3>
        </div>
      </div>

      <div className="home-section4 reveal">
        <div className="container">
          {menuImages.map((pair, idx) => (
            <div className="home-section4__menu reveal" key={idx}>
              <div className="row">
                {pair.map((imgSrc, j) => (
                  <div className="col-6" key={j}>
                    <div className="block-single">
                      <div className="block-img">
                        <img src={imgSrc} alt={`menu-${idx}-${j}`} />
                      </div>

                      <div className="block-overlay">
                        <div className="center-circle"><span><LinkOutlined /></span></div>
                        <div className="rtl-box">RTL</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-section5 reveal">
        <div className="container">
          <h1>Core Features</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="home-section5__menu">
                <div className="home-section5__bock">
                  <img src={anhSection1} />
                </div>
                <h3>Built with HTML5</h3>
              </div>

            </div>

            <div className="col-md-3">
              <div className="home-section5__menu">
                <div className="home-section5__bock">
                  <img src={anhSection2} />
                </div>
                <h3>Bootstrap v5</h3>
              </div>

            </div>

            <div className="col-md-3">
              <div className="home-section5__menu">
                <div className="home-section5__bock">
                  <img src={anhSection3} />
                </div>
                <h3>Proffesional Code</h3>
              </div>

            </div>

            <div className="col-md-3">
              <div className="home-section5__menu">
                <div className="home-section5__bock">
                  <img src={anhSection4} />
                </div>
                <h3>Cross Browser Compatible</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="home-section5__menu">
                <div className="home-section5__bock">
                  <img src={anhSection5} />
                </div>
                <h3>Free Google Fonts</h3>

              </div>

            </div>

            <div className="col-md-3">
              <div className="home-section5__menu">
                <div className="home-section5__bock">
                  <img src={anhSection6} />
                </div>
                <h3>Well Documented</h3>
              </div>

            </div>


            <div className="col-md-3">
              <div className="home-section5__menu">
                <div className="home-section5__bock">
                  <img src={anhSection7} />
                </div>
                <h3>Easy to customize</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="home-section5__menu">
                <div className="home-section5__bock">
                  <img src={anhSection8} />
                </div>
                <h3>Fully Responsive</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
