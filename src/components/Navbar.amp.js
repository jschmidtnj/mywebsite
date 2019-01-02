import React from "react";
//import Helmet from "react-helmet";
/*
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
*/
import logo from "../img/logo.svg";

const NavbarAmp = class extends React.Component {
  render() {
    return (
      <div>
        {/* Start Navbar */}
        <amp-sidebar id="sidebar" layout="nodisplay" side="right">
          <amp-img
            class="amp-close-image"
            src={logo}
            width="20"
            height="20"
            alt="close sidebar"
            on="tap:sidebar.close"
            role="button"
            tabindex="0"
          />
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li> Nav item 1</li>
            <li>
              <amp-fit-text
                width="220"
                height="20"
                layout="responsive"
                max-font-size="24"
              >
                Nav item 2 - &lt;amp-fit-text&gt;
              </amp-fit-text>
            </li>
            <li>
              <amp-fit-text
                width="220"
                height="20"
                layout="responsive"
                max-font-size="24"
              >
                Nav item 3 - &lt;amp-fit-text&gt; longer text
              </amp-fit-text>
            </li>
            <li>
              {" "}
              Nav item 4 - Image
              <amp-img
                class="amp-sidebar-image"
                src={logo}
                width="20"
                height="20"
                alt="an image"
              />
            </li>
            <li> Nav item 5</li>
            <li> Nav item 6</li>
          </ul>
        </amp-sidebar>
        {/* End Navbar */}
        <button on="tap:sidebar.toggle" class="ampstart-btn caps m2">
          Toggle sidebar
        </button>
      </div>
    );
  }
};

export default NavbarAmp;
