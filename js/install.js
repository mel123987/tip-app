(function () {
  "use strict";

  var deferredInstallPrompt = null;
  var installButtons = Array.prototype.slice.call(document.querySelectorAll("[data-install-button]"));

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function setInstallState(label, disabled) {
    installButtons.forEach(function (button) {
      button.textContent = label;
      button.disabled = Boolean(disabled);
      button.setAttribute("aria-disabled", disabled ? "true" : "false");
    });
  }

  function showInstallButton() {
    installButtons.forEach(function (button) {
      button.hidden = false;
    });
  }

  if (isStandalone()) {
    showInstallButton();
    setInstallState("App Installed", true);
  }

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallButton();
    setInstallState("Download App", false);
  });

  installButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (isStandalone()) {
        setInstallState("App Installed", true);
        return;
      }

      if (!deferredInstallPrompt) {
        showInstallButton();
        setInstallState("Use Browser Install", true);
        return;
      }

      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.finally(function () {
        deferredInstallPrompt = null;
        setInstallState("Install Ready", true);
      });
    });
  });

  window.addEventListener("appinstalled", function () {
    deferredInstallPrompt = null;
    showInstallButton();
    setInstallState("App Installed", true);
  });

  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function (error) {
        console.warn("Tip Portal service worker registration failed.", error);
      });
    });
  }
})();
