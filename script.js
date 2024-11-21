// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x1e1e1e);
document.body.appendChild(renderer.domElement);

// Posición inicial de la cámara
camera.position.set(0, 2, 5);

// Controles interactivos
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luces
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Variable para el archivo OBJ
let objFile = null;

// Función para cargar el modelo
function loadModel() {
    if (!objFile) {
        alert("Por favor selecciona un archivo .obj");
        return;
    }

    // Leer archivo OBJ
    const reader = new FileReader();
    reader.onload = function (e) {
        const objLoader = new THREE.OBJLoader();
        const object = objLoader.parse(e.target.result);

        object.scale.set(0.5, 0.5, 0.5); // Ajusta el tamaño
        object.position.set(0, 0, 0); // Centra el modelo
        scene.add(object);
    };
    reader.readAsText(objFile);
}

// Escuchar cambios en el input
document.getElementById("fileObj").addEventListener("change", (event) => {
    objFile = event.target.files[0];
});

document.getElementById("loadModel").addEventListener("click", loadModel);

// Animación
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Ajustar tamaño del canvas al cambiar la ventana
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
