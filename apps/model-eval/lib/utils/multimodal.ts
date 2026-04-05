/* ── Multimodal support detection and image formatting per provider ── */

import { ModelConfig, ModelProvider } from "@/lib/types";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Check if a model supports image inputs.
 */
export function supportsImages(model: ModelConfig): boolean {
  return model.supportsImages === true;
}

/**
 * Read an image file and return its base64-encoded content.
 * The imagePath is relative to the model-eval app root.
 */
function readImageAsBase64(imagePath: string): string {
  const absolutePath = resolve(process.cwd(), imagePath);
  const buffer = readFileSync(absolutePath);
  return buffer.toString("base64");
}

/**
 * Detect the MIME type from a file path.
 */
function mimeTypeFromPath(imagePath: string): string {
  const ext = imagePath.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "image/png";
  }
}

/**
 * Format image content for Ollama.
 * Ollama expects base64 images in the `images` field of the message.
 */
export function formatImageForOllama(imagePath: string): string[] {
  return [readImageAsBase64(imagePath)];
}

/**
 * Format image content for Anthropic.
 * Returns a content block for the messages array.
 */
export function formatImageForAnthropic(imagePath: string): {
  type: "image";
  source: { type: "base64"; media_type: string; data: string };
} {
  return {
    type: "image",
    source: {
      type: "base64",
      media_type: mimeTypeFromPath(imagePath),
      data: readImageAsBase64(imagePath),
    },
  };
}

/**
 * Format image content for OpenRouter (OpenAI-compatible).
 * Returns a content part with image_url using a data URI.
 */
export function formatImageForOpenRouter(imagePath: string): {
  type: "image_url";
  image_url: { url: string };
} {
  const base64 = readImageAsBase64(imagePath);
  const mime = mimeTypeFromPath(imagePath);
  return {
    type: "image_url",
    image_url: { url: `data:${mime};base64,${base64}` },
  };
}

/**
 * Format image content for any provider.
 */
export function formatImageForProvider(
  provider: ModelProvider,
  imagePath: string
): unknown {
  switch (provider) {
    case "ollama":
      return formatImageForOllama(imagePath);
    case "anthropic":
      return formatImageForAnthropic(imagePath);
    case "openrouter":
      return formatImageForOpenRouter(imagePath);
  }
}
