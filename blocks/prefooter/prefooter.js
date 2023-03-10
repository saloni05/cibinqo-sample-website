import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The pre-footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const prefooterPath = cfg.prefooter || '/prefooter';
  const resp = await fetch(`${prefooterPath}.plain.html`, window.location.pathname.endsWith('/prefooter') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const prefooter = document.createElement('div');
    prefooter.innerHTML = html;

    decorateIcons(prefooter);
    block.append(prefooter);
  }
}
