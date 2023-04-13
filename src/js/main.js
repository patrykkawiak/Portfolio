// nav

const burger = document.querySelector('.mobile__burger');
const mobileMenu = document.querySelector('.mobile__menu');

const handleNav = () => {
	mobileMenu.classList.toggle('active-nav');
};

burger.addEventListener('click', handleNav);

// slider

const sliderBtn = document.querySelector('.slider-item');
const sliderText = document.querySelector('.slider-text');

const handleSlider = () => {
	sliderText.classList.toggle('active');
};

sliderBtn.addEventListener('click', handleSlider);

// carousel

const prevBtn = document.querySelector('.prev');

const nextBtn = document.querySelector('.next');

const projects = document.querySelectorAll('.project-item');
const dots = document.querySelector('.dots');
const dotsArr = [];

let n = 0;
let speed = 300;

const createAllDots = () => {
	for (let item = 0; item < projects.length; item++) {
		const newDot = document.createElement('div');
		newDot.classList.add('dot');
		dots.append(newDot);
		dotsArr.push(newDot);
	}
	dotsArr[0].classList.add('active-dot');
};

const nextSlide = () => {
	if (n < projects.length - 1) {
		if (projects[n].classList.contains('active')) {
			projects[n].classList.add('animation-rev');
			setTimeout(() => {
				projects[n].classList.remove('animation-rev');
				dotsArr[n].classList.remove('active-dot');
				dotsArr[n + 1].classList.add('active-dot');
				projects[n + 1].classList.add('active');
				projects[n].classList.remove('active');
				projects[n + 1].classList.add('animation');
				n++;
			}, speed);
		}
	} else if (n == projects.length - 1) {
		return;
	}
};
const prevSlide = () => {
	console.log(n);
	if (n > 0) {
		if (projects[n].classList.contains('active')) {
			projects[n].classList.add('animation-rev');
			setTimeout(() => {
				projects[n].classList.remove('animation-rev');
				projects[n].classList.remove('active');
				projects[n - 1].classList.add('active');
				dotsArr[n].classList.remove('active-dot');
				dotsArr[n - 1].classList.add('active-dot');
				projects[n - 1].classList.add('animation');
				n--;
			}, speed);
		}
	} else if (n == 0) {
		return;
	}
};

// mail
const sendBtn = document.querySelector('.send-btn');

const sendMail = () => {
	const title = document.querySelector('.title').value;
	const message = document.querySelector('.message').value;
	const name = document.querySelector('.name').value;
	window.location.href = `mailto:patryk.kawiak@icloud.com?subject=${title}&body=${message}, 
	${name}`;
};

// scroll
const revalSection = document.querySelectorAll('.reval-section');

const handleFirstReval = () => {
	const revalSection = document.querySelector('.reval-section');

	if (revalSection.offsetTop - window.scrollY < window.innerHeight - 150) {
		revalSection.classList.add('reval');
	}
};
const handleSecondReval = () => {

		setTimeout( ()=> {
			revalSection[1].classList.add('reval');
		},400)
	
};
const handleReval = () => {
	revalSection.forEach((sec) => {
		if (sec.offsetTop - window.scrollY < window.innerHeight - 150) {
			sec.classList.add('reval');
		}
	});
};

window.addEventListener('scroll', handleReval);
window.addEventListener('DOMContentLoaded', handleFirstReval);
window.addEventListener('DOMContentLoaded', handleSecondReval);

sendBtn.addEventListener('click', sendMail);
document.addEventListener('DOMContentLoaded', createAllDots);
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
