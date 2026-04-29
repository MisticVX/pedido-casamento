const abrir = document.getElementById("abrir");
const tela1 = document.getElementById("tela1");
const tela2 = document.getElementById("tela2");

const sim = document.getElementById("sim");
const nao = document.getElementById("nao");
const musica = document.getElementById("musica");
const barra = document.getElementById("barra");
const galeria = document.getElementById("galeria");

let tentativas = 0;
let escala = 1;
let explodiu = false;

// 📸 IMAGENS
const imagens = [
    "galeria/foto1.jpeg",
    "galeria/foto2.jpeg",
    "galeria/foto3.jpeg",
    "galeria/foto4.jpeg",
    "galeria/foto5.jpeg",
    "galeria/foto6.jpeg",
    "galeria/foto7.jpeg",
    "galeria/foto8.jpeg"
];

// 💖 MOSTRAR FOTOS
function mostrarFotos() {
    imagens.forEach((src, index) => {

        setTimeout(() => {

            const img = document.createElement("img");
            img.src = src;
            img.classList.add("foto");

            const posicoes = [
                { top: "5%", left: "5%" },
                { top: "5%", right: "5%" },
                { bottom: "5%", left: "5%" },
                { bottom: "5%", right: "5%" },
                { top: "20%", left: "10%" },
                { top: "20%", right: "10%" },
                { bottom: "20%", left: "10%" },
                { bottom: "20%", right: "10%" }
            ];

            const pos = posicoes[index % posicoes.length];

            for (let key in pos) {
                img.style[key] = pos[key];
            }

            img.style.width = "35vw";
            img.style.maxWidth = "450px";

            img.style.transform = `scale(0.5) rotate(${Math.random()*20 - 10}deg)`;

            galeria.appendChild(img);

            setTimeout(() => {
                img.style.opacity = 1;
                img.style.transform = `scale(1) rotate(${Math.random()*20 - 10}deg)`;
            }, 100);

        }, index * 800);
    });
}

// 😏 BOTÃO NÃO FUGINDO + LÓGICA
function fugirDoNao(e) {
    if (e) e.preventDefault(); // evita bug no celular

    tentativas++;

    // cresce o botão SIM
    escala += 0.1;
    sim.style.transform = `scale(${escala})`;

    // barra enchendo
    let progresso = (tentativas / 3) * 100;
    barra.style.width = progresso + "%";

    // posição segura na tela
    const x = Math.random() * (window.innerWidth - nao.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - nao.offsetHeight - 20);

    nao.style.position = "fixed";
    nao.style.left = x + "px";
    nao.style.top = y + "px";

    // explosão após 3 tentativas
    if (tentativas >= 3 && !explodiu) {
        explodiu = true;
        explodirNao();
    }
}

// PC
nao.addEventListener("mouseover", fugirDoNao);

// Celular
nao.addEventListener("touchstart", fugirDoNao);

// 💥 EXPLOSÃO DO BOTÃO NÃO
function explodirNao() {

    nao.style.animation = "tremer 0.2s infinite";

    let escalaNao = 1;

    const crescer = setInterval(() => {
        escalaNao += 0.1;
        nao.style.transform = `scale(${escalaNao})`;
    }, 100);

    setTimeout(() => {
        clearInterval(crescer);
        nao.style.animation = "none";

        // partículas
        for (let i = 0; i < 25; i++) {
            const part = document.createElement("div");
            part.innerHTML = "💥";
            part.style.position = "fixed";
            part.style.left = nao.offsetLeft + "px";
            part.style.top = nao.offsetTop + "px";

            const dx = (Math.random() - 0.5) * 300;
            const dy = (Math.random() - 0.5) * 300;

            part.style.transition = "1s";

            document.body.appendChild(part);

            setTimeout(() => {
                part.style.transform = `translate(${dx}px, ${dy}px)`;
                part.style.opacity = 0;
            }, 10);

            setTimeout(() => {
                part.remove();
            }, 1000);
        }

        nao.style.transform = "scale(2)";
        nao.style.opacity = 0;

        setTimeout(() => {
            nao.style.display = "none";
        }, 500);

    }, 2000);
}

// 💌 ABRIR TELA
abrir.onclick = () => {
    tela1.classList.add("hidden");
    tela2.classList.remove("hidden");

    musica.play();
    iniciarCoracoes();
};

// 💖 BOTÃO SIM
sim.onclick = () => {
    mostrarFotos();
    tela2.classList.add("hidden");
    document.getElementById("final").classList.remove("hidden");
};

// 💖 CORAÇÕES
function iniciarCoracoes() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.classList.add("heart");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "0";

    heart.style.fontSize = (Math.random() * 40 + 40) + "px";
    heart.style.animationDuration = (Math.random() * 2 + 3) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }, 300);
}
