$(document).ready(function () {
  mostrar_datos();
  anadir_datos();
});
var table = null;
var editar = false;
var count = 0;
var mostrar_datos = function () {
  table = $("#tabla-inventario-laboratorio").DataTable({
    destroy: true, //sirve para reinicializar el datatable al insertar datos
    ajax: {
      type: "POST",
      url: "php/laboratorio/mostrar-datos-laboratorio.php",
    },
    columns: [
      { data: "fecha" },
      { data: "laboratorio" },
      { data: "marca" },
      { data: "modelo" },
      { data: "numero_serie" },
      { data: "folio" },
      { data: "estatus" },
      { data: "articulo" },
      {
        defaultContent:
          "<div class='boton-acciones' style='width:50%'><button class='boton-editar editar-laboratorio'></button> <button class='boton-eliminar eliminar-laboratorio'></button></div>",
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
  editar_datos("#tabla-inventario-laboratorio tbody", table);
  eliminar_datos("#tabla-inventario-laboratorio tbody", table);
};

$("#abrirmodal").on("click", function () {
  editar = false;
});

var anadir_datos = function () {
  let swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
  });
  var guardar = document.getElementById("guardar_laboratorio");
  guardar.addEventListener("click", function () {
    if (editar == false) {
      console.log("Insertando...");
      // Verificar si los datos son !"" o !null
      if (
        $("#fecha_laboratorio").val() !== "" &&
        $("#laboratorio_laboratorio").val() !== "" &&
        $("#marca_laboratorio").val() !== "" &&
        $("#modelo_laboratorio").val() !== "" &&
        $("#serie_laboratorio").val() !== "" &&
        $("#folio_laboratorio").val() &&
        $("#estatus_laboratorio").val() !== "" &&
        $("#articulo_laboratorio").val() !== ""
      ) {
        const postData = {
          fecha: $("#fecha_laboratorio").val(),
          laboratorio: $("#laboratorio_laboratorio").val(),
          marca: $("#marca_laboratorio").val(),
          modelo: $("#modelo_laboratorio").val(),
          serie: $("#serie_laboratorio").val(),
          folio: $("#folio_laboratorio").val(),
          estatus: $("#estatus_laboratorio").val(),
          articulo: $("#articulo_laboratorio").val(),
        };
        $.post(
          "php/laboratorio/insertar-datos-laboratorio.php",
          postData,
          function (response) {
            console.log(response);
            if (response == "Dato Insertado") {
              Swal.fire("¡Registro insertado", "con éxito!", "success");
            } else {
              swalWithBootstrapButtons.fire(
                "¡Ha Ocurrido Un Error!",
                "",
                "error"
              );
            }
            refrescar();
            $("#form_inventario_laboratorio").trigger("reset");
          }
        );
        document.getElementById("modaladd").style.display = "none";
      } else {
        if (document.getElementById("mensajeLaboratorio")) {
          document.getElementById("mensajeLaboratorio").remove();
        }
        const mensaje = document.getElementById(
          "modalMensajesInventarioLaboratorio"
        );
        const div = document.createElement("div");
        div.id = "mensajeLaboratorio";
        div.classList.add("alert");
        div.classList.add("alert-danger");
        div.innerText = "¡Error!, Llena todos los campos";
        mensaje.appendChild(div);
        setTimeout(() => {
          if (document.getElementById("mensajeLaboratorio")) {
            document.getElementById("mensajeLaboratorio").remove();
          }
        }, 3000);
      }
    }
  });
};

var editar_datos = function (tbody, table) {
  let swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
  });
  var data = null;
  $(tbody).on("click", ".editar-laboratorio", function () {
    editar = true;
    if ($("table").hasClass("collapsed")) {
      console.log("Tabla Colapsada");
      data = table.row($(this)).data();
    } else {
      console.log("Tabla Normal");
      data = table.row($(this).parents("tr")).data();
    }
    console.log(data);
    $("#id_laboratorio").val(data.id),
      $("#fecha_laboratorio").val(data.fecha),
      $("#laboratorio_laboratorio").val(data.laboratorio),
      $("#marca_laboratorio").val(data.marca),
      $("#modelo_laboratorio").val(data.modelo),
      $("#serie_laboratorio").val(data.numero_serie),
      $("#folio_laboratorio").val(data.folio),
      $("#estatus_laboratorio").val(data.estatus);
    $("#articulo_laboratorio").val(data.articulo);
    $("#titulo-mimodal").text("Editar laboratorio");
    $("#modaladd").show();
  });
  $("#guardar_laboratorio").on("click", (e) => {
    e.preventDefault();
    console.log(count);
    if (editar == true) {
      // Aquí
      console.log("Editando...");
      if (
        $("#fecha_laboratorio").val() !== "" &&
        $("#laboratorio_laboratorio").val() !== "" &&
        $("#marca_laboratorio").val() !== "" &&
        $("#modelo_laboratorio").val() !== "" &&
        $("#serie_laboratorio").val() !== "" &&
        $("#folio_laboratorio").val() &&
        $("#estatus_laboratorio").val() !== "" &&
        $("#articulo_laboratorio").val() !== ""
      ) {
        const postData = {
          id: $("#id_laboratorio").val(),
          fecha: $("#fecha_laboratorio").val(),
          laboratorio: $("#laboratorio_laboratorio").val(),
          marca: $("#marca_laboratorio").val(),
          modelo: $("#modelo_laboratorio").val(),
          serie: $("#serie_laboratorio").val(),
          folio: $("#folio_laboratorio").val(),
          estatus: $("#estatus_laboratorio").val(),
          articulo: $("#articulo_laboratorio").val(),
        };
        $.post(
          "php/laboratorio/modificar-datos-laboratorio.php",
          postData,
          function (response) {
            console.log(response);
            if (response == "Dato Actualizado") {
              Swal.fire("¡Registro editado", "con éxito!", "success");
            } else {
              swalWithBootstrapButtons.fire(
                "¡Ha Ocurrido Un Error! ",
                "",
                "error"
              );
            }
            refrescar();
            $("#form_inventario_laboratorio").trigger("reset");
          }
        );
        document.getElementById("modaladd").style.display = "none";
      } else {
        if (document.getElementById("mensajeLaboratorio")) {
          document.getElementById("mensajeLaboratorio").remove();
        }
        const mensaje = document.getElementById(
          "modalMensajesInventarioLaboratorio"
        );
        const div = document.createElement("div");
        div.id = "mensajeLaboratorio";
        div.classList.add("alert");
        div.classList.add("alert-danger");
        div.innerText = "¡Error!, Llena todos los campos";
        mensaje.appendChild(div);
        setTimeout(() => {
          if (document.getElementById("mensajeLaboratorio")) {
            document.getElementById("mensajeLaboratorio").remove();
          }
        }, 3000);
      }
    }
  });
};

var eliminar_datos = function (tbody, table) {
  var data = null;
  $(tbody).on("click", "button.eliminar-laboratorio", function () {
    if ($("table").hasClass("collapsed")) {
      console.log("Si");
      data = table.row($(this)).data();
    } else {
      console.log("No");
      data = table.row($(this).parents("tr")).data();
    }
    var id = data.id;
    console.log(data);
    var datos_delete = "";
    var fecha = data.Fecha,
      marca = data.Marca,
      modelo = data.Modelo,
      serie = data.serie,
      distintivo = data.Distintivo,
      estatus = data.Estatus;
    datos_delete = [id, fecha, marca, modelo, serie, distintivo, estatus];
    $("#inf-delete").text(datos_delete);
    // $('#modaldelete').show();
    let swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn btn-light",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¡¿Estas seguro?",
        text: "No puedes revertir este cambio!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.value) {
          var eliminar = $.post(
            "php/laboratorio/eliminar-datos-laboratorio.php",
            { id },
            function (response) {
              refrescar();
              if (response != "Consulta Fallida") {
                swalWithBootstrapButtons.fire(
                  "¡Eliminado!",
                  "El registro ha sido eliminado.",
                  "success"
                );
              } else {
                swalWithBootstrapButtons.fire(
                  "Ha ocurrido un error",
                  "",
                  "error"
                );
              }
              console.log(response);
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "¡Cancelado!",
            "No eliminaste el registro",
            "error"
          );
        }
      });
  });
};

// $("#search").keyup(function() {
//   var buscado = $("#search").val();
// });

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
