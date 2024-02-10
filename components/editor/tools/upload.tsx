"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const FormSchema = z.object({
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Change to an array
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-9 space-y-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="picture"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        const filesArray = Array.from(e.target.files);
                        setSelectedFiles([...selectedFiles, ...filesArray]);
                        filesArray.forEach(file => {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setImageSrcs(prev => [...prev, reader.result as string]);
                          };
                          reader.readAsDataURL(file);
                        });
                      }
                      field.onChange(e.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {imageSrcs.map((src, index) => (
        <div key={index}>
          <Image
            src={src}
            alt={`Uploaded image ${index + 1}`}
            className='rounded '
            width={'240'}
            height={"150"}
            style={{
              width: "240px",
              height: "150px"
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default Upload