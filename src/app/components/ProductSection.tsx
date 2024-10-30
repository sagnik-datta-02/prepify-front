"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FlickeringGrid from "@/components/ui/flickering-grid";
import BlurIn from "@/components/ui/blur-in";
import TextReveal from "@/components/ui/text-reveal";
import GradientButton from "./ButtonComponent";
const components = [
  {
    title: "Article Generator",
    href: "#",
    description:
      "Generate informative articles on any topic to enhance your knowledge base.",
  },
  {
    title: "Practice Tests",
    href: "#",
    description:
      "Challenge yourself with timed tests across various topics to track your progress.",
  },
  {
    title: "Study Planner",
    href: "#",
    description:
      "Organize and schedule your study sessions to stay on top of your goals.",
  },
  {
    title: "Virtual Interview",
    href: "#",
    description:
      "Simulate real interviews, get feedback, and improve your responses based on you responses and facial expressions",
  },
];

export function ProductSection() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <>
    <BlurIn
    word="Our Products"
    className="text-xl font-bold text-black dark:text-white"
  />
    <div className="w-full flex justify-center">
        
        
   <Carousel
  plugins={[plugin.current]}
  onMouseEnter={plugin.current.stop}
  onMouseLeave={plugin.current.reset}
  className="w-full max-w-4xl" 
>
<Carousel
  plugins={[plugin.current]}
  onMouseEnter={plugin.current.stop}
  onMouseLeave={plugin.current.reset}
  className="w-full max-w-xl mx-auto" 
>
  <CarouselContent className="flex items-center">
    {components.map((product, index) => (
      <CarouselItem
        key={index}
        className="flex-shrink-0 flex justify-center w-full sm:w-auto"
      >
        <div className="p-4">
          <Card className="shadow-lg border rounded-md h-80 w-full sm:w-96 relative overflow-hidden">
           
            <FlickeringGrid
              className="absolute inset-0 z-10" 
              squareSize={4}
              gridGap={6}
              color="#FFD700"
              maxOpacity={0.3} 
              flickerChance={0.1}
            />
           

            <CardContent className="relative p-6 flex flex-col justify-between h-full z-20 text-black">
             
              <div className=" flex-col justify-center text-center m-auto">
                <h1 className="text-xl font-semibold mb-2">{product.title}</h1>
                <p className="text-sm ">
                  {product.description}
                </p>
                <div className="w-[8.5rem] m-auto mt-24 ">
              <Link href={product.href}>
               <GradientButton>Try It Out</GradientButton>
              </Link>
              </div>
              </div>
              
              
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  
  <CarouselPrevious className="hidden sm:block " />
  <CarouselNext className="hidden sm:block " />

</Carousel>

</Carousel>

  </div>
  
  </>
  );
}
