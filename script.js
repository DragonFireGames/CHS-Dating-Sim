/* ============================================================
   SCREEN SWITCHING
============================================================ */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("visible"));
    document.getElementById(id).classList.add("visible");

    if (id === "characterSelect") startWebcam();
    if (id === "saveSlots") renderSaveSlots();
}

/* ============================================================
   WEBCAM + AVATAR SYSTEM
============================================================ */
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("videoPreview").srcObject = stream;
    } catch {
        document.getElementById("videoPreview").style.display = "none";
    }
}

function capturePhoto() {
    const video = document.getElementById("videoPreview");
    const canvas = document.getElementById("canvas");
    const avatar = document.getElementById("avatarPreview");

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0);
    ctx.restore();

    avatar.src = canvas.toDataURL("image/png");
    enterAvatarPreviewMode();
}

function uploadAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const avatar = document.getElementById("avatarPreview");
        avatar.src = URL.createObjectURL(file);
        enterAvatarPreviewMode();
    }
}

/* Drag & Drop */
const dropZone = document.getElementById("avatarDropZone");

dropZone.addEventListener("dragover", e => {
    e.preventDefault();
    dropZone.style.borderColor = "#ff7bbf";
});

dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "#d9a8c4";
});

dropZone.addEventListener("drop", e => {
    e.preventDefault();
    dropZone.style.borderColor = "#d9a8c4";

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
        const avatar = document.getElementById("avatarPreview");
        avatar.src = URL.createObjectURL(file);
        enterAvatarPreviewMode();
    }
});

function enterAvatarPreviewMode() {
    document.getElementById("videoPreview").style.display = "none";
    document.getElementById("avatarPreview").style.display = "block";
    document.getElementById("confirmOverlay").style.display = "flex";
}

/* Confirm / Cancel avatar */
let confirmedAvatarDataUrl = null;

document.getElementById("cancelBtn").onclick = () => {
    document.getElementById("avatarPreview").style.display = "none";
    document.getElementById("confirmOverlay").style.display = "none";
    document.getElementById("videoPreview").style.display = "block";
};

document.getElementById("confirmBtn").onclick = () => {
    confirmedAvatarDataUrl = document.getElementById("avatarPreview").src;
    document.getElementById("confirmOverlay").style.display = "none";
};

/* ============================================================
   CHARACTER CREATION → SAVE SLOT → VN START
============================================================ */
function finishCharacter() {
    const name = document.getElementById("playerName").value.trim();
    if (!name) return alert("Please enter a name.");

    const schedule = [...document.querySelectorAll(".schedule-box input:checked")]
        .map(c => c.value);

    const playerData = {
        playerName: name,
        schedule,
        avatar: confirmedAvatarDataUrl
    };

    localStorage.setItem("playerData", JSON.stringify(playerData));

    // NEW: initialize gameData from defaultGameData
    gameData = JSON.parse(JSON.stringify(defaultGameData));

    const slot = localStorage.getItem("currentSlot");

    const saveData = {
        ...playerData,
        gameData,              // NEW
        sceneId: startingScene,
        vnIndex: 0,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem("saveSlot" + slot, JSON.stringify(saveData));

    startVN();
}

/* ============================================================
   SAVE SLOT SYSTEM
============================================================ */
function openSaveSlots() {
    showScreen("saveSlots");
}

function renderSaveSlots() {
    const container = document.getElementById("slotContainer");
    container.innerHTML = "";

    for (let i = 1; i <= 3; i++) {
        const data = JSON.parse(localStorage.getItem("saveSlot" + i));
        const slot = document.createElement("div");
        slot.className = "saveSlot";

        const info = document.createElement("div");
        info.className = "slotInfo";

        if (data) {
            info.innerHTML = `
                <strong>${data.playerName}</strong>
                <span>Last played: ${new Date(data.timestamp).toLocaleString()}</span>
            `;
            slot.onclick = () => loadGame(i);
        } else {
            info.innerHTML = `<strong>Empty Slot ${i}</strong>`;
            slot.onclick = () => startNewGame(i);
        }

        const del = document.createElement("button");
        del.className = "deleteBtn";
        del.textContent = "Delete";
        del.onclick = (e) => {
            e.stopPropagation();
            deleteSlot(i);
        };

        slot.appendChild(info);
        slot.appendChild(del);
        container.appendChild(slot);
    }
}

function startNewGame(slot) {
    localStorage.setItem("currentSlot", slot);
    showScreen("characterSelect");
}

function saveGame() {
    const slot = localStorage.getItem("currentSlot");
    if (!slot) return alert("No slot selected.");

    const playerData = JSON.parse(localStorage.getItem("playerData"));

    const saveData = {
        ...playerData,
        gameData,
        sceneId: currentScene.id,   // NEW
        vnIndex,                    // existing
        timestamp: new Date().toISOString()
    };

    localStorage.setItem("saveSlot" + slot, JSON.stringify(saveData));
    alert("Game saved!");
}

function loadGame(slot) {
    const data = JSON.parse(localStorage.getItem("saveSlot" + slot));
    if (!data) return;

    localStorage.setItem("currentSlot", slot);
    localStorage.setItem("playerData", JSON.stringify(data));
    gameData = data.gameData;
    loadScene(data.sceneId);   // NEW
    vnIndex = data.vnIndex;    // restore line index
    loadDialogueStep();        // NEW (replaces loadDialogue)
    showScreen("vnScreen");
    stopTitleMusic();
}

function deleteSlot(slot) {
    if (confirm("Delete this save?")) {
        localStorage.removeItem("saveSlot" + slot);
        renderSaveSlots();
    }
}

/* ============================================================
   VN ENGINE — SCENE SYSTEM, TYPEWRITER, CHOICES, CHARACTERS
============================================================ */

let currentScene = null;
let currentScript = [];
let vnIndex = 0;

let typing = false;
let currentText = "";
let typePos = 0;
let typeInterval = null;

let gameData = {};

/* Active characters currently on screen */
let activeCharacters = {};

/* ============================================================
   SCENE LOADING
============================================================ */

function loadScene(sceneId) {
    const scene = scenes[sceneId];
    if (!scene) {
        console.error("Scene not found:", sceneId);
        return;
    }

    currentScene = scene;
    currentScript = scene.script;
    vnIndex = 0;

    clearScene();

    if (scene.background) {
        document.getElementById("bgImage").src = scene.background;
    }

    for (const id in scene.cast) {
        spawnCharacter(id, scene.cast[id]);
    }

    loadDialogueStep();
}

/* Remove all characters from screen */
function clearScene() {
    for (const id in activeCharacters) {
        activeCharacters[id].element.remove();
    }
    activeCharacters = {};
}

/* Spawn a character using scene defaults */
function spawnCharacter(id, char) {
    const img = document.createElement("img");
    img.className = "vnCharacter";

    var def = JSON.parse(JSON.stringify(characters[id].defaults));
    for (var i in char) def[i] = char[i];

    img.src = characters[id].emotions[def.emotion];
    if (def.width) img.style.width = def.width;
    if (def.height) img.style.height = def.height;
    if (def.layer) img.style.zIndex = def.layer;
    if (def.transition) img.style.transition = def.transition;
    img.style.left = def.left;
    img.style.bottom = def.bottom;
    img.style.transform = `scaleX(${def.facing})`;

    document.getElementById("vnBackground").appendChild(img);

    activeCharacters[id] = {
        element: img,
    };
}

/* ============================================================
   APPLY SCENE CHANGES (MOVEMENT, EMOTIONS)
============================================================ */

function applySceneChanges(sceneArray) {
    if (!sceneArray) return;

    sceneArray.forEach(entry => {
        const id = entry.character;
        const char = activeCharacters[id];
        const def = characters[id];

        if (!char || !def) return;

        const img = char.element;

        if (entry.layer) img.style.zIndex = entry.layer;
        if (entry.transition) img.style.transition = entry.transition;
        if (entry.left) img.style.left = entry.left;
        if (entry.bottom) img.style.bottom = entry.bottom;

        if (entry.facing !== undefined) {
            img.style.transform = `scaleX(${entry.facing})`;
        }

        if (entry.emotion) {
            img.src = def.emotions[entry.emotion];
            // img.style.opacity = 0;
            // setTimeout(() => {
            //     img.src = def.emotions[entry.emotion];
            //     img.style.opacity = 1;
            // }, 200);
        }
    });
}

/* ============================================================
   DIALOGUE LOADING
============================================================ */

function loadDialogueStep() {
    const line = currentScript[vnIndex];

    if (!line) {
        console.warn("End of scene:", currentScene.id);
        return;
    }

    if (typeof line.custom == "function") {
        line.custom(advanceDialogue);
        return;
    }

    if (line.phone) {
        hideDialogueBox();
        hideChoices();

        if (line.incoming) {
            phoneData.messages[line.contact].push({
                from: line.contact,
                text: line.incoming
            });
        }

        openPhone(line.app, line.contact);

        return;
    }

    if (line.cinematic) { 
        hideChoices(); 
        hideDialogueBox(); 
        applySceneChanges(line.scene); 
        if (line.duration) { 
            setTimeout(() => { 
                advanceDialogue();
            }, line.duration);
        } 
        return; 
    }

    showDialogueBox();
    hideChoices();

    const playerData = JSON.parse(localStorage.getItem("playerData") || "{}");

    var speakerName = line.speaker?.replace("{player}", playerData.playerName || "You") || "";
    var text = typeof line.text == "function" ? line.text() : line.text;
    text = text?.replace("{player}", playerData.playerName || "You") || "";

    document.getElementById("nameTag").textContent = speakerName;

    if (line.background) {
        document.getElementById("bgImage").src = line.background;
    }

    if (line.scene) {
        applySceneChanges(line.scene);
    }

    currentText = text;
    typePos = 0;
    typing = true;

    document.getElementById("dialogueTextVisible").textContent = "";
    document.getElementById("dialogueTextGhost").textContent = text;

    if (typeInterval) clearInterval(typeInterval);
    typeInterval = setInterval(typeWriterStep, 20);

    setTimeout(()=>{
        if (line.choices) showChoices(line.choices);
    }, 20 * currentText.length + 200);
}

/* ============================================================
   TYPEWRITER
============================================================ */

function typeWriterStep() {
    if (typePos >= currentText.length) {
        clearInterval(typeInterval);
        typing = false;
        return;
    }

    document.getElementById("dialogueTextVisible").textContent =
        currentText.substring(0, typePos + 1);

    typePos++;
}

/* ============================================================
   ADVANCE DIALOGUE
============================================================ */

function advanceDialogue() {
    const line = currentScript[vnIndex];

    if (line.choices) return;

    if (typing) {
        clearInterval(typeInterval);
        document.getElementById("dialogueTextVisible").textContent = currentText;
        typing = false;
        return;
    }

    var next = line.next;
    if (typeof next === "function") next = next();
    if (typeof next === "string") {
        loadScene(next);
        return;
    }
    vnIndex = typeof next === "number" ? next : vnIndex + 1;

    loadDialogueStep();
}

/* ============================================================
   CHOICES
============================================================ */

function showChoices(choices) {
    if (typeof choices == "function") choices = choices();

    const box = document.getElementById("choiceBox");
    box.innerHTML = "";
    box.style.display = "flex";

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choiceBtn";
        btn.textContent = choice.text;
        btn.onclick = () => {
            if (typeof choice.onchoose === "function") choice.onchoose();

            var next = choice.next;
            if (typeof next === "function") next = next();
            if (typeof next === "string") {
                loadScene(next);
            } else {
                vnIndex = next;
                loadDialogueStep();
            }
        };
        box.appendChild(btn);
    });
}

function hideChoices() {
    document.getElementById("choiceBox").style.display = "none";
}
function hideDialogueBox() {
    document.getElementById("dialogueBox").style.opacity = 0;
    document.getElementById("dialogueBox").style.pointerEvents = "none";
}
function showDialogueBox() {
    document.getElementById("dialogueBox").style.opacity = 1;
    document.getElementById("dialogueBox").style.pointerEvents = "auto";
}

/* ============================================================
   START VN
============================================================ */

function startVN() {

    const slot = localStorage.getItem("currentSlot");
    const save = JSON.parse(localStorage.getItem("saveSlot" + slot));

    showScreen("vnScreen");
    stopTitleMusic();

    if (save && save.sceneId) {
        loadScene(save.sceneId);
        vnIndex = save.vnIndex;
        loadDialogueStep();
    } else {
        loadScene(startingScene); // default scene
    }
}

/* ============================================================
   EXIT TO MENU
============================================================ */

function exitToMenu() {
    saveGame(); // now saves sceneId too

    clearInterval(typeInterval);
    typing = false;

    clearScene();

    document.getElementById("dialogueTextVisible").textContent = "";
    document.getElementById("dialogueTextGhost").textContent = "";

    showScreen("titleScreen");
    playTitleMusic();
}

// Title Music

let titleMusicStarted = false;

function enableTitleMusicOnFirstInteraction() {
    if (titleMusicStarted) return;

    playTitleMusic();

    titleMusicStarted = true;

    // Remove listeners after first trigger
    window.removeEventListener("click", enableTitleMusicOnFirstInteraction);
    window.removeEventListener("keydown", enableTitleMusicOnFirstInteraction);
}

// Attach listeners
window.addEventListener("click", enableTitleMusicOnFirstInteraction);
window.addEventListener("keydown", enableTitleMusicOnFirstInteraction);

function playTitleMusic() {
    const music = document.getElementById("titleMusic");
    music.volume = 0.6; // optional
    music.play().catch(() => {}); // ignore autoplay errors
}

function stopTitleMusic() {
    const music = document.getElementById("titleMusic");
    music.pause();
    music.currentTime = 0;
}

function fadeOutTitleMusic() {
    const music = document.getElementById("titleMusic");
    let vol = music.volume;

    const fade = setInterval(() => {
        vol -= 0.05;
        if (vol <= 0) {
            music.pause();
            music.currentTime = 0;
            clearInterval(fade);
        } else {
            music.volume = vol;
        }
    }, 50);
}
