let discovered = 0;
let yesMoves = 0;
let noClicks = 0;


/* =========================
   PAGE SYSTEM
========================= */

function showPage(number) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById("page" + number);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo(0, 0);
}


/* =========================
   PAGE 1
========================= */

function startSurprise() {
    showPage(2);
}


/* =========================
   PAGE 2
========================= */

function turnOnLight() {

    const room = document.querySelector(".dark-room");

    room.classList.add("lights-on");

    setTimeout(() => {
        showPage(3);
    }, 1800);
}


/* =========================
   PAGE 4 — CAKE
========================= */

function cutCake() {

    const cake = document.querySelector(".cake");
    const knife = document.querySelector(".knife");
    const message = document.getElementById("cakeMessage");

    if (cake.classList.contains("sliced")) {
        return;
    }

    knife.classList.add("cutting");

    setTimeout(() => {

        cake.classList.add("sliced");

        message.innerText =
            "YAYYY! Cake cut! 🎂❤️";

    }, 500);

    setTimeout(() => {

        showPage(5);

    }, 2200);
}


/* =========================
   PAGE 5 — CARDS
========================= */

function flipCard(card) {

    if (card.classList.contains("flipped")) {
        return;
    }

    card.classList.add("flipped");

    discovered++;

    document.getElementById("cardCount").innerText =
        discovered + " of 3 wishes discovered";

    document.getElementById("progressFill").style.width =
        (discovered / 3 * 100) + "%";

    if (discovered === 3) {

        document
            .getElementById("surpriseButton")
            .classList.remove("hidden-btn");

    }
}


function goToPage6() {
    showPage(6);
}


/* =========================
   PAGE 6 — YES
========================= */

function yesClicked() {

    const yes = document.getElementById("yesBtn");

    yesMoves++;

    const positions = [
        {
            left: "75%",
            top: "10%"
        },
        {
            left: "5%",
            top: "65%"
        },
        {
            left: "70%",
            top: "70%"
        },
        {
            left: "10%",
            top: "10%"
        }
    ];

    const pos =
        positions[(yesMoves - 1) % positions.length];

    yes.style.left = pos.left;
    yes.style.top = pos.top;

    if (yesMoves >= 4) {

        setTimeout(() => {

            showPage(8);
            resetPage8();

        }, 500);

    }
}


/* =========================
   PAGE 6 — NO
========================= */

function noClicked() {

    const no = document.getElementById("noBtn");

    noClicks++;

    const scale =
        Math.max(0.1, 1 - (noClicks * 0.25));

    no.style.transform =
        `scale(${scale})`;

    if (noClicks >= 3) {

        setTimeout(() => {
            showPage(7);
        }, 400);

    }
}


/* =========================
   PAGE 7
========================= */

function returnToSurprise() {

    yesMoves = 0;
    noClicks = 0;

    const yes = document.getElementById("yesBtn");
    const no = document.getElementById("noBtn");

    yes.style.left = "";
    yes.style.top = "";

    no.style.transform = "scale(1)";

    showPage(6);
}


/* =========================
   PAGE 8 RESET
========================= */

function resetPage8() {

    document
        .getElementById("mysteryStep")
        .classList.remove("hidden-game");

    document
        .getElementById("wandStep")
        .classList.add("hidden-game");

    document
        .getElementById("quizStep")
        .classList.add("hidden-game");

    document
        .getElementById("lastButton")
        .classList.add("hidden-game");

    document
        .getElementById("quizNo")
        .style.display = "block";

    document
        .getElementById("quizNo")
        .style.opacity = "1";
}


/* =========================
   MYSTERY BOX
========================= */

function openMysteryBox(box) {

    const boxes =
        document.querySelectorAll(".mystery-box");

    boxes.forEach(item => {
        item.disabled = true;
    });

    box.innerText = "✨";

    box.classList.add("box-open");

    document.getElementById("boxMessage").innerText =
        "OHHH... you found the surprise 😏✨";

    setTimeout(() => {

        document
            .getElementById("mysteryStep")
            .classList.add("hidden-game");

        document
            .getElementById("wandStep")
            .classList.remove("hidden-game");

    }, 1500);
}


/* =========================
   MAGIC WAND
========================= */

function useMagicWand() {

    const wand =
        document.querySelector(".magic-wand");

    wand.classList.add("wand-active");

    document.getElementById("wandMessage").innerText =
        "✨ MAGIC ACTIVATED ✨";

    createMagicParticles();

    setTimeout(() => {

        document
            .getElementById("wandStep")
            .classList.add("hidden-game");

        document
            .getElementById("quizStep")
            .classList.remove("hidden-game");

    }, 1800);
}


/* =========================
   MAGIC PARTICLES
========================= */

function createMagicParticles() {

    for (let i = 0; i < 25; i++) {

        const particle =
            document.createElement("div");

        particle.innerText =
            Math.random() > 0.5 ? "✨" : "✦";

        particle.className = "magic-particle";

        document.body.appendChild(particle);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 250;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        particle.style.setProperty("--x", x + "px");
        particle.style.setProperty("--y", y + "px");

        setTimeout(() => {
            particle.remove();
        }, 1300);
    }
}


/* =========================
   QUIZ YES
========================= */

function quizYes() {

    document.getElementById("quizMessage").innerText =
        "I KNEW IT 😏❤️ OBVIOUSLYYYY!";

    document
        .getElementById("lastButton")
        .classList.remove("hidden-game");
}


/* =========================
   QUIZ NO
========================= */

function quizNo() {

    const no =
        document.getElementById("quizNo");

    no.classList.add("quiz-no-gone");

    document.getElementById("quizMessage").innerText =
        "NO OPTION GAYAB 🤣🤣🤣";

    setTimeout(() => {

        no.style.display = "none";

    }, 400);
}