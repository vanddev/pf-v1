const configTyped = () => {
    if (typeof currentTyped !== 'undefined') {
      currentTyped.destroy()
    }
    currentTyped = new Typed('#typed', {
      strings: [i18next.t('hero.catchphrase') ],
      typeSpeed: 70,
      showCursor: false
    });
}