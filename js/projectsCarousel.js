/* ------------------------------------------------- Load carousel ------------------------------------------------- */
let carouselItems = [
                        {"carouselImagePath": "Logo_Wit.png", "carouselLink": "https://globalearthfood.eu/"},
                        {"carouselImagePath": "PraatjesEnPlaatjesLogo.png", "carouselLink": false}
                        
                    ];


function loadCarousel()
{
    for (let i = 0; i < carouselItems.length; i++)
    {
        $("#carouselContainer").append(`
            <div class="item" id="${"carouselItem" + i}" style="transform: rotateY(${i * (360 / carouselItems.length)}deg) translateZ(250px); transition-duration: 0.3s;">
                <img id="openCarouselModal${i}" style="max-height:100%; max-width:100%" src="${carouselItems[i].carouselImagePath}" />
            </div>
        `);
    }

    for (let i = 0; i < carouselItems.length; i++)
    {
        $("#carouselItem" + i).click(function ()
        {
            if (carouselItems[i].carouselLink)
            {
                window.open(carouselItems[i].carouselLink);
            }
        });
        $("#carouselItem" + i).hover(function ()
        {
            this.style.transform = `rotateY(${i * (360 / carouselItems.length)}deg) translateZ(260px)`;
        }, function ()
        {
            this.style.transform = `rotateY(${i * (360 / carouselItems.length)}deg) translateZ(250px)`;
        });
    }
}

loadCarousel();


/* Carousel turning. */
let carousel     = $(".carousel");
let currdeg      = 0;
let turnFunction = null;

rotate(-1);


// $(".carouselContainer").hover(
// function ()
// {
//     rotate(-1);
// },
// function ()
// {
//     clearInterval(turnFunction);
// });
// $(".carouselContainer").click(
// function ()
// {
//     clearInterval(turnFunction);
// });


function rotate(direction)
{
    turnFunction = setInterval(function ()
    {
        if (direction == -1)
        {
            currdeg -= 1;
        }
        if (direction == 1)
        {
            currdeg += 1;
        }
        carousel.css({
            "-webkit-transform": "rotateY(" + currdeg + "deg)",
            "-moz-transform": "rotateY(" + currdeg + "deg)",
            "-o-transform": "rotateY(" + currdeg + "deg)",
            transform: "rotateY(" + currdeg + "deg)"
        });
    }, 100);
}