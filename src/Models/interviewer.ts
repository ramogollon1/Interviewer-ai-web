export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

export type Prompt = {
  value: string;
  content: string;
};

export type Languages = {
  label: string;
  value: string;
};

export type Language = string;
