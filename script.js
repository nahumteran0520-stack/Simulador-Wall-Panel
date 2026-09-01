// Variables globales para recordar el estado actual
let currentTexture = 'blanco'; // Textura central por defecto
let currentOrientation = 'vertical'; // Orientación central por defecto

// Función para cambiar la pared de fondo completa (WPC)
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

// --- Función de Iluminación LED (Panel Central + Laterales) ---
function toggleLed(ledType, btn) {
    document.querySelectorAll('.led-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const panel = document.getElementById('centralPanel');
    
    // Remueve efectos anteriores tanto del panel central como del body
    panel.classList.remove('led-warm', 'led-cool');
    document.body.classList.remove('led-warm-active', 'led-cool-active');
    
    // Aplica el efecto correspondiente
    if (ledType === 'warm') {
        panel.classList.add('led-warm');
        document.body.classList.add('led-warm-active');
    } else if (ledType === 'cool') {
        panel.classList.add('led-cool');
        document.body.classList.add('led-cool-active');
    }
}
