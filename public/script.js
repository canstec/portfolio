(function () {
  const hotspots = document.querySelectorAll('.hotspot');
  if (!hotspots.length) return;

  const closeAll = () => {
    hotspots.forEach((b) => b.classList.remove('is-active'));
  };

  hotspots.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasActive = btn.classList.contains('is-active');
      closeAll();
      if (!wasActive) btn.classList.add('is-active');
    });
  });

  document.addEventListener('click', closeAll);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();

// Paginated "shipped features" section: dots toggle slide + image in sync
(function () {
  const dots = document.querySelectorAll('.shipped-dot');
  if (!dots.length) return;

  const slides = document.querySelectorAll('.shipped-slide');
  const images = document.querySelectorAll('.shipped-image');

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = dot.dataset.target;
      dots.forEach((d) => d.classList.toggle('is-active', d === dot));
      slides.forEach((s) => s.classList.toggle('is-active', s.dataset.slide === target));
      images.forEach((i) => i.classList.toggle('is-active', i.dataset.slide === target));
    });
  });
})();

// Delayed-loop videos: wait N ms after `ended` before restarting
(function () {
  const videos = document.querySelectorAll('video[data-loop-delay]');
  videos.forEach((video) => {
    const delay = parseInt(video.dataset.loopDelay, 10) || 0;
    video.addEventListener('ended', () => {
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, delay);
    });
  });
})();

// Concept pager: dots + arrows toggle between paginated images (scoped per instance)
(function () {
  const pagers = document.querySelectorAll('.concept-pager');
  if (!pagers.length) return;

  pagers.forEach((pager) => {
    const dots = pager.querySelectorAll('.concept-pager-dot');
    if (!dots.length) return;

    const images = pager.querySelectorAll('.concept-pager-image');
    const prev = pager.querySelector('.concept-pager-arrow--prev');
    const next = pager.querySelector('.concept-pager-arrow--next');

    const setActive = (target) => {
      dots.forEach((d) => d.classList.toggle('is-active', d.dataset.target === target));
      images.forEach((i) => i.classList.toggle('is-active', i.dataset.slide === target));
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => setActive(dot.dataset.target));
    });

    const step = (delta) => {
      const current = Array.from(dots).findIndex((d) => d.classList.contains('is-active'));
      const nextIdx = (current + delta + dots.length) % dots.length;
      setActive(dots[nextIdx].dataset.target);
    };

    if (prev) prev.addEventListener('click', () => step(-1));
    if (next) next.addEventListener('click', () => step(1));
  });
})();
