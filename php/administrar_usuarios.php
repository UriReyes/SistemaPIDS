<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("location:404.php");
}
?>

<div>
    <div class="separador separacion">
        <h3>
            <i class="fas fa-robot"></i><a id="home1" href="#">Home</a> >
            <a id="inventario_laboratorio" class="resaltar_ruta">Administrar Usuarios
            </a>
        </h3>
    </div>
    <div id="mensajesUsuariosGlobal"></div>
    <div class="informacion-home">
        <div class="home-card tabla_general">
            <div class="head-homecard display-flex display-flex-spacebetween">
                <h1>Control de Usuarios</h1>
                <div class="contenedor-add-button">
                    <a id="abrirmodal" class="boton-grande boton-add" href="#">Nuevo</a>
                </div>
            </div>
            <div class="body-tabla-general">
                <div id="user-content" class="cards-user"></div>
            </div>
        </div>
        <!--Modal Añadir y Editar-->
        <div id="modaladd" class="mimodal">
            <div id="flexmodal" class="mimodal-flex">
                <div class="contenido-mimodal">
                    <div class="header-mimodal">
                        <i class="fas fa-box-open"></i>
                        <h1 id="titulo-mimodal" class="titulo-add">Añadir Registro</h1>
                        <span id="cerrarmodal" class="close-mimodal" hidden="true">&times;</span>
                    </div>
                    <div class="body-mimodal">
                        <form id="form_add_users" enctype="multipart/form-data">
                            <div class="contenedor">
                                <div class="icono-input-form">
                                    <input type="text" id="id_user" name="id_user" class="buscar" hidden="hidden" />
                                    <input type="text" id="nombre_usuario" name="nombre_usuario" class="buscar"
                                        placeholder="Nombre del usuario" />
                                    <small class="form-text text-muted">Ingresa el nombre</small>
                                    <div class="hijo-edit">
                                        <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                    </div>
                                </div>
                                <div class="icono-input-form">
                                    <input type="text" id="a_paterno_usuario" name="a_paterno_usuario" class="buscar"
                                        placeholder="Apellido Paterno" />
                                    <small class="form-text text-muted">Ingresa apellido paterno</small>
                                    <div class="hijo-edit">
                                        <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                    </div>
                                </div>
                                <div class="icono-input-form">
                                    <input type="text" id="a_materno_usuario" name="a_materno_usuario" class="buscar"
                                        placeholder="Apellido Materno" />
                                    <small class="form-text text-muted">Ingresa apellido materno</small>
                                    <div class="hijo-edit">
                                        <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                    </div>
                                </div>
                                <div class="icono-input-form">
                                    <input type="email" id="correo_usuario" name="correo_usuario" class="buscar"
                                        placeholder="Correo Electrónico" />
                                    <small class="form-text text-muted">Ingresa el correo electrónico</small>
                                    <div class="hijo-edit">
                                        <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                    </div>
                                </div>
                                <div class="icono-input-form">
                                    <input type="file" id="avatar_usuario" name="avatar_usuario" class="buscar"
                                        placeholder="Selecciona un avatar" />
                                    <small class="form-text text-muted">Selecciona un avatar</small>
                                    <div class="hijo-edit">
                                        <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                    </div>
                                </div>
                                <div id="visualizarImagen" class="text-center"></div>
                                <div class="icono-input-form">
                                    <select id="privilegios_usuario" name="privilegios_usuario" class="buscar">
                                        <option disabled selected value>
                                            -- Selecciona el privilegio --
                                        </option>
                                        <option value="administrador">Administrador</option>
                                        <option value="cliente">Cliente</option>
                                    </select>
                                    <small class="form-text text-muted">Estatus del Artículo</small>
                                </div>
                                <div class="icono-input-form">
                                    <input type="password" id="password_usuario" name="password_usuario" class="buscar"
                                        placeholder="Contraseña" />
                                    <small class="form-text text-muted">Ingresa una contraseña</small>
                                    <div class="hijo-edit">
                                        <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="modalMensajesUsuarios"></div>
                    <div class="footer-mimodal">
                        <div class="botonGuardar">
                            <a href="#" id="add-edit-user" class="boton boton-verde boton-guardar">Guardar</a>
                        </div>
                        <div class="botonCancelar">
                            <a href="#" id="cancelar_add" class="boton boton-rojo boton-cancelar">Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>