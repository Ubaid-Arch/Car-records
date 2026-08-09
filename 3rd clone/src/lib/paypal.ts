const PAYPAL_API = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
const SECRET = process.env.PAYPAL_SECRET || "";

export class PayPalError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.name = "PayPalError";
    this.status = status;
  }
}

export function paypalConfigured(): boolean {
  return Boolean(CLIENT_ID && SECRET && CLIENT_ID !== "test" && SECRET !== "test");
}

export function paypalApiBase(): string {
  return PAYPAL_API;
}

/** Fetch an OAuth2 access token, with a clear error when credentials are absent. */
export async function getAccessToken(): Promise<string> {
  if (!paypalConfigured()) {
    throw new PayPalError(
      "Card payments are not configured on this environment yet. Add your PayPal credentials to enable checkout.",
      503
    );
  }

  const auth = Buffer.from(`${CLIENT_ID}:${SECRET}`).toString("base64");

  let res: Response;
  try {
    res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });
  } catch {
    throw new PayPalError("Could not reach PayPal. Please try again in a moment.");
  }

  if (!res.ok) {
    throw new PayPalError("PayPal rejected our credentials. Please contact support.", 502);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new PayPalError("PayPal did not return an access token.");
  return data.access_token;
}

export function resolveBaseUrl(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const origin = request.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");
  const host = request.headers.get("host") ?? "localhost:3000";
  const proto = host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https";
  return `${proto}://${host}`;
}
