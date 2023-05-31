import React, { useState } from "react";
import Slider from "react-slick";
import { Modal } from "antd";

import homeimg1 from "../../../../assets/images/PNGS/homeimg1.png";
import { ReactComponent as Arrowright } from "../../../../assets/images/SVGS/rightarrow.svg";
import { ReactComponent as Arrowleft } from "../../../../assets/images/SVGS/leftarrow.svg";

export default function SimpleSlider({ imagesData = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrowright />,
    prevArrow: <Arrowleft />,
  };

  return (
    <>
      <Slider {...settings}>
        {imagesData.length > 0 ? (
          imagesData.map((el, index) => {
            return (
              <div className="images" key={index}>
                <img
                  src={el.imageUrl}
                  alt="images"
                  onClick={() => openModal(index)}
                />
              </div>
            );
          })
        ) : (
          <div className="images">
            <img
              src={homeimg1}
              alt="images"
              onClick={() => openModal(0)}
            />
          </div>
        )}
      </Slider>
      <Modal
        title="Image Slider"
        centered
        visible={modalOpen}
        onCancel={closeModal}
        footer={null}
        width={1300}
        bodyStyle={{
          textAlign: "center",
          height: "80%",
          overflow: "hidden",
        }}
      >
        <Slider
          {...settings}
          initialSlide={selectedImageIndex}
          style={{ height: "100%" }}
        >
          {imagesData.map((el, index) => (
            <div className="image-fuid caurosel-image" key={index}>
              <img
                src={el.imageUrl}
                alt="images"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </Slider>
      </Modal>


    </>
  );
}
