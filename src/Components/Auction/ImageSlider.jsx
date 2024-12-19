import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Icon, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
function ImageSlider({ imageLinks }) {
  const [index, setIndex] = useState(0);

  function handleLeftClick() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function handleRightClick() {
    if (index < imageLinks.length - 1) setIndex((i) => i + 1);
  }

  return (
    <div style={{ width: "100%", position: "relative", marginTop: 25 }}>
      <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
        {imageLinks.map((key) => (
          <Image key={key} src={key} className="workoutImage" style={{ translate: `${-100 * index}%` }} />
        ))}
      </div>
      <button onClick={handleLeftClick} className="img-slider-btn" style={{ left: 0 }}>
        <ChevronLeftIcon fontSize="large" color="#006340" />
      </button>
      <button onClick={handleRightClick} className="img-slider-btn" style={{ right: 0 }}>
        <ChevronRightIcon fontSize="large" color="#006340" />
      </button>
      <div
        style={{
          display: "flex",
          gap: ".25rem",
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
        }}
      >
        {imageLinks.map((id, i) =>
          i == index ? (
            <>
              <Icon as={MdRadioButtonChecked} key={id} className="img-slider-dot" color="#006340" />
              {/* <RadioButtonCheckedOutlinedIcon key={id} className="img-slider-dot" sx={{ color: "white" }} /> */}
            </>
          ) : (
            <Icon as={MdOutlineRadioButtonUnchecked} key={id} className="img-slider-dot" color="#006340" />
          )
        )}
      </div>
    </div>
  );
}

export default ImageSlider;
