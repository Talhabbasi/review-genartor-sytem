import axios from "axios";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("placeId");
  console.log(query);
  const url = `https://www.google.com/maps/place/?q=place:${query}`;

  // Shorten the URL using the Rebrandly API
  const rebrandlyResponse = await axios.post(
    "https://api.rebrandly.com/v1/links",
    {
      destination: url,
      domain: { fullName: process.env.NEXT_DOMAIN_NAME },
    },
    {
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_REBRANDLY_API_KEY,
        workspace: process.env.NEXT_REBRANDLY_WORKSPACE_KEY,
      },
    }
  );

  return Response.json({
    data: {
      ...rebrandlyResponse.data,
      review_url: `https://search.google.com/local/writereview?placeid=${query}`,
    },
  });
}
