<template>
  <!-- file input -->
  <input type="file" name="files">
</template>

<script>
  export default {
    name: 'FileUploader',
    mounted () {
      // enable fileuploader plugin
      $('input[name="files"]').fileuploader({
        changeInput: '<div class="fileuploader-input">' +
        '<div class="fileuploader-input-inner">' +
        '<div class="fileuploader-main-icon"></div>' +
        '<h3 class="fileuploader-input-caption"><span>${captions.feedback}</span></h3>' +
        '<p>${captions.or}</p>' +
        '<div class="fileuploader-input-button"><span>${captions.button}</span></div>' +
        '</div>' +
        '</div>',
        theme: 'dragdrop',
        upload: {
          url: 'php/ajax_upload_file.php',
          data: null,
          type: 'POST',
          enctype: 'multipart/form-data',
          start: true,
          synchron: true,
          beforeSend: null,
          onSuccess: function(result, item) {
            var data = {};

            try {
              data = JSON.parse(result);
            } catch (e) {
              data.hasWarnings = true;
            }

            // if success
            if (data.isSuccess && data.files[0]) {
              item.name = data.files[0].name;
              item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
            }

            // if warnings
            if (data.hasWarnings) {
              for (var warning in data.warnings) {
                alert(data.warnings);
              }

              item.html.removeClass('upload-successful').addClass('upload-failed');
              // go out from success function by calling onError function
              // in this case we have a animation there
              // you can also response in PHP with 404
              return this.onError ? this.onError(item) : null;
            }

            item.html.find('.fileuploader-action-remove').addClass('fileuploader-action-success');
            setTimeout(function() {
              item.html.find('.progress-bar2').fadeOut(400);
            }, 400);
          },
          onError: function(item) {
            var progressBar = item.html.find('.progress-bar2');

            if(progressBar.length) {
              progressBar.find('span').html(0 + "%");
              progressBar.find('.fileuploader-progressbar .bar').width(0 + "%");
              item.html.find('.progress-bar2').fadeOut(400);
            }

            item.upload.status != 'cancelled' && item.html.find('.fileuploader-action-retry').length == 0 ? item.html.find('.column-actions').prepend(
              '<a class="fileuploader-action fileuploader-action-retry" title="Retry"><i></i></a>'
            ) : null;
          },
          onProgress: function(data, item) {
            var progressBar = item.html.find('.progress-bar2');

            if(progressBar.length > 0) {
              progressBar.show();
              progressBar.find('span').html(data.percentage + "%");
              progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
            }
          },
          onComplete: null,
        },
        onRemove: function(item) {
          $.post('./php/ajax_remove_file.php', {
            file: item.name
          });
        },
        captions: {
          feedback: 'Drag and drop files here',
          feedback2: 'Drag and drop files here',
          drop: 'Drag and drop files here',
          or: 'or',
          button: 'Browse files',
        },
      });
    }
  }
</script>

<style scoped>
  @import "fonts/font-fileuploader.css";
  @import "fonts/jquery.fileuploader.min.css";
  @import "jquery.fileuploader-theme-dragdrop.css";
</style>
