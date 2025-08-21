export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json({ ok: true, message: "Hello from AmLI API" });
}

// api/hello.js
export default function handler(req, res) {
    res.status(200).json({ message: "Hello from new deployment!" });
  }
  