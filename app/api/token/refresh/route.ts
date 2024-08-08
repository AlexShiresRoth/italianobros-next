import { createClient } from "@vercel/kv";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RefreshTokenRespone = {
  access_token: string;
  token_type: string;
  expires_in: number; // seconds
};

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

async function getRestTokenFromDB(): Promise<string | null> {
  const token = await kv.get("token");

  return token as string;
}

async function setInstagramToken(token: string) {
  return await kv.set("token", token);
}

async function getRefreshTokenFromInstagram(accessToken: string) {
  try {
    const res = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`,
      { next: { revalidate: 0 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch refresh token", res.statusText);
      return null;
    }
    const data: RefreshTokenRespone = await res.json();

    return data.access_token;
  } catch (error) {
    console.error("refresh token error:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (
      request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("*** CRON JOB RUNNING ***");

    const token = await getRestTokenFromDB();

    console.log("*** RETRIEVED TOKEN ***", token);

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    const access_token = await getRefreshTokenFromInstagram(token);

    console.log("*** RETRIEVED REFRESH TOKEN ***", access_token);

    if (!access_token) {
      return NextResponse.json(
        { error: "Failed to get refresh token from instagram" },
        { status: 400 }
      );
    }

    await setInstagramToken(access_token);

    console.log("*** SET NEW TOKEN IN DB ***", access_token);

    revalidateTag("token");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 400 }
    );
  }
}
