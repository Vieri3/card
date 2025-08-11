$(document).ready(function () { //start jQuery

    let CELLS, COLUMNS, COUNT;

    // функция создания игрового поля
    function getCardOnField() {
        $('.wrap').html('');
        $('.stars').html('');
        $('.steps').html('<p>Step: <span>0</span></p>');
        $('.wrap').css({ "grid-template-columns": `repeat(${COLUMNS}, 1fr)` });
        for (let i = 1; i <= CELLS / 2; i++) {
            $('.wrap').append(`<div class="card"><div class="front"></div><div class="pic-${i} back"></div></div>
                                <div class="card"><div class="front"></div><div class="pic-${i} back"></div></div>`
            );
        }
    }

    // функция перемешивания карточек
    function shuffleCard() {
        let cards = $('.card');
        cards.sort(function () {
            return Math.random() - 0.5;
        });
        $('.wrap').html(cards);
    }

    // функция вывода рейтинга и победного окна
    function getStarsRating(){         
        let getStars_3 = CELLS/2 + 2; 
        let getStars_2 = CELLS/2 + 5;
        let getStars_1 = CELLS/2 + 10;
        const activeStar = '<span class="star-active">&#9733;</span>';
        const star = '<span class="star">&#9734;</span>';
        if (COUNT <= getStars_3){
            $('.stars').html(activeStar + activeStar + activeStar);
        }else if (COUNT <= getStars_2){
            $('.stars').html(activeStar + activeStar + star);
        }else if(COUNT <= getStars_1){
            $('.stars').html(activeStar + star + star);
        }else{
            $('.stars').html(star + star + star);
        }
    }

    // функция управления игрой
    function getManagementGame() {

        let clicks = [];

        // клик по card
        $('.card').click(function () {

            clicks.push($(this).children('.back').attr('class'));
            $(this).children('.front').addClass('front-click');
            $(this).children('.back').addClass('back-click');

            if (clicks.length == 2) {
                $('.wrap').addClass('display-no-click');
                setTimeout(function () {
                    if (clicks[0] != clicks[1]) {
                        $('.front').removeClass('front-click');
                        $('.back').removeClass('back-click');
                    }
                    if (clicks[0] == clicks[1]) {
                        // получение первого класса 
                        let cardChildColorClass = clicks[0].split(" ")[0];
                        // родители всех элементов с классом 
                        let cardParent = $(`.${cardChildColorClass}`).closest('.card');
                        // плавное исчезновение
                        cardParent.animate({ opacity: 0 }, 2000)
                        // удаляем класс и ставим другой чтобы было не кликабельным и не ломало верстку
                        cardParent.removeClass('card').addClass('card-no-click');
                    }
                    clicks = [];
                    COUNT++;
                    document.querySelector('.steps span').innerText = COUNT;
                    $('.wrap').removeClass('display-no-click');
                    // победная табличка + рейтинговые звезды
                    if($('.card').length == 0){
                       getStarsRating();
                    }
                }, 1500);
            }
        });
    }

    // функция запуска игры
    function startGame(cells, columns){
        // устанавливает размеры поля
        CELLS = cells;
        COLUMNS = columns;
        COUNT = 0;
        getCardOnField();
        shuffleCard();
        getManagementGame();
    }

    // кнопки выбора игры
    //2*2
    $('.btn').eq(0).click(function () {
        startGame(4, 2);
    })
    //4*2
    $('.btn').eq(1).click(function () {
        startGame(8, 4);
    })
    //4*3
    $('.btn').eq(2).click(function () {
        startGame(12, 4);
    })
    //4*4
    $('.btn').eq(3).click(function () {
        startGame(16, 4);
    })
    //6*4
    $('.btn').eq(4).click(function () {
        startGame(24, 6);
    })
    //6*6
    $('.btn').eq(5).click(function () {
        startGame(36, 6);
    })


})// end jQuery

