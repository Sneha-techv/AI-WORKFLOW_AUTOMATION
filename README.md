Project Overview

Workflow AI is a web-based platform that allows companies to manage customer tickets efficiently using AI-powered automation. It integrates a frontend, backend, and n8n workflows to process tickets, automate responses, and analyze data.

Key Features:

Customer and HR dashboards
Ticket creation and tracking
Webhook integration for automated workflows
AI-powered decision-making for routing tickets
Fully deployed on public URL (Render / Vercel)
🏗️ Project Structure
workflow-ai/
├─ frontend/           # React/Vue/Next.js frontend
│  ├─ src/
│  ├─ public/
│  └─ package.json
├─ backend/            # Node.js / Express / FastAPI backend
│  ├─ models/
│  ├─ routes/
│  └─ server.js
├─ n8n/                # n8n workflows
│  └─ workflow.json
├─ README.md
└─ .env                # API keys & config (not committed)
💻 Frontend
Built using React/Next.js (adjust if Vue).
Features:
Login/Sign up pages
HR dashboard and customer dashboard
Tickets panel (existing and new customers)
Integration with backend APIs via fetch/axios

Run locally:

cd frontend
npm install
npm start    # or yarn start

Build for production:

npm run build   # or yarn build
🔗 Backend
Built using Node.js + Express (or your stack).
Handles API requests from frontend and forwards ticket data to n8n via webhook.
Stores tickets and user data in database (MySQL/PostgreSQL).

Run locally:

cd backend
npm install
npm start

Environment variables (.env):

PORT=5000
DATABASE_URL=<your_db_url>
N8N_WEBHOOK_URL=<your_n8n_webhook_url>
⚡ n8n Workflow
Handles automated processing of tickets.
Triggered via webhook from backend.
Workflow can:
Assign tickets to HR/customer
Send notifications
Apply automation rules

Deployment:

Hosted on n8n.cloud
 or self-hosted.
Make sure workflow is active to receive webhook events.

Test webhook locally:

curl -X POST <n8n_webhook_url> -H "Content-Type: application/json" -d '{"ticket_id": 123, "customer": "John"}'
🌐 Deployment
Frontend → Render / Vercel (public URL replaces localhost)
Backend → Render / Heroku / any cloud service
n8n → n8n cloud or self-hosted (workflow active & public)

Tip:
Replace all http://localhost:8080 URLs with the public frontend URL in backend and n8n webhook configuration.

📝 Usage
Open the deployed frontend URL.
Sign in or register.
Create tickets (for existing or new customers).
Tickets will be processed automatically by n8n workflow.
Check dashboard for ticket status.
🔧 Troubleshooting
Tickets show but n8n doesn’t work:
Make sure the webhook URL is correct and workflow is active.
Check network logs for POST requests from backend.
Ensure backend/public URLs are reachable by n8n.
Local testing:
Use Ngrok
 to expose localhost:8080 to a public URL for testing.
📦 Tech Stack
Frontend: React/Next.js
Backend: Node.js + Express
Database: MySQL / PostgreSQL
Automation: n8n workflows
Deployment: Render / Vercel / Ngrok (for testing)
📄 License

This project is for educational and demonstration purposes.
