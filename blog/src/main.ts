import { createApp } from 'vue'
import VMdEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(VMdEditor).use(VMdPreview).use(ElementPlus).use(store).use(router).mount('#app')
VMdEditor.use(githubTheme, {
    Hljs: hljs,
  });

VMdPreview.use(githubTheme);