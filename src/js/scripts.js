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
    filterChecked();
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

//Funcion fijado y limpieza checkboxes
function filterChecked() {

    //Constantes checkbox
    const check1 = document.getElementById('1');
    const check2 = document.getElementById('2');
    const check3 = document.getElementById('3');
    const clear = document.getElementById('clear');

    //Eventos checkbox
    check1.addEventListener('change', filterChecked1);
    check2.addEventListener('change', filterChecked2);
    check3.addEventListener('change', filterChecked3);
    clear.addEventListener('click', clearFilter);

    //Funciones checkbox
    function filterChecked1 () {
        if(this.checked) {
            this.disabled=true;
        }
    }

    function filterChecked2 () {
        if(this.checked) {
            this.disabled=true;
        }
    }

    function filterChecked3 () {
        if(this.checked) {
            this.disabled=true;
        }
    }
    
    function clearFilter() {
        check1.checked = false;
        check2.checked = false;
        check3.checked = false;
        check1.disabled = false;
        check2.disabled = false;
        check3.disabled = false;
    }
}
