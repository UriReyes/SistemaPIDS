$(document).ready(function () {
  mostrarUsuarios();
});
var editar = true;
var eliminarAvatar = false;
var urlAvatarLocal;
$("#avatar_usuario").change(() => {
  eliminarAvatar = true;
});
function mostrarUsuarios() {
  $.ajax({
    type: "GET",
    url: "php/usuarios/mostrar-usuario.php",
    success: function (response) {
      let usuarios = JSON.parse(response);
      let template = "";
      usuarios.forEach((usuario) => {
        // En la base de datos cuando se esta offline se reserva el valor online para tomarlo una vez que se ingrese, por el contrario, cuando se ingresa el estado se actualiza a offline
        if (usuario.estado == "offline") {
          var estado = `<div class="estado-usuario"><p class="online"><i class="fa fa-circle"></i>Online</p></div>`; //cambiamos el ${usuario.estado} por texto simple
        } else {
          var estado = `<div class="estado-usuario"><p class="offline"><i class="fa fa-circle"></i>Offline</p></div>`; //cambiamos el ${usuario.estado} por texto simple
        }
        if (usuario.privilegios == "cliente") {
          var privilegios = `<h5 class="privilegio"><i class="fas fa-user"></i></i>${usuario.privilegios}</h5>`;
        } else {
          var privilegios = `<h5 class="privilegio"><i class="fas fa-user-secret"></i>${usuario.privilegios}</h5>`;
        }
        template += `
          <div class="card-user">
          <div class="head-card-user">
            <div class="foto-user">
              <img src="${usuario.avatar}" alt="Imagen Usuario-${usuario.nombre}" class="img-avatar-card img-fluid" />
              <h4>${usuario.nombre}</h4>
              <div class="datos-usuario">
              <div class="dato-usuario">
              <p class="departamento"><i class="fas fa-graduation-cap"></i>Departamento de Sistemas</p>
              </div>
              <div class="dato-usuario">
              ${privilegios}
              </div>
              <div class="dato-usuario">
              ${estado}
              </div>             
              </div>
            </div>
          </div>
          <div class="waves">
            <div class="body-card-user">
              <div class="datos-user"></div>
            </div>
            <div class="footer-card-user">
              <div class="acciones-user">
              <p id="id_usuario" hidden="hidden">${usuario.idUsuario}</p>
                <button class="boton-editar"></button>
                <button class="boton-eliminar"></button>
              </div>
            </div>
          </div>
        </div>
          `;
      });
      $("#user-content").html(template);
      $(".boton-editar").on("click", function (e) {
        let id_Usuario = e.target.parentElement.querySelector("p").innerText;
        datosUsuario(id_Usuario, returnData);
        vizaulizarImagen();
        editar = true;
        eliminarAvatar = false;
      });
      $(".boton-eliminar").on("click", function (e) {
        let id_Usuario = e.target.parentElement.querySelector("p").innerText;
        eliminar(id_Usuario);
      });
    },
  });
}

$("#abrirmodal").on("click", function () {
  editar = false;
  if (document.querySelector("#imagenVisualizada")) {
    document.querySelector("#imagenVisualizada").remove();
  }
  if (document.querySelector("#tituloImgPrevizualizada")) {
    document.querySelector("#tituloImgPrevizualizada").remove();
  }
  vizaulizarImagen();
  //anadir_datos();
});

var guardar = document.getElementById("add-edit-user");
guardar.addEventListener("click", function () {
  $("#titulo-mimodal").text("Añadir Usuario");
  if (editar == false) {
    if (
      $("#nombre_usuario").val() !== "" &&
      $("#a_paterno_usuario").val() !== "" &&
      $("#a_materno_usuario").val() !== "" &&
      $("#correo_usuario").val() !== "" &&
      $("#privilegios_usuario").val() !== "" &&
      $("#password_usuario").val() !== ""
    ) {
      // Imagen
      const formData = new FormData(document.getElementById("form_add_users"));
      fetch("php/usuarios/subir-imagen-usuario.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          if (data.split(",")[0] === "error") {
            if (document.getElementById("mensajeUsuarios")) {
              document.getElementById("mensajeUsuarios").remove();
            }
            const mensaje = document.getElementById("modalMensajesUsuarios");
            const div = document.createElement("div");
            div.id = "mensajeUsuarios";
            div.classList.add("alert");
            div.classList.add("alert-danger");
            div.innerText = data.split(",")[1];
            mensaje.appendChild(div);
            setTimeout(() => {
              if (document.getElementById("mensajeUsuarios")) {
                document.getElementById("mensajeUsuarios").remove();
              }
            }, 3000);
          } else {
            const postData = {
              nombre: $("#nombre_usuario").val(),
              a_paterno: $("#a_paterno_usuario").val(),
              a_materno: $("#a_materno_usuario").val(),
              correo: $("#correo_usuario").val(),
              avatar: data,
              privilegio: $("#privilegios_usuario").val(),
              password: $("#password_usuario").val(),
            };
            $.post("php/usuarios/insertar-usuario.php", postData, function (
              response
            ) {
              if (response == "Dato Insertado") {
                Swal.fire("Registro insertado", "con éxito!", "success");
                refrescar();
                var modal = document.getElementById("modaladd");
                modal.style.display = "none";
                console.log("Insertado");

                $("#form_add_users").trigger("reset");
              } else {
                let swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                    confirmButton: "btn btn-danger",
                    cancelButton: "btn btn-success",
                  },
                  buttonsStyling: false,
                });
                swalWithBootstrapButtons.fire(
                  "Ha Ocurrido Un Error ",
                  "",
                  "error"
                );
              }
              $("#form_add_users").trigger("reset");
            });
          }
        });
      // Datos
    } else {
      if (document.getElementById("mensajeUsuarios")) {
        document.getElementById("mensajeUsuarios").remove();
      }
      const mensaje = document.getElementById("modalMensajesUsuarios");
      const div = document.createElement("div");
      div.id = "mensajeUsuarios";
      div.classList.add("alert");
      div.classList.add("alert-danger");
      div.innerText = "Error, Llena todos los campos";
      mensaje.appendChild(div);
      setTimeout(() => {
        if (document.getElementById("mensajeUsuarios")) {
          document.getElementById("mensajeUsuarios").remove();
        }
      }, 3000);
    }
  }
});

function vizaulizarImagen() {
  $("#avatar_usuario").change(function (e) {
    if (document.querySelector("#imagenVisualizada")) {
      document.querySelector("#imagenVisualizada").remove();
    }
    if (document.querySelector("#tituloImgPrevizualizada")) {
      document.querySelector("#tituloImgPrevizualizada").remove();
    }
    const formData = new FormData(document.getElementById("form_add_users"));
    const url = URL.createObjectURL(formData.get("avatar_usuario"));
    const contenedor = document.getElementById("visualizarImagen");
    const imagen = document.createElement("img");
    const titulo = document.createElement("h5");
    imagen.style.width = "100px";
    imagen.style.height = "150px";
    imagen.style.borderRadius = "25px";
    imagen.id = "imagenVisualizada";
    imagen.src = url;
    // titulo
    titulo.id = "tituloImgPrevizualizada";
    titulo.innerText = "Previsualización";
    titulo.classList.add("badge");
    titulo.classList.add("badge-primary");
    contenedor.appendChild(titulo);
    contenedor.appendChild(imagen);
  });
}

/// Editar Usuario
function editarUsuario(datos) {
  visualizarImagenEditar(datos.avatar);
  let swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
  });
  $("#id_user").val(datos.idUsuario);
  $("#nombre_usuario").val(datos.nombre);
  $("#a_paterno_usuario").val(datos.a_paterno);
  $("#a_materno_usuario").val(datos.a_materno);
  $("#correo_usuario").val(datos.correo);
  //$("#avatar_usuario").val(datos.avatar);
  $("#privilegios_usuario").val(datos.privilegios);
  $("#password_usuario").val(datos.password);
  $("#titulo-mimodal").text("Editar Usuario");
  $("#modaladd").show();
  urlAvatarLocal = datos.avatar;
}

///////////////////
var guardar = document.getElementById("add-edit-user");
guardar.addEventListener("click", function () {
  if (editar == true) {
    if (
      $("#id_user").val() !== "" &&
      $("#nombre_usuario").val() !== "" &&
      $("#a_paterno_usuario").val() !== "" &&
      $("#a_materno_usuario").val() !== "" &&
      $("#correo_usuario").val() !== "" &&
      $("#privilegios_usuario").val() !== "" &&
      $("#password_usuario").val() !== ""
    ) {
      // if (eliminarAvatar) {
      //   eliminarImagen(datos.avatar);
      // }
      if (eliminarAvatar) {
        const formData = new FormData(
          document.getElementById("form_add_users")
        );
        fetch("php/usuarios/subir-imagen-usuario.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            if (data.split(",")[0] === "error") {
              if (document.getElementById("mensajeUsuarios")) {
                document.getElementById("mensajeUsuarios").remove();
              }
              const mensaje = document.getElementById("modalMensajesUsuarios");
              const div = document.createElement("div");
              div.id = "mensajeUsuarios";
              div.classList.add("alert");
              div.classList.add("alert-danger");
              div.innerText = data.split(",")[1];
              mensaje.appendChild(div);
              setTimeout(() => {
                if (document.getElementById("mensajeUsuarios")) {
                  document.getElementById("mensajeUsuarios").remove();
                }
              }, 3000);
            } else {
              const postData = {
                id: $("#id_user").val(),
                nombre: $("#nombre_usuario").val(),
                a_paterno: $("#a_paterno_usuario").val(),
                a_materno: $("#a_materno_usuario").val(),
                correo: $("#correo_usuario").val(),
                avatar: data,
                privilegio: $("#privilegios_usuario").val(),
                password: $("#password_usuario").val(),
              };
              $.post("php/usuarios/modificar-usuario.php", postData, function (
                response
              ) {
                if (response == "Usuario Actualizado") {
                  Swal.fire("Registro editado", "con éxito!", "success");
                  actualizarDatosSesion(postData);
                  var modal = document.getElementById("modaladd");
                  modal.style.display = "none";
                  refrescar();
                  console.log("Editando");
                  // const mensajeSession = document.getElementById(
                  //   "mensajesUsuariosGlobal"
                  // );
                  // mensajeSession.classList.add("alert");
                  // mensajeSession.classList.add("alert-info");
                  // mensajeSession.innerText =
                  //   "El cambio de imagen se verá reflejado cuando vuelvas a abrir la sesión...";
                  // setTimeout(() => {
                  //   mensajeSession.classList.remove("alert");
                  //   mensajeSession.innerText = "";
                  // }, 4000);
                } else {
                  swalWithBootstrapButtons.fire(
                    "Ha Ocurrido Un Error ",
                    "",
                    "error"
                  );
                }
              });
            }
          });
      } else {
        console.log(urlAvatarLocal);
        const postData = {
          id: $("#id_user").val(),
          nombre: $("#nombre_usuario").val(),
          a_paterno: $("#a_paterno_usuario").val(),
          a_materno: $("#a_materno_usuario").val(),
          correo: $("#correo_usuario").val(),
          avatar: urlAvatarLocal,
          privilegio: $("#privilegios_usuario").val(),
          password: $("#password_usuario").val(),
        };
        $.post("php/usuarios/modificar-usuario.php", postData, function (
          response
        ) {
          if (response == "Usuario Actualizado") {
            Swal.fire("Registro editado", "con éxito!", "success");
            actualizarDatosSesion(postData);
            refrescar();
            var modal = document.getElementById("modaladd");
            modal.style.display = "none";
            console.log("Editanto");
          } else {
            let swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-light",
                cancelButton: "btn btn-danger",
              },
              buttonsStyling: false,
            });
            swalWithBootstrapButtons.fire("Ha Ocurrido Un Error ", "", "error");
          }
        });
      }
    } else {
      if (document.getElementById("mensajeUsuarios")) {
        document.getElementById("mensajeUsuarios").remove();
      }
      const mensaje = document.getElementById("modalMensajesUsuarios");
      const div = document.createElement("div");
      div.id = "mensajeUsuarios";
      div.classList.add("alert");
      div.classList.add("alert-danger");
      div.innerText = "Error, Llena todos los campos";
      mensaje.appendChild(div);
      setTimeout(() => {
        if (document.getElementById("mensajeUsuarios")) {
          document.getElementById("mensajeUsuarios").remove();
        }
      }, 3000);
    }
  }
});
var cancelar = document.getElementById("cancelar_add");
cancelar.addEventListener("click", function () {
  editar = true;
  eliminarAvatar = false;
});

///////////////////

function visualizarImagenEditar(url) {
  if (document.querySelector("#imagenVisualizada")) {
    document.querySelector("#imagenVisualizada").remove();
  }
  if (document.querySelector("#tituloImgPrevizualizada")) {
    document.querySelector("#tituloImgPrevizualizada").remove();
  }
  const contenedor = document.getElementById("visualizarImagen");
  const imagen = document.createElement("img");
  const titulo = document.createElement("h5");
  imagen.style.width = "100px";
  imagen.style.height = "150px";
  imagen.style.borderRadius = "25px";
  imagen.id = "imagenVisualizada";
  imagen.src = url;
  // titulo
  titulo.id = "tituloImgPrevizualizada";
  titulo.innerText = "Previsualización";
  titulo.classList.add("badge");
  titulo.classList.add("badge-primary");
  contenedor.appendChild(titulo);
  contenedor.appendChild(imagen);
}

/* Funcion para eliminar imagenes de los avatar
   Tiene Bugs...
*/
function eliminarImagen(archivo) {
  let data = { element: archivo };
  fetch("php/usuarios/eliminar-avatar.php", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((data) => {});
}

function eliminar(idUsuario) {
  let swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-light",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Estas seguro?",
      text: "No puedes revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.value) {
        $.post("php/usuarios/eliminar-usuario.php", { idUsuario }, function (
          response
        ) {
          refrescar();
          if (response == "Usuario Eliminado") {
            swalWithBootstrapButtons.fire(
              "Eliminado!",
              "El registro ha sido eliminado.",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire("Ha Ocurrido Un Error ", "", "error");
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelado",
          "No eliminaste el registro",
          "error"
        );
      }
    });
}

function datosUsuario(idUsuario, callback) {
  // console.log(idUsuario);
  $.post("php/usuarios/obtener_datos_usuario.php", { idUsuario }, function (
    data
  ) {
    callback(data);
    editar = true;
  });
}
function returnData(param) {
  //console.log(param);
  var datos = JSON.parse(param);
  editarUsuario(datos[0]);
  editar = true;
}

function refrescar() {
  // $("#contenido").load("/sistema_PIDS/php/administrar_usuarios.php");
  // $.getScript("js/funciones-modal.js");
  // $.getScript("js/funciones_usuarios.js");
  if (document.querySelectorAll(".card-user")) {
    const cards = document.querySelectorAll(".card-user");
    cards.forEach((element) => {
      element.remove();
    });
    mostrarUsuarios();
  }
}

function actualizarDatosSesion(datos) {
  const idSesion = $("#id_sesion").text();
  datos.idSesion = idSesion;
  //console.log(datos);
  $.ajax({
    type: "POST",
    url: "php/sesion/modifica-datos-sesion.php",
    data: datos,
    success: function (response) {
      const responseJSON = JSON.parse(response);
      console.log(responseJSON);
      const privilegiosSesion = responseJSON.privilegios;
      const avatarSesion = responseJSON.avatar;
      const datosSesion = `${responseJSON.nombre} ${responseJSON.a_paterno} ${responseJSON.a_materno}`;
      if (Number(idSesion) === Number(responseJSON.id)) {
        document.getElementById(
          "datos-sesion"
        ).innerHTML = `<b>Nombre:</b> ${datosSesion}`;
        document.getElementById("avatar-user").src = avatarSesion;
        document.getElementById(
          "privilegios-sesion"
        ).innerHTML = `<b>Tipo:</b> ${privilegiosSesion}`;
      }
    },
  });
}
