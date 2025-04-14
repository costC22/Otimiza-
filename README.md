# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Setting the Gemini API Key

To use the GenAI features of this application, you need to set the `GOOGLE_GENAI_API_KEY` environment variable.

1.  Obtain a Gemini API key from [Google AI Studio](https://makersuite.google.com/).
2.  Set the environment variable in your `.env` file (create one if it doesn't exist):

```
GOOGLE_GENAI_API_KEY=YOUR_API_KEY
```

   Replace `YOUR_API_KEY` with the actual key you obtained.

## Building the Tauri Application
To build the application as an installable executable, use the following commands:

```bash
cd src-tauri
tauri build
```

This will generate an installable package in the `src-tauri/target/release` directory.
