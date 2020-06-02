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

  //Recuperar Contraseña
  $("#formRecuperarPass").submit(function (e) {
    e.preventDefault();
    if ($("#newPassword").val() !== "" && $("#repitePassword").val() !== "") {
      /// Llenar ambos campos
      if ($("#newPassword").val() === $("#repitePassword").val()) {
        const datos = {
          correo: $("#correoDB").val(),
          password: $("#newPassword").val(),
        };
        $.post("recuperarPasswordCorreo.php", datos, function (data) {
          if (data === "1") {
            const contenedor = document.getElementById("errores-recuperar");
            if (document.getElementById("msgError")) {
              document.getElementById("msgError").remove();
            }
            const span = document.createElement("span");
            span.id = "msgError";
            span.classList.add("badge");
            span.classList.add("badge-success");
            span.innerText = "Contraseña actualizada";
            contenedor.appendChild(span);
            setTimeout(function () {
              //Creamos una Funcion que pasando 2Segundos Cierra los errores
              document.getElementById("msgError").remove();
            }, 3000);
            setTimeout(() => {
              window.close();
            }, 3000);
          } else {
            const contenedor = document.getElementById("errores-recuperar");
            if (document.getElementById("msgError")) {
              document.getElementById("msgError").remove();
            }
            const span = document.createElement("span");
            span.id = "msgError";
            span.classList.add("badge");
            span.classList.add("badge-danger");
            span.innerText = data;
            contenedor.appendChild(span);
            setTimeout(function () {
              //Creamos una Funcion que pasando 2Segundos Cierra los errores
              document.getElementById("msgError").remove();
            }, 3000);
          }
        });
      } else {
        const contenedor = document.getElementById("errores-recuperar");
        if (document.getElementById("msgError")) {
          document.getElementById("msgError").remove();
        }
        const span = document.createElement("span");
        span.id = "msgError";
        span.classList.add("badge");
        span.classList.add("badge-danger");
        span.innerText = "Las contraseñas no son las mismas";
        contenedor.appendChild(span);
        setTimeout(function () {
          //Creamos una Funcion que pasando 2Segundos Cierra los errores
          document.getElementById("msgError").remove();
        }, 3000);
      }
    } else {
      const contenedor = document.getElementById("errores-recuperar");
      if (document.getElementById("msgError")) {
        document.getElementById("msgError").remove();
      }
      const span = document.createElement("span");
      span.id = "msgError";
      span.classList.add("badge");
      span.classList.add("badge-danger");
      span.innerText = "Debes llenar todos los campos que se requieren";
      contenedor.appendChild(span);
      setTimeout(function () {
        //Creamos una Funcion que pasando 2Segundos Cierra los errores
        document.getElementById("msgError").remove();
      }, 3000);
    }
  });
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
