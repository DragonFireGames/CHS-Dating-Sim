
document.body.innerHTML += `
<div id="testOverlay">
    <div id="testWindow">
        <h2 id="testTitle"></h2>
        <div id="testContent"></div>
        <input id="testInput" type="text" style="display:none">
        <button id="testSubmitBtn" style="display:none">Submit</button>
        <button id="testCloseBtn" style="display:none">Close</button>
    </div>
</div>`;

document.head.innerHTML += `
<style>

#testOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

#testWindow {
    background: white;
    padding: 20px;
    width: 400px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    text-align: center;
}

</style>`;

function openTestUI(title) {
    document.getElementById("testTitle").textContent = title;
    document.getElementById("testOverlay").style.display = "flex";
}

function closeTestUI() {
    document.getElementById("testOverlay").style.display = "none";
}

function setTestContent(html) {
    document.getElementById("testContent").innerHTML = html;
}

function showTestInput(show) {
    document.getElementById("testInput").style.display = show ? "block" : "none";
    document.getElementById("testSubmitBtn").style.display = show ? "block" : "none";
}

function showTestClose(show) {
    document.getElementById("testCloseBtn").style.display = show ? "block" : "none";
}

function startMathTest(callback) {
    let score = 0;
    let questionCount = 5;
    let current = 0;

    openTestUI("Math Quiz");
    showTestClose(false);

    function nextQuestion() {
        if (current >= questionCount) {
            setTestContent(`<p>You scored ${score}/${questionCount}!</p>`);
            showTestInput(false);
            showTestClose(true);

            document.getElementById("testCloseBtn").onclick = () => {
                closeTestUI();
                callback(score);
            };
            return;
        }

        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const answer = a + b;

        setTestContent(`<p>${a} + ${b} = ?</p>`);
        showTestInput(true);

        const input = document.getElementById("testInput");
        input.value = "";

        document.getElementById("testSubmitBtn").onclick = () => {
            if (parseInt(input.value) === answer) score++;
            current++;
            nextQuestion();
        };
    }

    nextQuestion();
}

function startLanguageTest(callback) {
    const passage = "The quick brown fox jumps over the lazy dog.";
    const question = "What animal jumps over the dog?";
    const answer = "fox";

    openTestUI("Reading Test");
    showTestClose(false);

    setTestContent(`
        <p>${passage}</p>
        <p><strong>${question}</strong></p>
    `);

    showTestInput(true);

    document.getElementById("testSubmitBtn").onclick = () => {
        const user = document.getElementById("testInput").value.trim().toLowerCase();
        const correct = user.includes(answer);

        setTestContent(correct
            ? "<p>Correct!</p>"
            : "<p>Incorrect. The answer was 'fox'.</p>"
        );

        showTestInput(false);
        showTestClose(true);

        document.getElementById("testCloseBtn").onclick = () => {
            closeTestUI();
            callback(correct?1:0);
        };
    };
}
