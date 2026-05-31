(async function () {
  "use strict";

  const {
    supabase,
    $,
    escapeHtml,
    formatMoney,
    formatDate,
    setStatus,
    setButtonLoading,
    requireAuth,
    renderAuthBadge,
    wireSignOutButtons
  } = window.TipApp;

  const status = $("#workerStatus");
  const claimPanel = $("#claimPanel");
  const claimForm = $("#claimForm");
  const profilePanel = $("#profilePanel");
  const profileForm = $("#workerProfileForm");
  const tipsTable = $("#workerTipsTable");
  const refreshButton = $("#refreshWorkerButton");

  let authContext = null;
  let workerProfiles = [];
  let selectedWorker = null;
  let tips = [];

  function calculateStats() {
    const total = tips
      .filter((tip) => tip.status !== "void")
      .reduce((sum, tip) => sum + Number(tip.amount || 0), 0);
    $("#workerTotalTips").textContent = formatMoney(total);
    $("#workerTipCount").textContent = String(tips.length);
    $("#workerPaidTips").textContent = String(tips.filter((tip) => tip.status === "paid").length);
  }

  function fillProfileForm(worker) {
    if (!worker) {
      profilePanel.classList.add("hidden");
      return;
    }
    profilePanel.classList.remove("hidden");
    $("#workerId").value = worker.id;
    $("#workerDisplayName").value = worker.name || "";
    $("#workerRoleTitle").value = worker.role_title || "";
    $("#workerPaymentHandle").value = worker.payment_handle || "";
    $("#workerPaymentUrl").value = worker.payment_url || "";
    $("#workerPhotoUrl").value = worker.photo_url || "";
  }

  function renderTips() {
    if (!tips.length) {
      tipsTable.className = "responsive-table empty-state";
      tipsTable.innerHTML = selectedWorker
        ? "No tips have been recorded for this profile yet."
        : "Claim a worker profile to see tips.";
      return;
    }

    tipsTable.className = "responsive-table";
    tipsTable.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Customer</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${tips.map((tip) => `
            <tr>
              <td>${escapeHtml(formatDate(tip.created_at))}</td>
              <td><strong>${escapeHtml(formatMoney(tip.amount))}</strong></td>
              <td>
                ${tip.customer_name ? escapeHtml(tip.customer_name) : "<span class=\"muted\">Anonymous</span>"}<br>
                ${tip.customer_email ? `<span class="muted">${escapeHtml(tip.customer_email)}</span>` : ""}
              </td>
              <td>${tip.message ? escapeHtml(tip.message) : "<span class=\"muted\">No message</span>"}</td>
              <td><span class="pill">${escapeHtml(tip.status)}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  async function loadWorkerDashboard() {
    const { data: workers, error: workerError } = await supabase
      .from("workers")
      .select("*")
      .eq("user_id", authContext.user.id)
      .order("created_at", { ascending: true });

    if (workerError) throw workerError;

    workerProfiles = workers || [];
    selectedWorker = workerProfiles[0] || null;
    claimPanel.classList.toggle("hidden", Boolean(selectedWorker));
    fillProfileForm(selectedWorker);

    if (!selectedWorker) {
      tips = [];
      renderTips();
      calculateStats();
      return;
    }

    $("#workerGreeting").textContent = `Hi, ${selectedWorker.name}`;

    const { data: tipData, error: tipError } = await supabase
      .from("tips")
      .select("*")
      .eq("worker_id", selectedWorker.id)
      .order("created_at", { ascending: false });

    if (tipError) throw tipError;
    tips = tipData || [];
    renderTips();
    calculateStats();
  }

  claimForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(status, "", "info");

    const button = claimForm.querySelector("button[type='submit']");
    setButtonLoading(button, true, "Claiming...");
    const claimCode = String(new FormData(claimForm).get("claimCode") || "").trim().toUpperCase();

    const { error } = await supabase.rpc("claim_worker_profile", {
      worker_claim_code: claimCode
    });

    setButtonLoading(button, false);

    if (error) {
      setStatus(status, escapeHtml(error.message), "error");
      return;
    }

    claimForm.reset();
    setStatus(status, "Worker profile claimed.", "success");
    await loadWorkerDashboard();
  });

  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(status, "", "info");

    const button = profileForm.querySelector("button[type='submit']");
    setButtonLoading(button, true, "Saving...");
    const formData = new FormData(profileForm);

    const { error } = await supabase.rpc("update_claimed_worker_profile", {
      worker_profile_id: String(formData.get("workerId") || ""),
      display_name: String(formData.get("name") || "").trim(),
      worker_role_title: String(formData.get("roleTitle") || "").trim(),
      worker_payment_handle: String(formData.get("paymentHandle") || "").trim(),
      worker_payment_url: String(formData.get("paymentUrl") || "").trim(),
      worker_photo_url: String(formData.get("photoUrl") || "").trim()
    });

    setButtonLoading(button, false);

    if (error) {
      setStatus(status, escapeHtml(error.message), "error");
      return;
    }

    setStatus(status, "Public payment details saved.", "success");
    await loadWorkerDashboard();
  });

  refreshButton.addEventListener("click", async () => {
    setButtonLoading(refreshButton, true, "Refreshing...");
    try {
      await loadWorkerDashboard();
      setStatus(status, "Dashboard refreshed.", "success");
    } catch (error) {
      setStatus(status, escapeHtml(error.message), "error");
    } finally {
      setButtonLoading(refreshButton, false);
    }
  });

  try {
    wireSignOutButtons();
    authContext = await requireAuth("worker");
    if (!authContext) return;

    $("#workerGreeting").textContent = `Hi, ${authContext.profile.full_name || "worker"}`;
    renderAuthBadge($("#workerAuthBadge"), authContext.profile, authContext.user);
    await loadWorkerDashboard();
  } catch (error) {
    setStatus(status, `Worker dashboard error: ${escapeHtml(error.message)}`, "error");
  }
})();
