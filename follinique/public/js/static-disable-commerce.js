(function () {
  var message = 'This is a static HTML preview. Checkout, cart, payment, and order tracking require the original PHP backend.';
  var clickableSelector = [
    '#add_to_cart_product_1',
    '#add_to_cart_product_2',
    '#add_to_cart_product_3',
    '#add_to_cart_product_4',
    '#value_1',
    '#value_2',
    '#value_3',
    '#value_4',
    '#track_order',
    '.checkout',
    '.cart .header-icon',
    '.cart-checkout-btn a'
  ].join(',');

  function isDisabledTarget(element) {
    if (!element || !element.closest) return null;
    return element.closest(clickableSelector);
  }

  document.addEventListener('click', function (event) {
    var target = isDisabledTarget(event.target);
    if (!target) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    alert(message);
    return false;
  }, true);

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var items = document.querySelectorAll(clickableSelector);
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('href', 'javascript:void(0);');
      items[i].setAttribute('title', message);
      items[i].classList.add('static-disabled-action');
    }

    var forms = document.querySelectorAll('form');
    for (var j = 0; j < forms.length; j++) {
      forms[j].addEventListener('submit', function (event) {
        event.preventDefault();
        alert(message);
        return false;
      });
    }

    var notification = document.querySelectorAll('.cart-notification');
    for (var k = 0; k < notification.length; k++) notification[k].textContent = '0';
  });
})();
