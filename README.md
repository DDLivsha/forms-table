# Forms Dashboard

## Description
A web application for managing forms. The application allows administrators to create, view, edit, and delete forms. It also restricts access to specific actions based on the user's role, utilizing cookie-based authentication.

---

## Features
* **Create Forms (POST):** Allows administrators to create new forms with a title, description, and fields.
* **View All Forms (GET):** Provides an overview of all created forms.
* **View Form by ID (GET):** Enables users to view the details of a specific form.
* **Update Forms (PUT):** Allows administrators to make changes to existing forms.
* **Delete Forms (DELETE):** Allows administrators to remove forms.
* **Role-Based Access Control:** Restricts editing and deleting functionality to users with the "Admin" role.

---

## Technologies Used
* **Framework:** Next.js 15 App Router
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Frontend:** React
* **Form Validation:** Zod
* **Form Management:** React Hook Form
* **Unique IDs:** `uuid`
* **File System:** `fs/promises`
* **Deployment:** Vercel

---

## Technical Details and Limitations
The project uses **Server Actions** and **Route Handlers** for API communication. Following the requirement to not use a traditional database, a local `data/forms.json` file was used for data persistence.

**Important note on Vercel deployment:**
* **GET requests (data reading)** work correctly, as they read from the file system, which is accessible in a read-only state.
* **POST, PUT, and DELETE requests (data writing, updating, and deleting)** **do not work** after deployment to Vercel. This is due to a fundamental limitation of the platform, where the file system for serverless functions is **read-only**. Write operations using `fs.writeFile` are not possible in this environment, as indicated by the `EROFS: read-only file system` error in the logs.
* The project is **fully functional in a local development environment**, where the file system is writable.

**Link to the Vercel Deployment:**
[https://forms-table.vercel.app/](https://forms-table.vercel.app/)
---

## Installation and Local Setup
1.  Clone the repository:
    `git clone https://github.com/DDLivsha/forms-table`
2.  Navigate to the project directory:
    `cd forms-table`
3.  Install dependencies:
    `npm install`
4.  Start the development server:
    `npm run dev`
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Screenshots and Lighthouse Results
* **Project Screenshot:** ![Project Screenshot](/public/screenshots/screenshot.jpg)
* **Lighthouse Score:** ![Lighthouse Score](/public/screenshots/lighthouse.jpg)