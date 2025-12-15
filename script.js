document.addEventListener("DOMContentLoaded", () => {
  // Año
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menú móvil
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  navToggle?.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks?.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") navLinks.classList.remove("open");
  });

  // Indicador de scroll + fondo parallax suave
  const bar = document.getElementById("scrollBar");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const p = docH > 0 ? (scrollTop / docH) * 100 : 0;
    if (bar) bar.style.width = `${p}%`;

    const orb1 = document.querySelector(".bg-orb-1");
    const orb2 = document.querySelector(".bg-orb-2");
    orb1 && (orb1.style.transform = `translate3d(0, ${scrollTop * 0.04}px, 0)`);
    orb2 && (orb2.style.transform = `translate3d(0, ${scrollTop * 0.025}px, 0)`);
  }, { passive: true });

  // Reveal al aparecer
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("in");
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Datos (subservicios)
  const SERVICE_DATA = {
    construccion: {
      c1: {
        title: "Construcción de viviendas",
        desc: "Ejecución integral de viviendas: planificación, cubicación, faenas por etapas, coordinación de especialidades y terminaciones según estándar definido.",
        list: ["Cubicación y programación de obra", "Estructura y envolvente (según proyecto)", "Instalaciones y terminaciones controladas"]
      },
      c2: {
        title: "Construcción de chalets",
        desc: "Desarrollo de viviendas tipo chalet con foco en aislación, eficiencia térmica, estructura segura y terminaciones arquitectónicas de mayor detalle.",
        list: ["Soluciones térmicas y ventilación", "Detalles en fachadas/aleros", "Optimización de distribución y confort"]
      },
      c3: {
        title: "Zonas de difícil acceso",
        desc: "Planificación logística y ejecución con herramientas inalámbricas de alto rendimiento, para faenas eficientes en terrenos complejos o con acceso limitado.",
        list: ["Herramientas inalámbricas de larga duración", "Transporte de materiales planificado", "Ejecución por hitos y control de avance"]
      },
      c4: {
        title: "Obras civiles menores y mayores",
        desc: "Radieres, fundaciones, muros, nivelaciones, bases y soluciones estructurales según necesidades del proyecto y condiciones del terreno.",
        list: ["Fundaciones y radieres", "Muros/contenciones (según caso)", "Drenajes y preparación de terreno"]
      },
      c5: {
        title: "Construcción industrial ligera",
        desc: "Estructuras ligeras y soluciones modulares para bodegas, talleres o recintos productivos, con montaje ágil y posibilidad de ampliación.",
        list: ["Diseño ampliable", "Montaje rápido y ordenado", "Soluciones prácticas según uso"]
      }
    },

    remodelacion: {
      r1: { title:"Remodelación de casas", desc:"Modernización total o parcial: recintos, terminaciones, instalaciones y mejoras funcionales para elevar confort y valor de la vivienda.", list:["Renovación de recintos clave", "Reparaciones y mejoras estructurales menores", "Terminaciones modernas"] },
      r2: { title:"Locales comerciales", desc:"Adecuación de espacios para atención al público: distribución, terminaciones, flujo y soluciones según rubro.", list:["Optimización de distribución", "Terminaciones resistentes", "Mejoras de fachada/imagen"] },
      r3: { title:"Ampliaciones habitacionales", desc:"Aumento de superficie construida con coordinación de especialidades y terminaciones integradas al proyecto original.", list:["Anteproyecto + ejecución", "Estructura y cierres", "Terminaciones y ajustes finales"] },
      r4: { title:"Mejoras interiores", desc:"Renovación interior: revestimientos, tabiquería, pisos, pintura, iluminación y correcciones para un resultado limpio y moderno.", list:["Pisos y revestimientos", "Yeso/cartón y pintura", "Iluminación y detalles"] },
      r5: { title:"Mejoras exteriores", desc:"Soluciones exteriores: terrazas, cierres, fachadas, accesos y protecciones climáticas con terminación profesional.", list:["Fachadas y revestimientos", "Terrazas y accesos", "Protección y durabilidad"] }
    },

    arquitectura: {
      a1: { title:"Planos arquitectónicos", desc:"Planos completos y claros para construir con precisión: plantas, elevaciones, cortes y detalles según alcance del proyecto.", list:["Plantas / cortes / elevaciones", "Detalles constructivos", "Especificación general"] },
      a2: { title:"Render 3D y maquetas digitales", desc:"Visualización realista del proyecto antes de construir para definir estilos, materiales y decisiones de diseño.", list:["Modelado 3D", "Imágenes realistas", "Ajustes con el cliente"] },
      a3: { title:"Proyectos completos", desc:"Desarrollo integral: propuesta, anteproyecto, proyecto y coordinación con especialidades según el caso.", list:["Definición del programa", "Proyecto arquitectónico", "Coordinación de especialidades"] },
      a4: { title:"Regularizaciones municipales", desc:"Levantamiento y documentación para dejar el inmueble en regla, preparando expedientes y planos según requerimiento municipal.", list:["Revisión y levantamiento", "Documentación", "Tramitación"] },
      a5: { title:"Permisos de obra nueva/ampliación", desc:"Gestión y preparación de antecedentes para permisos, con acompañamiento durante el proceso según exigencias.", list:["Requisitos y carpeta", "Planos y documentos", "Seguimiento del proceso"] }
    },

    paisajismo: {
      p1: { title:"Diseño de áreas verdes", desc:"Propuestas funcionales y estéticas para exteriores, considerando asoleamiento, riego y mantenimiento.", list:["Zonificación y circulación", "Selección vegetal", "Soluciones de riego"] },
      p2: { title:"Instalación de jardines", desc:"Ejecución y montaje con terminación prolija: preparación de terreno, plantación y terminaciones.", list:["Preparación de terreno", "Plantación", "Terminaciones y nivelación"] },
      p3: { title:"Obras exteriores", desc:"Terrazas, accesos, jardineras, soluciones de drenaje y mejoras exteriores.", list:["Terrazas y senderos", "Jardineras y cierres", "Drenajes y pendientes"] }
    },

    inmobiliario: {
      i1: { title:"Casas para venta directa", desc:"Construcción de viviendas para comercialización con estándar moderno y terminaciones definidas.", list:["Estándar moderno", "Terminaciones", "Entrega lista para habitar"] },
      i2: { title:"Proyectos en verde", desc:"Desarrollo de proyectos en verde con terrenos urbanizados y rol propio.", list:["Planificación", "Propuesta", "Ejecución"] },
      i3: { title:"Terreno + diseño", desc:"Presentamos el terreno y propuestas arquitectónicas/diseño para iniciar desde cero.", list:["Propuestas", "Opciones de estilo", "Cubicación"] },
      i4: { title:"Cliente participa desde cero", desc:"Distribuciones, terminaciones y estilo definidos contigo. Acompañamiento completo durante el proceso.", list:["Definición de programa", "Elección de terminaciones", "Acompañamiento total"] }
    }
  };

  // (Opcional) imagen por subservicio:
  // Si subes assets/services/construccion_c1.jpg, construccion_c2.jpg, etc., se usará automáticamente.
  function tryUpdateServiceImage(item, serviceKey, tabKey) {
    const img = item.querySelector(".service-img");
    if (!img) return;

    const candidate = `assets/services/${serviceKey}_${tabKey}.jpg`;
    const test = new Image();
    test.onload = () => (img.src = candidate);
    test.onerror = () => { /* se mantiene la base */ };
    test.src = candidate;
  }

  function renderServiceContent(item, serviceKey, tabKey) {
    const data = SERVICE_DATA?.[serviceKey]?.[tabKey];
    if (!data) return;

    const container = document.getElementById(`${serviceKey}Text`);
    if (!container) return;

    container.innerHTML = `
      <h4>${escapeHtml(data.title)}</h4>
      <p>${escapeHtml(data.desc)}</p>
      <ul>${data.list.map(li => `<li>${escapeHtml(li)}</li>`).join("")}</ul>
    `;

    tryUpdateServiceImage(item, serviceKey, tabKey);
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }

  // Accordion servicios (solo uno abierto a la vez)
  const items = document.querySelectorAll(".service-item");
  items.forEach((item) => {
    const head = item.querySelector(".service-head");
    const body = item.querySelector(".service-body");

    head.addEventListener("click", () => {
      const opening = !item.classList.contains("open");

      items.forEach((it) => {
        if (it !== item) {
          it.classList.remove("open");
          const b = it.querySelector(".service-body");
          const h = it.querySelector(".service-head");
          if (b) b.hidden = true;
          if (h) h.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("open", opening);
      head.setAttribute("aria-expanded", String(opening));
      body.hidden = !opening;

      // scroll suave hacia el servicio al abrir (mejor UX)
      if (opening) {
        const y = item.getBoundingClientRect().top + window.scrollY - 92;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });

    // Tabs internos
    const tabs = item.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const serviceKey = item.dataset.service;
        const tabKey = tab.dataset.tab;
        renderServiceContent(item, serviceKey, tabKey);
      });
    });

    // Render inicial por servicio
    const firstTab = item.querySelector(".tab.active");
    if (firstTab) renderServiceContent(item, item.dataset.service, firstTab.dataset.tab);
  });

  // Galería modal
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.getElementById("modalClose");

  document.querySelectorAll(".gitem").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-full");
      modalImg.src = src;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  };

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // Formulario
  const form = document.getElementById("quote-form");
  const msg = document.getElementById("form-message");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const servicio = form.servicio.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !telefono || !servicio || !mensaje) {
      msg.textContent = "Completa todos los campos para enviar tu cotización.";
      msg.style.color = "var(--bad)";
      return;
    }
    msg.textContent = "¡Listo! Recibimos tu solicitud. Te contactaremos a la brevedad.";
    msg.style.color = "var(--ok)";
    form.reset();
  });
});
