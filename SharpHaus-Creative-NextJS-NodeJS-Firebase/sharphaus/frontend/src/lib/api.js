export async function sendContactMessage({
  name,
  email,
  message,
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("Contact API URL is not configured.");
  }

  const response = await fetch(
    `${apiUrl.replace(/\/+$/, "")}/api/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      }),
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message ||
        result.error ||
        "Your message could not be sent. Please try again."
    );
  }

  return result;
}
