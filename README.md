## 📖 About The Project


This is the **Node.js/Express backend** for **DevTinder** — a "Tinder for developers" platform where users create a profile, swipe through a feed, send/accept connection requests, chat in real time once connected, and can upgrade to a premium membership via Razorpay.

It handles authentication, profile & connection data, a real-time messaging layer over WebSockets, and payment order creation/verification — exposed as a REST API consumed by the [React frontend](https://github.com/ImSachin023/DevTinder--Frontend-ReactJs).

---

## ✨ Features

- 🔐 **JWT-based Authentication** — signup/login/logout with secure HTTP-only cookies
- 👤 **Profile Management** — view, edit, and update password
- 🤝 **Connection Requests** — send a request (`interested`/`ignored`) and review it (`accepted`/`rejected`)
- 📰 **Smart Feed** — returns discoverable profiles, excluding users already connected/requested
- 💬 **Real-time Chat** — Socket.io-powered messaging between connected users
- 💳 **Payments** — Razorpay order creation, signature verification, and webhook handling for premium upgrades
- 🌐 **CORS-secured API** — configured for credentialed cross-origin requests from the frontend

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB + Mongoose (ODM) |
| **Auth** | JWT, bcrypt (password hashing), HTTP-only cookies |
| **Real-time** | Socket.io |
| **Payments** | Razorpay (orders + webhooks) |
| **Deployment** | Vercel |

---

## 🏗️ Architecture

```
                ┌────────────┐        REST (Axios, withCredentials)        ┌──────────────┐
                │  React App │ ───────────────────────────────────────────▶│  Express API │
                └────────────┘                                              └──────┬───────┘
                       │                                                            │
                       │           WebSocket (Socket.io)                           │ Mongoose
                       └───────────────────────────────────────────────────────────▶ MongoDB
                       │
                       │            Checkout + webhook
                       └───────────────────────────────────────────────▶ Razorpay
```

- **Auth flow:** `POST /signup` and `POST /login` issue a JWT stored in an HTTP-only cookie → every protected route runs through an `isAuthenticated` middleware that verifies the token before hitting the controller.
- **Connections:** a single `ConnectionRequest` model tracks status (`interested`, `ignored`, `accepted`, `rejected`) between a `fromUserId` and `toUserId`, so requests and matches share one schema.
- **Feed:** `/user/feed` filters out the logged-in user's existing connections and pending requests so the same profile never shows twice.
- **Chat:** Socket.io rooms are created per conversation (`targetUserId`) once two users are connected, so messages are scoped and not broadcast globally.
- **Payments:** an order is created server-side, the frontend opens Razorpay checkout with that order ID, and a webhook confirms payment before flipping the user's membership to premium — payment status is never trusted from the client alone.

---

## 📡 API Reference

### Auth Router
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate and receive a JWT cookie |
| `POST` | `/logout` | Clear the auth cookie |

### Profile Router
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/profile/view` | Get the logged-in user's profile |
| `PATCH` | `/profile/edit` | Update profile fields |
| `PATCH` | `/profile/password` | Change / reset password |

### Connection Request Router
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/request/send/:status/:userId` | Send a connection request — `status`: `interested` or `ignored` |
| `POST` | `/request/review/:status/:requestId` | Respond to a request — `status`: `accepted` or `rejected` |

### User Router
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/user/requests/received` | List incoming connection requests |
| `GET` | `/user/connections` | List all active connections |
| `GET` | `/user/feed` | Get a feed of other discoverable users |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/payment/create` | Create a Razorpay order for premium upgrade |
| `POST` | `/payment/webhook` | Razorpay webhook — verifies and confirms payment |

> Full endpoint list also available in [`APIList.md`](./APIList.md).

---

## 📂 Project Structure

```
DevTinder-Backend-NodeJs-/
├── src/
│   ├── models/          # Mongoose schemas (User, ConnectionRequest, Payment, Chat)
│   ├── routes/           # authRouter, profileRouter, requestRouter, userRouter, paymentRouter
│   ├── middlewares/       # auth (JWT verification)
│   ├── utils/              # validation, Razorpay instance, socket setup
│   └── app.js              # Express app entry point
├── package.json
└── APIList.md
```

> Adjust to match the actual `src/` layout — recruiters do open this to check organization.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB instance (local or Atlas)
- A Razorpay account (test mode keys are fine for local dev)

### Installation

```bash
git clone https://github.com/ImSachin023/DevTinder-Backend-NodeJs-.git
cd DevTinder-Backend-NodeJs-
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
DB_CONNECTION_SECRET=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Run locally

```bash
npm start
```

The API will be running at `http://localhost:3000`. Make sure the [frontend's](https://github.com/ImSachin023/DevTinder--Frontend-ReactJs) `VITE_API_BASE_URL` points here.

---

## 🗺️ Roadmap

- [ ] Add automated tests (Jest/Supertest)
- [ ] Rate limiting on auth routes
- [ ] Pagination on `/user/feed` and chat history
- [ ] OAuth login (Google)

---

## 👤 Author

**Sachin Kumar**
- GitHub: [@ImSachin023](https://github.com/ImSachin023)
- Live App: [dev-coder-nu.vercel.app](https://dev-coder-nu.vercel.app)

---

## 📄 License

Open source — feel free to explore, fork, and learn from it.
