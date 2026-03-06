export default async function handler(req, res) {
  const API_KEY = "AIzaSyBqJP-SEyfvOlu1ZYxepzxjIraRKStdiaw";

  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI did not respond.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Error connecting AI" });
  }
}
