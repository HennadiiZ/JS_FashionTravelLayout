
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
  })
}
animateSlides();
