# Modern Plan Trip

![CI Pipeline](https://github.com/pansilukaveed02-cell/Modern_plan_Trip/workflows/CI%20Pipeline/badge.svg)
![Deploy](https://github.com/pansilukaveed02-cell/Modern_plan_Trip/workflows/Deploy%20to%20Production/badge.svg)

A modern, responsive trip planning application that acts as an advanced planner and organizer for your travels. Built with pure vanilla HTML, CSS, and modern JavaScript, featuring full local storage persistence, responsive styling, and robust team collaboration workflows.

---

## 👥 Group Information
- **Student 1 (DevOps Engineer):** [Your Full Name as in LMS] - [Your Student ID] - Role: DevOps Engineer
- **Student 2 (Full-Stack Developer):** [Partner's Full Name as in LMS] - [Partner's Student ID] - Role: Full-Stack Developer

---

## 📝 Project Description
**Modern Plan Trip** is a dynamic web application designed to help travel groups and individuals plan their trips effectively. It functions similarly to a task manager tailored for travel itineraries, enabling users to:
- Add specific plans, bookings, or activities.
- Mark plans as completed once achieved.
- Filter plans dynamically by **All**, **Active**, or **Completed**.
- Clean up completed items in a single click.
- Persist all trip details locally in the browser so data isn't lost on reload.

---

## 🔗 Live Deployment
🔗 **Live URL:** [Your Deployed Vercel/Netlify URL]

---

## 🛠️ Technologies Used
- **Frontend Core:** HTML5, CSS3 (Vanilla for modern premium design), Modern ES6+ JavaScript
- **DevOps & Automation:** GitHub Actions (CI/CD Pipelines)
- **Deployment Platform:** Vercel / Netlify
- **Task Management:** Git & GitHub (Branch protection, PR-based merging, code review)

---

## ✨ Features
- **Add Travel Tasks:** Quick entry for plans and activities.
- **Dynamic Task Counter:** Displays the number of active plans remaining.
- **Interactive States:** Toggle plans as completed with smooth visual transitions.
- **Dynamic Filtering:** Instantly filter plans (All, Active, Completed).
- **Clear Completed:** Single button to purge completed itineraries from storage.
- **Local Storage Persistence:** Automagically saves the travel list across browser sessions.
- **Responsive Layout:** Beautiful, modern glassmorphic look optimized for mobile, tablet, and desktop viewports.

---

## 🌿 Branching & Collaboration Strategy
Our team strictly implemented the professional Git branch model to avoid pipeline breaks and maintain integration hygiene:
- `main` - **Production Branch:** Protected and locked. Directly connected to the deployment pipeline. Direct pushes are disabled.
- `develop` - **Integration Branch:** Used for merging fully reviewed and tested feature branches before final production staging.
- `feature/*` - **Feature Branches:** Individual feature environments where developers worked on specific items in isolation.
  - `feature/frontend-setup` - Initial setup of basic HTML frame.
  - `feature/ui-styling` - Implementation of styling and responsive CSS.
  - `feature/backend-api` - Integration of localStorage backend.
  - `feature/clear-completed` - Implementation of task clearing features.

---

## ⚙️ CI/CD Pipeline & DevOps Architecture

### 1. Continuous Integration (`.github/workflows/ci.yml`)
Triggers automatically on **push** or **pull requests** targeting `main`, `develop`, or `feature/*`.
- **Checkout Code:** Uses `actions/checkout@v3` to pull the latest codebase.
- **Node Environment:** Configures Node.js v18.
- **Dependencies:** Runs `npm install`.
- **Linter Check:** Runs linter to ensure code style consistency.
- **Build Step:** Compiles static assets.
- **Testing:** Runs standard tests to ensure zero regressions before merging.

### 2. Continuous Deployment (`.github/workflows/deploy.yml`)
Triggers automatically on **push** to `main` (merges from `develop`).
- Deploys the static site to the **Vercel** production environment using the Vercel API and token secrets (`VERCEL_TOKEN`, `ORG_ID`, `PROJECT_ID`).
- Provides instant deployment preview links and updates the live site seamlessly.

### 🛡️ Branch Protection Rules
To protect the production codebase:
1. **Require Pull Requests before merging:** No direct pushes allowed to the `main` branch.
2. **Require Status Checks to pass:** The CI pipeline must complete successfully with a green checkmark before the PR can be merged to `develop` or `main`.
3. **Require Reviews:** Code must be approved by a peer reviewer.

---

## 💥 Conflict Resolution Documentation
During integration of `feature/clear-completed` into the `develop` branch, we simulated a merge conflict on `src/scripts/app.js` to practice resolution workflow:
- **Cause:** Both the DevOps Engineer and the Full-Stack Developer modified the event listener bindings at the bottom of the file simultaneously.
- **Resolution Process:**
  1. Pulled the latest `develop` changes: `git checkout develop && git pull origin develop`
  2. Checked out the feature branch: `git checkout feature/clear-completed`
  3. Merged `develop` locally: `git merge develop`
  4. Identified the conflict flags (`<<<<<<< HEAD`, `=======`, `>>>>>>> develop`).
  5. Manually inspected and combined the code to preserve both the localStorage updating routines and the clear-completed button event listeners.
  6. Tested locally to verify functionality.
  7. Committed the conflict resolution with the message: `fix: resolve merge conflicts with develop`
  8. Pushed back to the remote and successfully completed the PR merge.

---

## 👥 Individual Contributions

### 👤 Student 1 (DevOps Engineer)
- **Repository Initialization & Configuration:** Set up the Git repository structure and local tracking.
- **Workflow Automation:** Drafted and implemented `.github/workflows/ci.yml` and `.github/workflows/deploy.yml`.
- **Package Management:** Configured `package.json` with scripts for build validation, testing, and linting.
- **Deployment Pipelines:** Managed Vercel account setup, project linkage, and encrypted GitHub Repository secrets configuration.
- **Branch Protection & Review:** Configured GitHub branch protection rules for `main` and executed the merge of incoming pull requests.
- **Commits:**
  - `chore: initial repository setup`
  - `ci: add CI pipeline workflow`
  - `ci: add production deployment workflow`
  - `chore: configure package.json scripts`

### 👤 Student 2 (Full-Stack Developer)
- **Frontend Architecture:** Built HTML wireframes and responsive mobile-first UI components.
- **Logic & Storage Layer:** Programmed state management, dynamic filter listeners, and localStorage integration.
- **Review & Merging:** Submitted pull requests with proper descriptions, completed local testing, and peer-reviewed DevOps workflows.
- **Commits:**
  - `feat: add base HTML structure`
  - `feat: implement localstorage backend and ui controller`
  - `feat: add responsive css styling`
  - `feat: implement clear completed tasks logic in backend and UI`
  - `docs: add individual contributions and setup instructions`

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- Git

### Installation & Run
```bash
# 1. Clone the repository
git clone https://github.com/pansilukaveed02-cell/Modern_plan_Trip.git

# 2. Navigate to project directory
cd Modern_plan_Trip

# 3. Install dependencies
npm install

# 4. Run Build Validation (Mock Check)
npm run build

# 5. Run Linter
npm run lint

# 6. Run Unit Tests
npm test
```
*Note: Since the app is a pure-frontend single-page application, you can also launch `src/index.html` directly in any web browser.*
