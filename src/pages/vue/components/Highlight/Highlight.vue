<template>
  <figure :class="['highlight', language]">
    <span class="highlight-language">{{ language }}</span>
    <pre class="highlight-code"><code v-html="html"></code></pre>
  </figure>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 配置highlight.js
hljs.configure({
  tabReplace: '  ',
  classPrefix: 'hljs-',
});

export default {
  name: 'Highlight',
  props: {
    language: {
      type: String,
      default: 'jsx',
    },
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      html: '',
    };
  },
  mounted() {
    this.setLanguageHTML();
  },
  watch: {
    code() {
      this.setLanguageHTML();
    },
    language() {
      this.setLanguageHTML();
    },
  },
  methods: {
    setLanguageHTML() {
      const { language, code } = this;
      this.html = hljs.highlight(language, code.replace(/^\s+|\s$/g, '')).value;
    },
  },
};
</script>

<style>
.highlight {
  margin: 0;
  border: 1px solid #e1e1e1;
  border-radius: 2px;
  line-height: 1.1em;
  background-color: #f8f8f8;
  position: relative;
  font-size: 12px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"!important;
}

.highlight-language {
  position: absolute;
  top: 0;
  right: 0;
  color: #ccc;
  text-align: right;
  font-size: .75em;
  padding: 5px 10px 0;
  line-height: 15px;
  height: 15px;
  font-weight: 100;
}

.highlight-code {
  padding: 1em;
  line-height: 1.5em;
  margin: 0;
}
</style>