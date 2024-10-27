"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FiMenu, FiX } from "react-icons/fi"; // Importing hamburger and close icons
import PulsatingButton from "@/components/ui/pulsating-button";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Toingg",
    href: "/docs/products/toingg",
    description:
      "Unlock the power of AI-driven voice communications with our customizable AI voice agents. Streamline interactions, automate processes, and boost customer engagement in real-time.",
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


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to handle menu toggle

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/">
          <img
            src="https://pgagi.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.f6baf043.png&w=64&q=75"
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>
        <span className="ml-2 text-lg font-semibold">PGAGI</span>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-600 focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation Menu */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex space-x-6">
          {/* Getting Started Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link href="/" legacyBehavior>
                      <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Who We Are
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                        PG-AGI
                        Playing God With Artificial General Intelligence
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem title="Our Vision">
                At PGAGI, we believe in a future where AI and human intelligence coexist in harmony, creating a smarter, faster, and better world.
                </ListItem>
                <ListItem title="Our Mission">
                Empowering Innovation, Shaping Tomorrow - Transforming Businesses through Advanced near AGI Solutions.
                </ListItem>
                <ListItem title="Our Values">
                Innovation , Collaboration , Integrity , Excellence , Customer Focus
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Components Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Documentation Link */}
          <NavigationMenuItem>
            <Link href="#" className={navigationMenuTriggerStyle()}>
              Blogs
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Action Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Link href="#">
        <PulsatingButton className='bg-white text-black' pulseColor="#FFD700">LLM Token Calculator</PulsatingButton>
        </Link>
        <Link href="#">
        <RainbowButton>Book a Call</RainbowButton>
          
        </Link>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-10">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/" onClick={toggleMenu} className="block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" onClick={toggleMenu} className="block">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" onClick={toggleMenu} className="block">
                <PulsatingButton className='bg-white text-black' pulseColor="#FFD700">LLM Token Calculator</PulsatingButton>
         
                </Link>
              </li>
              <li>
                <Link href="#" onClick={toggleMenu} className="block">
                <RainbowButton>Book a Call</RainbowButton>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href="#">
          <div
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
