<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-7">
        <div class="container header">
          <div class="row justify-content-md-center">
            <i class="col col-md-2 left"></i>
            <h2 class="col col-md-3">DNA验证</h2>
            <i class="col col-md-2 right"></i>
          </div>
        </div>
        <div class="imges">
          <img src="../statics/dna-check.png">
        </div>
        <div v-if="!isDNACheckSucc">
          <div class="dna">
            <input ref="dna" type="text" name="dna" placeholder="请输入认证的DNA" />
          </div>
          <div class="btns">
            <input type="button" class="btn btn-warning" value="DNA验证" v-if="!isDNACheckSucc"
                   @click="dnaCheckHandler"/>
          </div>
        </div>
        <div v-if="isDNACheckSucc" class="evidence">
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
</template>

<script>
  export default {
    name: 'DNACheck',
    components: {
    },
    data () {
      return {
        isDNACheckSucc: false,
        'detailInfo': {}
      }
    },
    methods: {
      gobackHandler () {
        this.isDNACheckSucc = false
      },
      dnaCheckHandler () {
        let dna = this.$refs.dna;
        let value = dna.value

        // axios发送请求之前先禁用提交按钮，防止重复提交
        dna.setAttribute('disabled', 'disabled')
        let _this = this
        this.$axios.get("/api/h/check?DNA=" + value).then((res) => {
          if (res.data.status === 0) {
            _this.detailInfo = res.data.data // 响应结果
            this.isDNACheckSucc = true
            dna.removeAttribute('disabled')
          } else {
            let tip = (res.data.status === 6) ? "DNA不存在！" : "校验失败，请重试！"
            _this.showLoginError({title: '', message: tip, type: 'error', timeout: 3000})
            dna.removeAttribute('disabled')
          }
        }).catch(function (error) {
          dna.removeAttribute('disabled')
          _this.showLoginError({title: '', message: 'DNA校验失败！', type: 'error', timeout: 3000})
        })
      }
    },
    notifications: {
      showLoginError: { // You can have any name you want instead of 'showLoginError'
        title: '',
        message: '',
        type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
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

  .header {
  }

  .header .left {
    top: 20px;
    height: 4px;
    background: #ffffff;
  }

  .header .right {
    top: 20px;
    height: 4px;
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
    font-weight: 600;
    font-size: 25px;
    padding: 0;
    margin: 10px;
    line-height: 1;
    color: #EEEEEE;
    letter-spacing: 2px;
    text-shadow: 0 0 30px #0798ec;
    text-align: center;
  }

  h3 {
    font-weight: 200;
    font-size: 14px;
    padding: 0;
    margin: 10px;
    line-height: 1;
    color: #EEEEEE;
    letter-spacing: 2px;
    text-shadow: 0 0 30px #0798ec;
    text-align: center;
  }

  .imges {
    text-align: center;
  }

  .btns {
    text-align: center;
  }

  .dna {
    padding: 15px 30px;
  }

  .dna input {
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #ffffff;
    background-color: inherit;
    background-clip: padding-box;
    border: 1px solid #ffffff;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
</style>
