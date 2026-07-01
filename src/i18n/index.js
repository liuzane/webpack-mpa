// 方法
import { getStorage, setStorage } from '@/utils/local-storage';

export default class I18n {
  static language = '';
  static languageList = [
    {
      name: 'English',
      code: 'en-US',
    },
  
    {
      name: '简体中文',
      code: 'zh-CN',
    }
  ];
  static messages = null;

  constructor(language) {
    const lang = language || getStorage('language') || window.navigator.language;
    if (this.verifyLanguageName(lang)) {
      this.loadMessages(lang);
      this.setLanguage(lang);
    }
  }

  /**
   * Verify the language name is correct.
   * @param {string} language
   * @return {boolean>}
   */
  verifyLanguageName(language) {
    return /[a-z]{2}-[A-Z]{2}/.test(language);
  }

  /**
   * Load the message resource fille.
   * @param {string} language
   */
  loadMessages(language) {
    try {
      const messages = require(`./languages/${language}.json`);
      I18n.prototype.setMessages(messages);
    } catch (error) {
      console.error('Load the language json failed', error);
    }
  }

  /**
   * Get the all message resource.
   * @return {{ [key: string]: string; }>}
   */
  getAllMessages() {
    return I18n.messages;
  }

  /**
   * Set the message resource.
   * @param {{ [key: string]: string; }} messages
   */
  setMessages(messages) {
    I18n.messages = messages;
  }

  /**
   * Get language list with name and code.
   * @return {Array<{ name: string; code: string }>}
   */
  getLanguageList() {
    return I18n.languageList;
  }

  /**
   * Get the local language.
   * @param {string} language
   */
  getLanguage() {
    return I18n.language;
  }

  /**
   * Setting the local language.
   * @param {string} language
   */
  setLanguage(language) {
    if (I18n.prototype.verifyLanguageName(language)) {
      I18n.language = language;
      setStorage('language', language);
    }
  }

  /**
   * Get the translate text by message key
   * @param {string} key
   * @return {string}
   */
  getText(key) {
    return I18n.messages[key] || key;
  }
}