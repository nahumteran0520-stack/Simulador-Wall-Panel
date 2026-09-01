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
    // --- Control del menú desplegable en Móvil ---
function toggleMobileCatalog() {
    const sidebar = document.getElementById('catalog-sidebar');
    sidebar.classList.toggle('mobile-open');
}
}
