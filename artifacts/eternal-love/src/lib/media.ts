export type MediaItem = {
  id: string;
  objectPath: string;
  externalUrl: string | null;
  type: "image" | "video";
  caption: string | null;
  uploader: string | null;
  visibility: "public" | "private";
  createdAt: string;
};

const BASE = "/api";

export async function fetchMedia(): Promise<MediaItem[]> {
  try {
    const r = await fetch(`${BASE}/media`);
    if (!r.ok) return [];
    return r.json() as Promise<MediaItem[]>;
  } catch {
    return [];
  }
}

export async function createMedia(body: {
  objectPath: string;
  externalUrl?: string | null;
  type: "image" | "video";
  caption?: string | null;
  uploader?: string | null;
  visibility: "public" | "private";
}): Promise<MediaItem> {
  const r = await fetch(`${BASE}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error("Failed to create media");
  return r.json() as Promise<MediaItem>;
}

export async function updateMedia(id: string, patch: { visibility?: "public" | "private"; caption?: string | null }): Promise<MediaItem> {
  const r = await fetch(`${BASE}/media/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!r.ok) throw new Error("Failed to update media");
  return r.json() as Promise<MediaItem>;
}

export async function deleteMedia(id: string): Promise<void> {
  const r = await fetch(`${BASE}/media/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Failed to delete media");
}

export async function uploadFile(file: File, onProgress?: (pct: number) => void): Promise<string> {
  const res = await fetch(`${BASE}/storage/uploads/request-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
  });
  if (!res.ok) throw new Error("Failed to get upload URL");
  const { uploadURL, objectPath } = (await res.json()) as { uploadURL: string; objectPath: string };
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadURL);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    });
    xhr.addEventListener("load", () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed: ${xhr.status}`))));
    xhr.addEventListener("error", () => reject(new Error("Upload error")));
    xhr.send(file);
  });
  return objectPath;
}

export function mediaUrl(objectPath: string): string {
  return `/api/storage${objectPath}`;
}

const signedUrlCache = new Map<string, string>();

export async function resolveVideoUrl(objectPath: string): Promise<string> {
  const cached = signedUrlCache.get(objectPath);
  if (cached) return cached;
  const r = await fetch(`/api/storage${objectPath}/signed-url`);
  if (!r.ok) throw new Error("Failed to get signed URL");
  const { url } = (await r.json()) as { url: string };
  signedUrlCache.set(objectPath, url);
  setTimeout(() => signedUrlCache.delete(objectPath), 55 * 60 * 1000);
  return url;
}

export type EmbedKind = "youtube" | "vimeo" | "gdrive" | "direct";

export function detectEmbedKind(url: string): EmbedKind {
  if (/youtu\.be\/|youtube\.com/.test(url)) return "youtube";
  if (/vimeo\.com/.test(url)) return "vimeo";
  if (/drive\.google\.com/.test(url)) return "gdrive";
  return "direct";
}

export function buildEmbedUrl(raw: string): string {
  const kind = detectEmbedKind(raw);
  if (kind === "youtube") {
    const m = raw.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/) ?? raw.match(/([A-Za-z0-9_-]{11})/);
    return `https://www.youtube-nocookie.com/embed/${m?.[1] ?? ""}?rel=0&modestbranding=1`;
  }
  if (kind === "vimeo") {
    const m = raw.match(/vimeo\.com\/(\d+)/);
    return `https://player.vimeo.com/video/${m?.[1] ?? ""}?byline=0&portrait=0`;
  }
  if (kind === "gdrive") {
    const m = raw.match(/\/d\/([^/]+)/);
    return `https://drive.google.com/file/d/${m?.[1] ?? ""}/preview`;
  }
  return raw;
}

export function isExternalEmbedUrl(url: string): boolean {
  const kind = detectEmbedKind(url);
  return kind === "youtube" || kind === "vimeo" || kind === "gdrive";
}

const STORAGE_KEY = "wedding_unlocked";
const PASSWORD = "Amira14052026";

export function isUnlocked(): boolean {
  return sessionStorage.getItem(STORAGE_KEY) === "yes";
}

export function tryUnlock(pw: string): boolean {
  if (pw === PASSWORD) { sessionStorage.setItem(STORAGE_KEY, "yes"); return true; }
  return false;
}

export function lock(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
