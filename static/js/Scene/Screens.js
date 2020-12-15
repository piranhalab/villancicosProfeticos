export const addScreens = function(Scene){
	window.addEventListener("startStream",function(event){
		console.debug("aaaaa ",event)
		
		//let screens = Scene.children.filter(x => x.material.name.startsWith("Screen"))
		let screens = [Scene.zordon, ]

		console.debug("screens", screens)

		let flvPlayer = flvjs.createPlayer({
		    type: "flv",
		    isLive: true,
		    url: "https://piranhalab.cc/live/navidad_trans/live"
		});
		flvPlayer.attachMediaElement(document.querySelector('#streaming'));
		flvPlayer.load();
		flvPlayer.play();


		flvPlayer.on('error', function (err) {
		    if (err === "NetworkError") {
			flvPlayer.unload();
			flvPlayer.load();
			flvPlayer.play();
		    }
		});


		screens.forEach(x=>{
			//x.material.map = new THREE.VideoTexture(document.querySelector('#streaming'))
			x.material = new THREE.MeshStandardMaterial({
				map: new THREE.VideoTexture(document.querySelector("#streaming")),
				name: "Screen"
			})
			x.material.map.wrapS = x.material.map.wrapT = THREE.RepeatWrapping;

		
		})
		

		// 0 -> hasta arriba
		// 1 -> laterales
		// 2 ->  fuente
		// 3 -> junto a nivel 2

		/*
		let id = event.detail.id
		screens.forEach( screen => {
			screen.material = new THREE.MeshStandardMaterial({
				map: new THREE.VideoTexture(document.querySelector(`#${id}`)),
				name: "screen"
			})
			screen.material.map.wrapS = THREE.MirroredRepeatWrapping
			screen.material.map.wrapT = THREE.MirroredRepeatWrapping
			screen.material.map.flipY = false
		})
		*/
		
	})
}
