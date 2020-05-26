$(document).ready(function () {
  console.log("si we si jalo");
  acordeon();
  mostrar_datos();
  document.getElementById("contenedorGlobal").onscroll = function () {
    myFunction();
  };
  var header = document.getElementById("vista1Prestamos");
  var sticky = header.offsetTop;
  function myFunction() {
    if ($("#contenedorGlobal").scrollTop() > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  document
    .getElementById("tipoPrestario")
    .addEventListener("change", function () {
      if (document.getElementById("tipoPrestario").checked == true) {
        // document.getElementById("carreraAlumno").style.display = "none";
        // document.getElementById("controlAlumno").style.display = "none";
        $("#carreraAlumno").hide(700);
        $("#controlAlumno").hide(700);
        document.getElementById("tipoLabel2").innerText = "Docente";
        document.getElementById("tipoLabelAlumno").style.display = "block";
        document.getElementById("tipoLabelDocente").style.display = "none";
        // document.getElementById("fecha_prestamo").classList.remove("faltante");
        // document.getElementById("fecha_regreso").classList.remove("faltante");
        document.getElementById("marca_site").classList.remove("faltante");
        document
          .getElementById("numero_serie_site")
          .classList.remove("faltante");
        document.getElementById("piezas_site").classList.remove("faltante");
        document.getElementById("alumno_prestamo").classList.remove("faltante");
        document
          .getElementById("Control_prestamo")
          .classList.remove("faltante");
        document
          .getElementById("Carrera_prestamo")
          .classList.remove("faltante");
        if (document.getElementById("msgPrestamos")) {
          document.getElementById("msgPrestamos").remove();
        }
      } else {
        // document.getElementById("carreraAlumno").style.display = "block";
        // document.getElementById("controlAlumno").style.display = "block";
        $("#carreraAlumno").show(700);
        $("#controlAlumno").show(700);
        document.getElementById("tipoLabel2").innerText = "Alumno";
        document.getElementById("tipoLabelAlumno").style.display = "none";
        document.getElementById("tipoLabelDocente").style.display = "block";
        // document.getElementById("fecha_prestamo").classList.remove("faltante");
        // document.getElementById("fecha_regreso").classList.remove("faltante");
        document.getElementById("marca_site").classList.remove("faltante");
        document
          .getElementById("numero_serie_site")
          .classList.remove("faltante");
        document.getElementById("piezas_site").classList.remove("faltante");
        document.getElementById("alumno_prestamo").classList.remove("faltante");
        document
          .getElementById("Control_prestamo")
          .classList.remove("faltante");
        document
          .getElementById("Carrera_prestamo")
          .classList.remove("faltante");
        if (document.getElementById("msgPrestamos")) {
          document.getElementById("msgPrestamos").remove();
        }
      }
    });
});

var table = null;
var editar = false;
var mostrar_datos = function () {
  table = $("#tabla-prestamos-site").DataTable({
    destroy: true, //sirve para reinicializar el datatable al insertar datos
    ajax: {
      type: "POST",
      url: "php/site/mostrar-datos-site.php",
    },
    columns: [
      { data: "fecha" },
      {
        data: "marca",
      },
      { data: "modelo" },
      { data: "numero_serie" },
      { data: "folio" },
      { data: "estatus" },
      { data: "articulo" },
      { data: "piezas" },
      {
        defaultContent:
          "<div class='boton-acciones' style='width:50%'><button class='editar-site boton-prestar2'>Prestar</button></div>",
      },
    ],
    iDisplayLength: 5,
    aLengthMenu: [
      [5, 10, 25, 50, 100, -1],
      [5, 10, 25, 50, 100, "All"],
    ],
    language: idioma_espanol,
  });
  $("#search").on("keyup", function () {
    table.search(this.value).draw();
  });
  $("#search").keypress(function (e) {
    var keycode = e.keyCode;
    if (keycode == "13") {
      e.preventDefault();
    }
  }); // Eliminar evento Press Enter
  prestamo_datos("#tabla-prestamos-site", table);
};

var prestamo_datos = function (tbody, table) {
  var data = null;
  $(tbody).on("click", "button.editar-site", function () {
    editar = true;
    if ($("table").hasClass("collapsed")) {
      console.log("Si");
      data = table.row($(this)).data();
    } else {
      console.log("No");
      data = table.row($(this).parents("tr")).data();
    }
    var id = $("#id_site").val(data.id),
      fecha = $("#fecha_prestamo").val(fechaActual()),
      marca = $("#marca_site").val(data.marca),
      modelo = $("#modelo_site").val(data.modelo),
      serie = $("#numero_serie_site").val(data.numero_serie),
      folio = $("#folio_site").val(data.folio),
      estatus = $("#estatus_site").val(data.estatus),
      articulo = $("#articulo_site").val(data.articulo),
      piezas = $("#piezas_site").val(data.piezas);
  });
};
function fechaActual() {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;
  return today;
}
$("#home1").on("click", function () {
  $("#contenido").load("/sistema_PIDS/php/home.html");
});

var refrescar = function () {
  table.ajax.reload(); //Refrescamos la tabla
};
var idioma_espanol = {
  sProcessing: "Procesando...",
  sLengthMenu: "Registros por página _MENU_",
  sZeroRecords: "No se encontraron resultados",
  sEmptyTable: "Ningún dato disponible en esta tabla =(",
  sInfo:
    "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
  sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
  sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
  sInfoPostFix: "",
  sSearch: "",
  sUrl: "",
  sInfoThousands: ",",
  sLoadingRecords: "Cargando...",
  oPaginate: {
    sFirst: `<i class="fas fa-fast-backward"></i>`,
    sLast: `<i class="fas fa-fast-forward"></i>`,
    sNext: `<i class="fas fa-forward"></i>`,
    sPrevious: `<i class="fas fa-backward"></i>`,
  },
  oAria: {
    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
    sSortDescending: ": Activar para ordenar la columna de manera descendente",
  },
  buttons: {
    copy: "Copiar",
    colvis: "Visibilidad",
  },
};

var acordeon = function () {
  $(".titulo-acordeon").on("click", function () {
    var contenido = $(this).next(".contenido-acordeon");
    if (contenido.css("display") == "none") {
      //open
      contenido.slideDown(250);
      $(this).addClass("open");
      refrescar();
    } else {
      //close
      contenido.slideUp(250);
      $(this).removeClass("open");
    }
  });
};

/* Prestamos Control*/
var contenedorMensajesPrestamosSite = document.getElementById(
  "mensajesPrestamosSite"
);
var btnPrestar = document.getElementById("prestar");
btnPrestar.addEventListener("click", function () {
  prestarSiteArticulo();
});

function prestarSiteArticulo() {
  if (document.getElementById("tipoPrestario").checked == true) {
    console.log("Si");
    if (
      $("#marca_site").val() === "" ||
      $("#numero_serie_site").val() === "" ||
      $("#piezas_site").val() === "" ||
      $("#alumno_prestamo").val() === ""
    ) {
      if ($("#marca_site").val() === "") {
        document.getElementById("marca_site").classList.add("faltante");
      }
      if ($("#numero_serie_site").val() === "") {
        document.getElementById("numero_serie_site").classList.add("faltante");
      }
      if ($("#piezas_site").val() === "") {
        document.getElementById("piezas_site").classList.add("faltante");
      }
      if ($("#alumno_prestamo").val() === "") {
        document.getElementById("alumno_prestamo").classList.add("faltante");
      }
      if (document.getElementById("msgPrestamos")) {
        document.getElementById("msgPrestamos").remove();
      }
      const div = document.createElement("div");
      div.id = "msgPrestamos";
      div.classList.add("badge", "badge-danger", "p-1", "mb-2");
      div.innerText = "Falta Información";
      contenedorMensajesPrestamosSite.appendChild(div);
      setTimeout(() => {
        // document.getElementById("fecha_prestamo").classList.remove("faltante");
        // document.getElementById("fecha_regreso").classList.remove("faltante");
        document.getElementById("marca_site").classList.remove("faltante");
        document
          .getElementById("numero_serie_site")
          .classList.remove("faltante");
        document.getElementById("piezas_site").classList.remove("faltante");
        document.getElementById("alumno_prestamo").classList.remove("faltante");
        $("#msgPrestamos").toggle(500);
      }, 3000);
    } else if (Number($("#piezas_site").val()) < 1) {
      if (document.getElementById("msgPrestamos")) {
        document.getElementById("msgPrestamos").remove();
      }
      const div = document.createElement("div");
      div.id = "msgPrestamos";
      div.classList.add("badge", "badge-danger", "p-1", "mb-2");
      div.innerText = "No se puede prestar menos de 1 pza";
      contenedorMensajesPrestamosSite.appendChild(div);
      setTimeout(() => {
        $("#msgPrestamos").toggle(500);
      }, 3000);
    } else {
      // datos
      const marca = $("#marca_site").val(),
        numeroPiezas = $("#piezas_site").val(),
        numeroSerie = $("#numero_serie_site").val(),
        nombreAlumno = $("#alumno_prestamo").val();
      var hoy = new Date();
      var hora =
        hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
      console.log(
        `Nombre:${nombreAlumno}\nCantidadPrestado:${numeroPiezas},Articulo:${marca}, Serie: ${numeroSerie}\nFecha:${fechaActual()} y Hora: ${hora}
        `
      );
    }
  } else {
    console.log("no");
    if (
      // $("#fecha_prestamo").val() === "" ||
      // $("#fecha_regreso").val() === "" ||
      $("#marca_site").val() === "" ||
      $("#numero_serie_site").val() === "" ||
      $("#piezas_site").val() === "" ||
      $("#alumno_prestamo").val() === "" ||
      $("#Control_prestamo").val() === "" ||
      $("#Carrera_prestamo").val() === null
    ) {
      // if ($("#fecha_prestamo").val() === "") {
      //   document.getElementById("fecha_prestamo").classList.add("faltante");
      // }
      // if ($("#fecha_regreso").val() === "") {
      //   document.getElementById("fecha_regreso").classList.add("faltante");
      // }
      if ($("#marca_site").val() === "") {
        document.getElementById("marca_site").classList.add("faltante");
      }
      if ($("#numero_serie_site").val() === "") {
        document.getElementById("numero_serie_site").classList.add("faltante");
      }
      if ($("#piezas_site").val() === "") {
        document.getElementById("piezas_site").classList.add("faltante");
      }
      if ($("#alumno_prestamo").val() === "") {
        document.getElementById("alumno_prestamo").classList.add("faltante");
      }
      if ($("#Control_prestamo").val() === "") {
        document.getElementById("Control_prestamo").classList.add("faltante");
      }
      if ($("#Carrera_prestamo").val() === null) {
        document.getElementById("Carrera_prestamo").classList.add("faltante");
      }
      if (document.getElementById("msgPrestamos")) {
        document.getElementById("msgPrestamos").remove();
      }
      const div = document.createElement("div");
      div.id = "msgPrestamos";
      div.classList.add("badge", "badge-danger", "p-1", "mb-2");
      div.innerText = "Falta Información";
      contenedorMensajesPrestamosSite.appendChild(div);
      setTimeout(() => {
        // document.getElementById("fecha_prestamo").classList.remove("faltante");
        // document.getElementById("fecha_regreso").classList.remove("faltante");
        document.getElementById("marca_site").classList.remove("faltante");
        document
          .getElementById("numero_serie_site")
          .classList.remove("faltante");
        document.getElementById("piezas_site").classList.remove("faltante");
        document.getElementById("alumno_prestamo").classList.remove("faltante");
        document
          .getElementById("Control_prestamo")
          .classList.remove("faltante");
        document
          .getElementById("Carrera_prestamo")
          .classList.remove("faltante");
        $("#msgPrestamos").toggle(500);
      }, 3000);
    } else if (Number($("#piezas_site").val()) < 1) {
      if (document.getElementById("msgPrestamos")) {
        document.getElementById("msgPrestamos").remove();
      }
      const div = document.createElement("div");
      div.id = "msgPrestamos";
      div.classList.add("badge", "badge-danger", "p-1", "mb-2");
      div.innerText = "No se puede prestar menos de 1 pza";
      contenedorMensajesPrestamosSite.appendChild(div);
      setTimeout(() => {
        $("#msgPrestamos").toggle(500);
      }, 3000);
    } else if (
      $("#Control_prestamo").val().length < 8 ||
      $("#Control_prestamo").val().length > 8
    ) {
      if (document.getElementById("msgPrestamos")) {
        document.getElementById("msgPrestamos").remove();
      }
      const div = document.createElement("div");
      div.id = "msgPrestamos";
      div.classList.add("badge", "badge-danger", "p-1", "mb-2");
      div.innerText =
        "No es el formato de numero de control tienes que poner 8 dígitos.";
      contenedorMensajesPrestamosSite.appendChild(div);
      setTimeout(() => {
        $("#msgPrestamos").toggle(500);
      }, 3000);
    } else {
      // datos
      const marca = $("#marca_site").val(),
        numeroPiezas = $("#piezas_site").val(),
        numeroSerie = $("#numero_serie_site").val(),
        nombreAlumno = $("#alumno_prestamo").val(),
        numeroControl = $("#Control_prestamo").val(),
        carreraAlumno = $("#Carrera_prestamo").val();
      var hoy = new Date();
      var hora =
        hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
      const datos = {
        nombre: nombreAlumno,
        noControl: numeroControl,
        carrera: carreraAlumno,
        cantidad: numeroPiezas,
        articulo: marca,
        serie: numeroSerie,
        fecha: fechaActual(),
        hora: hora,
      };
      fetch("php/site/insertar_prestamos_site", {
        method: "POST",
        body: JSON.stringify(datos),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
        });
    }
  }
}
