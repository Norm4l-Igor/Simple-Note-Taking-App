import React from "react";
import styled from "styled-components";

const Switch = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input
          id="input"
          type="checkbox"
          checked={isDarkMode}
          onChange={onToggleDarkMode}
        />
        <div className="slider round">
          <div className="sun-moon">
            <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
            <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={50} />
            </svg>
          </div>
          <div className="stars">
            <svg id="star-1" className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
            </svg>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch #input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2196f3;
    transition: 0.4s;
    border-radius: 34px;
    overflow: hidden;
  }

  .sun-moon {
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: yellow;
    transition: 0.4s;
    border-radius: 50%;
  }

  #input:checked + .slider {
    background-color: black;
  }

  #input:checked + .slider .sun-moon {
    transform: translateX(26px);
    background-color: white;
  }

  .moon-dot {
    opacity: 0;
    transition: 0.4s;
    fill: gray;
  }

  .stars {
    transform: translateY(-32px);
    opacity: 0;
    transition: 0.4s;
  }

  .star {
    fill: white;
    position: absolute;
    transition: 0.4s;
  }

  #input:checked + .slider .stars {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default Switch;
