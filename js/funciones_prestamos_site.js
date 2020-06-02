$(document).ready(function () {
  console.log("si we si jalo");

  acordeon();
  mostrar_datos();
  mostrar_prestamos();
  mostrar_devoluciones();
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
        document.getElementById("form_prestamos_site").reset();
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
        document.getElementById("form_prestamos_site").reset();
      }
    });
});

var table = null,
  table1 = null,
  table2 = null;
var editar = false;
var mostrar_datos = function () {
  table = $("#tabla-prestamos-site").DataTable({
    destroy: true, //sirve para reinicializar el datatable al insertar datos
    ajax: {
      type: "POST",
      url: "php/site/mostrar-datos-site.php",
    },
    fixedHeader: true,
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

/* Mostrar Prestamos */
var mostrar_prestamos = function () {
  table1 = $("#tabla-articulos-prestados").DataTable({
    destroy: true, //sirve para reinicializar el datatable al insertar datos
    ajax: {
      type: "POST",
      url: "php/site/mostrar-prestamos-site.php",
    },
    columns: [
      {
        data: "nombre_prestario",
      },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.no_control === null) {
            return `<span class="badge badge-secondary">Sin No. Control</span>`;
          } else {
            return `<span class="badge badge-secondary">${JsonResultRow.no_control}</span>`;
          }
        },
      },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.carrera === null) {
            return `<p>Sin Carrera</p>`;
          } else {
            return `<p>${JsonResultRow.carrera}</p>`;
          }
        },
      },
      { data: "tipo" },
      { data: "articulo" },
      { data: "serie" },
      { data: "cantidad" },
      { data: "fecha_prestamo" },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.fecha_regreso === null) {
            return `<span class="badge badge-warning">Sin Fecha de devolución</span>`;
          } else {
            return `<span class="badge badge-warning">${JsonResultRow.fecha_regreso}</span>`;
          }
        },
      },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.estatus === "Prestado") {
            return `<span class="badge badge-danger">${JsonResultRow.estatus}</span>`;
          } else {
            return `<span class="badge badge-success">${JsonResultRow.estatus}</span>`;
          }
        },
      },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.estado_regreso === "Sin devolucion") {
            return `<span class="badge badge-primary">${JsonResultRow.estado_regreso}</span>`;
          } else if (JsonResultRow.estado_regreso === "Devuelto a tiempo") {
            return `<span class="badge badge-success">${JsonResultRow.estado_regreso}</span>`;
          } else if (JsonResultRow.estado_regreso === "Con tardanza") {
            return `<span class="badge badge-warning">${JsonResultRow.estado_regreso}</span>`;
          } else {
            return `<span class="badge badge-danger">${JsonResultRow.estado_regreso}</span>`;
          }
        },
      },
      {
        defaultContent:
          "<div class='boton-acciones' style='width:50%'><button class='devolucionSite editar-site boton-prestar2'>Devolver</button><button class='valeSite editar-site boton-prestar2'>Imprimir Vale</button></div>",
      },
    ],
    iDisplayLength: 5,
    aLengthMenu: [
      [5, 10, 25, 50, 100, -1],
      [5, 10, 25, 50, 100, "All"],
    ],
    language: idioma_espanol,
  });
  $("#search1").on("keyup", function () {
    table1.search(this.value).draw();
  });
  $("#search1").keypress(function (e) {
    var keycode = e.keyCode;
    if (keycode == "13") {
      e.preventDefault();
    }
  }); // Eliminar evento Press Enter
  prestamo_datos1("#tabla-articulos-prestados", table1);
  $("#filtroPrestados").on("click", function () {
    table1.search("Alumno").draw();
  });
  $("#filtroDevueltos").on("click", function () {
    table1.search("Docente").draw();
  });
  $("#filtroTodos").on("click", function () {
    table1.search("").draw();
  });
};
var mostrar_devoluciones = function () {
  table2 = $("#tabla-devoluciones").DataTable({
    destroy: true, //sirve para reinicializar el datatable al insertar datos
    ajax: {
      type: "POST",
      url: "php/site/mostrar-devoluciones-site.php",
    },
    columns: [
      { data: "tipo" },
      {
        data: "nombre_prestario",
      },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.no_control === null) {
            return `<span class="badge badge-secondary">Sin No. Control</span>`;
          } else {
            return `<span class="badge badge-secondary">${JsonResultRow.no_control}</span>`;
          }
        },
      },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.carrera === null) {
            return `<p>Sin Carrera</p>`;
          } else {
            return `<p>${JsonResultRow.carrera}</p>`;
          }
        },
      },
      { data: "articulo" },
      { data: "serie" },
      { data: "cantidad" },
      { data: "fecha_prestamo" },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.fecha_regreso === null) {
            return `<span class="badge badge-warning">Sin Fecha de devolución</span>`;
          } else {
            return `<span class="badge badge-warning">${JsonResultRow.fecha_regreso}</span>`;
          }
        },
      },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.estatus === "Prestado") {
            return `<span class="badge badge-danger">${JsonResultRow.estatus}</span>`;
          } else {
            return `<span class="badge badge-success">${JsonResultRow.estatus}</span>`;
          }
        },
      },
      {
        render: function (data, type, JsonResultRow, meta) {
          if (JsonResultRow.estado_regreso === "Sin devolucion") {
            return `<span class="badge badge-primary">${JsonResultRow.estado_regreso}</span>`;
          } else if (JsonResultRow.estado_regreso === "Devuelto a tiempo") {
            return `<span class="badge badge-success">${JsonResultRow.estado_regreso}</span>`;
          } else if (JsonResultRow.estado_regreso === "Con tardanza") {
            return `<span class="badge badge-warning">${JsonResultRow.estado_regreso}</span>`;
          } else {
            return `<span class="badge badge-danger">${JsonResultRow.estado_regreso}</span>`;
          }
        },
      },
    ],
    iDisplayLength: 5,
    aLengthMenu: [
      [5, 10, 25, 50, 100, -1],
      [5, 10, 25, 50, 100, "All"],
    ],
    language: idioma_espanol,
  });
  $("#search2").on("keyup", function () {
    table2.search(this.value).draw();
  });
  $("#search2").keypress(function (e) {
    var keycode = e.keyCode;
    if (keycode == "13") {
      e.preventDefault();
    }
  });
  $("#fechaDev").on("change", function () {
    table2.search($("#fechaDev").val()).draw();
  });
  $("#filtroTodosDevueltos").on("click", function () {
    $("#fechaDev").val(null);
    table2.search("").draw();
  });
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
    $("#id_site").val(data.id),
      $("#fecha_prestamo").val(fechaActual()),
      $("#marca_site").val(data.marca),
      $("#modelo_site").val(data.modelo),
      $("#numero_serie_site").val(data.numero_serie),
      $("#folio_site").val(data.folio),
      $("#estatus_site").val(data.estatus),
      $("#articulo_site").val(data.articulo),
      $("#piezas_site").val(1);
  });
};
var prestamo_datos1 = function (tbody, tabla) {
  var data = null;
  let swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-light",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  $(tbody).on("click", "button.devolucionSite", function () {
    if ($("table").hasClass("collapsed")) {
      data = tabla.row($(this)).data();
    } else {
      data = tabla.row($(this).parents("tr")).data();
    }
    swalWithBootstrapButtons
      .fire({
        title: "Confirmación",
        text: "El articulo será devuelto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          var fecha_Actual = fechaActual();
          var hoy = new Date();
          var horaActual =
            hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
          var fechaPrestamo = data.fecha_prestamo.split(" ")[0];
          var fechaTotal = fechaActual() + " " + horaActual;
          var datos;
          // Checar si se devuelve el mismo día
          if (fechaPrestamo === fecha_Actual) {
            var horaPrestamo = new Date(data.fecha_prestamo);
            var horaDevolucion = new Date(fechaTotal);
            console.log(horaPrestamo);
            console.log(horaDevolucion);
            // Calculamos horas transcurridas
            var minutosDiferencia = Math.round(
              Math.abs((horaDevolucion - horaPrestamo) / 1000 / 60 / 60)
            );
            if (minutosDiferencia <= 4) {
              datos = {
                id: data.id,
                devolucion: fechaTotal,
                estatus: "Devuelto",
                estadoDevolucion: "Devuelto a tiempo",
              };
            } else if (minutosDiferencia > 4 && minutosDiferencia <= 6) {
              datos = {
                id: data.id,
                devolucion: fechaTotal,
                estatus: "Devuelto",
                estadoDevolucion: "Devuelto con tardanza",
              };
            } else {
              datos = {
                id: data.id,
                devolucion: fechaTotal,
                estatus: "Devuelto",
                estadoDevolucion: "Devuelto con extrema tardanza",
              };
            }
            fetch("php/site/modificar_prestamos_site.php", {
              method: "POST",
              body: JSON.stringify(datos),
            })
              .then((response) => response.text())
              .then((data) => {
                if (data === "Articulo Devuelto") {
                  mensajeAlertaSweet(
                    "Se realizó la devolución",
                    "El articulo ha sido devuelto con éxito",
                    "success"
                  );
                  table1.ajax.reload();
                } else {
                  mensajeAlertaSweet(
                    "Ha ocurrido un error",
                    "Ocurrió un error al devolver el articulo",
                    "error"
                  );
                }
              });
          } else {
            datos = {
              id: data.id,
              devolucion: fechaTotal,
              estatus: "Devuelto",
              estadoDevolucion: "Devuelto con extrema tardanza",
            };
            fetch("php/site/modificar_prestamos_site.php", {
              method: "POST",
              body: JSON.stringify(datos),
            })
              .then((response) => response.text())
              .then((data) => {
                if (data === "Articulo Devuelto") {
                  mensajeAlertaSweet(
                    "Se realizó la devolución",
                    "El articulo ha sido devuelto con éxito",
                    "success"
                  );
                  table1.ajax.reload();
                } else {
                  mensajeAlertaSweet(
                    "Ha ocurrido un error",
                    "Ocurrió un error al devolver el articulo",
                    "error"
                  );
                }
              });
          }
        }
      });
  });
  $(tbody).on("click", "button.valeSite", function () {
    swalWithBootstrapButtons
      .fire({
        title: "Confirmación",
        text: "Desea Imprimír el vale",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          if ($("table").hasClass("collapsed")) {
            console.log("Si");
            data = table1.row($(this)).data();
          } else {
            console.log("No");
            data = table1.row($(this).parents("tr")).data();
          }
          generarVale(
            data,
            "php/vales_reportes/generarVale2.php",
            "Imprimir Vale"
          );
          $("#modalEsperaPDF").modal("show");
        }
      });
  });
};
/* Prestamos Control*/
var contenedorMensajesPrestamosSite = document.getElementById(
  "mensajesPrestamosSite"
);
if (!document.getElementById("prestar")) {
  alert("Ocurrio Un Error");
}
var btnPrestar = document.getElementById("prestar");
btnPrestar.addEventListener("click", function () {
  prestarSiteArticulo();
});

function prestarSiteArticulo() {
  var letterNumber = /^[a-zA-Z ]{3,150}$/;
  if (document.getElementById("tipoPrestario").checked == true) {
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
    } else if (!$("#alumno_prestamo").val().match(letterNumber)) {
      if (document.getElementById("msgPrestamos")) {
        document.getElementById("msgPrestamos").remove();
      }
      const div = document.createElement("div");
      div.id = "msgPrestamos";
      div.classList.add("badge", "badge-danger", "p-1", "mb-2");
      div.innerText =
        "Ingresa el nombre con el siguiente formato: Sólo Letras y más de 3 letras";
      contenedorMensajesPrestamosSite.appendChild(div);
      setTimeout(() => {
        $("#msgPrestamos").toggle(500);
      }, 3000);
    } else {
      // datos
      const marca = $("#marca_site").val(),
        numeroPiezas = $("#piezas_site").val(),
        numeroSerie = $("#numero_serie_site").val(),
        nombreAlumno = $("#alumno_prestamo").val().trim();
      var hoy = new Date();
      var hora =
        hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
      const datos = {
        tipo: "Docente",
        nombre: nombreAlumno,
        articulo: marca,
        serie: numeroSerie,
        cantidad: numeroPiezas,
        fecha: fechaActual(),
        hora: hora,
      };
      console.log(datos);
      fetch("php/site/insertar_prestamos_site.php", {
        method: "POST",
        body: JSON.stringify(datos),
      })
        .then((response) => response.text())
        .then((data) => {
          if (Number(data) === 1) {
            generarVale(
              datos,
              "php/vales_reportes/generarVale.php",
              "Prestamo Realizado con éxito"
            );
            $("#modalEsperaPDF").modal("show");
            table1.ajax.reload();
            document.getElementById("form_prestamos_site").reset();
          } else {
            mensajeAlertaSweet(
              "Ha ocurrido un error",
              "Ocurrió un error al realizar el prestamo, intente de nuevo o recargue la página",
              "error"
            );
            table1.ajax.reload();
            document.getElementById("form_prestamos_site").reset();
          }
        });
    }
  } else {
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
    } else if (!$("#alumno_prestamo").val().match(letterNumber)) {
      if (document.getElementById("msgPrestamos")) {
        document.getElementById("msgPrestamos").remove();
      }
      const div = document.createElement("div");
      div.id = "msgPrestamos";
      div.classList.add("badge", "badge-danger", "p-1", "mb-2");
      div.innerText =
        "Ingresa el nombre con el siguiente formato: Sólo Letras y más de 3 letras";
      contenedorMensajesPrestamosSite.appendChild(div);
      setTimeout(() => {
        $("#msgPrestamos").toggle(500);
      }, 3000);
    } else {
      // datos
      const marca = $("#marca_site").val(),
        numeroPiezas = $("#piezas_site").val(),
        numeroSerie = $("#numero_serie_site").val(),
        nombreAlumno = $("#alumno_prestamo").val().trim(),
        numeroControl = $("#Control_prestamo").val(),
        carreraAlumno = $("#Carrera_prestamo").val();
      var hoy = new Date();
      var hora =
        hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
      const datos = {
        tipo: "Alumno",
        nombre: nombreAlumno,
        noControl: numeroControl,
        carrera: carreraAlumno,
        articulo: marca,
        serie: numeroSerie,
        cantidad: numeroPiezas,
        fecha: fechaActual(),
        hora: hora,
      };

      fetch("php/site/insertar_prestamos_site.php", {
        method: "POST",
        body: JSON.stringify(datos),
      })
        .then((response) => response.text())
        .then((data) => {
          if (Number(data) === 1) {
            generarVale(
              datos,
              "php/vales_reportes/generarVale.php",
              "Prestamo Realizado con éxito"
            );
            $("#modalEsperaPDF").modal("show");
            table1.ajax.reload();
            document.getElementById("form_prestamos_site").reset();
          } else {
            mensajeAlertaSweet(
              "Ha ocurrido un error",
              "Ocurrió un error al realizar el prestamo, intente de nuevo o recargue la página",
              "error"
            );
            table1.ajax.reload();
            document.getElementById("form_prestamos_site").reset();
          }
        });
    }
  }
}

function generarVale(datos, url, mensaje) {
  document.getElementById("tituloModalPrestamos").innerText = mensaje;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
  })
    .then((response) => response.blob())
    .then((data) => {
      $("#modalEsperaPDF").modal("hide");
      var file = new Blob([data], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // var fileLink = document.createElement("a");
      // fileLink.href = fileURL;

      // // it forces the name of the downloaded file
      // fileLink.download = "vales.pdf";
      // // triggers the click event
      // fileLink.click();
    });
}

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
  table1.ajax.reload(); //Refrescamos la tabla
  table2.ajax.reload(); //Refrescamos la tabla
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
