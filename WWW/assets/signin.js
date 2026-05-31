(async function () {
  "use strict";

  const {
    supabase,
    $,
    $$,
    escapeHtml,
    setStatus,
    setButtonLoading,
    getSession,
    ensureProfile,
    redirectForProfile
  } = window.TipApp;

  const status = $("#authStatus");
  const signInForm = $("#signInForm");
  const signUpForm = $("#signUpForm");
  const resetPasswordButton = $("#resetPasswordButton");
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");

  function showPanel(panelName) {
    $$(".tab-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.panel === panelName);
    });
    $$(".auth-form").forEach((form) => {
      form.classList.toggle("hidden", form.dataset.authPanel !== panelName);
    });
  }

  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => showPanel(button.dataset.panel));
  });

  function safeNextPage(profile) {
    if (next === "manager.html" && profile.role === "manager") return next;
    if (next === "worker.html" && profile.role === "worker") return next;
    return profile.role === "manager" ? "manager.html" : "worker.html";
  }

  async function routeSignedInUser(user, overrides) {
    const profile = await ensureProfile(user, overrides);
    const destination = safeNextPage(profile);
    window.location.href = destination;
  }

  signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(status, "", "info");

    const button = signInForm.querySelector("button[type='submit']");
    setButtonLoading(button, true, "Signing in...");
    const formData = new FormData(signInForm);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || "")
    });

    setButtonLoading(button, false);

    if (error) {
      setStatus(status, escapeHtml(error.message), "error");
      return;
    }

    await routeSignedInUser(data.user);
  });

  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(status, "", "info");

    const button = signUpForm.querySelector("button[type='submit']");
    setButtonLoading(button, true, "Creating account...");
    const formData = new FormData(signUpForm);
    const role = String(formData.get("role") || "worker");
    const fullName = String(formData.get("fullName") || "").trim();
    const locationName = String(formData.get("locationName") || "").trim();

    const { data, error } = await supabase.auth.signUp({
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || ""),
      options: {
        data: {
          full_name: fullName,
          role,
          location_name: locationName
        }
      }
    });

    setButtonLoading(button, false);

    if (error) {
      setStatus(status, escapeHtml(error.message), "error");
      return;
    }

    if (!data.session) {
      setStatus(status, "Account created. Please check your email to confirm your account, then sign in.", "success");
      showPanel("signInPanel");
      return;
    }

    await routeSignedInUser(data.user, {
      full_name: fullName,
      role,
      location_name: locationName
    });
  });

  resetPasswordButton.addEventListener("click", async () => {
    const email = String($("#signInEmail").value || "").trim();
    if (!email) {
      setStatus(status, "Enter your email address first, then request a password reset.", "error");
      return;
    }

    setButtonLoading(resetPasswordButton, true, "Sending...");
    const redirectTo = window.location.origin + window.location.pathname;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setButtonLoading(resetPasswordButton, false);

    if (error) {
      setStatus(status, escapeHtml(error.message), "error");
      return;
    }

    setStatus(status, "Password reset email sent.", "success");
  });

  try {
    const session = await getSession();
    if (session) {
      const profile = await ensureProfile(session.user);
      redirectForProfile(profile);
    }
  } catch (error) {
    setStatus(status, `Authentication check failed: ${escapeHtml(error.message)}`, "error");
  }
})();
