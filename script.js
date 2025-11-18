/* script.js
 - Countdown timer + simple reveal on scroll
 - Ganti `PROMO_END` ke tanggal target promo kamu (format ISO 8601).
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ========== 1) Countdown Timer ========== */
  // Set target date/time here (ISO format). Ganti sesuai kebutuhan.
  const PROMO_END = '2025-12-31T23:59:59'; // contoh: 31 Des 2025 23:59:59
  const endTime = new Date(PROMO_END).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = Date.now();
    let diff = Math.max(0, endTime - now);

    if (diff <= 0) {
      // Promo selesai
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      // Optionally change UI
      const countdownLabel = document.querySelector('.countdown-label');
      if (countdownLabel) countdownLabel.textContent = 'Promo telah berakhir';
      clearInterval(countdownInterval);
      return;
    }

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / (3600 * 24));
    const hours = Math.floor((sec % (3600 * 24)) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // initial + interval
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  /* ========== 2) Reveal on Scroll (IntersectionObserver) ========== */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // if you want only once: unobserve
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

  /* ========== 3) Mobile nav toggle ========== */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', () => {
    if (!nav) return;
    if (nav.style.display === 'flex') {
      nav.style.display = '';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
    }
  });

  /* ========== 4) Update footer year dynamically ========== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ========== 5) Optional: Smooth scroll for anchor links ========== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  /* ===========================
     6) MODAL PRODUK
  =========================== */

  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalWA = document.getElementById("modalWA");
  const modalClose = document.querySelector(".modal-close");

  // Data detail produk (bisa kamu edit sesuka hati)
  const produkData = {
    virginia: {
      title: "Tembakau Virginia",
      img: "https://javatobacco.com/wp-content/uploads/2025/07/ChatGPT-Image-Jul-15-2025-01_25_25-PM.jpg",
      desc: "Tembakau Virginia berwarna kuning keemasan, rasa manis, dan aroma ringan. Cocok untuk rokok putih, pipe tobacco, dan blend premium.",
      wa: "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20order%20Tembakau%20Virginia"
    },
    burley: {
      title: "Tembakau Burley",
      img: "https://www.esta.be/wp-content/uploads/2017/07/Burley-Tobacco-1.0-2.jpg",
      desc: "Tembakau Burley memiliki warna coklat muda hingga gelap, rasa earthy, dan sangat cocok untuk kretek serta campuran blend.",
      wa: "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20order%20Tembakau%20Burley"
    },
    oriental: {
      title: "Tembakau Oriental",
      img: "https://assets-a1.kompasiana.com/items/album/2023/09/18/tembakau-650876ea08a8b516aa7ad882.jpg",
      desc: "Tembakau Oriental memiliki aroma khas, profil pahit-manis seimbang, dan sering digunakan sebagai pelengkap blend berkualitas.",
      wa: "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20order%20Tembakau%20Oriental"
    }
  };

  // Event pada tombol "Lihat Detail"
  document.querySelectorAll(".btn-outline").forEach(btn => {
    btn.addEventListener("click", function () {
      const product = this.closest(".card").querySelector("h3").textContent.trim().toLowerCase();

      // Cocokkan dengan data
      let key = "";
      if (product.includes("virginia")) key = "virginia";
      if (product.includes("burley")) key = "burley";
      if (product.includes("oriental")) key = "oriental";

      const item = produkData[key];
      if (!item) return;

      modalImg.src = item.img;
      modalTitle.textContent = item.title;
      modalDesc.textContent = item.desc;
      modalWA.href = item.wa;

      modal.style.display = "flex";
    });
  });

  // Tutup modal
  modalClose.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

});
