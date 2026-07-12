export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, company, role, handoff } = body;

  if (!name || !email || !handoff) {
    return Response.json({ error: "Name, email, and handoff are required." }, { status: 400 });
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    return Response.json({ error: "Server not configured." }, { status: 500 });
  }

  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, company, role, handoff }),
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { success: true };
  }

  return Response.json(data);
}
