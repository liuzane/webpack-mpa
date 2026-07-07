// i18n
import I18n from '@/i18n';

export default {
  install: (app) => {
    const i18n = new I18n();
    app.config.globalProperties.$verifyLanguage = i18n.verifyLanguage.bind(i18n);
    app.config.globalProperties.$getAllMessages = i18n.getAllMessages.bind(i18n);
    app.config.globalProperties.$setMessages = i18n.setMessages.bind(i18n);
    app.config.globalProperties.$getLanguageList = i18n.getLanguageList.bind(i18n);
    app.config.globalProperties.$getLanguage = i18n.getLanguage.bind(i18n);
    app.config.globalProperties.$setLanguage = i18n.setLanguage.bind(i18n);
    app.config.globalProperties.$getText = i18n.getText.bind(i18n);
  }
};