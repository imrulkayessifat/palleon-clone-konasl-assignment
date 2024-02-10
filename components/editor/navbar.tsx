"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MoonIcon, SunIcon } from "lucide-react";
import { FaCloudDownloadAlt } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme()
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);
  return (
    <header className={`fixed z-40 top-0 bg-white dark:bg-black ${isScrolled ? 'shadow-md' : ''} py-3 w-screen`}>
      <div className='mx-auto px-8 flex justify-between items-center'>
        <Link href={'/'}>
          <Image
            src={"/logo.png"}
            alt="Palleon Logo"
            width={"100"}
            height={"100"}
          />
        </Link>
        <div className='flex items-center gap-5'>
          <h1 className="font-bold text-2xl">Palleon Clone</h1>
        </div>
        <div className="flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant={"outline"}>
            Save
          </Button>
          <Button className="flex gap-3" variant={"outline"}>
            <FaCloudDownloadAlt className="w-5 h-5" />
            <p>Download</p>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar