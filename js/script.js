const config={whatsappNumber:"SEU_NUMERO_AQUI",giftListUrl:"SEU_LINK_DA_LISTA_AQUI"};
const loader=document.querySelector(".loader");window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),700));

document.querySelector("#open")?.addEventListener("click",()=>document.querySelector("#intro")?.scrollIntoView({behavior:"smooth"}));

const target=new Date(2026,9,17,15,0,0);
function countdown(){const d=target-Date.now();if(d<=0){document.querySelector(".countdown").innerHTML="<strong>É hoje!</strong>";return}
const s=Math.floor(d/1000),day=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sec=s%60;
document.querySelector("#days").textContent=String(day).padStart(2,"0");document.querySelector("#hours").textContent=String(h).padStart(2,"0");document.querySelector("#minutes").textContent=String(m).padStart(2,"0");document.querySelector("#seconds").textContent=String(sec).padStart(2,"0")}
countdown();setInterval(countdown,1000);

const rsvp=document.querySelector("#rsvp");if(config.whatsappNumber!=="SEU_NUMERO_AQUI"){rsvp.href=`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent("Olá, Bruno e Izabella! Gostaria de confirmar minha presença no casamento de vocês, no dia 17/10/2026.")}`}else rsvp.onclick=e=>{e.preventDefault();alert("Configure o número de WhatsApp em js/script.js.")};

const gifts=document.querySelector("#gifts");if(config.giftListUrl!=="SEU_LINK_DA_LISTA_AQUI")gifts.href=config.giftListUrl;else gifts.onclick=e=>{e.preventDefault();alert("Configure o link da lista em js/script.js.")};

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));

document.querySelectorAll("[data-image]").forEach(el=>{const img=new Image(),path=`assets/images/${el.dataset.image}`;img.onload=()=>{el.style.backgroundImage=`linear-gradient(180deg,rgba(30,25,22,.03),rgba(30,25,22,.16)),url("${path}")`;el.style.backgroundSize="cover";el.style.backgroundPosition="center";el.querySelector("span")?.remove()};img.src=path});

const audio=document.querySelector("#audio"),music=document.querySelector("#music");music.onclick=async()=>{if(audio.paused){try{await audio.play();music.textContent="♫"}catch{alert("Adicione assets/music.mp3 para usar música.")}}else{audio.pause();music.textContent="♪"}};
