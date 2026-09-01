/**
 * Función encargada de alternar los acabados y texturas del panel central
 * @param {string} type - Tipo de textura ('marble', 'wpc', 'plain')
 */
function changeTexture(type) {
    const panel = document.getElementById('centralPanel');

    switch (type) {
        case 'marble':
            panel.style.backgroundColor = '#ffffff';
            // Reemplaza con la ruta de tu textura de mármol
            panel.style.backgroundImage = "url('assets/marble-texture.jpg')";
            break;
            
        case 'wpc':
            panel.style.backgroundColor = '#8b5a2b';
            // Reemplaza con la ruta de tu textura WPC / Listones de madera
            panel.style.backgroundImage = "url('assets/wpc-slats.jpg')";
            break;
            
        case 'plain':
            panel.style.backgroundImage = 'none';
            panel.style.backgroundColor = '#ffffff'; // Pared blanca lisa
            break;
            
        default:
            console.warn('Tipo de textura no reconocido');
    }
}

// Opcional: Inicializador o eventos extra si se requiere carga dinámica
document.addEventListener('DOMContentLoaded', () => {
    console.log("Simulador de Wall Panel cargado correctamente.");
});
