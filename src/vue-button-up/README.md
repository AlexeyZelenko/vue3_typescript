<snippet>
  <content>
  
##  [vue-button-up](https://github.com/AlexeyZelenko/vue3_typescript/tree/master/src/vue-button-up) with Vue3 and Vue2.

<p align="center">
    <a href="https://www.npmjs.com/package/vue-button-up">
      <img alt="codebeat badge" src="https://img.shields.io/badge/version-1.1.0%20-44cc11.svg" />
    </a>
    <a href="https://www.npmjs.com/package/tiptap-vuetify">
      <img alt="codebeat badge" src="https://img.shields.io/badge/license-ISC%20-44cc11.svg" />
    </a>
    <a href="https://standardjs.com/">
      <img alt="codebeat badge" src="https://badgen.net/badge/code%20style/standard/f2a" />
    </a>
    <a href="https://www.npmjs.com/package/tiptap-vuetify">
      <img alt="codebeat badge" src="https://img.shields.io/badge/size-5%20kB-44cc11.svg" />
    </a>
  </p>
  
  Button with the functionality of scrolling the page up for Vue.
  [DEMO on codesanbox](https://codesandbox.io/s/vue-button-up-dcvnc)
  
  ## Navigation  
  <!-- TOC -->
  
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#Usage)
  <!-- /TOC -->
  
  ## Features
  
  - used vue2, vue3
  - easy to install
  - Easy application
  - Using slot
  - Use with icons, images, by default
  - Possibility to work on the button design
 
  
  ## Installation
  
    ```
     npm install --save vue-button-up
    ```

## Usage
 #default
```
<VuejsHelloApp>
    <template #default>
      <p>↑</p>
    </template>
  </VuejsHelloApp>

<script>
    import VuejsHelloApp from 'vue-button-up'
    
export default {
  components: {
    VuejsHelloApp
  }
}
</script>
``` 
 #images
```
<VuejsHelloApp>
    <template #default>
        <img
         :src="require(`@/assets/img/buttonTop.png`)"
        >
    </template>
</VuejsHelloApp>

<script>
    import VuejsHelloApp from 'vue-button-up'
    
export default {
  components: {
    VuejsHelloApp
  }
}
</script>
```

></content>
><tabTrigger>readme</tabTrigger>
</snippet>