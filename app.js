document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('formProducto').addEventListener('submit',e=>{
    e.preventDefault();
    // enviar producto vía fetch al backend, actualizar tabla
  });
});
