"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import cube from "@/assets/cube.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const bgColor = "#ffffff";
  const secondColor = "#1162fb";
  const textColor = "#000000";
  const parallax = useRef();
  const bgRef = useRef();
  const descriptionRef = useRef();
  const descContainerRef = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallax.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      tl.to(bgRef.current, { y: "+=300" }, -1);
      tl.to(descriptionRef.current, { opacity: 1 }, 1);
      tl.to(descContainerRef.current, { margin: 0 }, 1);
    });
    return () => ctx.revert();
  }, []);
  return (
    <>
      <div
        className="h-screen relative -z-20"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <Image
          ref={bgRef}
          src={cube}
          alt="cube"
          className="w-screen h-screen absolute -z-10 object-cover"
        />
        {/* container */}
        <div
          className="w-screen h-screen relative"
          style={{ color: textColor }}
        >
          {/* Nav */}
          <div
            className="h-20 top-0 left-0 bg-white opacity-35 z-10 w-screen absolute"
            style={{ color: textColor }}
          ></div>
          {/* body */}
          <div className="md:grid grid-cols-2 h-full justify-items-center flex justify-center flex-col gap-10 md:gap-0 items-center">
            <div className="flex justify-center flex-col gap-5 items-center md:items-start">
              <p>Organizer name</p>
              <h1
                className="special-font text-5xl"
                style={{ color: textColor }}
              >
                The title
              </h1>
              <p>where & when</p>
              <div>Timer</div>
            </div>

            <div
              className="flex justify-center flex-col"
              style={{ color: textColor }}
            >
              Join Now BTN
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-96 text-white"
        style={{ backgroundColor: secondColor, color: bgColor }}
      >
        test
      </div>
      <div
        ref={descriptionRef}
        className="h-screen flex justify-center flex-col items-center md:items-start gap-10 md:gap-0 md:grid grid-cols-2 justify-items-center opacity-0"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <Image
          src={cube}
          alt="second photo"
          className="w-3/4 h-auto object-cover"
          style={{
            height: "90%",
          }}
        />
        <div
          ref={descContainerRef}
          className="flex w-full h-full justify-start md:justify-center p-5 md:p-0 flex-col gap-5 -ml-80"
          style={{
            color: textColor,
          }}
        >
          <h1
            className="special-font text-white text-5xl"
            style={{ color: textColor }}
          >
            What is all about us?
          </h1>
          <p style={{ color: textColor }}>descrption ...</p>
          <div
            className="flex justify-center flex-col"
            style={{ color: textColor }}
          >
            Join Now BTN
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
