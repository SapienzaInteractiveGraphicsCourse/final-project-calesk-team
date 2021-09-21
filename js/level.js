


export function create_level(){
	
	create_ground();
	create_limit();
	add_walls();
	
	
	add_battery( -14, 0, 13);
	add_battery( -5, 0, 7);
	add_battery( 1, 0, 13);
	add_battery( 6, 0, 17);
	add_battery( 11, 0, 13);
	add_battery( 13, 0, 0);
	
	add_battery( -3, 0, -3);
	add_battery( -5, 0, -13);
	//add_tree(-29.5, 1, 29.5);
	//add_battery( -3, 3, 0);
	
	add_finish_block(13, 1.5, -13);
	
	add_enemys(-12, 0, 10);
	
}		

function create_limit(){
	
	var down_limit = new Physijs.BoxMesh(new THREE.BoxGeometry(36, 2, 2), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 }),0);
	
	down_limit.position.set(0, 0.5, 19);
	scene.add(down_limit);
	
}

function create_ground(){
	// Ground
	  
	textureLoader = new THREE.TextureLoader();
	
	var ground_texture_url = 'textures/ground.jpg';
	var grass_texture_url = 'textures/grass.png';
	var underground_texture_url = 'textures/underground.png'; 
	
	var ground_texture = textureLoader.load(ground_texture_url);
	ground_texture.wrapS = THREE.RepeatWrapping;
	ground_texture.wrapT = THREE.RepeatWrapping;
	ground_texture.repeat.set( 12, 1 );
	
	var lateral_ground_texture = textureLoader.load(ground_texture_url);
	lateral_ground_texture.wrapS = THREE.RepeatWrapping;
	lateral_ground_texture.wrapT = THREE.RepeatWrapping;
	lateral_ground_texture.repeat.set( 12, 1 );
	
	var underground_texture = textureLoader.load(underground_texture_url);
	underground_texture.wrapS = THREE.RepeatWrapping;
	underground_texture.wrapT = THREE.RepeatWrapping;
	underground_texture.repeat.set( 36, 36);
	
	var grass_texture = textureLoader.load(grass_texture_url);
	grass_texture.wrapS = THREE.RepeatWrapping;
	grass_texture.wrapT = THREE.RepeatWrapping;
	grass_texture.repeat.set( 36, 36);
	
	ground_material = [
		new THREE.MeshPhongMaterial({map: lateral_ground_texture,
      color: 0xd2b48c,}),
		new THREE.MeshPhongMaterial({map: lateral_ground_texture,
      color: 0xd2b48c,}),
		new THREE.MeshPhongMaterial({map: grass_texture,
      color: 0xd2b48c,}),
		new THREE.MeshPhongMaterial({map: underground_texture,
      color: 0xd2b48c,}),
		new THREE.MeshPhongMaterial({map: ground_texture,
      color: 0xd2b48c,}),
		new THREE.MeshPhongMaterial({map: ground_texture,
      color: 0xd2b48c,}),
		];
		
	ground1 = new Physijs.BoxMesh(new THREE.BoxGeometry(36, 3, 14),ground_material,0);
	ground1.receiveShadow = true;
	ground1.position.set( 0, -2, 11 );
	ground1.name = 'ground';
	
	
	scene.add( ground1 );
	
	ground2 = new Physijs.BoxMesh(new THREE.BoxGeometry(27, 3, 22),ground_material,0);
	ground2.receiveShadow = true;
	ground2.position.set( 4.5, -2, -7 );
	ground2.name = 'ground';
	
	
	scene.add( ground2 );
	
}

function add_walls(){
	
	
	add_wall( -8, 0.5, -7, 2, 2, 22 );
	
	add_wall( -11.5, 0.5, 5, 9, 2, 2 );
	
	//L block 1
	add_block( -7, 0.5, 13 );
	add_block( -9, 0.5, 13 );
	add_block( -9, 0.5, 11 );
	
	// left wall 
	add_wall(-17, 0.5, 11, 2, 2, 14);   // p_y = d_y / 2 - 0.5
	
	//up wall
	add_wall(5, 0.5, -17, 26, 2, 2);
	
	// wall 1
	add_wall( -2, 0.5, 13, 2, 2, 10); // p_x p_y p_z d_x d_y d_z
	
	//block 1
	add_block( 3, 0.5, 5);
	
	//block 2
	add_block( -3, 0.5, 2);
	
	//block 3
	add_block( 10, 0.5, 5);
	
	//square block 1
	add_wall( 6, 0.5, 13, 5, 2, 5);
	
	//L block 2
	add_block( 5, 0.5, 0 );
	add_block( 3, 0.5, 0 );
	add_block( 3, 0.5, -2 );
	
	//square block 2
	add_wall( 2, 0.5, -5, 4, 2, 5);
	
	//right wall
	add_wall(17, 0.5, 0, 2, 2, 36);
	
	/*//L block 3
	add_block( -7, 0.5, -17 );
	add_block( -7, 0.5, -15 );
	add_block( -5, 0.5, -17 );
	*/
	//wall 2
	add_wall( 13, 0.5, -4, 6, 2, 2);
	
	//s wall 1
	add_wall( 3, 0.5, -10, 2, 2, 5);
	
	//s wall 2
	add_wall( 9, 0.5, -15, 2, 2, 5);
}

function initialize_enemy(){
	
	enemy.position.set(0, -0.5, 0);
	enemy.scale.set(0.8, 0.8, 0.8);
	
	
}

function add_enemy(x, y, z){
	
	initialize_enemy();
	
	var enemy_material = Physijs.createMaterial(
		//new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 }));
		new THREE.MeshBasicMaterial({ wireframe: true, opacity: 1 }));
		
	var enemy_box = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 1, 1, 1 ),  
		enemy_material,
		0//static object to prevent strange collision effects
	);
	
	enemy_box.setCcdMotionThreshold(1);
	enemy_box.castShadow = true;
	enemy_box.name = 'enemy';
	
	enemy_box.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
		if(other_object.name == 'robot'){
			scene.remove(robot);
			setTimeout(function(){
				window.location.href = "./index.html";
				
			}, 2000);
		}
			
	});
	
	enemy_box.position.set(x, y, z);
	enemy_box.__dirtyPosition = true;
	enemy_box.__dirtyRotation = true;
	
	
	var enemy_new = enemy.clone();
	
	enemy_box.add(enemy_new);
		
	enemy_array.push(enemy_box);
	
	scene.add(enemy_box);
	
}

function add_enemys(){
	
	//quantità in base alla difficoltà?
	
	add_enemy(-13, 0, 10);
	
	add_enemy(-6, 0, -2);
	
	add_enemy(-3, 0, -13);
	
	add_enemy(6, 0, -11);
	
	add_enemy(7, 0, -6);
	
	add_enemy(7, 0, 4);
	
	add_enemy(13, 0, 10);
	
	//add_enemy(13, 0, 6);
	
}


function initialize_battery(){

	battery.position.set(0.2,-0.25,0.2);
	battery.scale.set(1.4, 1.7, 1.4);
	
	
		
}
	
function add_battery(x, y, z){
	
	initialize_battery();
	
	var battery_material = Physijs.createMaterial(
		new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 }),
		//new THREE.MeshBasicMaterial({ wireframe: true, opacity: 1 })
	);
	
	var battery_box = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 0.3, 0.5, 0.3 ),  
		battery_material,
		0 //mass = 0 means static object
	);
	
	battery_box.setCcdMotionThreshold(1);
	battery_box.castShadow = true;
	battery_box.name = 'battery';
	
	battery_box.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
		if(other_object.name == 'robot')
			scene.remove(this);
	});
	
	battery_box.position.set(x, y, z);
	battery_box.__dirtyPosition = true;
	battery_box.__dirtyRotation = true;
	
	var battery_new = battery.clone();
	
	battery_array.push(battery_new);
	
	battery_box.add(battery_new);
	
	scene.add(battery_box);
	
}

function add_wall( p_x, p_y, p_z, d_x, d_y, d_z){
	
	var texture = textureLoader.load("textures/Brick_wall.png");
	var lateral_texture = textureLoader.load("textures/Brick_wall.png");
	var front_texture = textureLoader.load("textures/Brick_wall.png");
	
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( d_x, d_z );
	
	lateral_texture.wrapS = THREE.RepeatWrapping;
	lateral_texture.wrapT = THREE.RepeatWrapping;
	lateral_texture.repeat.set( d_z, d_y );
	
	front_texture.wrapS = THREE.RepeatWrapping;
	front_texture.wrapT = THREE.RepeatWrapping;
	front_texture.repeat.set( d_x, d_y );
	
	var box_material = [
		new THREE.MeshPhongMaterial({map: lateral_texture,
      color: 0x808080,}),
		new THREE.MeshPhongMaterial({map: lateral_texture,
      color: 0x808080,}),
		new THREE.MeshPhongMaterial({map: texture,
      color: 0x808080,}),
		new THREE.MeshPhongMaterial({map: texture,
      color: 0x808080,}),
		new THREE.MeshPhongMaterial({map: front_texture,
      color: 0x808080,}),
		new THREE.MeshPhongMaterial({map: front_texture,
      color: 0x808080,}),
		];
	
	var box = new Physijs.BoxMesh(
		new THREE.BoxGeometry( d_x, d_y, d_z ),  
		box_material,
		0 //mass = 0 means static object
	);
	
	box.setCcdMotionThreshold(1);
	box.castShadow = true;
	box.name = 'box';
	box.position.set(p_x, p_y, p_z);	
	scene.add(box);
	
}

function add_block( x, y, z ){
	
	var texture = textureLoader.load("textures/Brick_wall.png");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 2, 2 );
	
	var box_material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({map: texture,
      color: 0x808080,}),
		//new THREE.MeshBasicMaterial({ wireframe: true, opacity: 1 })
	);
	var box = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 2, 2, 2 ),  
		box_material,
		0 //mass = 0 means static object
	);
	
	box.setCcdMotionThreshold(1);
	box.castShadow = true;
	box.name = 'box';
	box.position.set(x,y,z);	
	scene.add(box);
}

function add_finish_block(x, y, z){
	var texture = textureLoader.load("textures/finish.png");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 2, 1 );
	
	var finish_material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({map: texture,
      color: 0x808080,}),
	);
	var finish = new Physijs.BoxMesh(
		new THREE.PlaneGeometry( 4, 1 ), 
		finish_material,
		0 //mass = 0 means static object
	);
	
	finish.setCcdMotionThreshold(1);
	finish.castShadow = false;
	finish.position.set(x,y,z);	
	scene.add(finish);
	
	var box_material = Physijs.createMaterial(
		new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
	);
	var box = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 4, 2, 2 ),  
		box_material,
		0 //mass = 0 means static object
	);
	
	box.setCcdMotionThreshold(1);
	box.castShadow = false;
	box.name = 'finish';
	box.position.set(x,y-1,z-1);	
	scene.add(box);
	
	
}

function add_tree(x, y, z){
	var leafe_texture = textureLoader.load("textures/leafe.png");
	leafe_texture.wrapS = THREE.RepeatWrapping;
	leafe_texture.wrapT = THREE.RepeatWrapping;
	leafe_texture.repeat.set( 3, 3 );
	
	var wood_texture = textureLoader.load("textures/wood.png");
	wood_texture.wrapS = THREE.RepeatWrapping;
	wood_texture.wrapT = THREE.RepeatWrapping;
	wood_texture.repeat.set( 1, 3 );
	
	var leafe_box_material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({map: leafe_texture,
      color: 0x808080,}),
		//new THREE.MeshBasicMaterial({ wireframe: true, opacity: 1 })
	);
	var leafe_box = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 3, 3, 3 ),  
		leafe_box_material,
		0 //mass = 0 means static object
	);
	
	leafe_box.setCcdMotionThreshold(1);
	leafe_box.castShadow = true;
	leafe_box.name = 'leafes';
	leafe_box.position.set(x,y+3,z);	
	scene.add(leafe_box);
	
	var wood_box_material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({map: wood_texture,
      color: 0x808080,}),
		//new THREE.MeshBasicMaterial({ wireframe: true, opacity: 1 })
	);
	var wood_box = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 1, 3, 1 ),  
		wood_box_material,
		0 //mass = 0 means static object
	);
	
	wood_box.setCcdMotionThreshold(1);
	wood_box.castShadow = true;
	wood_box.name = 'wood';
	wood_box.position.set(x,y,z);	
	scene.add(wood_box);
	
}