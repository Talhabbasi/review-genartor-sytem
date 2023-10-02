import axios from "axios";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("text");
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.NEXT_GOOGLE_API_KEY}`
  );
  const data = res.data;
  return Response.json({ data });
}
