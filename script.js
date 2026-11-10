// Menú: transparente arriba, sólido al bajar
const header = document.querySelector('.site-header');

function actualizarMenu() {
  // Con más de 40px de scroll, se activa el estado sólido
  header.classList.toggle('is-scrolled', window.scrollY > 40);
}

actualizarMenu(); // por si la página se recarga ya scrolleada
window.addEventListener('scroll', actualizarMenu, { passive: true });
// Aparición con desenfoque al hacer scroll
const sinAnimacion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!sinAnimacion && 'IntersectionObserver' in window) {
  // Qué elementos se animan: títulos y textos de cada sección, tarjetas y pasos
  const elementos = document.querySelectorAll(
    '.section .container > *:not(.cards-3):not(.steps), .card, .steps li'
  );

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target); // se anima una sola vez
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  elementos.forEach((el) => {
    el.classList.add('reveal');
    // Tarjetas y pasos entran escalonados, uno después del otro
    if (el.matches('.card, .steps li')) {
      const posicion = [...el.parentElement.children].indexOf(el);
    el.style.transitionDelay = posicion * 70 + 'ms';    }
    observador.observe(el);
  });
}