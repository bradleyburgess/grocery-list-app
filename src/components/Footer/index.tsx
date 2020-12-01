import { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./Footer.module.scss";

const Footer = () => {
  const [height, setHeight] = useState({
    app: 0,
    window: 0,
  });

  const updateHeight = () => {
    const wHeight: number = window.innerHeight;
    const aHeight: number = (document.querySelector("#app") as HTMLElement)
      .offsetHeight;

    if (wHeight !== height.window || aHeight !== height.app)
      setHeight({
        app: aHeight,
        window: wHeight,
      });
  };

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    updateHeight();

    return () => window.removeEventListener("resize", updateHeight);
  });

  const classes = classNames({
    [styles.footer]: true,
    [styles.absolute]: height.window > height.app + 50,
  });

  return (
    <footer className={classes}>Copyright © 2020. Bradley Burgess.</footer>
  );
};

export default Footer;
