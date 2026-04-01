export type CreateLinkResponse =
  | {
      ok: true;
      data: {
        id: string;
        originalUrl: string;
        shortCode: string;
        shortUrl: string;
        manageUrl: string;
        createdAt: string;
      };
    }
  | {
      ok: false;
      error: string;
    };
