import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('GET /api/posts error:', error.message);
    } else {
      console.error('GET /api/posts error:', error);
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    const newPost = await prisma.post.create({
      data: { title, content },
    });

    return NextResponse.json(newPost);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('POST error:', error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
}
