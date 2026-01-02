"use client";

import React from "react";
import { cn } from "../lib/utils";
import { Mail, MessageSquare, Phone, Palette, Layout, Globe, Monitor } from "lucide-react";
import { useAnimate } from "framer-motion";

import { Button, buttonVariants } from "./ui/button";
import { HighlighterItem, HighlightGroup, Particles } from "./ui/highlighter";

export function Connect() {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    animate(
      [
        ["#pointer", { left: 200, top: 60 }, { duration: 0 }],
        ["#branding", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 50, top: 102 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#branding", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#graphic-design", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 224, top: 170 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#graphic-design", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#web-design", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 88, top: 198 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#web-design", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#ui-ux", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 200, top: 60 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#ui-ux", { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      },
    );
  }, [animate]);

  return (
    <section className="relative mx-auto mb-32 mt-6 max-w-5xl px-6 relative z-10">
      <HighlightGroup className="group h-full">
        <div
          className="group/item h-full md:col-span-6 lg:col-span-12"
        >
          <HighlighterItem className="rounded-3xl p-6">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={200}
                color={"#22c55e"}
                vy={-0.2}
              />
              <div className="flex justify-center">
                <div className="flex h-full flex-col justify-center gap-10 p-4 md:h-[300px] md:flex-row">
                  <div
                    className="relative mx-auto h-[270px] w-[300px] md:h-[270px] md:w-[300px]"
                    ref={scope}
                  >
                    <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="font-black tracking-tighter text-white">OAKSES</span>
                    </div>
                    
                    <div
                      id="ui-ux"
                      className="absolute bottom-12 left-14 rounded-3xl border border-white/20 bg-white/5 px-2 py-1.5 text-xs text-white opacity-50 flex items-center gap-1"
                    >
                      <Layout size={12} className="text-green-400"/> UI/UX
                    </div>
                    <div
                      id="graphic-design"
                      className="absolute left-2 top-20 rounded-3xl border border-white/20 bg-white/5 px-2 py-1.5 text-xs text-white opacity-50 flex items-center gap-1"
                    >
                      <Palette size={12} className="text-green-400"/> Graphics
                    </div>
                    <div
                      id="web-design"
                      className="absolute bottom-20 right-1 rounded-3xl border border-white/20 bg-white/5 px-2 py-1.5 text-xs text-white opacity-50 flex items-center gap-1"
                    >
                      <Globe size={12} className="text-green-400"/> Web Apps
                    </div>
                    <div
                      id="branding"
                      className="absolute right-12 top-10 rounded-3xl border border-white/20 bg-white/5 px-2 py-1.5 text-xs text-white opacity-50 flex items-center gap-1"
                    >
                      <Monitor size={12} className="text-green-400"/> Branding
                    </div>

                    <div id="pointer" className="absolute z-10">
                      <svg
                        width="16.8"
                        height="18.2"
                        viewBox="0 0 12 13"
                        className="fill-green-500"
                        stroke="white"
                        strokeWidth="1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                        />
                      </svg>
                      <span className="bg-green-500 relative -top-1 left-3 rounded-3xl px-2 py-1 text-[10px] font-bold text-black uppercase tracking-wider">
                        OAKSES
                      </span>
                    </div>
                  </div>

                  <div className="-mt-20 flex h-full flex-col justify-center p-2 md:-mt-4 md:ml-10 md:w-[400px]">
                    <div className="flex flex-col items-center md:items-start">
                      <h3 className="mt-6 pb-1 font-bold text-white text-center md:text-left">
                        <span className="text-2xl md:text-3xl">
                          Ready to elevate <br/>your digital presence?
                        </span>
                      </h3>
                    </div>
                    <p className="mb-6 text-gray-400 text-center md:text-left mt-2 text-sm">
                      Let's collaborate to build something that stands out in the noise.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <a
                        href="#contact"
                      >
                        <Button>Book a call</Button>
                      </a>
                      <a
                        href="mailto:hello@oakses.design"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                        )}
                      >
                        <span className="flex items-center gap-1">
                          <Mail strokeWidth={1.5} className="h-5 w-5" />
                        </span>
                      </a>
                      <a
                        href="#"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                        )}
                      >
                        <span className="flex items-center gap-1">
                          <MessageSquare
                            strokeWidth={1.5}
                            className="h-4 w-4"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  );
}
