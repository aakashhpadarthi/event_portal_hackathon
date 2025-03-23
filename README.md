# EventFlow - Smart Event Booking & Entry Management System

A modern, feature-rich event booking and management platform built with the MERN stack, featuring real-time updates, QR code check-ins, and an intuitive admin dashboard.

## Features

- 🎫 **Smart Event Booking**
  - Real-time ticket availability
  - Dynamic pricing
  - QR code-based e-tickets
  - Secure payment processing

- 📱 **Modern UI/UX**
  - Responsive design
  - Dark mode support
  - Smooth animations
  - Interactive components

- 🔐 **Authentication**
  - Google OAuth integration
  - Role-based access control
  - Secure session management

- 📊 **Admin Dashboard**
  - Real-time analytics
  - Event management
  - Check-in tracking
  - Sales reporting

- 🔄 **Real-time Updates**
  - Live check-in counts
  - Instant notifications
  - Dynamic event updates

## Tech Stack

- **Frontend**
  - React.js
  - Tailwind CSS
  - Framer Motion
  - GSAP
  - Recharts
  - Socket.io Client

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Socket.io
  - Stripe
  - Google OAuth

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Google OAuth credentials
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eventflow.git
   cd eventflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
eventflow/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── assets/        # Static assets
├── public/            # Public assets
└── server/            # Backend server code
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Socket.io](https://socket.io/)
- [Stripe](https://stripe.com/)
