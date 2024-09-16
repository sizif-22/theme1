"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import cube from "@/assets/cube.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const primaryColor = '#1162fb';
const secondaryColor = '#000000';
const textColor = '#ffffff';
const text2Color = '#ffffff';

const Home = () => {
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
      tl.to(bgRef.current, { y: "+=300" }, 0);
      tl.to(descriptionRef.current, { opacity: 1 }, 1);
      tl.to(descContainerRef.current, { margin: 0 }, 1);
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        className="min-h-screen relative"
        style={{ color: textColor }}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            ref={bgRef}
            src={cube}
            alt="cube"
            className="w-full h-full object-cover"
          />
        </div>
        {/* container */}
        <div className="w-full min-h-screen relative">
          {/* Nav */}
          <nav
            className="h-20 top-0 left-0 w-full absolute flex items-center justify-between px-8"
            style={{ color: textColor }}
          >
            <h2 className="text-2xl font-bold">Logo</h2>
          </nav>
          {/* body */}
          <div className="md:grid grid-cols-2 min-h-screen justify-items-center flex justify-center flex-col gap-10 md:gap-0 items-center p-8">
            <div className="flex justify-center flex-col gap-5 items-center md:items-start">
              <p className="text-lg font-semibold">Organizer name</p>
              <h1 className="special-font text-6xl md:text-7xl font-bold">
                The title
              </h1>
              <p className="text-xl">where & when</p>
              <div className="text-3xl font-bold">00:00:00</div>
            </div>

            <div className="flex justify-center flex-col items-center md:items-start">
              <BTN />
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-24 z-30"
        style={{
          backgroundColor: primaryColor,
          color: text2Color,
        }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Feature {item}</h3>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button
                  className=" hover:scale-105 transition-all hover:text-primary py-2 px-4 rounded"
                  style={{
                    color: text2Color,
                    border: `1px ${text2Color} solid`,
                  }}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        ref={descriptionRef}
        className="min-h-screen flex justify-center flex-col items-center md:items-start gap-10 md:gap-0 md:grid grid-cols-2 justify-items-center opacity-0 p-8"
        style={{
          backgroundColor: secondaryColor,
          color: textColor,
        }}
      >
        <Image
          src={cube}
          alt="second photo"
          className="w-3/4 h-auto object-cover rounded-lg shadow-lg"
          style={{
            height: "90%",
          }}
        />
        <div
          ref={descContainerRef}
          className="flex w-full h-full justify-start md:justify-center p-5 md:p-0 flex-col gap-5 -ml-80"
        >
          <h1 className="special-font text-5xl md:text-6xl font-bold">
            What is all about us?
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <BTN />
        </div>
      </div>
    </>
  );
};

const BTN = () => {
  return (
    <button
      onClick={() => console.log("the button is clicked")}
      className="font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center space-x-2 w-fit"
      style={{
        backgroundColor: primaryColor,
        color: text2Color,
      }}
    >
      <span>Join Now</span>
      <ArrowRight size={20} />
    </button>
  );
};

export default Home;