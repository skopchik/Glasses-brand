"use strict";

const animateItems = document.querySelectorAll(".animate-items");

if (animateItems.length > 0) {

    function getElementOffset(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = (window.pageXOffset || document.documentElement.scrollLeft);
        const scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
        };
    }

    function animateOnScroll() {
        for (let index = 0; index < animateItems.length; index++) {
            const animateItem = animateItems[index];
            const animateItemHeight = animateItem.offsetHeight;
            const animateItemOffset = getElementOffset(animateItem).top;
            const animateStart = 4;

            let animateItemPoint = window.innerHeight - animateItemHeight / animateStart;
            if (animateItemHeight > window.innerHeight) {
                animateItemPoint = window.innerHeight - window.innerHeight / animateStart;
            }

            if ((pageYOffset > (animateItemOffset - animateItemPoint)) && (pageYOffset < (animateItemOffset + animateItemHeight))) {
                animateItem.classList.add("active");
            } else {
                if (!animateItem.classList.contains("animate-hide")) {
                    animateItem.classList.remove("active");
                }
            }
        }
    }

    window.addEventListener("scroll", animateOnScroll);

    setTimeout(() => {
        animateOnScroll();
    }, 200);

}


