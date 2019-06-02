/*
	Two's Complement Circle
	by @kvipe 
 */
function twosCompCircle(config){

	let _wordSize = 8,
		_numbersRange,
		_decSignedIntervals,
		_decValue, _decResult,
		_circleValue, _circleResult,
		_binValue,
		_circle = {
			'barClassName': 'circle-bar',
			'decValueSpanClassName': 'dec-value',
			'binValueSpanClassName': 'bin-value',
			'strokeOuterFactor': 21.33,
			'strokeInnerFactor': 25.6,
			'wrapper': undefined,
			'bar': undefined,
			'decValueSpan': undefined,
			'binValueSpan': undefined,
			'positiveColor': '#90ee90',
			'negativeColor': '#ee9090',
			'wordBitsCollection': undefined
		}
	this.getDecSignedIntervals = function(){
		return _decSignedIntervals;
	}
	this.calculate = function(value){
		if(value < _decSignedIntervals.negative.min || value > _decSignedIntervals.positive.max)
			return 'Unavailable value';
		_decResult = _decValue + value;
		_circleResult = dec2circle(_decResult);
		compute();
	
	}
	

	_numbersRange = Math.pow(2, _wordSize);
	_decSignedIntervals = calculateDecSignedIntervals(_numbersRange);

	if(!Number.isInteger(config.initValue) || (config.initValue < _decSignedIntervals.negative.min || config.initValue > _decSignedIntervals.positive.max))
		throw new Error('Initial value is unavailable');
	_decValue = config.initValue;
	_circleValue = dec2circle(_decValue);
	_binValue = dec2bin(_circleValue);

	if(!(_circle.wrapper = document.getElementsByClassName(config.wrapperClassName)[0]))
		throw new Error('There is not the wrapper for circle');
	drawCircle();
	_circle.bar = document.getElementsByClassName(_circle.barClassName)[0];
	_circle.decValueSpan = document.getElementsByClassName(_circle.decValueSpanClassName)[0];
	_circle.binValueSpan = document.getElementsByClassName(_circle.binValueSpanClassName)[0];

	let wordBitsHTML = "";
	for(let i = 0; i < _wordSize; i++){
		wordBitsHTML += '<span class="word-bit"></span>';
	}
	_circle.binValueSpan.innerHTML = wordBitsHTML;
	_circle.wordBitsCollection = document.getElementsByClassName('word-bit');	

	updateCircleBar(_circleValue);
	updateDecValue(_decValue);
	updateBinValue( dec2bin(_circleValue) );

	function addToCircle(){
		if(++_circleValue == _numbersRange)
			_circleValue = 0;
	}
	function addToDec(){
		if(++_decValue > _decSignedIntervals.positive.max)
			_decValue = _decValue - _numbersRange;
	}
	function calculateDecSignedIntervals(numbersRange){
		let interval = numbersRange / 2;
		return {
			'positive':{
				'min': 0,
				'max': interval -1
			},
			'negative':{
				'min': 0 - interval,
				'max': -1
			}
		};
	}
	function compute(){
		(function delayedLoop(){
			if(_circleValue != _circleResult){
				addToDec();
				updateDecValue(_decValue);
				addToCircle();
				updateCircleBar(_circleValue);
				updateBinValue( dec2bin(_circleValue) );	
				setTimeout(delayedLoop, 10);
			}
		})()
	}
	function dec2bin(dec){
		let bin = (dec).toString(2).split("");
		while(bin.length < _wordSize)
			bin.unshift("0");
		bin = bin.join("");
		return bin;
	}
	function dec2circle(dec){
		return dec >= 0 ? dec : _numbersRange - Math.abs(dec);
	}
	function drawCircle(){
		let diameter = _numbersRange / Math.PI,
			strokeOuter = _numbersRange / _circle.strokeOuterFactor,
			strokeInner = _numbersRange / _circle.strokeInnerFactor,
			viewboxSize = diameter + strokeOuter;

		let circleHTML = `<svg viewBox="0 0 ${viewboxSize} ${viewboxSize}">`;
			circleHTML += `<circle class="circle-outer" style="stroke-width: ${strokeOuter}" cx="${viewboxSize/2}" cy="${viewboxSize/2}" r="${diameter/2}"/>`;
			circleHTML += `<circle class="${_circle.barClassName}" style="stroke-width: ${strokeInner}" cx="${viewboxSize/2}" cy="${viewboxSize/2}" r="${diameter/2}"/>`;
			circleHTML += `</svg>`;
		_circle.wrapper.innerHTML += circleHTML;
	}
	function setDecValue(value){
		if(value > _decSignedIntervals.positive.max)
			_decValue = value - _numbersRange;
		else if(value < _decSignedIntervals.negative.min)
			_decValue = _numbersRange - Math.abs(value);
		else
			_decValue = value;
		setCircleValue( dec2circle(_decValue) );
		//
		console.log('Dec: ' + _decValue);
	}
	function updateBinValue(value){
		for(let i = 0; i < value.length; i++){
			_circle.wordBitsCollection[i].innerHTML = value[i];
			if(i == 0){
				_circle.wordBitsCollection[i].style.background = value[0] == '1' ? _circle.negativeColor : _circle.positiveColor;	
			}
		}
	}
	function updateCircleBar(value){
		if(value >= 0 && value < _numbersRange /2)
			_circle.bar.style.stroke = _circle.positiveColor;
		else
			_circle.bar.style.stroke = _circle.negativeColor;
		_circle.bar.style.strokeDasharray = `${value} ${_numbersRange - value}`;
	}
	function updateDecValue(value){
		_circle.decValueSpan.innerHTML = value;
	}
}