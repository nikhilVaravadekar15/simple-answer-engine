import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from "ai";
import { getPrompt } from "@/lib/utils";
import { TCustomSearchResultItem } from "@/types";
import searchService from "@/service/SearchService";
import vectorService from "@/service/VectorService";
import openaiService from "@/service/OpenaiService";
import { NextRequest, NextResponse } from "next/server";
import scrappingService from "@/service/ScrappingService";
import { ChatCompletionMessageParam } from "ai/prompts";

// export async function POST(
//   nextRequest: NextRequest,
//   nextResponse: NextResponse
// ) {
//   try {
//     // 0. Get search query form user
//     let { prompt }: { prompt: string } = await nextRequest.json();

//     // 1. Get the top 10 search from google programmable search engine
//     const searchResultResponse = await searchService.search(prompt);
//     if (searchResultResponse.status != 200) {
//       throw new Error(
//         "Failed to get latest search results from google, Please tray again later.",
//         {
//           cause: 500,
//         }
//       );
//     }
//     const top10Items: TCustomSearchResultItem[] =
//       searchResultResponse.data.items;
//     const items: TCustomSearchResultItem[] = top10Items.slice(0, 4);

//     // 2. Scrape the content form webpages
//     let scrapedWebContent = await Promise.all(
//       items.map(async (item, index) => {
//         return {
//           ...item,
//           scrapedContent: await scrappingService.fetchPageContent(item.link),
//         };
//       })
//     );

//     // 3. split the text into smaller chunks if (len > 256) using textSplitter
//     const textSplitedWebContent = await Promise.all(
//       scrapedWebContent.map(async (item, index) => {
//         return {
//           ...item,
//           splitedContent: await vectorService.textSplitter(item.scrapedContent),
//         };
//       })
//     );

//     const USE_EMBEDDING_SIMILARITY_SEARCH: boolean =
//       process.env.USE_EMBEDDING_SIMILARITY_SEARCH! === "true" ? true : false;

//     let data: string[] = [];
//     if (USE_EMBEDDING_SIMILARITY_SEARCH) {
//       // 4. create embeddings or vectorStore from splitted text
//       const vectorStore = await Promise.all(
//         textSplitedWebContent.map(async (item, index) => {
//           return await vectorService.createVectorStore(item.splitedContent, {
//             link: item.link,
//             title: item.title,
//           });
//         })
//       );

//       // 5. Perform similaritySearch and filter top 3 results
//       const matchedWebContent = await Promise.all(
//         vectorStore.map(async (item, index) => {
//           return await vectorService.performSimilaritySearch(item, prompt);
//         })
//       );

//       // 6. Get metadata of the filtered items
//       data = await Promise.all(
//         matchedWebContent.map((matchedContent, index) => {
//           let temp = "";
//           for (const content of matchedContent) {
//             temp += content.pageContent + " ";
//           }
//           return temp;
//         })
//       );
//     } else {
//       data = await Promise.all(
//         scrapedWebContent.map((matchedContent, index) => {
//           return matchedContent.scrapedContent;
//         })
//       );
//     }

//     // 7. combine the metadata with search query ie prompt and provide it llm
//     const chatCompletionResponse = await openaiService.chatCompletion([
//       getPrompt(prompt, data),
//     ]);

//     // 8. create OpenAIStream
//     const stream = OpenAIStream(chatCompletionResponse!, {});

//     // 9. Respond back with the stream to next app
//     return new StreamingTextResponse(stream);
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json(
//       {
//         message: error.message
//           ? error.message
//           : "Something went wrong, please try again.",
//       },
//       {
//         status: error.cause ? parseInt(error.cause) : 500,
//       }
//     );
//   }
// }

export async function POST(
  nextRequest: NextRequest,
  nextResponse: NextResponse
) {
  try {
    // 0. Get search query form user
    const { messages }: { messages: ChatCompletionMessageParam[] } =
      await nextRequest.json();
    const lastMessage: ChatCompletionMessageParam =
      messages[messages.length - 1];
    let lastMessageContent: string = lastMessage.content!.toString();

    // 1. Get the top 10 search from google programmable search engine
    const searchResultResponse = await searchService.search(
      lastMessageContent,
      5
    );
    if (searchResultResponse.status != 200) {
      throw new Error(
        "Failed to get latest search results from google, Please tray again later.",
        {
          cause: 500,
        }
      );
    }
    const items: TCustomSearchResultItem[] = searchResultResponse.data.items;

    // 2. Scrape the content form webpages
    let scrapedWebContent = await Promise.all(
      items.map(async (item, index) => {
        return {
          ...item,
          scrapedContent: await scrappingService.fetchPageContent(item.link),
        };
      })
    );

    // 3. split the text into smaller chunks if (len > 256) using textSplitter
    const textSplitedWebContent = await Promise.all(
      scrapedWebContent.map(async (item, index) => {
        return {
          ...item,
          splitedContent: await vectorService.textSplitter(item.scrapedContent),
        };
      })
    );

    const USE_EMBEDDING_SIMILARITY_SEARCH: boolean =
      process.env.USE_EMBEDDING_SIMILARITY_SEARCH! === "true" ? true : false;

    let data: string[] = [];
    if (USE_EMBEDDING_SIMILARITY_SEARCH) {
      // 4. create embeddings or vectorStore from splitted text
      const vectorStore = await Promise.all(
        textSplitedWebContent.map(async (item, index) => {
          return await vectorService.createVectorStore(item.splitedContent, {
            link: item.link,
            title: item.title,
          });
        })
      );

      // 5. Perform similaritySearch and filter top 3 results
      const matchedWebContent = await Promise.all(
        vectorStore.map(async (item, index) => {
          return await vectorService.performSimilaritySearch(
            item,
            lastMessageContent
          );
        })
      );

      // 6. Get metadata of the filtered items
      data = await Promise.all(
        matchedWebContent.map((matchedContent, index) => {
          let temp = "";
          for (const content of matchedContent) {
            temp += content.pageContent + " ";
          }
          return temp;
        })
      );
    } else {
      data = await Promise.all(
        scrapedWebContent.map((matchedContent, index) => {
          return matchedContent.scrapedContent;
        })
      );
    }

    // 7. combine the metadata with search query ie prompt and provide it llm
    const chatCompletionResponse = await openaiService.chatCompletion([
      getPrompt(lastMessageContent, data),
    ]);

    // 8. create OpenAIStream
    const stream = OpenAIStream(chatCompletionResponse!, {});

    // 9. Respond back with the stream to next app
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: error.message
          ? error.message
          : "Something went wrong, please try again.",
      },
      {
        status: error.cause ? parseInt(error.cause) : 500,
      }
    );
  }
}
