// Обёртки над Web Speech API. Вызываются только на клиенте.

export type Accent = "UK" | "US";

const langFor = (accent: Accent) => (accent === "UK" ? "en-GB" : "en-US");

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function isSpeechRecognitionSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  );
}

let voices: SpeechSynthesisVoice[] = [];

function ensureVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return [];
  if (!voices.length) voices = window.speechSynthesis.getVoices();
  return voices;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  // Голоса подгружаются асинхронно
  window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
  };
}

function pickVoice(accent: Accent): SpeechSynthesisVoice | undefined {
  const list = ensureVoices();
  const lang = langFor(accent);
  return (
    list.find((v) => v.lang === lang) ||
    list.find((v) => v.lang.replace("_", "-").startsWith(lang)) ||
    list.find((v) => v.lang.toLowerCase().startsWith("en"))
  );
}

/** Озвучить текст выбранным акцентом. */
export function speak(text: string, accent: Accent = "UK", rate = 0.9): void {
  if (!isSpeechSynthesisSupported() || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langFor(accent);
  const v = pickVoice(accent);
  if (v) utter.voice = v;
  utter.rate = rate;
  synth.speak(utter);
}

/** Распознать одну фразу с микрофона. Резолвится текстом или отклоняется. */
export function recognizeOnce(accent: Accent = "UK"): Promise<string> {
  return new Promise((resolve, reject) => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return reject(new Error("not-supported"));

    const rec = new SR();
    rec.lang = langFor(accent);
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    let done = false;
    rec.onresult = (e: any) => {
      done = true;
      resolve(String(e.results?.[0]?.[0]?.transcript ?? ""));
    };
    rec.onerror = (e: any) => reject(new Error(e?.error || "error"));
    rec.onend = () => {
      if (!done) reject(new Error("no-speech"));
    };

    try {
      rec.start();
    } catch (err) {
      reject(err as Error);
    }
  });
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

/** Оценка похожести сказанного на эталон, 0..100%. */
export function pronunciationScore(target: string, said: string): number {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z' ]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  const a = norm(target);
  const b = norm(said);
  if (!a || !b) return 0;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return Math.max(0, Math.round((1 - dist / maxLen) * 100));
}
