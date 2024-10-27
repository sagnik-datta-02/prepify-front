import { ChevronRight } from "lucide-react";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import GradualSpacing from "@/components/ui/gradual-spacing";
import LetterPullup from "@/components/ui/letter-pullup";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import Ripple from "@/components/ui/ripple";
import RetroGrid from "@/components/ui/retro-grid";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
 
export async function Hero() {
   
        const companies = [
          'https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fais3.6ec9c330.png&w=64&q=75',   // Add your logo URLs here
          'https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhx.58fbb599.png&w=256&q=75',
          'https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsocial27.250794ee.png&w=256&q=75',
          'https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fciek2.d40b3dc1.png&w=128&q=75',
          'https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faixl2.c907cd59.png&w=128&q=75',
        ];
  return (
    <div className="">
    <div className="z-10 flex h-20 items-center justify-center px-4 sm:px-8">
  <AnimatedGradientText>
    🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
    <span
      className={cn(
        `inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] text-transparent bg-clip-text text-sm sm:text-base`
      )}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      Introducing Toingg - Exclusive Access
    </span>
    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
  </AnimatedGradientText>
</div>


    <div className="flex justify-center mt-2 px-5 sm:px-8 md:px-16 lg:px-24 text-center">
  <GradualSpacing
    className="text-center text-sm sm:text-base md:text-lg tracking-tighter font-display font-bold text-gray-500 dark:text-white"
    text="Start Your AI Journey with us"
  />
</div>
<div className="mt-2 px-5 sm:px-8 md:px-16 lg:px-24 text-center">
  <LetterPullup 
    className="font-display break-words text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-black dark:text-white leading-snug sm:leading-tight md:leading-tight lg:leading-[4.5rem]"
    words={"Your Go-To AI Consultancy"} 
    delay={0.05} 
  />
</div>



<div className="relative  flex min-h-[400px] md:min-h-[500px] w-full flex-col items-center justify-center overflow-visible rounded-lg bg-background">
  <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-4xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
    <img
      src="https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.f6baf043.png&w=64&q=75"
      alt="Logo"
      className="h-8 md:h-16 w-auto"
    />
  </span>

  {/* Inner Circles */}
  <OrbitingCircles
    className="size-[20px] text-center md:size-[30px] border-none bg-transparent"
    duration={20}
    delay={20}
    radius={80}
  >
    AI Solutions
  </OrbitingCircles>
  <OrbitingCircles
    className="size-[20px] text-center md:size-[30px] border-none bg-transparent"
    duration={20}
    delay={10}
    radius={80}
  >
    AI Products
  </OrbitingCircles>

  {/* Outer Circles (reverse) */}
  <OrbitingCircles
    className="size-[40px] px-2 text-center md:size-[50px] border-none bg-transparent"
    radius={160}
    duration={20}
    reverse
  >
    AI MVP Design
  </OrbitingCircles>
  <OrbitingCircles
    className="size-[40px] text-center px-2 md:size-[50px] border-none bg-transparent"
    radius={160}
    duration={20}
    delay={20}
    reverse
  >
    AI Research
  </OrbitingCircles>
  <RetroGrid angle={40}/>
</div>


<div className="w-full bg-white py-10 px-4">
  <div className="text-center text-sm font-medium text-gray-500 mb-5">
    PARTNERED WITH INNOVATORS LIKE
  </div>
  <Marquee speed={30} className="">
    <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16">
      {companies.map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt={`Company logo ${index}`}
          className="w-12 sm:w-16 lg:w-20 xl:w-24 opacity-60 hover:opacity-100 transition-opacity duration-300"
        />
      ))}
    </div>
  </Marquee>
</div>

    </div>
  );
}
