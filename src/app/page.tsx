/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { useChat, useCompletion } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/components/ui/use-toast";
import SkeletonCard from "@/components/SkeletonCard";
import { ArrowBigRight, OctagonX } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const {
    messages,
    input,
    isLoading,
    stop,
    handleInputChange,
    handleSubmit,
    error,
  } = useChat({
    api: "/api/search",
  });

  React.useEffect(() => {
    if (error?.message!) {
      toast({
        variant: "destructive",
        title: error?.message!,
      });
    }
    return () => {};
  }, [error]);

  return (
    <main className="h-full w-full flex flex-col">
      <div className="container w-full h-full flex items-center justify-center overflow-y-scroll">
        {messages.length > 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[90%] h-full md:w-[64%]">
              <div className="flex gap-2 flex-col">
                {messages.map((message, index) => {
                  return (
                    <div
                      key={message.id}
                      className="Preview whitespace-pre-wrap border p-4 rounded"
                    >
                      {message.role === "user"
                        ? "🧑🏻‍💻: " + message.content
                        : "🤖: " + message.content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative p-4 z-50 shadow flex items-center justify-center border">
        <form
          onSubmit={handleSubmit}
          className="w-[80%] flex gap-2 items-center justify-center shadow-sm md:w-[50%]"
        >
          <Input
            min={1}
            max={1024}
            value={input}
            autoComplete="off"
            disabled={isLoading}
            placeholder="Ask anything..."
            onChange={handleInputChange}
            className="h-[48px] outline-none resize-none bg-transparent ring-0 focus-visible:ring-0 focus-visible:outline-none"
          />
          <Button
            type="submit"
            variant={"outline"}
            disabled={isLoading}
            className="group rounded-full border-2"
          >
            <OctagonX className="font-light" />
          </Button>
        </form>
        <div className="absolute right-4">
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}

// export default function Home() {
//   const { toast } = useToast();
//   const {
//     completion,
//     input,
//     isLoading,
//     stop,
//     handleInputChange,
//     handleSubmit,
//     error,
//   } = useCompletion({
//     api: "/api/search",
//   });

//   React.useEffect(() => {
//     if (error?.message!) {
//       toast({
//         variant: "destructive",
//         title: error?.message!,
//       });
//     }
//     return () => {};
//   }, [error]);

//   return (
//     <main className="h-full w-full flex flex-col">
//       <div className="container w-full h-full flex items-center justify-center overflow-y-scroll">
//         {isLoading ? (
//           <div className="w-full h-full flex items-center justify-center">
//             <SkeletonCard />
//           </div>
//         ) : (
//           completion && (
//             <div className="w-full h-full flex items-center justify-center">
//               <div className="w-[64%] h-full">
//                 <div className="">
//                   <div
//                     id="Preview"
//                     className="whitespace-pre-wrap border p-4 rounded"
//                   >
//                     {"🤖: "}
//                     {completion}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//       <div className="relative p-4 z-50 shadow flex items-center justify-center border">
//         <form
//           onSubmit={handleSubmit}
//           className="w-[50%] flex gap-2 items-center justify-center shadow-sm"
//         >
//           <Input
//             min={1}
//             max={1024}
//             value={input}
//             autoComplete="off"
//             placeholder="Ask anything..."
//             onChange={handleInputChange}
//             className="h-[48px] outline-none resize-none bg-transparent ring-0 focus-visible:ring-0 focus-visible:outline-none"
//           />
//           {isLoading ? (
//             <Button
//               type="submit"
//               variant={"outline"}
//               className="group rounded-full border-2"
//             >
//               <OctagonX className="font-light" />
//             </Button>
//           ) : (
//             <Button
//               type="button"
//               variant={"outline"}
//               onClick={() => {
//                 stop();
//               }}
//               className="group rounded-full border-2"
//             >
//               <ArrowBigRight className="font-light" />
//             </Button>
//           )}
//         </form>
//         <div className="absolute right-4">
//           <ThemeToggle />
//         </div>
//       </div>
//     </main>
//   );
// }
