# TribalCraft Connect - Vite + React Frontend

A complete frontend project for **TribalCraft Connect - Promote Value-Added Handicrafts** built with:

- Vite + React
- React Router DOM
- Tailwind CSS
- Mock role-based authentication via localStorage

## Run the project

```bash
npm install
npm run dev
```

## Role-based test login

On `/login`, pick one role:

- `admin`
- `artisan`
- `customer`
- `consultant` (Cultural Consultant)

User session is stored in `localStorage` key: `tribalcraft_user`.

## Project structure

```text
src/
  components/
  pages/
  layouts/
  routes/
  data/
  context/
  App.jsx
```
