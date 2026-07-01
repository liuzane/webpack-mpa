// i18n
import I18n from '@/i18n';

export default {
  install: (app) => {
    const i18n = new I18n();
    app.config.globalProperties.$verifyLanguageName = i18n.verifyLanguageName;
    app.config.globalProperties.$getAllMessages = i18n.getAllMessages;
    app.config.globalProperties.$setMessages = i18n.setMessages;
    app.config.globalProperties.$getLanguageList = i18n.getLanguageList;
    app.config.globalProperties.$getLanguage = i18n.getLanguage;
    app.config.globalProperties.$setLanguage = i18n.setLanguage;
    app.config.globalProperties.$getText = i18n.getText;
  }
};