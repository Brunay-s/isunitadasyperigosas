/* ============================================================
   NAVEGAÇÃO DAS ABAS
   ============================================================ */
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

/* ============================================================
   CONTADOR REGRESSIVO
   ============================================================ */
// Data no formato mais seguro para todos os celulares e navegadores
const TARGET_DATE = new Date('2026/09/30 08:30:00');

function updateCountdown() {
  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');

  // Se a aba ainda não carregou os elementos, ele aguarda sem quebrar o código
  if (!elDays || !elHours || !elMinutes) return;

  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    elDays.textContent = '0';
    elHours.textContent = '0';
    elMinutes.textContent = '0';
    return;
  }

  elDays.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
  elHours.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
  elMinutes.textContent = Math.floor((diff / (1000 * 60)) % 60);
}

// Inicia o contador e atualiza a cada 1 segundo
updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================================
   LINHA DO TEMPO (HISTÓRIA)
   ============================================================ */
const timelineContainer = document.getElementById('timeline-container');
// Trava de segurança para garantir que os dados existem
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

/* ============================================================
   LIGHTBOX (AMPLIAR FOTOS)
   ============================================================ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg && lightboxClose) {
  // Delegação de eventos para funcionar em fotos criadas dinamicamente
  document.addEventListener('click', (e) => {
    const photo = e.target.closest('.timeline-photo, .carousel-track img');
    if (photo) {
      const img = photo.tagName === 'IMG' ? photo : photo.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
      }
    }
  });

  lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
}

/* ============================================================
   BILHETINHOS
   ============================================================ */
const drawBtn = document.getElementById('draw-btn');
const noteCard = document.getElementById('note-card');
const noteText = document.getElementById('note-text');
let lastIndex = -1;
let meusBilhetes = [];

fetch('bilhetinhos_lista.txt')
  .then(response => response.text())
  .then(text => { 
    meusBilhetes = text.split('\n').filter(linha => linha.trim() !== ''); 
  })
  .catch(err => { 
    meusBilhetes = ["Erro ao carregar bilhetes. Verifique o arquivo txt no GitHub."]; 
  });

if (drawBtn && noteCard && noteText) {
  drawBtn.addEventListener('click', () => {
    if (meusBilhetes.length === 0) {
      noteText.textContent = "Carregando...";
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
}

/* ============================================================
   CARROSSEL (ISUNITADAS)
   ============================================================ */
const isunitadasGallery = document.getElementById('isunitadas-gallery');
const QUANTIDADE_FOTOS_ISUNITADAS = 20;

if (isunitadasGallery) {
  for (let i = 1; i <= QUANTIDADE_FOTOS_ISUNITADAS; i++) {
    const img = document.createElement('img');
    img.src = `images/isu${i}.jpg`;
    img.onerror = () => img.src = `https://placehold.co/600x450/FAEDCD/3A5A40?text=isu${i}`;
    isunitadasGallery.appendChild(img);
  }

  let currentIndex = 0;
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  function updateCarousel() { 
    isunitadasGallery.style.transform = `translateX(-${currentIndex * 100}%)`; 
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= QUANTIDADE_FOTOS_ISUNITADAS) currentIndex = 0;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = QUANTIDADE_FOTOS_ISUNITADAS - 1;
    updateCarousel();
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
  }

  let autoPlay = setInterval(nextSlide, 3000);
  function resetAutoPlay() { 
    clearInterval(autoPlay); 
    autoPlay = setInterval(nextSlide, 3000); 
  }
}

/* ============================================================
   ROTEIRO
   ============================================================ */
const roadmapContainer = document.getElementById('roadmap-container');

function getSavedState() { 
  try { return JSON.parse(localStorage.getItem('roteiro-estado')) || {}; } 
  catch { return {}; } 
}
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

/* ============================================================
   FORMULÁRIO MEIA NOITE
   ============================================================ */
const midnightForm = document.getElementById('midnight-form');
const sendBtn = document.getElementById('send-btn');
const feedback = document.getElementById('midnight-feedback');
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgqkoev';

if (midnightForm) {
  midnightForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('secret-text').value.trim();
    if (!msg) return;
    
    sendBtn.disabled = true;
    if (feedback) {
      feedback.textContent = 'Enviando...';
      feedback.style.color = 'var(--ink)';
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json' }, 
        body: new FormData(midnightForm) 
      });
      if (response.ok) {
        if (feedback) { 
          feedback.textContent = 'Enviado! Seu segredo chegou até nós. 💌'; 
          feedback.style.color = 'var(--sage)';
        }
        midnightForm.reset();
      } else { 
        throw new Error(); 
      }
    } catch (err) {
      if (feedback) { 
        feedback.textContent = 'Erro ao enviar. Tente novamente.'; 
        feedback.style.color = 'var(--wine)';
      }
    } finally {
      sendBtn.disabled = false;
    }
  });
}
