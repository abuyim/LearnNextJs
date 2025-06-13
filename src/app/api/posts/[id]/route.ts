import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) }
  });

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200
  });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { title, content } = await req.json();
  const updated = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { title, content },
  });
  return Response.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.post.delete({ where: { id: Number(params.id) } });
  return Response.json({ message: 'Deleted' });
}
