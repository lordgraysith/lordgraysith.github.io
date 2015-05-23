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

	function sliderChange(){
		var red,
			green,
			blue;

		red = redSlider.value;
		green = greenSlider.value;
		blue = blueSlider.value;

		colorBox.style.setProperty('background-color','rgb('+red+','+green+','+blue+')');
		result.innerHTML = 'rgb('+red+','+green+','+blue+')';
	}
})();