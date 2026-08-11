const config = {
    whatsappNumber: "SEU_NUMERO_AQUI", 
    giftListUrl: "SEU_LINK_DA_LISTA_AQUI"
};

// Loader
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 700);
});

// Music Player
const audio = document.querySelector("#audio");
const musicBtn = document.querySelector("#music");

// Scroll suave para o convite
document.querySelector("#open")?.addEventListener("click", () => {
    const target = document.querySelector("#intro");
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
     if (audio && audio.paused) {
        audio.play().then(() => {
            if (musicBtn) musicBtn.textContent = "♫"; // Atualiza o ícone do botão flutuante
        }).catch(err => {
            console.error("O áudio não pôde ser iniciado:", err);
        });
    }
});

// Countdown
const targetDate = new Date(2026, 9, 17, 15, 30, 0); // Meses em JS começam em 0 (9 = Outubro)

function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;
    
    const countdownEl = document.querySelector(".countdown");
    if (!countdownEl) return;

    if (diff <= 0) {
        countdownEl.innerHTML = "<strong>É hoje!</strong>";
        return;
    }

    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    document.querySelector("#days").textContent = String(d).padStart(2, "0");
    document.querySelector("#hours").textContent = String(h).padStart(2, "0");
    document.querySelector("#minutes").textContent = String(m).padStart(2, "0");
    document.querySelector("#seconds").textContent = String(sec).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP Link
const rsvpBtn = document.querySelector("#rsvp");
if (rsvpBtn) {
    if (config.whatsappNumber !== "SEU_NUMERO_AQUI") {
        const msg = encodeURIComponent("Olá, Bruno e Izabella! Gostaria de confirmar minha presença no casamento de vocês no dia 17/10/2026.");
        rsvpBtn.href = `https://wa.me/${config.whatsappNumber}?text=${msg}`;
    } else {
        rsvpBtn.onclick = (e) => {
            e.preventDefault();
            alert("Configure o número de WhatsApp em js/script.js.");
        };
    }
}

// Gift List Link
const giftBtn = document.querySelector("#gifts");
if (giftBtn) {
    if (config.giftListUrl !== "SEU_LINK_DA_LISTA_AQUI") {
        giftBtn.href = config.giftListUrl;
        giftBtn.target = "_blank";
    } else {
        giftBtn.onclick = (e) => {
            e.preventDefault();
            alert("Configure o link da lista em js/script.js.");
        };
    }
}

// Reveal animation on scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));



if (musicBtn && audio) {
    musicBtn.onclick = async () => {
        if (audio.paused) {
            try {
                await audio.play();
                musicBtn.textContent = "♫";
            } catch (err) {
                console.error("Erro ao tocar áudio:", err);
                alert("Não foi possível carregar a música. Verifique o caminho do arquivo.");
            }
        } else {
            audio.pause();
            musicBtn.textContent = "♪";
        }
    };
}
