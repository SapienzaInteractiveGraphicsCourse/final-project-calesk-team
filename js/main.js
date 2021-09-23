"use strict";

import * as THREE from "./libs/three.module.js";
import { GLTFLoader } from "./libs/GLTFLoader.js";
import { OrbitControls } from './libs/OrbitControls.js';
import TWEEN from "./libs/tween.esm.js";
import {run, rotate, wave, battery_animation, enemy_animation} from "./animations.js";

import {create_level} from "./level.js";

Physijs.scripts.worker = "physijs_worker.js";
Physijs.scripts.ammo = "ammo.js";


function init() {

  container = document.getElementById("game");
	
  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ antialias: true, });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.set(robotX, 11, robotZ+15);
  camera.lookAt(robotX, robotY, robotZ);
  camera.updateProjectionMatrix();

//DEBUG
	//orbitControls = true;
	//controls = new OrbitControls( camera, renderer.domElement );

  window.addEventListener(
    "resize",
    function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );
	
	
	
	
	
	container.appendChild(renderer.domElement);

	scene = new Physijs.Scene({fixedTimeStep: 1/100});
	scene.setGravity(new THREE.Vector3( 0, -10, 0 ));
	scene.background = new THREE.Color( 0xac0fc );

    
    const color = 0xffffff;
    const intensity = 1.7;

    
    ambientLight = new THREE.AmbientLight(color, intensity);
    scene.add(ambientLight);
  
	dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( - 1, 1.75, 1 );
	dirLight.position.multiplyScalar( 30 );
	

	dirLight.castShadow = true;

	dirLight.shadow.mapSize.width = 2048;
	dirLight.shadow.mapSize.height = 2048;

	const d = 50;

	dirLight.shadow.camera.left = - d;
	dirLight.shadow.camera.right = d;
	dirLight.shadow.camera.top = d;
	dirLight.shadow.camera.bottom = - d;

	dirLight.shadow.camera.far = 3500;
	dirLight.shadow.bias = - 0.0001;
	
	scene.add( dirLight );
	
	gltfLoader = new GLTFLoader();

	scene.add(camera);
	
	
	load_characters();
	
	setTimeout(function(){  //wait for all the models to be loaded
		initialize_characters();
		
		create_level();
		battery_animation();
		enemy_animation();
		input_controls();
		inizio = data.getTime();
		requestAnimationFrame(animate);
		
	}, 2000);
	
}

function load_characters() {
	
	load_robot();
	//if(sessionStorage.getItem("multiplayer") == "true") {
	load_enemy();
	load_battery();
	//load_radio();
}

function initialize_characters(){
	initialize_robot();
	//initialize_radio();
}

function load_robot() {
  
    robot = new Physijs.Scene();
    {
     
      gltfLoader.load("models/robot/source/model.gltf", (gltf) => {
        robot = gltf.scene;
        robot.name = "robot";
        robot.position.set(0, 0.5, 0);
		

        robot.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        robot.castShadow = true;
        robot.receiveShadow = true;

		root = robot.getObjectByName(robot_parts.Root);
		head = robot.getObjectByName(robot_parts.Head);
		neck = robot.getObjectByName(robot_parts.Neck);
		torso = robot.getObjectByName(robot_parts.Torso);
		rotation = robot.getObjectByName(robot_parts.Rotation);
		antenna = robot.getObjectByName(robot_parts.Antenna);
		upperArmR = robot.getObjectByName(robot_parts.UpperArmR);
		upperArmL = robot.getObjectByName(robot_parts.UpperArmL);
		lowerArmR = robot.getObjectByName(robot_parts.LowerArmR);
		lowerArmL = robot.getObjectByName(robot_parts.LowerArmL);

		upperLegR = robot.getObjectByName(robot_parts.UpperLegR);
		lowerLegR = robot.getObjectByName(robot_parts.LowerLegR);
		upperLegL = robot.getObjectByName(robot_parts.UpperLegL);
		lowerLegL = robot.getObjectByName(robot_parts.LowerLegL);

		handR = robot.getObjectByName(robot_parts.HandR);
		handL = robot.getObjectByName(robot_parts.HandL);
		
		pinkyR = robot.getObjectByName("right_pinky");
		pinkyL = robot.getObjectByName("left_pinky");
		
		pinkytipR = robot.getObjectByName("right_pinkytip");
		pinkytipR = robot.getObjectByName("leftt_pinkytip");

		thumbR = robot.getObjectByName("right_thumb");
		thumbL = robot.getObjectByName("left_thumb");
		thumbtipR = robot.getObjectByName("right_thumbtip");
		thumbtipL = robot.getObjectByName("left_thumbtip");

		footR = robot.getObjectByName(robot_parts.FootR);
		footL = robot.getObjectByName(robot_parts.FootL);
		
      });
    }
  }

function load_battery(){
	battery = new THREE.Scene();
   
	gltfLoader.load("models/battery/scene.gltf", (gltf) => {
		battery = gltf.scene;
		battery.name = "battery";
		

		battery.traverse(function (child) {
		  if (child instanceof THREE.Mesh) {
			child.castShadow = true;
			child.receiveShadow = true;
		  }
		});
		battery.castShadow = true;
		battery.receiveShadow = true;
		
		
    });

}

function load_radio(){
	radio = new THREE.Scene();
    {
     
      gltfLoader.load("models/radio/scene.gltf", (gltf) => {
        radio = gltf.scene;
        radio.name = "radio";
        

        radio.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        radio.castShadow = true;
        radio.receiveShadow = true;
		
        
      });
    }
}

function load_enemy(){
	enemy = new Physijs.Scene();
   
      gltfLoader.load("models/enemy_robot/scene.gltf", (gltf) => {
        enemy = gltf.scene;
        enemy.name = "enemy";
        

        enemy.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        enemy.castShadow = true;
        enemy.receiveShadow = true;
	
      });
   
}

function initialize_robot(){
	upperArmR.rotation.z = -(60 * Math.PI) / 180;
	upperArmL.rotation.z = (60 * Math.PI) / 180;
	lowerArmR.rotation.z = -(15 * Math.PI) / 180;
	lowerArmL.rotation.z = (15 * Math.PI) / 180;
	
	handR.rotation.x = -(5 * Math.PI) / 180;
	handL.rotation.x = (5 * Math.PI) / 180;
	
	thumbR.rotation.x = -(45 * Math.PI) / 180;
	thumbR.rotation.y = -(45 * Math.PI) / 180;
	thumbL.rotation.x = -(45 * Math.PI) / 180;
	thumbL.rotation.y = (45 * Math.PI) / 180;
	
	
	pinkyR.rotation.z = -(30 * Math.PI) / 180;
	pinkyL.rotation.z = (30 * Math.PI) / 180;
	
	root.rotation.y = (-90 * Math.PI) / 180;
	root.position.set( 0,0,0);
	
	
	set_model_physics();
}


function initialize_radio(){
	
	radio.position.set(-2, 0.3, 0);
	radio.scale.set(2, 2, 2);
	
	radio.rotation.y = (90 * Math.PI) / 180;
	radio.rotation.z = (90 * Math.PI) / 180;
	
	
	scene.add(radio);
}

function set_model_physics(){
	var robot_material = Physijs.createMaterial(
		//new THREE.MeshBasicMaterial({ wireframe: true, opacity: 1 })
		new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
	);
	robot_box = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 0.7, 0.5, 0.7 ),  
		robot_material,
		20
	);
	upper_robot_box = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 0.6, 1, 0.6 ),  
		robot_material,
		20
	);
	/*box_container.position.set(
		robot.position.x,
		robot.position.y,
		robot.position.z,
	);*/
	
	robot_box.setCcdMotionThreshold(1);
	upper_robot_box.setCcdMotionThreshold(1);
	
	robot_box.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
		
		
		
		if(other_object.name == 'finish'){
			
			fine = new Date().getTime();
			tempo = (fine - inizio)/1000;
			console.log("TEMPO:", tempo);
			inputDisabled = true;
			tween_run_middle.stop();
			wave();
			//camera orbitale
			orbitControls = true;
			controls = new OrbitControls( camera, renderer.domElement );
			//controls.target.set( 0, 0.5, 0 );
			controls.update();
			controls.enablePan = false;
			controls.enableDamping = true;
			
			setTimeout(function(){
				sessionStorage.setItem("tempo", tempo);
				window.location.href = "./finish.html";
				
			}, 5000);
	
		}
		
		if((other_object.name != 'ground' && other_object.name != 'battery') && (contact_normal.x == 1 || contact_normal.x == -1 || contact_normal.z == 1 || contact_normal.z == -1)) {
			position = robot_box.position.x;
			if (contact_normal.x == 1 || right) {
				collision_direction = 'right';
			}else if (contact_normal.x == -1 || left) {
				collision_direction = 'left';
			}else if (contact_normal.z == 1 || down) {
				collision_direction = 'down';
			}else if (contact_normal.z == -1 || up) {
				collision_direction = 'up';
			}
			collided = true;
			
		}
		
		if(other_object.name == 'battery'){
			
			//console.log("COLLISIONE con batteria");
			if(step > 0) step += 0.05;
			else step -= 0.05;
			
			time -= 20;
			
			setTimeout(function(){
	
				if(step > 0) step -= 0.05;
				else step += 0.05;
				
				time += 20;
				
			}, 2000);
			
		}
		});
	
	robot_box.castShadow = true;
	robot_box.position.set(robotX, robotY, robotZ);
	upper_robot_box.castShadow = true;
	upper_robot_box.position.set(0,0.75,0);
	
	robot_box.__dirtyPosition = true;
	robot_box.__dirtyRotation = true;
	upper_robot_box.__dirtyPosition = true;
	upper_robot_box.__dirtyRotation = true;
	
	robot_box.add(robot);
	robot_box.add(upper_robot_box);
	robot_box.name = 'robot';
	upper_robot_box.name = 'upper_robot';
	
	scene.add(robot_box);
	
	
	
}


function input_controls(){
	
	document.addEventListener("keydown", function(event) {
		if(!inputDisabled){
		var keyCode = event.which;
		switch (keyCode) {
			
			case 37: // left arrow
			
			if (!left){
				//console.log("Left pressed");
				//robot.rotation.y = (180 * Math.PI) / 180;
				if(running){
					//console.log("Left keyup stop");
					tween_run_middle.stop();
					tween_stop.start();
				}
				running = true;
				left = true;
				right = false;
				up = false;
				down = false;
				direction = 'left';
				rotate();
				run();
			}
			
			break;
			
			case 38: // up arrow			
			if (!up) {
				//console.log("Up pressed");
				//robot.rotation.y = (90 * Math.PI) / 180;
				if(running){
					//console.log("Up keyup stop");
					tween_run_middle.stop();
					tween_stop.start();
				}
				running = true;
				left = false;
				right = false;
				up = true;
				down = false;
				direction = 'up';
				rotate();
				run();
			}
			break;
		
			case 39: // right arrow
			
			if(!right){
				//console.log("Right pressed");
				//robot.rotation.y = (0 * Math.PI) / 180;
				if(running){
					//console.log("Right keyup stop");
					tween_run_middle.stop();
					tween_stop.start();
				}
				running = true;
				right = true;
				left = false;
				up = false;
				down = false;
				direction = 'right';
				rotate();
				run();
			}
			break;
			
			case 40: // down arrow
			 
			if (!down){
				//console.log("Down pressed");
				//robot.rotation.y = -(90 * Math.PI) / 180;
				if(running){
					//console.log("Down keyup stop");
					tween_run_middle.stop();
					tween_stop.start();
				}
				running = true;
				left = false;
				right = false;
				up = false;
				down = true;
				direction = 'down';
				rotate();
				run();
			}
			break;
		
			case 65: // a left			
			if (!left){
				//console.log("Left pressed");
				//robot.rotation.y = (180 * Math.PI) / 180;
				if(running){
					//console.log("Left keyup stop");
					tween_run_middle.stop();
					tween_stop.start();
				}
				running = true;
				left = true;
				right = false;
				up = false;
				down = false;
				direction = 'left';
				rotate();
				run();
			}
			break;
			
			case 87: // w up
			if (!up) {
				//console.log("Up pressed");
				//robot.rotation.y = (90 * Math.PI) / 180;
				if(running){
					//console.log("Up keyup stop");
					tween_run_middle.stop();
					tween_stop.start();
				}
				running = true;
				left = false;
				right = false;
				up = true;
				down = false;
				direction = 'up';
				rotate();
				run();
			}
			break;
			
			case 68: // d right
			if(!right){
				//console.log("Right pressed");
				//robot.rotation.y = (0 * Math.PI) / 180;
				if(running){
					//console.log("Right keyup stop");
					tween_run_middle.stop();
					tween_stop.start();
				}
				running = true;
				right = true;
				left = false;
				up = false;
				down = false;
				direction = 'right';
				rotate();
				run();
			}
			break;

			case 83: // s down
			if (!down){
				//console.log("Down pressed");
				//robot.rotation.y = -(90 * Math.PI) / 180;
				if(running){
					////console.log("Down keyup stop");
					down = false;
					running = false;
					tween_run_middle.stop();
					tween_stop.start();
				}
				running = true;
				left = false;
				right = false;
				up = false;
				down = true;
				direction = 'down';
				rotate();
				run();
			}
			break;
		
		};
		}
	});
	
	document.addEventListener("keyup", function(event) {
		var keyCode = event.which;
		switch (keyCode) {
			
			case 37: //left arrow
			if(left){
				//console.log("Left stop");
				tween_run_middle.stop();
				tween_stop.start();
				left = false;
				running = false;
			}
			
			break;
			
			case 38: // up arrow
			if(up){
				//console.log("Up stop");
				tween_run_middle.stop();
				tween_stop.start();
				up = false;
				running = false;
			}
			
			break;
			
			case 39: //right arrow
			if(right){
				//console.log("Right stop");
				tween_run_middle.stop();
				tween_stop.start();
				running = false;
				right = false;
			}
			
			
			break;
			
			case 40: // down arrow			
			if(down){
				//console.log("Down stop");
				tween_run_middle.stop();
				tween_stop.start();
				running = false;
				down = false;
			}
			
			
			break;
		
			case 65: // a left
			if(left){
				//console.log("Left stop");
				tween_run_middle.stop();
				tween_stop.start();
				left = false;
				running = false;
			}
			
			break;
			
			case 87: // w up
			if(up){
				//console.log("Up stop");
				tween_run_middle.stop();
				tween_stop.start();
				up = false;
				running = false;
			}
			
			break;
			
			case 68: // d right
			if(right){
				//console.log("Right stop");
				tween_run_middle.stop();
				tween_stop.start();
				right = false;
				running = false;
			}
			
			break;

			case 83: // s down
			if(down){
				//console.log("Down stop");
				tween_run_middle.stop();
				tween_stop.start();
				down = false;
				running = false;
			}
			
			break;
			
		};
	});
	
}

function animate() {
	
	delta = clock.getDelta();
	TWEEN.update();
	scene.simulate();
	if(orbitControls) {
		controls.target.set(robot_box.position.x, robot_box.position.y, robot_box.position.z);
		controls.update();
	} else{
		camera.position.set(robot_box.position.x, 11, robot_box.position.z+15);
		camera.lookAt(robot_box.position.x, robot_box.position.y, robot_box.position.z);
	
	}
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
  
init();
