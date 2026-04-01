# WÈRA Platform - Enterprise v1

Kenya's premier e-commerce labour platform connecting skilled and semi-skilled workers with formal job opportunities.

## 🚀 Deployment Guide (Render)

To deploy this application to Render, follow these steps:

1.  **Create a New Web Service** on Render and connect it to your GitHub repository: `weraplatform-aistudiov1`.
2.  **Build Command:** `npm run build`
3.  **Start Command:** `npm run start`
4.  **Environment Variables:** Add the following keys in the Render Dashboard under **Environment**:

| Key | Value |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `VITE_SUPABASE_URL` | `https://xhyvzxcnruwymskeycvf.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `(Your Supabase Anon Key)` |
| `OPENROUTER_API_KEY` | `(Your Open Router API Key)` |
| `MPESA_CONSUMER_KEY` | `HvsgmAGnGMvZxMBPBTIJlTK8WtzD3NNBp5kFGEWtdGb86K05` |
| `MPESA_CONSUMER_SECRET` | `XU2fur5kiC94TNyc1vtCSAABH2vwZtOhUrvUUtbzRWqDauMBDR1djbv9WdjbYIGj` |
| `JWT_SECRET` | `26ab8e0a-e621-4702-afb6-09856975a143` |

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Motion
- **Backend:** Node.js, Express (Full-stack proxy)
- **Database/Auth:** Supabase
- **AI:** Gemini 2.0 Flash via Open Router
- **Payments:** M-Pesa STK Push Integration

## 🔒 Security Note

The `.env` file is ignored by Git. Always use the `.env.example` as a template for new environments. Never commit actual secrets to the repository.
