//Inserción de productos

var source = document.getElementById("products-template").innerHTML;
    
var template = Handlebars.compile(source);

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        var html = template(data);
        console.log(source);
        document.getElementById("result").innerHTML = html;
    })
    .catch(error => console.error('Error:', error));




//Animación filtro

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
    eventListeners2();
    eventListeners3();
});

//Mostrar formulario filtros
function eventListeners() {
    const botonFiltro = document.querySelector('.btn-filter');
    botonFiltro.addEventListener('click', openFilter);
}

function openFilter() {
    const openForm = document.querySelector('.form');
    if (openForm.classList.contains('mostrar')) {
        openForm.classList.remove('mostrar');
    } else {
        openForm.classList.add('mostrar');
    }
    
//Sombrear fondo    
    //const opacPag = document.querySelector('body');
    //opacPag.classList.add('sombrear');
    
}

//Ocultar formulario filtros
function eventListeners2() {
    const btnCloseForm = document.querySelector('.btn-close-form');
    btnCloseForm.addEventListener('click', closeFilter);
}

function closeFilter() {
    const closeForm = document.querySelector('.form');
    if (closeForm.classList.contains('mostrar')) {
        closeForm.classList.remove('mostrar');
    } else {
        closeForm.classList.add('mostrar');
    }
}


//Filtro para productos

function eventListeners3() {
    const filtro1 = document.getElementById('1');
    filtro1.addEventListener('click', funciona);
}

function funciona(){
    alert("Funciona");
}