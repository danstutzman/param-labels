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
      "'>&#8600; params[&quot;" +
      $($input).attr('name') +
      "&quot;]==" + val_quoted + "</div>");
  }
}

$(document).ready(function() {
  $('head').append("<style>\n" +
"    .param-label {\n" +
"      background-color: rgba(255, 255, 255, 0.5);\n" +
"      position: absolute;\n" +
"      display: inline-block;\n" +
"      color: red;\n" +
"      font-size: 8pt;\n" +
"      height: 8pt;\n" +
"      line-height: 8pt;\n" +
"      font-family: sans-serif;\n" +
"      margin-left: -10px;\n" +
"      margin-top: 5px;\n" +
"    }\n" +
"    .param-label.for-form {\n" +
"      margin-top: -10px;\n" +
"    }\n" +
"    body {\n" +
"      line-height: 3;\n" +
"    }\n" +
"    form {\n" +
"      border: 1px red solid;\n" +
"    }\n" +
"</style>");

  $('form').each(function(i) {
    var form = $(this);
    add_form_param_label(form);
  });
  $('input, select, button').each(function(i) {
    var input = $(this);
    update_param_label(input);
    input.change(function(event) {
      update_param_label(input);
    });
  });
});
