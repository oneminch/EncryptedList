import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/data";

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const result = await searchProducts(query);

    return NextResponse.json(result);
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
