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
            const SAVED_FILTERS = JSON.parse(localStorage.getItem('selectedFilters'));
            if (SAVED_FILTERS && SAVED_FILTERS.length > 0) {
                // Marcar los checkboxes guardados
                SAVED_FILTERS.forEach(filterId => {
                    document.querySelector(`.checkboxes[value="${filterId}"]`).checked = true;
                    document.querySelector(`.checkboxes[value="${filterId}"]`).disabled = true;
                });

                 // Filtrar productos
                 var filterProducts = allProducts.filter(function(product) {
                    return SAVED_FILTERS.includes(product.filterId);
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
        } else {
            btnOpenFilter.innerHTML += añadido;
            btnFilter.innerHTML += añadido;
        }

        // Comprobar que hay almenos un checkbox seleccionado
        if (selectedFilters.length === 0) {
            const BTN_RESALT = document.querySelector('legend');

            BTN_RESALT.classList.add('resaltar');
                    document.querySelectorAll('.filterOptions').forEach(option => option.classList.add('resaltar'));
        
                    setTimeout(function() {
                        BTN_RESALT.classList.remove('resaltar');
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
    const checkboxes = document.querySelectorAll('.checkboxes'); 
    const btnClean = document.getElementById('btnClean');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            this.disabled = this.checked;
        });
    });

    btnClean.addEventListener('click', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });
    });
}
