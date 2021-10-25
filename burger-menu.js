"use strict";
const menuBtn = document.querySelector(".menu-button");
const menu = document.querySelector(".navbar-panel");
const menuCloseBtn = document.querySelector(".menu-button-close");

const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
          position: fixed;
          width: 100%;
          height: 100vh;
          left: 0;
          top: ${-window.scrollY}px;
          overflow: hidden;
          padding-right: ${widthScroll}px;
      `;
};

const enableScroll = () => {
    document.body.style.cssText = "";
    window.scroll({
        top: document.body.dbScrollY,
    });
};

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("is-open");
    disableScroll();
});
menuCloseBtn.addEventListener("click", () => {
    menu.classList.remove("is-open");
    enableScroll();
});
