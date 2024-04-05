This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1st, Updatede env
```bash
# ollama 
USE_EMBEDDING_SIMILARITY_SEARCH=false # true | false
OLLAMA_API_BASEURL=http://localhost:11434 # ollama embedding model base url 
CHAT_EMBEDDING_MODEL=nomic-embed-text:latest # ollama embedding model-name
# ollama/openai
OPENAI_API_KEY=ollama # keep "ollama" else provide openai api key
OPENAI_API_BASEURL=http://localhost:11434/v1  # provide ollama api else for openai keep empty
CHAT_COMPLETIONS_MODEL=mixtral:latest # provide open-source llm-name else for openai "gpt-3.5-turbo"
# google search key
GOOGLE_CUSTOM_SEARCH_API_KEY=
GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID=
```

2nd, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Sources
- ollama
  - [ollama-is-now-available-as-an-official-docker-image](https://ollama.com/blog/ollama-is-now-available-as-an-official-docker-image)
  - [ollama/library/mixtral:8x7b](https://ollama.com/library/mixtral:8x7b)
  - [ollama/library/nomic-embed-text:latest](https://ollama.com/library/nomic-embed-text:latest)
  - [ollama/openai-compatibility](https://ollama.com/blog/openai-compatibility)
- google search
  - [Custom Search JSON API](https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list)
  - [Enable customsearch googleapis from gcp console](https://console.cloud.google.com/apis/library/customsearch.googleapis.com)
  - [create googleapis credentials](https://console.cloud.google.com/apis/credentials)
  - [Programmable Search Engine](https://programmablesearchengine.google.com/)
 