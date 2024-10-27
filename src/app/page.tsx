import Image from "next/image";
import Navbar from "./components/Nav";
import { Hero } from "./components/Hero";
import { HeroSection } from "./components/HeroSection";
export default function Home() {
  return (
   <div >
    <Navbar></Navbar>
    <Hero></Hero>
   </div>
  );
}
