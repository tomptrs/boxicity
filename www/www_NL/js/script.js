const slideshow = new Siema({
	selector: '.slideshow',
	duration: 1000,
	easing: 'ease-in-out',
	loop: true
});
document.querySelector('#prev').addEventListener('click', () => slideshow.prev());
document.querySelector('#next').addEventListener('click', () => slideshow.next());

setInterval(function() {
	slideshow.next();
}, 5000);