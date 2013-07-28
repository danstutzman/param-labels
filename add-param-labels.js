(function() {
  function add_form_param_label($form) {
    $form.before(
      "<div class='param-label for-form'>&#8600; &lt;form action=&quot;" +
      $form.attr('action') + "'&quot;&gt;</div>");
  }

  function update_param_label($input) {
    if ($input.attr('type') === 'radio' && $input.is(':checked') ||
        $input.attr('type') !== 'radio') {
      var selector = 'div[data-for-name="' + $($input).attr('name') + '"]';
      $(selector).remove();
      var val_quoted = "&quot;" + $($input).val() + "&quot;";
      if ($input.attr('type') === 'checkbox' && !$input.is(':checked')) {
        val_quoted = "nil";
      }
      $($input).before(
        "<div class='param-label' data-for-name='" +
        $($input).attr('name') +
        "'>&#8600; params[:" +
        $($input).attr('name') +
        "]==" + val_quoted + "</div>");
    }
  }

  function jquery_is_ready($) {
    $(document).ready(function() {
      $('head').append("<style>\n" +
    "    .hidden-field-marker {\n" +
    "      color: red;\n" +
    "      font-size: 8pt;\n" +
    "      font-family: sans-serif;\n" +
    "      border: 1px red solid;\n" +
    "    }\n" +
    "    .param-label {\n" +
    "      background-color: rgba(255, 255, 255, 0.5);\n" +
    "      position: absolute;\n" +
    "      display: inline-block;\n" +
    "      color: red;\n" +
    "      font-size: 8pt;\n" +
    "      height: 8pt;\n" +
    "      font-family: sans-serif;\n" +
    "      margin-left: -10px;\n" +
    "      margin-top: -12px;\n" +
    "    }\n" +
    "    .param-label.for-form {\n" +
    "      margin-top: -10px;\n" +
    "    }\n" +
    "    form.disable-form-labeling {\n" +
    "      border: 1px red solid;\n" +
    "    }\n" +
    "</style>");

      if (false) { // disable labeling of <form> tag and action
        $('form').each(function(i) {
          var form = $(this);
          add_form_param_label(form);
        });
      }

      $('input, select, button, textarea').each(function(i) {
        var input = $(this);
        update_param_label(input);
        input.change(function(event) {
          update_param_label(input);
        });
      });

      $('input[type=hidden]').each(function(i) {
        var input = $(this);
        input.after("<span class='hidden-field-marker'>(hidden field)</span>");
      });
    });
  }

  // inject jquery if it doesn't exist
  if (typeof($) == 'undefined') {
    var script = document.createElement("script");
    script.src =
      "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
    script.onload = script.onreadystatechange = function() {
      jquery_is_ready($);
    };
    document.head.appendChild(script);
console.log('here');
  } else {
    jquery_is_ready($);
  }
})();
