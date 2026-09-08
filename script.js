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
    panel.classList.remove('led-warm', 'led-cool');
    
    if (ledType === 'warm') {
        panel.classList.add('led-warm');
    } else if (ledType === 'cool') {
        panel.classList.add('led-cool');
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
    
    // Control de la clase en el body para activar el aviso de rotación solo dentro del simulador
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
    // 1. REGISTRAR CALCULADORA
    // Captura cuando el usuario hace clic en el botón de calcular (dentro del formulario de la calculadora)
    const formCalculadora = document.querySelector(".calc-form");
    if (formCalculadora) {
        formCalculadora.addEventListener("submit", () => {
            registrarAccionEnSheet("Uso de Calculadora", "Cálculo de Materiales");
        });
    }

    // O alternativamente si prefieres registrar cuando hacen clic para abrir la pantalla de calculadora:
    // Asegúrate de cambiar '#btn-abrir-calculadora' por el selector real de tu botón de inicio
    document.querySelector("#btn-abrir-calculadora")?.addEventListener("click", () => {
        registrarAccionEnSheet("Uso de Calculadora", "Apertura de Calculadora");
    });

    // 2. REGISTRAR SIMULADOR Y DIFERENCIAR TIPO DE PANEL (Wall Panel vs SPC)
    document.querySelectorAll(".catalog-btn").forEach(boton => {
        boton.addEventListener("click", (e) => {
            let nombreProducto = e.target.innerText.trim();
            
            // Buscamos la categoría superior (por ejemplo, el texto del label o título de la sección)
            let categoriaContainer = e.target.closest(".catalog-category");
            let tipoPanel = "Wall Panel"; // Valor por defecto
            
            if (categoriaContainer) {
                let labelCategoria = categoriaContainer.querySelector("label");
                if (labelCategoria) {
                    let textoLabel = labelCategoria.innerText.toLowerCase();
                    if (textoLabel.includes("spc") || textoLabel.includes("marmol") || textoLabel.includes("piedra")) {
                        tipoPanel = "Panel SPC";
                    } else {
                        tipoPanel = "Wall Panel";
                    }
                }
            }

            // Guardamos combinando el tipo y el nombre (Ej: "Panel SPC - Gris" o "Wall Panel - Wengué")
            let productoCompleto = `${tipoPanel}: ${nombreProducto}`;
            registrarAccionEnSheet("Selección en Simulador", productoCompleto);
        });
    });
});
