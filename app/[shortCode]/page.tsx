import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getClientIp, hashValue } from "@/lib/security";

type RedirectPageProps = {
  params: Promise<{
    shortCode: string;
  }>;
};

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortCode } = await params;
  const link = await db.link.findUnique({
    where: {
      shortCode
    }
  });

  if (!link || !link.isActive) {
    notFound();
  }

  if (link.expiresAt && link.expiresAt <= new Date()) {
    notFound();
  }

  const requestHeaders = await headers();
  const referrer = requestHeaders.get("referer");
  const userAgent = requestHeaders.get("user-agent");
  const ip = getClientIp(
    new Request("http://localhost", {
      headers: requestHeaders
    })
  );

  await db.$transaction([
    db.link.update({
      where: { id: link.id },
      data: {
        clickCount: {
          increment: 1
        }
      }
    }),
    db.clickEvent.create({
      data: {
        linkId: link.id,
        referrer,
        userAgent,
        ipHash: ip ? hashValue(ip) : null
      }
    })
  ]);

  redirect(link.originalUrl as never);
}
