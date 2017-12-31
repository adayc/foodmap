$(document).ready(function() {
  // Deshabilitamos el boton al cargar la página
  $('#btn-number').prop('disabled', true);
  $('#txt-phone').prop('disabled', true);
  // Obtenemos los codigos de ciudad de acuerdo al país
  $('#country a').on('click', function() {
    $('#select-country').html($(this).html() + '<span class="caret"></span>');
    $('#code-country').val($(this).data('value'));
    window.localStorage.setItem('codeCountry', $(this).data('value'));
    $('#txt-phone').prop('disabled', false);
  });
  // Evento keyup en el texto para validar
  $('#txt-phone').on('input', function() {
    // Elaboramos un patrón que nos permita validar un número de celular de 9 digitos  
    var REGEXPHONE = /^\d{9}$/;
    // En el caso que la validación sea true se habilita el botón number y se oculta el texto de info
    if (REGEXPHONE.test($(this).val())) {
      // Creamos una variable en el localstorage en que almacenamos el número de teléfono.
      window.localStorage.setItem('numberPhone', $(this).val());
      $('#btn-number').prop('disabled', false);
      $('#info').addClass('hidden');
    } else {
    // En el caso que la validación sea false se mantendra deshabilitado el botón number
      $('#btn-number').prop('disabled', true);
      $('#info').addClass('show');
      $('#info').removeClass('hidden');
    }
  });
  // Evento click que generara el número aleatorio
  $('#btn-number').on('click', function() {
    // Generamos el número aleatorio con las funciones Math.round y Math.random y la almacenamos en la variable numberRandom en el localstorage
    window.localStorage.setItem('numberRandom', Math.round(Math.random() * 900) + 99);
    // Enviamos el mensaje con el número generado
    alert('LAB - ' + window.localStorage.getItem('numberRandom'));
    // Nos dirigimos a la página verfiy.html
    window.location.href = 'verify.html';
  });
});