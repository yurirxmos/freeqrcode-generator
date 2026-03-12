const qrContentInput = document.getElementById("qrContent");
const logoInput = document.getElementById("logoInput");
const logoFileName = document.getElementById("logoFileName");
const logoScale = document.getElementById("logoScale");
const logoScaleValue = document.getElementById("logoScaleValue");
const logoScaleSuffix = document.getElementById("logoScaleSuffix");
const logoPadding = document.getElementById("logoPadding");
const logoPaddingValue = document.getElementById("logoPaddingValue");
const logoPaddingSuffix = document.getElementById("logoPaddingSuffix");
const generateButton = document.getElementById("generateButton");
const generateButtonLabel = document.getElementById("generateButtonLabel");
const downloadButton = document.getElementById("downloadButton");
const statusMessage = document.getElementById("statusMessage");
const qrCanvas = document.getElementById("qrCanvas");
const previewFrame = document.getElementById("previewFrame");
const languageButtons = document.querySelectorAll("[data-language-button]");

const LANGUAGE_STORAGE_KEY = "free-qrcode-language";
const LANGUAGE_QUERY_PARAM = "lang";
const DEFAULT_LANGUAGE = "pt-BR";
const DEFAULT_QR_SIZE = 512;
const APP_BASE_URL = "http://freeqrcode.rxmos.dev.br/";

const STATUS_STYLE_MAP = {
  info: "border-zinc-200 bg-zinc-50 text-zinc-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
};

const TRANSLATIONS = {
  "pt-BR": {
    ui: {
      badge: "studio edition · sem cadastro",
      heroTitle: "Crie um QR Code com identidade visual forte.",
      heroDescription:
        "Digite o conteúdo, aplique sua marca no centro e exporte em PNG pronto para impressão, cardápio, embalagem ou campanha.",
      languageLabel: "Idioma",
      creativeDirectionLabel: "direção criativa",
      creativeDirectionTitle: "Editorial print com contraste de pôster.",
      creativeDirectionDescription: "Tipografia expressiva, bordas marcantes e atmosfera de papel texturizado.",
      panelBadge: "painel",
      contentLabel: "Conteúdo",
      contentPlaceholder: "https://seusite.com",
      logoLabel: "Logo opcional",
      logoFileDefault: "Nenhuma logo selecionada.",
      logoSizeLabel: "Tamanho da logo",
      logoScaleSuffix: "% do QR",
      logoPaddingLabel: "Margem branca",
      logoPaddingSuffix: "% do QR",
      generateButtonIdle: "Gerar QR Code",
      generateButtonLoading: "Gerando...",
      downloadButton: "Baixar PNG",
      previewBadge: "preview",
      cameraTip: "Dica: use URL completa com https:// para melhorar a leitura em aplicativos de câmera.",
      footerText: "Made with luv by @yurirxmos",
    },
    status: {
      initial: "Preencha os campos e clique em Gerar QR Code.",
      dirty: "Altere os campos e gere novamente para baixar.",
      emptyContent: "Digite um texto ou URL para gerar o QR Code.",
      generating: "Gerando QR Code...",
      generatedSuccess: "QR Code gerado com sucesso.",
      generateBeforeDownload: "Gere o QR Code antes de baixar.",
      exportFailed: "Não foi possível exportar a imagem.",
      downloadStarted: "Download iniciado.",
      invalidImageFile: "Selecione um arquivo de imagem válido.",
      imageFormatUnsupported: "Formato da imagem não suportado.",
      imageReadFailed: "Falha ao ler a imagem.",
      logoLoadFailed: "Não foi possível carregar a logo.",
      canvasContextFailed: "Falha ao abrir o contexto do canvas.",
      invalidQrEngine: "Motor de QR Code inválido.",
      qrRenderFailed: "Falha ao gerar o QR Code.",
      qrLibraryUnavailable: "Não foi possível carregar o motor de QR Code. Verifique a conexão e recarregue a página.",
    },
  },
  "en-US": {
    ui: {
      badge: "studio edition · no sign-up",
      heroTitle: "Create a QR Code with a strong visual identity.",
      heroDescription:
        "Type your content, place your brand at the center, and export a production-ready PNG for print, menus, packaging, or campaigns.",
      languageLabel: "Language",
      creativeDirectionLabel: "creative direction",
      creativeDirectionTitle: "Editorial print with poster-level contrast.",
      creativeDirectionDescription: "Expressive typography, bold borders, and a textured-paper atmosphere.",
      panelBadge: "panel",
      contentLabel: "Content",
      contentPlaceholder: "https://yourwebsite.com",
      logoLabel: "Optional logo",
      logoFileDefault: "No logo selected.",
      logoSizeLabel: "Logo size",
      logoScaleSuffix: "% of QR",
      logoPaddingLabel: "White padding",
      logoPaddingSuffix: "% of QR",
      generateButtonIdle: "Generate QR Code",
      generateButtonLoading: "Generating...",
      downloadButton: "Download PNG",
      previewBadge: "preview",
      cameraTip: "Tip: use a full URL with https:// to improve scanning on camera apps.",
      footerText: "Made with luv by @yurirxmos",
    },
    status: {
      initial: "Fill in the fields and click Generate QR Code.",
      dirty: "Fields changed. Generate again before downloading.",
      emptyContent: "Enter text or a URL to generate the QR Code.",
      generating: "Generating QR Code...",
      generatedSuccess: "QR Code generated successfully.",
      generateBeforeDownload: "Generate the QR Code before downloading.",
      exportFailed: "Could not export the image.",
      downloadStarted: "Download started.",
      invalidImageFile: "Please select a valid image file.",
      imageFormatUnsupported: "Unsupported image format.",
      imageReadFailed: "Failed to read the image.",
      logoLoadFailed: "Could not load the logo.",
      canvasContextFailed: "Could not access the canvas context.",
      invalidQrEngine: "Invalid QR Code engine.",
      qrRenderFailed: "Failed to generate the QR Code.",
      qrLibraryUnavailable: "Could not load the QR Code engine. Check your connection and reload the page.",
    },
  },
};

const SEO_TRANSLATIONS = {
  "pt-BR": {
    title: "Free QRCode Generator | Gerador de QR Code Gratis com Logo",
    description:
      "Crie QR Code gratis online com logo central, ajuste de tamanho e download em PNG. Free QRCode Generator pronto para uso em campanhas, embalagens e cardapios.",
    ogDescription: "Crie QR Code gratis online com logo central, ajuste de tamanho e download em PNG.",
    twitterDescription: "Crie QR Code gratis online com logo central, ajuste de tamanho e download em PNG.",
    ogImageAlt: "Preview do Free QRCode Generator",
    ogLocale: "pt_BR",
  },
  "en-US": {
    title: "Free QRCode Generator | Free QR Code Generator with Logo",
    description:
      "Create a free QR Code online with an optional center logo, sizing controls, and PNG export. Ready-to-use Free QRCode Generator for campaigns, packaging, and menus.",
    ogDescription: "Create free QR Codes online with optional center logo and PNG export.",
    twitterDescription: "Create free QR Codes online with optional center logo and PNG export.",
    ogImageAlt: "Free QRCode Generator preview",
    ogLocale: "en_US",
  },
};

const CONTROL_LIST = [qrContentInput, logoInput, logoScale, logoPadding].filter((element) => Boolean(element));
const QR_CODE_SCRIPT_SOURCES = [
  "https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js",
  "https://unpkg.com/qrcode@1.5.4/build/qrcode.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
];

const state = {
  hasGenerated: false,
  isGenerating: false,
  logoDataUrl: null,
  currentLanguage: DEFAULT_LANGUAGE,
  lastStatusKey: "initial",
  lastStatusType: "info",
};

let qrCodeLibraryPromise = null;

const getSeoPack = (language) => SEO_TRANSLATIONS[language] || SEO_TRANSLATIONS[DEFAULT_LANGUAGE];

const setMetaTagContent = (selector, content) => {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }

  element.setAttribute("content", content);
};

const setLinkHref = (selector, href) => {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }

  element.setAttribute("href", href);
};

const buildLanguageUrl = (language) => {
  const url = new URL(APP_BASE_URL);

  if (language === "en-US") {
    url.searchParams.set(LANGUAGE_QUERY_PARAM, "en-US");
  }

  return url.toString();
};

const getLanguageFromUrl = () => {
  try {
    const url = new URL(window.location.href);
    const languageParam = url.searchParams.get(LANGUAGE_QUERY_PARAM);

    if (languageParam && TRANSLATIONS[languageParam]) {
      return languageParam;
    }
  } catch (_error) {}

  return null;
};

const updateLanguageInUrl = (language) => {
  try {
    const url = new URL(window.location.href);

    if (language === DEFAULT_LANGUAGE) {
      url.searchParams.delete(LANGUAGE_QUERY_PARAM);
    } else {
      url.searchParams.set(LANGUAGE_QUERY_PARAM, language);
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, "", nextUrl);
  } catch (_error) {}
};

const applySeoMetadata = (language) => {
  const seo = getSeoPack(language);
  const localizedUrl = buildLanguageUrl(language);

  document.title = seo.title;

  setMetaTagContent('meta[name="description"]', seo.description);
  setMetaTagContent('meta[property="og:title"]', seo.title);
  setMetaTagContent('meta[property="og:description"]', seo.ogDescription);
  setMetaTagContent('meta[property="og:url"]', localizedUrl);
  setMetaTagContent('meta[property="og:locale"]', seo.ogLocale);
  setMetaTagContent('meta[property="og:image:alt"]', seo.ogImageAlt);
  setMetaTagContent('meta[name="twitter:title"]', seo.title);
  setMetaTagContent('meta[name="twitter:description"]', seo.twitterDescription);

  setLinkHref('link[rel="canonical"]', localizedUrl);
  setLinkHref('link[rel="alternate"][hreflang="pt-BR"]', buildLanguageUrl("pt-BR"));
  setLinkHref('link[rel="alternate"][hreflang="en-US"]', buildLanguageUrl("en-US"));
  setLinkHref('link[rel="alternate"][hreflang="x-default"]', buildLanguageUrl("pt-BR"));
};

const getLanguagePack = (language) => TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];

const t = (section, key) => {
  const currentPack = getLanguagePack(state.currentLanguage);
  const defaultPack = getLanguagePack(DEFAULT_LANGUAGE);
  return currentPack[section]?.[key] || defaultPack[section]?.[key] || "";
};

const createI18nError = (statusKey) => new Error(`i18n:${statusKey}`);

const getStatusKeyFromError = (error, fallbackKey) => {
  if (!(error instanceof Error)) {
    return fallbackKey;
  }

  if (!error.message.startsWith("i18n:")) {
    return fallbackKey;
  }

  return error.message.replace("i18n:", "");
};

const renderStatus = () => {
  const styleClass = STATUS_STYLE_MAP[state.lastStatusType] || STATUS_STYLE_MAP.info;
  statusMessage.textContent = t("status", state.lastStatusKey);
  statusMessage.className = `min-h-12 rounded-md border px-3 py-2 text-sm font-medium transition ${styleClass}`;
};

const setStatus = (statusKey, statusType = "info") => {
  state.lastStatusKey = statusKey;
  state.lastStatusType = statusType;
  renderStatus();
};

const updateGenerateButtonLabel = () => {
  if (!generateButtonLabel) {
    return;
  }

  const labelKey = state.isGenerating ? "generateButtonLoading" : "generateButtonIdle";
  generateButtonLabel.textContent = t("ui", labelKey);
};

const updateLogoFileNameText = () => {
  if (!logoInput.files || logoInput.files.length === 0) {
    logoFileName.textContent = t("ui", "logoFileDefault");
  }
};

const applyLanguage = (language) => {
  const normalizedLanguage = TRANSLATIONS[language] ? language : DEFAULT_LANGUAGE;
  state.currentLanguage = normalizedLanguage;

  document.documentElement.lang = normalizedLanguage;

  languageButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const isActive = button.dataset.languageButton === normalizedLanguage;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    button.classList.toggle("bg-zinc-200", isActive);
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) {
      return;
    }

    element.textContent = t("ui", key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (!key || !(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
      return;
    }

    element.placeholder = t("ui", key);
  });

  if (logoScaleSuffix) {
    logoScaleSuffix.textContent = t("ui", "logoScaleSuffix");
  }

  if (logoPaddingSuffix) {
    logoPaddingSuffix.textContent = t("ui", "logoPaddingSuffix");
  }

  updateGenerateButtonLabel();
  updateLogoFileNameText();
  renderStatus();
  applySeoMetadata(normalizedLanguage);
  updateLanguageInUrl(normalizedLanguage);

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
  } catch (_error) {}
};

const getInitialLanguage = () => {
  const languageFromUrl = getLanguageFromUrl();
  if (languageFromUrl) {
    return languageFromUrl;
  }

  try {
    const persistedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (persistedLanguage && TRANSLATIONS[persistedLanguage]) {
      return persistedLanguage;
    }
  } catch (_error) {}

  if (navigator.language.toLowerCase().startsWith("en")) {
    return "en-US";
  }

  return DEFAULT_LANGUAGE;
};

const setGeneratingState = (isGenerating) => {
  state.isGenerating = isGenerating;
  generateButton.disabled = isGenerating;
  downloadButton.disabled = isGenerating || !state.hasGenerated;
  updateGenerateButtonLabel();
};

const animatePreviewFrame = () => {
  if (!previewFrame) {
    return;
  }

  previewFrame.classList.add("scale-[1.02]");

  window.setTimeout(() => {
    previewFrame.classList.remove("scale-[1.02]");
  }, 180);
};

const setDirtyState = () => {
  if (!state.hasGenerated) {
    return;
  }

  state.hasGenerated = false;
  downloadButton.disabled = true;
  setStatus("dirty");
};

const drawRoundedRect = (context, x, y, width, height, radius) => {
  const normalizedRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + normalizedRadius, y);
  context.lineTo(x + width - normalizedRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + normalizedRadius);
  context.lineTo(x + width, y + height - normalizedRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - normalizedRadius, y + height);
  context.lineTo(x + normalizedRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - normalizedRadius);
  context.lineTo(x, y + normalizedRadius);
  context.quadraticCurveTo(x, y, x + normalizedRadius, y);
  context.closePath();
};

const loadExternalScript = (source) =>
  new Promise((resolve, reject) => {
    const hasSourceScript = Boolean(document.querySelector(`script[src="${source}"]`));
    const sourceWithRetry = hasSourceScript
      ? `${source}${source.includes("?") ? "&" : "?"}cacheBust=${Date.now()}`
      : source;

    const script = document.createElement("script");
    script.src = sourceWithRetry;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(createI18nError("qrLibraryUnavailable"));
    document.head.append(script);
  });

const loadImage = async (source) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(createI18nError("logoLoadFailed"));
    image.src = source;
  });

const renderQrCodeWithLegacyApi = async ({ canvas, text, size }) => {
  const context = canvas.getContext("2d");
  if (!context) {
    throw createI18nError("canvasContextFailed");
  }

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.pointerEvents = "none";

  document.body.append(container);

  try {
    const legacyQrCode = window.QRCode;
    if (typeof legacyQrCode !== "function") {
      throw createI18nError("invalidQrEngine");
    }

    new legacyQrCode(container, {
      text,
      width: size,
      height: size,
      colorDark: "#0f172a",
      colorLight: "#ffffff",
      correctLevel: legacyQrCode.CorrectLevel?.H,
    });

    await new Promise((resolve) => {
      window.setTimeout(resolve, 24);
    });

    const generatedCanvas = container.querySelector("canvas");
    if (generatedCanvas) {
      context.clearRect(0, 0, size, size);
      context.drawImage(generatedCanvas, 0, 0, size, size);
      return;
    }

    const generatedImage = container.querySelector("img");
    if (generatedImage && generatedImage.src) {
      const image = await loadImage(generatedImage.src);
      context.clearRect(0, 0, size, size);
      context.drawImage(image, 0, 0, size, size);
      return;
    }

    throw createI18nError("qrRenderFailed");
  } finally {
    container.remove();
  }
};

const getQrCodeRenderer = () => {
  if (window.QRCode && typeof window.QRCode.toCanvas === "function") {
    return {
      render: async ({ canvas, text, size }) => {
        await window.QRCode.toCanvas(canvas, text, {
          width: size,
          margin: 1,
          errorCorrectionLevel: "H",
          color: {
            dark: "#0f172a",
            light: "#ffffff",
          },
        });
      },
    };
  }

  if (typeof window.QRCode === "function") {
    return {
      render: renderQrCodeWithLegacyApi,
    };
  }

  return null;
};

const ensureQrCodeLibrary = async () => {
  const currentRenderer = getQrCodeRenderer();
  if (currentRenderer) {
    return currentRenderer;
  }

  if (qrCodeLibraryPromise) {
    return qrCodeLibraryPromise;
  }

  qrCodeLibraryPromise = (async () => {
    for (const source of QR_CODE_SCRIPT_SOURCES) {
      try {
        await loadExternalScript(source);
      } catch (_error) {
        continue;
      }

      const renderer = getQrCodeRenderer();
      if (renderer) {
        return renderer;
      }
    }

    throw createI18nError("qrLibraryUnavailable");
  })();

  try {
    return await qrCodeLibraryPromise;
  } catch (error) {
    qrCodeLibraryPromise = null;
    throw error;
  }
};

const drawLogoOnCanvas = async ({ canvas, dataUrl, scalePercent, paddingPercent }) => {
  const context = canvas.getContext("2d");
  if (!context) {
    throw createI18nError("canvasContextFailed");
  }

  const image = await loadImage(dataUrl);
  const logoSize = Math.floor((canvas.width * scalePercent) / 100);
  const paddingSize = Math.floor((canvas.width * paddingPercent) / 100);
  const backgroundSize = logoSize + paddingSize * 2;
  const centerX = Math.floor(canvas.width / 2);
  const centerY = Math.floor(canvas.height / 2);
  const backgroundX = Math.floor(centerX - backgroundSize / 2);
  const backgroundY = Math.floor(centerY - backgroundSize / 2);
  const logoX = Math.floor(centerX - logoSize / 2);
  const logoY = Math.floor(centerY - logoSize / 2);

  context.save();
  context.fillStyle = "#ffffff";
  drawRoundedRect(context, backgroundX, backgroundY, backgroundSize, backgroundSize, Math.floor(backgroundSize * 0.2));
  context.fill();
  context.restore();

  context.save();
  drawRoundedRect(context, logoX, logoY, logoSize, logoSize, Math.floor(logoSize * 0.18));
  context.clip();
  context.drawImage(image, logoX, logoY, logoSize, logoSize);
  context.restore();
};

const generateQrCode = async () => {
  const contentValue = qrContentInput.value.trim();
  if (!contentValue) {
    setStatus("emptyContent", "error");
    return;
  }

  const sizeValue = DEFAULT_QR_SIZE;
  const scalePercent = Number(logoScale.value);
  const paddingPercent = Number(logoPadding.value);

  setGeneratingState(true);
  setStatus("generating");

  try {
    const qrCodeRenderer = await ensureQrCodeLibrary();

    qrCanvas.width = sizeValue;
    qrCanvas.height = sizeValue;

    await qrCodeRenderer.render({
      canvas: qrCanvas,
      text: contentValue,
      size: sizeValue,
    });

    if (state.logoDataUrl) {
      await drawLogoOnCanvas({
        canvas: qrCanvas,
        dataUrl: state.logoDataUrl,
        scalePercent,
        paddingPercent,
      });
    }

    state.hasGenerated = true;
    animatePreviewFrame();
    setStatus("generatedSuccess", "success");
  } catch (error) {
    const statusKey = getStatusKeyFromError(error, "qrRenderFailed");
    setStatus(statusKey, "error");
    state.hasGenerated = false;
  } finally {
    setGeneratingState(false);
  }
};

const getDownloadFileName = () => (state.currentLanguage === "en-US" ? "qrcode-with-logo.png" : "qrcode-com-logo.png");

const downloadQrCode = () => {
  if (!state.hasGenerated) {
    setStatus("generateBeforeDownload", "error");
    return;
  }

  qrCanvas.toBlob((blob) => {
    if (!blob) {
      setStatus("exportFailed", "error");
      return;
    }

    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = getDownloadFileName();
    link.click();
    URL.revokeObjectURL(fileUrl);

    setStatus("downloadStarted", "success");
  }, "image/png");
};

const handleLogoChange = async () => {
  const [file] = logoInput.files || [];

  if (!file) {
    state.logoDataUrl = null;
    logoFileName.textContent = t("ui", "logoFileDefault");
    setDirtyState();
    return;
  }

  if (!file.type.startsWith("image/")) {
    state.logoDataUrl = null;
    logoInput.value = "";
    logoFileName.textContent = t("ui", "logoFileDefault");
    setStatus("invalidImageFile", "error");
    setDirtyState();
    return;
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(createI18nError("imageFormatUnsupported"));
    };
    reader.onerror = () => reject(createI18nError("imageReadFailed"));
    reader.readAsDataURL(file);
  }).catch((error) => {
    const statusKey = getStatusKeyFromError(error, "imageReadFailed");
    setStatus(statusKey, "error");
    return null;
  });

  if (!dataUrl) {
    return;
  }

  state.logoDataUrl = dataUrl;
  logoFileName.textContent = file.name;
  setDirtyState();
};

generateButton.addEventListener("click", generateQrCode);
downloadButton.addEventListener("click", downloadQrCode);
logoInput.addEventListener("change", handleLogoChange);

languageButtons.forEach((button) => {
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  button.addEventListener("click", () => {
    const selectedLanguage = button.dataset.languageButton;
    if (!selectedLanguage) {
      return;
    }

    applyLanguage(selectedLanguage);
  });
});

logoScale.addEventListener("input", () => {
  logoScaleValue.textContent = logoScale.value;
  setDirtyState();
});

logoPadding.addEventListener("input", () => {
  logoPaddingValue.textContent = logoPadding.value;
  setDirtyState();
});

CONTROL_LIST.forEach((element) => {
  if (element === logoInput || element === logoScale || element === logoPadding) {
    return;
  }

  element.addEventListener("input", setDirtyState);
  element.addEventListener("change", setDirtyState);
});

applyLanguage(getInitialLanguage());
