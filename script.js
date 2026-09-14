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

// Función para alternar el Ancho del Wall Panel (Completo, Sección Parcial o Solo Izquierdo)
function setWallWidth(mode, btn) {
    document.querySelectorAll('.width-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const backgroundWall = document.getElementById('fullBackgroundWall');
    
    // Elementos de luces derechas
    const rightLong = document.getElementById('rightLong');
    const rightShort = document.getElementById('rightShort');
    
    // Removemos todas las clases de ancho primero
    backgroundWall.classList.remove('wall-width-full', 'wall-width-partial', 'wall-width-left-only');
    
    if (mode === 'full') {
        backgroundWall.classList.add('wall-width-full');
        // Mostrar luces derechas
        if(rightLong) rightLong.style.display = 'block';
        if(rightShort) rightShort.style.display = 'block';
    } else if (mode === 'partial') {
        backgroundWall.classList.add('wall-width-partial');
        // Mostrar luces derechas
        if(rightLong) rightLong.style.display = 'block';
        if(rightShort) rightShort.style.display = 'block';
    } else if (mode === 'left-only') {
        backgroundWall.classList.add('wall-width-left-only');
        // Ocultar luces derechas porque no hay WPC de ese lado
        if(rightLong) rightLong.style.display = 'none';
        if(rightShort) rightShort.style.display = 'none';
    }
}

// Función para cambiar el color de pintura de la pared de fondo
function setPaintColor(colorCode, btn) {
    document.querySelectorAll('.paint-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const roomScene = document.getElementById('roomScene');
    if (roomScene) {
        roomScene.style.backgroundColor = colorCode;
    }
}

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

function togglePanelLed(ledType, btn) {
    document.querySelectorAll('.panel-led-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const panel = document.getElementById('centralPanel');
    const ambientGlow = document.getElementById('wallAmbientGlow');
    
    panel.classList.remove('led-warm', 'led-cool');
    if (ambientGlow) ambientGlow.classList.remove('glow-warm', 'glow-cool');
    
    if (ledType === 'warm') {
        panel.classList.add('led-warm');
        if (ambientGlow) ambientGlow.classList.add('glow-warm');
    } else if (ledType === 'cool') {
        panel.classList.add('led-cool');
        if (ambientGlow) ambientGlow.classList.add('glow-cool');
    }
}

function toggleSideLed(ledType, btn) {
    document.querySelectorAll('.side-led-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
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

function toggleMobileCatalog() {
    const sidebar = document.getElementById('catalog-sidebar');
    sidebar.classList.toggle('mobile-open');
}

function switchScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    if (screenName === 'simulator') {
        document.body.classList.add('in-simulator');
    } else {
        document.body.classList.remove('in-simulator');
    }

    if (screenName === 'home') {
        document.getElementById('home-screen').classList.add('active');
    } else if (screenName === 'calculator') {
        document.getElementById('calculator-screen').classList.add('active');
    } else if (screenName === 'simulator') {
        document.getElementById('simulator-screen').classList.add('active');
    }
}

function calculatePanels() {
    registrarAccionEnSheet("Uso de Calculadora", "Cálculo de Materiales");
    
    const heightInput = document.getElementById('wallHeight').value;
    const widthInput = document.getElementById('wallWidth').value;

    const height = parseFloat(heightInput);
    const width = parseFloat(widthInput);

    if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
        alert('Por favor, ingresa medidas válidas mayores a cero.');
        return;
    }

    const totalArea = height * width;
    const pvcSheetArea = 2.97;

    if (totalArea <= pvcSheetArea) {
        alert('La pared es muy pequeña para esta configuración (debe ser mayor al área de la lámina central de PVC de 2.97 m²).');
        return;
    }

    const remainingArea = totalArea - pvcSheetArea;
    const wallPanelCoverage = 0.46;
    const exactWallPanels = remainingArea / wallPanelCoverage;
    const roundedWallPanels = Math.ceil(exactWallPanels); 

    const panelsWithWaste = Math.ceil(roundedWallPanels * 1.05);

    document.getElementById('res-area').textContent = totalArea.toFixed(2);
    document.getElementById('res-panels').textContent = `1 Lámina de PVC Central (2.97 m²) + ${roundedWallPanels} Wall Panels (${remainingArea.toFixed(2)} m² restantes)`;
    document.getElementById('res-panels-extra').textContent = panelsWithWaste + ' piezas';

    document.getElementById('calc-results').classList.remove('hidden');
}

// --- CONFIGURACIÓN DE GOOGLE SHEETS ---
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwN4ZJe2ZJ3tBU2VFbCouyhLrTz1W0vtnvAMvAtNSQsRu3630BgpnaDk8eNUZk4vCDtwQ/exec";

function registrarAccionEnSheet(accion, producto = "N/A") {
    fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accion: accion,
            producto: producto
        })
    }).catch(error => console.error("Error al registrar estadística:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. REGISTRAR APERTURA DE CALCULADORA
    document.querySelector("button[onclick*=\"calculator\"]")?.addEventListener("click", () => {
        registrarAccionEnSheet("Uso de Calculadora", "Apertura de Calculadora");
    });

    // 2. REGISTRAR PANEL SPC
    document.querySelectorAll(".tex-btn").forEach(boton => {
        boton.addEventListener("click", (e) => {
            let nombreProducto = e.target.innerText.trim();
            registrarAccionEnSheet("Selección en Simulador", `Panel SPC: ${nombreProducto}`);
        });
    });

    // 3. REGISTRAR WALL PANEL
    document.querySelectorAll(".wpc-btn").forEach(boton => {
        boton.addEventListener("click", (e) => {
            let nombreProducto = e.target.innerText.trim();
            registrarAccionEnSheet("Selección en Simulador", `Wall Panel: ${nombreProducto}`);
        });
    });
// Función para cambiar el color del mueble de TV
function setFurnitureColor(colorStyle, btn) {
    document.querySelectorAll('.furniture-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const overlay = document.querySelector('.foreground-overlay');
    if (!overlay) return;

    // Removemos todos los filtros previos
    overlay.classList.remove('furniture-white', 'furniture-dark', 'furniture-wood');

    // Aplicamos el filtro correspondiente
    if (colorStyle === 'white') {
        overlay.classList.add('furniture-white');
    } else if (colorStyle === 'dark') {
        overlay.classList.add('furniture-dark');
    } else if (colorStyle === 'wood') {
        overlay.classList.add('furniture-wood');
    }
    // Si es 'original', no se le añade ninguna clase extra.

    // Registrar en analíticas si usas tu Google Sheet
    registrarAccionEnSheet("Selección en Simulador", `Mueble TV: ${colorStyle}`);
}

