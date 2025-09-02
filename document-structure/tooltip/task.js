'use strict';

const tooltipLinks = document.querySelectorAll('.has-tooltip');

for (const link of tooltipLinks) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.innerText = link.title;
  tooltip.dataset.position = link.dataset.position || 'bottom';

  link.style.position = 'relative';
  link.appendChild(tooltip);

  link.addEventListener('click', function (e) {
    e.preventDefault();

    const prevTooltip = document.querySelector('.tooltip_active');
    if (prevTooltip && prevTooltip !== tooltip) {
      prevTooltip.classList.remove('tooltip_active');
    }

    if (tooltip.classList.contains('tooltip_active')) {
      tooltip.classList.remove('tooltip_active');
      return;
    }

    tooltip.classList.add('tooltip_active');

    tooltip.style.top = '';
    tooltip.style.left = '';

    const tooltipRect = tooltip.getBoundingClientRect();

    switch (tooltip.dataset.position) {
      case 'left':
        tooltip.style.top = '0';
        tooltip.style.left = -tooltipRect.width + 'px';
        break;
      case 'right':
        tooltip.style.top = '0';
        tooltip.style.left = link.offsetWidth + 'px';
        break;
      case 'top':
        tooltip.style.top = -tooltipRect.height + 'px';
        tooltip.style.left = '0';
        break;
      default:
        tooltip.style.top = link.offsetHeight + 'px';
        tooltip.style.left = '0';
    }
  });
}
