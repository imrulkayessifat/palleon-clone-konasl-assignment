"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import * as htmlToImage from 'html-to-image';
import Link from "next/link";
import Image from "next/image";
import { MoonIcon, SunIcon } from "lucide-react";
import { FaFileExport } from "react-icons/fa6";

import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DownloadSchema = z.object({
  name: z.string(),
  format: z.string()
})

const Navbar = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme()
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const form = useForm<z.infer<typeof DownloadSchema>>({
    resolver: zodResolver(DownloadSchema),
  });

  const onSubmit = async (data: z.infer<typeof DownloadSchema>) => {

    const getDiv = document.getElementById('main_design')
    if (!getDiv) return;

    const formatToFunction: { [key: string]: Promise<string> } = {
      'png': htmlToImage.toPng(getDiv, {
        style: {
          transform: 'scale(1)'
        }
      }),
      'svg': htmlToImage.toSvg(getDiv, {
        style: {
          transform: 'scale(1)'
        }
      }),
      'jpeg': htmlToImage.toJpeg(getDiv, {
        style: {
          transform: 'scale(1)'
        }
      }),
    };

    const dataUrl = await formatToFunction[data.format];

    var link = document.createElement("a");
    link.download = `${data.name}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-3" variant={"outline"}>
                <FaFileExport className="w-5 h-5" />
                <p>Export</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Download Image</DialogTitle>
                <DialogDescription>
                  Download your current state.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Name</FormLabel>
                        <FormControl>
                          <Input placeholder="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Format</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="svg">SVG</SelectItem>
                            <SelectItem value="jpeg">JPEG</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit">Download</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}

export default Navbar