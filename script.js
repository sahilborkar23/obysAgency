function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadingAnimation(){
    var tl = gsap.timeline();
tl.from(".line h1",{
    y:150,
    stagger:0.2,
    duration:0.6,
    delay:0.4
});

tl.from(".waiting h3", {
    opacity: 0,  // Start from invisible
    duration: 0.6,  
    stagger: 0.2,  
    delay: 1       // Delay before starting
});


tl.from("#line1part1",{
    opacity:0,
    onStart: function(){
        var h5timer = document.querySelector("#line1part1 h5")
        var grow = 0;
        setInterval(() => {
            if(grow<100){
                h5timer.innerHTML = grow++;
            }else{
                h5timer.innerHTML = grow; 
            }
        }, 30);
    },
});

tl.to(".line h2",{
    animationName:"loaderAnime",
    opacity:1
})

tl.to("#loader",{
    opacity:0,
    duration:0.4,
    delay:3.8
});

tl.from("#page1",{
    delay:0.1,
    y:1200,
    opacity:0,
    duration:0.7,
})
  
tl.to("#loader",{
    display:"none"
})

tl.from("#nav",{
    opacity:0
})


tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1",{
    y:120,
    stagger:0.1
})
tl.from("#hero1, #page2",{
    opacity:0,
},"-=0.8");
}

function cursoranimation(){
    Shery.mouseFollower({
        skew: true,
        duration: 1,
      });
    Shery.makeMagnet("#nav-part2 h4");
    Shery.makeMagnet(".svgs");

    var videoContainer = document.querySelector("#videocontainer");
    var video = document.querySelector("#videocontainer video")
    videoContainer.addEventListener("mouseenter",function(){
        videoContainer.addEventListener("mousemove",function(dets){
            gsap.to(".mousefollower",{
                opacity:0
            });
            gsap.to("#videocursor",{
                left:dets.x - 500 ,
                y:dets.y - 100,
            });
        });
    });
    videoContainer.addEventListener("mouseleave",function(){
        gsap.to(".mousefollower",{
            opacity:1,
        });
        gsap.to("#videocursor",{
            left:"70%",
            top:"-15%",
        });
    });

    var flag = 0
    videoContainer.addEventListener("click",function(){
        if(flag == 0){
            video.play()
            video.style.opacity = 1
            document.querySelector("#videocursor").innerHTML = '<i class="ri-pause-mini-fill"></i>'
            gsap.to("#videocursor",{
                scale:0.5
            })
            flag = 1
        }else{
            video.pause()
            video.style.opacity = 0
            document.querySelector("#videocursor").innerHTML = '<i class="ri-play-mini-fill"></i>'
            gsap.to("#videocursor",{
                scale:1
            })
            flag = 0
        }           
    })

}

function sheryAnimation(){
    Shery.imageEffect(".imgContainer", {
        style: 5,
        config:{"a":{"value":30,"range":[0,30]},"b":{"value":-1,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7586245603532141},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0.02}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4.95,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.34,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0,"range":[0,10]},"metaball":{"value":0.7,"range":[0,2]},"discard_threshold":{"value":0.8,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.56,"range":[0,2]},"noise_scale":{"value":9.92,"range":[0,100]}},
        gooey:true
      });
}


loadingAnimation()
cursoranimation()
locomotiveAnimation()
sheryAnimation()


let moveFlag = true; // Control movement

document.addEventListener("mousemove", function (dets) {
    if (moveFlag) {
        gsap.to("#flag", {
            x: dets.x - document.querySelector("#flag").offsetWidth / 2,
            y: dets.y - document.querySelector("#flag").offsetHeight / 2,
        });
    }
});

document.querySelector("#hero3").addEventListener("mouseenter", function () {
    moveFlag = true; // Enable movement
    gsap.to("#flag", { opacity: 1, duration: 0.5 });
});

document.querySelector("#hero3").addEventListener("mouseleave", function () {
    moveFlag = false; // Disable movement
    gsap.to("#flag", { opacity: 0, duration: 0.5 });
});