const translations = {
  en: {
    appTitle: "TipFlow | Localized Fintech Tipping",
    hero: {
      eyebrow: "Localized fintech tipping",
      title: "Premium QR tipping for teams and independent workers.",
      subtitle:
        "One mobile-first ecosystem for customer checkout, worker payouts, and transparent group tip management.",
      primaryCta: "Launch checkout",
      secondaryCta: "Open worker app",
      statLanguages: "native languages",
      statExperiences: "core experiences",
      statSolo: "solo worker control",
      phoneEyebrow: "Today in tips",
      phoneCaption: "Ready for instant payout",
      phoneCard1: "Apple Pay",
      phoneCard1Value: "1 tap",
      phoneCard2: "Group split",
      phoneCard2Value: "Live",
      activity1: "Terrace tip shared with 4 workers",
      activity2: "Solo QR payment settled",
      activity3: "Tax document generated",
    },
    customer: {
      eyebrow: "Customer checkout",
      title: "Scan the QR. Tip instantly. No staff search.",
      subtitle:
        "Unique venue, section, and solo QR codes route customers directly to a localized Stripe-powered checkout screen with wallet-first payment options.",
      qrLabel: "Scanned QR destination",
      routeTerrace: "Terrace",
      routeBar: "Bar",
      routeSolo: "Solo",
      checkoutEyebrow: "Secure checkout",
      checkoutTitleTerrace: "Tip Terrace Team",
      checkoutTitleBar: "Tip Bar Team",
      checkoutTitleSolo: "Tip Maya Directly",
      customAmount: "Custom",
      cardEntry: "Enter card details",
      receiptLabel: "Transparent split preview",
      soloReceipt: "100% to Maya",
    },
    worker: {
      eyebrow: "Worker dashboard",
      title: "Company-connected or fully independent in one app.",
      subtitle:
        "Workers can stay tied to management pools or switch to a private solo operation with direct Stripe Connect onboarding, personal QR codes, instant payout, and localized tax files.",
      companyMode: "Company Mode",
      soloMode: "Independent Solo",
      companyDescription: "Earnings are connected to venue-managed pools and section assignments.",
      soloDescription:
        "Your Stripe Connect account, solo QR, and personal tips remain outside management visibility.",
      cashOut: "Cash Out",
      tabEarnings: "Earnings",
      tabQr: "QR",
      tabTax: "Tax",
      shareLabel: "Your live section shares",
      qrLabel: "Standalone solo QR",
      regenerateQr: "Generate new QR",
      taxTitle: "Tax Compliance",
      taxDescription: "Download localized income statements and payout records.",
      downloadTax: "Download documents",
      feature1Title: "Stripe Connect solo onboarding",
      feature1Text:
        "Independent workers connect their own bank accounts and keep personal tips outside manager visibility.",
      feature2Title: "Instant cash out",
      feature2Text: "A dedicated payout action gives workers immediate access to eligible balances.",
      feature3Title: "Localized tax center",
      feature3Text: "Income documents match the worker's selected language and operating mode.",
    },
    manager: {
      eyebrow: "Manager dashboard",
      title: "Group tipping with real-time equal splits.",
      subtitle:
        "Create business sections, assign workers, and show every eligible worker their transparent share as tips arrive.",
      controlTitle: "Group tipping control panel",
      simulateTip: "Simulate tip",
      sectionName: "Section name",
      workerNames: "Workers",
      createSection: "Create section",
      transparencyTitle: "Worker-visible split ledger",
      taxPortal: "Corporate tax portal",
      taxPortalText: "Download worker tax forms and grouped section reports.",
      downloadForms: "Download forms",
      terrace: "Terrace",
      bar: "Bar",
      kitchen: "Kitchen",
      assignedWorkers: "{count} assigned workers",
      equalShare: "Equal share",
      totalTips: "Total tips",
      ledgerText: "{worker} receives an equal share from {section}.",
      placeholders: {
        section: "Patio",
        workers: "Ava, Noah, Lina",
      },
    },
    toast: {
      cashOut: "Instant payout requested. Eligible balance is moving to the connected bank account.",
      soloQr: "New solo QR generated.",
      sectionCreated: "Section created and equal split ledger updated.",
      simulatedTip: "New group tip received and split equally in real time.",
      taxDownload: "Localized tax document download started.",
      corporateTax: "Corporate worker tax forms are being prepared.",
      payment: "Checkout is ready for Stripe wallet confirmation.",
    },
  },
  es: {
    appTitle: "TipFlow | Propinas fintech localizadas",
    hero: {
      eyebrow: "Propinas fintech localizadas",
      title: "Propinas QR premium para equipos y trabajadores independientes.",
      subtitle:
        "Un ecosistema mobile-first para checkout de clientes, pagos a trabajadores y gestion transparente de propinas grupales.",
      primaryCta: "Abrir checkout",
      secondaryCta: "Abrir app del trabajador",
      statLanguages: "idiomas nativos",
      statExperiences: "experiencias principales",
      statSolo: "control del trabajador solo",
      phoneEyebrow: "Propinas de hoy",
      phoneCaption: "Listo para pago instantaneo",
      phoneCard1: "Apple Pay",
      phoneCard1Value: "1 toque",
      phoneCard2: "Division grupal",
      phoneCard2Value: "En vivo",
      activity1: "Propina de Terraza compartida con 4 trabajadores",
      activity2: "Pago QR solo liquidado",
      activity3: "Documento fiscal generado",
    },
    customer: {
      eyebrow: "Checkout del cliente",
      title: "Escanea el QR. Da propina al instante. Sin buscar personal.",
      subtitle:
        "Codigos QR unicos para local, seccion y modo solo llevan al cliente directamente a un checkout localizado con Stripe y pagos de billetera primero.",
      qrLabel: "Destino del QR escaneado",
      routeTerrace: "Terraza",
      routeBar: "Barra",
      routeSolo: "Solo",
      checkoutEyebrow: "Checkout seguro",
      checkoutTitleTerrace: "Propina al equipo de Terraza",
      checkoutTitleBar: "Propina al equipo de Barra",
      checkoutTitleSolo: "Propina directa para Maya",
      customAmount: "Otro",
      cardEntry: "Introducir tarjeta",
      receiptLabel: "Vista previa transparente",
      soloReceipt: "100% para Maya",
    },
    worker: {
      eyebrow: "Panel del trabajador",
      title: "Conectado a empresa o totalmente independiente en una app.",
      subtitle:
        "Los trabajadores pueden seguir en pools gestionados o cambiar a una operacion privada con Stripe Connect, QR personal, pago instantaneo y archivos fiscales localizados.",
      companyMode: "Modo Empresa",
      soloMode: "Modo Solo Independiente",
      companyDescription: "Las ganancias estan conectadas a pools del local y asignaciones de seccion.",
      soloDescription:
        "Tu cuenta Stripe Connect, QR solo y propinas personales quedan fuera de la visibilidad de gerencia.",
      cashOut: "Retirar ahora",
      tabEarnings: "Ganancias",
      tabQr: "QR",
      tabTax: "Fiscal",
      shareLabel: "Tus participaciones en vivo",
      qrLabel: "QR solo independiente",
      regenerateQr: "Generar nuevo QR",
      taxTitle: "Cumplimiento fiscal",
      taxDescription: "Descarga estados de ingresos y registros de pagos localizados.",
      downloadTax: "Descargar documentos",
      feature1Title: "Alta solo con Stripe Connect",
      feature1Text:
        "Los trabajadores independientes conectan sus propias cuentas bancarias y mantienen propinas personales fuera de gerencia.",
      feature2Title: "Retiro instantaneo",
      feature2Text: "Una accion dedicada de pago da acceso inmediato a saldos elegibles.",
      feature3Title: "Centro fiscal localizado",
      feature3Text: "Los documentos de ingresos coinciden con el idioma y modo operativo seleccionados.",
    },
    manager: {
      eyebrow: "Panel del gerente",
      title: "Propinas grupales con division igualitaria en tiempo real.",
      subtitle:
        "Crea secciones del negocio, asigna trabajadores y muestra a cada persona elegible su parte transparente cuando entran propinas.",
      controlTitle: "Panel de control de propinas grupales",
      simulateTip: "Simular propina",
      sectionName: "Nombre de seccion",
      workerNames: "Trabajadores",
      createSection: "Crear seccion",
      transparencyTitle: "Libro visible para trabajadores",
      taxPortal: "Portal fiscal corporativo",
      taxPortalText: "Descarga formularios fiscales de trabajadores e informes agrupados por seccion.",
      downloadForms: "Descargar formularios",
      terrace: "Terraza",
      bar: "Barra",
      kitchen: "Cocina",
      assignedWorkers: "{count} trabajadores asignados",
      equalShare: "Parte igual",
      totalTips: "Propinas totales",
      ledgerText: "{worker} recibe una parte igual de {section}.",
      placeholders: {
        section: "Patio",
        workers: "Ava, Noah, Lina",
      },
    },
    toast: {
      cashOut: "Retiro instantaneo solicitado. El saldo elegible va a la cuenta bancaria conectada.",
      soloQr: "Nuevo QR solo generado.",
      sectionCreated: "Seccion creada y libro de division actualizado.",
      simulatedTip: "Nueva propina grupal recibida y dividida por igual en tiempo real.",
      taxDownload: "Descarga de documento fiscal localizado iniciada.",
      corporateTax: "Los formularios fiscales corporativos se estan preparando.",
      payment: "El checkout esta listo para confirmar con la billetera Stripe.",
    },
  },
  de: {
    appTitle: "TipFlow | Lokalisierte Fintech-Trinkgelder",
    hero: {
      eyebrow: "Lokalisierte Fintech-Trinkgelder",
      title: "Premium-QR-Trinkgeld fuer Teams und unabhaengige Mitarbeiter.",
      subtitle:
        "Ein Mobile-First-Oekosystem fuer Kunden-Checkout, Auszahlungen und transparente Gruppen-Trinkgelder.",
      primaryCta: "Checkout starten",
      secondaryCta: "Mitarbeiter-App oeffnen",
      statLanguages: "native Sprachen",
      statExperiences: "Kernbereiche",
      statSolo: "Solo-Kontrolle",
      phoneEyebrow: "Trinkgeld heute",
      phoneCaption: "Bereit fuer Sofortauszahlung",
      phoneCard1: "Apple Pay",
      phoneCard1Value: "1 Tipp",
      phoneCard2: "Gruppen-Split",
      phoneCard2Value: "Live",
      activity1: "Terrassen-Trinkgeld mit 4 Mitarbeitern geteilt",
      activity2: "Solo-QR-Zahlung abgeschlossen",
      activity3: "Steuerdokument erstellt",
    },
    customer: {
      eyebrow: "Kunden-Checkout",
      title: "QR scannen. Sofort tippen. Keine Mitarbeitersuche.",
      subtitle:
        "Eindeutige QR-Codes fuer Betrieb, Bereich und Solo leiten Kunden direkt zu einem lokalisierten Stripe-Checkout mit Wallet-Zahlungen.",
      qrLabel: "Ziel des gescannten QR-Codes",
      routeTerrace: "Terrasse",
      routeBar: "Bar",
      routeSolo: "Solo",
      checkoutEyebrow: "Sicherer Checkout",
      checkoutTitleTerrace: "Terrassen-Team tippen",
      checkoutTitleBar: "Bar-Team tippen",
      checkoutTitleSolo: "Maya direkt tippen",
      customAmount: "Individuell",
      cardEntry: "Kartendaten eingeben",
      receiptLabel: "Transparente Split-Vorschau",
      soloReceipt: "100% fuer Maya",
    },
    worker: {
      eyebrow: "Mitarbeiter-Dashboard",
      title: "Unternehmensgebunden oder komplett unabhaengig in einer App.",
      subtitle:
        "Mitarbeiter bleiben in Management-Pools oder wechseln in den privaten Solo-Betrieb mit Stripe Connect, persoenlichem QR, Sofortauszahlung und lokalisierten Steuerdateien.",
      companyMode: "Unternehmensmodus",
      soloMode: "Unabhaengiger Solo-Modus",
      companyDescription: "Einnahmen sind mit vom Betrieb verwalteten Pools und Bereichszuweisungen verbunden.",
      soloDescription:
        "Dein Stripe-Connect-Konto, Solo-QR und persoenliche Trinkgelder bleiben ausserhalb der Management-Sicht.",
      cashOut: "Auszahlen",
      tabEarnings: "Einnahmen",
      tabQr: "QR",
      tabTax: "Steuern",
      shareLabel: "Deine Live-Bereichsanteile",
      qrLabel: "Eigenstaendiger Solo-QR",
      regenerateQr: "Neuen QR erzeugen",
      taxTitle: "Steuer-Compliance",
      taxDescription: "Lade lokalisierte Einkommensnachweise und Auszahlungsberichte herunter.",
      downloadTax: "Dokumente laden",
      feature1Title: "Solo-Onboarding mit Stripe Connect",
      feature1Text:
        "Unabhaengige Mitarbeiter verbinden eigene Bankkonten und halten persoenliche Trinkgelder vor Management verborgen.",
      feature2Title: "Sofortauszahlung",
      feature2Text: "Eine dedizierte Auszahlungsaktion gibt sofortigen Zugriff auf verfuegbare Salden.",
      feature3Title: "Lokales Steuercenter",
      feature3Text: "Einkommensdokumente passen zu Sprache und Betriebsmodus des Mitarbeiters.",
    },
    manager: {
      eyebrow: "Manager-Dashboard",
      title: "Gruppen-Trinkgeld mit Echtzeit-Splits zu gleichen Teilen.",
      subtitle:
        "Erstelle Geschaeftsbereiche, weise Mitarbeiter zu und zeige jeder berechtigten Person ihren transparenten Anteil, sobald Trinkgelder eintreffen.",
      controlTitle: "Kontrollpanel fuer Gruppen-Trinkgeld",
      simulateTip: "Trinkgeld simulieren",
      sectionName: "Bereichsname",
      workerNames: "Mitarbeiter",
      createSection: "Bereich erstellen",
      transparencyTitle: "Fuer Mitarbeiter sichtbares Split-Ledger",
      taxPortal: "Corporate-Steuerportal",
      taxPortalText: "Mitarbeiter-Steuerformulare und gruppierte Bereichsberichte herunterladen.",
      downloadForms: "Formulare laden",
      terrace: "Terrasse",
      bar: "Bar",
      kitchen: "Kueche",
      assignedWorkers: "{count} zugewiesene Mitarbeiter",
      equalShare: "Gleicher Anteil",
      totalTips: "Trinkgeld gesamt",
      ledgerText: "{worker} erhaelt einen gleichen Anteil aus {section}.",
      placeholders: {
        section: "Patio",
        workers: "Ava, Noah, Lina",
      },
    },
    toast: {
      cashOut: "Sofortauszahlung angefordert. Der verfuegbare Saldo geht an das verbundene Bankkonto.",
      soloQr: "Neuer Solo-QR wurde erzeugt.",
      sectionCreated: "Bereich erstellt und Split-Ledger aktualisiert.",
      simulatedTip: "Neues Gruppen-Trinkgeld empfangen und in Echtzeit gleich geteilt.",
      taxDownload: "Download des lokalisierten Steuerdokuments gestartet.",
      corporateTax: "Corporate-Mitarbeiter-Steuerformulare werden vorbereitet.",
      payment: "Checkout ist bereit fuer die Stripe-Wallet-Bestaetigung.",
    },
  },
  fr: {
    appTitle: "TipFlow | Pourboires fintech localises",
    hero: {
      eyebrow: "Pourboires fintech localises",
      title: "Pourboires QR premium pour equipes et independants.",
      subtitle:
        "Un ecosysteme mobile-first pour le paiement client, les virements travailleurs et la gestion transparente des pourboires de groupe.",
      primaryCta: "Lancer le paiement",
      secondaryCta: "Ouvrir l'app travailleur",
      statLanguages: "langues natives",
      statExperiences: "experiences centrales",
      statSolo: "controle solo",
      phoneEyebrow: "Pourboires du jour",
      phoneCaption: "Pret pour virement instantane",
      phoneCard1: "Apple Pay",
      phoneCard1Value: "1 geste",
      phoneCard2: "Partage groupe",
      phoneCard2Value: "Direct",
      activity1: "Pourboire Terrasse partage avec 4 travailleurs",
      activity2: "Paiement QR solo regle",
      activity3: "Document fiscal genere",
    },
    customer: {
      eyebrow: "Paiement client",
      title: "Scannez le QR. Donnez un pourboire. Sans recherche d'employe.",
      subtitle:
        "Des QR codes uniques pour etablissement, section et solo dirigent le client vers un paiement Stripe localise avec options wallet en premier.",
      qrLabel: "Destination du QR scanne",
      routeTerrace: "Terrasse",
      routeBar: "Bar",
      routeSolo: "Solo",
      checkoutEyebrow: "Paiement securise",
      checkoutTitleTerrace: "Pourboire equipe Terrasse",
      checkoutTitleBar: "Pourboire equipe Bar",
      checkoutTitleSolo: "Pourboire direct pour Maya",
      customAmount: "Autre",
      cardEntry: "Saisir la carte",
      receiptLabel: "Apercu transparent du partage",
      soloReceipt: "100% pour Maya",
    },
    worker: {
      eyebrow: "Tableau travailleur",
      title: "Relie a l'entreprise ou totalement independant dans une app.",
      subtitle:
        "Les travailleurs restent dans les pools geres ou passent en operation solo privee avec Stripe Connect, QR personnel, virement instantane et fichiers fiscaux localises.",
      companyMode: "Mode Entreprise",
      soloMode: "Mode Solo Independant",
      companyDescription: "Les revenus sont connectes aux pools du lieu et aux affectations de section.",
      soloDescription:
        "Votre compte Stripe Connect, QR solo et pourboires personnels restent hors de la visibilite du management.",
      cashOut: "Encaisser",
      tabEarnings: "Revenus",
      tabQr: "QR",
      tabTax: "Fiscal",
      shareLabel: "Vos parts de section en direct",
      qrLabel: "QR solo autonome",
      regenerateQr: "Generer un nouveau QR",
      taxTitle: "Conformite fiscale",
      taxDescription: "Telechargez les releves de revenus et historiques de virement localises.",
      downloadTax: "Telecharger les documents",
      feature1Title: "Onboarding solo Stripe Connect",
      feature1Text:
        "Les independants connectent leurs propres comptes bancaires et gardent les pourboires personnels hors de la visibilite manager.",
      feature2Title: "Encaissement instantane",
      feature2Text: "Une action dediee donne un acces immediat aux soldes eligibles.",
      feature3Title: "Centre fiscal localise",
      feature3Text: "Les documents de revenus suivent la langue et le mode d'operation selectionnes.",
    },
    manager: {
      eyebrow: "Tableau manager",
      title: "Pourboires de groupe avec partage egal en temps reel.",
      subtitle:
        "Creez des sections, assignez les travailleurs et montrez a chaque personne eligible sa part transparente des l'arrivee des pourboires.",
      controlTitle: "Panneau de controle des pourboires de groupe",
      simulateTip: "Simuler un pourboire",
      sectionName: "Nom de section",
      workerNames: "Travailleurs",
      createSection: "Creer section",
      transparencyTitle: "Registre visible par les travailleurs",
      taxPortal: "Portail fiscal corporate",
      taxPortalText: "Telecharger les formulaires fiscaux travailleurs et rapports par section.",
      downloadForms: "Telecharger formulaires",
      terrace: "Terrasse",
      bar: "Bar",
      kitchen: "Cuisine",
      assignedWorkers: "{count} travailleurs assignes",
      equalShare: "Part egale",
      totalTips: "Pourboires totaux",
      ledgerText: "{worker} recoit une part egale de {section}.",
      placeholders: {
        section: "Patio",
        workers: "Ava, Noah, Lina",
      },
    },
    toast: {
      cashOut: "Virement instantane demande. Le solde eligible part vers le compte bancaire connecte.",
      soloQr: "Nouveau QR solo genere.",
      sectionCreated: "Section creee et registre de partage mis a jour.",
      simulatedTip: "Nouveau pourboire de groupe recu et partage egalement en temps reel.",
      taxDownload: "Telechargement du document fiscal localise lance.",
      corporateTax: "Les formulaires fiscaux corporate sont en preparation.",
      payment: "Le paiement est pret pour confirmation wallet Stripe.",
    },
  },
};

const state = {
  lang: "en",
  route: "terrace",
  amount: 10,
  amountPreset: "10",
  workerMode: "company",
  qrSeed: 8842,
  sections: [
    { id: "terrace", nameKey: "manager.terrace", workers: ["Maya", "Lina", "Noah", "Ava"], tips: 180 },
    { id: "bar", nameKey: "manager.bar", workers: ["Maya", "Theo", "Iris"], tips: 112.5 },
    { id: "kitchen", nameKey: "manager.kitchen", workers: ["Omar", "Jules"], tips: 97.5 },
  ],
};

const formatterCache = new Map();

function t(path, replacements = {}) {
  const value = path.split(".").reduce((current, key) => current?.[key], translations[state.lang]);
  if (typeof value !== "string") {
    return path;
  }

  return Object.entries(replacements).reduce(
    (copy, [key, replacement]) => copy.replaceAll(`{${key}}`, replacement),
    value,
  );
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function currency(value) {
  const cacheKey = `${state.lang}-EUR`;
  if (!formatterCache.has(cacheKey)) {
    formatterCache.set(
      cacheKey,
      new Intl.NumberFormat(state.lang, {
        style: "currency",
        currency: "EUR",
      }),
    );
  }

  return formatterCache.get(cacheKey).format(value);
}

function compactCurrency(value) {
  const cacheKey = `${state.lang}-EUR-compact`;
  if (!formatterCache.has(cacheKey)) {
    formatterCache.set(
      cacheKey,
      new Intl.NumberFormat(state.lang, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    );
  }

  return formatterCache.get(cacheKey).format(value);
}

function setActive(elements, matcher) {
  elements.forEach((element) => {
    element.classList.toggle("active", matcher(element));
  });
}

function routeTitleKey(route) {
  return `customer.checkoutTitle${route.charAt(0).toUpperCase()}${route.slice(1)}`;
}

function sectionName(section) {
  return section.nameKey ? t(section.nameKey) : section.name;
}

function findSection(id) {
  return state.sections.find((section) => section.id === id);
}

function selectedRouteSection() {
  return findSection(state.route);
}

function updateLocalizedText() {
  document.documentElement.lang = state.lang;
  document.title = t("appTitle");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.getElementById("sectionName").placeholder = t("manager.placeholders.section");
  document.getElementById("workerNames").placeholder = t("manager.placeholders.workers");

  setActive(document.querySelectorAll(".language-pill"), (button) => button.dataset.lang === state.lang);
}

function updateCheckout() {
  const section = selectedRouteSection();
  const splitCount = section?.workers.length || 1;
  const splitValue = currency(state.amount / splitCount);
  const amountText = currency(state.amount);

  document.getElementById("checkoutTitle").textContent = t(routeTitleKey(state.route));
  document.getElementById("qrRoute").textContent = `tipflow.app/qr/${state.route}-${state.route === "solo" ? state.qrSeed : 24}`;
  document.getElementById("applePayAmount").textContent = amountText;
  document.getElementById("googlePayAmount").textContent = amountText;
  document.getElementById("receiptSplit").textContent =
    state.route === "solo" ? t("customer.soloReceipt") : `${splitCount} x ${splitValue}`;

  document.querySelectorAll("[data-amount]").forEach((button) => {
    if (button.dataset.amount !== "custom") {
      button.textContent = compactCurrency(Number(button.dataset.amount));
    }
  });

  setActive(document.querySelectorAll("[data-route]"), (button) => button.dataset.route === state.route);
  setActive(document.querySelectorAll("[data-amount]"), (button) => button.dataset.amount === state.amountPreset);
}

function updateWorkerDashboard() {
  const solo = state.workerMode === "solo";
  const companyBalance = state.sections
    .filter((section) => section.workers.includes("Maya"))
    .reduce((total, section) => total + section.tips / section.workers.length, 0);
  const balance = solo ? 286.75 : companyBalance + 368;

  document.getElementById("workerModeLabel").textContent = solo ? t("worker.soloMode") : t("worker.companyMode");
  document.getElementById("workerModeDescription").textContent = solo
    ? t("worker.soloDescription")
    : t("worker.companyDescription");
  document.getElementById("workerBalance").textContent = currency(balance);
  document.getElementById("heroTotal").textContent = currency(balance);
  document.getElementById("soloQrCode").textContent = `TF-SOLO-MAYA-${state.qrSeed}`;

  const terrace = findSection("terrace");
  const bar = findSection("bar");
  document.getElementById("workerTerraceShare").textContent = currency(terrace.tips / terrace.workers.length);
  document.getElementById("workerBarShare").textContent = currency(bar.tips / bar.workers.length);

  setActive(document.querySelectorAll("[data-mode]"), (button) => button.dataset.mode === state.workerMode);
}

function renderSections() {
  const sectionList = document.getElementById("sectionList");
  const splitLedger = document.getElementById("splitLedger");
  sectionList.textContent = "";
  splitLedger.textContent = "";

  state.sections.forEach((section) => {
    const share = section.tips / section.workers.length;
    const sectionLabel = sectionName(section);

    const sectionCard = document.createElement("article");
    sectionCard.className = "business-section";
    sectionCard.innerHTML = `
      <header>
        <div>
          <h3>${escapeHtml(sectionLabel)}</h3>
          <p>${t("manager.assignedWorkers", { count: section.workers.length })}</p>
        </div>
        <div>
          <strong>${currency(share)}</strong>
          <p>${t("manager.equalShare")}</p>
        </div>
      </header>
      <div class="worker-chips">
        ${section.workers.map((worker) => `<span>${escapeHtml(worker)}</span>`).join("")}
      </div>
    `;

    sectionList.appendChild(sectionCard);

    section.workers.forEach((worker) => {
      const row = document.createElement("div");
      row.className = "ledger-row";
      row.innerHTML = `
        <div>
          <p>${escapeHtml(t("manager.ledgerText", { worker, section: sectionLabel }))}</p>
          <p>${t("manager.totalTips")}: ${currency(section.tips)}</p>
        </div>
        <strong>${currency(share)}</strong>
      `;
      splitLedger.appendChild(row);
    });
  });

  const totalTips = state.sections.reduce((total, section) => total + section.tips, 0);
  document.getElementById("totalGroupTips").textContent = currency(totalTips);
}

function refreshUi() {
  updateLocalizedText();
  updateCheckout();
  updateWorkerDashboard();
  renderSections();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function bindEvents() {
  document.querySelectorAll(".language-pill").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      refreshUi();
    });
  });

  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      state.route = button.dataset.route;
      updateCheckout();
    });
  });

  document.querySelectorAll("[data-amount]").forEach((button) => {
    button.addEventListener("click", () => {
      state.amountPreset = button.dataset.amount;
      state.amount = button.dataset.amount === "custom" ? 25 : Number(button.dataset.amount);
      updateCheckout();
      showToast(t("toast.payment"));
    });
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.workerMode = button.dataset.mode;
      updateWorkerDashboard();
    });
  });

  document.querySelectorAll("[data-worker-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTab = button.dataset.workerTab;
      setActive(document.querySelectorAll("[data-worker-tab]"), (tabButton) => tabButton.dataset.workerTab === selectedTab);
      document.querySelectorAll(".worker-tab").forEach((tab) => {
        tab.classList.toggle("active", tab.id === `worker-tab-${selectedTab}`);
      });
    });
  });

  document.getElementById("cashOutButton").addEventListener("click", () => {
    showToast(t("toast.cashOut"));
  });

  document.getElementById("regenerateQr").addEventListener("click", () => {
    state.qrSeed = Math.floor(1000 + Math.random() * 9000);
    updateWorkerDashboard();
    updateCheckout();
    showToast(t("toast.soloQr"));
  });

  document.querySelectorAll(".tax-card .button").forEach((button) => {
    button.addEventListener("click", () => showToast(t("toast.taxDownload")));
  });

  document.querySelector(".tax-download .button").addEventListener("click", () => {
    showToast(t("toast.corporateTax"));
  });

  document.querySelectorAll(".wallet-button, .card-entry").forEach((button) => {
    button.addEventListener("click", () => showToast(t("toast.payment")));
  });

  document.getElementById("addTipButton").addEventListener("click", () => {
    const nextTip = [12, 18, 24, 36][Math.floor(Math.random() * 4)];
    const targetSection = state.sections[Math.floor(Math.random() * state.sections.length)];
    targetSection.tips += nextTip;
    renderSections();
    updateWorkerDashboard();
    updateCheckout();
    showToast(t("toast.simulatedTip"));
  });

  document.getElementById("sectionForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const sectionInput = document.getElementById("sectionName");
    const workerInput = document.getElementById("workerNames");
    const name = sectionInput.value.trim();
    const workers = workerInput.value
      .split(",")
      .map((worker) => worker.trim())
      .filter(Boolean);

    if (!name || workers.length === 0) {
      sectionInput.focus();
      return;
    }

    state.sections.push({
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${Date.now()}`,
      name,
      workers,
      tips: 0,
    });

    sectionInput.value = "";
    workerInput.value = "";
    renderSections();
    showToast(t("toast.sectionCreated"));
  });
}

bindEvents();
refreshUi();
