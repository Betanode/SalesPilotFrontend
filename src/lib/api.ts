const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export type StartSessionResponse = {
  session_id: string;
  message: string;
  turn: number;
  is_final: boolean;
};

export type SendMessageResponse = {
  message: string;
  turn: number;
  is_final: boolean;
};

async function parseOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function uploadDocument(file: File): Promise<{ message: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  return parseOrThrow(res);
}

export async function startSession(): Promise<StartSessionResponse> {
  const res = await fetch(`${API_BASE}/session/start`, { method: "POST" });
  return parseOrThrow(res);
}

export async function sendMessage(
  sessionId: string,
  message: string
): Promise<SendMessageResponse> {
  const res = await fetch(`${API_BASE}/session/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message }),
  });
  return parseOrThrow(res);
}

export async function endSession(sessionId: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/session/${sessionId}`, { method: "DELETE" });
  return parseOrThrow(res);
}

export async function askLLM(prompt: string): Promise<{ response: string }> {
  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  return parseOrThrow(res);
}
