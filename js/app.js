//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado')

const maxYear = new Date().getFullYear()
const minYear = maxYear - 11


//Objeto de Búsqueda

const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: ''
}


//Eventos
document.addEventListener('DOMContentLoaded', () => {

  mostrarAutos(autos);

  llenarSelect();
})

//Evento que llena la busqueda
eventosBusqueda()
function eventosBusqueda (){

  marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value
    filtrarAuto()
  })

  year.addEventListener('change', (e) => {
    datosBusqueda.year = e.target.value
    filtrarAuto()
  })

  minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = parseInt(e.target.value)
    filtrarAuto()
  })

  maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value
    filtrarAuto()
  })

  puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value)
    filtrarAuto()
  })

  transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value
    filtrarAuto()
  })

  color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value
    filtrarAuto()
  })

}



function mostrarAutos(autos){

  limpiarHTML()

  autos.forEach( auto => {
    const autosHTML = document.createElement('p');
    const {marca, modelo, year, precio, puertas, color, transmision} = auto
    autosHTML.textContent = `
    Marca: ${marca} - Modelo: ${modelo} - Año: ${year} - Precio: ${precio} - Puertas: ${puertas} - Color: ${color} - transmision: ${transmision}
    `

    resultado.appendChild(autosHTML)
  })
}

//Limpiar el HTML
function limpiarHTML() {
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild)
  }
}

//Genera los años del select

function llenarSelect() {
  for( let i = maxYear; i >= minYear; i-- ){
    const opcion = document.createElement('option')
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion) //Agrega resultados al option del año
  }
}

function filtrarAuto() {


  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

  if (resultado.length){
    mostrarAutos(resultado)
  }else {
    noResultado()
  }

}

function noResultado(){
  limpiarHTML()

  const noResultado = document.createElement('div')
  noResultado.classList.add( 'alerta', 'error' )
  noResultado.textContent = 'No se encontraron resultados';
  resultado.appendChild(noResultado)
}

function filtrarMarca(auto) {
  if (datosBusqueda.marca){
    const { marca } = datosBusqueda;
    return auto.marca === marca
  }
  return auto;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    const { year } = datosBusqueda
    return auto.year === parseInt(year);
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if(minimo) {
    return auto.precio >= minimo
  }
  return auto
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo
  }
  return auto
}

function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    const { puertas } = datosBusqueda
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    const { transmision } = datosBusqueda
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor (auto) {
  if (datosBusqueda.color) {
    const { color } = datosBusqueda;
    return auto.color === color
  }
  return auto
}

