# ProjectOps — GitHub + Firebase starter

A static web app for employee master data, attrition, billable/buffer allocation, WFH/WFO tracking and project file downloads. Uses Firebase Authentication, Cloud Firestore and Cloud Storage.

## Included files

- `index.html` — app shell and login form
- `styles.css` — responsive styling
- `app.js` — Firebase auth, CRUD, CSV import/export and file upload/download
- `firebase-config.js` — replace with your Firebase web-app configuration
- `firestore.rules` — role-based database access rules
- `storage.rules` — role-based file access rules

## 1. Create Firebase resources

1. In Firebase Console, create a new project (e.g. `projectops-portal`).
2. Add a Web app and copy its config into `firebase-config.js`.
3. Enable **Authentication → Sign-in method → Email/Password**.
4. Create a **Cloud Firestore** database.
5. Enable **Cloud Storage**.
6. Deploy `firestore.rules` and `storage.rules` from Firebase Console (Rules tabs) or with Firebase CLI.

## 2. Create the first admin user

1. In Firebase Console → Authentication, add a user with an email and a strong temporary password.
2. Copy that user's **UID**.
3. In Firestore, create a collection named `users` and a document whose document ID is exactly that UID.
4. Add fields:
   - `role` (string): `admin`
   - `email` (string): the user's email
   - `displayName` (string): the user's name
5. Sign in through the app. The `users/{uid}` profile is required for access.
6. Add other users in Authentication and create their `users/{uid}` profile with role `manager` or `viewer`.

**Important:** The first admin profile must be created in Firebase Console because the rules intentionally prevent users from assigning themselves roles. Admins can read user profiles; ordinary users can read their own profile only. Have an admin provision accounts manually or add a trusted server-side admin workflow later.

## 3. Publish with GitHub Pages

1. Create a repository named `projectops`.
2. Upload the files in this folder to the repository root. Ensure `index.html` is in the root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then save.
5. Wait for the Pages deployment. The URL will be `https://YOUR-GITHUB-USERNAME.github.io/projectops/`.

A static page hosted on GitHub Pages supports ES modules, but open the app through GitHub Pages (or a local web server), not by double-clicking `index.html` as a `file://` URL.

## 4. Roles and access

- `admin`: read/write all app collections and provision user profiles.
- `manager`: read/write app collections and project files.
- `viewer`: read app collections and download files.

This starter grants managers access to all project records. If managers should only see assigned projects, implement project-scoped rules and matching query filters before production use.

## 5. Data and import/export

- Employee IDs should be unique. The app checks for duplicate IDs on manual employee entry and skips duplicate IDs during employee CSV import.
- CSV import expects headers matching the field keys shown in the app, such as `empId,name,email,doj,division,subdivision,project,status,appraiserId,appraiserName,appraiserEmail,reviewerId,reviewerName,reviewerEmail,role,location`.
- Export each tracker independently from its page. The Overview export starts one CSV download per populated collection.
- Files are stored in Firebase Storage; file metadata is stored in Firestore `documents`.

## Security and production notes

- Firebase web config is intended for browser apps; it is not a service-account credential. Never put service-account JSON, private keys or admin SDK credentials in this repository.
- Firebase Security Rules are the security boundary. Review and test them with the Firebase Emulator Suite before using real employee data.
- The included rules enforce authenticated role membership, but they do not yet enforce per-project access. Managers can see all projects.
- Add organization-approved data retention, audit reporting, backup/export, and privacy practices before production use.
- Configure Firebase Storage billing/plan requirements and upload limits for your project. The app's UI allows uploads; the rules limit individual files to 25 MiB.
- This is a starter application, not a compliance certification.
