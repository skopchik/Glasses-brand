"use strict";
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
/* import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

const limitScrollItem1 = document.querySelector(".shop-img-wrap");
const limitScrollItem2 = document.querySelector(".header-navbar");
const limitScrollItemPosition = limitScrollItem1.getBoundingClientRect().top - limitScrollItem2.getBoundingClientRect().bottom;
 */
const loader = new GLTFLoader();
const canvas = document.querySelector('#main-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
const sceneElements = [];
const clearColor = new THREE.Color('#000');

renderer.setPixelRatio(window.devicePixelRatio);

class GLTFModels {

    constructor(options) {
        this.id = options.id;
        if (options.name && options.price) {
            this.name = options.name;
            this.price = options.price;
            document.querySelector(`#${this.id} + .showcase-title`).textContent = this.name;
            document.querySelector(`#${this.id} ~ .showcase-price`).textContent = `$${this.price}`;
        }
        this.loadPath = options.loadPath;
        this.cameraFov = options.cameraFov;
        this.cameraPositionX = options.cameraPositionX;
        this.cameraPositionY = options.cameraPositionY;
        this.cameraPositionZ = options.cameraPositionZ;
        this.pointLightPositionX = options.pointLightPositionX;
        this.pointLightPositionY = options.pointLightPositionY;
        this.pointLightPositionZ = options.pointLightPositionZ;
    }

    createElem() {
        const elem = document.querySelector(`#${this.id}`);
        return elem;
    }

    addScene(elem, fn, controls) {
        sceneElements.push({ elem, fn, controls });
    }

    makeScene() {

        this.camera = new THREE.PerspectiveCamera(this.cameraFov, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene = new THREE.Scene();
        this.controls = new OrbitControls(this.camera, document.querySelector(`#${this.id}`));

        const scene = this.scene;

        const camera = this.camera;
        camera.position.set(this.cameraPositionX, this.cameraPositionY, this.cameraPositionZ);

        const controls = this.controls;
        controls.enableZoom = false;
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 5;

        const pointLight = new THREE.PointLight(0xffffff);
        if (this.pointLightPositionX && this.pointLightPositionY && this.pointLightPositionZ) {
            pointLight.position.set(this.pointLightPositionX, this.pointLightPositionY, this.pointLightPositionZ);
            scene.add(pointLight);
        } else if (this.loadPath === "heart-shaped" || this.loadPath === "round-shaped") {
            pointLight.position.set(0, 0, 40);
            scene.add(pointLight);
        }
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        scene.add(directionalLight);
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        return { scene, camera, controls };
    }

    loadModel() {
        const scene = this.scene;
        loader.load(`./glasses/${this.loadPath}/scene.gltf`, (model) => {
            model.scene.traverse(c => {
                c.castShadow = true;
            });
            scene.add(model.scene);
        });
    }

    /* Ошибка, крутится вся сцена, а не сама модель */
    /*  addModelRotation(scrollSpeed) {
         const scene = this.scene;
         window.addEventListener('wheel', (event) => {
             scene.rotation.y += scrollSpeed * (event.deltaY * (Math.PI / 180));
         });
     } */
}


/* 
    let start = { x: 0, y: 0, z: 60 };
    let target1 = { x: -20, y: 5, z: 50 };
    let tween1 = new TWEEN.Tween(start);
    tween1.to(target1, 3000).easing(TWEEN.Easing.Linear.None).start();
    let angle = 0;
    const update = function () {
 
        camera.position.z += 50 * Math.sin(angle);
        camera.position.x += 50 * Math.cos(angle);
        angle += Math.PI / 180 * 2;

    };
    tween1.onUpdate(update); */

/* let currentTimeline = window.pageYOffset / 500;
 let aimTimeline = window.pageYOffset / 500;
 function moveModel() {
     currentTimeline += (aimTimeline - currentTimeline) * 0.9;
     const rx = currentTimeline * (-0.6) + 0.4;
     const ry = (currentTimeline * 0.9 + 1) * Math.PI * 2;
     scene.rotation.set(rx, ry, 0);
     renderer.render(scene, camera);
 }
 window.addEventListener("scroll", function () {
     aimTimeline = window.pageYOffset / 500;
     moveModel();
 }); */
/* 
            if (pageYOffset > limitScrollItemPosition - 200) {
                document.querySelector(`#${scrollModel.id}`).style.display = 'none';
            }
            if (pageYOffset < limitScrollItemPosition - 200) {
                document.querySelector(`#${scrollModel.id}`).style.display = 'block';
            } */


/* ___________________ 3D-MODELS ___________________ */

carouselModel: {
    const carouselModel = new GLTFModels({
        id: "carousel-model",
        cameraFov: 60,
        cameraPositionX: 0,
        cameraPositionY: 5,
        cameraPositionZ: 20,
    });

    const { scene, camera, controls } = carouselModel.makeScene();
    /*     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        scene.add(directionalLight); */
    carouselModel.addScene(carouselModel.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        controls.enabled = false;
        controls.autoRotate = false;
    }, controls);

    const radius = 7;
    const camPos = carouselModel.cameraPositionZ;
    let count = 3;
    let circle = Math.PI * 2;
    let angle = circle / count;
    let currAngle = {
        val: Math.PI / 2
    };

    loader.load('/glasses/animal_crossing_bell_bag/scene.gltf', (gltf) => {
        let model1 = gltf.scene;
        model1.scale.set(0.01, 0.01, 0.01);
        model1.position.set(
            radius * Math.sin(circle),
            0,
            radius * Math.cos(circle),
        );
        circle -= angle;
        model1.lookAt(0, 0, 0);
        model1.userData.draggable = true;
        model1.userData.name = "Money bag";
        scene.add(model1);
    });

    loader.load('/glasses/book_-_encyclopedia/scene.gltf', (gltf) => {
        let model2 = gltf.scene;
        model2.scale.set(2, 2, 2);
        model2.position.set(
            radius * Math.sin(circle),
            0,
            radius * Math.cos(circle),
        );
        circle -= angle;
        model2.lookAt(0, 0, 0);
        /*   model2.lookAt(-180, 10, -180); */
        model2.userData.draggable = true;
        model2.userData.name = "Book";
        scene.add(model2);
    });

    loader.load('/glasses/low_poly_purple_flowers/scene.gltf', (gltf) => {
        let model3 = gltf.scene;
        model3.scale.set(0.03, 0.03, 0.03);
        model3.position.set(
            radius * Math.sin(circle),
            0,
            radius * Math.cos(circle),
        );
        circle -= angle;
        model3.lookAt(0, 0, 0);
        /*   model3.lookAt(-180, 10, -180); */
        model3.userData.draggable = true;
        model3.userData.name = "Flowers";
        scene.add(model3);
    });

    const rotate = () => {
        gsap.to(currAngle, {
            val: '+=' + angle,
            onUpdate: () => {
                camera.position.x = Math.cos(currAngle.val) * camPos;
                camera.position.z = Math.sin(currAngle.val) * camPos;
                camera.lookAt(0, 0, 0);
            },
            onComplete: () => console.log(currAngle.val)
        });
    };

    const rotate2 = () => {
        gsap.to(currAngle, {
            val: '-=' + angle,
            onUpdate: () => {
                camera.position.x = Math.cos(currAngle.val) * camPos;
                camera.position.z = Math.sin(currAngle.val) * camPos;
                camera.lookAt(0, 0, 0);
            },
            onComplete: () => console.log(currAngle.val)
        });
    };


    document.querySelector(".carouselButtonRight").addEventListener('click', rotate, false);
    document.querySelector(".carouselButtonLeft").addEventListener('click', rotate2, false);
    /*   carouselModel.createElem().addEventListener('click', rotate2, false); */



    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();
    const moveMouse = new THREE.Vector2();
    let draggable;

    console.log('window.innerWidth: ', window.innerWidth);
    console.log('window.innerHeight: ', window.innerHeight);
    carouselModel.createElem().addEventListener('click', event => {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        /*   console.log('event.clientX: ', event.clientX); */
        clickMouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        /*       console.log('event.clientY: ', event.clientY); */
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(clickMouse, camera);
        // calculate objects intersecting the picking ray

        /*   let arr = [];
          for (let i = 0; i < scene.children.length; i++) {
              if (scene.children[i].type === "Group") {
                  arr.push(scene.children[i]);
              }
          }
          console.log(arr[0]);
          const intersects = raycaster.intersectObjects(arr); */


        const intersects = raycaster.intersectObjects(scene.children, true);

        /*   console.log('intersects: ', intersects); */
        if (intersects.length > 0 && intersects[0].object.name) {
            /*   draggable = intersects[0].object; */
            console.log(`found - ${intersects[0].object.name}`);
        }
    });
}


NewInStockFirstModel: {


    const model1 = new GLTFModels({
        name: "Round Glasses",
        price: "220",
        id: "round-shaped1",
        loadPath: "round-shaped",
        cameraFov: 60,
        cameraPositionX: 0,
        cameraPositionY: 5,
        cameraPositionZ: 30,
    });

    const { scene, camera, controls } = model1.makeScene();
    model1.loadModel();

    model1.addScene(model1.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }, controls);
}


NewInStockSecondModel: {
    const model2 = new GLTFModels({
        name: "Round Glasses",
        price: "220",
        id: "round-shaped2",
        loadPath: "round-shaped",
        cameraFov: 60,
        cameraPositionX: 0,
        cameraPositionY: 5,
        cameraPositionZ: 30,
    });

    const { scene, camera, controls } = model2.makeScene();
    model2.loadModel();
    model2.addScene(model2.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }, controls);
}

NewInStockThirdModel: {
    const model3 = new GLTFModels({
        name: "Round Glasses",
        price: "220",
        id: "round-shaped3",
        loadPath: "round-shaped",
        cameraFov: 60,
        cameraPositionX: 0,
        cameraPositionY: 5,
        cameraPositionZ: 30,
    });

    const { scene, camera, controls } = model3.makeScene();
    model3.loadModel();
    model3.addScene(model3.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }, controls);
}

BestsellersFirstModel: {
    const model4 = new GLTFModels({
        name: "Heart Glasses",
        price: "175",
        id: "heart-shaped1",
        loadPath: "heart-shaped",
        cameraFov: 60,
        cameraPositionX: 1,
        cameraPositionY: -1,
        cameraPositionZ: 7,
    });

    const { scene, camera, controls } = model4.makeScene();
    model4.loadModel();
    model4.addScene(model4.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera,);
    }, controls);
}

BestsellersSecondModel: {
    const model5 = new GLTFModels({
        name: "Heart Glasses",
        price: "175",
        id: "heart-shaped2",
        loadPath: "heart-shaped",
        cameraFov: 60,
        cameraPositionX: 1,
        cameraPositionY: -1,
        cameraPositionZ: 7,
    });

    const { scene, camera, controls } = model5.makeScene();
    model5.loadModel();
    model5.addScene(model5.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera,);
    }, controls);
}

BestsellersThirdModel: {
    const model6 = new GLTFModels({
        name: "Heart Glasses",
        price: "175",
        id: "heart-shaped3",
        loadPath: "heart-shaped",
        cameraFov: 60,
        cameraPositionX: 1,
        cameraPositionY: -1,
        cameraPositionZ: 7,
    });

    const { scene, camera, controls } = model6.makeScene();
    model6.loadModel();
    model6.addScene(model6.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera,);
    }, controls);
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function animate(time) {
    time *= 0.001;
    resizeRendererToDisplaySize(renderer);
    renderer.setScissorTest(false);
    renderer.setClearColor(clearColor, 0);
    renderer.clear(true, true);
    renderer.setScissorTest(true);
    const transform = `translateY(${window.scrollY}px)`;
    renderer.domElement.style.transform = transform;

    for (const { elem, fn, controls } of sceneElements) {
        const rect = elem.getBoundingClientRect();
        const { left, right, top, bottom, width, height } = rect;
        const isOffscreen =
            bottom < 0 ||
            top > renderer.domElement.clientHeight ||
            right < 0 ||
            left > renderer.domElement.clientWidth;
        if (!isOffscreen) {
            const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
            renderer.setScissor(left, positiveYUpBottom, width, height);
            renderer.setViewport(left, positiveYUpBottom, width, height);
            fn(time, rect);
            controls.update();
            /*       TWEEN.update(); */
        }
    }
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

