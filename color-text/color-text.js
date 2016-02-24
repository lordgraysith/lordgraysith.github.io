var ColorText = (function(){

	var inputElement
	, outputElement
	, setInputElement
	, setOutputElement
	, setListeners
	, onInputEvent
	, getRandomlyColoredSpan
	, getRandomInt
	, eachLetterEveryKeystroke
	, eachLetterConstant
	, eachWordConstant
	, setMode
	, clearListeners
	, eachWordEveryKeystroke
	, wordIndex = {}
	, constants = {
		expectedInputElementName: '|TEXTAREA|INPUT|'
		, expectedOutputElementName: 'DIV'
		, setInputElementError: 'The input element must be a \'textarea\' or \'input\' element'
		, setOutputElementError: 'The output element must be a \'div\' element'
		, inputEventName: 'keyup'
		, inputDelimiters: /\s|\.|\?|\!|\"|\,/g
	};

	setInputElement = function(inputElementIn){
		if(constants.expectedInputElementName.indexOf('|'+inputElementIn.nodeName.toUpperCase()+'|') < 0){
			throw constants.setInputElementError;
		}
		else{
			clearListeners();
			inputElement = inputElementIn;
			setListeners();
		}
	};

	setOutputElement = function(outputElementIn){
		if(outputElementIn.nodeName.toUpperCase() !== constants.expectedOutputElementName){
			throw constants.setOutputElementError;
		}
		else{
			outputElement = outputElementIn;
			setListeners();
		}
	};

	setListeners = function(){
		if(typeof inputElement === 'object' && typeof outputElement === 'object'){
			inputElement.addEventListener(constants.inputEventName, onInputEvent);
		}
	};

	clearListeners = function(){
		if(typeof inputElement === 'object' && typeof inputElement.removeEventListener === 'function'){
			inputElement.removeEventListener(constants.inputEventName, onInputEvent);
		}
		wordIndex = {};
	};

	getRandomlyColoredSpan = function(value){
		var R_value = getRandomInt(0,255)
		, G_value = getRandomInt(0,255)
		, B_value = getRandomInt(0,255);

		return '<span style="color: rgb('+R_value+','+G_value+','+B_value+')">'+value+'</span>';
	};

	getRandomInt = function(minValue, maxValue){
		var random = Math.random();

		if(typeof minValue !== 'number'){
			minValue = 0;
		}

		if(typeof maxValue !== 'number'){
			maxValue = Number.MAX_VALUE;
		}

		return Math.floor(random * (maxValue + 1)) + minValue;

	};

	eachLetterEveryKeystroke = function(){
		var input
		, character
		, iter
		, output = '';

		input = inputElement.value;
		for(iter = 0; iter < input.length; iter++){
			character = input[iter];
			if(character.charCodeAt(0) === 10){
				output = output + '<br/>';
			}else{
				output = output + getRandomlyColoredSpan(character);
			}
		}
		outputElement.innerHTML = output;
	};

	eachLetterConstant = function(){
		var input
		, character
		, iter
		, output = '';

		input = inputElement.value;
		for(iter = 0; iter < input.length; iter++){
			character = input[iter];
			if(character.charCodeAt(0) === 10){
				output = output + '<br/>';
			}else{
				output = output + (wordIndex[character] || (wordIndex[character] = getRandomlyColoredSpan(character)));
			}
		}
		outputElement.innerHTML = output;
	};

	eachWordEveryKeystroke = function(){
		var input
		, words
		, word
		, iter
		, output = '';

		input = inputElement.value;
		words = input.split(constants.inputDelimiters);

		while(input.length > 0){
			word = words[0];
			if(input.indexOf(word) === 0){
				output = output + getRandomlyColoredSpan(word);
				input = input.slice(word.length);
				words.shift();
			}else if(input.charCodeAt(0) === 10){
				output = output + '<br/>';
				input = input.slice(1);
			}else{
				output = output + getRandomlyColoredSpan(input[0]);
				input = input.slice(1);
			}
		}
		outputElement.innerHTML = output;
	};

	eachWordConstant = function(){
		var input
		, words
		, word
		, iter
		, wordOutput
		, output = '';

		input = inputElement.value;
		words = input.split(constants.inputDelimiters);

		while(input.length > 0){
			word = words[0];
			if(input.indexOf(word) === 0){
				wordOutput = wordIndex[word] || (wordIndex[word] = getRandomlyColoredSpan(word));
				output = output + wordOutput;
				input = input.slice(word.length);
				words.shift();
			}else if(input.charCodeAt(0) === 10){
				output = output + '<br/>';
				input = input.slice(1);
			}else{
				output = output + (wordIndex[input[0]] || (wordIndex[input[0]] = getRandomlyColoredSpan(input[0])));
				input = input.slice(1);
			}
		}
		outputElement.innerHTML = output;
	};

	setMode = function(mode){
		clearListeners();
		if(mode === 'eachLetterEveryKeystroke' || mode === 0){
			onInputEvent = eachLetterEveryKeystroke;
		}
		else if(mode === 'eachWordEveryKeystroke' || mode === 1){
			onInputEvent = eachWordEveryKeystroke
		}
		else if(mode === 'eachLetterConstant' || mode === 1){
			onInputEvent = eachLetterConstant
		}
		else if(mode === 'eachWordConstant' || mode === 2){
			onInputEvent = eachWordConstant
		}else{
			onInputEvent = eachWordConstant;
		}
		setListeners();
	};

	setMode();

	return {
		setOutputElement: setOutputElement
		, setInputElement: setInputElement
		, setMode: setMode
	};
})();

//nothing