<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-7">
        <h2>版权认证</h2>
        <h3>文件写入需要约10秒的时间，文件并不会被平台存储，仅用于计算验证其未被做任何更改
          请您将原件妥善保存，验证时将要求再次写入文件</h3>
        <cert-file-uploader v-if="!forDetails" @forDetailsEvent="forDetailsHandler"></cert-file-uploader>
        <div v-if="forDetails" class="evidence">
          <div class="container">
            <div class="row justify-content-md-center details-header">
              <div class="col align-self-start title">
                认证详情
              </div>
              <div class="col align-self-end goback">
                <svg class="icon icon-goback" aria-hidden="true" @click="gobackHandler">
                  <use xlink:href="#icon-goback"></use>
                </svg>
              </div>
            </div>
            <div class="row justify-content-md-center">
              <div class="col-md-12">
                <div class="details-bs-info">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-3 name">
                        文件名：
                      </div>
                      <div class="col-md-9 value">
                        {{detailInfo.title}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 name">
                        用户ID：
                      </div>
                      <div class="col-md-9 value">
                        {{detailInfo.userId}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 name">
                        更新时间：
                      </div>
                      <div class="col-md-9 value">
                        {{detailInfo.uploadTime}}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 name">
                        DNA：
                      </div>
                      <div class="col-md-9 value">
                        {{detailInfo.dna.slice(0, 8)}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-md-center">
              <div class="col-md-12">
                <div class="details-sg-info">
                  <div class="name">完整DNA</div>
                  <div class="value">
                    {{detailInfo.dna}}
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-md-center">
              <div class="col-md-12">
                <div class="details-sg-info">
                  <div class="name">事务ID</div>
                  <div class="value">
                    {{detailInfo.txId}}
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-md-center">
              <div class="col-md-12">
                <div class="details-sg-info">
                  <div class="name">签名</div>
                  <div class="value">
                    {{detailInfo.signature}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import CertFileUploader from 'src/components/fileuploader/CertFileUploader'

  export default {
    name: 'CopyrCert',
    components: {
      CertFileUploader
    },
    data () {
      return {
        'forDetails': false,
        'detailInfo': {}
      }
    },
    methods: {
      forDetailsHandler (e) {
        this.forDetails = e.forDetails
        this.detailInfo = e.detailInfo
      },
      gobackHandler () {
        this.forDetails = false
        this.detailInfo = {}
      }
    }
  }
</script>

<style scoped>

  .evidence {
    font-size: 14px;
    margin: 10px auto;
    display: block;
    padding: 10px 10px;
    border-radius: 2px 2px 2px 2px;
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
    box-shadow: 0 10px 6px -6px #777;
    background: #ffffff;
  }

  .details-bs-info {
    margin: 10px auto;
    display: block;
    padding: 5px 5px;
    border-radius: 2px 2px 2px 2px;
    background-color: #f6f8f8
  }

  .details-bs-info .name {
    color: #666;
  }

  .details-sg-info .value {
    margin: 10px auto;
    display: block;
    padding: 5px 15px;
    border-radius: 2px 2px 2px 2px;
    background-color: #f6f8f8;
    font-size: 12px;
    color: #666;
    word-break: break-all;
  }

  .details-header {
    border-bottom: 1px solid #e8eaea;
    padding-bottom: 5px;
    font-size: 18px;
    color: #222;
  }

  .details-header .title {
    text-align: left;
  }

  .details-header .goback {
    text-align: right;
  }

  .details-header .icon-goback {
    cursor: pointer;
  }

  h1 {
    position: relative;
    color: #EEEEEE;
    font-weight: 600;
    font-size: 40px;
    padding: 0;
    margin-bottom: 50px;
    line-height: 1;
    text-shadow: 0 0 30px #0798ec;
    text-align: center;
  }

  h2 {
    font-weight: 400;
    font-size: 22px;
    padding: 0;
    margin: 10px;
    line-height: 1;
    color: #EEEEEE;
    letter-spacing: 2px;
    text-shadow: 0 0 30px #0798ec;
    text-align: center;
  }

  h3 {
    font-weight: 400;
    font-size: 14px;
    padding: 0;
    margin: 10px;
    line-height: 1;
    color: #fff;
    letter-spacing: 2px;
    text-shadow: 0 0 30px #0798ec;
    text-align: center;
  }
</style>
