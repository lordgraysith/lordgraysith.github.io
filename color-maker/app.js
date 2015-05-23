(function(){
	var colorBox,
		redSlider,
		greenSlider,
		blueSlider,
		result;

	colorBox = document.getElementById('color-box');
	redSlider = document.getElementById('red');
	greenSlider = document.getElementById('green');
	blueSlider = document.getElementById('blue');
	result = document.getElementById('result');

	redSlider.onchange = sliderChange;
	blueSlider.onchange = sliderChange;
	greenSlider.onchange = sliderChange;
	redSlider.oninput = sliderChange;
	blueSlider.oninput = sliderChange;
	greenSlider.oninput = sliderChange;


	if(window.location.hash){
		parseHash();
	}

	function sliderChange(){
		var red,
			green,
			blue;

		red = redSlider.value;
		green = greenSlider.value;
		blue = blueSlider.value;

		colorBox.style.setProperty('background-color','rgb('+red+','+green+','+blue+')');
		result.innerHTML = 'rgb('+red+','+green+','+blue+')';
		window.location.hash = red+','+green+','+blue;
	}

	function parseHash(){
		var rgb = window.location.hash.slice(1).split(',');
		redSlider.value = rgb[0];
		greenSlider.value = rgb[1];
		blueSlider.value = rgb[2];
		sliderChange();
	}
})();