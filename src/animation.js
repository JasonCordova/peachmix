import gsap from 'gsap';

const animation = () => {

    let ctx = gsap.context(() => {
      
        var timeline = gsap.timeline();

        timeline.to(".loader-text span", {
            duration: .8,
            delay: 0.2,
            y: 0,
            yPercent: 0,
            ease: "back.inOut",
            stagger: {each: 0.03,}
        });

        timeline.to(".loader-holder", {
            duration: 1,
            delay: 0.5,
            top: "-125%",
            ease: "power4.in",
        }, ">");

        timeline.to(".mode-button", {
        duration: 1.2,
        delay: 0.3,
        y: 0,
        yPercent: 0,
        ease: "back.inOut",
        stagger: {each: 0.05,}
        }, "<");

    });

    return () => {
        ctx.revert();
    }

};

export default animation;