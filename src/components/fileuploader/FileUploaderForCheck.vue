<template>
  <div>
    <form action="#" id="formForCheck" method="post" enctype="multipart/form-data">
      <div class="dna">
        <input class="dna-input" type="text" name="dna" placeholder="请输入该文件认证的DNA">
      </div>
      <!-- file input -->
      <input type="file" id="filesForCheck" name="files">
      <div class="form-status"></div>
      <div class="btns">
        <input type="button" class="btn btn-outline-primary" value="查看详情" v-if="isFileCheckSucc" @click="forDetailHandler">
        <input type="submit" class="btn btn-outline-warning" value="文件验证" v-if="!isFileCheckSucc"/>
      </div>
    </form>
  </div>
</template>

<script>
  import './jquery.fileuploader.min.js'

  export default {
    name: 'FileUploader',
    data () {
      return {
        'files': [],
        isFileCheckSucc: false
      }
    },
    methods: {
      forDetailHandler () {

      }
    },
    mounted: function () {
      // define the form and the file input
      let $form = $('#formForCheck'),
        $filesInput = $('#filesForCheck')

      const _this = this

      // enable fileuploader plugin
      $filesInput.fileuploader({
        limit: 1,
        enableApi: true,
        changeInput: '<div class="fileuploader-input">' +
        '<div class="fileuploader-input-inner">' +
        '<div class="fileuploader-main-icon"></div>' +
        '<h3 class="fileuploader-input-caption"><span>${captions.feedback}</span></h3>' +
        '</div>',
        theme: 'dragdrop',
        onRemove: function (item) {
          $form.find('.form-status').html('')
          _this.isFileCheckSucc = false
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

        let formData = new FormData(),
          api = $.fileuploader.getInstance($filesInput)

        let isError = false

        // append form's inputs to the formdata
        $.each($form.find('[name]:input'), function (index, input) {
          var $input = $(input),
            name = $input.attr('name'),
            type = $input.attr('type') || '',
            value = $input.val()

          if (typeof value == 'undefined')
            return true

          if (type == 'file') {
            // add fileuploader files to the formdata
            if (name == $filesInput.attr('name')) {
              let files = api.getChoosedFiles()

//              for(let i = 0; i<files.length; i++) {
//                formData.append(name, files[i].file, (files[i].name ? files[i].name : false));
//              }
              if (files.length === 0) {
                isError = true
                _this.showLoginError({title: 'Warning', message: '检查是否选择文件！', type: 'warn', timeout: 3000})
                return false
              }
              api.disable(true)

              // TODO 计算MD5

            }
          } else {
            formData.append(name, value)
          }
        })

        if (!isError) {
          $.ajax({
            url: $form.attr('action') || '#',
            data: formData,
            type: $form.attr('method') || 'POST',
            enctype: $form.attr('enctype') || 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
              $form.find('.form-status').html('<div class="progressbar-holder"><div class="progressbar"></div></div>')
              $form.find('input[type="submit"]').attr('disabled', 'disabled')
            },
            xhr: function () {
              let xhr = $.ajaxSettings.xhr()

              if (xhr.upload) {
                xhr.upload.addEventListener('progress', this.progress, false)
              }

              return xhr
            },
            success: function (result, textStatus, jqXHR) {
              // update input values
              try {
                let data = JSON.parse(result) // 响应结果
                // 遍历响应结果中的每一个key
                for (let key in data) {
                  if (data.files) {
                    if (key == $filesInput.attr('name').replace('[]', '')) {
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
              _this.isFileCheckSucc = true
              api.enable()
              $form.find('.form-status').html(
                '<i class="iconfont" style="color: #1296db; font-size: 60px; position: absolute; z-index: 100; padding-left: 20px">&#xe7ad;</i>'
              )
              $form.find('input[type="submit"]').removeAttr('disabled')
            },
            error: function (jqXHR, textStatus, errorThrown) {
              api.enable()
              $form.find('.form-status').html(
                '<i class="iconfont" style="color: #d4237a; font-size: 60px; position: absolute; z-index: 100; padding-left: 20px">&#xe7ac;</i>'
              )
              $form.find('input[type="submit"]').removeAttr('disabled')
            },
            progress: function (e) {
              if (e.lengthComputable) {
                let t = Math.round(e.loaded * 100 / e.total).toString()
                $form.find('.form-status .progressbar').css('width', t + '%')
              }
            }
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
    text-align: center;
    padding: 10px 0;
  }

  .dna {
    padding: 15px;
  }

  .dna-input {
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

  .dna-input::placeholder {
    color: #ffffff;
    font-weight: 400;
    font-size: 13px;
    opacity: 0.8;
  }
</style>
