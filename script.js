// Variables globales para recordar el estado actual
let currentTexture = 'blanco'; // Textura central por defecto
let currentOrientation = 'vertical'; // Orientación central por defecto

// Nueva función para cambiar la pared de fondo completa
function changeBackgroundWall(wallType, btn) {
    // Manejo visual de los botones activos
    document.querySelectorAll('.wpc-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const backgroundWall = document.getElementById('fullBackgroundWall');
    
    if (wallType === 'none') {
        backgroundWall.style.backgroundImage = 'none';
        backgroundWall.style.backgroundColor = 'transparent'; // O un color de pintura si prefieres
    } else {
        // Carga la textura de listones WPC seleccionada (ej. wpc1.jpg o wpc2.jpg)
        // Se repetirá horizontalmente para cubrir toda la pared
        backgroundWall.style.backgroundImage = `url('${wallType}.jpg')`;
    }
}

// --- Funciones existentes del panel central (Mármol) ---

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
}
