<template>
  <div>
    <div>
      <ul id="menu">
        <li data-menuanchor="page1" class="active"><a href="#page1">首页</a></li>
        <li data-menuanchor="page2"><a href="#page2">版权认证</a></li>
        <li data-menuanchor="page3"><a href="#page3">DNA验证</a></li>
        <!--
        <li>
          <a href="https://github.com/HuTu92" target="_blank" rel="noopener" class="github">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-github"></use>
              </svg>
            </i>
          </a>
        </li>
        -->
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
          <dna-check></dna-check>
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
  import DnaCheck from 'src/pages/DNACheck';
  export default {
    mixins: [FullPageMixin],
    components: {
      FullPage,
      Particle,
      Index,
      CopyrCert,
      DnaCheck
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
