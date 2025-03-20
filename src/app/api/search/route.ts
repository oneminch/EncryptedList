import { NextResponse } from "next/server";
import { searchApps } from "@/lib/data";

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const result = await searchApps(query);

    return NextResponse.json({
      count: result.count,
      searchResults: result.searchResults.slice(0, 3)
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
