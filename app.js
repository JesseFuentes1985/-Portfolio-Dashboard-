const mockProjects = [
  {
    title: "Portfolio Dashboard",
    description: "A polished, GitHub Pages-hosted dashboard showing my active projects and Asana activity.",
    tags: ["frontend", "dashboard", "GitHub Pages"],
    status: "In progress",
    repo: "https://github.com/JesseFuentes1985/-Portfolio-Dashboard-",
  },
  {
    title: "Client Launch Tracker",
    description: "A lightweight tracker used to coordinate launches across design, engineering, and marketing.",
    tags: ["product", "coordination", "SaaS"],
    status: "Done",
    repo: "#",
  },
  {
    title: "Internal Growth Plan",
    description: "A personal roadmap dashboard to track learning goals, certifications, and recruiter outreach.",
    tags: ["strategy", "learning", "planning"],
    status: "Active",
    repo: "#",
  },
];

const mockAsana = {
  lastSynced: new Date().toISOString(),
  tasksCompleted: 73,
  workspaces: 2,
  projects: [
    { name: "VMware roadmap", completed: 22, inProgress: 7, status: "On track" },
    { name: "Collab UI refresh", completed: 14, inProgress: 3, status: "At risk" },
    { name: "Australia kickoff", completed: 9, inProgress: 1, status: "Done" },
    { name: "DC console upgrade", completed: 4, inProgress: 6, status: "On track" },
  ],
  weeklyCompleted: [12, 15, 9, 20, 17, 14, 18],
};

function formatNumber(value) {
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function renderProjects() {
  const container = document.getElementById("projectGrid");
  if (!container) return;

  container.innerHTML = "";

  mockProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="project-meta">
        <span class="chip chip--${project.status === "Done" ? "green" : project.status === "In progress" ? "yellow" : "red"}">${project.status}</span>
        <div class="project-meta__links">
          <a href="${project.repo}" target="_blank" rel="noopener" class="chip">Repo</a>
        </div>
      </div>
      <div class="project-tags">
        ${project.tags
          .map((tag) => `<span class="chip" style="opacity: 0.85; margin-right: 0.35rem;">${tag}</span>`)
          .join("")}
      </div>
    `;

    container.appendChild(card);
  });
}

function renderAsanaSummary(asana) {
  document.getElementById("asana-last-sync").textContent = new Date(asana.lastSynced).toLocaleString();
  document.getElementById("asana-tasks-completed").textContent = formatNumber(asana.tasksCompleted);
  document.getElementById("asana-workspaces").textContent = `${asana.workspaces} workspaces`;

  const tbody = document.querySelector("#asanaTable tbody");
  tbody.innerHTML = "";

  asana.projects.forEach((project) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${project.name}</td>
      <td>${project.status}</td>
      <td>${project.completed}</td>
      <td>${project.inProgress}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderCompletedChart(data) {
  const ctx = document.getElementById("completedChart");
  if (!ctx) return;

  const weekly = data.weeklyCompleted;
  const total = weekly.reduce((sum, value) => sum + value, 0);
  const lastValue = weekly[weekly.length - 1];
  const change = lastValue - weekly[weekly.length - 2];
  const changeSign = change >= 0 ? "+" : "";

  document.getElementById("stat-completed").textContent = formatNumber(total);
  document.getElementById("stat-change").textContent = `${changeSign}${formatNumber(change)} vs last week`;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Tasks completed",
          data: weekly,
          borderRadius: 8,
          backgroundColor: "rgba(92, 225, 230, 0.72)",
          hoverBackgroundColor: "rgba(114, 219, 154, 0.9)",
          maxBarThickness: 26,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "rgba(255,255,255,0.7)" },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.06)" },
          ticks: { color: "rgba(255,255,255,0.7)", precision: 0 },
        },
      },
      maintainAspectRatio: false,
    },
  });
}

async function loadAsanaData() {
  try {
    const response = await fetch("./data/asana.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Could not load data/asana.json – falling back to mock Asana data.", error);
    return mockAsana;
  }
}

async function init() {
  renderProjects();
  const asana = await loadAsanaData();
  renderAsanaSummary(asana);
  renderCompletedChart(asana);
}

window.addEventListener("DOMContentLoaded", init);
