	var ques = document.getElementById('Ques');
	var cross = document.getElementById('Notnot');
		document.addEventListener('keydown', function abc(event) {
				if (event.keyCode == 73 ) {//press i for question
   					ques.className += ' questionBox';
					}
		});
		cross.addEventListener('click', function bcd(event) {//close the pop-up
   					ques.className = 'hideBox';
		});