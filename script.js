/**
 * Cambia la textura del panel central (Mármol)
 */
function changeTexture(type, eventElement) {
    const panel = document.getElementById('centralPanel');

    // Manejo de clases activas para el grupo de mármol
    document.querySelectorAll('.tex-btn').forEach(btn => btn.classList.remove('active'));
    if (eventElement) eventElement.classList.add('active');

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
 * Cambia la orientación del panel central
 */
function setOrientation(orientation, eventElement) {
    const panel = document.getElementById('centralPanel');

    document.querySelectorAll('.orient-btn').forEach(btn => btn.classList.remove('active'));
    if (eventElement) eventElement.classList.add('active');

    if (orientation === 'vertical') {
        panel.classList.remove('horizontal');
        panel.classList.add('vertical');
    } else {
        panel.classList.remove('vertical');
        panel.classList.add('horizontal');
    }
}

/**
 * Cambia los Wall Panels laterales (WPC)
 */
function changeSidePanel(type, eventElement) {
    const sideLeft = document.getElementById('sideLeft');
    const sideRight = document.getElementById('sideRight');

    document.querySelectorAll('.wpc-btn').forEach(btn => btn.classList.remove('active'));
    if (eventElement) eventElement.classList.add('active');

    if (type === 'wpc1') {
        // Ejemplo de ruta para tu futuro wall panel 1
        sideLeft.style.backgroundImage = "url('wpc1.jpg')";
        sideRight.style.backgroundImage = "url('wpc1.jpg')";
    } else if (type === 'wpc2') {
        // Ejemplo de ruta para tu futuro wall panel 2
        sideLeft.style.backgroundImage = "url('wpc2.jpg')";
        sideRight.style.backgroundImage = "url('wpc2.jpg')";
    } else {
        sideLeft.style.backgroundImage = 'none';
        sideRight.style.backgroundImage = 'none';
    }
}
