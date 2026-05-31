(async function () {
  "use strict";

  const {
    supabase,
    $,
    escapeHtml,
    formatMoney,
    formatDate,
    safeUrl,
    setStatus,
    setButtonLoading,
    requireAuth,
    renderAuthBadge,
    wireSignOutButtons,
    generateClaimCode,
    downloadText,
    toCsvValue
  } = window.TipApp;

  const status = $("#managerStatus");
  const workerTable = $("#workerTable");
  const tipsTable = $("#tipsTable");
  const workerForm = $("#workerForm");
  const refreshButton = $("#refreshManagerButton");
  const exportButton = $("#exportTipsButton");

  let authContext = null;
  let workers = [];
  let tips = [];

  function workerName(workerId) {
    return workers.find((worker) => worker.id === workerId)?.name || "Unknown worker";
  }

  function calculateStats() {
    const total = tips
      .filter((tip) => tip.status !== "void")
      .reduce((sum, tip) => sum + Number(tip.amount || 0), 0);
    $("#totalTips").textContent = formatMoney(total);
    $("#recordedTips").textContent = String(tips.filter((tip) => tip.status === "recorded").length);
    $("#paidTips").textContent = String(tips.filter((tip) => tip.status === "paid").length);
    $("#activeWorkers").textContent = String(workers.filter((worker) => worker.active).length);
  }

  function renderWorkers() {
    if (!workers.length) {
      workerTable.className = "responsive-table empty-state";
      workerTable.innerHTML = "No workers yet. Add your first worker above.";
      return;
    }

    workerTable.className = "responsive-table";
    workerTable.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Worker</th>
            <th>Payment</th>
            <th>Claim code</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${workers.map((worker) => {
            const paymentUrl = safeUrl(worker.payment_url);
            return `
            <tr>
              <td>
                <strong>${escapeHtml(worker.name)}</strong><br>
                <span class="muted">${escapeHtml(worker.role_title || "Team member")}</span>
              </td>
              <td>
                ${worker.payment_handle ? escapeHtml(worker.payment_handle) : "<span class=\"muted\">No handle</span>"}<br>
                ${paymentUrl ? `<a href="${escapeHtml(paymentUrl)}" target="_blank" rel="noopener">Payment link</a>` : "<span class=\"muted\">No URL</span>"}
              </td>
              <td>
                ${worker.claim_code ? `<span class="pill">${escapeHtml(worker.claim_code)}</span>` : "<span class=\"muted\">Claimed</span>"}
              </td>
              <td>${worker.active ? "<span class=\"pill\">Active</span>" : "<span class=\"muted\">Inactive</span>"}</td>
              <td>
                <div class="table-actions">
                  ${worker.claim_code ? `<button class="ghost-button small" type="button" data-copy-code="${escapeHtml(worker.claim_code)}">Copy code</button>` : ""}
                  <button class="ghost-button small" type="button" data-toggle-worker="${escapeHtml(worker.id)}">
                    ${worker.active ? "Deactivate" : "Activate"}
                  </button>
                  <button class="danger-button small" type="button" data-delete-worker="${escapeHtml(worker.id)}">Delete</button>
                </div>
              </td>
            </tr>
          `;
          }).join("")}
        </tbody>
      </table>
    `;
  }

  function renderTips() {
    if (!tips.length) {
      tipsTable.className = "responsive-table empty-state";
      tipsTable.innerHTML = "No tips recorded yet.";
      return;
    }

    tipsTable.className = "responsive-table";
    tipsTable.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Worker</th>
            <th>Amount</th>
            <th>Customer</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${tips.map((tip) => `
            <tr>
              <td>${escapeHtml(formatDate(tip.created_at))}</td>
              <td>${escapeHtml(workerName(tip.worker_id))}</td>
              <td><strong>${escapeHtml(formatMoney(tip.amount))}</strong></td>
              <td>
                ${tip.customer_name ? escapeHtml(tip.customer_name) : "<span class=\"muted\">Anonymous</span>"}<br>
                ${tip.customer_email ? `<span class="muted">${escapeHtml(tip.customer_email)}</span>` : ""}
              </td>
              <td>${tip.message ? escapeHtml(tip.message) : "<span class=\"muted\">No message</span>"}</td>
              <td><span class="pill">${escapeHtml(tip.status)}</span></td>
              <td>
                <div class="table-actions">
                  <button class="ghost-button small" type="button" data-tip-status="paid" data-tip-id="${escapeHtml(tip.id)}">Paid</button>
                  <button class="ghost-button small" type="button" data-tip-status="recorded" data-tip-id="${escapeHtml(tip.id)}">Recorded</button>
                  <button class="danger-button small" type="button" data-tip-status="void" data-tip-id="${escapeHtml(tip.id)}">Void</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  async function loadDashboard() {
    const { data: workerData, error: workerError } = await supabase
      .from("workers")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (workerError) throw workerError;
    workers = workerData || [];

    if (!workers.length) {
      tips = [];
      renderWorkers();
      renderTips();
      calculateStats();
      return;
    }

    const workerIds = workers.map((worker) => worker.id);
    const { data: tipData, error: tipError } = await supabase
      .from("tips")
      .select("*")
      .in("worker_id", workerIds)
      .order("created_at", { ascending: false });

    if (tipError) throw tipError;
    tips = tipData || [];
    renderWorkers();
    renderTips();
    calculateStats();
  }

  workerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(status, "", "info");

    const button = workerForm.querySelector("button[type='submit']");
    setButtonLoading(button, true, "Adding...");
    const formData = new FormData(workerForm);
    const claimCode = generateClaimCode();

    const { error } = await supabase.from("workers").insert({
      manager_id: authContext.user.id,
      name: String(formData.get("name") || "").trim(),
      role_title: String(formData.get("roleTitle") || "").trim(),
      payment_handle: String(formData.get("paymentHandle") || "").trim(),
      payment_url: String(formData.get("paymentUrl") || "").trim(),
      photo_url: String(formData.get("photoUrl") || "").trim(),
      sort_order: Number.parseInt(formData.get("sortOrder"), 10) || 0,
      active: true,
      claim_code: claimCode
    });

    setButtonLoading(button, false);

    if (error) {
      setStatus(status, `Worker could not be added: ${escapeHtml(error.message)}`, "error");
      return;
    }

    workerForm.reset();
    $("#sortOrder").value = "0";
    setStatus(status, `Worker added. Share claim code <strong>${escapeHtml(claimCode)}</strong> with them.`, "success");
    await loadDashboard();
  });

  workerTable.addEventListener("click", async (event) => {
    const copyCode = event.target.closest("[data-copy-code]");
    const toggleButton = event.target.closest("[data-toggle-worker]");
    const deleteButton = event.target.closest("[data-delete-worker]");

    if (copyCode) {
      await navigator.clipboard.writeText(copyCode.dataset.copyCode);
      setStatus(status, "Claim code copied.", "success");
      return;
    }

    if (toggleButton) {
      const worker = workers.find((item) => item.id === toggleButton.dataset.toggleWorker);
      if (!worker) return;
      const { error } = await supabase
        .from("workers")
        .update({ active: !worker.active })
        .eq("id", worker.id);
      if (error) {
        setStatus(status, escapeHtml(error.message), "error");
        return;
      }
      await loadDashboard();
      return;
    }

    if (deleteButton) {
      const worker = workers.find((item) => item.id === deleteButton.dataset.deleteWorker);
      if (!worker || !window.confirm(`Delete ${worker.name}? This also deletes their tips.`)) return;
      const { error } = await supabase.from("workers").delete().eq("id", worker.id);
      if (error) {
        setStatus(status, escapeHtml(error.message), "error");
        return;
      }
      await loadDashboard();
    }
  });

  tipsTable.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-tip-status]");
    if (!button) return;

    const { error } = await supabase
      .from("tips")
      .update({ status: button.dataset.tipStatus })
      .eq("id", button.dataset.tipId);

    if (error) {
      setStatus(status, escapeHtml(error.message), "error");
      return;
    }

    await loadDashboard();
  });

  refreshButton.addEventListener("click", async () => {
    setButtonLoading(refreshButton, true, "Refreshing...");
    try {
      await loadDashboard();
      setStatus(status, "Dashboard refreshed.", "success");
    } catch (error) {
      setStatus(status, escapeHtml(error.message), "error");
    } finally {
      setButtonLoading(refreshButton, false);
    }
  });

  exportButton.addEventListener("click", () => {
    const header = ["created_at", "worker", "amount", "customer_name", "customer_email", "message", "status"];
    const rows = tips.map((tip) => [
      tip.created_at,
      workerName(tip.worker_id),
      tip.amount,
      tip.customer_name,
      tip.customer_email,
      tip.message,
      tip.status
    ]);
    const csv = [header, ...rows].map((row) => row.map(toCsvValue).join(",")).join("\n");
    downloadText("tiptip-tips.csv", csv, "text/csv");
  });

  try {
    wireSignOutButtons();
    authContext = await requireAuth("manager");
    if (!authContext) return;

    $("#managerGreeting").textContent = `Welcome, ${authContext.profile.full_name || "manager"}`;
    $("#managerSubheading").textContent = authContext.profile.location_name
      ? `Managing tips for ${authContext.profile.location_name}.`
      : "Manage your team and review recorded tips.";
    renderAuthBadge($("#managerAuthBadge"), authContext.profile, authContext.user);

    await loadDashboard();
  } catch (error) {
    setStatus(status, `Manager portal error: ${escapeHtml(error.message)}`, "error");
  }
})();
