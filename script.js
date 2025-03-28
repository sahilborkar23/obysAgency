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
    // delay:0.4
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
        }, 33);
    },
});

tl.to(".line h2",{
    animationName:"loaderAnime",
    opacity:1
})

tl.to("#loader",{
    opacity:0,
    // duration:0.4,
    // delay:3.8
});

tl.from("#page1",{
    delay:0.2,
    y:1200,
    opacity:0,
    duration:0.7
    // ease:power4
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
    Shery.imageEffect(".image-div", {
        style: 5,
        debug: true,
        gooey:true
      });
}
loadingAnimation()
cursoranimation()
locomotiveAnimation()
sheryAnimation()