import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') ?? '20', 10)
    const type = searchParams.get('type')

    const posts = await db.post.findMany({
      where: type ? { type } : undefined,
      orderBy: { publishedAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
