import TextReveal from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import ShineBorder from "@/components/ui/shine-border";
import RetroGrid from "@/components/ui/retro-grid";
import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/ui/box-reveal";
import LetterPullup from "@/components/ui/letter-pullup";
const reviews = [
    {
        img: "https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fais3.6ec9c330.png&w=64&q=75",
    },
    {
        img: "https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhx.58fbb599.png&w=256&q=75",
    },
    {
        img: "https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsocial27.250794ee.png&w=256&q=75",
    },
    {
        img: "https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fciek2.d40b3dc1.png&w=128&q=75",
    },
    {
        img: "https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faixl2.c907cd59.png&w=128&q=75",
    },
];

const firstRow = reviews;

const ReviewCard = ({
    img,
}: {
    img: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-48 md:w-64 cursor-pointer overflow-hidden rounded-xl border p-0", // Removed padding to make image fill the space
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            {/* Make the image cover the entire figure */}
            <img
                className="w-full h-full object-cover rounded-lg"
                alt="Review Logo"
                src={img}
            />
        </figure>
    );
};


export function HeroSection() {
    return (
        <>
            <div className="z-10 flex flex-col min-h-[50vh] md:min-h-[75vh] items-center justify-center text-center px-4 py-12 md:py-16 rounded-lg border bg-white dark:bg-black">
                <TextReveal text="Start your AI journey with us" />
                <RetroGrid />
            </div>


            {/* Box Reveal Section */}
            <div className="max-w-lg mx-auto pt-12 px-6">
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                    <p className="text-4xl md:text-6xl font-semibold leading-tight">
                        Playing GOD With AGI<span className="text-[#5046e6]">.</span>
                    </p>
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                    <h2 className="mt-2 text-lg md:text-xl text-center">
                        Your Goto Consultancy For<span className="text-[#5046e6]">Design Engineers</span>
                    </h2>
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                    <div className="mt-6 text-sm md:text-base leading-relaxed text-center">
                        <p>
                            -&gt; 20+ free and open-source animated components built with
                            <span className="font-semibold text-[#5046e6]"> React</span>,
                            <span className="font-semibold text-[#5046e6]"> Typescript</span>,
                            <span className="font-semibold text-[#5046e6]"> Tailwind CSS</span>, and
                            <span className="font-semibold text-[#5046e6]"> Framer Motion</span>.
                        </p>
                        <p className="mt-2">
                            -&gt; 100% open-source, and customizable.
                        </p>
                    </div>
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                    <Button className="mt-8 w-full md:w-auto bg-[#5046e6] px-6 py-3 text-lg font-medium">
                        Explore
                    </Button>
                </BoxReveal>
            </div>
            {/* Marquee Section */}
            <div className="text-lg md:text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                <LetterPullup words={"Partnered With Innovators Like"} delay={0.08} />
            </div>
            <div className="relative flex h-24 w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background dark:bg-gray-900 shadow-xl mt-8">

                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.img} {...review} />
                    ))}
                </Marquee>
            </div>

        </>
    );
}
