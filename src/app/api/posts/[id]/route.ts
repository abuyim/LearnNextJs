// app/api/posts/[id]/route.ts
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = parseInt(params.id, 10);

//   if (isNaN(id)) {
//     return new Response(JSON.stringify({ error: 'Invalid ID' }), {
//       status: 400,
//     });
//   }

//   const post = await prisma.post.findUnique({
//     where: { id },
//   });

//   if (!post) {
//     return new Response(JSON.stringify({ error: 'Post not found' }), {
//       status: 404,
//     });
//   }

//   return new Response(JSON.stringify(post), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

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
