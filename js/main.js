"use strict";
document.addEventListener('DOMContentLoaded', function () {
	//==================Animated Dev Tools==================
	const devLogos = document.querySelectorAll('.dev-tool');

	function logo(p) {
		devLogos.forEach(item => {
			item.addEventListener('mouseover', function () {
				item.classList.add('zoom');
			});
			item.addEventListener('mouseleave', function () {
				item.classList.remove('zoom');
			});
		});
	}
	logo();
	//=========================Form=========================
	const form = document.querySelector('#form');
	form.addEventListener('submit', formSend);
	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form);
		let formData = new FormData(form);
		if (error === 0) {
			form.parentElement.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.parentElement.classList.remove('_sending');
			} else {
				alert('Errorrr');
				form.parentElement.classList.remove('_sending');
			}
		} else {
			alert('Заполните все поля');
		}
	}
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);//!
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	//Вспомогательные ф-ии,добавляющие/удаляющее класс _error
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}


	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

});
