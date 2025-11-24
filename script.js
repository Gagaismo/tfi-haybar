// Mock Data
const mockData = {
    reservas: [
        { id: 1, cliente: "Carlos Paz", fecha: "2024-12-25", invitados: 50, tipo: "Boda", estado: "Confirmada" },
        { id: 2, cliente: "Empresa Tech SA", fecha: "2024-11-30", invitados: 120, tipo: "Corporativo", estado: "Pendiente" },
        { id: 3, cliente: "María Gonzalez", fecha: "2025-01-15", invitados: 30, tipo: "Cumpleaños", estado: "Confirmada" },
        { id: 4, cliente: "Festival de Jazz", fecha: "2025-02-10", invitados: 300, tipo: "Evento Público", estado: "En Proceso" },
    ],
    inventario: [
        { id: 1, item: "Vodka Absolut", categoria: "Licores", cantidad: 12, unidad: "Botellas", estado: "OK" },
        { id: 2, item: "Gin Beefeater", categoria: "Licores", cantidad: 5, unidad: "Botellas", estado: "Bajo Stock" },
        { id: 3, item: "Hielo Rolito", categoria: "Insumos", cantidad: 50, unidad: "Bolsas 15kg", estado: "OK" },
        { id: 4, item: "Limones", categoria: "Frutas", cantidad: 10, unidad: "Kg", estado: "Crítico" },
        { id: 5, item: "Vasos Trago Largo", categoria: "Vajilla", cantidad: 200, unidad: "Unidades", estado: "OK" },
    ],
    personal: [
        { id: 1, nombre: "Juan Pérez", rol: "Head Bartender", turno: "Noche", especialidad: "Mixología" },
        { id: 2, nombre: "Ana Gómez", rol: "Runner", turno: "Noche", especialidad: "Logística" },
        { id: 3, nombre: "Pedro Ruiz", rol: "Bartender", turno: "Tarde", especialidad: "Clásicos" },
        { id: 4, nombre: "Sofia Lert", rol: "Manager", turno: "Full Time", especialidad: "Gestión" },
    ],
    caja: [
        { id: 1, concepto: "Adelanto Boda Paz", tipo: "Ingreso", monto: 150000, fecha: "2024-10-20" },
        { id: 2, concepto: "Compra Licores Mayorista", tipo: "Egreso", monto: 85000, fecha: "2024-10-22" },
        { id: 3, concepto: "Pago Personal Extra", tipo: "Egreso", monto: 20000, fecha: "2024-10-25" },
        { id: 4, concepto: "Seña Evento Tech", tipo: "Ingreso", monto: 200000, fecha: "2024-10-28" },
    ]
};

// DOM Elements
const contentArea = document.getElementById('content-area');
const navLinks = document.querySelectorAll('.nav-link');

// Views Rendering Functions
const renderLanding = () => {
    return `
        <div class="relative w-full h-full bg-black overflow-hidden fade-in">
            <img src="assets/bartender.png" alt="Bartender" class="absolute inset-0 w-full h-full object-cover opacity-80">
            
            <div class="geometric-overlay">
                <div class="geometric-shape shape-1"></div>
                <div class="geometric-shape shape-2"></div>
            </div>

            <div class="hero-text-container">
                <h2 class="hero-title">
                    CREANDO<br>
                    <span>MOMENTOS</span>
                </h2>
                <div class="mt-8 ml-4 max-w-md bg-white/10 backdrop-blur-md p-6 border-l-4 border-hay-gold">
                    <p class="text-white text-lg mb-6 font-light">
                        Elevamos tu evento con coctelería de autor y un servicio impecable. La experiencia Hay! Bar en cada detalle.
                    </p>
                    <button class="bg-hay-gold text-black font-bold py-3 px-8 uppercase tracking-widest hover:bg-white transition-colors duration-300">
                        Pedir Presupuesto
                    </button>
                </div>
            </div>
        </div>
    `;
};

const renderTable = (title, columns, data, type) => {
    const headers = columns.map(col => `<th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">${col}</th>`).join('');
    
    const rows = data.map(row => {
        const cells = Object.values(row).slice(1).map(val => `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">${val}</td>`).join('');
        return `<tr class="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">${cells}</tr>`;
    }).join('');

    return `
        <div class="p-12 w-full h-full bg-gray-50 overflow-y-auto fade-in">
            <div class="flex justify-between items-end mb-10">
                <div>
                    <h2 class="text-4xl font-black text-hay-dark uppercase tracking-tight">${title}</h2>
                    <p class="text-gray-500 mt-2">Gestión de ${title.toLowerCase()} y operaciones.</p>
                </div>
                <button class="bg-hay-dark text-white px-6 py-3 font-bold uppercase text-sm hover:bg-hay-gold hover:text-black transition-colors">
                    + Nuevo ${type}
                </button>
            </div>

            <div class="glass-panel rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                        <tr>${headers}</tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${rows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

// View Router
const loadView = (viewName) => {
    let content = '';
    
    switch(viewName) {
        case 'landing':
            content = renderLanding();
            break;
        case 'reservas':
            content = renderTable('Reservas', ['Cliente', 'Fecha', 'Invitados', 'Tipo', 'Estado'], mockData.reservas, 'Reserva');
            break;
        case 'inventario':
            content = renderTable('Inventario', ['Item', 'Categoría', 'Cantidad', 'Unidad', 'Estado'], mockData.inventario, 'Item');
            break;
        case 'personal':
            content = renderTable('Personal', ['Nombre', 'Rol', 'Turno', 'Especialidad'], mockData.personal, 'Empleado');
            break;
        case 'caja':
            content = renderTable('Caja y Cobros', ['Concepto', 'Tipo', 'Monto', 'Fecha'], mockData.caja, 'Movimiento');
            break;
        default:
            content = renderLanding();
    }

    contentArea.innerHTML = content;
};

// Event Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update Active State
        navLinks.forEach(l => l.classList.remove('text-hay-gold'));
        navLinks.forEach(l => l.querySelector('span').classList.remove('opacity-100'));
        
        link.classList.add('text-hay-gold');
        link.querySelector('span').classList.add('opacity-100');

        // Load View
        const view = link.getAttribute('data-view');
        loadView(view);
    });
});

// Initial Load
loadView('landing');
navLinks[0].classList.add('text-hay-gold');
navLinks[0].querySelector('span').classList.add('opacity-100');
