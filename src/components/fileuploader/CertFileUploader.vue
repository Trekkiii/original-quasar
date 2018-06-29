<template>
  <div>
    <form id="cert-form" method="post" enctype="multipart/form-data">
      <!-- file input -->
      <input id="cert-files" type="file" name="files"/>
      <div ref="formStatus" class="form-status">
        <svg class="icon" aria-hidden="true" v-if="isCopyrCertSucc">
          <use xlink:href="#icon-copyr-cert-success"></use>
        </svg>
      </div>
      <div class="btns">
        <input type="button" class="btn btn-primary" value="查看详情" v-if="isCopyrCertSucc"
               @click="detailsHandler">
        <input type="submit" class="btn btn-primary" value="提交认证" v-if="!isCopyrCertSucc"/>
      </div>
    </form>
  </div>
</template>

<script>
  import './jquery.fileuploader.min.js'

  export default {
    name: 'CertFileUploader',
    data () {
      return {
        'isCopyrCertSucc': false, // 标记是否认证成功
        'detailInfo': {}
      }
    },
    methods: {
      detailsHandler () {
        this.$emit('forDetailsEvent', {'detailInfo': this.detailInfo, 'forDetails': true})
      },
      md5 (file) {
        let blobSlice = File.prototype.mozSlice || File.prototype.slice || File.prototype.webkitSlice,
          chunkSize = 2097152,                             // Read in chunks of 2MB
          chunks = Math.ceil(file.size / chunkSize),
          currentChunk = 0,
          spark = new SparkMD5.ArrayBuffer(),
          fileReader = new FileReader()

        fileReader.onload = function (e) {
          console.log('read chunk nr', currentChunk + 1, 'of', chunks)
          spark.append(e.target.result)                   // Append array buffer
          currentChunk++

          if (currentChunk < chunks) {
            loadNext()
          } else {
            console.log('finished loading')
            let md5 = spark.end()
            console.info('computed hash', md5)  // Compute hash
            return md5
          }
        }

        fileReader.onerror = function () {
          console.warn('oops, something went wrong.')
        }

        function loadNext () {
          let start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }

        loadNext()
      }
    },
    mounted: function () {
      // define the form and the file input
      let $form = $('#cert-form'),
        $files = $('#cert-files'),
        formStatus = this.$refs.formStatus

      const _this = this

      // enable fileuploader plugin
      $files.fileuploader({
        limit: 1,
        enableApi: true,
        changeInput: '<div class="fileuploader-input">' +
        '<div class="fileuploader-input-inner">' +
        '<div class="fileuploader-main-icon"></div>' +
        '<h3 class="fileuploader-input-caption"><span>${captions.feedback}</span></h3>' +
        '</div>',
        theme: 'dragdrop',
        onRemove: function (item) {
//          formStatus.innerHTML = ''
          _this.isCopyrCertSucc = false
        },
        // Callback fired after selecting the files from computer but only before processing them
        // by returning false, you will prevent the processing of the files but they will remain in the input
        beforeSelect: function (files, listEl, parentEl, newInputEl, inputEl) {
          // callback will go here
//          formStatus.innerHTML = ''
          _this.isCopyrCertSucc = false
          return true
        },
        // Callback fired on checking for warnings the choosed files
        // by returning false, you will prevent the files from adding/upload
        onFilesCheck: function (files, options, listEl, parentEl, newInputEl, inputEl) {
          // callback will go here
          return true
        },
        captions: {
          feedback: '拖放文件到此处..',
          or: 'or',
          button: 'Browse files',
        },
      })

      // form submit
      $form.on('submit', function (e) {
        e.preventDefault()

        let params = JSON.parse('{}'),
          api = $.fileuploader.getInstance($files)

        let isError = false

        // append form's inputs to the formdata
        $.each($form.find('[name][type!="hidden"]:input'), function (index, input) {
          let $input = $(input),
            name = $input.attr('name'),
            type = $input.attr('type') || '',
            value = $input.val()

          if (typeof value == 'undefined')
            return true

          if (type == 'file') {
            // add fileuploader files to the formdata
            if (name == $files.attr('name')) {
              let files = api.getChoosedFiles()

//              for(let i = 0; i<files.length; i++) {
//                formData.append(name, files[i].file, (files[i].name ? files[i].name : false));
//              }
              if (files.length === 0) {
                isError = true
                _this.showLoginError({title: '', message: '请先选择文件！', type: 'warn', timeout: 3000})
                return false
              }
              api.disable(true)

              let file = document.getElementById("cert-files").files[0],
              // 计算文件MD5
              md5 = _this.md5(file)
              console.log('md5: ' + md5)

              // 设置请求参数
              params['title'] = file.name
              params['contentHash'] = md5
              params['licenseType'] = '0'
              params['userId'] = '001'
            }
          } else {
            params[name] = value
          }
        })

        if (!isError) {

          let config = {
            onUploadProgress: e => {
              if (e.lengthComputable) {
                let t = Math.round(e.loaded * 100 / e.total).toString()
                $form.find('.form-status .progressbar').css('width', t + '%')
              }
            }
          }

          // axios发送请求之前先禁用提交按钮，防止重复提交
//          formStatus.innerHTML = '<div class="progressbar-holder"><div class="progressbar"></div></div>'
          $form.find('input[type="submit"]').attr('disabled', 'disabled')

          _this.$axios.post('/api/h/store',
            params, config).then((res) => {
            if (res.data.status === 0) {
              // update input values
              try {
                let data = res.data.data // 响应结果
                _this.detailInfo = data
                // 遍历响应结果中的每一个key
                for (let key in data) {
                  if (data.files) {
                    if (key == $files.attr('name').replace('[]', '')) {
                      // update the fileuploader's file names
                      for (let i = 0; i < data.files.length; i++) {
                        $.each(api.getChoosedFiles(), function (index, item) {
                          if (data.files[i].old_name == item.name) {
                            item.name = data.files[i].name
                            item.html.find('.column-title > div:first-child').text(data.files[i].name).attr('title', data.files[i].title)
                          }
                          item.data.uploaded = true
                        })
                      }
                      api.updateFileList()
                    }
                  } else {
                    // 查找所有name属性为key的input，将其value设置为data[key]
                    $form.find('[name="' + key + '"]:input').val(data[key])
                  }
                }
              } catch (e) {}
              _this.isCopyrCertSucc = true
              api.enable()
//              formStatus.innerHTML =
//                '<i class="iconfont" style="color: #1296db; font-size: 60px; position: absolute; z-index: 100; padding-left: 20px; margin-top: -86px">&#xe7ad;</i>'

              $form.find('input[type="submit"]').removeAttr('disabled')
            } else {
              api.enable()
//              formStatus.innerHTML =
//                '<i class="iconfont" style="color: #d4237a; font-size: 60px; position: absolute; z-index: 100; padding-left: 20px; margin-top: -86px">&#xe7ac;</i>'
              let tip = (res.data.status === 5) ? '该文件已认证过，请勿重复认证！' : '认证失败！'
              _this.showLoginError({title: '', message: tip, type: 'error', timeout: 3000})
              $form.find('input[type="submit"]').removeAttr('disabled')
            }
          }).catch(function (error) {
            api.enable()
//            formStatus.innerHTML =
//              '<i class="iconfont" style="color: #d4237a; font-size: 60px; position: absolute; z-index: 100; padding-left: 20px; margin-top: -86px">&#xe7ac;</i>'

            $form.find('input[type="submit"]').removeAttr('disabled')
          })
        }

      })
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
  @import "fonts/font-fileuploader.css";
  @import "fonts/jquery.fileuploader.min.css";
  @import "jquery.fileuploader-theme-dragdrop.css";

  .btns {
    text-align: center;
  }

  .form-status {
    padding: 0 120px;
  }

  .form-status .icon {
    font-size: 75px;
    position: absolute;
    z-index: 100;
    padding-left: 20px;
    margin-top: -80px;
    transform: rotate(35deg);
  }
</style>
