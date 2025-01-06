const switchers = document.querySelectorAll('.tabs-switcher');

if(switchers.length) {
  function getElem(sel, switcher) {
    return switcher.closest('.tabs').querySelector(`${sel}`);
  }
  
  switchers.forEach(switcher => {
    switcher.addEventListener('click', () => {
      const prevSwitcher = getElem('.tabs-switcher.active', switcher);

      if(prevSwitcher === switcher) return;
      
      prevSwitcher.classList.remove('active');
      switcher.classList.add('active');

      const prevContent = getElem(`[data-tab-content="${prevSwitcher.dataset.tab}"]`, switcher);
      prevContent.classList.remove('active');
      const nextContent = getElem(`[data-tab-content="${switcher.dataset.tab}"]`, switcher);
      nextContent.classList.add('active');
    });
  });
}
