
// Cargamos el mapa cuando cargue la página
var myLocation;
  
var initMap = (function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397,
      lng: 150.644},
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      myLocation = pos;
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      var thisPlace = new google.maps.LatLng(myLocation.lat, myLocation.lng);
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: thisPlace,
        radius: 1500,
        type: ['food']
      }, callback);
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      };
      function createMarker(thisPlace) {
        var placeLoc = thisPlace.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: thisPlace.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(thisPlace.name);
          infoWindow.open(map, this);
        });
      };
  
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
});
  
var handleLocationError = (function(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
});

$(document).ready(function() {
  // Creamos el array para cargar los tipos de comida
  var kindOfFood = [];
  // Añadimos al array todos los elementos que se encuentran en el atributo 'kind' del objeto
  for (i = 0;i < restaurants.length;i++) {
    newKind = restaurants[i]['kind'];
    kindOfFood.push(newKind);
  }
  // Creamos una función para eliminar elementos duplicados

  Array.prototype.unique = function() {
    var el = this.concat().sort();
    for (var i = 1; i < el.length;) {
      if (el[i - 1] === el[i])
        el.splice(i, 1);
      else
        i++;
    }
    return el;
  };

  var arrKindOfFood = kindOfFood.unique();
  // Añadimos todos los option con los values en el dataist
   
  for (var i = 0; i < arrKindOfFood.length; i++) {
    var $option = $('<option value="' + arrKindOfFood[i] + '"></option>');  
    $('#kind-of-food').append($option);
  }

  // Deshabilitamos el boton de búsqueda
  $('#btn-search').prop('disabled', true);

  $('#list-kind-of-food').on('input', function() {
    if ($('#list-kind-of-food').val().length === 0) {
      $('#btn-search').prop('disabled', true);
    }else {
      $('#btn-search').prop('disabled', false);
    }
  });

  $('#btn-search').on('click', function() {
    $('#results').children().remove();
    var filterSearch = $('#list-kind-of-food').val();
    for (var i = 0; i < restaurants.length; i++) {
      if (restaurants[i]['kind'] == filterSearch) {
        var image = restaurants[i]['image'];
            
        var $newImg = $('<img src="../assets/images/' + restaurants[i]['image'] + '" alt="' + restaurants[i]['name'] + '">').addClass('margin-top');
        $('#results').append($newImg);
      }
    };
  });
});

/*
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
});*/