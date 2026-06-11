import { generateLlmsTxt } from "@/lib/llms-content";

export const dynamic = "force-static";

export async function GET() {
  return new Response(generateLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
