$(document).ready(function() {
  // Deshabilitamos el boton al cargar la página
  $('#btn-next').prop('disabled', true);
  // Mostramos el número al que se envio el código
  $('#lbl-phone').html(window.localStorage.getItem('codeCountry') + ' ' + window.localStorage.getItem('numberPhone'));
  // Ocultamos la alerta de código erróneo 
  $('#warning').addClass('hidden');
  // Colocamos el cursor en la primera caja de texto
  $('.input-group input').eq(0).focus();
  
  $('.input-group input').on('input', function() {
    // Elaboramos una expresión regular para validar que se ingrese el código 
    var REGEXONENUMBER = /^\d{1}$/;
    // Validamos cada texto con la expresión regular
    if (REGEXONENUMBER.test($('.input-group input').eq(0).val()) && REGEXONENUMBER.test($('.input-group input').eq(1).val()) && REGEXONENUMBER.test($('.input-group input').eq(2).val())) {
      $('#btn-next').prop('disabled', false);
    } else {
      $('#btn-next').prop('disabled', true);
    }
    // En el caso que se reingrese el código se oculta la advertencia y aparece la info
    $('#warning').addClass('hidden');
    $('#warning').removeClass('show');
    $('#info').addClass('show');
    $('#info').removeClass('hidden');
  });

  $('#btn-next').on('click', function() {
    // Almacenamos el código generado en la variable codeRandom
    var codeRandom = window.localStorage.getItem('numberRandom');
    // Almacenamos el código ingresado en la variable codeEntered
    var codeEntered = $('.input-group input').eq(0).val() + $('.input-group input').eq(1).val() + $('.input-group input').eq(2).val();
    // Comparamos que el código ingresado con el código generado
    if (codeEntered === codeRandom) {
      // En el caso que sea verdadero nos dirigimos a login.html
      window.location.href = 'register-email.html';
      $('#info').addClass('show');
      $('#info').removeClass('hidden');
    } else {
      // En el caso que sea falso nos muestra el mensaje de advertencia
      $('#warning').addClass('show');
      $('#warning').removeClass('hidden');
      $('#info').removeClass('show');
      $('#info').addClass('hidden');
    }
  });

 
  $('#btn-resend').on('click', function() {
    // Generamos el número aleatorio con las funciones Math.round y Math.random y la almacenamos en la variable numberRandom en el localstorage
    window.localStorage.setItem('numberRandom', Math.round(Math.random() * 900) + 99);
    // Enviamos el mensaje con el número generado
    alert('LAB - ' + window.localStorage.getItem('numberRandom'));
  });
});