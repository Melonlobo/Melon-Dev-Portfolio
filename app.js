const body = document.querySelector('body');
const title = document.querySelector('.title');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');
const container3 = document.querySelector('.container3');
const contactForm = document.querySelector('#contact-form');

hamburger.addEventListener('click', openCloseNavbar);

function openCloseNavbar() {
	hamburger.firstChild.classList.toggle('bar1');
	hamburger.children[1].classList.toggle('bar2');
	hamburger.lastChild.classList.toggle('bar3');
	hamburger.classList.add('jello');
	navLinks.classList.toggle('active');
}

title.addEventListener('click', (e) => {
	container1.scrollIntoView();
	e.target.classList.add('jello');
});

body.addEventListener('animationend', (e) => {
	e.target.classList.remove('jello');
});

container1.addEventListener('mouseover', (e) => {
	if (e.target.matches('.letter-1')) {
		e.target.classList.add('jello');
	}
});

container1.addEventListener('click', (e) => {
	if (e.target.matches('.projects-btn')) {
		container2.scrollIntoView();
	}
});

container2.addEventListener('mouseover', (e) => {
	if (e.target.matches('.letter-2')) {
		e.target.classList.add('jello');
	}
});

container3.addEventListener('mouseover', (e) => {
	if (e.target.matches('.letter-3')) {
		e.target.classList.add('jello');
	}
});

container3.addEventListener('click', (e) => {
	if (e.target.matches('.form-group button')) {
		e.target.classList.add('jello');
	}
});

const phrases = [
	'I Love to code.',
	'I love building interactive websites.',
	'Code to innovate.',
	'Code to build a better future.',
];
const moreIntroTL = gsap.timeline({ duration: 2, repeat: -1 }).pause();

const timeline = gsap.timeline({ defaults: { duration: 1, opacity: 0 } });
timeline
	.from('header', { y: -50, ease: 'elastic' })
	.from('.nav-links>a', {
		x: '200',
		stagger: 0.3,
		ease: 'power3',
	})
	.from('.title', {
		y: -50,
		ease: 'elastic',
	})
	.from('.letter-1', {
		x: -100,
		rotate: 360,
		stagger: 0.1,
		ease: 'power3',
		onComplete: () => {
			document
				.querySelectorAll('.letter-1')
				.forEach((letter) => letter.classList.add('jello'));
		},
	})
	.from('.welcome', {
		y: -50,
		scale: 0,
		ease: 'elastic',
	})
	.to('.welcome', {
		y: 50,
		opacity: 0,
		delay: 1,
		onComplete: () => {
			document.querySelector('.welcome').remove();
			moreIntroTL.play();
		},
	})
	.from('.caption', {
		y: 10,
		delay: 0.5,
	})
	.from('.cursor', {
		scale: 0,
		ease: 'power2.in',
	})
	.to('.cursor', {
		ease: 'power2.inOut',
		repeat: -1,
	})
	.from('.projects-btn', {
		x: -100,
		ease: 'elastic',
		delay: 10,
	})
	.from('.resume-download-link', {
		x: 100,
		ease: 'elastic',
	});

phrases.forEach((phrase) => {
	const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
	tl.to('.phrases', { duration: 1, text: phrase });
	moreIntroTL.add(tl);
});

const projectsTL = gsap
	.timeline({ defaults: { duration: 1, opacity: 0 } })
	.pause();

projectsTL
	.from('.letter-2', {
		x: -100,
		stagger: 0.1,
		rotate: 360,
		ease: 'power3',
	})
	.from('.card', {
		scale: 2,
		x: -100,
		rotate: -360,
		ease: 'back',
		stagger: 0.2,
		onComplete: () => {
			document
				.querySelectorAll('.letter-2')
				.forEach((letter) => letter.classList.add('jello'));
		},
	});

const contactFormTL = gsap
	.timeline({ defaults: { duration: 1, opacity: 0 } })
	.pause();

contactFormTL
	.from('footer', {
		y: 50,
		ease: 'elastic',
	})
	.from('footer li', {
		x: -100,
		stagger: 0.1,
		ease: 'power3',
	})
	.from('footer a', {
		x: -100,
		y: -50,
		rotation: 180,
		duration: 0.5,
		ease: 'power3',
	})
	.from('.letter-3', {
		x: -100,
		rotate: 360,
		stagger: 0.1,
		ease: 'power3',
	})
	.from('#contact-form input', {
		y: 100,
		stagger: 0.3,
		ease: 'elastic',
	})
	.from('#contact-form textarea', {
		duration: 0.5,
		y: 100,
		ease: 'elastic',
	})
	.from('.form-group button', {
		duration: 0.5,
		y: 100,
		ease: 'elastic',
		onComplete: () => {
			document
				.querySelectorAll('.letter-3')
				.forEach((letter) => letter.classList.add('jello'));
		},
	});

const successTL = gsap
	.timeline({ defaults: { duration: 1, opacity: 0 } })
	.pause();
successTL.from('.success', { scale: 0, ease: 'power1' }).to('.success', {
	opacity: 0,
	delay: 1,
	y: 50,
	onComplete: () => {
		successTL.pause();
		successTL.progress(0);
	},
});

const failureTL = gsap
	.timeline({ defaults: { duration: 1, opacity: 0 } })
	.pause();
failureTL.from('.failure', { scale: 0, ease: 'power1' }).to('.failure', {
	opacity: 0,
	delay: 1,
	y: 50,
	onComplete: () => {
		successTL.pause();
		successTL.progress(0);
	},
});

window.addEventListener('scroll', () => {
	const projectPage = container2.getBoundingClientRect();
	const contactPage = container3.getBoundingClientRect();
	if (projectPage.height - projectPage.bottom <= 1) {
		projectsTL.play();
	} else if (contactPage.height - contactPage.bottom <= 1) {
		contactFormTL.play();
	}
});

contactForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const contactFormData = new FormData(contactForm);
	fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams(contactFormData).toString(),
	})
		.then(() =>
			successTL.play().then(() => {
				contactForm.children[1].value = '';
				contactForm.children[2].value = '';
				contactForm.children[3].value = '';
				contactForm.children[4].value = '';
			})
		)
		.catch(() => failureTL.play());
});
