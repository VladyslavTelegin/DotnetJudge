var editor = CodeMirror.fromTextArea('quiz-input', {
    parserfile: ["../contrib/csharp/js/tokenizecsharp.js", "../contrib/csharp/js/parsecsharp.js"],
    stylesheet: "codemirror/contrib/csharp/css/csharpcolors.css",
    path: "./codemirror/js/",
    height: "400px",
    indentUnit: 4
});

$(document).ready(function() {
    $('#submit-button').bind('click', function() {
      $('#submit-button').attr('disabled', 'disabled');
      $('div.loader').show();
        $("#results-container").empty();
        var codeVal = editor.getCode().replaceAll('"', '\"');
      var quizNumberVal = $('input#quizNumber').val();
        var body = JSON.stringify({ code: codeVal, quizNumber: quizNumberVal });
        $.ajax({
          type: "POST",
          url: "/api/dotnet/check",
          data: body,
          dataType: 'json',
          contentType: 'application/json',
          success: function(data) {
              $('div.loader').hide();
              
              if (data.Errors !== null) {
                     $('#submit-button').removeAttr('disabled');
                  $("#results-container").css('background', 'red');
                  $("#results-container").append(`<p style="color: white; margin: 4px;">&gt;&gt; ${data.Errors}</p>`)
              } else {
                  if (data.Output === '') {
                      $('#submit-button').removeAttr('disabled');
                      $("#results-container").css('background', 'red');
                      $("#results-container").append(`<p style="color: white; margin: 4px;">&gt;&gt; No output.</p>`);
                  } else {
                      $("#results-container").css('background', 'green');
                      $("#results-container").append(`<p style="color: white; margin: 4px;">&gt;&gt; ${data.Output}</p>`);
                  }
              }
          },
          error: function(errorMessage) {
              $('div.loader').hide();
              $('#submit-button').removeAttr('disabled');
              $("#results-container").css('background', 'red');
              $("#results-container").append(`<p style="color: white; margin: 4px;">&gt;&gt; ${errorMessage}</p>`)
          }
      });
    });
});