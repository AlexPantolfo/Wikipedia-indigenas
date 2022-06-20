// wikipedia indígenas

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

var Header = {

	mainImages: [
		'https://img.freepik.com/fotos-gratis/retrato-do-indio-americano-em-pe-contra-a-floresta_35752-1789.jpg?w=2000',
		'https://mega.ibxk.com.br///2016/06/30/30095831052046.jpg?ims=1200x480',
		// 'https://conexaoenergetica.com.br/wp-content/uploads/2013/10/Indios-do-Brasil-1200x520.jpg'
	],

	init: () => {
		Header.mainImage();
	},

	mainImage: () => {
		document.getElementById('main-image').style.backgroundImage = `url('${Header.mainImages[random(0, 2)]}')`;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	Header.init();
});





