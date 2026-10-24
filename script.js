"use strict";

/* =========================================================
   EDITORS CAPTION AI — PROFESSIONAL JAVASCRIPT
   File: script.js
   ========================================================= */


/* =========================================================
   1. HELPERS
   ========================================================= */

const $ = (id) => document.getElementById(id);

const safeText = (value) => String(value ?? "");

const escapeHTML = (value) => safeText(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

function setStatus(message) {
  const el = $("videoStatus");
  if (el) el.textContent = message;
}

function formatTime(seconds) {
  seconds = Math.max(0, Number(seconds) || 0);

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return (
    String(mins).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0")
  );
}

function formatSRTTime(seconds) {
  seconds = Math.max(0, Number(seconds) || 0);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const milliseconds = Math.floor((seconds % 1) * 1000);

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0") + "," +
    String(milliseconds).padStart(3, "0")
  );
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    const area = document.createElement("textarea");

    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";

    document.body.appendChild(area);
    area.select();

    let copied = false;

    try {
      copied = document.execCommand("copy");
    } catch (_) {
      copied = false;
    }

    area.remove();
    return copied;
  }
}

function showEmpty(container, message) {
  container.innerHTML =
    '<div class="empty-state">' +
    escapeHTML(message) +
    "</div>";
}

function getStoredJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (_) {
    return fallback;
  }
}

function saveStoredJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_) {
    return false;
  }
}


/* =========================================================
   2. CAPTION DATABASE
   ========================================================= */

const captionDatabase = {

  attitude: {
    thunglish: [
      "En route vera, level vera.",
      "Silent ah irukken, weak nu nenakkadha.",
      "En game en rules.",
      "Mass kaatta noise thevai illa.",
      "Namma vibe ah copy panna mudiyadhu.",
      "Respect kudutha double ah thirumbi varum.",
      "Naan maarala, upgrade aanen.",
      "Scene poda varala, scene create panna vandhen.",
      "Low profile, high standards.",
      "En silence kooda oru statement."
    ],

    tamil: [
      "என் வழி தனி வழி.",
      "அமைதி என்பது பலவீனம் அல்ல.",
      "என் வாழ்க்கை, என் விதிகள்.",
      "நம்பிக்கையே என் அடையாளம்.",
      "என்னைப் புரிந்துகொள்ள நேரம் தேவை.",
      "வார்த்தைகளை விட செயல்கள் பேசட்டும்.",
      "தனித்துவமே என் பலம்.",
      "என் பாதையை நானே உருவாக்குகிறேன்."
    ],

    english: [
      "My lane. My rules.",
      "Silent moves, strong results.",
      "Confidence speaks without noise.",
      "Different mindset, different destination.",
      "I don't follow the noise.",
      "Built on standards, not approval.",
      "My journey, my signature.",
      "Less talk. More purpose."
    ],

    mixed: [
      "No noise. Only impact.",
      "Own lane. Own game.",
      "Vibe: UNMATCHED.",
      "Silent mode. Savage focus.",
      "Different by design.",
      "LEVEL UP."
    ]
  },


  love: {
    thunglish: [
      "Un smile dhaan en favourite scene.",
      "Un kooda irundha time fast ah pogudhu.",
      "Nee irundha podhum, vibe complete.",
      "Un presence dhaan en peace.",
      "Oru paarvai, thousand feelings.",
      "Un memories always on repeat.",
      "Love na words illa, little moments.",
      "Un sirippula en world irukku.",
      "Nee pakkathula irundha ellam beautiful.",
      "Simple moments, special memories."
    ],

    tamil: [
      "உன் சிரிப்பில் என் உலகம் இருக்கிறது.",
      "சில நிமிடங்கள், ஆயிரம் நினைவுகள்.",
      "உன்னுடன் இருக்கும் தருணங்கள் அழகானவை.",
      "சொல்லாத வார்த்தைகளிலும் காதல் இருக்கிறது.",
      "உன் நினைவுகள் என் மனதில் இசையாகிறது.",
      "அன்பு சிறிய விஷயங்களில் தெரியும்.",
      "உன் பார்வை ஒரு கவிதை.",
      "இதயம் நினைப்பதை வார்த்தைகள் சொல்லாது."
    ],

    english: [
      "Some people feel like home.",
      "You make ordinary moments special.",
      "A thousand feelings in one smile.",
      "Love lives in little things.",
      "Your presence is my favourite feeling.",
      "Some moments deserve to last forever.",
      "A quiet kind of magic.",
      "Memories written in the heart."
    ],

    mixed: [
      "YOU. ALWAYS.",
      "Love in little moments.",
      "One smile. Endless memories.",
      "Soft hearts, strong feelings.",
      "Our kind of magic.",
      "STAY A LITTLE LONGER."
    ]
  },


  sad: {
    thunglish: [
      "Sirippu irukku, aana peace konjam missing.",
      "Sila feelings explain panna mudiyadhu.",
      "Time pogudhu, memories stay aagudhu.",
      "Ellam okay nu solradhu easy.",
      "Sila silence ku meaning adhigam.",
      "Old memories, new lessons.",
      "Manasu solladha kadhai neraya irukku.",
      "Moving on um oru journey dhaan.",
      "Sila moments marakka mudiyadhu.",
      "Everything changes, memories remain."
    ],

    tamil: [
      "சில உணர்வுகளுக்கு வார்த்தைகள் இல்லை.",
      "காலம் மாறினாலும் நினைவுகள் மாறாது.",
      "சில அமைதிகள் நிறைய பேசுகின்றன.",
      "மனதில் சொல்லாத கதைகள் பல.",
      "நினைவுகள் சில நேரம் பாடமாகின்றன.",
      "எல்லா மாற்றங்களுக்கும் ஒரு காரணம் உண்டு.",
      "கடந்து செல்வதும் ஒரு பயணம்தான்.",
      "சில தருணங்கள் மனதில் தங்கிவிடும்."
    ],

    english: [
      "Some feelings have no words.",
      "Time moves, memories stay.",
      "Quiet moments carry loud feelings.",
      "Healing takes its own time.",
      "Not every story needs an explanation.",
      "Some chapters change us forever.",
      "Learning to let time do its work.",
      "Every ending teaches something."
    ],

    mixed: [
      "SILENT FEELINGS.",
      "Memories never mute.",
      "Some chapters stay.",
      "Healing in progress.",
      "Quiet, not empty.",
      "TIME. CHANGE. GROWTH."
    ]
  },


  friendship: {
    thunglish: [
      "Friends illa, family dhaan.",
      "Namma memories ku expiry date illa.",
      "Scene edhuva irundhalum team onnu dhaan.",
      "Oru gang, aayiram stories.",
      "Namma friendship always different level.",
      "Laughing at things nobody understands.",
      "Distance irundhalum bond same.",
      "Old friends, unlimited memories.",
      "Namma gang ku comparison illa.",
      "Together dhaan best scenes."
    ],

    tamil: [
      "நண்பர்கள் அல்ல, இன்னொரு குடும்பம்.",
      "நட்பின் நினைவுகளுக்கு முடிவில்லை.",
      "ஒரு கூட்டம், ஆயிரம் கதைகள்.",
      "தூரம் இருந்தாலும் நட்பு மாறாது.",
      "சிரிப்பிலும் சிக்கலிலும் நண்பர்கள்.",
      "உண்மையான நட்பு காலத்தைக் கடக்கும்.",
      "நண்பர்களுடன் ஒவ்வொரு நாளும் நினைவு.",
      "நட்பு என்பது மனதின் உறவு."
    ],

    english: [
      "Friends by chance, family by choice.",
      "One crew, countless memories.",
      "Real friendship needs no performance.",
      "Different people, one unforgettable story.",
      "Good friends make ordinary days legendary.",
      "Distance changes places, not bonds.",
      "Our memories deserve their own movie.",
      "Together is a whole different vibe."
    ],

    mixed: [
      "ONE CREW. ONE STORY.",
      "Friends. Family. Forever.",
      "MEMORY MAKERS.",
      "Real ones only.",
      "Different souls, same vibe.",
      "FRIENDSHIP UNFILTERED."
    ]
  },


  mass: {
    thunglish: [
      "Entry simple, impact heavy.",
      "Screen la oru vibe, life la oru level.",
      "Mass ku definition thevai illa.",
      "Build-up illa, confidence podhum.",
      "Indha frame ku replay mandatory.",
      "Oru look, full scene change.",
      "Hero moment loading.",
      "Background music ready ah?",
      "Frame freeze, vibe increase.",
      "This scene deserves slow motion."
    ],

    tamil: [
      "வருகை எளிது, தாக்கம் பெரியது.",
      "ஒவ்வொரு தருணமும் ஒரு காட்சி.",
      "நம்பிக்கைதான் உண்மையான பலம்.",
      "இந்த நிமிடம் நினைவாகட்டும்.",
      "ஒரு பார்வை, ஆயிரம் அர்த்தங்கள்.",
      "என் பயணம் இன்னும் தொடர்கிறது.",
      "காட்சியை விட உணர்வு முக்கியம்.",
      "ஒவ்வொரு அடியும் ஒரு புதிய தொடக்கம்."
    ],

    english: [
      "ONE FRAME. ALL IMPACT.",
      "Main character energy.",
      "Every entrance tells a story.",
      "Built for the big moment.",
      "Make the frame unforgettable.",
      "Let the scene speak.",
      "Confidence in every frame.",
      "This moment deserves a replay."
    ],

    mixed: [
      "MASS MODE: ON.",
      "FRAME. FREEZE. REPLAY.",
      "ICONIC ENERGY.",
      "ENTRY OF THE MOMENT.",
      "NO INTRO NEEDED.",
      "REPLAY THAT FRAME."
    ]
  },


  gaming: {
    thunglish: [
      "Lobby la silent, match la violence.",
      "Aim clean, focus sharp.",
      "Game enna, mindset dhaan main.",
      "Clutch moment ku naan ready.",
      "Squad oda vibe vera level.",
      "Headshot dreams, practice scenes.",
      "Rank vida skill important.",
      "Every match oru new lesson.",
      "One tap, clean finish.",
      "Game on, distractions off."
    ],

    tamil: [
      "கவனம் இருந்தால் வெற்றி அருகில்.",
      "ஒவ்வொரு போட்டியும் ஒரு பாடம்.",
      "திறமை பயிற்சியில் உருவாகிறது.",
      "குழுவுடன் விளையாட்டு இன்னும் சிறப்பு.",
      "வெற்றிக்கு கவனமும் பொறுமையும் தேவை.",
      "முயற்சியே முன்னேற்றத்தின் வழி."
    ],

    english: [
      "LOCK IN. LEVEL UP.",
      "Clutch under pressure.",
      "Skill over noise.",
      "One squad, one mission.",
      "Practice builds the highlight.",
      "Every match writes a new story.",
      "Focus is the real power-up.",
      "Make every round count."
    ],

    mixed: [
      "CLUTCH MODE.",
      "GG. NEXT.",
      "AIM. FOCUS. REPEAT.",
      "SQUAD ENERGY.",
      "LEVEL UP.",
      "GAME FACE ON."
    ]
  },


  motivation: {
    thunglish: [
      "Slow ah ponaalum stop aagadha.",
      "Daily konjam better aagu.",
      "Dream ku action thevai.",
      "Consistency dhaan real power.",
      "Un journey ah un pace la po.",
      "Effort today, progress tomorrow.",
      "Small steps, strong future.",
      "Focus irundha path clear aagum.",
      "Mistakes um lessons dhaan.",
      "Start pannradhu dhaan first victory."
    ],

    tamil: [
      "மெதுவாக சென்றாலும் முன்னேறு.",
      "தொடர்ச்சியான முயற்சியே வெற்றி.",
      "கனவுகளுக்கு செயல் தேவை.",
      "ஒவ்வொரு நாளும் புதிதாக கற்றுக்கொள்.",
      "சிறிய முன்னேற்றமும் முன்னேற்றமே.",
      "தோல்வியும் ஒரு பாடம்தான்.",
      "உன் வேகத்தில் முன்னேறு.",
      "முயற்சிக்கு மதிப்பு உண்டு."
    ],

    english: [
      "Progress over perfection.",
      "Small steps create big change.",
      "Consistency builds confidence.",
      "Your pace is still progress.",
      "Start where you are.",
      "Make effort your habit.",
      "Every day is another opportunity.",
      "Keep showing up for your goals."
    ],

    mixed: [
      "PROGRESS > PERFECTION.",
      "KEEP BUILDING.",
      "ONE DAY. ONE STEP.",
      "FOCUS. GROW. REPEAT.",
      "YOUR NEXT CHAPTER.",
      "START NOW."
    ]
  },


  funny: {
    thunglish: [
      "Plan perusa, execution tomorrow.",
      "Battery low, confidence high.",
      "Naan serious ah irukken... sometimes.",
      "Life loading, please wait.",
      "Brain offline, smile online.",
      "Sleep schedule ku naan stranger.",
      "Expectation 4K, reality 144p.",
      "Work mode loading... 1 percent.",
      "Overthinking ku unlimited data.",
      "Namma luck ku separate story venum."
    ],

    tamil: [
      "திட்டம் பெரியது, தூக்கம் அதைவிட பெரியது.",
      "மூளை ஓய்வில், சிரிப்பு வேலை செய்கிறது.",
      "வாழ்க்கை இன்னும் லோடிங் நிலையில்.",
      "எதிர்பார்ப்பு வேறு, நிஜம் வேறு.",
      "சில நேரம் நானே எனக்கு புரியவில்லை.",
      "சிரிப்பே இன்றைய திட்டம்."
    ],

    english: [
      "My plans need better management.",
      "Running on snacks and optimism.",
      "Reality has entered the chat.",
      "Professional overthinker.",
      "Loading motivation... please wait.",
      "Expectation: cinema. Reality: bloopers.",
      "Currently buffering.",
      "I came, I saw, I forgot why."
    ],

    mixed: [
      "LOADING... 1%.",
      "EXPECTATION VS REALITY.",
      "CHAOS DEPARTMENT.",
      "LOW BATTERY. HIGH DRAMA.",
      "BRAIN: OFFLINE.",
      "PROFESSIONAL NAP PLANNER."
    ]
  },


  life: {
    thunglish: [
      "Life oda pace ellarukkum different.",
      "Sila lessons late ah dhaan puriyum.",
      "Change dhaan constant.",
      "Un peace ah protect pannu.",
      "Experience dhaan best teacher.",
      "Nethu lesson, inniku progress.",
      "Simple life, meaningful moments.",
      "Ellathukkum oru timing irukku.",
      "Growth silent ah nadakkum.",
      "Un story innum mudiyala."
    ],

    tamil: [
      "ஒவ்வொருவரின் பயணமும் தனித்துவமானது.",
      "அனுபவமே சிறந்த ஆசிரியர்.",
      "அமைதியைக் காப்பது முக்கியம்.",
      "மாற்றம் வளர்ச்சியின் ஒரு பகுதி.",
      "ஒவ்வொரு நாளும் ஒரு புதிய வாய்ப்பு.",
      "எளிமையிலும் அழகு இருக்கிறது.",
      "உன் கதை இன்னும் தொடர்கிறது.",
      "நேரம் பல பாடங்களைக் கற்றுத்தரும்."
    ],

    english: [
      "Every journey has its own timing.",
      "Protect your peace.",
      "Growth often happens quietly.",
      "Simple moments, meaningful life.",
      "Experience changes perspective.",
      "Your story is still unfolding.",
      "Choose progress over comparison.",
      "Make room for what matters."
    ],

    mixed: [
      "LIFE. LEARN. GROW.",
      "YOUR OWN TIMELINE.",
      "PEACE OVER PRESSURE.",
      "STILL BECOMING.",
      "MEANING OVER NOISE.",
      "KEEP YOUR STORY GOING."
    ]
  },


  travel: {
    thunglish: [
      "Road um music um, perfect combo.",
      "Destination vida journey azhagu.",
      "New place, fresh memories.",
      "Travel mode always on.",
      "Sunset ku explanation thevai illa.",
      "Nature oda silence vera level.",
      "Oru trip, neraya stories.",
      "Wander pannu, memories collect pannu."
    ],

    tamil: [
      "பயணத்தில் புதிய நினைவுகள் பிறக்கின்றன.",
      "இயற்கையின் அமைதி தனி அழகு.",
      "இலக்கை விட பயணமும் அழகு.",
      "ஒவ்வொரு பயணமும் புதிய அனுபவம்.",
      "மலைகளும் கடலும் மனதுக்கு அமைதி தரும்.",
      "சூரிய அஸ்தமனம் ஒரு கவிதை."
    ],

    english: [
      "Collect moments, not just miles.",
      "Somewhere between lost and found.",
      "Let the road tell the story.",
      "New places, new perspectives.",
      "Chasing light and open skies.",
      "The journey is the destination.",
      "A little farther from ordinary."
    ],

    mixed: [
      "ROAD. MUSIC. MEMORIES.",
      "WANDER MORE.",
      "CHASE THE HORIZON.",
      "OUT OF OFFICE.",
      "SUNSET STORIES.",
      "NEXT STOP: ANYWHERE."
    ]
  },


  gym: {
    thunglish: [
      "Consistency dhaan real transformation.",
      "Focus on progress, not comparison.",
      "Every session oru step forward.",
      "Discipline beats excuses.",
      "Train smart, recover well.",
      "Strong habits, steady progress.",
      "Effort ku shortcut illa.",
      "One session at a time."
    ],

    tamil: [
      "தொடர்ச்சியான பயிற்சி முன்னேற்றம் தரும்.",
      "ஒவ்வொரு முயற்சியும் ஒரு படி முன்னேற்றம்.",
      "ஒழுக்கம் வளர்ச்சிக்கு வழிகாட்டும்.",
      "உடல்நலமும் ஓய்வும் முக்கியம்.",
      "உன் முன்னேற்றத்தில் கவனம் செலுத்து.",
      "பயிற்சியில் பொறுமை அவசியம்."
    ],

    english: [
      "Consistency is the real flex.",
      "Progress takes patience.",
      "Train with purpose.",
      "Build habits, not pressure.",
      "Rest is part of the process.",
      "Strong routines, steady growth.",
      "One session at a time."
    ],

    mixed: [
      "TRAIN. REST. REPEAT.",
      "CONSISTENCY WINS.",
      "PROGRESS IN MOTION.",
      "BUILT BY HABITS.",
      "DISCIPLINE DAILY.",
      "STRONGER ROUTINES."
    ]
  },


  edit: {
    thunglish: [
      "Beat ku cut, vibe ku colour.",
      "Every frame has a feeling.",
      "Edit la dhaan magic start aagudhu.",
      "Colour grade speaks louder.",
      "Transition smooth, story strong.",
      "One edit, endless replay.",
      "Frame perfect ah irukkanum.",
      "Mood set, timeline ready.",
      "Music hit aana cut hit aaganum.",
      "Create pannradhu dhaan identity."
    ],

    tamil: [
      "ஒவ்வொரு காட்சிக்கும் ஒரு உணர்வு.",
      "நிறங்களே கதையைச் சொல்லட்டும்.",
      "திருத்தத்தில் உருவாகும் தனித்துவம்.",
      "இசையும் காட்சியும் ஒன்றாகட்டும்.",
      "ஒவ்வொரு ஃப்ரேமும் ஒரு கதை.",
      "படைப்பாற்றலே அடையாளம்."
    ],

    english: [
      "Every frame tells a story.",
      "Cut to the feeling.",
      "Colour creates the mood.",
      "Edit with intention.",
      "Make every second count.",
      "Transitions with purpose.",
      "Your timeline, your signature.",
      "Create something worth replaying."
    ],

    mixed: [
      "CUT. COLOUR. CREATE.",
      "FRAME BY FRAME.",
      "EDITORS NEVER SLEEP.",
      "MOOD IN MOTION.",
      "REPLAY WORTHY.",
      "CREATIVE MODE: ON."
    ]
  }

};


/* =========================================================
   3. CAPTION GENERATOR
   ========================================================= */

const categorySelect = $("category");
const languageSelect = $("language");
const keywordsInput = $("keywords");
const captionResults = $("captionResults");

function getCaptionList(category, language) {
  const group = captionDatabase[category] || captionDatabase.attitude;

  return group[language] || group.english;
}

function generateCaptions(randomCategory = false) {
  let category = categorySelect.value;
  const language = languageSelect.value;
  const keywords = keywordsInput.value.trim();

  if (randomCategory) {
    const categories = Object.keys(captionDatabase);

    category = categories[
      Math.floor(Math.random() * categories.length)
    ];

    categorySelect.value = category;
  }

  const captions = getCaptionList(category, language);

  const shuffled = [...captions].sort(
    () => Math.random() - 0.5
  );

  const selected = shuffled.slice(
    0,
    Math.min(8, shuffled.length)
  );

  captionResults.innerHTML = "";

  selected.forEach((caption, index) => {
    let output = caption;

    if (keywords) {
      output += " — " + keywords;
    }

    const card = document.createElement("article");
    card.className = "caption-card";

    card.innerHTML = `
      <div class="caption-card-top">
        <span class="caption-tag">
          ${escapeHTML(category)}
        </span>

        <span class="muted">
          #${String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p>${escapeHTML(output)}</p>

      <div class="caption-card-actions">

        <button class="small-btn" data-action="copy">
          Copy
        </button>

        <button class="small-btn" data-action="save">
          ♡ Save
        </button>

        <button class="small-btn" data-action="edit">
          Use in editor →
        </button>

      </div>
    `;

    card.querySelector('[data-action="copy"]')
      .addEventListene
