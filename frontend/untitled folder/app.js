const app = document.getElementById('app');

function mostrarLogin() {
  app.innerHTML = `
    <h2>Login</h2>
    <input id="usuario" placeholder="Usuario" />
    <input id="password" type="password" placeholder="Contraseña" />
    <button id="btnLogin">Ingresar</button>
    <div id="alerta"></div>
  `;

  document.getElementById('btnLogin').onclick = async () => {
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    if (!usuario || !password) {
      document.getElementById('alerta').innerText = 'Llena todos los campos';
      return;
    }
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });
    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem('usuario', JSON.stringify(data));
      mostrarDashboard(data);
    } else {
      const err = await res.json();
      document.getElementById('alerta').innerText = err.error || 'Error en login';
    }
  };
}

function mostrarDashboard(usuario) {
  app.innerHTML = `
    <h2>Bienvenido, ${usuario.usuario} (${usuario.rol})</h2>
    <button id="logout">Cerrar sesión</button>
    <div>
      <button id="btnInventario">Inventario</button>
      <button id="btnVentas">Ventas</button>
      <button id="btnClientes">Clientes</button>
      <button id="btnCaja">Caja Chica</button>
    </div>
    <div id="contenido"></div>
  `;

  document.getElementById('logout').onclick = () => {
    sessionStorage.clear();
    mostrarLogin();
  };

  document.getElementById('btnInventario').onclick = cargarInventario;
  document.getElementById('btnVentas').onclick = cargarVentas;
  document.getElementById('btnClientes').onclick = cargarClientes;
  document.getElementById('btnCaja').onclick = cargarCaja;
}

async function cargarInventario() {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = '<h3>Inventario (Materia Prima)</h3><p>Cargando...</p>';

  try {
    const res = await fetch('/api/inventario/materia-prima');
    if (!res.ok) throw new Error('Error al cargar inventario');

    const materiaPrima = await res.json();

    if (materiaPrima.length === 0) {
      contenido.innerHTML = '<h3>Inventario (Materia Prima)</h3><p>No hay registros.</p>';
      return;
    }

    let html = '<h3>Inventario (Materia Prima)</h3><table border="1" cellpadding="5" cellspacing="0">';
    html += `
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Stock Mínimo</th>
      </tr>
    `;

    materiaPrima.forEach(item => {
      html += `
        <tr>
          <td>${item.nombre}</td>
          <td>${item.cantidad}</td>
          <td>${item.unidad}</td>
          <td>${item.stock_minimo}</td>
        </tr>
      `;
    });

    html += '</table>';
    contenido.innerHTML = html;

  } catch (error) {
    contenido.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

async function cargarVentas() {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = '<h3>Ventas</h3>';
  contenido.innerHTML += '<p>Función de ventas en construcción...</p>';
}

async function cargarClientes() {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = '<h3>Clientes</h3>';
  contenido.innerHTML += '<p>Función de clientes en construcción...</p>';
}

async function cargarCaja() {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = '<h3>Caja Chica</h3>';
  contenido.innerHTML += '<p>Función de caja chica en construcción...</p>';
}

function iniciar() {
  const usuario = sessionStorage.getItem('usuario');
  if (usuario) {
    mostrarDashboard(JSON.parse(usuario));
  } else {
    mostrarLogin();
  }
}

iniciar();
