import * as THREE from "../three/build/three.module.js";
import * as TWEEN from "../tween/tween.esm.js"
import { Users } from "../Users.js";
export const Avatar = {
    avatars: {},
    init: function (Scene) {
        this.addTextures();
        let group = new THREE.Group();
        let avatar = new THREE.Group();
        let avbodyMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: this.textures[0],
            transparent: true,
            opacity: 0.75,
        });
        let avbodyGeometry = new THREE.CylinderGeometry(1.5, 0.5, 6, 32);
        let avbodyMesh = new THREE.Mesh(avbodyGeometry, avbodyMaterial);
        avbodyMesh.position.y = 4;
        group.add(avbodyMesh);
        let avheadMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.5,
        });
        let avheadGeometry = new THREE.SphereGeometry(1.75, 10, 10);
        //var avheadMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        let avheadSphere = new THREE.Mesh(avheadGeometry, avbodyMaterial);
        avheadSphere.position.y = 10;
        group.add(avheadSphere);
        var aveyeGeometry = new THREE.SphereGeometry(0.7, 10, 10);
        var aveyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var aveyeSphere = new THREE.Mesh(aveyeGeometry, aveyeMaterial);
        aveyeSphere.position.y = 10;
        aveyeSphere.position.z = 1.7;
        aveyeSphere.scale.y = 0.5;
        aveyeSphere.scale.z = 0.25;
        group.add(aveyeSphere);
        var aveye2Geometry = new THREE.SphereGeometry(0.2, 10, 10);
        var aveye2Material = new THREE.MeshBasicMaterial({ color: 0x00000 });
        var aveye2Sphere = new THREE.Mesh(aveye2Geometry, aveye2Material);
        aveye2Sphere.position.y = 10;
        aveye2Sphere.position.z = 1.9;
        //aveyeSphere.scale.y = 0.5;
        aveye2Sphere.scale.z = 0.25;
        group.add(aveye2Sphere);
	group.scale.setScalar(1/14 * 1.75)
        this.avatar = group;
        this.initEvents(Scene);
	this.updatetween()
        return this;
    },
	updatetween: function(){
		TWEEN.update()
		requestAnimationFrame(Avatar.updatetween)
	},
    addTextures: function () {
        let texture1 = new THREE.TextureLoader().load('/img/avTex1.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0.6);
            texture.repeat.set(1, 1);
        });
        let texture2 = new THREE.TextureLoader().load('/img/avTex2.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0.6);
            texture.repeat.set(1, 1);
        });
        let texture3 = new THREE.TextureLoader().load('img/avTex3.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0.6);
            texture.repeat.set(1, 1);
        });
        let texture4 = new THREE.TextureLoader().load('img/avTex4.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0.6);
            texture.repeat.set(1, 1);
        });
        this.textures = [texture1, texture2, texture3, texture4];
    },
    createLabel: function (nickname, avatar) {
        let loader = new THREE.FontLoader();
        loader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
            let textLabel;
            let matDark = new THREE.LineBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5
            });
            var shapes = font.generateShapes(nickname, 2);
            var geometry = new THREE.ShapeBufferGeometry(shapes);
            geometry.computeBoundingBox();
            var xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            geometry.translate(xMid, 0, 0);
            textLabel = new THREE.Mesh(geometry, matDark);
            textLabel.position.x = 0;
            textLabel.position.y = Avatar.offsetNicknameY;
            textLabel.position.z = 0;
            avatar.add(textLabel);
        });
    },
    initEvents: function (Scene, offsetY) {
        window.addEventListener("addUser", function (event) {
            const uuid = event.detail.uuid;
            let nickname = Users[uuid].nickname;
            let pos = Users[uuid].pos;
            let rot = Users[uuid].rot;
            let avt = Avatar.avatar.clone();
            avt.children.forEach(function (ch) {
                ch.material = ch.material.clone();
            });
            Avatar.createLabel(nickname, avt);
            avt.position.set(pos.x, pos.y + Avatar.offsetY, pos.z - 1);
            Scene.scene.add(avt);
            Avatar.avatars[uuid] = avt;
        });
        window.addEventListener("renameUser", function (event) {
            const uuid = event.detail.uuid;
            let nickname = Users[uuid].nickname;
            let avt = Avatar.avatars[uuid];
            avt.children.filter(child => child.geometry.type == "ShapeBufferGeometry").forEach(child => avt.remove(child));
            Avatar.createLabel(nickname, avt);
        });
        window.addEventListener("removeUser", function (event) {
            const uuid = event.detail.uuid;
            let avt = Avatar.avatars[uuid];
            for (let k = 0; k < avt.children.length; k++) {
                avt.remove(avt.children[k]);
            }
            Scene.scene.remove(avt);
            Scene.renderer.renderLists.dispose();
        });
        window.addEventListener("rotateUser", function (event) {
            const uuid = event.detail.uuid;
            let rot = event.detail.rot;
            let avt = Avatar.avatars[uuid];
            avt.rotation.y = -rot.y;
            if (uuid != "me") {
                //avt.children.filter(child => child.geometry.type == "ShapeBufferGeometry").forEach(child => child.lookAt(Scene.camera.position));
            }
        });
        window.addEventListener("moveUser", function (event) {
            const uuid = event.detail.uuid;
            let pos = event.detail.pos;
		//pos.y += Avatar.offsetY
            let avt = Avatar.avatars[uuid];
            let oldPos = {x: avt.position.x, y: avt.position.y, z: avt.position.z}

	    let interp = new TWEEN.Tween(oldPos).to({x: pos.x, y: pos.y + Avatar.offsetY, z: pos.z}, 80);
	    interp.onUpdate(function(p){
		    avt.position.set(p.x, p.y, p.z)
	    });

	    interp.start();

		/*
            let interpolation = setInterval(function () {
                if (k < n) {
                    avt.position.set(oldPos.x + (dx * k), oldPos.y + (dy * k) + Avatar.offsetY, oldPos.z + (dz * k));
                }
                if (k >= n) {
                    avt.position.set(pos.x, pos.y + Avatar.offsetY, pos.z);
                    //avt.children.filter(child => child.geometry.type == "ShapeBufferGeometry").forEach(child => child.lookAt(Scene.camera.position));
                    clearInterval(interpolation);
                }
                k++;
            }, 10);
	    */
        });
        window.addEventListener("changeUser", function (event) {
            let uuid = event.detail.uuid;
            let prop = event.detail.prop;
            let value = event.detail.value;
            if (prop == "avatar") {
                let avt = Avatar.avatars[uuid];
                let texture = Avatar.textures[value];
                avt.children[0].material.map = texture;
                avt.children[1].material.map = texture;
            }
        });
        document.querySelectorAll(".avatar-texture").forEach(function (texture_item) {
            texture_item.addEventListener("click", function (event) {
                let selection = event.target;
                document.querySelectorAll(".avatar-texture").forEach(function (txt) {
                    txt.classList.remove("active");
                });
                if (selection.tagName == "IMG") {
                    selection = selection.parentElement;
                }
                selection.classList.add("active");
                Users.me.avatar = parseInt(selection.getAttribute("texture"));
                let texture = Avatar.textures[parseInt(selection.getAttribute("texture"))];
                let avt = Avatar.avatars["me"];
                avt.children[0].material.map = texture;
            });
        });
    },
    offsetY: -1.7,
    offsetNicknameY: 20,
};
