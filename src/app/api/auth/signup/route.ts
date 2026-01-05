import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

import { ApiError, toErrorResponse } from "@/lib/api";
import { prisma } from "@/lib/db";
import { signupSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = signupSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });

    if (existing) {
      throw new ApiError(409, "Email already in use");
    }

    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: await hash(input.password, 12),
        name: input.name ?? null,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    return toErrorResponse(err);
  }
}
