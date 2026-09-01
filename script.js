// Variables globales para recordar el estado actual
let currentTexture = 'blanco'; // Textura central por defecto
let currentOrientation = 'vertical'; // Orientación central por defecto

// Nueva función para cambiar la pared de fondo completa (WPC)
function changeBackgroundWall(wallType, btn) {
    // Manejo visual de los botones activos en el menú
    document.querySelectorAll('.wpc-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const backgroundWall = document.getElementById('fullBackgroundWall');
    
    if (wallType === 'none') {
        backgroundWall.style.backgroundImage = 'none';
        backgroundWall.style.backgroundColor = '#ffffff'; // Pared lisa pintada de blanco por defecto
    } else {
        // Carga la textura de listones WPC (ej. wpcarena.jpg) y la repite horizontalmente
        backgroundWall.style.backgroundImage = `url('${wallType}.jpg')`;
    }
}

// --- Funciones del panel central (Mármol) ---

function changeTexture(textureName, btn) {
    document.querySelectorAll('.tex-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    currentTexture = textureName;
    updatePanelBackground(); // Actualiza el panel central respetando la orientación
}

function setOrientation(orientation, btn) {
    document.querySelectorAll('.orient-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    currentOrientation = orientation;
    
    const panel = document.getElementById('centralPanel');
    panel.classList.remove('vertical', 'horizontal');
    panel.classList.add(orientation);
    
    updatePanelBackground(); // Actualiza el panel central respetando la orientación actual
}

function updatePanelBackground() {
    const panel = document.getElementById('centralPanel');
    
    if (currentTexture === 'none') {
        panel.style.backgroundImage = 'none';
        panel.style.backgroundColor = '#ffffff'; // Fondo blanco si no hay mármol
        return;
    }
    
    panel.style.backgroundColor = '#ffffff'; // Asegura fondo blanco

    // Determina el sufijo "-h" si es horizontal, sino usa la normal
    let filename = currentTexture;
    if (currentOrientation === 'horizontal') {
        filename = currentTexture + '-h'; 
    }

    // Aplica la textura de mármol correspondiente
    panel.style.backgroundImage = `url('${filename}.jpg')`;
}function toggleLed(ledType, btn) {
    document.querySelectorAll('.led-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const panel = document.getElementById('centralPanel');
    
    // Remueve los efectos anteriores
    panel.classList.remove('led-warm', 'led-cool');
    
    // Aplica el efecto correspondiente
    if (ledType === 'warm') {
        panel.classList.add('led-warm');
    } else if (ledType === 'cool') {
        panel.classList.add('led-cool');
    }
}
