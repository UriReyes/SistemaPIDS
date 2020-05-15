<div class="">
    <div class="separador separacion">
        <h3>
            <i class="fas fa-robot"></i><a id="home1" href="#">Home</a> >
            <a id="inventario_site">Site</a> >
            <a id="inventario_site" class="resaltar_ruta">Inventario</a>
        </h3>
    </div>
    <div class="add-registro">
        <div class="buscador">
            <form>
                <input type="search" id="search" class="buscar" placeholder="Buscador..." />
                <div class="hijo">
                    <p class="icono-input buscador-icon boton-transparente"></p>
                </div>
            </form>
        </div>
        <div class="contenedor-add-button">
            <a id="abrirmodal" class="boton-grande boton-add" href="#">Nuevo</a>
        </div>
    </div>

    <div class="informacion-home">
        <div class="home-card tabla_general">
            <div class="head-homecard">
                <h1>Control de Inventario del Site</h1>
            </div>
            <div class="body-tabla-general">
                <table id="tabla-inventario-site" class="table dt-responsive nowrap" style="width:100%">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">No. Serie</th>
                            <th scope="col">Folio</th>
                            <th scope="col">Estatus</th>
                            <th scope="col">Articulo</th>
                            <th scope="col">Piezas</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <!-- <tbody id="datos-site"></tbody> -->
                </table>
            </div>
        </div>
    </div>

    <!--Modal Añadir y Editar-->
    <div id="modaladd" class="mimodal">
        <div id="flexmodal" class="mimodal-flex">
            <div class="contenido-mimodal">
                <div class="header-mimodal">
                    <i class="fas fa-box-open"></i>
                    <h1 id="titulo-mimodal" class="titulo-add">Añadir Registro</h1>
                    <span id="cerrarmodal" class="close-mimodal">&times;</span>
                </div>
                <div class="body-mimodal">
                    <form id="form_inventario_site">
                        <div class="contenedor">
                            <div class="icono-input-form">
                                <input type="hidden" name="id_site" id="id_site" />
                                <input type="date" id="fecha_site" name="fecha_site" class="buscar"
                                    placeholder="Fecha Ingreso del Artículo" />
                                <small class="form-text text-muted">Fecha de Ingreso del
                                    Artículo</small>
                                <div class="hijo-edit">
                                    <a class="icono-input fecha-icon boton-transparente Onlyicono"></a>
                                </div>
                            </div>
                            <div class="icono-input-form">
                                <input type="text" id="marca_site" name="marca_site" class="buscar"
                                    placeholder="Marca" />
                                <small class="form-text text-muted">Marca del Artículo</small>
                                <div class="hijo-edit">
                                    <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                </div>
                            </div>
                            <div class="icono-input-form">
                                <input type="text" id="modelo_site" name="modelo_site" class="buscar"
                                    placeholder="Modelo" />
                                <small class="form-text text-muted">Modelo del
                                    Artículo</small>
                                <div class="hijo-edit">
                                    <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                </div>
                            </div>
                            <div class="icono-input-form">
                                <input type="text" id="numero_serie_site" name="numero_serie_site" class="buscar"
                                    placeholder="Número de Serie" />
                                <small class="form-text text-muted">Número de serie del
                                    Artículo</small>
                                <div class="hijo-edit">
                                    <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                </div>
                            </div>
                            <div class="icono-input-form">
                                <input type="text" id="folio_site" name="folio_site" class="buscar"
                                    placeholder="Folio" />
                                <small class="form-text text-muted">Folio del
                                    Artículo</small>
                                <div class="hijo-edit">
                                    <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                </div>
                            </div>
                            <div class="icono-input-form">
                                <select id="estatus_site" name="estatus_site" class="buscar">
                                    <option disabled selected value>
                                        -- Selecciona un estatus --
                                    </option>
                                    <option value="NUEVO">N/A</option>
                                    <option value="NUEVO">Nuevo</option>
                                    <option value="USADO">Funciona</option>
                                    <option value="USADO">Averiado</option>
                                </select>
                                <small class="form-text text-muted">Estatus del
                                    Artículo</small>
                            </div>
                            <div class="icono-input-form">
                                <input type="text" id="articulo_site" name="articulo_site" class="buscar"
                                    placeholder="Artículo" />
                                <small class="form-text text-muted">Nombre del
                                    Artículo</small>
                                <div class="hijo-edit">
                                    <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                </div>
                            </div>
                            <div class="icono-input-form">
                                <input type="number" id="piezas_site" name="piezas_site" class="buscar"
                                    placeholder="Total de Piezas" min="1" />
                                <small class="form-text text-muted">Número de piezas ingresadas</small>
                                <div class="hijo-edit">
                                    <a class="icono-input computer-icon boton-transparente Onlyicono"></a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="modalMensajesInventarioSite"></div>
                <div class="footer-mimodal">
                    <div class="botonGuardar">
                        <a href="#" id="guardar_add" class="boton boton-verde boton-guardar">Guardar</a>
                    </div>
                    <div class="botonCancelar">
                        <a href="#" id="cancelar_add" class="boton boton-rojo boton-cancelar">Cancelar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>