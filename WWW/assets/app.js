(function () {
  "use strict";

  const SUPABASE_URL = "https://vvmcbqsvsvbsjvasbfnk.supabase.co";
  const SUPABASE_PUBLIC_KEY = "sb_publishable_JDjmYrva97qvQaOYji61wQ_93iKZE1B";

  if (!window.supabase) {
    throw new Error("Supabase JavaScript library did not load.");
  }

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatMoney(value) {
    const amount = Number(value || 0);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  }

  function formatDate(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(new Date(value));
  }

  function parseAmount(value) {
    const cleaned = String(value || "").replace(/[^0-9.]/g, "");
    const amount = Number.parseFloat(cleaned);
    if (!Number.isFinite(amount) || amount <= 0) return null;
    return Math.round(amount * 100) / 100;
  }

  function safeUrl(value) {
    if (!value) return "";
    let raw = String(value).trim();
    if (!raw) return "";
    if (!/^[a-z][a-z0-9+.-]*:/i.test(raw) && /^[\w.-]+\.[a-z]{2,}/i.test(raw)) {
      raw = `https://${raw}`;
    }
    try {
      const url = new URL(raw, window.location.origin);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.href;
      }
    } catch (error) {
      return "";
    }
    return "";
  }

  function setStatus(element, message, type = "info") {
    if (!element) return;
    element.className = `status ${type}`;
    element.innerHTML = message;
    element.classList.toggle("hidden", !message);
  }

  function setButtonLoading(button, isLoading, loadingText = "Working...") {
    if (!button) return;
    if (isLoading) {
      button.dataset.originalText = button.textContent;
      button.textContent = loadingText;
      button.disabled = true;
      return;
    }
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }

  function currentPageName() {
    const page = window.location.pathname.split("/").filter(Boolean).pop();
    return page || "index.html";
  }

  function profileFromUserMetadata(user) {
    const metadata = user?.user_metadata || {};
    return {
      id: user.id,
      email: user.email || "",
      full_name: metadata.full_name || metadata.name || "",
      role: metadata.role === "manager" ? "manager" : "worker",
      location_name: metadata.location_name || ""
    };
  }

  async function getSession() {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async function ensureProfile(user, overrides = {}) {
    const fallback = { ...profileFromUserMetadata(user), ...overrides };
    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) throw error;
    if (data) return data;

    const { data: inserted, error: insertError } = await client
      .from("profiles")
      .insert(fallback)
      .select()
      .single();

    if (insertError) throw insertError;
    return inserted;
  }

  async function requireAuth(expectedRole) {
    const session = await getSession();
    if (!session) {
      const next = encodeURIComponent(currentPageName());
      window.location.href = `signin.html?next=${next}`;
      return null;
    }

    const profile = await ensureProfile(session.user);
    if (expectedRole && profile.role !== expectedRole) {
      redirectForProfile(profile);
      return null;
    }

    return { session, user: session.user, profile };
  }

  function redirectForProfile(profile) {
    const destination = profile?.role === "manager" ? "manager.html" : "worker.html";
    if (currentPageName() !== destination) {
      window.location.href = destination;
    }
  }

  function renderAuthBadge(element, profile, user) {
    if (!element) return;
    element.innerHTML = `
      <strong>${escapeHtml(profile.full_name || user.email)}</strong><br>
      <span>${escapeHtml(profile.role)} &middot; ${escapeHtml(user.email || "")}</span>
    `;
  }

  async function signOut() {
    await client.auth.signOut();
    window.location.href = "signin.html";
  }

  function wireSignOutButtons() {
    $$("[data-sign-out]").forEach((button) => {
      button.addEventListener("click", signOut);
    });
  }

  function initials(name) {
    const parts = String(name || "Worker")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "W";
  }

  function workerAvatar(worker) {
    const photoUrl = safeUrl(worker.photo_url);
    if (photoUrl) {
      return `<span class="avatar"><img src="${escapeHtml(photoUrl)}" alt=""></span>`;
    }
    return `<span class="avatar">${escapeHtml(initials(worker.name))}</span>`;
  }

  function generateClaimCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    const values = new Uint32Array(8);
    window.crypto.getRandomValues(values);
    values.forEach((value) => {
      code += alphabet[value % alphabet.length];
    });
    return code;
  }

  function downloadText(filename, content, type = "text/plain") {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function toCsvValue(value) {
    const text = String(value ?? "");
    if (/[",\n]/.test(text)) {
      return `"${text.replaceAll('"', '""')}"`;
    }
    return text;
  }

  window.TipApp = {
    supabase: client,
    $,
    $$,
    escapeHtml,
    formatMoney,
    formatDate,
    parseAmount,
    safeUrl,
    setStatus,
    setButtonLoading,
    getSession,
    ensureProfile,
    requireAuth,
    redirectForProfile,
    renderAuthBadge,
    signOut,
    wireSignOutButtons,
    initials,
    workerAvatar,
    generateClaimCode,
    downloadText,
    toCsvValue
  };
})();
