import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.OPENWEATHER_API_KEY
const GEO_URL = "https://api.openweathermap.org/geo/1.0"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(`${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`)

    if (!response.ok) {
      throw new Error("Failed to search cities")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching cities:", error)
    return NextResponse.json({ error: "Failed to search cities" }, { status: 500 })
  }
}
