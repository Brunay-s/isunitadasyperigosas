const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    tabPanels.forEach((panel) => {
      panel.classList.remove('active');
      if (panel.id === target) {
        requestAnimationFrame(() => panel.classList.add('active'));
      }
    });
  });
});

/* Contador */
const TARGET_DATE = new Date('2026-09-30T08:30:00');

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');

  if (diff <= 0) {
    elDays.textContent = '0';
    elHours.textContent = '0';
    elMinutes.textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  elDays.textContent = days;
  elHours.textContent = hours;
  elMinutes.textContent = minutes;
}
updateCountdown();
setInterval(updateCountdown, 1000 * 30);

/* História Timeline (com trava de segurança) */
const timelineContainer = document.getElementById('timeline-container');
if (typeof timeline !== 'undefined' && timelineContainer) {
  timeline.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <span class="timeline-dot"></span>
      <div class="timeline-photo" data-img="${item.img}">
        <img src="${item.img}" alt="Momento ${index+1}" onerror="this.src='https://placehold.co/500x375/FAEDCD/3A5A40?text=Momento+${index + 1}'">
      </div>
      <div class="timeline-content">
        <span class="timeline-date">${item.date}</span>
        <p>${item.text}</p>
      </div>
    `;
    timelineContainer.appendChild(el);
  });
}

/* Lightbox */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (timelineContainer && lightbox) {
  timelineContainer.addEventListener('click', (e) => {
    const photo = e.target.closest('.timeline-photo');
    if (!photo) return;
    lightboxImg.src = photo.querySelector('img').src;
    lightbox.classList.add('open');
  });
  function closeLightbox() { lightbox.classList.remove('open'); }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

/* Bilhetinhos (Nome da variável alterado para evitar conflito) */
const drawBtn = document.getElementById('draw-btn');
const noteCard = document.getElementById('note-card');
const noteText = document.getElementById('note-text');
let lastIndex = -1;
let meusBilhetes = []; 

// Aqui o site vai buscar o seu arquivo .txt automaticamente
fetch('bilhetinhos_lista.txt')
  .then(response => response.text())
  .then(text => {
    // Separa os bilhetes por linha (cada linha do txt vira um bilhete)
    meusBilhetes = text.split('\n').filter(linha => linha.trim() !== '');
  })
  .catch(err => {
    console.error('Erro ao carregar o arquivo txt:', err);
    meusBilhetes = ["Vish, deu erro ao carregar os bilhetes! Verifique se o nome do arquivo txt está certinho no GitHub."];
  });

drawBtn.addEventListener('click', () => {
  if (meusBilhetes.length === 0) {
    noteText.textContent = "Carregando... tente de novo em um segundo!";
    noteCard.classList.add('show');
    return;
  }

  noteCard.classList.remove('show');
  
  setTimeout(() => {
    let index;
    do { 
      index = Math.floor(Math.random() * meusBilhetes.length); 
    } while (index === lastIndex && meusBilhetes.length > 1);
    
    lastIndex = index;
    noteText.textContent = meusBilhetes[index];
    noteCard.classList.add('show');
  }, 250);
});

/* ============================================================
   Isunitadas - Carrossel
   ============================================================ */
const isunitadasGallery = document.getElementById('isunitadas-gallery');
const QUANTIDADE_FOTOS_ISUNITADAS = 40;

if (isunitadasGallery) {
  // 1. Gera as fotos
  for (let i = 1; i <= QUANTIDADE_FOTOS_ISUNITADAS; i++) {
    const img = document.createElement('img');
    img.src = `images/isu${i}.jpg`;
    img.onerror = () => img.src = `https://placehold.co/600x450/FAEDCD/3A5A40?text=isu${i}`;
    img.onclick = () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
    };
    isunitadasGallery.appendChild(img);
  }

  // 2. Lógica do Carrossel e Transição
  let currentIndex = 0;
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  function updateCarousel() {
    isunitadasGallery.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= QUANTIDADE_FOTOS_ISUNITADAS) {
      currentIndex = 0; // Se chegar no final, volta para a primeira
    }
    updateCarousel();
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = QUANTIDADE_FOTOS_ISUNITADAS - 1; // Se voltar antes da primeira, vai para a última
    }
    updateCarousel();
  }

  // Comandos manuais (Setas)
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay(); // Pausa o tempo e reinicia para não passar foto muito rápido
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // Comando automático (A cada 3 segundos / 3000 milissegundos)
  let autoPlay = setInterval(nextSlide, 3000);

  function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, 3000);
  }
}

/* Roteiro (com trava de segurança) */
const roadmapContainer = document.getElementById('roadmap-container');
function getSavedState() { try { return JSON.parse(localStorage.getItem('roteiro-estado')) || {}; } catch { return {}; } }
function saveState(state) { localStorage.setItem('roteiro-estado', JSON.stringify(state)); }
const savedState = getSavedState();

if (typeof roteiro !== 'undefined' && roadmapContainer) {
  roteiro.forEach((step, index) => {
    const isDone = savedState[index] ?? step.done;
    const el = document.createElement('div');
    el.className = 'roadmap-item' + (isDone ? ' done' : '');
    el.dataset.index = index;
    el.innerHTML = `<span class="roadmap-check"></span><div class="roadmap-content"><h3>${step.title}</h3></div>`;
    roadmapContainer.appendChild(el);
  });

  roadmapContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.roadmap-item');
    if (!item) return;
    const index = item.dataset.index;
    const isDone = item.classList.toggle('done');
    savedState[index] = isDone;
    saveState(savedState);
  });
}

/* Meia Noite Form */
const midnightForm = document.getElementById('midnight-form');
const sendBtn = document.getElementById('send-btn');
const feedback = document.getElementById('midnight-feedback');
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/SEU_FORM_ID_AQUI';

if (midnightForm) {
  midnightForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('secret-text').value.trim();
    if (!msg) return;
    sendBtn.disabled = true;
    feedback.textContent = 'Enviando...';
    
    if (FORMSPREE_ENDPOINT.includes('SEU_FORM_ID_AQUI')) {
      setTimeout(() => {
        feedback.textContent = 'Mensagem salva com sucesso! (Configurar formspree)';
        sendBtn.disabled = false;
        midnightForm.reset();
      }, 400);
      return;
    }
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(midnightForm)
      });
      if (response.ok) {
        feedback.textContent = 'Enviado! Seu segredo chegou até nós. 💌';
        midnightForm.reset();
      } else { throw new Error(); }
    } catch (err) {
      feedback.textContent = 'Erro ao enviar. Tente novamente.';
    } finally {
      sendBtn.disabled = false;
    }
  });
}
