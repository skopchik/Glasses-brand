"use strict";

import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
const sceneElements = [];
const clearColor = new THREE.Color('#000');

renderer.setPixelRatio(window.devicePixelRatio);

class GLTFModels {

    constructor(options) {
        this.name = options.name;
        this.price = options.price;
        this.id = options.id;
        document.querySelector(`#${this.id} + .showcase-title`).textContent = this.name;
        document.querySelector(`#${this.id} ~ .showcase-price`).textContent = `$${this.price}`;

        this.loadPath = options.loadPath;
        this.cameraFov = options.cameraFov;
        this.cameraPositionX = options.cameraPositionX;
        this.cameraPositionY = options.cameraPositionY;
        this.cameraPositionZ = options.cameraPositionZ;
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
        const controls = this.controls;


        controls.maxDistance = 50;
        controls.minDistance = 0;
        controls.enableDamping = true;

        /* controls.autoRotate = true;
        controls.autoRotateSpeed = 5; */

        camera.position.set(this.cameraPositionX, this.cameraPositionY, this.cameraPositionZ);





        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(pointLight, ambientLight);

        return { scene, camera, controls };
    }

    loadModel() {
        const scene = this.scene;
        const loader = new GLTFLoader();
        loader.load(`./glasses/${this.loadPath}/scene.gltf`, (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            scene.add(gltf.scene);
        });
    }

    addModelRotation(scrollSpeed) {
        const scene = this.scene;
        window.addEventListener('wheel', (event) => {
            scene.rotation.y += scrollSpeed * (event.deltaY * (Math.PI / 180));
        });
    }

}

NewInStockFirstModel: {
    const model = new GLTFModels({
        name: "Round Glasses",
        price: "220",
        id: "round-shaped1",
        loadPath: "round-shaped",
        cameraFov: 60,
        cameraPositionX: 0,
        cameraPositionY: 5,
        cameraPositionZ: 30,
    });

    const { scene, camera, controls } = model.makeScene();
    model.loadModel();
    model.addScene(model.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        model.addModelRotation(-0.009);
        renderer.render(scene, camera);
    }, controls);
}

BestsellersFirstModel: {
    const model2 = new GLTFModels({
        name: "Heart Glasses",
        price: "175",
        id: "heart-shaped1",
        loadPath: "heart-shaped",
        cameraFov: 60,
        cameraPositionX: 1,
        cameraPositionY: -1,
        cameraPositionZ: 7,
    });

    const { scene, camera, controls } = model2.makeScene();
    model2.loadModel();
    model2.addScene(model2.createElem(), (time, rect) => {
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        model2.addModelRotation(-0.009);
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

        }
        controls.update();
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

