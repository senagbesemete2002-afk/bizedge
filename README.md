# Bizedge

A lightweight HR and operations dashboard built with plain HTML, CSS, and JavaScript.

## Run locally

No build step or package installation is required. From this folder, start a local web server:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Features

- Dashboard for employee count, attendance, open roles, and workspace sections.
- Sections for employees, recruitment, attendance, leave, training, payroll, benefits, expenses, documents, assets, vehicles, reports, and settings.
- Add, search, sort, and delete records in the data tables.
- Sign-up, sign-in, sign-out, and a password reset flow.
- Each new account starts with an empty workspace. Workspace data is kept separately for each account in the current browser.

## Demo authentication and data

This is a front-end demo. Accounts and workspace data are stored in browser `localStorage`; there is no server, email verification, or real password-reset email. The reset form changes the password immediately after the account email is entered. Data does not sync between browsers or devices, and clearing browser storage removes it.

Do not use real passwords or sensitive business data. A production deployment needs server-side authentication, secure password storage, email-based account recovery, and a database with appropriate access controls.
