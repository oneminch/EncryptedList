import { NextResponse } from "next/server";
import { queryProducts } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "";
  const tags = searchParams.get("tags")?.split(",") || [];

  const data = await queryProducts({
    page,
    query,
    sort,
    tags
  });

  return NextResponse.json({
    products: data.recipes,
    total: data.total
  });
}
