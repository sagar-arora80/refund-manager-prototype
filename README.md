# Merchant Refund Manager Prototype

A mobile-first web application designed to streamline the refund approval process for merchants on a multi-sided marketplace. This prototype focuses on **clarity, control, and accountability**, reducing the friction and risk associated with customer refunds.

![Refund Manager Preview](https://placehold.co/600x400/e0e7ff/4f46e5?text=Refund+Manager+App)

## 🔴 The Problem

Refunds are a high-stakes touchpoint in e-commerce and food delivery. Merchants often face:
*   **Approval Fatigue:** Manually approving every low-value refund wastes time.
*   **Financial Risk:** Auto-approving everything leads to fraud and loss.
*   **Lack of Context:** Making decisions without seeing order details or item lists.
*   **Poor Visibility:** "Did Simran approve this, or was it auto-approved?"
*   **Cluttered UI:** Mixing pending tasks with historical data confuses staff.

## 🟢 The Solution

The **Refund Manager** solves this with a "Safe Defaults" approach and a distinct separation of duties.

### Key Features

#### 1. Smart Configuration & "Hybrid" Mode
*   **Hybrid Approval:** A sliding scale allows merchants to auto-approve low-risk refunds (e.g., under ₹200) while forcing manual review for high-value requests.
*   **Granular Triggers:** Merchants can force review for specific scenarios, such as:
    *   Refund amount > ₹500
    *   Order stages like "Completed" or "In-Preparation" (where waste is highest).

#### 2. Prioritized Activity Feed
*   **Requires Attention:** A dedicated, highlighted section at the top for refunds waiting for action. No digging through history.
*   **Past Activity:** A clear, read-only history log below the actionable items.

#### 3. Enhanced Decision Making
*   **Rich Context:** The detail view includes a collapsible **Order Summary** (Items + Total) so merchants verify *what* is being refunded before clicking.
*   **Clear Hierarchy:** 
    *   **Approve**: styled as a **Primary (Indigo)** action.
    *   **Reject**: styled as a **Secondary (Red Outline)** action to distinguish it and prevent accidental clicks.

#### 4. Accountability & Audit
*   **Staff Visibility:** The app displays the currently logged-in user (e.g., "Simran").
*   **Action Timeline:** Every decision is logged in the timeline as "Approved by [User]" or "Rejected by [User]", ensuring full traceability.

## 🛠️ Tech Stack

*   **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** React Context API

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sagar-arora80/refund-manager-prototype.git
    cd refund-manager-prototype
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```
    *Output will be in the `docs/` folder (configured for GitHub Pages).*

## 🔗 Live Demo
View the live prototype here: **[https://sagar-arora80.github.io/refund-manager-prototype/](https://sagar-arora80.github.io/refund-manager-prototype/)**

---
*Created by [Sagar Arora] as part of the Refund Experience Redesign project.*
