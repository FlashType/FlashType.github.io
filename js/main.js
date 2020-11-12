document.addEventListener('DOMContentLoaded', () => {
	function burger() {
		document.querySelector('.menu-header__icon').addEventListener('click', () => {
			document.querySelector('.menu-header__icon').classList.toggle('active');
			document.querySelector('.menu-header__menu').classList.toggle('active');
			document.body.classList.toggle('lock');
		})
	}
	burger();

	// let tab = $('.tab-item');
	// tab.on('click', function (event) {
	// 	// $('.tab-item').click(function(event){
	// 	$('.tab-content').removeClass('active');
	// 	$('.tab-content[data-tab-name=' + $(this).attr('data-tab-name') + ']').toggleClass('active');

	// });
	//===============TABS===============
	function tab() {


		let tabHead = document.querySelectorAll('.tab-item'),
			tabContent = document.querySelectorAll('.tab-content'),
			tabName;
		tabHead.forEach(item => { item.addEventListener('click', selectTabNav) });
		function selectTabNav() {
			tabHead.forEach(item => {
				item.classList.remove('active');
			});
			this.classList.add('active');
			tabName = this.getAttribute('data-tab-name');
			console.log(tabName);

			selectTabContent(tabName);
		}
		function selectTabContent(tabName) {		
			tabContent.forEach(item => {
				console.log(item.getAttribute('data-tab-name'));
				if (item.classList.contains(tabName)) {
					console.log('yes');
					item.classList.add('active');
				} else {
					item.classList.remove('active');
					console.log('no');
				}
			});
		}
	}
	tab();
	//================IBG================
	const ibg = () => {
		const bg = document.querySelectorAll('.ibg');
		for (let i = 0; i < bg.length; i++) {
			if (bg[i].querySelector('img')) {
				bg[i].style.backgroundImage = `url(${bg[i].querySelector('img').getAttribute('src')})`;
			}
		}
	};
	ibg();

});
