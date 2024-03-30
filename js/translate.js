const translate_content = (t) => {
    fetch("locales/links.json")
      .then(response => response.json())
      .then(links => {
        let i18nList = document.querySelectorAll('[data-i18n]');
        i18nList.forEach(element => {
            let translated_text = t(element.dataset.i18n, {links});
            element.innerHTML = translated_text;
            element.dataset.lg = i18next.language
        });
        configTyped()
    })
}

const translate_config = () => {
    i18next
    .use(i18nextHttpBackend)
    .init({
        lang: 'en',
        debug: false,
        fallbackLng: 'en',
        load:'unspecific',
        ns: ['translation'],
        defaultNs: 'translation',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
            cache: false
        }
    })
    .then((t) => translate_content(t));
}
  
const change_language = (element) => {
    i18next.changeLanguage(element.textContent.toLowerCase()).then((t) => translate_content(t))
    clean_language_buttons()
    active_language_button(element)
}
  
translate_config()