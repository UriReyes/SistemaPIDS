$(document).ready(function () {
  var ingresar = $("#login");
  $("#cerrar-error").click(function (e) {
    e.preventDefault();
    $("#errores-login").hide(500);
  });

  $(ingresar).click(function (e) {
    e.preventDefault();
    var usuario = $("#usuario").val();
    var password = $("#password").val();
    if ($.trim(usuario).length > 0 && $.trim(password).length > 0) {
      const postData = {
        usuario: usuario,
        password: password,
      };
      $.post("php/sesion/inicio_sesion.php", postData, function (response) {
        console.log(response);
        $("#login").val("Ingresar");
        let id = response.split(",")[1];
        if (response.split(",")[0] == "1") {
          $(location).attr("href", "panel_control.php");
          $.post("php/usuarios/offline-usuario.php", { id }, function (
            response
          ) {
            console.log(response);
          });
        } else {
          document.getElementById("errores-login").style.display = "flex";
          $("#error-login").text(
            "Error, Verifica que los datos sean correctos"
          );
          setTimeout(function () {
            //Creamos una Funcion que pasando 3Segundos Cierra los errores
            $("#errores-login").hide(300);
          }, 2500);
        }
      });
    } else {
      document.getElementById("errores-login").style.display = "flex";
      console.log("Debes llenar los campos");
      $("#error-login").text("Debes Llenar Ambos Campos");
      setTimeout(function () {
        //Creamos una Funcion que pasando 2Segundos Cierra los errores
        $("#errores-login").hide(300);
      }, 2500);
    }
  });

  // $("#login").on("click", function(e) {
  //   e.preventDefault();
  //   var usuario = $("#usuario").val();
  //   var password = $("#password").val();
  //   if ($.trim(usuario).length > 0 && $.trim(password).length > 0) {
  //     $.ajax({
  //       type: "POST",
  //       url: "php/sesion/inicio_sesion.php",
  //       data: { usuario: usuario, password: password },
  //       success: function(response) {
  //         console.log(response);
  //         $("#login").val("Ingresar");
  //         if (response == "1") {
  //           $(location).attr("href", "panel_control.php");
  //         } else {
  //           alert("Error");
  //         }
  //       }
  //     });
  //   }
  // });
});

const inputs = document.querySelectorAll("input");

function focusFunc() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
