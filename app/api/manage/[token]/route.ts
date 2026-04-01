import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { hashValue } from "@/lib/security";
import { normalizeUrl } from "@/lib/urls";

type ManageRouteProps = {
  params: Promise<{
    token: string;
  }>;
};

async function getLinkIdFromToken(token: string) {
  const link = await db.link.findUnique({
    where: {
      manageTokenHash: hashValue(token)
    },
    select: {
      id: true
    }
  });

  return link?.id ?? null;
}

export async function PATCH(request: Request, context: ManageRouteProps) {
  try {
    const { token } = await context.params;
    const linkId = await getLinkIdFromToken(token);

    if (!linkId) {
      return NextResponse.json({ ok: false, error: "Manage link is invalid." }, { status: 404 });
    }

    const body = (await request.json()) as {
      originalUrl?: string;
      isActive?: boolean;
    };

    const originalUrl = body.originalUrl ? normalizeUrl(body.originalUrl) : undefined;

    await db.link.update({
      where: { id: linkId },
      data: {
        originalUrl,
        isActive: typeof body.isActive === "boolean" ? body.isActive : undefined
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: false, error: "Unable to update this short link." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: ManageRouteProps) {
  const { token } = await context.params;
  const linkId = await getLinkIdFromToken(token);

  if (!linkId) {
    return NextResponse.json({ ok: false, error: "Manage link is invalid." }, { status: 404 });
  }

  await db.link.delete({
    where: {
      id: linkId
    }
  });

  return NextResponse.json({ ok: true });
}
