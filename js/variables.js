var clock;
var delta;

var container;

/*var difficulty;

if(sessionStorage.getItem("difficulty") == "easy") {
	difficulty = easy;
}
*/

const data = new Date();
var inizio;
var fine;
var tempo;

var orbitControls = false;

var inputDisabled = false;

var gltfLoader;

var loadManager;
var textureLoader;

var ground_material;
var ground1;
var ground2;

var renderer;
var scene;
var camera;
var controls;
var ambientLight;
var dirLight;

var robot_url = "models/robot/source/model.gltf";
var battery_url = "models/battery/scene.gltf";
var radio_url = "models/radio/scene.gltf";
var enemy_url = "models/enemy_robot/scene.gltf";

var robotX = -14;
var robotY = 0;
var robotZ = 16;


//ROBOT Components
var robot;
var robot_box;
var upper_robot_box;
var root;
var head;
var neck;
var torso;
var rotation;
var antenna;
var upperArmR;
var lowerArmR;
var upperArmL;
var lowerArmL;

var upperLegR;
var lowerLegR;
var upperLegL;
var lowerLegL;

var handR;
var handL;

var pinkyR ;
var pinkyL;

var pinkytipR;
var pinkytipR;

var thumbR;
var thumbL;
var thumbtipR;
var thumbtipL;


var footR;
var footL;
var model;

var battery;
var radio;
var enemy;


var right = false;
var left = false;
var up = false;
var down = false;


var position;
var collided = false;
var collision_direction;
var direction;

var flag = true;

var running = false;
var stop_animation = false;


//Tweens
var tween_move;
var tween_run_end;
var tween_run_middle;
var tween_stop;

var time = 300;
var step = 0.05;


var randomStepX = 0;
var randomStepZ = 0;

var enemy_tween;

var battery_box;

var battery_array = [];

var enemy_box;

var enemy_array = [];

const robot_parts = {
	Root: "body",
	
	Head: "head",
	
	Neck: "neck",
	
	Antenna: "antena",
	Torso: "torso",
	
	Rotation: "rotation",
	
	UpperArmR: "right_arm",
	UpperArmL: "left_arm",
	LowerArmR: "right_elbow",
	LowerArmL: "left_elbow",
	
	UpperLegR: "right_leg",
	UpperLegL: "left_leg",
	LowerLegR: "right_knee",
	LowerLegL: "left_knee",
	
	HandR:"right_hand",
	HandL:"left_hand",
	
	FootR:"right_foot",
	FootL:"left_foot",

};