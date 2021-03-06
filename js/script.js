
//================================================================
// old-school

// const hikeExp = document.querySelector(".hike-exp");
// window.addEventListener("scroll", scrollReveal);
// function scrollReveal(){
//     console.log(hikeExp);
//     console.log(111);
// }

//================================================================
// another way - getBoundingClientRect()

// const hikeExp = document.querySelector(".hike-exp");
// window.addEventListener("scroll", scrollReveal);
// - //-1
// function scrollReveal(){ 
//     const hikePos = hikeExp.getBoundingClientRect();
//     console.log(hikePos);
//     // what I get:
//     // DOMRect {x: 641.3515625, y: 1253, width: 126.0703125, height: 53.5, top: 1253, …}
//     // bottom: 1306.5
//     // height: 53.5
//     // left: 641.3515625
//     // right: 767.421875
//     // top: 1253
//     // width: 126.0703125
//     // x: 641.3515625
//     // y: 1253
// }

// - //-2
// function scrollReveal(){ 
//     const hikePos = hikeExp.getBoundingClientRect().top;
//     console.log(hikePos);
//     // what I get: 1290 ... and so on ... to zero and below
//     if(hikePos < 0){
//         alert("hello")
//     }
// }

// - //-3
// function scrollReveal(){ 
//     const hikePos = hikeExp.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight
//     console.log(windowHeight);
//     // what I get:  600 px; or any other height of a window

//     if(hikePos < windowHeight){
//         console.log("hello");
//     }
// }

// - //-4
// function scrollReveal(){ 
//     const hikePos = hikeExp.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight / 1.5;
//     console.log(windowHeight);
//     // what I get:  600 px; or any other height of a window

//     if(hikePos < windowHeight){
//         console.log("hello");
//         hikeExp.style.color = 'red';
//     }
// }


//================================================================
// scroll is not that effective , so we need INTERSECTION OBSERVER API
// https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API

// const slide = document.querySelector(".slide");
// const hike = document.querySelector(".hike");

// // let options = {
// //     root: document.querySelector('#scrollArea'),
// //     rootMargin: '0px',
// //     threshold: 1.0
// // }

// let options = {
//     // threshold: 1.0
//     threshold: 0.9
// }
// let observer = new IntersectionObserver(slideAnimation, options);
// function slideAnimation(entries) {
//   entries.forEach(entry =>{
//      console.log(entry); // IntersectionObserverEntry {time: 1837.8999999761581, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: false, …}
//   });
// };
// observer.observe(slide);
// observer.observe(hike);

//================================================================
// 

// const slide = document.querySelector(".slide");
// const hike = document.querySelector(".hike");

// let options = {
//     threshold: 1.0
// }
// let observer = new IntersectionObserver(slideAnimation, options);
// function slideAnimation(entries) {
//   entries.forEach(entry =>{
     
//     if(entry.isIntersecting){
//        slide.style.background = 'white';
//     }
//   });
// };
// observer.observe(slide);
// observer.observe(hike);

//================================================================
//scrollMagic
// https://scrollmagic.io/


// const controller = new ScrollMagic.Controller(); 

// const exploreScene = new ScrollMagic.Scene({
//       triggerElement:'.hike-exp',
//       triggerHook: 0.5
//     // triggerHook: 0.25
//     // triggerHook: 0 //up
//     // triggerHook: 1 // down
// })
// // .addIndicators({colorStart: "white", colorTrigger: "white"})
// // .addTo(controller);
// .addIndicators({colorStart: "white", colorTrigger: "white"})
// .setClassToggle('.hike-exp', 'active')
// .addTo(controller);

//================================================================
//Gsap
let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    // gsap.to(revealImg, 1,{ x: "100%"})
    // gsap.to(revealImg, 1,{ x: "100%", opacity: .5})

    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" }
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false
    })
    .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide"
      // })
      .addTo(controller);
    //New ANimation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    //Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0
    })
    // .addIndicators({
    //   colorStart: "white",
    //   colorTrigger: "white",
    //   name: "page",
    //   indent: 200
    // })
    .setPin(slide, { pushFollowers: false })
    .setTween(pageTl)
    .addTo(controller);
  
  })
}
animateSlides();
//================================================================
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
window.addEventListener("mousemove", cursor);

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}
window.addEventListener("mouseover", activeCursor);

//================================================================

burger.addEventListener("click", navToggle);
function navToggle(e) {
    if (!e.target.classList.contains("active")) {
      e.target.classList.add("active");
      gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
      gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
      gsap.to("#logo", 1, { color: "black" });
      gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
      document.body.classList.add("hide");
    } else {
      e.target.classList.remove("active");
      gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
      gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
      gsap.to("#logo", 1, { color: "white" });
      gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
      document.body.classList.remove("hide");
    }
  }

//================================================================
//Barba Page Transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      }
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      }
    }
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        //Scroll to the top
        window.scrollTo(0, 0);
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },

          { x: "100%", stagger: 0.2, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      }
    }
  ]
});

// 
function detailAnimation() {
    controller = new ScrollMagic.Controller();
    const slides = document.querySelectorAll(".detail-slide");
    slides.forEach((slide, index, slides) => {
      const slideTl = gsap.timeline({ defaults: { duration: 1 } });
      let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
      const nextImg = nextSlide.querySelector("img");
      slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
      slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
      slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
      //Scene
      detailScene = new ScrollMagic.Scene({
        triggerElement: slide,
        duration: "100%",
        triggerHook: 0
      })
        .setPin(slide, { pushFollowers: false })
        .setTween(slideTl)
        // .addIndicators({
        //   colorStart: "white",
        //   colorTrigger: "white",
        //   name: "detailScene"
        // })
        .addTo(controller);
    });
}
detailAnimation();