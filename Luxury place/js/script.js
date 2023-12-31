//======================= rooms slider ============================

const images = document.querySelectorAll('.slider__element')
const sliderLine = document.querySelector('.slider__block')

let count = 0
let width

document.getElementById('slider_button_' + count).classList.add('current')


function init() {
    width = document.querySelector('.slider__window').offsetWidth
    sliderLine.style.width = width * images.length + 'px'
    images.forEach(item => {
        item.style.width = width + 'px'
        item.style.height = 'auto'
    })
    rollSlider()
}

window.addEventListener('resize', init)
init()

const dots = document.querySelectorAll('.slider__dot')

function interval(e) {



    return setInterval(() => {
        document.getElementById('slider_button_' + count).classList.remove('current')
        count++
        if (count > images.length - 1) count = 0
        document.getElementById('slider_button_' + count).classList.add('current')
        rollSlider()
    }, 7000);
}

let intervalId = interval()

dots.forEach(item => {
    item.addEventListener('click', () => {
        clearInterval(intervalId)
        document.getElementById('slider_button_' + count).classList.remove('current')
        count = +(item.id.match(/\d+/))
        document.getElementById('slider_button_' + count).classList.add('current')
        rollSlider()
        intervalId = interval()
    })
})

function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)'
}

//======================= testimotionals slider ============================

const imagesTesti = document.querySelectorAll('.testimotionals__element')
const sliderLineTesti = document.querySelector('.testimotionals__block')
const testiLeft = document.getElementById('testi-left')
const testiRight = document.getElementById('testi-right')

let countTesti = 0
let widthTesti


function initTesti() {
    widthTesti = document.querySelector('.testimotionals__window').offsetWidth
    sliderLineTesti.style.width = widthTesti * imagesTesti.length + 'px'
    imagesTesti.forEach(item => {
        item.style.width = widthTesti + 'px'
        item.style.height = 'auto'
    })
}

window.addEventListener('resize', initTesti)
initTesti()


function intervalTesti() {
    return setInterval(() => {
        countTesti++
        if (countTesti > imagesTesti.length - 1) countTesti = 0
        rollSliderTesti()
    }, 7000);
}

let intervalTestiId = intervalTesti()

function rollSliderTesti() {
    sliderLineTesti.style.transform = 'translate(-' + countTesti * widthTesti + 'px)'
}

testiLeft.addEventListener('click', () => {
    clearInterval(intervalTestiId)
    countTesti--
    if (countTesti < 0) countTesti = imagesTesti.length - 1
    rollSliderTesti()
    intervalTestiId = intervalTesti()
})

testiRight.addEventListener('click', () => {
    clearInterval(intervalTestiId)
    countTesti++
    if (countTesti > imagesTesti.length - 1) countTesti = 0
    rollSliderTesti()
    intervalTestiId = intervalTesti()
})

//======================= fullscreen ============================



let fullscreenArrowRight = document.getElementById('fullscreen_arrow_right');
let fullscreenArrowLeft = document.getElementById('fullscreen_arrow_left');
let fullscreenImageCurrent = 0
let wholeFullscreenImageCurrent = document.querySelectorAll('.fullscreen__elem img[id*="fullscreen_img"]').length

document.getElementById(`fullscreen_img_` + fullscreenImageCurrent).classList.add('current')
let fullscreenInterval = setInterval(nextFullScreenImage, 7000);

const first_word = ['pretty', 'elite', 'best', 'comfortable']
const second_word = ['home', 'ground', 'forest', 'pool']
const preTitle = document.querySelector('.fullscreen__pre-title')
// const title = document.querySelector('.fullscreen__title')
const textElement = document.querySelector('.fullscreen__text')

// названия стрелок походу перепутались, сейчас всё нормально
fullscreenArrowLeft.addEventListener('click', nextFullScreenImage)
fullscreenArrowRight.addEventListener('click', prevFullScreenImage)

nextFullScreenImage()
prevFullScreenImage()

function nextFullScreenImage() {
    clearInterval(fullscreenInterval)
    document.getElementById(`fullscreen_img_` + fullscreenImageCurrent).classList.remove('current')
    fullscreenImageCurrent++
    if (fullscreenImageCurrent > wholeFullscreenImageCurrent - 1) fullscreenImageCurrent = 0
    document.getElementById(`fullscreen_img_` + fullscreenImageCurrent).classList.add('current')
    //=======================  ============================
    preTitle.classList.add('dissapeared')
    // title.classList.add('dissapeared')
    setTimeout(() => {
        preTitle.textContent = first_word[Math.floor(Math.random() * wholeFullscreenImageCurrent)] + ' ' + second_word[Math.floor(Math.random() * wholeFullscreenImageCurrent)]
        preTitle.classList.remove('dissapeared')
        $('#example').show();
        $('#example').animate_Text();
    }, 700);

    // setTimeout(() => {
    //     title.classList.remove('dissapeared')
    //     $('#example2').show();
    //     $('#example2').animate_Text();
    // }, 1500);

    //=======================  ============================
    fullscreenInterval = setInterval(nextFullScreenImage, 7000);
}

function prevFullScreenImage() {
    clearInterval(fullscreenInterval)
    document.getElementById(`fullscreen_img_` + fullscreenImageCurrent).classList.remove('current')
    fullscreenImageCurrent--
    if (fullscreenImageCurrent < 0) fullscreenImageCurrent = wholeFullscreenImageCurrent - 1
    document.getElementById(`fullscreen_img_` + fullscreenImageCurrent).classList.add('current')
    fullscreenInterval = setInterval(nextFullScreenImage, 7000);
    preTitle.classList.add('dissapeared')
    setTimeout(() => {
        preTitle.textContent = first_word[Math.floor(Math.random() * wholeFullscreenImageCurrent)] + ' ' + second_word[Math.floor(Math.random() * wholeFullscreenImageCurrent)]
        preTitle.classList.remove('dissapeared')
        $('#example').show();
        $('#example').animate_Text();
    }, 700);
}


//======================= animation function ============================

$(document).ready(function () {
    $.fn.animate_Text = function () {
        var string = this.text();
        return this.each(function () {
            var $this = $(this);
            $this.html(string.replace(/./g, '<span class="new">$&</span>'));
            $this.find('span.new').each(function (i, el) {
                setTimeout(function () { $(el).addClass('div_opacity'); }, 30 * i);
            });
        });
    };
    $('#example').show();
    $('#example').animate_Text();
    $('#example2').show();
    $('#example2').animate_Text();
});

//======================= animated anchors ============================

$('a.scrollto').on('click', function (event) {
    let $anchor = $(this)
    $('html, body')
        .stop()
        .animate(
            {
                scrollTop: $($anchor.attr('href')).offset().top - 40,
            },
            {
                duration: 800,
                speacialEasing: {
                    width: 'linear',
                    height: 'easeInOutCubic',
                },
            }
        )
    event.preventDefault()
})

//======================= scroll up button ============================

document.getElementById('arrowUp').classList.add('dissapeared')

window.addEventListener('scroll', function () {
    if (window.pageYOffset >= (document.querySelector('.fullscreen').scrollHeight / 2)) (document.getElementById('arrowUp').classList.remove('dissapeared'))
    else (document.getElementById('arrowUp').classList.add('dissapeared'))
});

//======================= burger_appear button ============================

const burgerButton = document.getElementById('burger_button')
const burgerMenu = document.querySelector('.header__menu')
const burgerLink = document.querySelectorAll('.burger-link')

burgerButton.addEventListener('click', (e) => {
    if (burgerMenu.classList.contains('display-none')) {
        burgerMenu.classList.remove('display-none')
        setTimeout(() => {
            burgerMenu.classList.toggle('active')
        }, 1);
    }
    else {
        burgerMenu.classList.toggle('active')
        setTimeout(() => {
            burgerMenu.classList.add('display-none')
        }, 300);
    }
})

burgerLink.forEach(element => {
    element.addEventListener('click', (e) => {
        burgerMenu.classList.toggle('active')
        if (burgerMenu.classList.contains('display-none')) {
            burgerMenu.classList.remove('display-none')
        }
        else {
            setTimeout(() => {
                burgerMenu.classList.add('display-none')
            }, 300);
        }
    })
});

//======================= hover для мобильных устройств ============================

$(document).ready(function () {
    $('.hover').on('touchstart touchend', function (e) {
        e.preventDefault()
        $(this).toggleClass('hover_effect');
    });
});