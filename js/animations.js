import TWEEN from "./libs/tween.esm.js";

var r_finale = 0;
var r = (0 * Math.PI) / 180;
var r_new;
var n_angoli = 0;
var diff = 0;


export function run(){
	
	
	if ((left || up)&& step > 0) step = -step;
	else if ((right || down) && step < 0) step = -step;
	
	
	var start = {
		
		ant : antenna.rotation.z,
		
		head : head.rotation.x,
		neck: neck.rotation.x,
		torso: torso.rotation.x,
		
		rot : rotation.rotation.z,
		
		armR : upperArmR.rotation.x,
		armL : upperArmL.rotation.x,
		
		legR : upperLegR.rotation.x,
		legL : upperLegL.rotation.x,
		
		loweLegR : lowerLegR.rotation.x,
		loweLegL : lowerLegL.rotation.x,
	};
	
	
	var middle = {
		
		ant : (20 * Math.PI) / 180,
		
		head : -(5 * Math.PI) / 180,
		neck: -(10 * Math.PI) / 180,
		torso: (10 * Math.PI) / 180,
		
		rot : rotation.rotation.z + (90 * Math.PI) / 180, 
		
		armR : -(30 * Math.PI) / 180,
		armL : (30 * Math.PI) / 180,
		
		legR : (45 * Math.PI) / 180,
		legL : -(45 * Math.PI) / 180,
		
		loweLegR : (0 * Math.PI) / 180,
		loweLegL : -(10 * Math.PI) / 180,
	};
	

	var end = {
		
		ant : -(20 * Math.PI) / 180,
		
		head : (5 * Math.PI) / 180,
		neck: (10 * Math.PI) / 180,
		torso: -(10 * Math.PI) / 180,
		
		rot : rotation.rotation.z + (180 * Math.PI) / 180, 
		
		armR : (30 * Math.PI) / 180,
		armL : -(30 * Math.PI) / 180,
		
		legR : -(45 * Math.PI) / 180,
		legL : (45 * Math.PI) / 180,
		
		loweLegR : (0 * Math.PI) / 180,
		loweLegL : (10 * Math.PI) / 180,
		
	};
	
	var stop = {
		
		ant : (0 * Math.PI) / 180,
		
		head : (0 * Math.PI) / 180,
		neck: (0 * Math.PI) / 180,
		torso: (0 * Math.PI) / 180,
		
		rot : (180 * Math.PI) / 180, 
		
		armR : (0 * Math.PI) / 180,
		armL : (0 * Math.PI) / 180,
		
		legR : (0 * Math.PI) / 180,
		legL : (0 * Math.PI) / 180,
		
		loweLegR : (0 * Math.PI) / 180,
		loweLegL : (0 * Math.PI) / 180,
		
	};
	
	tween_run_middle = new TWEEN.Tween(start)
					.to(middle, time)
					.easing(TWEEN.Easing.Linear.None)
					.onUpdate(function () {
						
						if(!collided || collision_direction != direction ){
							if(direction == 'right' || direction == 'left'){
								camera.position.x += step;
								camera.updateProjectionMatrix();
								robot_box.position.x += step;  // x axe
								collided = false;
							}else if (direction == 'up' || direction == 'down'){
								camera.position.z += step;
								camera.updateProjectionMatrix();
								robot_box.position.z += step;  //z axe
								collided = false;
							}
						}
						rotation.rotation.z += (5 * Math.PI) / 180,
						
						antenna.rotation.z = start.ant;
						
						head.rotation.x = start.head;
						
						neck.rotation.x = start.neck;
						torso.rotation.x = start.torso;
					
						upperArmR.rotation.x = start.armR;
						upperArmL.rotation.x = start.armL;
						
						upperLegR.rotation.x = start.legR;
						upperLegL.rotation.x = start.legL;
						
						lowerLegR.rotation.x = start.loweLegR;
						lowerLegL.rotation.x = start.loweLegL;
						
						robot_box.__dirtyPosition = true;
						robot_box.__dirtyRotation = true;
					})
					.start();
	
	tween_run_end =  new TWEEN.Tween(start)
					.to(end, time)
					.easing(TWEEN.Easing.Linear.None)
					.onUpdate(function () {
						
						if(!collided || collision_direction != direction ){
							if(direction == 'right' || direction == 'left'){
								camera.position.x += step;
								camera.updateProjectionMatrix();
								robot_box.position.x += step;  // x axe
								collided = false;
							}else if (direction == 'up' || direction == 'down'){
								camera.position.z += step;
								camera.updateProjectionMatrix();
								robot_box.position.z += step;  //z axe
								collided = false;
							}
						}
						
						rotation.rotation.z += (5 * Math.PI) / 180,
						
						antenna.rotation.z = start.ant;
						
						head.rotation.x = start.head;
						neck.rotation.x = start.neck;
						torso.rotation.x = start.torso;
					
						upperArmR.rotation.x = start.armR;
						upperArmL.rotation.x = start.armL;
						
						upperLegR.rotation.x = start.legR;
						upperLegL.rotation.x = start.legL;
						
						lowerLegR.rotation.x = start.loweLegR;
						lowerLegL.rotation.x = start.loweLegL;
						
						robot_box.__dirtyPosition = true;
						robot_box.__dirtyRotation = true;
						
					})
					.yoyo(true)
					.repeat(Infinity);

	tween_run_middle.chain(tween_run_end);
	
	
	tween_stop = new TWEEN.Tween(start)
					.to(stop, time)
					.easing(TWEEN.Easing.Linear.None)
					.onUpdate(function () {
						
						antenna.rotation.z = start.ant;
						
						head.rotation.x = start.head;
						neck.rotation.x = start.neck;
						torso.rotation.x = start.torso;
						
						upperArmR.rotation.x = start.armR;
						upperArmL.rotation.x = start.armL;
						
						upperLegR.rotation.x = start.legR;
						upperLegL.rotation.x = start.legL;
						
						lowerLegR.rotation.x = start.loweLegR;
						lowerLegL.rotation.x = start.loweLegL;
						
						robot_box.__dirtyPosition = true;
						robot_box.__dirtyRotation = true;
						
					});
	
	robot_box.__dirtyPosition = true;
	robot_box.__dirtyRotation = true;
}

export function rotate(){
	
	if(right) r_new = 0;
	else if(left) r_new = 180;
	else if(up) r_new = 90;
	else if(down) r_new = 270;
	
	
	
	diff = ( r_new - r_finale );
	
	if (diff > 180) diff = -90;
	if (diff < -180) diff = 90;
		
	
	r += (diff * Math.PI) / 180;
	

	var start = {
		
		r : robot.rotation.y,
	}
	
	var end = {
		
		r : r,
	}
	
	if(right) r_finale = 0;
	else if(left) r_finale = 180;
	else if(up) r_finale = 90;
	else if(down) r_finale = 270;
	
	var tween_rotation = new TWEEN.Tween(start)
						.to(end, 100)
						.easing(TWEEN.Easing.Linear.None)
						.onUpdate(function () {
							robot.rotation.y = start.r;
							if(robot_box.rotation.y != (0 * Math.PI) / 180){
								robot_box.rotation.y = (0 * Math.PI) / 180;
							}
							
							
						})
						.start();
						
	robot_box.__dirtyPosition = true;
	robot_box.__dirtyRotation = true;
}

export function battery_animation(){
	
	var start = {
		y : battery.position.y,
	};
	
	var end = {
		y : battery.position.y + 0.25,
	};
	
	var battery_tween = new TWEEN.Tween(start)
				.to(end, time*3)
				.easing(TWEEN.Easing.Linear.None)
				.onUpdate(function () {
					battery_array.forEach( function (item) {
						item.position.y = start.y;
					});
					
				})
				.yoyo(true)
				.repeat(Infinity)
				.start();
}

export function enemy_animation(){
	
	enemy_array.forEach( function (item) {
		
	
	var start = {
			x : item.position.x,
			z : item.position.z,
		};
		
	var end1 = {
		x : item.position.x + 1,
		z : item.position.z,
	};
	
	var end2 = {
		x : item.position.x +1,
		z : item.position.z +1,
	};
	
	var end3 = {
		x : item.position.x,
		z : item.position.z + 1,
	};
	
	var end4 = {
		x : item.position.x,
		z : item.position.z,
	};
	
	var enemy_tween1 = new TWEEN.Tween(start)
			.to(end1, time*3)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(function () {
				
					item.position.x = start.x;
					item.position.z = start.z;
					
					item.rotation.y = (90 * Math.PI) / 180;
					
					item.__dirtyPosition = true;
					item.__dirtyRotation = true;
					
			})
			.onComplete(function() {
				item.rotation.y -= (90 * Math.PI) / 180;
				item.__dirtyRotation = true;
			})
			.start();
	
	var enemy_tween2 = new TWEEN.Tween(start)
			.to(end2, time*3)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(function () {
				
					item.position.x = start.x;
					item.position.z = start.z;
					
					
					
					item.__dirtyPosition = true;
					item.__dirtyRotation = true;
					
					
			})
			.onComplete(function() {
				item.rotation.y -= (90 * Math.PI) / 180;
				item.__dirtyRotation = true;
			});
			
			
	var enemy_tween3 = new TWEEN.Tween(start)
			.to(end3, time*3)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(function () {
				
					item.position.x = start.x;
					item.position.z = start.z;
					
					
					
					item.__dirtyPosition = true;
					item.__dirtyRotation = true;
			})
			.onComplete(function() {
				item.rotation.y -= (90 * Math.PI) / 180;
				item.__dirtyRotation = true;		
		
			});
	

	var enemy_tween4 = new TWEEN.Tween(start)
			.to(end4, time*3)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(function () {
				
					item.position.x = start.x;
					item.position.z = start.z;
					
					
					
					item.__dirtyPosition = true;
					item.__dirtyRotation = true;
		
			});
			
			
	
	item.__dirtyPosition = true;
	item.__dirtyRotation = true;
			
			
	enemy_tween1.chain(enemy_tween2);
			
	enemy_tween2.chain(enemy_tween3);
	
	enemy_tween3.chain(enemy_tween4);
	
	enemy_tween4.chain(enemy_tween1);
	
	
	});
	
}

export function wave(){
	var start = {
		ant : (20 * Math.PI) / 180,
		rot : rotation.rotation.z,
		z: (0 * Math.PI) / 180,
	};
	var end= {
		ant : -(20 * Math.PI) / 180,
		rot : rotation.rotation.z + (90 * Math.PI) / 180,
		z: (55 * Math.PI) / 180,
	};
	var tween = new TWEEN.Tween(start)
				.to(end, time)
				.easing(TWEEN.Easing.Linear.None)
				.onUpdate(function () {
					robot.rotation.y = (270 * Math.PI) / 180;
					
					rotation.rotation.z += (5 * Math.PI) / 180;
					antenna.rotation.z = start.ant;
					lowerArmR.rotation.z = (15 * Math.PI) / 180;
					lowerArmL.rotation.z = -(15 * Math.PI) / 180;
					upperArmR.rotation.z = start.z;
					upperArmL.rotation.z = - start.z;
					
					handR.rotation.x = (130 * Math.PI) / 180;
					handL.rotation.x = (130 * Math.PI) / 180;
					
				})
				.yoyo(true)
				.repeat(Infinity)
				.start();
}