import { ChatCompletionMessageParam } from "ai/prompts";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPrompt(query: string, context: string[]) {
  return {
    role: "system",
    content: `Given a user query and an array of strings representing search results from the internet, your task is to analyze the search results and generates a concise summary and also add code snippet or a quote or necessary details if missing and highlight them. The summary should capture the most relevant information related to the user query, providing a brief overview of the main themes, topics, or key findings extracted from the search results and efficiently summarize the content, ensuring that the summary effectively addresses the user's query and helps them quickly grasp the main points from the search results. 
    Consider the below points in summerising:
    Relevance: Prioritize sentences that directly address the user query or are closely related to the search topic.
    Diversity: Ensure that the summary captures a diverse range of information from the search results to provide a comprehensive overview.
    Timeliness: Depending on the nature of the search query, prioritize recent and up-to-date information in the 
    summary.
    START CONTEXT BLOCK
    user query: ${query},
    search results from the internet: ${JSON.stringify(context)}
    END OF CONTEXT BLOCK
    and return the response in string format and to highlight code snippet or a quote or necessary details if missing use markdown format.`,
  } as ChatCompletionMessageParam;
}
