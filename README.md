# InfoCenterAI

InfoCenterAI is a full-stack university assistant platform:
- **Frontend**: React + Vite (student/admin UI)
- **Backend**: Spring Boot + PostgreSQL (auth, chat, requests, Drive integration)
- **AI retrieval pipeline**: n8n workflow + Pinecone + LLM providers

This guide covers first-time setup and local run.

---

## 1) Prerequisites

Install these tools first:
- Node.js 20+
- npm 10+
- Java 25
- Maven 4 (or use the included `mvnw` wrapper)
- PostgreSQL 14+
- n8n instance (local or hosted)
- A Google Cloud project with Google Drive API enabled

---

## 2) Repository structure

- `client/` → React frontend
- `server/` → Spring Boot backend
- `workflow.json` → n8n workflow used for Drive ingestion + AI retrieval
- `db.sql` → database schema reference

---

## 3) Database setup

1. Create a PostgreSQL database named `infocenterai` (or use your own name).
2. Configure backend DB env vars (see section 5).
3. The backend uses `spring.jpa.hibernate.ddl-auto=update`, so schema can be auto-managed at startup.
   - You can still use `db.sql` as reference when needed.

---

## 4) Google Cloud setup (important)

You must create OAuth credentials in GCP for Google Drive access.

### 4.1 Create `credentials.json`

1. In Google Cloud Console:
   - Enable **Google Drive API**.
   - Create **OAuth 2.0 Client ID** credentials.
2. Download the OAuth client file and save it as:
   - `server/src/main/resources/credentials.json`

> This is the `credentials.json` file referenced by the project setup. Keep it private.

### 4.2 Generate runtime values used by backend

The backend expects:
- `GOOGLE_CREDENTIALS_BASE64` = Base64 content of your GCP `credentials.json`
- `GOOGLE_REFRESH_TOKEN` = refresh token for the same OAuth client

These are read by `GoogleDriveService` to authenticate Drive API calls.

---

## 5) Backend configuration (`server`)

Set these environment variables before running backend:

- `SPRING_DATASOURCE_URL` (default: `jdbc:postgresql://localhost:5432/infocenterai`)
- `SPRING_DATASOURCE_USERNAME` (default: `postgres`)
- `SPRING_DATASOURCE_PASSWORD` (default: `1235`)
- `JWT_SECRET_KEY` (optional override)
- `GOOGLE_CREDENTIALS_BASE64` (**required**)
- `GOOGLE_REFRESH_TOKEN` (**required**)

### Run backend

From `server/`:

```bash
./mvnw spring-boot:run
```

Windows:

```bash
mvnw.cmd spring-boot:run
```

Backend runs on `http://localhost:8080`.
Swagger UI: `http://localhost:8080/swagger-ui.html`

---

## 6) Frontend configuration (`client`)

Create `client/.env` with:

```env
VITE_API_URL=http://localhost:8080
VITE_DRIVE_KNOWLEDGE_BASE_FOLDER_ID=YOUR_KNOWLEDGE_BASE_FOLDER_ID
VITE_DRIVE_REQUESTS_FOLDER_ID=YOUR_REQUESTS_FOLDER_ID
```

All client environment variables used by the app are:

- `VITE_API_URL` (**required**)  
   Base URL of the backend API (example: `http://localhost:8080`).
- `VITE_DRIVE_KNOWLEDGE_BASE_FOLDER_ID` (**required**)  
   Google Drive folder ID used for the knowledge-base files (admin dashboard upload/list).
- `VITE_DRIVE_REQUESTS_FOLDER_ID` (**required**)  
   Google Drive folder ID used for generated/processed request files.

### Run frontend

From `client/`:

```bash
npm install
npm run dev
```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

---

## 7) n8n workflow setup

1. Import `workflow.json` into your n8n instance.
2. Configure credentials used by workflow nodes:
   - Google Drive OAuth2
   - Pinecone
   - Gemini / OpenRouter / DeepSeek (as used in your instance)
3. Verify folder IDs and webhook URLs in the imported workflow.

### First run note

For this project setup (Docker-oriented), Google credentials are injected via environment variables:
- `GOOGLE_CREDENTIALS_BASE64`
- `GOOGLE_REFRESH_TOKEN`

So the backend does **not** require an interactive Google login on first run.

Only n8n credentials may require OAuth login if they are not already configured in your n8n instance.
If you need to connect n8n manually, use the Google account that has access to the knowledge-base folder id you set in `client/.env` (`VITE_DRIVE_KNOWLEDGE_BASE_FOLDER_ID`) and in `workflow.json`.

---

## 8) Recommended startup order

1. Start PostgreSQL
2. Start backend (`server`)
3. Start frontend (`client`)
4. Start/enable n8n workflow
5. Test by uploading/updating a file in the configured Google Drive folder

---

## 9) Quick verification checklist

- Backend starts with no missing env var errors
- Login/register works from frontend
- Admin pages can list Drive files
- n8n workflow receives Drive create/update events
- Chat requests receive AI responses

---

## 10) Security notes

- Never commit real `credentials.json`, refresh tokens, or API secrets.
- Rotate secrets if they were exposed.
- Restrict OAuth credentials to trusted redirect URIs and accounts.
