# Interviewer AI Web Application

## Summary

This project is a web application that simulates interviews using speech recognition and synthesis. It allows users to select from different prompts and record responses, which are processed by an AI model named `llama3`. The application is built using React and TypeScript, leveraging modern technologies to provide an interactive and dynamic user experience.

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- PostCSS
- Web Speech API (WebkitSpeechRecognition and SpeechSynthesis)
- Vite

## Resources

- [Ollama](https://ollama.com/) `llama3`
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API): Enables text-to-audio or audio-to-text conversion.

## Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

```bash
  git clone https://github.com/ramogollon1/interviewer-ai-web.git
  cd interviewer-ai-web
```

2. **Install pnpm: (note: if you have pnpm installed skip this step)**
   Make sure you have pnpm installed. If not, you can install it globally with:

```bash
  npm install -g pnpm
```

3. **Install dependencies:**

```bash
  pnpm install
```

4. **Start the development server:**

```bash
  pnpm dev
```

### Preview

![Preview](https://github.com/ramogollon1/interviewer-ai-web/blob/main/preview.png)

**Usage**

- Select a prompt from the dropdown.
- Edit the system message if needed.
- Click the record button to start recording your response.
- After recording, your response will be sent to the server for processing by the llama3 model. (It takes a few seconds to process.)
- The model's response will be displayed in the interface and will also be played back aloud using speech synthesis.

**Contributions**
If you'd like to contribute to this project, please open an issue to discuss proposed changes or submit a pull request with your improvements.
