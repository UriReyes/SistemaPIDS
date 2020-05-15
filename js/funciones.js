/*Funciones del SideBar*/
/*jQuery(function($) {


});*/

$(document).ready(function () {
  /* /sistema_PIDS/php/home.html ruta con Sistema_PIDS*/
  $("#contenido").load("/sistema_PIDS/php/home.html");
  if ($(window).width() <= 600) {
    var row = $(".tooglerow");
    console.log("Se ha cargado" + row);
    row.attr("data-toggle", "collapse");
    row.attr("data-target", "#accordion1");
    row.addClass("clickable ");
  } else {
  }
  /* Resaltamos la seleccion*/
  $(".item").click(function () {
    //    $(this).removeClass('seleccion');
    if ($(".item").hasClass("seleccion")) {
      // alert("Estoy Seleccionado");
      $(".item").removeClass("seleccion");
      $(this).addClass("seleccion");
    } else {
      $(this).addClass("seleccion");
    }
  });
  /*Animacion al hacer un drop menu y al cerrar y abrir el sidebar*/
  $("#home").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(200);
      $(this).parent().addClass("active");
    }
  });
  $("#administrar_usuarios").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(200);
      $(this).parent().addClass("active");
    }
  });
  $("#cerrar_sesion").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(200);
      $(this).parent().addClass("active");
    }
  });
  $(".sidebar-dropdown > a").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(200);
      $(this).parent().addClass("active");
    }
  });

  $("#close-sidebar").click(function () {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function () {
    $(".page-wrapper").addClass("toggled");
  });

  /* ===================================================================================== */
  /* =========== Navegar en la aplicacion web con jquery sin recargar la pagina ==========*/
  $("#home").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/home.html");
    //return false;
  });
  /* SideBar > Site*/
  $("#inventario_site").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/inventario_site.php");
    $.getScript("js/funciones-modal.js");
    $.getScript("js/funciones_inventario_site.js");
    /* Cargamos el Script una vez cargado el HTML con Ajax == Para eso sirve getScript ===*/
    //return false;
  });
  $("#prestamos_site").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/prestamos_site.html");
    //$.getScript("js/funciones-modal.js");
    // comente el js/funciones-modal -> porque generaba un bucle infinito
    $.getScript("js/funciones_prestamos_site.js");
    //return false;
  });
  $("#bajas_site").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/bajas_site.html");
    $.getScript("js/funciones_bajas_inventario_site.js");
    //return false;
  });
  /*SideBar > Laboratorios*/
  $("#inventario_laboratorio").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/inventario_laboratorio.html");
    $.getScript("js/funciones-modal.js");
    $.getScript("js/funciones_inventario_laboratorio.js");
    // return false;
  });
  $("#bajas_laboratorio").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/bajas_laboratorio.html");
    $.getScript("js/funciones_bajas_inventario_laboratorio.js");
    // return false;
  });
  $("#prestamos_laboratorio").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/prestamos_laboratorio.html");
    //  return false;
  });
  $("#bitacoras_laboratorio").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/bitacoras_laboratorio.html");
    //  return false;
  });
  /* SideBar > Reportes*/
  $("#bajas_reportes").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/bajas_reportes.html");
  });
  $("#que_prestado_reportes").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/que_prestado_reportes.html");
  });
  $("#prestamos_alumnos_reportes").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/prestamos_alumnos_reportes.html");
  });
  $("#prestamos_profesores_reportes").on("click", function () {
    $("#contenido").load(
      "/sistema_PIDS/php/prestamos_profesores_reportes.html"
    );
  });
  $("#bitacoras_reportes").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/bitacoras_reportes.html");
  });
  /* SideBar > Administrar Usuarios*/
  $("#administrar_usuarios").on("click", function () {
    $("#contenido").load("/sistema_PIDS/php/administrar_usuarios.php");
    $.getScript("js/funciones-modal.js");
    $.getScript("js/funciones_usuarios.js");
  });
  /* SideBar > Cerrar Sesion*/
  $("#cerrar_sesion").on("click", function () {
    let swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¡¿Estás Seguro?",
        text: "La sesión será cerrada!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, quiero cerrar sesión.",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          // location.replace("");
          $.ajax({
            type: "GET",
            url: "php/sesion/cerrar_sesion.php",
            success: function (msg) {
              if (msg == "Sesion Cerrada") {
                let id = $("#id_sesion").text();
                console.log(id);
                $.post("php/usuarios/online-usuario.php", { id }, function (
                  response
                ) {
                  console.log(response);
                });
                window.location.href = "/sistema_PIDS/";
              }
            },
          });
        }
      });
  });

  /*========== Borrar Cuando se Agreguen las demas condiciones ==============*/
  /* ============ Modal ============*/
});
