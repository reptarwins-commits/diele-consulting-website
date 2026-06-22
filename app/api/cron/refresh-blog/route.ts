import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Triggered daily by the Vercel Cron defined in vercel.json. Vercel automatically
// sends `Authorization: Bearer ${CRON_SECRET}` when CRON_SECRET is set on the project.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");

  return NextResponse.json({ ok: true, revalidated: ["/blog"], at: new Date().toISOString() });
}
