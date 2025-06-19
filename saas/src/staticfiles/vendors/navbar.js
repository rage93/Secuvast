// Basic menu and dropdown toggles
 document.addEventListener('DOMContentLoaded', function () {
   document.querySelectorAll('[data-collapse-toggle]').forEach(function(btn) {
     btn.addEventListener('click', function() {
       const target = document.getElementById(btn.getAttribute('data-collapse-toggle'));
       if (target) target.classList.toggle('hidden');
     });
   });

   document.querySelectorAll('[data-dropdown-toggle]').forEach(function(btn) {
     btn.addEventListener('click', function(e) {
       e.preventDefault();
       const dropdown = document.getElementById(btn.getAttribute('data-dropdown-toggle'));
       if (dropdown) dropdown.classList.toggle('hidden');
     });
   });
 });
