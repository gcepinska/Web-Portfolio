'use strict';

const btnNav = document.querySelector('.btn-mobile-nav');
const btnOpenInfo = document.querySelectorAll('.btn_info');
const modals = document.querySelectorAll('.modal');
const infoOverlay = document.querySelector('.info-overlay');
const btnCloseInfo = document.querySelector('.close-info');
const nav = document.querySelector('.nav');
const sectionAbout = document.querySelector('.section-about');
const sectionInvestments = document.querySelector('.section-investments');
const experienceInfo = document.querySelector('.experience-full');
const btnOpenWorkInfo = document.querySelectorAll('.open-btn');
const btnCloseWorkInfo = document.querySelectorAll('.close-btn');
const header = document.querySelector('.header');

///// Sticky Navigation

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const sectionAboutObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
sectionAboutObserver.observe(sectionAbout);

///// Mobile Navigation

btnNav.addEventListener('click', function () {
  nav.classList.toggle('nav-open');
});

///// Navigation - Scroll to sections

document
  .querySelector('.main-nav-list')
  .addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('main-nav-link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }

    if (e.target.classList.contains('main-nav-link')) {
      nav.classList.toggle('nav-open');
    }
  });




///// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('main-nav-link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.main-nav-link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///// Modals windows with info about projects
function showModal(id) {
  const m = document.getElementById(id);
  m.classList.remove('hidden');
  infoOverlay.classList.remove('hidden');
}

const hideModals = function () {
  modals.forEach(m => {
    m.classList.add('hidden');
    infoOverlay.classList.add('hidden');
  });
};

btnOpenInfo.forEach(btn => {
  btn.addEventListener('click', e => {
    hideModals;
    showModal(btn.dataset.modal);
  });
});

modals.forEach(m => {
  const btnCloseInfo = m.querySelector('.close-info');
  btnCloseInfo.addEventListener('click', hideModals);
  infoOverlay.addEventListener('click', hideModals);
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    hideModals();
  }
});

///// Opening full information about experience

const showMoreWork = function (id) {
  const w = document.getElementById(id);
  w.classList.remove('hidden');
  const b = document
    .querySelectorAll('[data-btn="' + id + '"]')
    .forEach(btn => btn.classList.toggle('hidden'));
};

btnOpenWorkInfo.forEach(btn => {
  btn.addEventListener('click', e => {
    showMoreWork(btn.dataset.btn);
  });
});

const closeMoreWork = function (id) {
  const w = document.getElementById(id);
  w.classList.add('hidden');
  const b = document
    .querySelectorAll('[data-btn="' + id + '"]')
    .forEach(btn => btn.classList.toggle('hidden'));
};

btnCloseWorkInfo.forEach(btn => {
  btn.addEventListener('click', e => {
    closeMoreWork(btn.dataset.btn);
  });
});

///// Tabbed component
const tabs = document.querySelectorAll('.slide_tab');
const tabsContainer = document.querySelector('.slide-container-tab');
const tabsContent = document.querySelectorAll('.slide_content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.slide_tab');

  if (clicked) {
    tabs.forEach(t => t.classList.remove('slide_tab-active'));
    clicked.classList.add('slide_tab-active');

    tabsContent.forEach(c => c.classList.remove('slide_content--active'));

    document
      .querySelector(`.slide_content--${clicked.dataset.tab}`)
      .classList.add('slide_content--active');
  }
});

////// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});
