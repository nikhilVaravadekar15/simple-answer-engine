"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowBigRight, Asterisk } from "lucide-react";
import SourceReference from "@/components/SourceReference";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<{ query: string }>();
  const onSubmit = (data: { query: string }) => {
    console.log(data.query.trim());
  };

  return (
    <main className="h-full w-full flex flex-col">
      <div className="p-4 shadow flex items-center justify-between dark:shadow-sm dark:shadow-white">
        <div className="w-full flex gap-4 items-center">
          <Image
            src="/favicon.png"
            alt="logo"
            width={24}
            height={24}
            priority={true}
            draggable={false}
            className="cursor-pointer"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[50%] flex gap-2 items-center justify-center shadow-sm"
          >
            <Input
              autoComplete="off"
              placeholder="Ask anything..."
              {...register("query", { required: true, max: 1024, min: 1 })}
              className="h-[48px] outline-none resize-none bg-transparent ring-0 focus-visible:ring-0 focus-visible:outline-none"
            />
            <Button
              type="submit"
              variant={"outline"}
              className="group rounded-full border-2"
            >
              <ArrowBigRight className="font-light" />
            </Button>
          </form>
        </div>
        <ThemeToggle />
      </div>
      <div className="w-full h-full flex">
        <div className="w-[70%] p-2 h-full">
          <div className="px-4 py-2 flex gap-1 items-center">
            <span>Q.</span>
            <span>how do llms solve math problems</span>
          </div>
          <Tabs defaultValue="answer" className="w-full h-full">
            <TabsList className="bg-transparent">
              <TabsTrigger
                className="data-[state=active]:border data-[state=active]:rounded-3xl data-[state=active]:shadow-md"
                value="all"
              >
                Answer
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border data-[state=active]:rounded-3xl data-[state=active]:shadow-md"
                value="images"
              >
                Images
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border data-[state=active]:rounded-3xl data-[state=active]:shadow-md"
                value="videos"
              >
                Videos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="answer" className="p-2">
              Answer
            </TabsContent>
            <TabsContent value="images">IMAGES</TabsContent>
            <TabsContent value="videos">VIDEOS</TabsContent>
          </Tabs>
        </div>
        <div className="w-[30%] p-2 h-full flex gap-2 flex-col">
          <div className="flex">
            <Asterisk className="h-4 w-4" />
            <span className="text-lg font-bold">Sources</span>
          </div>
          <div className="grid gap-1 grid-cols-2 pb-24 overflow-y-scroll">
            <SourceReference
              url="#"
              title="Deploy"
              description="Instantly deploy your Next.js site to a shareable URL with Vercel."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
