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
