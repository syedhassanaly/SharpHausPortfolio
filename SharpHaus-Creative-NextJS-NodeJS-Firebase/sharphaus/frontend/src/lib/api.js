export async function sendContactMessage({
  name,
  email,
  message,
  "bot-field": botField = "",
}) {
  const res = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "form-name": "contact",
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      "bot-field": botField,
    }).toString(),
  });

  if (!res.ok) {
    throw new Error(
      "Your message could not be sent. Please try again or email us directly."
    );
  }
}
