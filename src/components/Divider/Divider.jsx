import React from "react";

const Divider = ({ text }) => {
  return   <div className="container my-3">
  <div className="d-flex align-items-center">
    <div className="flex-grow-1 text-secondary border-black-50 border-top"></div>
    <span className="mx-5 fw-bold text-black-50 fs-6">{text}</span>
    <div className="flex-grow-1 border-top border-black-50"></div>
  </div>
</div>
};

export default Divider;
