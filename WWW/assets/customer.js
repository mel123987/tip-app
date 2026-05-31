(async function () {
  "use strict";

  const {
    supabase,
    $,
    escapeHtml,
    formatMoney,
    parseAmount,
    safeUrl,
    setStatus,
    setButtonLoading,
    workerAvatar
  } = window.TipApp;

  const workerList = $("#workerList");
  const form = $("#tipForm");
  const amountInput = $("#amount");
  const status = $("#customerStatus");
  const submitButton = $("#submitTipButton");

  let workers = [];
  let selectedWorkerId = null;

  function selectWorker(workerId) {
    selectedWorkerId = workerId;
    document.querySelectorAll(".worker-card").forEach((card) => {
      const isSelected = card.dataset.workerId === workerId;
      card.classList.toggle("selected", isSelected);
      const input = card.querySelector("input");
      if (input) input.checked = isSelected;
    });
  }

  function renderWorkers() {
    if (!workers.length) {
      workerList.className = "empty-state";
      workerList.innerHTML = "No active workers are available yet. Please ask a manager to add workers.";
      return;
    }

    workerList.className = "worker-grid";
    workerList.innerHTML = workers
      .map((worker, index) => `
        <label class="worker-card ${index === 0 ? "selected" : ""}" data-worker-id="${escapeHtml(worker.id)}">
          <input type="radio" name="workerId" value="${escapeHtml(worker.id)}" ${index === 0 ? "checked" : ""}>
          ${workerAvatar(worker)}
          <span class="worker-card-content">
            <strong>${escapeHtml(worker.name)}</strong>
            <span>${escapeHtml(worker.role_title || "Team member")}</span>
            ${worker.payment_handle ? `<span>${escapeHtml(worker.payment_handle)}</span>` : ""}
          </span>
        </label>
      `)
      .join("");

    selectedWorkerId = workers[0].id;
    workerList.querySelectorAll(".worker-card").forEach((card) => {
      card.addEventListener("click", () => selectWorker(card.dataset.workerId));
    });
  }

  async function loadWorkers() {
    const { data, error } = await supabase
      .from("public_workers")
      .select("id, name, role_title, payment_handle, payment_url, photo_url, sort_order")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) throw error;
    workers = data || [];
    renderWorkers();
  }

  function selectedWorker() {
    return workers.find((worker) => worker.id === selectedWorkerId);
  }

  document.querySelectorAll(".amount-chip").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".amount-chip").forEach((chip) => chip.classList.remove("active"));
      button.classList.add("active");
      amountInput.value = Number(button.dataset.amount).toFixed(2);
      amountInput.focus();
    });
  });

  amountInput.addEventListener("input", () => {
    document.querySelectorAll(".amount-chip").forEach((chip) => chip.classList.remove("active"));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(status, "", "info");

    const worker = selectedWorker();
    const amount = parseAmount(amountInput.value);
    if (!worker) {
      setStatus(status, "Please choose a worker before submitting your tip.", "error");
      return;
    }
    if (!amount) {
      setStatus(status, "Please enter a valid tip amount.", "error");
      return;
    }

    setButtonLoading(submitButton, true, "Recording...");
    const formData = new FormData(form);

    const { error } = await supabase.from("tips").insert({
      worker_id: worker.id,
      amount,
      customer_name: String(formData.get("customerName") || "").trim(),
      customer_email: String(formData.get("customerEmail") || "").trim(),
      message: String(formData.get("message") || "").trim()
    });

    setButtonLoading(submitButton, false);

    if (error) {
      setStatus(status, `Tip could not be recorded: ${escapeHtml(error.message)}`, "error");
      return;
    }

    const paymentUrl = safeUrl(worker.payment_url);
    const paymentText = paymentUrl
      ? ` <a href="${escapeHtml(paymentUrl)}" target="_blank" rel="noopener">Open ${escapeHtml(worker.name)}'s payment link</a> to complete payment.`
      : " Please pay the worker directly using the payment handle shown on this page.";

    setStatus(
      status,
      `Thank you! Your ${formatMoney(amount)} tip for ${escapeHtml(worker.name)} was recorded.${paymentText}`,
      "success"
    );

    form.reset();
    document.querySelectorAll(".amount-chip").forEach((chip) => chip.classList.remove("active"));
    if (workers[0]) selectWorker(workers[0].id);
  });

  try {
    await loadWorkers();
  } catch (error) {
    workerList.className = "empty-state";
    workerList.innerHTML = "Unable to load workers. Check that schema.sql has been run in Supabase.";
    setStatus(status, `Supabase error: ${escapeHtml(error.message)}`, "error");
  }
})();
