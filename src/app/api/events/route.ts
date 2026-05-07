import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') ?? '20', 10)
    const offset = parseInt(searchParams.get('offset') ?? '0', 10)
    const neighborhood = searchParams.get('neighborhood')
    const status = searchParams.get('status') ?? 'published'
    const date = searchParams.get('date')

    const where: Record<string, unknown> = { status }

    if (neighborhood) {
      where.venue = { neighborhood }
    }

    if (date) {
      const d = new Date(date)
      const next = new Date(d)
      next.setDate(next.getDate() + 1)
      where.startsAt = { gte: d, lt: next }
    } else {
      where.startsAt = { gte: new Date() }
    }

    const [events, total] = await Promise.all([
      db.event.findMany({
        where,
        include: {
          venue: {
            select: { id: true, name: true, neighborhood: true, latitude: true, longitude: true },
          },
          artists: { include: { artist: { select: { id: true, name: true } } } },
        },
        orderBy: { startsAt: 'asc' },
        take: limit,
        skip: offset,
      }),
      db.event.count({ where }),
    ])

    return NextResponse.json({ events, total, limit, offset })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
