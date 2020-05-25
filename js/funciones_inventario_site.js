$(document).ready(function () {
  mostrar_datos();
  anadir_datos();
});
var table = null;
var editar = false;

var mostrar_datos = function () {
  table = $("#tabla-inventario-site").DataTable({
    destroy: true, //sirve para reinicializar el datatable al insertar datos
    ajax: {
      type: "POST",
      url: "php/site/mostrar-datos-site.php",
    },
    columns: [
      { data: "fecha" },
      { data: "marca" },
      { data: "modelo" },
      { data: "numero_serie" },
      { data: "folio" },
      { data: "estatus" },
      { data: "articulo" },
      { data: "piezas" },
      {
        defaultContent:
          "<div class='boton-acciones' style='width:50%'><button class='boton-editar editar-site'></button> <button class='boton-eliminar eliminar-site'></button></div>",
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
  editar_datos("#tabla-inventario-site tbody", table);
  eliminar_datos("#tabla-inventario-site tbody", table);
};

$("#abrirmodal").on("click", function () {
  editar = false;
});

var anadir_datos = function () {
  var guardar = document.getElementById("guardar_add");
  guardar.addEventListener("click", function () {
    if (editar == false) {
      console.log("Insertando...");
      if (
        $("#fecha_site").val() !== "" &&
        $("#marca_site").val() !== "" &&
        $("#modelo_site").val() !== "" &&
        $("#numero_serie_site").val() !== "" &&
        $("#folio_site").val() !== "" &&
        $("#estatus_site").val() &&
        $("#articulo_site").val() !== "" &&
        $("#piezas_site").val() !== ""
      ) {
        if (Number($("#piezas_site").val()) > 0) {
          const postData = {
            fecha: $("#fecha_site").val(),
            marca: $("#marca_site").val(),
            modelo: $("#modelo_site").val(),
            serie: $("#numero_serie_site").val(),
            folio: $("#folio_site").val(),
            estatus: $("#estatus_site").val(),
            articulo: $("#articulo_site").val(),
            piezas: $("#piezas_site").val(),
          };
          $.post("php/site/insertar-datos-site.php", postData, function (
            response
          ) {
            console.log(response);
            if (response == "Dato Insertado") {
              mensajeAlertaSweet(
                "¡Registro Insertado!",
                "El registró se insertó con exito",
                "success"
              );
            } else {
              mensajeAlertaSweet(
                "¡Ocurrió un error!",
                "Contácte con soporte",
                "error"
              );
            }
            refrescar();
            $("#form_inventario_site").trigger("reset");
            document.getElementById("modaladd").style.display = "none";
          });
        } else {
          if (document.getElementById("mensajeSite")) {
            document.getElementById("mensajeSite").remove();
          }
          const mensaje = document.getElementById(
            "modalMensajesInventarioSite"
          );
          const div = document.createElement("div");
          div.id = "mensajeSite";
          div.classList.add("alert");
          div.classList.add("alert-danger");
          div.innerText = "No puedes tener menos de 1pza.";
          mensaje.appendChild(div);
          setTimeout(() => {
            if (document.getElementById("mensajeSite")) {
              document.getElementById("mensajeSite").remove();
            }
          }, 3000);
        }
      } else {
        if (document.getElementById("mensajeSite")) {
          document.getElementById("mensajeSite").remove();
        }
        const mensaje = document.getElementById("modalMensajesInventarioSite");
        const div = document.createElement("div");
        div.id = "mensajeSite";
        div.classList.add("alert");
        div.classList.add("alert-danger");
        div.innerText = "Debes llenar todos los campos";
        mensaje.appendChild(div);
        setTimeout(() => {
          if (document.getElementById("mensajeSite")) {
            document.getElementById("mensajeSite").remove();
          }
        }, 3000);
      }
    }
  });
};

function editar_datos(tbody, table) {
  var data = null;
  $(tbody).on("click", "button.editar-site", function () {
    editar = true;
    if ($("table").hasClass("collapsed")) {
      console.log("Tabla colapsada");
      data = table.row($(this)).data();
    } else {
      console.log("Tabla Normal");
      data = table.row($(this).parents("tr")).data();
    }
    $("#id_site").val(data.id),
      $("#fecha_site").val(data.fecha),
      $("#marca_site").val(data.marca),
      $("#modelo_site").val(data.modelo),
      $("#numero_serie_site").val(data.numero_serie),
      $("#folio_site").val(data.folio),
      $("#estatus_site").val(data.estatus);
    $("#articulo_site").val(data.articulo);
    $("#piezas_site").val(data.piezas);
    $("#titulo-mimodal").text("Editar Site");
    $("#modaladd").show();
  });
  $("#guardar_add").on("click", function () {
    if (editar == true) {
      console.log("Editando...");
      if (
        $("#fecha_site").val() !== "" &&
        $("#marca_site").val() !== "" &&
        $("#modelo_site").val() !== "" &&
        $("#numero_serie_site").val() !== "" &&
        $("#folio_site").val() !== "" &&
        $("#estatus_site").val() &&
        $("#articulo_site").val() !== "" &&
        $("#piezas_site").val() !== ""
      ) {
        if (Number($("#piezas_site").val()) > 0) {
          const postData = {
            id: $("#id_site").val(),
            fecha: $("#fecha_site").val(),
            marca: $("#marca_site").val(),
            modelo: $("#modelo_site").val(),
            serie: $("#numero_serie_site").val(),
            folio: $("#folio_site").val(),
            estatus: $("#estatus_site").val(),
            articulo: $("#articulo_site").val(),
            piezas: $("#piezas_site").val(),
          };
          $.post("php/site/modificar-datos-site.php", postData, function (
            response
          ) {
            //console.log(response);
            if (response == "Dato Actualizado") {
              mensajeAlertaSweet(
                "¡Registro Editado!",
                "El registro se editó con éxito",
                "success"
              );
            } else {
              mensajeAlertaSweet(
                "!Ocurrió un error!",
                "Contácta con soporte",
                "error"
              );
            }
            refrescar();
            $("#form_inventario_site").trigger("reset");
          });
          document.getElementById("modaladd").style.display = "none";
        } else {
          if (document.getElementById("mensajeSite")) {
            document.getElementById("mensajeSite").remove();
          }
          const mensaje = document.getElementById(
            "modalMensajesInventarioSite"
          );
          const div = document.createElement("div");
          div.id = "mensajeSite";
          div.classList.add("alert");
          div.classList.add("alert-danger");
          div.innerText = "No puedes tener menos de 1pza.";
          mensaje.appendChild(div);
          setTimeout(() => {
            if (document.getElementById("mensajeSite")) {
              document.getElementById("mensajeSite").remove();
            }
          }, 3000);
        }
      } else {
        if (document.getElementById("mensajeSite")) {
          document.getElementById("mensajeSite").remove();
        }
        const mensaje = document.getElementById("modalMensajesInventarioSite");
        const div = document.createElement("div");
        div.id = "mensajeSite";
        div.classList.add("alert");
        div.classList.add("alert-danger");
        div.innerText = "Llena todos los campos";
        mensaje.appendChild(div);
        setTimeout(() => {
          if (document.getElementById("mensajeSite")) {
            document.getElementById("mensajeSite").remove();
          }
        }, 3000);
      }
    }
  });
}

var eliminar_datos = function (tbody, table) {
  var data = null;
  $(tbody).on("click", "button.eliminar-site", function () {
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
      caracteristicas = data.Caracteristicas,
      distintivo = data.Distintivo,
      estatus = data.Estatus;
    datos_delete = [
      id,
      fecha,
      marca,
      modelo,
      caracteristicas,
      distintivo,
      estatus,
    ];
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
        title: "¿Estas seguro?",
        text: "¡No puedes revertir este cambio!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.value) {
          var eliminar = $.post(
            "php/site/eliminar-datos-site.php",
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
                  "!Ocurrió un error¡",
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
            "¡Cancelaste!",
            "No se eliminó el registro",
            "error"
          );
        }
      });
  });
};

function mensajeAlertaSweet(titulo, mensaje, tipo) {
  let swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn btn-light",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons.fire(titulo, mensaje, tipo);
}

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

$("#home1").on("click", function () {
  $("#contenido").load("/sistema_PIDS/php/home.html");
});

var refrescar = function () {
  table.ajax.reload(); //Refrescamos la tabla
};
