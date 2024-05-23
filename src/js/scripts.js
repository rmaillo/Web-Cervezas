// Inserción de productos
document.addEventListener("DOMContentLoaded", function() {
    // Capturar plantilla
    var source = document.getElementById("products-template").innerHTML;
    // Compilar plantilla
    var template = Handlebars.compile(source);
    // Array para todos los productos
    var allProducts = [];

    // Obtener datos JSON
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data.products;
            renderProducts(allProducts);
        });
        
    // Función renderizar productos
    function renderProducts(products) {
        var html = template({products: products});
        document.getElementById("result").innerHTML = html;
    }

    // Función filtrado productos
    document.getElementById('btnFilter').addEventListener('click', function() {
        var selectedFilters = [];
        document.querySelectorAll('.checkboxes:checked').forEach(function(checkbox) {
            selectedFilters.push(parseInt(checkbox.value));
        });

        var filterProducts = allProducts.filter(function(product) {
            return selectedFilters.includes(product.filterId);
        });

        //Renderizar productos filtrados
        renderProducts(filterProducts);

        // Eliminar clase mostrar filtro
        document.querySelector('.filter').classList.remove('mostrar');
    });

    // Función botón limpiar filtros
    document.getElementById('btnClean').addEventListener('click', function(event){
        event.preventDefault();
        document.querySelectorAll('.checkboxes').forEach(function(checkbox){
            checkbox.checked = false;
        });

        // Renderizar todos los productos
        renderProducts(allProducts);

        // Eliminar clase mostrar filtros
        document.querySelector('.filter').classList.remove('mostrar');

    });
});

// Animación filtro
document.addEventListener('DOMContentLoaded', function(){
    openFilter();
    closeFilter();
    filterChecked();
});

// Función desplegar filtro
function openFilter() {
    const btnOpenFilter = document.querySelector('#btnOpenFilter');
    const filter = document.querySelector('.filter');

    // Función agregar o eliminar clase mostrar
    btnOpenFilter.addEventListener('click', function() {
        if(filter.classList.contains('mostrar')) {
            filter.classList.remove('mostrar');
        } else {
            filter.classList.add('mostrar');
        }
    });
}
    
// Sombrear fondo    
    //const opacPag = document.querySelector('body');
    //opacPag.classList.add('sombrear');

// Ocultar formulario filtros
function closeFilter() {
    const btnCloseFilter = document.querySelector('#btnCloseFilter');
    const filter = document.querySelector('.filter');
    btnCloseFilter.addEventListener('click', function() {
        if (filter.classList.contains('mostrar')) {
            filter.classList.remove('mostrar');
        } else {
            filter.classList.add('mostrar');
        }
    });
} 

// Funcion fijado y limpieza checkboxes
function filterChecked() {

    // Constantes checkbox
    const check1 = document.getElementById('checkbox1');
    const check2 = document.getElementById('checkbox2');
    const check3 = document.getElementById('checkbox3');
    const btnClean = document.getElementById('btnClean');

    // Eventos checkbox
    // Marcar el checkbox disabled
    check1.addEventListener('change', function() {
            if(this.checked) {
                this.disabled=true;
        }
    });

    check2.addEventListener('change', function() {
        if(this.checked) {
            this.disabled=true;
        }
    });
    check3.addEventListener('change', function() {
        if(this.checked) {
            this.disabled=true;
        }
    });
    btnClean.addEventListener('click', function() {
        check1.checked = false;
        check2.checked = false;
        check3.checked = false;
        check1.disabled = false;
        check2.disabled = false;
        check3.disabled = false;
    });
}
