$(document).ready(function() {
  // Deshabilitamos el boton al cargar la página
  $('#btn-next').prop('disabled', true);
  // Colocamos el cursor en el input de nombre
  $('#txt-name').focus();

  $('#danger').addClass('hidden');


  var validateName = false; 
  var validateLastName = false; 
  var validateEmail = false;
  
  var validateChecked = false;  
  var REGEXNAME = /^[A-Z a-záéíóúÁÉÍÓÚñÑ-]*$/;
  var REGEXEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

  function desactiveButton() {
    $('#btn-next').prop('disabled', true);
    $('#danger').addClass('show');
    $('#danger').removeClass('hidden');
  } 

  function activeButton() {
    $('#btn-next').prop('disabled', false);
    $('#danger').addClass('hidden');
    $('#danger').removeClass('show')
  } 


  $('#txt-name').on('input', function() {
    
    if (REGEXNAME.test($(this).val())) {
      
      validateName = true;
      $(this).removeClass('error');
      activeButton();
      
    }else{
      
      validateName = false;
      $(this).addClass('error');
      desactiveButton();

    }
  });

  $('#txt-last-name').on('input', function() {
    if (REGEXNAME.test($(this).val())) {
      validateLastName = true;
      $(this).removeClass('error');
      activeButton();
      
    }else{
      validateLastName = false;
      $(this).addClass('error');
      desactiveButton();
    }
  });

  $('#txt-email').on('input', function() {
    if (REGEXEMAIL.test($(this).val())) {
      
      validateEmail = true;
      $(this).removeClass('error');
      activeButton();
    }else{
      
      validateEmail = false;
      $(this).addClass('error');
      desactiveButton();

    }
  });

  $('#check-agree').on('click', function(event) {
    if (event.target.checked) {
     validateChecked = true;
     $('#btn-next').prop('disabled', false);
    } else {
      validateChecked = false;
      $('#btn-next').prop('disabled', true);
      
    }
  });





  $('#btn-next').on('click', function() {
    $('#txt-name').addClass('text-uppercase');
    $('#txt-last-name').addClass('text-uppercase');
    console.log(validateName);
    console.log(validateLastName);
    console.log(validateEmail);
    console.log(validateChecked);
    

    if (validateEmail && validateLastName && validateName && validateChecked) {
      window.location.href = 'validate.html';
    }
  }
  );

});