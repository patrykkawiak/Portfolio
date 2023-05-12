// nav

const burger = document.querySelector('.mobile__burger');
const mobileMenu = document.querySelector('.mobile__menu');
const navLinks = document.querySelectorAll('.mobile__menu--link');

const handleNav = () => {
	mobileMenu.classList.toggle('active-nav');
	burger.classList.toggle('active-burger');
};

const handleCloseNav = () => {
	mobileMenu.classList.remove('active-nav');
	burger.classList.remove('active-burger');
};

navLinks.forEach((link) => link.addEventListener('click', handleCloseNav));
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
				projects[n].classList.remove('active');
				projects[n + 1].classList.add('active');
				dotsArr[n].classList.remove('active-dot');
				dotsArr[n + 1].classList.add('active-dot');
				projects[n + 1].classList.add('animation');
				n++;
			}, speed);
		}
	} else if (n == projects.length - 1) {
		return;
	}
};
const prevSlide = () => {
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

const sendBtn = document.querySelector('.send-btn');
const sendMail = (e) => {
	e.preventDefault();
	const title = document.querySelector('.title').value;
	const message = document.querySelector('.message').value;
	const name = document.querySelector('.name').value;
	if (title === '' || message === '' || name === '') {
		console.log('siema');
	} else {
		window.location.href = `mailto:patryk.kawiak@icloud.com?subject=${title}&body=${message}, Pozdrawiam 
		${name}`;
	}
};

// scroll
const revalSection = document.querySelectorAll('.reval-section');

const handleFirstReval = () => {
	const revalSection = document.querySelector('.reval-section');

	if (revalSection.offsetTop - window.scrollY < window.innerHeight - 150) {
		revalSection.classList.add('reval');
		setTimeout(writingAnimation, 500);
	}
};
const handleSecondReval = () => {
	setTimeout(() => {
		revalSection[1].classList.add('reval');
	}, 1000);
};
const handleReval = () => {
	revalSection.forEach((sec) => {
		if (sec.offsetTop - window.scrollY < window.innerHeight - 150) {
			sec.classList.add('reval');
		}
	});
};

// typing
const text = document.querySelector('.typing-text');
const typingBar = document.querySelector('.typing-bar');
let inputValue = 'Front End Developer';
let timeout;
let index = 1;
let aniSpeed = 90;

const writingAnimation = () => {
	text.innerHTML = inputValue.slice(0, index);
	index++;
	if (index > inputValue.length) return;
	timeout = setTimeout(writingAnimation, aniSpeed);
};

const barAnimation = () => {
	typingBar.style.opacity = 0;
	setTimeout(() => {
		typingBar.style.opacity = 1;
	}, 500);
};

// button eff
const animatedBtn = document.querySelectorAll('.animated-btn');

const effect = (e) => {
	const rect = e.target.getBoundingClientRect();

	const x = e.target.offsetWidth - (e.clientX - rect.left);
	const y = e.target.offsetHeight - (e.clientY - rect.top);

	e.target.style.setProperty('--mouse-x', `${x}px`);
	e.target.style.setProperty('--mouse-y', `${y}px`);
};

animatedBtn.forEach((btn) => btn.addEventListener('mousemove', effect));

// animated img

const image = document.querySelector('.image');

const rotatingImg = (e) => {
	if (e.target.classList.contains('reset-pos')) {
		e.target.classList.remove('reset-pos');
	}

	e.target.classList.add('add-pos');

	let x;
	let y;
	x = e.offsetX;
	y = e.offsetY;

	const middleX = e.target.offsetWidth / 2;
	const middleY = e.target.offsetHeight / 2;

	const finalX = (middleX - x) / 10;
	const finalY = (middleY - y) / 10;

	e.target.style.setProperty('--transform-y', `${Math.floor(finalX)}deg`);
	e.target.style.setProperty('--transform-x', `${Math.floor(finalY)}deg`);
};

image.addEventListener('mousemove', rotatingImg);
image.addEventListener('mouseout', (e) => {
	e.target.classList.add('reset-pos');
	e.target.classList.remove('add-pos');
});

setInterval(barAnimation, 1000);

window.addEventListener('scroll', handleReval);
window.addEventListener('DOMContentLoaded', handleFirstReval);
window.addEventListener('DOMContentLoaded', handleSecondReval);

sendBtn.addEventListener('click', sendMail);
document.addEventListener('DOMContentLoaded', createAllDots);
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
