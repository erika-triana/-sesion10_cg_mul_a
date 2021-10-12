var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado) {
  var cubeGeometry = new THREE.BoxGeometry(x, y, z);
  var cubeMaterial;
  switch (material) {
    case "Basic":
      cubeMaterial = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Standard":
      cubeMaterial = new THREE.MeshStandardMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Physical":
      cubeMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Lambert":
      cubeMaterial = new THREE.MeshLambertMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Phong":
      cubeMaterial = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;
  }

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // agregar cubo a la escena
  scene.add(cube);
  return cube;
}


function init() {
  // crear escena, camaras y luces.

  // crear camara.
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // crear render y establecer tamaño
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // mostrar ejes en la pantalla
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // crear cubo

  // posicion cube
  dim = 4;
  delta = 8;
  angulo = Math.PI / 2;
  Cubo = []; // Definir un array unidimensional

  Cubo.push(cubo(dim, dim, dim, 0x3BE818, "Physical", false));
  Cubo.push(cubo(dim, dim, dim, 0xE5E818, "Physical", false));
  Cubo.push(cubo(dim, dim, dim, 0xE89618, "Standard", false));

  Cubo[0].rotateZ(angulo); 
  Cubo[0].translateX(delta);
  Cubo[1].rotateX(angulo);
  Cubo[1].translateY(delta);
  Cubo[2].rotateY(angulo);
  Cubo[2].translateZ(delta);

  light = new THREE.PointLight(0xffff00); 
  light.position.set(-10, 5, 10);
  scene.add(light);

  // posicion de la camara al centro de la escena 
  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  // agregar la salida del renderizador
  document.getElementById("webgl-output").appendChild(renderer.domElement);


 
  var controls = new (function () {
    this.rotation = 0;
  })();


  var gui = new dat.GUI(); 
  gui.add(controls, 'rotation', 0, 90);

  render();

  function render() {
    var cub;
   
    var ranCubo= Math.floor(Math.random() * 3); 
    if (ranCubo == 0) {
      cub = 0;
    } else if (ranCubo == 1) {
      cub = 1;
    } else {
      cub = 2;
    }
  
   var ranEje= Math.floor(Math.random() * 3); 
    if (ranEje==0){
      Cubo[cub].rotateX(controls.rotation * (Math.PI / 180));
    }else if(ranEje==1){
      Cubo[cub].rotateY(controls.rotation * (Math.PI / 180));
    }else{
      Cubo[cub].rotateZ(controls.rotation * (Math.PI / 180));
    }

 
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.rotation = 0;
  }
 
}