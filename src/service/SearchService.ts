import axios from "axios";

class SearchService {
  private GOOGLE_CUSTOM_SEARCH_API_KEY: string =
    process.env.GOOGLE_CUSTOM_SEARCH_API_KEY!;
  private GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID: string =
    process.env.GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID!;
  SEARCH_URL: string = "https://customsearch.googleapis.com/customsearch/v1";
  private queryurl = new URL(this.SEARCH_URL);

  constructor() {
    try {
      if (
        !this.GOOGLE_CUSTOM_SEARCH_API_KEY ||
        !this.GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID
      ) {
        throw new Error(
          "Undefined GOOGLE_CUSTOM_SEARCH_API_KEY | GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID in .env"
        );
      }

      this.queryurl.searchParams.set("key", this.GOOGLE_CUSTOM_SEARCH_API_KEY);
      this.queryurl.searchParams.set(
        "cx",
        this.GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID
      );
    } catch (error) {
      console.error(error);
    }
  }

  async search(query: string, num: number = 10) {
    this.queryurl.searchParams.set("q", query);
    this.queryurl.searchParams.set("num", num.toString());
    return await axios.get(this.queryurl.href);
  }

  // async search(query: string, searchTypeImage: boolean = false) {
  //   if (searchTypeImage) {
  //     this.queryurl.searchParams.set("searchType", "image");
  //   }
  //   this.queryurl.searchParams.set("q", query);
  //   return await axios.get(this.queryurl.href);
  // }
}

const searchService = new SearchService();
export default searchService;
