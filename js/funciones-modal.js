$(function () {
  var modal = document.getElementById("modaladd");
  var flexmodal = document.getElementById("flexmodal");
  var cerrarmodal = document.getElementById("cerrarmodal");
  var abrirmodal = document.getElementById("abrirmodal");
  var cancelar = document.getElementById("cancelar_add");
  //var guardar = document.getElementById("guardar_add");
  //Funciones del inventario Site
  // console.log(modal);
  if (modal == null) {
    // alert('Ocurrió Un Error');
    $.getScript("js/funciones-modal.js");
  } else {
    abrirmodal.addEventListener("click", function () {
      modal.style.display = "block";
      $("form").trigger("reset");
    });

    // guardar.addEventListener("click", function () {
    //   // Swal.fire("Registro guardado", "Con éxito!", "success");
    //   //modal.style.display = "none";
    // });

    cerrarmodal.addEventListener("click", function () {
      modal.style.display = "none";
      $("#titulo-mimodal").text("Añadir Registro");
      $("form").trigger("reset");
    });
    cancelar.addEventListener("click", function () {
      // let swalWithBootstrapButtons = Swal.mixin({
      //   customClass: {
      //     confirmButton: "btn btn btn-light",
      //     cancelButton: "btn btn-danger",
      //   },
      //   buttonsStyling: false,
      // });
      // swalWithBootstrapButtons.fire({
      //   icon: "error",
      //   title: "¡Cancelaste!",
      //   text: "No se insertó ningún dato",
      // });
      modal.style.display = "none";
      $("form").trigger("reset");
    });
    window.addEventListener("click", function (e) {
      if (e.target == flexmodal) {
        // modal.style.display = "none";
        //$("#titulo-mimodal").text("Añadir Registro");
        // $("form").trigger("reset");
      }
    });
    $("#home1").on("click", function () {
      $("#contenido").load("/sistema_PIDS/php/home.html");
      //return false;
    });
  }

  /*Alerta Eliminar*/
  /*Alerta Exitosamente*/
});
