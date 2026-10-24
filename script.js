"use strict";

const $ = id => document.getElementById(id);

const captionDatabase = {
  attitude: {
    thunglish: [
      "En route, en rules.",
      "Naan silent ah irundhaalum, en level vera.",
      "En vazhi thani vazhi."
    ],
    tamil: [
      "என் வழி தனி வழி.",
      "அமைதியே என் பலம்.",
      "என் பயணம் என் விதிகள்."
    ],
    english: [
      "My journey, my rules.",
      "Quiet confidence. Unmatched focus.",
      "I define my own path."
    ],
    mixed: [
      "Silent mode. Mass attitude.",
      "Own path. என் விதிகள்.",
      "Less talk, more action."
    ]
  },
  love: {
    thunglish: [
      "Un smile dhaan en favourite scene.",
      "Un kooda irundha podhum.",
      "Every moment, un nyabagam."
    ],
    tamil: [
      "உன் சிரிப்பே எனக்குப் பிடித்த காட்சி.",
      "உன்னுடன் இருந்தால் போதும்.",
      "ஒவ்வொரு நொடியும் உன் நினைவு."
    ],
    english: [
      "You make ordinary moments special.",
      "My favourite place is beside you.",
      "Some people feel like home."
    ],
    mixed: [
      "My favourite person, என் உலகம்.",
      "One smile. ஆயிரம் நினைவுகள்.",
      "You and me, ஒரு அழகான கதை."
    ]
  },
  sad: {
    thunglish: [
      "Sirippukku pinnadi sila kadhaigal.",
      "Sila memories marakka mudiyadhu.",
      "Manasu solladha vaarthaigal."
    ],
    tamil: [
      "சிரிப்புக்குப் பின்னால் சில கதைகள்.",
      "சில நினைவுகளை மறக்க முடியாது.",
      "மனசு சொல்லாத வார்த்தைகள்."
    ],
    english: [
      "Some feelings have no words.",
      "Not every story gets an ending.",
      "Healing takes its own time."
    ],
    mixed: [
      "Silent heart, ஆயிரம் கதைகள்.",
      "Memories remain, காலம் நகரும்.",
      "Some chapters, மறக்க முடியாது."
    ]
  },
  friendship: {
    thunglish: [
      "Friends illa, family.",
      "Namma memories always special.",
      "Kadaisi varaikkum gang."
    ],
    tamil: [
      "நண்பர்கள் அல்ல, குடும்பம்.",
      "நம் நினைவுகள் என்றும் அழகு.",
      "நட்பு என்றும் தொடரும்."
    ],
    english: [
      "Good friends, great memories.",
      "Different people, one team.",
      "Real friendship never goes out of style."
    ],
    mixed: [
      "Forever gang, என்றும் நட்பு.",
      "Good vibes, நம்ம gang.",
      "One team. ஆயிரம் memories."
    ]
  },
  mass: {
    thunglish: [
      "Entry simple, impact massive.",
      "Scene namma pakkam.",
      "Vibe eh vera level."
    ],
    tamil: [
      "வருகை எளிமை, தாக்கம் பெரிது.",
      "காட்சி நம் பக்கம்.",
      "தனி அடையாளம், தனி பயணம்."
    ],
    english: [
      "Make the moment count.",
      "Confidence speaks for itself.",
      "Create your own highlight."
    ],
    mixed: [
      "Mass entry, தனி style.",
      "Own the moment, உன் வழியில்.",
      "Big energy, பெரிய கனவு."
    ]
  },
  gaming: {
    thunglish: [
      "Game on, focus strong.",
      "Practice dhaan real power.",
      "One match, one mission."
    ],
    tamil: [
      "பயிற்சியே உண்மையான பலம்.",
      "ஒவ்வொரு ஆட்டமும் ஒரு பாடம்.",
      "கவனம் தான் வெற்றியின் தொடக்கம்."
    ],
    english: [
      "Play smart. Learn every round.",
      "Focus on the next move.",
      "Every match is a new challenge."
    ],
    mixed: [
      "Game mode, full focus.",
      "Practice daily, வெற்றி வரும்.",
      "Next round, புதிய வாய்ப்பு."
    ]
  },
  motivation: {
    thunglish: [
      "Slow ah ponaalum stop aagadha.",
      "Daily konjam better.",
      "Dream ku work pannu."
    ],
    tamil: [
      "மெதுவாகச் சென்றாலும் நிற்காதே.",
      "தினமும் கொஞ்சம் முன்னேறு.",
      "கனவுகளுக்காக உழை."
    ],
    english: [
      "Progress matters more than perfection.",
      "Keep learning. Keep moving.",
      "Small steps create big change."
    ],
    mixed: [
      "Keep going, நம்பிக்கையுடன்.",
      "Small steps, பெரிய மாற்றம்.",
      "Dream big, தினமும் முயற்சி செய்."
    ]
  },
  funny: {
    thunglish: [
      "Plan perusa, execution nalaikku.",
      "Enakku advice venam, snacks podhum.",
      "Battery low, attitude high."
    ],
    tamil: [
      "திட்டம் பெரியது, செயல் நாளைக்கு.",
      "அறிவுரை வேண்டாம், சிற்றுண்டி போதும்.",
      "பேட்டரி குறைவு, உற்சாகம் அதிகம்."
    ],
    english: [
      "Professional at postponing plans.",
      "Loading motivation... please wait.",
      "Too busy doing absolutely nothing."
    ],
    mixed: [
      "Battery low, energy எங்கே?",
      "Plan ready, தூக்கம் pending.",
      "No stress, சாப்பாடு first."
    ]
  },
  life: {
    thunglish: [
      "Life ah enjoy pannu.",
      "Ellam oru experience dhaan.",
      "Namma time varum."
    ],
    tamil: [
      "வாழ்க்கையை ரசித்து வாழ்.",
      "ஒவ்வொன்றும் ஒரு அனுபவம்.",
      "நம் நேரம் வரும்."
    ],
    english: [
      "Enjoy the little things.",
      "Every day is a new page.",
      "Let life unfold at its own pace."
    ],
    mixed: [
      "Trust the process, நம்பிக்கையுடன்.",
      "One life, நிறைய கதைகள்.",
      "New day, புதிய வாய்ப்பு."
    ]
  },
  travel: {
    thunglish: [
      "Route pudhusu, memories pudhusu.",
      "Travel mode on.",
      "Oru trip, neraya stories."
    ],
    tamil: [
      "புதிய பாதை, புதிய நினைவுகள்.",
      "பயணமே ஒரு பாடம்.",
      "ஒவ்வொரு இடமும் ஒரு கதை."
    ],
    english: [
      "Collect moments, not just places.",
      "Take the scenic route.",
      "New places, fresh perspectives."
    ],
    mixed: [
      "Travel more, உலகம் பெரிது.",
      "New roads, புதிய நினைவுகள்.",
      "Adventure starts here."
    ]
  },
  gym: {
    thunglish: [
      "Consistency dhaan key.",
      "Daily effort, better progress.",
      "Strong mind, steady work."
    ],
    tamil: [
      "தொடர்ச்சியான முயற்சியே முக்கியம்.",
      "தினமும் முயற்சி செய்.",
      "மன உறுதி முன்னேற்றத்தைத் தரும்."
    ],
    english: [
      "Progress comes from consistency.",
      "Show up and do your best.",
      "Build habits that support your goals."
    ],
    mixed: [
      "Stay consistent, முன்னேற்றம் வரும்.",
      "Strong mindset, தினமும் முயற்சி.",
      "One step stronger."
    ]
  },
  edit: {
    thunglish: [
      "Frames la feel irukkanum.",
      "Every cut has a story.",
      "Colour grade, create a vibe."
    ],
    tamil: [
      "ஒவ்வொரு காட்சிக்கும் ஒரு உணர்வு.",
      "ஒவ்வொரு வெட்டிலும் ஒரு கதை.",
      "நிறங்களால் உணர்வை உருவாக்கு."
    ],
    english: [
      "Every frame tells a story.",
      "Cut with purpose. Create with feeling.",
      "Turn moments into memories."
    ],
    mixed: [
      "One frame, ஆயிரம் feelings.",
      "Edit with passion, create with purpose.",
      "Visual story, தனி vibe."
    ]
  }
};

const templateData = [
  {name:"Cinematic", category:"cinematic", cls:"cinematic", sample:"YOUR STORY"},
  {name:"Neon Glow", category:"neon", cls:"neon", sample:"NIGHT VIBES"},
  {name:"Minimal", category:"minimal", cls:"minimal", sample:"LESS IS MORE"},
  {name:"Bold Title", category:"cinematic", cls:"bold", sample:"NO LIMITS"},
  {name:"Pink Glow", category:"neon", cls:"pink", sample:"DREAM BIG"},
  {name:"Clean White", category:"minimal", cls:"clean", sample:"NEW CHAPTER"},
  {name:"Social Pop", category:"social", cls:"social", sample:"GOOD VIBES"},
  {name:"Golden Title", category:"cinematic", cls:"gold", sample:"THE MOMENT"},
  {name:"Blue Neon", category:"neon", cls:"blue", sample:"NEXT LEVEL"},
  {name:"Simple Subtitle", category:"minimal", cls:"subtitle", sample:"A LITTLE STORY"},
  {name:"Creator Style", category:"social", cls:"creator", sample:"MADE TO CREATE"},
  {name:"Night Edit", category:"neon", cls:"night", sample:"AFTER DARK"}
];

let savedCaptions = loadSaved();
let videoCaptions = [];
let videoURL = "";
let exportBusy = false;

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem("eca-saved") || "[]");
  } catch {
    return [];
  }
}

function storeSaved() {
  localStorage.setItem("eca-saved", JSON.stringify(savedCaptions));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[char]));
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

function switchTab(tab) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === tab);
  });

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
}

function renderCaptionResults() {
  const category = $("category").value;
  const language = $("language").value;
  const keyword = $("keywords").value.trim();
  const base = captionDatabase[category]?.[language] || [];
  const results = keyword
    ? base.map(text => `${text} ${keyword}`)
    : [...base];

  $("resultCount").textContent = `${results.length} captions`;

  $("captionResults").innerHTML = results.map((caption, index) => `
    <article class="card">
      <p>${escapeHTML(caption)}</p>
      <div class="button-row">
        <button type="button" data-copy="${index}">Copy</button>
        <button type="button" data-save="${index}">Save</button>
        <button type="button" data-use="${index}">Use in video</button>
      </div>
    </article>
  `).join("");

  $("captionResults").querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", () => {
      copyText(results[Number(button.dataset.copy)]);
    });
  });

  $("captionResults").querySelectorAll("[data-save]").forEach(button => {
    button.addEventListener("click", () => {
      const text = results[Number(button.dataset.save)];
      if (!savedCaptions.includes(text)) savedCaptions.unshift(text);
      storeSaved();
      renderSaved();
      button.textContent = "Saved";
    });
  });

  $("captionResults").querySelectorAll("[data-use]").forEach(button => {
    button.addEventListener("click", () => {
      $("manualText").value = results[Number(button.dataset.use)];
      updateVideoCaption();
      switchTab("video");
    });
  });
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied!");
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();

  try {
    document.execCommand("copy");
    alert("Copied!");
  } catch {
    alert("Copy failed. Please select and copy the text manually.");
  }

  area.remove();
}

function renderTemplates() {
  const category = $("templateCategory").value;
  const search = $("templateSearch").value.toLowerCase();

  const list = templateData.filter(item =>
    (category === "all" || item.category === category) &&
    item.name.toLowerCase().includes(search)
  );

  $("templateResults").innerHTML = list.map(item => `
    <article class="card">
      <div class="font-preview ${item.cls}">${escapeHTML(item.sample)}</div>
      <h3>${escapeHTML(item.name)}</h3>
      <button type="button" data-template="${escapeHTML(item.sample)}">
        Use template
      </button>
    </article>
  `).join("");

  $("templateResults").querySelectorAll("[data-template]").forEach(button => {
    button.addEventListener("click", () => {
      $("manualText").value = button.dataset.template;
      updateVideoCaption();
      switchTab("video");
    });
  });
}

function renderSaved() {
  $("savedResults").innerHTML = savedCaptions.map((text, index) => `
    <article class="card">
      <p>${escapeHTML(text)}</p>
      <button type="button" data-saved-use="${index}">Use in video</button>
      <button type="button" data-saved-copy="${index}">Copy</button>
    </article>
  `).join("") || "<p>No saved captions yet.</p>";

  $("savedResults").querySelectorAll("[data-saved-use]").forEach(button => {
    button.addEventListener("click", () => {
      $("manualText").value = savedCaptions[Number(button.dataset.savedUse)];
      updateVideoCaption();
      switchTab("video");
    });
  });

  $("savedResults").querySelectorAll("[data-saved-copy]").forEach(button => {
    button.addEventListener("click", () => {
      copyText(savedCaptions[Number(button.dataset.savedCopy)]);
    });
  });
}

function updateFontPreview() {
  const preview = $("fontPreview");
  preview.textContent = $("fontInput").value;
  preview.style.fontFamily = $("fontFamily").value;
  preview.style.fontWeight = $("fontWeight").value;
  preview.style.color = $("fontColor").value;
  preview.style.background = $("fontBg").value;
  preview.style.fontSize = `${$("fontSize").value}px`;
  preview.style.letterSpacing = `${$("letterSpacing").value}px`;

  $("fontSizeLabel").textContent = `${$("fontSize").value}px`;
  $("spacingLabel").textContent = `${$("letterSpacing").value}px`;
}

function updateVideoCaption() {
  const caption = $("videoCaption");
  caption.textContent = $("manualText").value;
  caption.style.fontFamily = $("captionFont").value;
  caption.style.color = $("captionColor").value;
  caption.style.fontSize = `${$("captionSize").value}px`;

  const outline = Number($("outlineWidth").value);
  caption.style.webkitTextStroke =
    `${outline}px ${$("outlineColor").value}`;

  caption.style.textShadow = $("captionShadow").value === "on"
    ? "2px 2px 3px #000"
    : "none";

  caption.style.background = $("captionLayout").value === "boxed"
    ? "rgba(0,0,0,.65)"
    : "transparent";

  if ($("captionLayout").value === "highlight") {
    caption.style.background = $("highlightColor").value;
    caption.style.color = "#111";
  }

  caption.style.padding = $("captionLayout").value === "normal"
    ? "0"
    : "8px";

  caption.style.top = "auto";
  caption.style.bottom = "auto";

  const position = $("captionPosition").value;

  if (position === "top") caption.style.top = "8%";
  else if (position === "middle") caption.style.top = "45%";
  else caption.style.bottom = "8%";
}

function renderVideoCaptionList() {
  $("timelineCount").textContent =
    `${videoCaptions.length} caption${videoCaptions.length === 1 ? "" : "s"}`;

  $("videoCaptionList").innerHTML = videoCaptions.map((item, index) => `
    <div class="caption-row">
      <strong>${escapeHTML(item.text)}</strong>
      <p>${item.start.toFixed(2)}s – ${item.end.toFixed(2)}s</p>
      <button type="button" data-remove-caption="${index}">Remove</button>
    </div>
  `).join("") || "<p>No captions added yet.</p>";

  $("videoCaptionList").querySelectorAll("[data-remove-caption]").forEach(button => {
    button.addEventListener("click", () => {
      videoCaptions.splice(Number(button.dataset.removeCaption), 1);
      renderVideoCaptionList();
      updateVideoCaption();
    });
  });
}

function getActiveCaption(time) {
  return videoCaptions.find(item => time >= item.start && time <= item.end);
}

function updateTimedCaption() {
  if (!$("videoPlayer").src) return;

  const active = getActiveCaption($("videoPlayer").currentTime);

  $("videoCaption").textContent = active ? active.text : $("manualText").value;

  $("videoTime").textContent =
    `${$("videoPlayer").currentTime.toFixed(1)}s`;

  updateVideoCaption();
}

function formatSrtTime(seconds) {
  const totalMs = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const secs = Math.floor((totalMs % 60000) / 1000);
  const ms = totalMs % 1000;

  return `${String(hours).padStart(2,"0")}:` +
    `${String(minutes).padStart(2,"0")}:` +
    `${String(secs).padStart(2,"0")},` +
    `${String(ms).padStart(3,"0")}`;
}

function downloadSRT() {
  if (!videoCaptions.length) {
    alert("Add at least one caption first.");
    return;
  }

  const sorted = [...videoCaptions].sort((a,b) => a.start - b.start);

  const srt = sorted.map((item, index) =>
    `${index + 1}\n${formatSrtTime(item.start)} --> ` +
    `${formatSrtTime(item.end)}\n${item.text}\n`
  ).join("\n");

  downloadBlob(
    new Blob([srt], {type:"text/plain;charset=utf-8"}),
    "captions.srt"
  );
}

function chooseRecorderType() {
  const types = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm"
  ];

  return types.find(type =>
    window.MediaRecorder &&
    MediaRecorder.isTypeSupported(type)
  ) || "";
}

async function exportVideo() {
  if (exportBusy) return;

  const video = $("videoPlayer");

  if (!video.src || !video.videoWidth) {
    alert("Please upload a video and wait for its preview to load.");
    return;
  }

  if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) {
    alert("Video export is not supported by this browser. Try a recent desktop Chrome browser.");
    return;
  }

  const mimeType = chooseRecorderType();

  if (!mimeType) {
    alert("This browser does not support a compatible WebM recording format.");
    return;
  }

  exportBusy = true;
  $("exportVideo").disabled = true;
  $("videoStatus").textContent = "Preparing export…";

  const canvas = document.createElement("canvas");
  const maxWidth = 1080;
  const scale = Math.min(1, maxWidth / video.videoWidth);

  canvas.width = Math.max(2, Math.floor(video.videoWidth * scale));
  canvas.height = Math.max(2, Math.floor(video.videoHeight * scale));

  const ctx = canvas.getContext("2d");
  const canvasStream = canvas.captureStream(30);

  let mediaStream = canvasStream;
  let originalAudioTracks = [];
  let originalPlaying = !video.paused;
  let startTime = video.currentTime;
  let chunks = [];
  let recorder;

  try {
    const capture = video.captureStream || video.mozCaptureStream;

    if (typeof capture === "function") {
      try {
        const sourceStream = capture.call(video);
        originalAudioTracks = sourceStream.getAudioTracks();
        if (originalAudioTracks.length) {
          mediaStream = new MediaStream([
            ...canvasStream.getVideoTracks(),
            ...originalAudioTracks
          ]);
        }
      } catch (error) {
        console.warn("Original audio capture unavailable", error);
      }
    }

    recorder = new MediaRecorder(mediaStream, {mimeType});

    const finished = new Promise((resolve, reject) => {
      recorder.ondataavailable = event => {
        if (event.data && event.data.size) chunks.push(event.data);
      };

      recorder.onerror = () => reject(new Error("Recording failed."));
      recorder.onstop = resolve;
    });

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch {}

      const time = video.currentTime;
      const active = getActiveCaption(time);

      const text = active ? active.text : $("manualText").value.trim();

      if (text) {
        const fontSize = Math.max(18, Number($("captionSize").value) * scale);
        const x = canvas.width / 2;
        let y;

        if ($("captionPosition").value === "top") y = canvas.height * 0.12;
        else if ($("captionPosition").value === "middle") y = canvas.height * 0.52;
        else y = canvas.height * 0.88;

        ctx.font = `900 ${fontSize}px ${$("captionFont").value}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineJoin = "round";

        const maxTextWidth = canvas.width * 0.9;
        const words = text.split(/\s+/);
        const lines = [];
        let line = "";

        for (const word of words) {
          const trial = line ? `${line} ${word}` : word;

          if (ctx.measureText(trial).width > maxTextWidth && line) {
            lines.push(line);
            line = word;
          } else {
            line = trial;
          }
        }

        if (line) lines.push(line);

        const lineHeight = fontSize * 1.2;
        const boxHeight = lines.length * lineHeight;
        const startY = y - boxHeight / 2;

        lines.forEach((part, index) => {
          const lineY = startY + index * lineHeight + lineHeight / 2;

          if ($("captionLayout").value === "boxed") {
            const width = Math.min(
              maxTextWidth,
              ctx.measureText(part).width + fontSize * 0.5
            );

            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(x - width/2, lineY - lineHeight/2, width, lineHeight);
          }

          ctx.lineWidth = Math.max(0, Number($("outlineWidth").value) * scale);
          ctx.strokeStyle = $("outlineColor").value;
          ctx.fillStyle = $("captionLayout").value === "highlight"
            ? "#111111"
            : $("captionColor").value;

          if (ctx.lineWidth > 0) ctx.strokeText(part, x, lineY, maxTextWidth);
          ctx.fillText(part, x, lineY, maxTextWidth);
        });
      }

      if (recorder && recorder.state === "recording" && !video.ended) {
        requestAnimationFrame(drawFrame);
      }
    }

    video.pause();

    try {
      video.currentTime = 0;
      await new Promise(resolve => {
        if (video.readyState >= 2) resolve();
        else video.addEventListener("loadeddata", resolve, {once:true});
      });
    } catch {}

    await video.play();

    recorder.start(1000);
    drawFrame();

    $("videoStatus").textContent = "Exporting video… keep this page open.";

    await new Promise(resolve => {
      video.addEventListener("ended", resolve, {once:true});
      video.addEventListener("error", resolve, {once:true});
    });

    if (recorder.state !== "inactive") recorder.stop();
    await finished;

    if (!chunks.length) {
      throw new Error("No video data was recorded.");
    }

    const blob = new Blob(chunks, {type: mimeType});
    downloadBlob(blob, "editors-caption-ai.webm");

    $("videoStatus").textContent =
      originalAudioTracks.length
        ? "Export complete. Check the downloaded video and audio."
        : "Export complete. This browser could not capture the original audio; the downloaded video may be silent.";

  } catch (error) {
    console.error(error);
    if (recorder && recorder.state !== "inactive") {
      try { recorder.stop(); } catch {}
    }
    $("videoStatus").textContent = `Export failed: ${error.message}`;
    alert(`Video export failed: ${error.message}`);
  } finally {
    video.pause();

    try {
      video.currentTime = startTime;
    } catch {}

    if (originalPlaying) {
      video.play().catch(() => {});
    }

    canvasStream.getTracks().forEach(track => track.stop());

    exportBusy = false;
    $("exportVideo").disabled = false;
  }
}

function initializeApp() {
  document.querySelectorAll("[data-tab]").forEach(button => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  $("generateBtn").addEventListener("click", renderCaptionResults);

  $("randomBtn").addEventListener("click", () => {
    const categories = Object.keys(captionDatabase);
    $("category").value = categories[Math.floor(Math.random() * categories.length)];
    const languages = ["thunglish", "tamil", "english", "mixed"];
    $("language").value = languages[Math.floor(Math.random() * languages.length)];
    renderCaptionResults();
  });

  $("category").addEventListener("change", renderCaptionResults);
  $("language").addEventListener("change", renderCaptionResults);

  $("templateCategory").addEventListener("change", renderTemplates);
  $("templateSearch").addEventListener("input", renderTemplates);

  [
    "fontInput","fontFamily","fontWeight","fontColor","fontBg",
    "fontSize","letterSpacing"
  ].forEach(id => $(id).addEventListener("input", updateFontPreview));

  $("copyFont").addEventListener("click", () => copyText($("fontInput").value));

  $("useFont").addEventListener("click", () => {
    $("manualText").value = $("fontInput").value;
    $("captionFont").value = $("fontFamily").value;
    $("captionColor").value = $("fontColor").value;
    $("captionSize").value = $("fontSize").value;
    updateVideoCaption();
    switchTab("video");
  });

  [
    "manualText","captionFont","captionColor","highlightColor","outlineColor",
    "captionSize","outlineWidth","captionPosition","captionLayout",
    "captionAnimation","captionShadow"
  ].forEach(id => $(id).addEventListener("input", updateVideoCaption));

  $("videoFile").addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a video file.");
      event.target.value = "";
      return;
    }

    if (videoURL) URL.revokeObjectURL(videoURL);

    videoURL = URL.createObjectURL(file);
    $("videoPlayer").src = videoURL;
    $("emptyVideo").style.display = "none";
    $("videoStatus").textContent = `Loaded: ${file.name}`;

    $("videoPlayer").load();
  });

  $("videoPlayer").addEventListener("loadedmetadata", () => {
    $("captionEnd").value = Math.max(1, Math.min(5, $("videoPlayer").duration || 5));
    updateVideoCaption();
  });

  $("videoPlayer").addEventListener("timeupdate", updateTimedCaption);

  $("addVideoCaption").addEventListener("click", () => {
    const text = $("manualText").value.trim();
    const start = Number($("captionStart").value);
    const end = Number($("captionEnd").value);
    const duration = $("videoPlayer").duration;

    if (!text) {
      alert("Enter caption text first.");
      return;
    }

    if (!Number.isFinite(start) || !Number.isFinite(end) ||
        start < 0 || end <= start) {
      alert("Enter valid start and end times.");
      return;
    }

    if (Number.isFinite(duration) && end > duration) {
      alert(`End time cannot exceed the video duration (${duration.toFixed(2)} seconds).`);
      return;
    }

    videoCaptions.push({text, start, end});
    renderVideoCaptionList();
    updateVideoCaption();
  });

  $("clearVideoCaptions").addEventListener("click", () => {
    videoCaptions = [];
    renderVideoCaptionList();
    updateVideoCaption();
  });

  $("downloadSrt").addEventListener("click", downloadSRT);
  $("exportVideo").addEventListener("click", exportVideo);

  $("clearSaved").addEventListener("click", () => {
    if (!confirm("Clear all saved captions?")) return;
    savedCaptions = [];
    storeSaved();
    renderSaved();
  });

  $("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  renderCaptionResults();
  renderTemplates();
  renderSaved();
  renderVideoCaptionList();
  updateFontPreview();
  updateVideoCaption();
}

document.addEventListener("DOMContentLoaded", initializeApp);
