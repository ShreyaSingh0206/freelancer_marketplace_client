# HireHatch — Freelancer Marketplace (Frontend)

HireHatch is a full-stack freelancer marketplace that connects clients with freelancers for creating, managing, and completing freelance projects.

This repository contains the **frontend application** — built with Next.js, React, and Tailwind CSS. It talks to the HireHatch backend API for authentication, gigs, subscriptions, payments, and real-time chat. The backend is maintained in a separate repository (linked below).

The platform supports role-based authentication, freelancer gigs, subscription plans, secure payments, portfolio/image uploads, real-time communication, and project management.

🔗 [Backend Repository](https://github.com/ShreyaSingh0206/freelancer_marketplace_server) · 🎥 [Demo Video](https://youtu.be/CKl-mPwfkQQ)

---

## Table of Contents

- [Demo](#demo)
- [Related Repository](#related-repository)
- [Features](#features)
- [User Roles](#user-roles)
- [Application Workflow](#application-workflow)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Authentication](#authentication)
- [Real-Time Communication](#real-time-communication)
- [Payment Workflow](#payment-workflow)
- [Subscription Plans](#subscription-plans)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Key Technical Highlights](#key-technical-highlights)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Demo

🎥 **Project Demo:** [Watch the HireHatch Project Demo →](https://youtu.be/CKl-mPwfkQQ)

---

## Related Repository

This is the **frontend** repository. The backend (Node.js/Express API) is maintained separately:

🔧 [HireHatch Backend Repository →](https://github.com/ShreyaSingh0206/freelancer_marketplace_server)

---

## Features

- **Role-Based Authentication** — Separate Client and Freelancer experiences, backed by JWT auth with HTTP-only cookies.
- **Freelancer Profiles** — Freelancers can create profiles showcasing their skills, experience, portfolio, and services.
- **Gig Management** — Freelancers can create and manage service listings with descriptions, pricing, and other details.
- **Subscription Plans** — Freelancers select a subscription plan before creating gigs.
- **Project Discovery** — Clients can discover freelancers, explore gigs, and initiate freelance projects.
- **Real-Time Chat** — Clients and freelancers communicate through real-time messaging via Socket.IO.
- **Secure Payments** — Stripe Checkout flow for subscriptions and payments.
- **Image & File Uploads** — Profile and portfolio media uploads, stored via Cloudinary.
- **Search & Discovery** — Clients can browse and discover available freelance services.
- **Responsive UI** — Built with Tailwind CSS and shadcn/ui for a smooth experience across screen sizes.

---

## User Roles

### Client

- Browse freelancer services
- View freelancer profiles
- Explore gigs
- Contact freelancers
- Initiate projects
- Communicate through real-time chat
- Make payments through the platform

### Freelancer

- Create and manage their profile
- Showcase skills and portfolio
- Create and manage gigs
- Select subscription plans
- Communicate with clients
- Manage freelance projects

---

## Application Workflow

```text
                         HireHatch
                            │
              ┌─────────────┴─────────────┐
              │                           │
            Client                    Freelancer
              │                           │
              ▼                           ▼
       Browse Services              Create Profile
              │                           │
              ▼                           ▼
       View Freelancer               Select Plan
              │                           │
              └─────────────┬─────────────┘
                             │
                             ▼
                       Start Project
                             │
                             ▼
                      Real-Time Chat
                             │
                             ▼
                          Payment
                             │
                             ▼
                     Project Workflow
```

---

## System Architecture

```text
                   ┌──────────────────────┐
                   │         User         │
                   └───────────┬──────────┘
                               │
                               ▼
                   ┌──────────────────────┐
                   │   Next.js Frontend   │  ◄── this repository
                   └───────────┬──────────┘
                               │
                            REST API
                               │
                               ▼
                   ┌──────────────────────┐
                   │  Express.js Backend  │
                   └───────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
       │   MongoDB   │  │ Cloudinary  │  │   Stripe    │
       │   Database  │  │   Storage   │  │   Payments  │
       └─────────────┘  └─────────────┘  └─────────────┘

                   ┌──────────────────────┐
                   │      Socket.IO       │
                   │   Real-Time Chat     │
                   └──────────────────────┘
```

The frontend communicates with the backend exclusively through REST API calls and a Socket.IO connection for real-time chat — it holds no direct database, storage, or payment credentials.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js, React.js, JavaScript, Tailwind CSS, shadcn/ui |
| **Real-Time** | Socket.IO Client |
| **Payments** | Stripe Checkout (redirect flow) |
| **Development Tools** | Git, GitHub, Postman |
| **Backend** *(separate repo)* | Node.js, Express.js, MongoDB, JWT, Cloudinary, Multer |

---

## Authentication

The frontend uses JWT-based authentication issued by the backend, stored in HTTP-only cookies.

```text
User Login (Frontend Form)
    │
    ▼
Credentials Sent to Backend API
    │
    ▼
JWT Generated by Backend
    │
    ▼
HTTP-only Cookie Set
    │
    ▼
Authenticated Requests from Frontend
```

Since the cookie is HTTP-only, the frontend never directly handles or stores the raw token — it relies on the browser to send it automatically with each request.

---

## Real-Time Communication

The frontend connects to the backend's Socket.IO server to enable real-time messaging between clients and freelancers.

```text
Frontend Client
   │
   │ Socket Connection
   ▼
Socket.IO Server (Backend)
   │
   ▼
Other Party's Frontend Client
```

Messages appear instantly on both ends without requiring a page refresh.

---

## Payment Workflow

The frontend initiates Stripe Checkout sessions created by the backend and redirects the user to complete payment.

```text
Freelancer Selects Plan (Frontend)
     │
     ▼
Request Checkout Session (Backend)
     │
     ▼
Redirect to Stripe Checkout
     │
     ▼
Payment Confirmation
     │
     ▼
Redirect Back to Frontend
     │
     ▼
Subscription Status Updated
```

---

## Subscription Plans

| Plan | Price |
|---|---|
| Basic | ₹199 |
| Pro | ₹499 |
| Premium | ₹999 |

Freelancers select a subscription plan before gaining access to gig creation.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [HireHatch Backend](https://github.com/ShreyaSingh0206/freelancer_marketplace_server) (local or deployed)
- Git

### Frontend Setup

Clone the repository and install dependencies:

```bash
git clone <this-repository-url>
cd hirehatch-frontend
npm install
```

Create a `.env.local` file pointing to your backend API (see [Environment Variables](#environment-variables)).

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000` by default.

### Backend Setup

The backend is maintained in a separate repository:

🔗 [HireHatch Backend Repository →](https://github.com/ShreyaSingh0206/freelancer_marketplace_server)

```bash
git clone <backend-repository-url>
cd hirehatch-backend
npm install
npm run dev
```

---

## Environment Variables

> ⚠️ Never commit `.env` or `.env.local` files or API keys to GitHub.

Required environment variables:

```env
NEXT_PUBLIC_API_URL=
```

A `.env.example` file is included as a template.

---

## Project Structure
```text
freelancer_marketplace_client/
├── app/                 # Next.js application routes and pages
├── components/          # Reusable UI components
├── contexts/            # React context providers and state management
├── lib/                 # API clients, helpers, and utility functions
├── public/              # Static assets
├── .gitignore
├── components.json       # shadcn/ui configuration
├── jsconfig.json         # JavaScript configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
└── .env.example         # Environment variable template
```
The backend is maintained separately — see the [Backend Repository →](https://github.com/ShreyaSingh0206/freelancer_marketplace_server).

---

## Key Technical Highlights

- Built the client-facing application for a full-stack freelancer marketplace using Next.js and React.
- Implemented role-based UI flows for Client and Freelancer experiences.
- Integrated JWT/cookie-based authentication with the backend API.
- Built real-time chat using Socket.IO client.
- Integrated Stripe Checkout for subscription and payment flows.
- Designed a responsive interface using Tailwind CSS and shadcn/ui.
- Consumed REST APIs for authentication, users, gigs, projects, subscriptions, payments, and communication.

---

## Future Improvements

- Freelancer reviews and ratings UI
- Advanced freelancer search and filtering
- Project milestone tracking views
- Notifications system
- Enhanced payment and transaction history views
- Recommendation UI for matching clients with freelancers
- Admin dashboard

---

## Author

**Shreya Kumari**
B.Tech Information Technology

[GitHub →](https://github.com/ShreyaSingh0206/)
