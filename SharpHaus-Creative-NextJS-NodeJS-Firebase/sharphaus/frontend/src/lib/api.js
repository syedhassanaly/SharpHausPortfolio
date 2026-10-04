const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function sendContactMessage({ name, email, message }) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }

  return data;
}
