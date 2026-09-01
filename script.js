// Variable global para recordar la textura actual y la orientación
let currentTexture = 'blanco'; 
let currentOrientation = 'vertical'; // 'vertical' u 'horizontal'

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
        return;
    }

    // Si está en horizontal, añade '-h' al nombre del archivo (ej. gris-h.jpg); si está en vertical, usa el normal (ej. gris.jpg)
    let filename = currentTexture;
    if (currentOrientation === 'horizontal') {
        filename = currentTexture + '-h'; 
    }

    panel.style.backgroundImage = `url('${filename}.jpg')`;
}

// Opcional: si tienes funciones adicionales para los paneles laterales WPC, puedes agregarlas justo debajo de esto sin ningún problema.
