import * as cheerio from "cheerio";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

class ScrappingService {
  constructor() {}

  async fetchPageContent(link: string) {
    async function fetchWithTimeout(
      resource: string,
      options: { timeout: number }
    ) {
      const { timeout = 2000 } = options;

      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);

      return response;
    }

    try {
      const response = await fetchWithTimeout(link, {
        timeout: 2500,
      });
      // const response = await fetch(link);
      if (!response.ok) {
        return "";
      }
      const text = await response.text();
      return this.extractPageContent(text);
    } catch (error) {
      console.error(`Error scraping webpage content for ${link}:`, error);
      return "";
    }
  }

  // Extract main content from the HTML page
  async extractPageContent(html: string) {
    const $ = html.length ? cheerio.load(html) : null;
    $!("script, style, head, nav, footer, iframe, img").remove();
    return $!("body").text().replace(/\s+/g, " ").trim();
  }

  // langchain/document_loaders/web/cheerio/CheerioWebBaseLoader
  async getWebPageContent(link: string) {
    const loader = new CheerioWebBaseLoader(link);
    const docs = await loader.load();
    console.log(docs);
    return docs;
  }
}

const scrappingService = new ScrappingService();
export default scrappingService;
