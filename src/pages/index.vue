<template>
  <div class="container welcome">
    <div class="row justify-content-md-center">
      <div class="col col-md-8">
        <h1>WPS版权认证</h1>
        <h2>区块链文件存证平台</h2>
        <h3>安全易操作的突破性互联网技术</h3>
        <h3>文件存证是一个基于区块链的文件验证平台，文件的持有人和使用人可以通过平台验证文件在双方传输过程中是否被篡改
          平台并不存储您的文件信息，仅是将您的文件进行计算后用于验证的值存放于公共区块链中</h3>
        <div class="btns">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col col-md-2 copyr_cert">
                <button type="button" class="btn btn-outline-primary" onClick="location.href='#page2'">版权认证</button>
              </div>
              <div class="col col-md-2 file_check">
                <button type="button" class="btn btn-outline-warning" onClick="location.href='#page3'">文件验证</button>
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
    name: 'Home'
  }
</script>

<style scoped>
  .welcome {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-family: "Montserrat";
  }

  h1 {
    position: relative;
    color: #EEEEEE;
    font-weight: 600;
    font-size: 40px;
    padding: 0;
    margin-bottom: 50px;
    line-height: 1;
    text-shadow: 0 0 30px #41b883;
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
    text-shadow: 0 0 30px #41b883;
    text-align: center;
  }

  h3 {
    font-weight: 400;
    font-size: 16px;
    padding: 0;
    margin: 10px;
    line-height: 1.5;
    color: #ffffff;
    letter-spacing: 2px;
    text-shadow: 0 0 30px #41b883;
    text-align: center;
  }

  .btns {
    margin-top: 50px;
  }

  .copyr_cert,
  .file_check {
    text-align: center;
  }
</style>
