<template>
  <div class="container index">
    <div class="row justify-content-md-center">
      <div class="col col-md-8">
        <h1>WPS版权认证</h1>
        <div class="container header">
          <div class="row justify-content-md-center">
            <i class="col col-md-2 left"></i>
            <h2 class="col col-md-4">区块链文件存证平台</h2>
            <i class="col col-md-2 right"></i>
          </div>
        </div>
        <h3>安全易操作的突破性互联网技术</h3>
        <h3>WPS版权认证支持所有知识产权类型的版权申请,
          将文件存在自有区块链存证网络文件的持有人和使用人可以通过平台验证文件是否被篡改</h3>
        <div class="btns">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col col-md-2 copyr_cert">
                <button type="button" class="btn btn-primary" onClick="location.href='#page2'">版权认证</button>
              </div>
              <div class="col col-md-2 file_check">
                <button type="button" class="btn btn-warning" onClick="location.href='#page3'">文件验证</button>
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
  .index {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-family: "Montserrat";
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
