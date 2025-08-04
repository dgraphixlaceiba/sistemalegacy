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
    html += '<tr
