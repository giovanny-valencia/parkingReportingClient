# Illegal Parking Reporter (Mobile Client)

**React Native (Expo)** + **TypeScript** mobile app for reporting illegal parking with **geolocation**, **photos**, and **city boundary validation**.

Backend: [github.com/giovanny-valencia/parking-app-backend](https://github.com/giovanny-valencia/parking-app-backend)

---

## Overview
Cross-platform (iOS/Android) app enabling users to:
- Create accounts
- Submit reports with: **geolocation**, **timestamp**, **license plate**, and **violation photos**
- View officer map with pinned reports

---

## Live Demo (Working)
- **User registration & login** with JWT
- **User dashboard** (post-login)

> *Note: Report submission and officer map are under active rewrite. Old prototype code could be found under refactor folder, but it was ugly 😅. New redesign follows domain/feature driven development*

---

## Features (Implemented)
- JWT-based authentication & session persistence
- Real-time geolocation → backend validates city boundaries
- Client-side input validation
- Black-box tested across full user flow

---

## Features (In Progress)
- Report submission with full data
- Officer map view with **Google Navigation SDK**

---

## Tech Stack
- **React Native (Expo)** – iOS/Android
- **TypeScript** – Type safety
- **Zustand** – State management
- **Axios** – API calls
- **Expo Location** – Geolocation
