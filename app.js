const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const QUESTIONS = [
  {
    id: "national-i",
    paper: "全国 I 卷",
    title: "理解发生变化的一个词语",
    genre: "自选文体",
    sourceMax: 60,
    wordMin: 800,
    prompt: "词语是表达思想情感的载体，也是展现社会生活变化的窗口。青年常为新的。写你成长过程中理解发生变化的一个词语，谈联想和思考。",
    summary: "选一个词，写它在成长中的意义变化。",
    hooks: ["词语变化", "青年成长", "时代变化", "自我更新"],
    safeAngles: ["从个人体验切入时代变迁", "用一个词串起认知升级", "避免空谈宏大叙事"],
    source: "中国日报网转载教育部教育考试院题目汇总"
  },
  {
    id: "national-ii",
    paper: "全国 II 卷",
    title: "不失其体，不失其源",
    genre: "自选文体",
    sourceMax: 60,
    wordMin: 800,
    prompt: "材料借日月虽蔽而复明、江汉虽穷而复通，强调困顿与风浪中只要本体未失、源头不竭，终能重放光明、贯通入海。",
    summary: "困顿中守住根本，方能复明通达。",
    hooks: ["根本", "源头", "挫折", "文明韧性"],
    safeAngles: ["守住精神根系再谈突破", "把挫折写成检验而非终点", "避免只写鸡汤"],
    source: "中国日报网转载教育部教育考试院题目汇总"
  },
  {
    id: "beijing-plan",
    paper: "北京卷",
    title: "做规划与下功夫",
    genre: "议论文",
    sourceMax: 50,
    wordMin: 700,
    prompt: "从《读书分年日程》谈起：个人阅读成长、国家社会发展，都需要做好规划、循序渐进，也需要身体力行、下足功夫。题目为《做规划与下功夫》。",
    summary: "规划提供路径，下功夫完成抵达。",
    hooks: ["规划", "行动", "读书方法", "长期主义"],
    safeAngles: ["论证规划与实践互相成就", "用读书、科研或国家工程举例", "避免把规划写成口号"],
    source: "中国日报网转载北京卷作文题"
  },
  {
    id: "beijing-huaju",
    paper: "北京卷",
    title: "含英咀华",
    genre: "记叙文",
    sourceMax: 50,
    wordMin: 700,
    prompt: "“含英咀华”指仔细琢磨、领会诗文精华，也可指阅读经典、鉴赏艺术、感悟生活中反复品味和用心体悟的难忘经历。题目为《含英咀华》。",
    summary: "写一次反复品味、用心体悟的经历。",
    hooks: ["经典阅读", "艺术体悟", "生活细节", "难忘经历"],
    safeAngles: ["重细节，不要写成议论文", "把体悟过程写出层次", "人物与场景要落地"],
    source: "中国日报网转载北京卷作文题"
  },
  {
    id: "tianjin-tiao",
    paper: "天津卷",
    title: "调：顺势与创造",
    genre: "文体不限",
    sourceMax: 60,
    wordMin: 800,
    prompt: "材料由调色盘中精准调配色彩、南水北调调动资源引出：“调”一字双音，既有顺势而为的选择，又有不拘一格的创造。",
    summary: "从“调”写顺势而为与主动创造。",
    hooks: ["调配", "调动", "顺势而为", "创造"],
    safeAngles: ["从方法论写到人生选择", "用艺术、工程、社会治理做支撑", "避免只玩文字游戏"],
    source: "中国日报网转载天津卷作文题"
  },
  {
    id: "shanghai-tech",
    paper: "上海卷",
    title: "科技也改造想象",
    genre: "自选文体",
    sourceMax: 70,
    wordMin: 800,
    prompt: "每个人都有对世界的想象。科技改造世界时，也改造着我们的想象。谈你的认识和思考。",
    summary: "科技不仅改变现实，也重塑人的想象。",
    hooks: ["科技", "想象", "世界图景", "人的主体性"],
    safeAngles: ["承认技术扩展想象，也警惕想象被格式化", "用 AI、航天、生物科技等例子", "避免简单赞美技术"],
    source: "中国日报网转载上海卷作文题"
  }
];

const QUICK_PROMPTS = [
  "稳健议论文，审题准确，论据具体，不要太像 AI",
  "高中生口吻，有真情实感，语言清爽，不堆砌名言",
  "想上 55 分，结构清楚，开头抓题，结尾有力量",
  "帮我避开套作感，加入一个生活细节和一个时代例子",
  "故意写得有一点考场味，但不要空泛喊口号"
];

const COACH_ACTIONS = {
  diagnose: "先像严格语文老师一样诊断这篇作文：审题、结构、材料、语言分别哪里扣分。先不要改全文。",
  outline: "重搭一个更稳的考场提纲：中心论点、分论点、材料安排、开头结尾。先不要改全文。",
  revise: "在保留我原意的基础上整篇改稿，优先提升审题贴合、段落推进和高中生质感。",
  opening: "只重写标题和开头两段，要更快扣题、更像考场高分开头，不要改后文。",
  detail: "补一个真实可信的个人细节或生活场景，把空泛段落落地，但不要编真实姓名学校。",
  humanize: "去掉明显 AI 味和模板腔，减少空泛口号，让语言更像认真高中生自己写的。",
  ending: "只重写结尾，要回扣题目、收束观点，有余味但不要喊口号。",
  polish: "做语言润色：删套话、压重复、保留结构，尽量少改原意。"
};

const API_BASE = String(window.GAOKAO_API_BASE || "").replace(/\/$/, "");
const IS_STATIC_PAGES = location.hostname.endsWith("github.io") && !API_BASE;

const SEEDED_BOARD = [
  { alias: "审题雷达", score: 57, question: "全国 II 卷", label: "稳到考官点头", time: "种子榜" },
  { alias: "语文课代表", score: 55, question: "上海卷", label: "想象力未被格式化", time: "种子榜" },
  { alias: "作文稳定器", score: 53, question: "北京卷", label: "规划与功夫都在线", time: "种子榜" },
  { alias: "结尾升华王", score: 50, question: "天津卷", label: "有调性但略飘", time: "种子榜" },
  { alias: "八百字战士", score: 46, question: "全国 I 卷", label: "安全过线", time: "种子榜" }
];

const els = {
  aiStatus: $("#aiStatus"),
  sheetQuestionLabel: $("#sheetQuestionLabel"),
  scoreStamp: $("#scoreStamp"),
  deskScore: $("#deskScore"),
  scoreValue: $("#scoreValue"),
  wordValue: $("#wordValue"),
  wordBar: $("#wordBar"),
  fitValue: $("#fitValue"),
  fitBar: $("#fitBar"),
  riskValue: $("#riskValue"),
  riskBar: $("#riskBar"),
  questionGrid: $("#questionGrid"),
  randomQuestionBtn: $("#randomQuestionBtn"),
  aliasInput: $("#aliasInput"),
  promptInput: $("#promptInput"),
  promptChips: $("#promptChips"),
  studioQuestionTitle: $("#studioQuestionTitle"),
  studioQuestionMeta: $("#studioQuestionMeta"),
  studioQuestionSummary: $("#studioQuestionSummary"),
  studioHooks: $("#studioHooks"),
  canvasQuestionTitle: $("#canvasQuestionTitle"),
  canvasQuestionMeta: $("#canvasQuestionMeta"),
  canvasWordValue: $("#canvasWordValue"),
  canvasFitValue: $("#canvasFitValue"),
  canvasRiskValue: $("#canvasRiskValue"),
  voiceBtn: $("#voiceBtn"),
  cleanPromptBtn: $("#cleanPromptBtn"),
  generateBtn: $("#generateBtn"),
  essayInput: $("#essayInput"),
  essayStatus: $("#essayStatus"),
  undoDraftBtn: $("#undoDraftBtn"),
  gradeBtn: $("#gradeBtn"),
  coachFeed: $("#coachFeed"),
  coachActions: $("#coachActions"),
  coachInput: $("#coachInput") || $("#promptInput"),
  coachAdviceBtn: $("#coachAdviceBtn"),
  coachSendBtn: $("#coachSendBtn"),
  clearCoachBtn: $("#clearCoachBtn"),
  copyShareBtn: $("#copyShareBtn"),
  resultTitle: $("#resultTitle"),
  totalScore: $("#totalScore"),
  judgeComment: $("#judgeComment"),
  contentBar: $("#contentBar"),
  expressionBar: $("#expressionBar"),
  developmentBar: $("#developmentBar"),
  contentScore: $("#contentScore"),
  expressionScore: $("#expressionScore"),
  developmentScore: $("#developmentScore"),
  redFlags: $("#redFlags"),
  leaderboardList: $("#leaderboardList"),
  resetBoardBtn: $("#resetBoardBtn"),
  shareTitle: $("#shareTitle"),
  shareText: $("#shareText"),
  posterBtn: $("#posterBtn"),
  downloadBtn: $("#downloadBtn"),
  systemShareBtn: $("#systemShareBtn"),
  posterDialog: $("#posterDialog"),
  posterCanvas: $("#posterCanvas"),
  dialogCopyBtn: $("#dialogCopyBtn"),
  dialogDownloadBtn: $("#dialogDownloadBtn")
};

const state = {
  selectedId: "national-i",
  mode: "stable",
  lastResult: null,
  aiMode: "checking",
  isBusy: false,
  recognition: null,
  draftHistory: [],
  coachMessages: [],
  shareText: ""
};

function selectedQuestion() {
  return QUESTIONS.find((item) => item.id === state.selectedId) || QUESTIONS[0];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hashText(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function chineseLength(text) {
  return (text || "").replace(/\s+/g, "").length;
}

function todayText() {
  return new Date().toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
}

function renderQuestions() {
  els.questionGrid.innerHTML = QUESTIONS.map((question) => `
    <button class="question-card ${question.id === state.selectedId ? "active" : ""}" data-question="${question.id}" type="button">
      <div class="tag-row">
        <span class="paper-tag">${question.paper}</span>
        <span class="genre-tag">${question.genre}</span>
      </div>
      <h3>${question.title}</h3>
      <p>${question.summary}</p>
      <small>${question.sourceMax} 分原题 · 不少于 ${question.wordMin} 字</small>
    </button>
  `).join("");

  $$(".question-card").forEach((button) => {
    button.addEventListener("click", () => {
      selectQuestion(button.dataset.question);
    });
  });
}

function renderChips() {
  els.promptChips.innerHTML = QUICK_PROMPTS.map((text) => (
    `<button type="button" data-chip="${escapeAttr(text)}">${text}</button>`
  )).join("");

  $$("#promptChips button").forEach((button) => {
    button.addEventListener("click", () => {
      const before = els.promptInput.value.trim();
      els.promptInput.value = before ? `${before}\n${button.dataset.chip}` : button.dataset.chip;
      updateMetrics();
    });
  });
}

function escapeAttr(text) {
  return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function selectQuestion(id) {
  state.selectedId = id;
  const question = selectedQuestion();
  els.sheetQuestionLabel.textContent = question.paper;
  els.promptInput.placeholder = `例如：围绕「${question.title}」先搭结构，语言像认真高中生，材料具体一点。`;
  if (els.studioQuestionTitle) els.studioQuestionTitle.textContent = question.title;
  if (els.studioQuestionMeta) els.studioQuestionMeta.textContent = `${question.paper} · ${question.genre}`;
  if (els.studioQuestionSummary) els.studioQuestionSummary.textContent = question.summary;
  if (els.studioHooks) {
    els.studioHooks.innerHTML = question.hooks.map((hook) => `<span>${escapeHtml(hook)}</span>`).join("");
  }
  if (els.canvasQuestionTitle) els.canvasQuestionTitle.textContent = question.title;
  if (els.canvasQuestionMeta) {
    els.canvasQuestionMeta.textContent = `${question.paper} · ${question.genre} · 不少于 ${question.wordMin} 字 · 原题 ${question.sourceMax} 分`;
  }
  renderQuestions();
  updateMetrics();
}

function buildQuestionPayload() {
  const question = selectedQuestion();
  return {
    id: question.id,
    paper: question.paper,
    title: question.title,
    genre: question.genre,
    scoreMax: question.sourceMax,
    wordMin: question.wordMin,
    prompt: question.prompt,
    summary: question.summary,
    hooks: question.hooks,
    safeAngles: question.safeAngles
  };
}

function setBusy(isBusy, label) {
  state.isBusy = isBusy;
  els.generateBtn.disabled = isBusy;
  els.gradeBtn.disabled = isBusy;
  els.randomQuestionBtn.disabled = isBusy;
  els.coachAdviceBtn.disabled = isBusy;
  els.coachSendBtn.disabled = isBusy;
  $$("#coachActions button").forEach((button) => {
    button.disabled = isBusy;
  });
  if (label) els.essayStatus.textContent = label;
}

function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${normalized}` : normalized;
}

async function checkAiHealth() {
  if (IS_STATIC_PAGES) {
    state.aiMode = "mock";
    els.aiStatus.textContent = "LLM 后端未连接";
    els.aiStatus.classList.add("mock");
    addCoachMessage("ai", "当前公开页还没有配置真实 LLM 后端，我会先用本地模拟模式陪你打磨。部署 Vercel/Worker 并设置 API key 后，这里会显示 AI 在线。");
    return;
  }

  try {
    const res = await fetch(apiUrl("api/health"), { method: "GET" });
    if (!res.ok) throw new Error("health failed");
    const data = await res.json();
    state.aiMode = data.aiEnabled ? "online" : "mock";
    const fallback = Array.isArray(data.fallbackModels) && data.fallbackModels.includes("gpt-5.5") ? " → gpt-5.5" : "";
    els.aiStatus.textContent = data.aiEnabled ? `AI 在线 · ${data.model}${fallback}` : "本地模拟 AI";
    els.aiStatus.classList.toggle("online", data.aiEnabled);
    els.aiStatus.classList.toggle("mock", !data.aiEnabled);
  } catch {
    state.aiMode = "mock";
    els.aiStatus.textContent = "本地模拟 AI";
    els.aiStatus.classList.add("mock");
  }
}

async function postJson(url, payload) {
  const res = await fetch(apiUrl(url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

async function postStream(url, payload, onDelta) {
  const res = await fetch(apiUrl(url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "text/event-stream"
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split(/\r?\n\r?\n/);
    buffer = blocks.pop() || "";
    for (const block of blocks) handleSseBlock(block, onDelta);
  }
  if (buffer.trim()) handleSseBlock(buffer, onDelta);
}

function handleSseBlock(block, onDelta) {
  const lines = String(block || "").split(/\r?\n/);
  const eventLine = lines.find((line) => line.startsWith("event:"));
  const eventName = eventLine ? eventLine.slice(6).trim() : "message";
  const dataText = lines
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart())
    .join("\n");
  if (!dataText || eventName === "done") return;
  let data = dataText;
  try {
    data = JSON.parse(dataText);
  } catch {
    // Plain text fallback from non-SSE compatible proxies.
  }
  if (eventName === "error") {
    throw new Error(typeof data === "object" ? data.message || "AI stream failed" : String(data));
  }
  if (eventName === "delta" || eventName === "message") onDelta(String(data || ""));
}

async function generateEssay() {
  const question = selectedQuestion();
  const userPrompt = els.promptInput.value.trim();
  setBusy(true, "AI 正在组织论点和考场结构");
  addCoachMessage("user", userPrompt || `请根据「${question.title}」生成一版稳妥初稿。`);
  const payload = {
    question: buildQuestionPayload(),
    userPrompt,
    mode: state.mode,
    alias: alias()
  };

  if (state.aiMode !== "online") {
    const fallback = localEssay(question, userPrompt, state.mode);
    replaceEssay(`${fallback.title}\n\n${fallback.essay}`, "已用本地模拟 AI 完成，可继续改稿");
    addCoachMessage("ai", `初稿已生成。\n风险提醒：${fallback.warnings.join("；")}`);
    els.essayStatus.textContent = "已用本地模拟 AI 完成，可继续改稿";
    setBusy(false);
    updateMetrics();
    return;
  }

  try {
    let streamed = "";
    const streamMessage = addCoachMessage("ai", "正在流式生成初稿，右侧 Canvas 会同步写入。");
    beginLiveEssay("AI 正在流式写入 Canvas");
    try {
      await postStream("api/write-stream", payload, (delta) => {
        streamed += delta;
        updateLiveEssay(streamed, `AI 正在流式写入 ${chineseLength(streamed)} 字`);
        updateCoachMessage(streamMessage, `正在流式生成初稿，右侧 Canvas 同步写入。\n已写入 ${chineseLength(streamed)} 字`);
      });
      if (chineseLength(streamed) > 120) {
        finishLiveEssay(streamed, "AI 流式初稿完成，可继续追问或改稿");
        updateCoachMessage(streamMessage, "初稿已写入 Canvas。你可以继续输入要求，让 AI 诊断、补细节、去 AI 味或局部改写。");
        return;
      }
      throw new Error("stream returned too little text");
    } catch {
      updateCoachMessage(streamMessage, "流式生成暂时不可用，已改用普通生成。");
    }

    const data = await postJson("api/write", payload);
    const normalized = normalizeWriteResult(data, question, userPrompt);
    replaceEssay(`${normalized.title}\n\n${normalized.essay}`, "AI 初稿完成，可继续追问或改稿");
    addCoachMessage("ai", [
      "初稿已生成。",
      normalized.outline?.length ? `提纲：\n${normalized.outline.map((item, index) => `${index + 1}. ${item}`).join("\n")}` : "",
      normalized.warnings?.length ? `风险提醒：${normalized.warnings.join("；")}` : ""
    ].filter(Boolean).join("\n\n"));
    els.essayStatus.textContent = normalized.warnings?.length
      ? `AI 完成：${normalized.warnings[0]}`
      : "AI 完成，可继续改稿";
  } catch {
    const fallback = localEssay(question, userPrompt, state.mode);
    replaceEssay(`${fallback.title}\n\n${fallback.essay}`, "已用本地模拟 AI 完成，可继续改稿");
    addCoachMessage("ai", `线上 AI 暂不可用，已切到本地模拟初稿。\n风险提醒：${fallback.warnings.join("；")}`);
    els.essayStatus.textContent = "已用本地模拟 AI 完成，可继续改稿";
  } finally {
    setBusy(false);
    updateMetrics();
  }
}

function normalizeWriteResult(data, question, userPrompt) {
  if (!data || typeof data !== "object") return localEssay(question, userPrompt, state.mode);
  const title = String(data.title || question.title || "考场作文").trim();
  const essay = String(data.essay || "").trim();
  if (essay.length < 80) return localEssay(question, userPrompt, state.mode);
  return {
    title,
    essay,
    outline: Array.isArray(data.outline) ? data.outline.slice(0, 5) : [],
    warnings: Array.isArray(data.warnings) ? data.warnings.slice(0, 3) : []
  };
}

function currentEssay() {
  return els.essayInput.value.trim();
}

function pushDraftSnapshot() {
  const essay = currentEssay();
  if (!essay) return;
  const last = state.draftHistory[state.draftHistory.length - 1];
  if (last !== essay) {
    state.draftHistory.push(essay);
    state.draftHistory = state.draftHistory.slice(-12);
  }
  els.undoDraftBtn.disabled = state.draftHistory.length === 0;
}

function replaceEssay(nextEssay, status) {
  const before = currentEssay();
  if (before && before !== nextEssay.trim()) pushDraftSnapshot();
  els.essayInput.value = nextEssay.trim();
  state.lastResult = null;
  toggleShareButtons(false);
  els.undoDraftBtn.disabled = state.draftHistory.length === 0;
  if (status) els.essayStatus.textContent = status;
  updateMetrics();
  drawPoster();
}

function beginLiveEssay(status) {
  if (currentEssay()) pushDraftSnapshot();
  els.essayInput.value = "";
  state.lastResult = null;
  toggleShareButtons(false);
  els.undoDraftBtn.disabled = state.draftHistory.length === 0;
  if (status) els.essayStatus.textContent = status;
  updateMetrics();
}

function updateLiveEssay(text, status) {
  els.essayInput.value = text;
  state.lastResult = null;
  toggleShareButtons(false);
  if (status) els.essayStatus.textContent = status;
  updateMetrics();
}

function finishLiveEssay(text, status) {
  els.essayInput.value = String(text || "").trim();
  state.lastResult = null;
  toggleShareButtons(false);
  els.undoDraftBtn.disabled = state.draftHistory.length === 0;
  if (status) els.essayStatus.textContent = status;
  updateMetrics();
  drawPoster();
}

function undoDraft() {
  const previous = state.draftHistory.pop();
  if (!previous) return;
  els.essayInput.value = previous;
  els.undoDraftBtn.disabled = state.draftHistory.length === 0;
  state.lastResult = null;
  toggleShareButtons(false);
  els.essayStatus.textContent = "已撤回到上一版";
  updateMetrics();
}

function addCoachMessage(role, text) {
  const clean = String(text || "").trim();
  if (!clean) return -1;
  state.coachMessages.push({ role, text: clean });
  state.coachMessages = state.coachMessages.slice(-20);
  renderCoachFeed();
  return state.coachMessages.length - 1;
}

function updateCoachMessage(index, text) {
  if (index < 0 || !state.coachMessages[index]) return;
  state.coachMessages[index].text = String(text || "").trim() || "…";
  renderCoachFeed();
}

function renderCoachFeed() {
  if (!els.coachFeed) return;
  const messages = state.coachMessages.length
    ? state.coachMessages
    : [{ role: "ai", text: "先在下面输入创作目标，生成初稿；之后继续像聊天一样要求我诊断、重搭提纲、改开头、补细节或去 AI 味，右侧 Canvas 会同步更新。" }];
  els.coachFeed.innerHTML = messages.map((message) => `
    <div class="coach-msg ${message.role === "user" ? "user" : "ai"}">
      <strong>${message.role === "user" ? "你" : "AI"}</strong>${escapeHtml(message.text)}
    </div>
  `).join("");
  els.coachFeed.scrollTop = els.coachFeed.scrollHeight;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function localEssay(question, userPrompt, mode) {
  const seed = hashText(`${question.id}:${userPrompt}:${mode}`);
  const hook = question.hooks[seed % question.hooks.length];
  const detail = detailFor(question, seed);
  const titles = {
    "national-i": ["在变化的词语里看见成长", "一个词的重新命名"],
    "national-ii": ["守其本源，终见通途", "本体不失，长河自通"],
    "beijing-plan": ["做规划与下功夫", "以规划定向，以笃行抵达"],
    "beijing-huaju": ["含英咀华", "那一次，我读懂了回甘"],
    "tianjin-tiao": ["调出人生的亮色", "顺势而调，因时而创"],
    "shanghai-tech": ["让想象不止于技术", "科技重塑想象之后"]
  };
  const title = titles[question.id]?.[seed % 2] || question.title;
  const voice = {
    stable: "稳健",
    sharp: "思辨",
    literary: "细腻"
  }[mode] || "稳健";

  const paras = [
    `如果说考场作文最怕脱离题面，那么这道题给我的提醒首先是：不能急着喊口号，而要把“${hook}”放回真实的成长现场。${question.summary}，看似是一句可以迅速概括的判断，真正写起来，却要求我们说明变化从何而来、选择为何成立、人的主动性又如何落到日常。`,
    `我愿意从一个并不宏大的经验写起。${detail}那一刻我意识到，所谓理解，并不是把词典里的解释背得更熟，而是在一次次使用、碰撞和修正中，知道一个词会怎样影响我们的行动。一个人若只拥有漂亮的概念，却没有经由生活验证的判断，文章会浮，人生也会浮。`,
    `因此，${question.title}并不是要求我们制造高深，而是要求我们把关系讲清楚。它一端连着个人经验：我们如何读书、做事、受挫、重来；另一端连着时代现场：技术更新、社会发展、文化传承都在改变人的感受方式。好的作文不能只站在云端俯瞰，也不能只停在个人小情绪里打转。`,
    `从个人看，成长常常不是突然懂得全部答案，而是终于愿意承认问题的复杂。过去我容易把“努力”理解成时间堆积，把“创新”理解成推倒重来，把“想象”理解成天马行空。后来才知道，真正有力量的改变，往往是在守住底线和根本之后，慢慢调动资源、调整方法、打开新的可能。`,
    `从社会看，许多可贵的进步也遵循相似的逻辑。一个工程的完成，离不开规划、试验和协调；一种文化的延续，离不开反复体味和创造性转化；一种技术的出现，既拓宽想象，也提醒人不要把想象完全交给工具。越是变化迅疾，越需要清醒的主体站在其中。`,
    `这也是我理解这道题的关键：变化不是失去方向，坚守也不是拒绝更新。若只谈变化，容易写成追风；若只谈坚守，又容易写成守旧。更难也更值得写的是，在复杂处保持分寸，在困顿处守住源头，在顺势处敢于创造。这样的立意，才有考场文章应有的筋骨。`,
    `回到青年自身，我们当然可以借助工具、方法和外部资源，甚至可以请 AI 帮助整理表达。但最后负责选择、判断和承担的，仍是写作者本人。作文的分数不只来自漂亮句子，更来自真实的思考密度：是否扣住材料，是否有自己的经验，是否能把一个看似熟悉的问题说得更清楚。`,
    `所以，我愿把这篇文章的结尾落在行动上。面对新的词语、新的问题和新的世界，与其急着给出标准答案，不如在规划中下功夫，在变化中守根本，在想象中保持人的温度。如此，我们写下的就不只是考场作文，也是一代青年面对时代时更成熟的自我说明。`
  ];

  if (voice === "思辨") {
    paras[5] = `当然，最需要警惕的，是把题目处理成单向度答案。变化并不天然进步，坚守也不天然高贵；技术能拓展想象，也可能让想象变窄；规划能提升效率，也可能压扁生命弹性。承认两面性，再作价值判断，文章才不会像贴标签。`;
  }

  if (voice === "细腻") {
    paras[1] = `我愿意从一个细小的片段写起。${detail}纸页、光线、旁人的一句提醒，都让一个原本普通的词慢慢有了温度。它不再只是材料里的关键词，而像一枚钉子，把个人经验、时代变化和心里的微光钉在一起。`;
  }

  return { title, essay: paras.join("\n\n"), warnings: ["本地模拟生成，建议手动补充个人细节"] };
}

function detailFor(question, seed) {
  const details = {
    "national-i": [
      "我曾把“稳定”理解为一成不变，直到一次班级项目不断返工，才明白稳定也可以是面对变化时的可靠",
      "我曾把“远方”理解为地理距离，后来在一次志愿服务中发现，远方也可能是一个人尚未打开的理解"
    ],
    "national-ii": [
      "一次竞赛失利后，我重新翻看旧笔记，发现真正支撑自己的不是排名，而是仍愿意追问的习惯",
      "球队连败时，老师让我们从基本动作练起，我才懂得源头不竭比短暂胜负更重要"
    ],
    "beijing-plan": [
      "备考时我把一本厚书拆成每日小节，进度表并不耀眼，却让我在反复精读中看到变化",
      "社团排练曾因临时发挥而混乱，后来我们重做时间表，也在一次次排练中补足功夫"
    ],
    "beijing-huaju": [
      "第一次读不懂一首诗时，我只觉得隔膜；第二次在雨夜重读，才听见字句深处的回声",
      "外婆教我看一幅旧画，不急着说像不像，而是让我看线条怎样慢慢把时间留住"
    ],
    "tianjin-tiao": [
      "一次合唱排练中，指挥不断调整声部比例，我才知道和谐不是平均，而是各得其位",
      "做实验时参数稍有偏差便前功尽弃，我第一次感到创造并非任性，而是精准调动"
    ],
    "shanghai-tech": [
      "第一次用 AI 生成图片时，我惊讶于它能把想象变成画面，也警惕自己是否只会沿着提示词想象",
      "看火星探测新闻时，我发现科技把远方拉近，也把人类对自身位置的想象重新打开"
    ]
  };
  const pool = details[question.id] || details["national-i"];
  return pool[seed % pool.length];
}

async function runCoach(action, customInstruction = "", shouldRewrite = true) {
  const question = selectedQuestion();
  const essay = currentEssay();
  const actionInstruction = COACH_ACTIONS[action] || "";
  const instruction = [actionInstruction, customInstruction].filter(Boolean).join("\n");
  if (!instruction.trim()) {
    els.essayStatus.textContent = "先写一个改稿要求";
    return;
  }

  addCoachMessage("user", instruction);
  setBusy(true, shouldRewrite ? "AI 正在改写 Canvas" : "AI 正在诊断");

  if (state.aiMode !== "online") {
    const result = localCoach(question, essay, instruction, action, shouldRewrite);
    applyCoachResult(result, shouldRewrite);
    setBusy(false);
    return;
  }

  const payload = {
    question: buildQuestionPayload(),
    essay,
    userPrompt: els.promptInput.value.trim(),
    instruction,
    action,
    mode: state.mode,
    shouldRewrite,
    history: state.coachMessages.slice(-10),
    alias: alias()
  };

  try {
    if (shouldRewrite) {
      let streamed = "";
      const streamMessage = addCoachMessage("ai", "正在把修改流式写入右侧 Canvas。");
      beginLiveEssay("AI 正在流式改写 Canvas");
      try {
        await postStream("api/coach-stream", payload, (delta) => {
          streamed += delta;
          updateLiveEssay(streamed, `AI 正在流式改写 ${chineseLength(streamed)} 字`);
          updateCoachMessage(streamMessage, `正在把修改流式写入右侧 Canvas。\n已写入 ${chineseLength(streamed)} 字`);
        });
        if (chineseLength(streamed) > 80) {
          finishLiveEssay(streamed, "AI 已流式生成新版本，可继续追问");
          updateCoachMessage(streamMessage, "新版本已经写入 Canvas。你可以继续要求局部改写、压缩、补材料或只要建议。");
          return;
        }
        throw new Error("stream returned too little text");
      } catch {
        updateCoachMessage(streamMessage, "流式改写暂时不可用，已改用普通改稿。");
      }
    } else {
      let reply = "";
      const streamMessage = addCoachMessage("ai", "正在流式诊断。");
      try {
        await postStream("api/coach-stream", payload, (delta) => {
          reply += delta;
          updateCoachMessage(streamMessage, reply);
        });
        if (reply.trim()) {
          els.essayStatus.textContent = "AI 已给出建议";
          return;
        }
        throw new Error("stream returned empty advice");
      } catch {
        updateCoachMessage(streamMessage, "流式建议暂时不可用，已改用普通回复。");
      }
    }

    const data = await postJson("api/coach", payload);
    applyCoachResult(normalizeCoachResult(data, question, essay, instruction, action, shouldRewrite), shouldRewrite);
  } catch (error) {
    const result = localCoach(question, essay, instruction, action, shouldRewrite);
    result.reply = `线上 AI 暂不可用，先用本地模拟处理。\n\n${result.reply}`;
    applyCoachResult(result, shouldRewrite);
  } finally {
    setBusy(false);
  }
}

function normalizeCoachResult(data, question, essay, instruction, action, shouldRewrite) {
  if (!data || typeof data !== "object") return localCoach(question, essay, instruction, action, shouldRewrite);
  const reply = String(data.reply || data.comment || "").trim();
  const nextEssay = String(data.essay || "").trim();
  const patchSummary = Array.isArray(data.patchSummary) ? data.patchSummary.slice(0, 4).map(String) : [];
  const warnings = Array.isArray(data.warnings) ? data.warnings.slice(0, 3).map(String) : [];
  return {
    reply: reply || "我已经根据你的要求处理了这一版。",
    essay: nextEssay.length > 80 ? nextEssay : "",
    patchSummary,
    warnings
  };
}

function applyCoachResult(result, shouldRewrite) {
  const parts = [
    result.reply,
    result.patchSummary?.length ? `改动：\n${result.patchSummary.map((item) => `- ${item}`).join("\n")}` : "",
    result.warnings?.length ? `提醒：${result.warnings.join("；")}` : ""
  ].filter(Boolean);
  addCoachMessage("ai", parts.join("\n\n"));

  if (shouldRewrite && result.essay) {
    replaceEssay(result.essay, "AI 已生成新版本，可继续追问");
  } else {
    els.essayStatus.textContent = "AI 已给出建议";
  }
}

function localCoach(question, essay, instruction, action, shouldRewrite) {
  if (!essay) {
    const draft = localEssay(question, `${els.promptInput.value}\n${instruction}`, state.mode);
    return {
      reply: "你还没有正文，我先按当前题目和创作目标给一版可改的初稿。",
      essay: `${draft.title}\n\n${draft.essay}`,
      patchSummary: ["从题意出发生成完整初稿", "保留后续可继续改稿空间"],
      warnings: draft.warnings
    };
  }

  if (!shouldRewrite || action === "diagnose" || action === "outline") {
    return {
      reply: localAdvice(question, essay, action),
      essay: "",
      patchSummary: [],
      warnings: []
    };
  }

  return makeLocalRevision(question, essay, action, instruction);
}

function localAdvice(question, essay, action) {
  const len = chineseLength(essay);
  const fit = Math.round(promptFit(essay, question) * 100);
  if (action === "outline") {
    return [
      `更稳的提纲可以这样搭：`,
      `1. 开头：用一句判断直接扣住「${question.title}」，不要绕太远。`,
      `2. 主体一：解释题目关键词「${question.hooks[0]}」，给出个人经验。`,
      `3. 主体二：把个人经验推到社会或时代层面，避免只写自己。`,
      `4. 主体三：补一个反面或边界思考，让文章有分寸。`,
      `5. 结尾：回到青年行动，不喊口号，落在具体选择。`
    ].join("\n");
  }
  return [
    `诊断：当前约 ${len} 字，审题贴合估计 ${fit || "--"}。`,
    len < question.wordMin ? `字数还没到 ${question.wordMin}，真实考场会明显扣分。` : "字数基本够用，接下来重点不是加长，而是提高有效信息密度。",
    fit < 55 ? `题目关键词出现和展开还不够，建议至少围绕「${question.hooks.slice(0, 2).join(" / ")}」各写一层。` : "关键词回应比较明显，可以继续加强材料和段落推进。",
    "最值得改的地方：减少通用句，补一处你自己的场景；每段第一句写成明确判断；结尾回扣题目而不是泛泛升华。"
  ].join("\n");
}

function makeLocalRevision(question, essay, action, instruction) {
  const lines = essay.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const title = lines[0]?.length <= 24 ? lines[0] : question.title;
  const body = lines[0]?.length <= 24 ? lines.slice(1).join("\n\n") : essay;
  const paras = body.split(/\n{2,}/).map((para) => para.trim()).filter(Boolean);
  const seed = hashText(`${essay}:${instruction}:${action}`);
  const detail = detailFor(question, seed);
  let nextParas = paras.length ? [...paras] : localEssay(question, instruction, state.mode).essay.split(/\n{2,}/);
  let nextTitle = title;
  const summary = [];

  if (action === "opening") {
    nextTitle = title.includes(question.title) ? title : polishedTitle(question, seed);
    nextParas[0] = `站在这道题前，我不想先给出漂亮答案，而想先确认一个朴素判断：${question.summary}。真正能打动人的作文，不是把“${question.hooks[0]}”写成标签，而是说明它如何进入一个人的经验，又如何把个人带向更辽阔的时代现场。`;
    summary.push("重写标题和开头，让第一段更快扣题");
  } else if (action === "detail") {
    const insertAt = Math.min(2, nextParas.length);
    nextParas.splice(insertAt, 0, `我想起一个具体时刻。${detail}这个细节并不宏大，却让我看到：题目里的关键词不是抽象概念，它会在一次选择、一次返工、一次重新理解中显出重量。`);
    summary.push("补入个人场景，降低空泛感");
  } else if (action === "humanize") {
    nextParas = nextParas.map((para) => para
      .replace(/当今时代，?/g, "")
      .replace(/毋庸置疑，?/g, "")
      .replace(/综上所述，?/g, "")
      .replace(/砥砺前行/g, "继续往前走")
      .replace(/时代洪流/g, "变化很快的现实"));
    summary.push("删除部分模板腔和口号词");
  } else if (action === "ending") {
    nextParas[nextParas.length - 1] = `所以，面对「${question.title}」，我更愿意把答案写成一种行动：在变化中保持判断，在困难处守住根本，在工具与潮流面前不放弃自己的思考。这样的作文也许不喧哗，却能说明一个青年如何把题目写进真实生活。`;
    summary.push("重写结尾，回扣题目和青年行动");
  } else if (action === "polish") {
    nextParas = nextParas.map((para) => para
      .replace(/我们当然可以/g, "我们可以")
      .replace(/真正有力量的/g, "更有力量的")
      .replace(/不只来自/g, "不只在于")
      .replace(/更成熟的自我说明/g, "更清醒的自我说明"));
    summary.push("做轻量语言润色，减少重复表达");
  } else {
    const draft = localEssay(question, `${els.promptInput.value}\n${instruction}`, state.mode);
    nextTitle = draft.title;
    nextParas = draft.essay.split(/\n{2,}/);
    summary.push("按当前要求整篇重写");
  }

  return {
    reply: "我按你的要求处理了一版。建议你重点看开头是否更扣题、材料是否更像自己的经验，再继续追问局部段落。",
    essay: `${nextTitle}\n\n${nextParas.join("\n\n")}`,
    patchSummary: summary,
    warnings: ["本地模拟改稿，真实 LLM 后端连接后会更细致"]
  };
}

function polishedTitle(question, seed) {
  const titles = {
    "national-i": ["词语变了，我也在长大", "在一个词里看见新的自己"],
    "national-ii": ["守住源头，终见通途", "不失其本，方能复明"],
    "beijing-plan": ["做规划与下功夫", "规划在前，功夫在身"],
    "beijing-huaju": ["含英咀华", "慢慢读懂的芬芳"],
    "tianjin-tiao": ["调出生命的亮色", "顺势而调，主动而创"],
    "shanghai-tech": ["想象，不应只交给科技", "科技重塑想象之后"]
  };
  const pool = titles[question.id] || [question.title];
  return pool[seed % pool.length];
}

async function gradeEssay() {
  const question = selectedQuestion();
  const essay = els.essayInput.value.trim();
  if (essay.length < 80) {
    els.essayStatus.textContent = "正文太短，考官拒收";
    return;
  }

  setBusy(true, "考官正在按 60 分制严格扣分");

  if (state.aiMode !== "online") {
    const result = localGrade(question, essay);
    applyResult(result);
    setBusy(false);
    updateMetrics();
    return;
  }

  try {
    const data = await postJson("api/grade", {
      question: buildQuestionPayload(),
      essay,
      alias: alias(),
      prompt: els.promptInput.value.trim()
    });
    const result = normalizeGradeResult(data, question, essay);
    applyResult(result);
  } catch {
    const result = localGrade(question, essay);
    applyResult(result);
  } finally {
    setBusy(false);
    updateMetrics();
  }
}

function normalizeGradeResult(data, question, essay) {
  if (!data || typeof data !== "object") return localGrade(question, essay);
  const content = clamp(Number(data.content ?? data.scores?.content ?? 0), 0, 20);
  const expression = clamp(Number(data.expression ?? data.scores?.expression ?? 0), 0, 20);
  const development = clamp(Number(data.development ?? data.scores?.development ?? 0), 0, 20);
  const total = clamp(Math.round(Number(data.total ?? content + expression + development)), 0, 60);
  const fallback = localGrade(question, essay);
  return {
    total: total || fallback.total,
    content: content || fallback.content,
    expression: expression || fallback.expression,
    development: development || fallback.development,
    title: String(data.gradeBand || data.title || fallback.title),
    comment: String(data.comment || data.comments?.summary || fallback.comment),
    flags: arrayOr(data.redFlags || data.flags, fallback.flags).slice(0, 5),
    suggestions: arrayOr(data.suggestions, fallback.suggestions).slice(0, 4),
    viralLabel: String(data.viralLabel || fallback.viralLabel)
  };
}

function arrayOr(value, fallback) {
  if (Array.isArray(value) && value.length) return value.map(String);
  return fallback;
}

function localGrade(question, essay) {
  const len = chineseLength(essay);
  const hasTitle = essay.split("\n").find((line) => line.trim().length > 0)?.trim().length <= 18;
  const paragraphs = essay.split(/\n{2,}/).filter((p) => p.trim().length > 20).length;
  const fit = promptFit(essay, question);
  const cliche = clicheCount(essay);
  const modeBonus = state.mode === "sharp" ? 1 : 0;
  const detailBonus = /我|一次|那天|老师|同学|外婆|课堂|实验|项目|志愿/.test(essay) ? 2 : 0;

  let content = 11 + Math.round(fit * 7) + detailBonus;
  let expression = 12 + Math.min(4, paragraphs) + (hasTitle ? 1 : -1) - Math.min(4, cliche);
  let development = 10 + Math.round(fit * 4) + detailBonus + modeBonus - Math.min(3, cliche);

  if (len < question.wordMin * 0.72) {
    content -= 4;
    expression -= 3;
    development -= 3;
  } else if (len < question.wordMin) {
    content -= 2;
    expression -= 1;
  } else if (len > question.wordMin * 1.35) {
    expression -= 1;
  }

  if (question.genre === "议论文" && /我记得|那天|细节|故事/.test(essay) && !/论证|论点|因此|由此/.test(essay)) {
    content -= 2;
  }
  if (question.genre === "记叙文" && /首先|其次|再次|综上|论点/.test(essay)) {
    content -= 3;
    expression -= 2;
  }

  content = clamp(content, 6, 19);
  expression = clamp(expression, 6, 19);
  development = clamp(development, 5, 18);
  const total = clamp(Math.round(content + expression + development), 18, 58);
  const flags = [];
  if (len < question.wordMin) flags.push(`字数不足：${len}/${question.wordMin}`);
  if (fit < .48) flags.push("审题贴合偏弱");
  if (cliche >= 3) flags.push("套话浓度偏高");
  if (!hasTitle) flags.push("标题不够清楚");
  if (paragraphs < 4) flags.push("结构层次不足");
  if (!flags.length) flags.push("无致命扣分点");

  const band = total >= 55 ? "一类上：考官愿意多看两眼"
    : total >= 50 ? "一类下：稳，但还不够惊艳"
      : total >= 44 ? "二类中：能过线，少点锋芒"
        : total >= 36 ? "三类卷：题没丢，但表达发虚"
          : "危险卷：建议回炉重写";

  const comment = total >= 52
    ? "审题意识较强，结构完整，有一定思辨或细节支撑。若再压缩泛泛表述，补一处更鲜活的材料，分数还有上探空间。"
    : total >= 44
      ? "基本扣住题意，表达顺畅，但材料与观点之间的黏合度不够，部分段落像通用作文模板，需要更具体的经验和更清晰的论证。"
      : "能看出想回应题目，但中心不够集中，考场痕迹较重。建议先重做提纲：题意关键词、核心判断、两个材料、一个反思，缺一项都容易被扣。";

  return {
    total,
    content,
    expression,
    development,
    title: band,
    comment,
    flags,
    suggestions: suggestionFor(question, flags),
    viralLabel: total >= 55 ? "同题榜一候选" : total >= 50 ? "作文安全带" : total >= 44 ? "压线美学家" : "重写挑战者"
  };
}

function promptFit(essay, question) {
  const text = `${essay}${els.promptInput.value}`.toLowerCase();
  const hits = question.hooks.reduce((sum, key) => sum + (text.includes(key.toLowerCase()) ? 1 : 0), 0);
  const titleHit = question.title.split(/[，、与：: ]/).some((part) => part && text.includes(part.toLowerCase())) ? 1 : 0;
  return clamp((hits + titleHit) / Math.max(3, question.hooks.length), 0, 1);
}

function clicheCount(text) {
  const cliches = ["当今时代", "毋庸置疑", "众所周知", "综上所述", "时代洪流", "砥砺前行", "不忘初心", "大有可为", "青年一代"];
  return cliches.reduce((sum, item) => sum + (text.includes(item) ? 1 : 0), 0);
}

function suggestionFor(question, flags) {
  const base = [
    `开头第一段直接点出“${question.hooks[0]}”与题意关系`,
    "每个主体段只讲一个判断，后接一个具体材料",
    "结尾回扣题目，不要只喊口号"
  ];
  if (flags.some((flag) => flag.includes("字数"))) base.unshift("先补足有效字数，别用重复句凑数");
  if (question.genre === "记叙文") base.unshift("增加场景、动作、心理变化，少用抽象议论");
  if (question.genre === "议论文") base.unshift("明确中心论点，并区分规划、行动、结果三层");
  return base.slice(0, 4);
}

function applyResult(result) {
  state.lastResult = result;
  els.scoreValue.textContent = result.total;
  els.deskScore.textContent = result.total;
  els.scoreStamp.textContent = `${result.total} 分`;
  els.totalScore.textContent = result.total;
  els.resultTitle.textContent = result.title;
  els.judgeComment.textContent = result.comment;
  setRubric("content", result.content);
  setRubric("expression", result.expression);
  setRubric("development", result.development);
  els.redFlags.innerHTML = result.flags.map((flag) => `<span>${flag}</span>`).join("");
  els.essayStatus.textContent = `阅卷完成：${result.viralLabel}`;
  addLeaderboard(result);
  renderLeaderboard();
  prepareShare(result);
  drawPoster();
  toggleShareButtons(true);
}

function setRubric(name, score) {
  const bar = els[`${name}Bar`];
  const label = els[`${name}Score`];
  bar.style.width = `${clamp(score / 20 * 100, 0, 100)}%`;
  label.textContent = `${score}/20`;
}

function updateMetrics() {
  const question = selectedQuestion();
  const essay = els.essayInput.value;
  const len = chineseLength(essay);
  const wordPct = clamp(len / question.wordMin * 100, 0, 112);
  const fit = Math.round(promptFit(essay, question) * 100);
  const risk = riskScore(essay, question, len, fit);

  els.wordValue.textContent = `${len} / ${question.wordMin}`;
  els.wordBar.style.width = `${Math.min(100, wordPct)}%`;
  els.fitValue.textContent = fit || "--";
  els.fitBar.style.width = `${fit}%`;
  els.riskValue.textContent = risk.label;
  els.riskBar.style.width = `${risk.value}%`;
  if (els.canvasWordValue) els.canvasWordValue.textContent = `${len} / ${question.wordMin}`;
  if (els.canvasFitValue) els.canvasFitValue.textContent = fit || "--";
  if (els.canvasRiskValue) els.canvasRiskValue.textContent = risk.label;

  if (!state.lastResult) {
    els.scoreStamp.textContent = len ? "待阅卷" : "未交卷";
  }
}

function riskScore(essay, question, len, fit) {
  if (!essay.trim()) return { value: 0, label: "--" };
  let value = 18;
  if (len < question.wordMin) value += 26;
  if (len < question.wordMin * .72) value += 22;
  if (fit < 45) value += 26;
  value += Math.min(24, clicheCount(essay) * 8);
  value = clamp(value, 0, 100);
  return {
    value,
    label: value >= 70 ? "高" : value >= 42 ? "中" : "低"
  };
}

function alias() {
  const value = els.aliasInput.value.trim().replace(/[^\u4e00-\u9fa5A-Za-z0-9_-]/g, "");
  return value || "作文勇士";
}

function boardKey() {
  return "gaokao-essay-simulator-board-v1";
}

function getLocalBoard() {
  try {
    const data = JSON.parse(localStorage.getItem(boardKey()) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveLocalBoard(items) {
  localStorage.setItem(boardKey(), JSON.stringify(items.slice(0, 30)));
}

function addLeaderboard(result) {
  const question = selectedQuestion();
  const items = getLocalBoard();
  items.push({
    alias: alias(),
    score: result.total,
    question: question.paper,
    title: question.title,
    label: result.viralLabel,
    time: todayText()
  });
  saveLocalBoard(items);
}

function renderLeaderboard() {
  const board = [...getLocalBoard(), ...SEEDED_BOARD]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  els.leaderboardList.innerHTML = board.map((item, index) => `
    <li>
      <span class="rank-num">${index + 1}</span>
      <span class="rank-main">
        <strong>${item.alias} · ${item.label}</strong>
        <span>${item.question} ${item.title ? `· ${item.title}` : ""} · ${item.time}</span>
      </span>
      <span class="rank-score">${item.score}</span>
    </li>
  `).join("");
}

function prepareShare(result) {
  const question = selectedQuestion();
  const code = challengeCode(question, result);
  const suggestions = result.suggestions?.length ? `改分建议：${result.suggestions[0]}` : "";
  state.shareText = `我在《高考语文模拟器》选了${question.paper}「${question.title}」，AI 帮写后被严格考官打了 ${result.total}/60。评语：${result.viralLabel}。${suggestions} 同题挑战码：${code}`;
  els.shareTitle.textContent = `${alias()} 拿到 ${result.total}/60`;
  els.shareText.textContent = state.shareText;
}

function challengeCode(question, result) {
  return `${question.id.toUpperCase().replace(/-/g, "")}-${result.total}-${hashText(alias() + question.id + result.total).toString(36).slice(0, 4).toUpperCase()}`;
}

function toggleShareButtons(enabled) {
  [els.copyShareBtn, els.posterBtn, els.downloadBtn, els.systemShareBtn].forEach((button) => {
    button.disabled = !enabled;
  });
}

async function copyShareText() {
  if (!state.shareText) return;
  try {
    await navigator.clipboard.writeText(state.shareText);
    els.essayStatus.textContent = "挑战文案已复制";
  } catch {
    els.essayStatus.textContent = state.shareText;
  }
}

function drawPoster() {
  const canvas = els.posterCanvas;
  const ctx = canvas.getContext("2d");
  const question = selectedQuestion();
  const result = state.lastResult || { total: "--", title: "未交卷", comment: "写完作文后生成战报。", viralLabel: "待挑战", flags: [] };
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f4f6f8";
  ctx.fillRect(0, 0, width, height);
  drawGrid(ctx, width, height);

  ctx.fillStyle = "#111827";
  ctx.fillRect(52, 52, width - 104, 8);
  ctx.fillRect(52, height - 60, width - 104, 8);

  ctx.fillStyle = "#155ac7";
  ctx.font = "900 30px sans-serif";
  ctx.fillText("2026 ESSAY CHALLENGE", 72, 120);

  ctx.fillStyle = "#111827";
  ctx.font = "900 68px sans-serif";
  wrapCanvasText(ctx, "高考语文模拟器", 72, 205, 760, 78);

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 72, 290, 756, 680, 16, true);
  ctx.strokeStyle = "#d7dee8";
  ctx.lineWidth = 3;
  roundRect(ctx, 72, 290, 756, 680, 16, false);

  ctx.fillStyle = "#647084";
  ctx.font = "800 28px sans-serif";
  ctx.fillText(`${question.paper} · ${question.genre}`, 106, 356);

  ctx.fillStyle = "#111827";
  ctx.font = "900 48px sans-serif";
  wrapCanvasText(ctx, question.title, 106, 430, 690, 58);

  ctx.fillStyle = "#cf2f24";
  ctx.font = "900 150px sans-serif";
  ctx.fillText(String(result.total), 106, 615);
  ctx.font = "900 36px sans-serif";
  ctx.fillText("/ 60", 310, 610);

  ctx.strokeStyle = "#cf2f24";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(650, 560, 95, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = "900 38px sans-serif";
  ctx.fillText(result.viralLabel || "同题挑战", 548, 572);

  ctx.fillStyle = "#111827";
  ctx.font = "900 34px sans-serif";
  wrapCanvasText(ctx, result.title || "严格阅卷", 106, 705, 680, 42);

  ctx.fillStyle = "#394457";
  ctx.font = "500 27px sans-serif";
  wrapCanvasText(ctx, result.comment || "", 106, 790, 680, 40);

  ctx.fillStyle = "#fff1c8";
  roundRect(ctx, 72, 1012, 756, 190, 16, true);
  ctx.fillStyle = "#815006";
  ctx.font = "900 30px sans-serif";
  ctx.fillText(`同题挑战码 ${state.lastResult ? challengeCode(question, result) : "WAITING"}`, 104, 1082);
  ctx.font = "500 26px sans-serif";
  wrapCanvasText(ctx, "复制战报发到群里，让朋友用同一道题挑战你的分数。", 104, 1138, 690, 38);

  ctx.fillStyle = "#111827";
  ctx.font = "900 26px sans-serif";
  ctx.fillText(`考生代号：${alias()} · ${todayText()}`, 72, 1288);
}

function drawGrid(ctx, width, height) {
  ctx.strokeStyle = "rgba(17, 24, 39, .08)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 34) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function roundRect(ctx, x, y, width, height, radius, fill) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  if (fill) ctx.fill();
  else ctx.stroke();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = String(text).split("");
  let line = "";
  let cursorY = y;
  chars.forEach((char) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = char;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  });
  if (line) ctx.fillText(line, x, cursorY);
}

function openPoster() {
  drawPoster();
  if (typeof els.posterDialog.showModal === "function") {
    els.posterDialog.showModal();
  }
}

function downloadPoster() {
  drawPoster();
  const link = document.createElement("a");
  link.download = `gaokao-essay-${Date.now()}.png`;
  link.href = els.posterCanvas.toDataURL("image/png");
  link.click();
}

async function systemShare() {
  if (!state.shareText) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: "高考语文模拟器", text: state.shareText, url: location.href });
    } catch {
      await copyShareText();
    }
  } else {
    await copyShareText();
  }
}

function setupVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    els.voiceBtn.textContent = "不支持语音";
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.interimResults = true;
  recognition.continuous = false;
  state.recognition = recognition;

  let baseText = "";
  recognition.onstart = () => {
    baseText = els.promptInput.value.trim();
    els.voiceBtn.textContent = "正在听";
    els.essayStatus.textContent = "正在语音输入 prompt";
  };
  recognition.onresult = (event) => {
    const text = [...event.results].map((result) => result[0].transcript).join("");
    els.promptInput.value = baseText ? `${baseText}\n${text}` : text;
    updateMetrics();
  };
  recognition.onerror = () => {
    els.voiceBtn.textContent = "语音输入";
    els.essayStatus.textContent = "语音识别失败，可直接打字";
  };
  recognition.onend = () => {
    els.voiceBtn.textContent = "语音输入";
  };
}

function bindEvents() {
  els.randomQuestionBtn.addEventListener("click", () => {
    const next = QUESTIONS[hashText(String(Date.now())) % QUESTIONS.length];
    selectQuestion(next.id);
  });
  els.cleanPromptBtn.addEventListener("click", () => {
    els.promptInput.value = "";
    els.promptInput.focus();
    updateMetrics();
  });
  els.generateBtn.addEventListener("click", generateEssay);
  els.gradeBtn.addEventListener("click", gradeEssay);
  els.undoDraftBtn.addEventListener("click", undoDraft);
  els.essayInput.addEventListener("input", () => {
    state.lastResult = null;
    toggleShareButtons(false);
    updateMetrics();
  });
  els.promptInput.addEventListener("input", updateMetrics);
  els.aliasInput.addEventListener("input", () => {
    if (state.lastResult) prepareShare(state.lastResult);
    drawPoster();
  });
  $$(".mode-tab").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".mode-tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.mode = button.dataset.mode;
      els.essayStatus.textContent = `写作模式：${button.textContent}`;
    });
  });
  els.copyShareBtn.addEventListener("click", copyShareText);
  els.dialogCopyBtn.addEventListener("click", copyShareText);
  els.posterBtn.addEventListener("click", openPoster);
  els.downloadBtn.addEventListener("click", downloadPoster);
  els.dialogDownloadBtn.addEventListener("click", downloadPoster);
  els.systemShareBtn.addEventListener("click", systemShare);
  els.coachActions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const shouldRewrite = !["diagnose", "outline"].includes(action);
    runCoach(action, "", shouldRewrite);
  });
  els.coachSendBtn.addEventListener("click", () => {
    const instruction = els.coachInput.value.trim();
    runCoach("custom", instruction, true);
    els.coachInput.value = "";
  });
  els.coachAdviceBtn.addEventListener("click", () => {
    const instruction = els.coachInput.value.trim() || "请只给我下一步修改建议，不要直接改全文。";
    runCoach("diagnose", instruction, false);
    els.coachInput.value = "";
  });
  els.clearCoachBtn.addEventListener("click", () => {
    state.coachMessages = [];
    renderCoachFeed();
    els.essayStatus.textContent = "对话已清空";
  });
  els.resetBoardBtn.addEventListener("click", () => {
    localStorage.removeItem(boardKey());
    renderLeaderboard();
    els.essayStatus.textContent = "本机榜已清空";
  });
  els.voiceBtn.addEventListener("click", () => {
    if (state.recognition) state.recognition.start();
  });
}

function init() {
  renderQuestions();
  renderChips();
  selectQuestion(state.selectedId);
  renderLeaderboard();
  renderCoachFeed();
  setupVoice();
  bindEvents();
  updateMetrics();
  drawPoster();
  checkAiHealth();
}

init();
