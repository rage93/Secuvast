(function () {
  'use strict';

  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('drawer-backdrop');
  var buttons = document.querySelectorAll('[data-drawer-toggle="sidebar"]');

  // ensure correct icon state on load
  toggleIcons(!sidebar.classList.contains('-translate-x-full'));

  function toggleIcons(isOpen) {
    buttons.forEach(function (btn) {
      var icons = btn.querySelectorAll('svg');
      if (icons.length < 2) return;
      icons[0].classList.toggle('hidden', isOpen);
      icons[1].classList.toggle('hidden', !isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    });
  }

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('-translate-x-full');
    backdrop && backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    toggleIcons(true);
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('-translate-x-full');
    backdrop && backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    toggleIcons(false);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (sidebar.classList.contains('-translate-x-full')) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });
  });

  backdrop && backdrop.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
      closeSidebar();
    }
  });

  // Collapse items
  document.querySelectorAll('[data-collapse-toggle]').forEach(function (btn) {
    var targetId = btn.getAttribute('data-collapse-toggle');
    var target = document.getElementById(targetId);
    if (!target) return;
    var arrow = btn.querySelector('svg:last-of-type');

    // set initial state
    var isHidden = target.classList.contains('hidden');
    if (arrow) {
      arrow.classList.add('transition-transform');
      arrow.classList.toggle('rotate-180', !isHidden);
    }
    btn.setAttribute('aria-expanded', !isHidden);


    btn.addEventListener('click', function () {
      isHidden = target.classList.toggle('hidden');
      if (arrow) {


    btn.addEventListener('click', function () {
      isHidden = target.classList.toggle('hidden');
      if (arrow) {

        arrow.classList.add('transition-transform');


        arrow.classList.toggle('rotate-180', !isHidden);
      }
      btn.setAttribute('aria-expanded', !isHidden);
    });
  });
})();
