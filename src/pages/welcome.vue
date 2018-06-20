<template>
  <div class="container welcome">
    <div class="row justify-content-md-center">
      <div class="col-md-8">
        <h1>版权认证</h1>
        <h2>区块链文件存证平台</h2>
        <h3>安全易操作的突破性互联网技术</h3>
        <h3>版权认证是一个基于区块链的文件存证平台，文件的持有人和使用人可以通过平台验证文件是否被篡改</h3>
        <div class="btns">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col-md-5">
                <button type="button" class="btn btn-info btn-copyr-cert" onClick="location.href='#page2'">版权认证</button>
                <button type="button" class="btn btn-light btn-file-check" onClick="location.href='#page3'">文件验证</button>
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
    margin: 0;
    line-height: 1;
    text-shadow: 0 0 30px #41b883;
  }
  h2 {
    font-weight: 400;
    font-size: 22px;
    padding: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1;
    color: #EEEEEE;
    letter-spacing: 2px;
    text-shadow: 0 0 30px #41b883;
    text-align: center;
  }
  h3 {
    font-weight: 200;
    font-size: 14px;
    padding: 0;
    margin: 0;
    line-height: 1;
    color: #EEEEEE;
    letter-spacing: 2px;
    text-shadow: 0 0 30px #41b883;
    text-align: center;
  }
  .btns {
    margin-top: 50px;
  }
  .btn-copyr-cert {
    margin-right: 40px;
  }
  .btn-file-check {
    margin-left: 40px;
  }
</style>
