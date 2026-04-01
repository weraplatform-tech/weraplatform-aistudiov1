import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Wera Platform API is running" });
  });

  // M-Pesa STK Push Trigger (Stub for now, requires Safaricom OAuth)
  app.post("/api/payments/stkpush", async (req, res) => {
    const { amount, phone, orderId } = req.body;
    // In a real app, you'd get an OAuth token from Safaricom first
    // Then call the STK Push API
    console.log(`Triggering M-Pesa STK Push for ${phone}, amount: ${amount}`);
    res.json({ success: true, checkoutRequestId: "ws_CO_00000000000000000000" });
  });

  // Open Router Proxy (to hide API key)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        req.body,
        {
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "http://weraplatform.dedyn.io/",
            "X-Title": "Wera Platform",
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: "AI Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
