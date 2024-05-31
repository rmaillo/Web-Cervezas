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

            // Restaurar filtros localStorage
            const savedFilters = JSON.parse(localStorage.getItem('selectedFilters'));
            if (savedFilters && savedFilters.length > 0) {
                // Marcar los checkboxes guardados
                savedFilters.forEach(filterId => {
                    document.querySelector(`.checkboxes[value="${filterId}"]`).checked = true;
                });

                 // Filtrar productos
                 var filterProducts = allProducts.filter(function(product) {
                    return savedFilters.includes(product.filterId);
                });

                // Renderizar productos filtrados
                renderProducts(filterProducts);
            } else {
                // Renderizar todos los productos si no hay filtros guardados
                renderProducts(allProducts);
            }
        });
        
    // Función renderizar productos
    function renderProducts(products) {
        var html = template({products: products});
        document.getElementById("result").innerHTML = html;
    }

    // Función botón filtrado productos
    document.getElementById('btnFilter').addEventListener('click', function() {
        var selectedFilters = [];
        
        document.querySelectorAll('.checkboxes:checked').forEach(function(checkbox) {
            selectedFilters.push(parseInt(checkbox.value));
        });

        // Obtén el elemento del botón btnOpenFilter y btnFilter
        var btnOpenFilter = document.getElementById('btnOpenFilter');
        var btnFilter = document.getElementById('btnFilter');

        // Resetear el contenido
        btnOpenFilter.textContent = '';
        btnFilter.textContent = '';
        
        //Devolver el contenido inicial
        var añadido = 'Filtrar' + '<img src="src/svg/filters.svg" alt="filters">';
        
        // Actualiza el texto del botón con la cantidad de casillas seleccionadas
        if (selectedFilters.length > 0) {
            btnOpenFilter.innerHTML += añadido + '(' + selectedFilters.length +')';
            btnFilter.innerHTML += añadido + '(' + selectedFilters.length + ')';
        } 

        // Comprobar que hay almenos un checkbox seleccionado
        if (selectedFilters.length === 0) {
            const btnCloseResalt = document.querySelector('legend');

            btnCloseResalt.classList.add('resaltar');
                    document.querySelectorAll('.filterOptions').forEach(option => option.classList.add('resaltar'));
        
                    setTimeout(function() {
                        btnCloseResalt.classList.remove('resaltar');
                        document.querySelectorAll('.filterOptions').forEach(option => option.classList.remove('resaltar'));
                        }, 100);
            return; // Finalizar codigo si no hay checkboxes seleccionados
        }

        // Guardar selectedFilters en localStorage
        localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));

        var filterProducts = allProducts.filter(function(product) {
            return selectedFilters.includes(product.filterId);
        });

        // Renderizar productos filtrados
        renderProducts(filterProducts);

        // Eliminar clase mostrar filtro
        document.querySelector('.filter').classList.remove('mostrar');
        document.querySelector('body').classList.remove('blockScroll');
        document.querySelector('.filter').classList.add('ocultar');
    });

    // Función botón limpiar filtros
    document.getElementById('btnClean').addEventListener('click', function(event) {
        event.preventDefault();
        const checkboxes = document.querySelectorAll('.checkboxes');
        const filter = document.querySelector('.filter');
        const body = document.body;
        const btnCloseResalt = document.querySelector('legend');
        // Obtén el elemento del botón
        var btnOpenFilter = document.getElementById('btnOpenFilter');
        var btnFilter = document.getElementById('btnFilter');
        
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checkbox.checked = false;
                filter.classList.remove('mostrar');
                body.classList.remove('blockScroll'); 
                filter.classList.add('ocultar');

            // Resetear el contenido boton Filtrar
            btnOpenFilter.textContent = '';
            btnFilter.textContent = '';
        
            //Devolver el contenido inicial boton Filtrar
            var añadido = 'Filtrar' + '<img src="src/svg/filters.svg" alt="filters">';
        
            // Actualizar el texto del botón Filtrar a su estado inicial
            btnOpenFilter.innerHTML += añadido; 
            btnFilter.innerHTML += añadido;

            } else {
                btnCloseResalt.classList.add('resaltar');
                document.querySelectorAll('.filterOptions').forEach(option => option.classList.add('resaltar'));
        
                setTimeout(function() {
                    btnCloseResalt.classList.remove('resaltar');
                    document.querySelectorAll('.filterOptions').forEach(option => option.classList.remove('resaltar'));
                    }, 100);
                }
        });

        // Limpiar filtros de localStorage
        localStorage.removeItem('selectedFilters');

        // Renderizar todos los productos
        renderProducts(allProducts);
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
    const body =document.body;

    // Función agregar o eliminar clase mostrar
    btnOpenFilter.addEventListener('click', function() {
        if(filter.classList.contains('mostrar')) {
            filter.classList.remove('mostrar');
            body.classList.remove('blockScroll');
        } else {
            filter.classList.add('mostrar');
            body.classList.add('blockScroll');
            filter.classList.remove('ocultar');
        }
    });
}

// Ocultar formulario filtros
function closeFilter() {
    const btnCloseFilter = document.querySelector('#btnCloseFilter');
    const filter = document.querySelector('.filter');
    const body =document.body;
    
    btnCloseFilter.addEventListener('click', function() {
        if (filter.classList.contains('mostrar')) {
            filter.classList.remove('mostrar');
            body.classList.remove('blockScroll');
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
