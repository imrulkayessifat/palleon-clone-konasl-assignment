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
import { ComponentProps } from "@/types/type";

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

interface UploadProps {
  setCurrentComponent: (component: ComponentProps) => void;
  components: ComponentProps[],
  setComponents: (components: ComponentProps[]) => void;
  data: string;
  rotate: number;
  moveElement: (id: string, currentInfo: ComponentProps) => void
  resizeElement: (id: string, currentInfo: ComponentProps) => void
  rotateElement: (id: string, currentInfo: ComponentProps) => void
}

const Upload: React.FC<UploadProps> = ({
  setCurrentComponent,
  components,
  setComponents,
  data,
  rotate,
  moveElement,
  resizeElement,
  rotateElement
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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

  const add_image = (img: string) => {
    const style = {
      id: Date.now(),
      name: 'image',
      type: 'image',
      left: 10,
      top: 10,
      opacity: '1',
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      radius: 1,
      image: img,
      setCurrentComponent: (a:ComponentProps) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement
    }

    setCurrentComponent(style)
    setComponents([...components, style])
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
                        const newImageSrcs: string[] = [];
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
        <div onClick={()=>add_image(src)} key={index}>
          <Image
            src={src}
            alt={`Uploaded image ${index + 1}`}
            className='rounded cursor-pointer'
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