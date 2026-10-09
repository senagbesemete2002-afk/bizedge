"use strict";

const STORAGE_KEY = "bizedge-data";
const NAME_KEY = "bizedge-name";
const ACCOUNT_KEY = "bizedge-account";
const SESSION_KEY = "bizedge-signed-in";

// Starting data for every table page
const DEFAULT_PAGES = {
  employees: {
    title: "Employees",
    button: "Add employee",
    columns: ["Name", "Role", "Department", "Status"],
    rows: [
      ["Amaka Obi", "Accountant", "Finance", "Active"],
      ["Tunde Bello", "Sales lead", "Sales", "Active"],
      ["Ife Adeyemi", "HR officer", "People", "On leave"],
      ["Zainab Musa", "Developer", "Product", "Probation"]
    ]
  },
  recruitment: {
    title: "Recruitment",
    button: "Post a role",
    columns: ["Role", "Applicants", "Stage", "Closes"],
    rows: [
      ["Support agent", "24", "Interviews", "20 Oct"],
      ["Warehouse supervisor", "11", "Screening", "27 Oct"],
      ["Junior accountant", "38", "Offer sent", "12 Oct"]
    ]
  },
  attendance: {
    title: "Attendance",
    button: "Export today",
    columns: ["Name", "Clock in", "Clock out", "Status"],
    rows: [
      ["Amaka Obi", "08:02", "–", "Present"],
      ["Tunde Bello", "08:41", "–", "Late"],
      ["Ife Adeyemi", "–", "–", "On leave"]
    ]
  },
  leave: {
    title: "Leave",
    button: "Record leave",
    columns: ["Name", "Type", "Dates", "Status"],
    rows: [
      ["Ife Adeyemi", "Annual", "5-16 Oct", "Approved"],
      ["Zainab Musa", "Sick", "7 Oct", "Pending"],
      ["Tunde Bello", "Casual", "19 Oct", "Pending"]
    ]
  },
  training: {
    title: "Training",
    button: "Schedule training",
    columns: ["Course", "Attendees", "Date", "Status"],
    rows: [
      ["Fire safety basics", "18", "14 Oct", "Scheduled"],
      ["Customer care", "9", "21 Oct", "Scheduled"],
      ["Data protection", "32", "2 Oct", "Completed"]
    ]
  },
  payroll: {
    title: "Payroll",
    button: "Run payroll",
    columns: ["Month", "Employees", "Net pay", "Status"],
    rows: [
      ["October 2026", "48", "N14,820,000", "Draft"],
      ["September 2026", "47", "N14,350,000", "Paid"],
      ["August 2026", "46", "N14,010,000", "Paid"]
    ]
  },
  benefits: {
    title: "Benefits",
    button: "Add benefit",
    columns: ["Benefit", "Provider", "Enrolled", "Renews"],
    rows: [
      ["Health cover", "Leadway", "44", "1 Jan"],
      ["Pension", "Stanbic IBTC", "48", "Monthly"],
      ["Life insurance", "AXA Mansard", "48", "1 Mar"]
    ]
  },
  expenses: {
    title: "Expenses",
    button: "Add expense",
    columns: ["Item", "Submitted by", "Amount", "Status"],
    rows: [
      ["Client lunch", "Tunde Bello", "N38,500", "Pending"],
      ["Fuel for van", "Chidi Eze", "N62,000", "Approved"],
      ["Printer toner", "Amaka Obi", "N24,000", "Rejected"]
    ]
  },
  documents: {
    title: "Documents",
    button: "New document",
    columns: ["Document", "Type", "Updated", "Owner"],
    rows: [
      ["Offer letter", "Letter", "12 Oct", "Ife Adeyemi"],
      ["Staff handbook", "Policy", "1 Sep", "Ife Adeyemi"],
      ["Employment contract", "Contract", "28 Sep", "Amaka Obi"]
    ]
  },
  assets: {
    title: "Assets",
    button: "Add asset",
    columns: ["Asset", "Tag", "Assigned to", "Condition"],
    rows: [
      ["Dell laptop", "AST-014", "Zainab Musa", "Good"],
      ["Generator", "AST-003", "Operations", "Needs service"],
      ["Projector", "AST-021", "Unassigned", "Good"]
    ]
  },
  vehicles: {
    title: "Vehicles",
    button: "Add vehicle",
    columns: ["Vehicle", "Plate", "Driver", "Next service"],
    rows: [
      ["Toyota Hiace", "LND 482 XA", "Chidi Eze", "30 Oct"],
      ["Nissan Navara", "ABC 117 KJ", "Tunde Bello", "Overdue"],
      ["Honda CR-V", "KJA 905 EE", "Unassigned", "12 Dec"]
    ]
  },
  reports: {
    title: "Reports",
    button: "Create report",
    columns: ["Report", "Period", "Format", "Updated"],
    rows: [
      ["Headcount by department", "Q3 2026", "PDF", "1 Oct"],
      ["Payroll summary", "Sep 2026", "Excel", "30 Sep"],
      ["Leave balances", "2026", "Excel", "3 Oct"]
    ]
  }
};

const TILE_COLORS = {
  employees: "#e6ecfb",
  recruitment: "#fde8da",
  attendance: "#fdf1d6",
  leave: "#dcf5fb",
  training: "#eadcfb",
  payroll: "#fde2e4",
  benefits: "#d5f2ee",
  expenses: "#f8dfe6",
  documents: "#f1e1f3",
  assets: "#e3f6cf",
  vehicles: "#fdf1d6",
  reports: "#e6ecfb",
};

const ICONS = {
  employees: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.2c2.7.2 4.5 2 4.5 5.3"/>',
  recruitment: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  attendance: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  leave: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  training: '<path d="m2.5 9 9.5-5 9.5 5-9.5 5z"/><path d="M6.5 11.5V16c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.5"/>',
  payroll: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.8"/>',
  benefits: '<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6z"/>',
  expenses: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  documents: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  assets: '<rect x="4.5" y="5" width="15" height="10" rx="2"/><path d="M2.5 19h19"/>',
  vehicles: '<path d="M5 16v-4l1.8-5h10.4L19 12v4"/><path d="M3.5 16h17v3h-17zM8 12h8"/>',
  reports: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
};

const PAGE_NOTES = {
  employees: "Everyone on the team and where they sit.",
  recruitment: "Open roles and how far each one has got.",
  attendance: "Who clocked in today.",
  leave: "Leave requests and approvals.",
  training: "Courses booked and completed.",
  payroll: "Monthly pay runs.",
  benefits: "Cover and schemes your staff are on.",
  expenses: "Claims waiting for a decision.",
  documents: "Letters, contracts and policies.",
  assets: "Equipment and who has it.",
  vehicles: "Company vehicles and service dates.",
  reports: "Saved reports you can export.",
};

const STATUS_TONES = {
  green: ["Active", "Present", "Approved", "Paid", "Completed", "Good", "Offer sent"],
  yellow: ["Pending", "Late", "On leave", "Probation", "Draft", "Scheduled", "Needs service", "Interviews", "Screening"],
  red: ["Rejected", "Overdue"],
};

// ---------- State ----------
let pages = structuredClone(DEFAULT_PAGES);
let userName = "Sena";
let notifications = [];
let toastTimer;
let toastAction = null;
let sort = { column: null, dir: "asc" };
let currentUserEmail = localStorage.getItem(SESSION_KEY) || "";
let isAuthenticated = Boolean(currentUserEmail && currentUserEmail !== "true");
let authView = "signin";
let authMessage = "";

// ---------- Helpers ----------
const $ = (selector) => document.querySelector(selector);
const content = $("#content");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning,";
  if (hour < 18) return "Good Afternoon,";
  return "Good Evening,";
}

function getTone(text) {
  return Object.keys(STATUS_TONES).find((tone) => STATUS_TONES[tone].includes(text));
}

function renderCell(text) {
  const tone = getTone(text);
  const safeText = escapeHtml(text);
  return tone ? `<span class="badge badge--${tone}">${safeText}</span>` : safeText;
}

function icon(key) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[key]}</svg>`;
}

// action is optional: { label, onClick } adds a button like "Undo"
function showToast(message, action) {
  const toast = $("#toast");
  toastAction = action ? action.onClick : null;
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`
    + (action ? `<button class="toast__action" data-action="toast-action">${escapeHtml(action.label)}</button>` : "");
  toast.classList.add("toast--visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("toast--visible"), action ? 5000 : 2200);
}

function addNotification(message) {
  notifications = [message, ...notifications].slice(0, 4);
}

function updateAvatar() {
  $("#avatar").textContent = userName.charAt(0);
}

// ---------- Saving and loading ----------
function createEmptyPages() {
  const emptyPages = structuredClone(DEFAULT_PAGES);
  Object.values(emptyPages).forEach((page) => {
    page.rows = [];
  });
  return emptyPages;
}

function userStorageKey(key) {
  return `${key}:${encodeURIComponent(currentUserEmail)}`;
}

function saveState() {
  try {
    localStorage.setItem(userStorageKey(STORAGE_KEY), JSON.stringify(pages));
    localStorage.setItem(userStorageKey(NAME_KEY), userName);
  } catch (error) {
    console.warn("Could not save to localStorage", error);
  }
}

function loadState() {
  pages = createEmptyPages();
  notifications = [];
  try {
    const savedPages = localStorage.getItem(userStorageKey(STORAGE_KEY));
    const savedName = localStorage.getItem(userStorageKey(NAME_KEY));
    if (savedPages) pages = JSON.parse(savedPages);
    if (savedName) userName = savedName;
  } catch (error) {
    console.warn("Could not read localStorage", error);
  }
  updateAvatar();
}

// ---------- Page renderers ----------
function renderDashboard() {
  const awayToday = pages.attendance.rows.filter((row) => row[3] === "On leave").length;

  const stats = [
    [pages.employees.rows.length, "Employees"],
    [awayToday, "Away today"],
    ["28 Oct", "Next payroll"],
    [pages.recruitment.rows.length, "Open roles"],
  ];

  const departments = {};
  pages.employees.rows.forEach((row) => {
    const department = row[2] || "Unassigned";
    departments[department] = (departments[department] || 0) + 1;
  });
  const maxCount = Math.max(...Object.values(departments), 1);
  const barsHtml = Object.entries(departments)
    .sort((a, b) => b[1] - a[1])
    .map(([department, count]) => `
      <div class="bar-row">
        <span class="bar-row__label">${escapeHtml(department)}</span>
        <span class="bar-row__track"><span class="bar-row__fill" style="width:${(count / maxCount) * 100}%"></span></span>
        <span class="bar-row__count">${count}</span>
      </div>`)
    .join("");

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  const statsHtml = stats
    .map(([value, label]) => `
      <div class="stats__item">
        <span class="stats__value">${value}</span>
        <span class="stats__label">${label}</span>
      </div>`)
    .join("");

  const tilesHtml = Object.entries(pages)
    .map(([key, page]) => `
      <a class="app-tile" href="#${key}">
        <span class="app-tile__icon" style="background:${TILE_COLORS[key]}">${icon(key)}</span>
        ${page.title}
      </a>`)
    .join("");

  const attentionHtml = `<p class="empty-state">Nothing needs your attention</p>`;

  const notificationsHtml = notifications.length
    ? notifications.map((text) => `<div class="attention-item">${escapeHtml(text)}</div>`).join("")
    : `<p class="empty-state">No notifications</p>`;

  content.innerHTML = `
    <p class="greeting">${getGreeting()}</p>
    <input class="name-input" data-name-input value="${escapeHtml(userName)}" maxlength="30" aria-label="Your name">
    <p class="date">${today}</p>

    <div class="stats">${statsHtml}</div>

    <section class="card">
      <h2 class="card__title">Apps</h2>
      <div class="app-grid">${tilesHtml}</div>
    </section>

    <div class="two-column">
      <section class="card">
        <h2 class="card__title">Needs your attention</h2>
        ${attentionHtml}
      </section>

      <section class="card">
        <h2 class="card__title">Headcount by department</h2>
        ${barsHtml}
      </section>
    </div>

    <section class="card" id="action-center">
      <h2 class="card__title">Action Center</h2>
      ${notificationsHtml}
    </section>`;
}

function renderTable(name) {
  const page = pages[name];
  sort = { column: null, dir: "asc" };
  const headersHtml = page.columns
    .map((column, i) => `<th><button class="sort-button" data-action="sort" data-page="${name}" data-column="${i}">${column}<span class="sort-arrow"></span></button></th>`)
    .join("");

  content.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-header__title">${page.title}</h1>
        <p class="page-header__meta">${PAGE_NOTES[name]} <span id="row-count"></span></p>
      </div>
      <button class="button button--primary" data-action="open-add" data-page="${name}">${page.button}</button>
    </div>

    <input class="field search" id="search" type="search" placeholder="Search ${page.title.toLowerCase()}..." data-page="${name}" aria-label="Search ${page.title}">

    <div class="table-wrapper">
      <table class="table">
        <thead><tr>${headersHtml}<th></th></tr></thead>
        <tbody id="table-body"></tbody>
      </table>
    </div>`;

  renderRows(name);
}

function renderRows(name) {
  const { rows, columns } = pages[name];
  const query = $("#search").value.trim().toLowerCase();

  const matches = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => row.join(" ").toLowerCase().includes(query));

  if (sort.column !== null) {
    const direction = sort.dir === "asc" ? 1 : -1;
    matches.sort((a, b) => direction * a.row[sort.column].localeCompare(b.row[sort.column], undefined, { numeric: true }));
  }

  let bodyHtml;
  if (matches.length) {
    bodyHtml = matches
      .map(({ row, index }) => `
        <tr>
          ${row.map((cell) => `<td>${renderCell(cell)}</td>`).join("")}
          <td><button class="delete-button" data-action="delete" data-page="${name}" data-index="${index}" aria-label="Delete row">✕</button></td>
        </tr>`)
      .join("");
  } else {
    const message = rows.length ? "Nothing matches your search." : "No records yet. Use the button above to add one.";
    bodyHtml = `<tr><td class="table__empty" colspan="${columns.length + 1}">${message}</td></tr>`;
  }

  $("#table-body").innerHTML = bodyHtml;
  $("#row-count").textContent = `${matches.length} of ${rows.length} shown.`;

  document.querySelectorAll(".sort-arrow").forEach((arrow, i) => {
    arrow.textContent = sort.column === i ? (sort.dir === "asc" ? " ↑" : " ↓") : "";
  });
}

function renderSettings() {
  content.innerHTML = `
    <div class="page-header"><h1 class="page-header__title">Settings</h1></div>
    <section class="card">
      <form class="form" id="settings-form">
        <label>Your name
          <input class="field" name="name" value="${escapeHtml(userName)}" maxlength="30" required>
        </label>
        <label>Company name
          <input class="field" name="company" value="Adeyemi and Sons Ltd">
        </label>
        <div class="form__actions">
          <button class="button button--primary" type="submit">Save changes</button>
          <button class="button button--secondary" type="button" data-action="reset">Clear workspace data</button>
        </div>
      </form>
    </section>`;
}

function renderAuth() {
  document.body.classList.add("auth-locked");
  const isSignUp = authView === "signup";
  const isForgot = authView === "forgot";
  const title = isSignUp ? "Create your account" : isForgot ? "Reset your password" : "Welcome back";
  const description = isSignUp
    ? "Set up your workspace access."
    : isForgot
      ? "Choose a new password for your local demo account."
      : "Sign in to pick up where your team left off.";

  content.innerHTML = `
    <section class="auth-screen" aria-labelledby="auth-title">
      <div class="auth-aside">
        <a class="logo" href="#dashboard" aria-label="Bizedge home"><span class="logo__mark"></span>BIZEDGE</a>
        <div class="auth-aside__copy">
          <p class="auth-kicker">People, operations, in focus</p>
          <h1>Good work starts with a clear view.</h1>
          <p>Bring your people, payroll and day-to-day operations together in one place.</p>
        </div>
        <span class="auth-aside__note">A calmer way to run the work behind the work.</span>
      </div>
      <div class="auth-panel">
        <form class="auth-form" id="auth-form" data-view="${authView}">
          <p class="auth-kicker">Your Bizedge workspace</p>
          <h2 id="auth-title">${title}</h2>
          <p class="auth-description">${description}</p>
          ${authMessage ? `<p class="auth-message" role="status">${escapeHtml(authMessage)}</p>` : ""}
          ${isSignUp ? `
            <label class="auth-label">Your name
              <input class="field" name="name" autocomplete="name" maxlength="30" required>
            </label>` : ""}
          <label class="auth-label">Email address
            <input class="field" name="email" type="email" autocomplete="email" required>
          </label>
          <label class="auth-label">${isForgot ? "New password" : "Password"}
            <input class="field" name="password" type="password" minlength="8" autocomplete="${isSignUp || isForgot ? "new-password" : "current-password"}" required>
          </label>
          ${isSignUp || isForgot ? `
            <label class="auth-label">Confirm password
              <input class="field" name="confirmPassword" type="password" minlength="8" autocomplete="new-password" required>
            </label>` : ""}
          <button class="button button--primary auth-submit" type="submit">${isSignUp ? "Create account" : isForgot ? "Reset password" : "Sign in"}</button>
          ${!isSignUp && !isForgot ? `<button class="auth-link auth-forgot" type="button" data-action="auth-view" data-view="forgot">Forgot password?</button>` : ""}
          <p class="auth-switch">${isSignUp
            ? `Already have an account? <button class="auth-link" type="button" data-action="auth-view" data-view="signin">Sign in</button>`
            : isForgot
              ? `Remembered it? <button class="auth-link" type="button" data-action="auth-view" data-view="signin">Back to sign in</button>`
              : `New to Bizedge? <button class="auth-link" type="button" data-action="auth-view" data-view="signup">Create an account</button>`}</p>
          <p class="auth-demo-note">Demo only: account details are stored in this browser. Password reset does not send email; use a test password, not a real one.</p>
        </form>
      </div>
    </section>`;
}

function readAccounts() {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "null");
    if (!accounts) return {};
    if (accounts.email) return { [accounts.email.toLowerCase()]: accounts };
    return accounts;
  } catch {
    return {};
  }
}

function readAccount(email) {
  return readAccounts()[email] || null;
}

function saveAccount(account) {
  const accounts = readAccounts();
  accounts[account.email] = account;
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts));
}

async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function createSalt() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const values = Object.fromEntries(new FormData(form));
  const email = values.email.trim().toLowerCase();
  const account = readAccount(email);
  authMessage = "";

  if (form.dataset.view === "signup") {
    if (values.password !== values.confirmPassword) authMessage = "Passwords do not match.";
    else if (account) authMessage = "An account already exists for this email. Sign in instead.";
    else {
      const salt = createSalt();
      userName = values.name.trim();
      saveAccount({ email, salt, passwordHash: await hashPassword(values.password, salt) });
      currentUserEmail = email;
      localStorage.setItem(SESSION_KEY, currentUserEmail);
      pages = createEmptyPages();
      notifications = [];
      saveState();
      isAuthenticated = true;
      document.body.classList.remove("auth-locked");
      location.hash = "#dashboard";
      route();
      return;
    }
  } else if (form.dataset.view === "forgot") {
    if (values.password !== values.confirmPassword) authMessage = "Passwords do not match.";
    else if (!account || account.email !== email) authMessage = "No local demo account matches that email.";
    else {
      const salt = createSalt();
      saveAccount({ ...account, salt, passwordHash: await hashPassword(values.password, salt) });
      authView = "signin";
      authMessage = "Password reset in this browser. Sign in with your new password.";
    }
  } else if (!account || account.email !== email || account.passwordHash !== await hashPassword(values.password, account.salt)) {
    authMessage = "Email or password is incorrect.";
  } else {
    currentUserEmail = email;
    localStorage.setItem(SESSION_KEY, currentUserEmail);
    userName = "Sena";
    loadState();
    isAuthenticated = true;
    document.body.classList.remove("auth-locked");
    updateAvatar();
    route();
    return;
  }

  renderAuth();
}

// ---------- Routing (uses the # part of the URL) ----------
function getCurrentPage() {
  return location.hash.replace("#", "") || "dashboard";
}

function updateActiveLink(current) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const isActive = link.getAttribute("href") === `#${current}`;
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function route() {
  if (!isAuthenticated) {
    renderAuth();
    return;
  }
  document.body.classList.remove("auth-locked");
  let current = getCurrentPage();
  if (current !== "dashboard" && current !== "settings" && !pages[current]) {
    current = "dashboard";
  }

  document.body.classList.remove("menu-open");
  updateActiveLink(current);

  if (current === "dashboard") renderDashboard();
  else if (current === "settings") renderSettings();
  else renderTable(current);

  content.classList.remove("is-entering");
  void content.offsetWidth; // restart the animation
  content.classList.add("is-entering");
  window.scrollTo(0, 0);
}

// ---------- Add row dialog ----------
function openAddDialog(name) {
  const page = pages[name];
  const fieldsHtml = page.columns
    .map((column, i) => `<label class="form__label">${column}<input class="field" name="field-${i}" ${i === 0 ? "required" : ""}></label>`)
    .join("");

  const form = $("#add-form");
  form.dataset.page = name;
  form.innerHTML = `
    <h2 class="dialog__title">${page.button}</h2>
    <div class="form">${fieldsHtml}</div>
    <div class="form__actions">
      <button class="button button--primary" type="submit">Save</button>
      <button class="button button--secondary" type="button" data-action="close-dialog">Cancel</button>
    </div>`;

  $("#add-dialog").showModal();
}

function handleAddSubmit(event) {
  event.preventDefault();
  const name = event.target.dataset.page;
  const newRow = Array.from(new FormData(event.target).values()).map((value) => value.trim());

  pages[name].rows.unshift(newRow);
  addNotification(`${pages[name].title}: added ${newRow[0]}`);
  saveState();
  $("#add-dialog").close();
  renderTable(name);
  showToast("Added");
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  const newName = new FormData(event.target).get("name").trim();
  if (newName) {
    userName = newName;
    updateAvatar();
    saveState();
    showToast("Changes saved");
  }
}

// ---------- Events ----------
const actions = {
  "auth-view": (button) => {
    authView = button.dataset.view;
    authMessage = "";
    renderAuth();
  },
  "sign-out": () => {
    isAuthenticated = false;
    currentUserEmail = "";
    localStorage.removeItem(SESSION_KEY);
    authView = "signin";
    authMessage = "";
    route();
  },
  "toggle-menu": () => document.body.classList.toggle("menu-open"),
  "close-menu": () => document.body.classList.remove("menu-open"),
  "close-dialog": () => $("#add-dialog").close(),
  "open-add": (button) => openAddDialog(button.dataset.page),
  "show-notifications": () => {
    if (getCurrentPage() !== "dashboard") location.hash = "#dashboard";
    route();
    $("#action-center").scrollIntoView();
  },
  sort: (button) => {
    const column = Number(button.dataset.column);
    const dir = sort.column === column && sort.dir === "asc" ? "desc" : "asc";
    sort = { column, dir };
    renderRows(button.dataset.page);
  },
  delete: (button) => {
    const { page, index } = button.dataset;
    const [removed] = pages[page].rows.splice(Number(index), 1);
    saveState();
    renderRows(page);
    showToast("Row deleted", {
      label: "Undo",
      onClick: () => {
        pages[page].rows.splice(Number(index), 0, removed);
        saveState();
        if (getCurrentPage() === page) renderRows(page);
      },
    });
  },
  "toast-action": () => {
    if (toastAction) toastAction();
    toastAction = null;
    $("#toast").classList.remove("toast--visible");
  },
  reset: () => {
    if (!confirm("Clear all data in this workspace? This cannot be undone.")) return;
    pages = createEmptyPages();
    notifications = [];
    saveState();
    route();
    showToast("Workspace cleared");
  },
};

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (button && actions[button.dataset.action]) {
    actions[button.dataset.action](button);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "search") {
    renderRows(event.target.dataset.page);
  }
  if (event.target.matches("[data-name-input]")) {
    const typed = event.target.value.trim();
    if (typed) {
      userName = typed;
      updateAvatar();
      saveState();
    }
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "auth-form") handleAuthSubmit(event);
  if (event.target.id === "add-form") handleAddSubmit(event);
  if (event.target.id === "settings-form") handleSettingsSubmit(event);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") document.body.classList.remove("menu-open");
});

window.addEventListener("hashchange", route);

// ---------- Start ----------
if (isAuthenticated) loadState();
route();