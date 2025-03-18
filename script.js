var tl = gsap.timeline();
tl.from(".line h1",{
    y:150,
    stagger:0.2,
    duration:0.6,
    delay:0.4
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
    animationName:"anime",
    opacity:1
})

tl.to("#loader",{
    opacity:0,
    duration:0.4,
    delay:3.8
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