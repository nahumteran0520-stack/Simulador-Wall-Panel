// Variables globales para recordar el estado actual
let currentTexture = 'blanco'; 
let currentOrientation = 'vertical'; 

function changeBackgroundWall(wallType, btn) {
    document.querySelectorAll('.wpc-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const backgroundWall = document.getElementById('fullBackgroundWall');
    
    if (wallType === 'none') {
        backgroundWall.style.backgroundImage = 'none';
        backgroundWall.style.backgroundColor = '#ffffff'; 
    } else {
        backgroundWall.style.backgroundImage = `url('${wallType}.jpg')`;
    }
}

// --- Funciones del panel central (Mármol) ---

function changeTexture(textureName, btn) {
    document.querySelectorAll('.tex-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    currentTexture = textureName;
    updatePanelBackground(); 
}

function setOrientation(orientation, btn) {
    document.querySelectorAll('.orient-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    currentOrientation = orientation;
    
    const panel = document.getElementById('centralPanel');
    panel.classList.remove('vertical', 'horizontal');
    panel.classList.add(orientation);
    
    updatePanelBackground(); 
}

function updatePanelBackground() {
    const panel = document.getElementById('centralPanel');
    
    if (currentTexture === 'none') {
        panel.style.backgroundImage = 'none';
        panel.style.backgroundColor = '#ffffff'; 
        return;
    }
    
    panel.style.backgroundColor = '#ffffff'; 

    let filename = currentTexture;
    if (currentOrientation === 'horizontal') {
        filename = currentTexture + '-h'; 
    }

    panel.style.backgroundImage = `url('${filename}.jpg')`;
}

// --- Control independiente para el Panel Central ---
function togglePanelLed(ledType, btn) {
    document.querySelectorAll('.panel-led-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const panel = document.getElementById('centralPanel');
    panel.classList.remove('led-warm', 'led-cool');
    
    if (ledType === 'warm') {
        panel.classList.add('led-warm');
    } else if (ledType === 'cool') {
        panel.classList.add('led-cool');
    }
}

// --- Control independiente y directo para las Luces Laterales (WPC) ---
function toggleSideLed(ledType, btn) {
    document.querySelectorAll('.side-led-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Obtenemos cada una de las 4 luces por su ID exacto
    const lights = [
        document.getElementById('leftLong'),
        document.getElementById('leftShort'),
        document.getElementById('rightLong'),
        document.getElementById('rightShort')
    ];
    
    lights.forEach(light => {
        if (!light) return;
        light.classList.remove('side-led-warm', 'side-led-cool');
        
        if (ledType === 'warm') {
            light.classList.add('side-led-warm');
        } else if (ledType === 'cool') {
            light.classList.add('side-led-cool');
        }
    });
}

// --- Control del menú desplegable en Móvil ---
function toggleMobileCatalog() {
    const sidebar = document.getElementById('catalog-sidebar');
    sidebar.classList.toggle('mobile-open');
}
// --- Control de cambio de pantallas (Inicio, Calculadora, Simulador) ---
function switchScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    if (screenName === 'home') {
        document.getElementById('home-screen').classList.add('active');
    } else if (screenName === 'calculator') {
        document.getElementById('calculator-screen').classList.add('active');
    } else if (screenName === 'simulator') {
        document.getElementById('simulator-screen').classList.add('active');
    }
}

// --- Lógica de cálculo de láminas de PVC (1.22 x 2.44) ---
function calculatePanels() {
    const heightInput = document.getElementById('wallHeight').value;
    const widthInput = document.getElementById('wallWidth').value;

    const height = parseFloat(heightInput);
    const width = parseFloat(widthInput);

    if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
        alert('Por favor, ingresa medidas válidas mayores a cero.');
        return;
    }

    // 1. Calcular el área total de la pared en metros cuadrados
    const totalArea = height * width;

    // 2. Área de una lámina estándar (1.22m x 2.44m = 2.9776 m²)
    const panelArea = 1.22 * 2.44;

    // 3. Cantidad exacta de láminas dividiendo el área
    const exactPanels = totalArea / panelArea;
    const roundedPanels = Math.ceil(exactPanels); // Redondeo hacia arriba

    // 4. Aplicar un 10% extra recomendado por desperdicio de cortes
    const panelsWithWaste = Math.ceil(roundedPanels * 1.10);

    // Mostrar los resultados en pantalla
    document.getElementById('res-area').textContent = totalArea.toFixed(2);
    document.getElementById('res-panels').textContent = roundedPanels;
    document.getElementById('res-panels-extra').textContent = panelsWithWaste + ' piezas';

    // Mostrar el contenedor de resultados
    document.getElementById('calc-results').classList.remove('hidden');
}
