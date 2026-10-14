// The contact form talks to a Netlify Function that lives in the same site,
// so no separate backend server or NEXT_PUBLIC_API_URL is needed.
const CONTACT_ENDPOINT = "/.netlify/functions/contact";

export async function sendContactMessage({ name, email, message, "bot-field": botField = "" }) {
  let response;
  try {
    response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        "bot-field": botField,
      }),
    });
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.error ||
        result.message ||
        "Your message could not be sent. Please try again or email us directly."
    );
  }

  return result;
}
