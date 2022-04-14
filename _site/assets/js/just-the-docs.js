// Event handling

function addEvent(el, type, handler) {
    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
}
function removeEvent(el, type, handler) {
    if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
}

// Show/hide mobile menu

function toggleNav(){
  const nav = document.querySelector('.js-main-nav');
  const navTrigger = document.querySelector('.js-main-nav-trigger');

  addEvent(navTrigger, 'click', function(){
    var text = navTrigger.innerText;
    var textToggle = navTrigger.getAttribute('data-text-toggle');

    nav.classList.toggle('nav-open');
    navTrigger.classList.toggle('nav-open');
    navTrigger.innerText = textToggle;
    navTrigger.setAttribute('data-text-toggle', text);
    textToggle = text;
  })
}

// Document ready

function ready(){
  toggleNav();
}

// in case the document is already rendered
if (document.readyState!='loading') ready();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
// IE <= 8
else document.attachEvent('onreadystatechange', function(){
    if (document.readyState=='complete') ready();
});
