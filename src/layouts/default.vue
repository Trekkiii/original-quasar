<template>
  <div>
    <div>
      <ul id="menu">
        <li data-menuanchor="page1" class="active"><a href="#page1">首页</a></li>
        <li data-menuanchor="page2"><a href="#page2">版权认证</a></li>
        <li data-menuanchor="page3"><a href="#page3">文件验证</a></li>
        <li>
          <a href="https://twitter.com/imac2" target="_blank" rel="noopener" class="twitter-share">
            <i>
              <svg viewBox="0 0 512 512"><path d="M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z"></path></svg>
            </i>
          </a>
        </li>
      </ul>

      <full-page :options="options" @after-load="afterLoad" id="fullpage">
        <div class="section">
          <particle>
            <index></index>
          </particle>
        </div>
        <div class="section">
          <copyr-cert></copyr-cert>
        </div>
        <div class="section">
          <file-check></file-check>
        </div>
      </full-page>
      <div class="footer">

      </div>
    </div>
  </div>
</template>

<script>
  import FullPage from 'src/components/vue-fullpage.js/fullpage';
  import FullPageMixin from 'src/components/vue-fullpage.js/fullpage_mixin';
  import Particle from 'src/components/canvas/Particle';
  import Index from 'src/pages/index';
  import CopyrCert from 'src/pages/CopyrCert';
  import FileCheck from 'src/pages/FileCheck';
  export default {
    mixins: [FullPageMixin],
    components: {
      FullPage,
      Particle,
      Index,
      CopyrCert,
      FileCheck
    },
    data() {
      return {
        options: {
          afterLoad: this.afterLoad,
          scrollBar: false,
          menu: '#menu',
          navigation: true,
          anchors: ['page1', 'page2', 'page3'],
          sectionsColor: ['#41b883', '#1bcee6', '#0798ec', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
        },
      }
    },
    methods: {
      afterLoad() {
        console.log("Emitted 'after load' event.");
      }
    },
  }
</script>

<style scoped>
  .footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 70;
    width: 100%;
    height: 100px;
    background-color: inherit
  }
</style>
