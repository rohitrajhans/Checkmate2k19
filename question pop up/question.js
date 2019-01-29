var ques = document.getElementById('Ques');
var cross = document.getElementById('Notnot');
var background = document.getElementById('bgrd');
var i;



document.addEventListener('keydown', function abc(event) {
	if (event.keyCode == 73 ) {//press i for question
		
		bgrd.className += ' modalBackground';
		ques.className += ' questionBox';
		console.log(123);
		function typeEffect(element, speed) {
		var text = $(element).text();
		$(element).html('');
		i = 0;
		var timer = setInterval(function() {
						if (i < text.length) {
							$(element).append(text.charAt(i));
							i++;
						} else {
							clearInterval(timer);
						}
					}, speed);
		}

	$( document ).ready(function() {
		var speed = 30;
		var delay = $('h1').text().length * speed + speed;
		typeEffect($('h1'), speed);
		setTimeout(function(){
		$('p').css('display', 'inline-block');
		typeEffect($('p'), speed);
		}, delay);
		});
	}});

	cross.addEventListener('click', function bcd(event) {//close the pop-up
	ques.className = 'hideBox ';
	bgrd.className = 'hideBox '; 
	});
