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
        document.querySelector('.filter').classList.add('ocultar');
    });

    // Función botón limpiar filtros
/*    document.getElementById('btnClean').addEventListener('click', function(event){
        event.preventDefault();
        document.querySelectorAll('.checkboxes').forEach(function(checkbox){
           
            if (checkbox.checked == true) {
                checkbox.checked = false;
                // Eliminar clase mostrar filtros
                document.querySelector('.filter').classList.remove('mostrar');
                document.querySelector('.filter').classList.add('ocultar');
            } else {
                btnCloseResalt = document.querySelector('legend');
                btnCloseResalt.classList.add('resaltar');

                oo = document.getElementById('oo');
                oi = document.getElementById('oi');
                ou = document.getElementById('ou'); 
                oo.classList.add('resaltar');
                oi.classList.add('resaltar');
                ou.classList.add('resaltar');
                
                setTimeout(function(){
                    btnCloseResalt.classList.remove('resaltar');
                    oo.classList.remove('resaltar');
                    oi.classList.remove('resaltar');
                    ou.classList.remove('resaltar');
                }, 100);
            }          
        });
*/
        // Función botón limpiar filtros
        document.getElementById('btnClean').addEventListener('click', function(event) {
            event.preventDefault();
            const checkboxes = document.querySelectorAll('.checkboxes');
            const filter = document.querySelector('.filter');
            const btnCloseResalt = document.querySelector('legend');
        
            checkboxes.forEach(function(checkbox) {
                if (checkbox.checked) {
                    checkbox.checked = false;
                    filter.classList.remove('mostrar');
                    filter.classList.add('ocultar');
                } else {
                        btnCloseResalt.classList.add('resaltar');
                        document.querySelectorAll('.filterOptions').forEach(option => option.classList.add('resaltar'));
        
                        setTimeout(function() {
                                btnCloseResalt.classList.remove('resaltar');
                                document.querySelectorAll('.filterOptions').forEach(option => option.classList.remove('resaltar'));
                                }, 100);
                        }
            });
            // Renderizar todos los productos
            renderProducts(allProducts);
        });
    });
//});

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
            filter.classList.remove('ocultar');
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
            filter.classList.add('ocultar');
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
