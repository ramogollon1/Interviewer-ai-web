import { useState, ChangeEvent, useEffect, useRef } from "react";
import promptsData from "../../locales/en/prompts.json";
import { Message, Prompt } from "../../Models/interviewer";
import { DEFAULT_PROMPT, ROLE_SYSTEM } from "../../constants/settings";
import Dropdown from "../../components/Dropdown";
import Textarea from "../../components/Textarea";
import RecordButton from "../../components/RecordButton";
import Button from "../../components/Button";

const recognition = new window.webkitSpeechRecognition();
const synth = window.speechSynthesis;

recognition.continuous = true;
recognition.lang = "en-US";

synth.cancel();

function Interviewer() {
  const [systemMessage, setSystemMessage] = useState<string>(
    DEFAULT_PROMPT.content
  );
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(
    DEFAULT_PROMPT
  );
  const [isRecording, setIsRecording] = useState(false);
  const [buffer, setBuffer] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: DEFAULT_PROMPT.content },
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSystemMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSystemMessage(e.target.value);
    setMessages([{ role: ROLE_SYSTEM, content: e.target.value }]);
  };

  const handleOnChangePrompt = (value: string) => {
    const prompt = promptsData.prompts.find((p) => p.value === value);

    setSelectedPrompt(prompt ?? null);
    setSystemMessage(prompt?.content ?? "");
    setMessages([{ role: ROLE_SYSTEM, content: prompt?.content ?? "" }]);
  };

  const handleOnClickResetSettings = () => {
    setSystemMessage(DEFAULT_PROMPT.content);
    setMessages([{ role: "system", content: DEFAULT_PROMPT.content }]);
    setSelectedPrompt(DEFAULT_PROMPT);
  };

  function handleStartRecording() {
    setIsRecording(true);

    synth.cancel();

    recognition.start();

    recognition.addEventListener("result", (event) => {
      const buffer = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join(" ");

      setBuffer(buffer);
    });
  }

  async function handleEndRecording() {
    setIsRecording(false);
    setIsLoading(true);

    recognition.stop();

    const draft = structuredClone(messages);

    draft.push({ role: "user", content: buffer });

    const answer = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      body: JSON.stringify({
        model: "llama3",
        stream: false,
        messages: draft,
      }),
    })
      .then((response) => response.json())
      .then((response) => response.message)
      .catch(() => {
        console.log("error getting answer from api");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

    draft.push(answer);

    const utterance = new SpeechSynthesisUtterance(answer.content);

    utterance.lang = "en-US";
    synth.speak(utterance);
    setMessages(draft);
  }

  const isDisabledEdit = isRecording || isLoading;

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <section className="mt-8">
        <Dropdown
          isDisabled={isDisabledEdit}
          options={promptsData.prompts}
          title="Seleccione un prompt"
          value={selectedPrompt?.value ?? ""}
          onChange={handleOnChangePrompt}
        />
        <Textarea
          isDisabled={isDisabledEdit}
          value={systemMessage}
          onChange={handleSystemMessageChange}
        />
        <Button
          isDisabled={isDisabledEdit}
          text="Reiniciar"
          onClick={handleOnClickResetSettings}
        />
      </section>
      <RecordButton
        isLoading={isLoading}
        isRecording={isRecording}
        onClick={isRecording ? handleEndRecording : handleStartRecording}
      />
      <footer className="text-center leading-[4rem] opacity-70">
        © {new Date().getFullYear()} Interviewer-ai-web
      </footer>
    </main>
  );
}

export default Interviewer;
