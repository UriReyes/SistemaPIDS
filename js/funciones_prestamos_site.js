$(document).ready(function () {
  console.log("si we si jalo");
  acordeon();
  mostrar_datos();
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
          "<div class='boton-acciones' style='width:50%'><button class='boton-prestar editar-site'>Prestar</button></div>",
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
