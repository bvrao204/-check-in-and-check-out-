# VNR Hostels - Hostel Check-In and Check-Out System

A premium, interactive, and modern glassmorphic web portal designed to streamline accommodation allocations for students and administrative wardens at VNRVJIET Hostels.

---

## 📖 About the Project
The **Hostel Check-In and Check-Out System** is built to replace manual register books and static mock-ups with a clean, client-side persisted application. 
* **For Students**: It offers a self-service dashboard to register, log in, request room allocations (check-in), check out with a checklist, review their boarding pass tickets, and check the daily mess menu or warden announcements.
* **For Wardens/Admins**: It provides a Control Panel to monitor live bed occupancy rates via interactive charts, inspect the hostel room grid, manage the student registry, and trace stay logs.

---

## 📂 Project Structure

```text
hostel-checkin-checkout/
├── package.json                   ← Root NPM config (launches static server & browser)
└── -check-in-and-check-out--main/  ← Source directory containing core application files
    ├── package.json               ← Sub-directory fallback NPM script config
    ├── README.md                  ← Project overview, workflow, and instructions
    ├── LICENSE                    ← MIT License terms
    ├── styles.css                 ← Core global style layout (glassmorphism & animations)
    ├── script.js                  ← Database state controller (persists to localStorage)
    ├── index.html                 ← Application landing page & interactive slideshow
    ├── register.html              ← User registration (password strength scoring)
    ├── login.html                 ← User login (role-based redirection)
    ├── confirmation.html          ← Student portal dashboard (notice board & mess widgets)
    ├── checkin.html               ← Room check-in form (dynamic room lists & auto-fill)
    ├── checkin_confirmation.html  ← Printable boarding pass allocation ticket
    ├── checkout.html              ← Room checkout checklist & feedback form
    ├── checkout_confirmation.html ← Final departure receipt
    └── admin.html                 ← Warden administrative panel (occupancy grids & charts)
```

---

## 🛠️ Developing Tools & Technologies
The application is built using lightweight, modern web technologies:
* **Frontend Structure**: HTML5 (Semantic tags, SVG graphics, responsive forms).
* **Styling (CSS3)**: Custom CSS stylesheets utilizing HSL variables, fluid layouts, custom scrollbars, floating background glows, and a glassmorphic design system (`backdrop-filter: blur(16px)`).
* **Application Logic**: Vanilla JavaScript (ES6+) for routing guards, form validations, dynamic navigation template injection, and alert toasts.
* **Database & Persistence**: Browser `localStorage` to simulate a fully-functioning CRUD database (persisting user registries, active bookings, history logs, mess schedules, and announcements).
* **Data Visualization**: **Chart.js** loaded via CDN to render live doughnut charts of hostel capacity.
* **Development Server**: Node.js and `http-server` (served via `npx` commands) configured with browser-opening actions.

---

## 🔄 Project Workflow & User Journeys

### 1. Student Stay Flow

```text
[Landing Page] ➔ [Register] ➔ [Sign In]
(index.html)     (register.html) (login.html)
[HTML5/CSS3]     [Regex checks]  [Auth logic]
     │
     ▼
[Student Portal] (confirmation.html) [LocalStorage DB] ◄─────────────────────────┐
     ├─► [Announcements] & [Mess Menu] (script.js)                              │
     │                                                                           │
     ├─► [Check-In Form] (checkin.html) [Dynamic lists & validation]              │
     │         │                                                                 │
     │         ▼                                                                 │
     │   [Boarding Receipt] (checkin_confirmation.html) [Print styles]           │
     │         │                                                                 │
     │         └─────────────────────────────────────────────────────────────────┤
     │                                                                           │
     └─► [Check-Out Form] (checkout.html) [Checklist validation]                 │
               │                                                                 │
               ▼                                                                 │
         [Departure Receipt] (checkout_confirmation.html) ➔ ➔ ➔ ➔ ➔ ➔ ➔ ➔ ➔ ➔ ➔ ➔ ┘
```

* **Landing Page (`index.html` - HTML5, CSS3, Slide Animations)**: Displays real-time hostel stats (total rooms, vacant beds, active occupants) and checks user login status to show appropriate entry actions.
* **Registration (`register.html` - Regex password criteria checks)**: Collects student information, emergency contacts, and enforces a strong password policy (minimum 8 characters, requiring uppercase, lowercase, numbers, and special characters) using a real-time criteria checklist.
* **Login (`login.html` - LocalStorage Verification)**: Verifies credentials from `localStorage` and redirects students to their dashboard.
* **Dashboard (`confirmation.html` - LocalStorage DB query)**: Represents the student portal containing:
  * **Profile Details Card**: Student information.
  * **Active Accommodation Box**: Shows active room details or check-in link.
  * **Announcements Widget**: Real-time mock notifications from the warden.
  * **Today's Mess Menu Widget**: Displays meals based on the current weekday.
  * **Stay History table**: Tabular log of all past check-in transactions.
* **Check-In (`checkin.html` - Dynamic arrays filtering)**: Auto-fills profile info and offers a dynamic dropdown listing **only vacant rooms** depending on the selected Hostel Block and Sharing Type.
* **Check-In Ticket (`checkin_confirmation.html` - CSS Print media styles)**: Shows a printable allocation boarding pass with a unique transaction ID.
* **Check-Out (`checkout.html` - Checklist constraints)**: Enforces warden checklists (keys returned, room clean, dues cleared) and records ratings.
* **Check-Out Ticket (`checkout_confirmation.html` - Dynamic cards)**: Generates the final departure receipt.

### 2. Warden Administrative Flow

```text
[Warden Sign In] (login.html) [Role guards]
       │
       ▼
[Admin Dashboard] (admin.html)
       ├─► Statistics & [Chart.js Doughnut Charts] (CDN loaded)
       ├─► [Room Matrix Grid] (CSS Grid, dynamic status updates)
       ├─► [Student Registry] (LocalStorage CRUD, Delete users)
       └─► [System-Wide Stays Logs] (JSON format histories)
```

* Wardens access `admin.html` which is guarded and restricted to the `admin` role.
* Provides live doughnut graphs representing bed occupancy shares.
* Lists a searchable room matrix color-coded by occupancy status.
* Displays a student directory with permission controls to remove registered accounts.

---

## ⚙️ Installation & Running Locally

### Prerequisites
* **Node.js** (includes `npm`) installed on your system.

### Running the App
1. Open your terminal in the root folder containing the `package.json` file.
2. Run the development server command:
   ```bash
   npm run dev
   ```
   *This will start a local server at `http://localhost:8080` and **automatically open the website in your default web browser**.*
3. If the server is already active and you just want to open the page again, run:
   ```bash
   npm run open
   ```

---

## 🔑 Demo Account Credentials

You can test the system's full features using these pre-seeded demo accounts:

### 1. Student Portal
* **Username**: `student`
* **Password**: `StudentPassword@123`

### 2. Warden Control Room (Admin)
* **Email ID**: `admin@example.com`
* **Password**: `AdminPassword@123`
