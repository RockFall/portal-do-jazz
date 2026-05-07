import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const venues = await db.venue.findMany({
      where: { active: true },
      include: {
        _count: {
          select: {
            events: {
              where: { status: 'published', startsAt: { gte: new Date() } },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ venues })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
