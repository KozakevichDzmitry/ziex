// ------------Slider
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// --------------Validator
new ValidateForm('form')


// --------------Parallax  scroll
window.addEventListener('scroll', e => {
    let scrollY = this.scrollY;
    let documentClientHeight = document.documentElement.clientHeight;
    document.documentElement.style.setProperty('--scrollTop', `${scrollY}px`)
    if(scrollY- documentClientHeight > 0 ){
        document.documentElement.style.setProperty('--middleIndex', '1')
    }else{
        document.documentElement.style.setProperty('--middleIndex', '0')
    }
})


// --------------Parallax mousemove
var scene = document.getElementById('scene');

new Parallax(scene, {
    relativeInput: true
});