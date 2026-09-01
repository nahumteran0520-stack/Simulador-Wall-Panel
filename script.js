// Variables de Estado Global
let currentTexture = 'none';
let currentOrientation = 'vertical';

/**
 * Cambia la textura central usando los archivos de imagen exactos
 * @param {string} type - 'blanco', 'gris', 'negro' o 'none'
 */
function changeTexture(type) {
    currentTexture = type;
    const panel = document.getElementById('centralPanel');

    // Actualizar clases activas de los botones de textura
    document.querySelectorAll('.tex-btn').forEach(btn => btn.classList.remove('active'));
    if (type !== 'none') {
        event.target.classList.add('active');
    }

    if (type === 'blanco') {
        panel.style.backgroundImage = "url('blanco.jpg')";
    } else if (type === 'gris') {
        panel.style.backgroundImage = "url('Gris.jpg')";
    } else if (type === 'negro') {
        panel.style.backgroundImage = "url('Negro.jpg')";
    } else {
        panel.style.backgroundImage = 'none';
        panel.style.backgroundColor = '#ffffff';
    }
}

/**
 * Cambia la orientación del panel central (Vertical u Horizontal)
 * @param {string} orientation - 'vertical' o 'horizontal'
 */
function setOrientation(orientation) {
    currentOrientation = orientation;
    const panel = document.getElementById('centralPanel');

    // Actualizar botones de orientación
    document.querySelectorAll('.orient-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (orientation === 'vertical') {
        panel.classList.remove('horizontal');
        panel.classList.add('vertical');
    } else if (orientation === 'horizontal') {
        panel.classList.remove('vertical');
        panel.classList.add('horizontal');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Simulador configurado con éxito. Listo para los Wall Panels laterales.");
});
