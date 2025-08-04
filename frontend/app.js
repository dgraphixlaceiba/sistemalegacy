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
  contenido.innerHTML = '<h3>Inventario (Materia Prima)</h3>';
  // Aquí implementa la carga y gestión de inventario desde backend
  contenido.innerHTML += '<p>Función de inventario en construcción...</p>';
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
