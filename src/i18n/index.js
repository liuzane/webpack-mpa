// 方法
import { getStorage, setStorage } from '@/utils/local-storage';

export default class I18n {
  static language = '';
  static languageList = [
    {
      name: 'English',
      code: 'en',
    },
  
    {
      name: '简体中文',
      code: 'zh',
    }
  ];
  static messages = null;

  constructor(language) {
    const lang = this._getLanguage(language);
    this.loadMessages(lang);
    this.setLanguage(lang);
  }

  /**
   * Get the language code.
   * @param {string} language
   * @return {string}
   */
  _getLanguage(language) {
    let lang = language || getStorage('language') || window.navigator.language;
    if (typeof lang !== 'string') {
      return 'en';
    }
    lang = lang.split('-')[0];
    
    return lang;
  }

  /**
   * Verify the language code.
   * @param {string} language
   * @return {boolean}
   */
  verifyLanguage(language) {
    return this.getLanguageList().some(item => item.code === language);
  }

  /**
   * Load the message resource fille.
   * @param {string} language
   */
  loadMessages(language) {
    try {
      const messages = require(`./languages/${language}.json`);
      this.setMessages(messages);
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
    if (this.verifyLanguage(language)) {
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