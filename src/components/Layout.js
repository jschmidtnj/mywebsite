import React from "react";

import Navbar from "./Navbar";
import "./all.sass";
import HeaderStart from "./HeaderStart";

const TemplateWrapper = ({ children }) => (
  <div>
    <HeaderStart />
    <Navbar />
    <div>{children}</div>
  </div>
);

export default TemplateWrapper;
