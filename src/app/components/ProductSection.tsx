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
    title: "Toingg",
    href: "/docs/products/toingg",
    description:
      "Unlock the power of AI-driven voice communications with our customizable AI voice agents.",
  },
  {
    title: "SEO Listing AI",
    href: "/docs/products/seo-listing-ai",
    description:
      "Efficiently manage your email campaigns with AI-powered automation. Send personalized, high-converting emails without the manual effort.",
  },
  {
    title: "Web Scrapper",
    href: "/docs/products/web-scrapper",
    description:
      "Automate data extraction with precision using our AI-based web scraping tool. Ideal for collecting valuable insights from the web to fuel your business decisions.",
  },
];

export function ProductSection() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <>
    <BlurIn
    word="Our Products"
    className="text-4xl font-bold text-black dark:text-white"
  />
    <div className="w-full flex justify-center">
         {/* Title for Product Section */}
        
   <Carousel
  plugins={[plugin.current]}
  onMouseEnter={plugin.current.stop}
  onMouseLeave={plugin.current.reset}
  className="w-full max-w-4xl" // Set max width for larger screens, full width on smaller screens
>
<Carousel
  plugins={[plugin.current]}
  onMouseEnter={plugin.current.stop}
  onMouseLeave={plugin.current.reset}
  className="w-full max-w-4xl mx-auto" // Center the carousel, full width for mobile, 4xl max on larger screens
>
  <CarouselContent className="flex items-center">
    {components.map((product, index) => (
      <CarouselItem
        key={index}
        className="flex-shrink-0 flex justify-center w-full sm:w-auto"
      >
        <div className="p-4"> {/* Add padding for spacing */}
          <Card className="shadow-lg border rounded-md h-80 w-full sm:w-96 relative overflow-hidden">
            {/* Ensure card size is responsive */}
            <FlickeringGrid
              className="absolute inset-0 z-10" // Place inside card, behind the content
              squareSize={4}
              gridGap={6}
              color="#FFD700"
              maxOpacity={0.3} // Lower opacity for grid to make text more visible
              flickerChance={0.1}
            />
            {/* Background overlay for better text visibility 
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>*/}

            <CardContent className="relative p-6 flex flex-col justify-between h-full z-20 text-black">
              {/* Ensure Card content is above FlickeringGrid */}
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
              {/* Button to product page */}
              
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  
  {/* Responsive carousel arrows */}
  <CarouselPrevious className="hidden sm:block " />
  <CarouselNext className="hidden sm:block " />
</Carousel>

</Carousel>

  </div>
  
  </>
  );
}
