import { Document } from "langchain/document";
import { EmbeddingsResponse, Ollama } from "ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

class VectorService {
  private ollama: Ollama | null = null;
  private NUMBER_OF_SIMILARITY_RESULTS: number = 2;
  private OLLAMA_API_BASEURL: string = process.env.OLLAMA_API_BASEURL!;
  private CHAT_EMBEDDING_MODEL: string = process.env.CHAT_EMBEDDING_MODEL!;
  private USE_EMBEDDING_SIMILARITY_SEARCH: boolean =
    process.env.USE_EMBEDDING_SIMILARITY_SEARCH! === "true" ? true : false;

  constructor() {
    try {
      if (
        this.USE_EMBEDDING_SIMILARITY_SEARCH &&
        (!this.OLLAMA_API_BASEURL || !this.CHAT_EMBEDDING_MODEL)
      ) {
        throw new Error(
          "Undefined OLLAMA_API_BASEURL, CHAT_EMBEDDING_MODEL in .env"
        );
      }

      this.ollama = new Ollama({
        host: this.OLLAMA_API_BASEURL,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async textSplitter(text: string) {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 768,
      chunkOverlap: 256,
    });

    return await splitter.splitText(text);
  }

  async createVectorStore(
    text: string[],
    { link, title }: { link: string; title: string }
  ) {
    const vectorStore = await MemoryVectorStore.fromTexts(
      text,
      { link, title }, // @metadatas Array or single object of metadata corresponding to the texts.
      new OllamaEmbeddings({
        model: this.CHAT_EMBEDDING_MODEL,
        baseUrl: this.OLLAMA_API_BASEURL,
      })
    );
    return vectorStore;
  }

  async performSimilaritySearch(vectorStore: MemoryVectorStore, query: string) {
    return await vectorStore.similaritySearch(
      query,
      this.NUMBER_OF_SIMILARITY_RESULTS
    );
  }

  // optional
  async createEmbeddings(input: string) {
    return (await this.ollama?.embeddings({
      model: this.CHAT_EMBEDDING_MODEL,
      prompt: input,
    })) as EmbeddingsResponse;
  }
}

const vectorService = new VectorService();
export default vectorService;
