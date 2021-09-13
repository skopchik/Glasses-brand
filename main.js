"use strict";
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
/* import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
 */


function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const sceneElements = [];
    function addScene(elem, fn) {
        sceneElements.push({ elem, fn });
    }

    function makeScene() {
        const scene = new THREE.Scene();

        const fov = 60;
        const aspect = window.innerWidth / window.innerHeight;  // the canvas default
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 5, 30);
        /* camera.lookAt(0, 0, 0); */
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(pointLight, ambientLight);

        /*       {
                  const color = 0xFFFFFF;
                  const intensity = 1;
                  const light = new THREE.DirectionalLight(color, intensity);
                  light.position.set(-1, 2, 4);
                  scene.add(light);
              } */

        return { scene, camera };
    }

    /* Добавление отдельной сцены для каждой 3D модели*/
    {
        const elem = document.querySelector('#round-shaped1');
        const { scene, camera } = makeScene();
        const loader = new GLTFLoader();
        loader.load("./glasses/round-shaped/scene.gltf", (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            scene.add(gltf.scene);
        });

        addScene(elem, (time, rect) => {
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            scene.rotation.y = time * 0.8;
            renderer.render(scene, camera);
        });
    }

    {
        const elem = document.querySelector('#round-shaped2');
        const { scene, camera } = makeScene();
        const loader = new GLTFLoader();
        loader.load("./glasses/round-shaped/scene.gltf", (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            scene.add(gltf.scene);
        });

        addScene(elem, (time, rect) => {
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            scene.rotation.y = time * 0.8;
            renderer.render(scene, camera);
        });
    }

    {
        const elem = document.querySelector('#round-shaped3');
        const { scene, camera } = makeScene();
        const loader = new GLTFLoader();
        loader.load("./glasses/round-shaped/scene.gltf", (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            scene.add(gltf.scene);
        });

        addScene(elem, (time, rect) => {
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            scene.rotation.y = time * 0.8;
            renderer.render(scene, camera);
        });
    }

    {
        const elem = document.querySelector('#heart-shaped1');
        const { scene, camera } = makeScene();
        const loader = new GLTFLoader();
        loader.load("./glasses/heart-shaped/scene.gltf", (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            scene.add(gltf.scene);
        });

        addScene(elem, (time, rect) => {
            camera.position.set(0, -1, 10);
            camera.fov = 40;
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            scene.rotation.y = time * 0.8;
            renderer.render(scene, camera);
        });
    }

    {
        const elem = document.querySelector('#heart-shaped2');
        const { scene, camera } = makeScene();
        const loader = new GLTFLoader();
        loader.load("./glasses/heart-shaped/scene.gltf", (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            scene.add(gltf.scene);
        });

        addScene(elem, (time, rect) => {
            camera.position.set(0, -1, 10);
            camera.fov = 40;
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            scene.rotation.y = time * 0.8;
            renderer.render(scene, camera);
        });
    }

    {
        const elem = document.querySelector('#heart-shaped3');
        const { scene, camera } = makeScene();
        const loader = new GLTFLoader();/* 
        loader.setPath("./glasses/heart-shaped"); */
        loader.load("./glasses/heart-shaped/scene.gltf", (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            scene.add(gltf.scene);
        });

        addScene(elem, (time, rect) => {
            camera.position.set(0, -1, 10);
            camera.fov = 40;
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            scene.rotation.y = time * 0.8;
            renderer.render(scene, camera);
        });
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

    const clearColor = new THREE.Color('#000');
    function render(time) {
        time *= 0.001;

        resizeRendererToDisplaySize(renderer);

        renderer.setScissorTest(false);
        renderer.setClearColor(clearColor, 0);
        renderer.clear(true, true);
        renderer.setScissorTest(true);

        const transform = `translateY(${window.scrollY}px)`;
        renderer.domElement.style.transform = transform;

        for (const { elem, fn } of sceneElements) {
            // get the viewport relative position of this element
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
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
