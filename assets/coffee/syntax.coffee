$ ->
  $('pre').each ->
    codeClass = $(this).children(':first').attr "class"
    $(this).attr "class", "prettyprint" + " lang-" + codeClass

  $('code').each ->
    $(this).attr "class", "prettyprint"