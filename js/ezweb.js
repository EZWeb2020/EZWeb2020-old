/**
 * Accepts html for content of modal.
 */
async function openModal(htmlModalContent)
{
    $("#leftBar").show();
    $("#rightBar").show();
    $("#topBar").show();
    $("#bottomBar").show();

    $("#modalContent").html(htmlModalContent);

    $("#leftBar").animate(
        {
            "height": "50%"
        },
        500,
        function ()
        {
            $("#bottomBar").animate({"width": "50%"}, 500, function () {});
        }
    );
    $("#topBar").animate(
        {
            "width": "50%"
        },
        500,
        function ()
        {
            $("#rightBar").animate(
                {
                    "height": "50%"
                },
                500,
                function ()
                {
                    $("#myModal").fadeIn(1000, function ()
                    {
                        $("#leftBar").fadeOut("slow",   function () { $("#leftBar").css("height", "0px"); });
                        $("#rightBar").fadeOut("slow",  function () { $("#rightBar").css("height", "0px"); });
                        $("#topBar").fadeOut("slow",    function () { $("#topBar").css("width", "0px"); });
                        $("#bottomBar").fadeOut("slow", function () { $("#bottomBar").css("width", "0px"); });
                    });
                }
            );
        }
    );
}


// $("#contactBtn").click(function ()
// {
//     openModal(`

//     <div style="text-align: center;">

//             Telefoonnummer: +31 6 16284091
//         </div>

//     `);
// });  Modal contact.


/* ------------------------------------------------- MODAL ------------------------------------------------- */
document.getElementsByClassName("close")[0].onclick = function ()
{
    $("#myModal").fadeOut("slow");
};
window.onclick = function (event)
{
    if (event.target == document.getElementById("myModal"))
    {
        $("#myModal").fadeOut("slow");
    }
}


/* ------------------------------------------------- Telegram message time! ------------------------------------------------- */
$("#sendMsgBtn").click(function ()
{
    let msgString =
    `
        Naam: ${$("#nameInput").val()} - E-mail: ${$("#emailInput").val()} - Bericht: ${$("#commentInput").val()}
    `;

    $("#nameInput").val("");
    $("#emailInput").val("");
    $("#commentInput").val("");

    $.ajax({
        type: "POST",
        url: "https://evening-plains-72758.herokuapp.com/forwardToTelegramGC",
        data: {
            message: msgString
        },
        success: function (resp)
        {
            console.log(resp);
        }
        // dataType: "Default"
    });
});


/* ------------------------------------------------- Distance mouse move cards. ------------------------------------------------- */
function calculateDistance(elem, mouseX, mouseY)
{
    let leftX   = elem.offset().left;
    let topY    = elem.offset().top;
    let rightX  = leftX + elem.width();
    let bottomY = topY  + elem.height();

    let closestXDist;
    let closestYDist;

    /* Check if mouse is inside card. */
    if (mouseX >= leftX && mouseX <= rightX &&
        mouseY >= topY  && mouseY <= bottomY)
    {
        return -1;
    }

    /* Direct vertical or horizontal distance. */
    if (mouseX >= leftX && mouseX <= rightX)
    {
        let yDist1 = Math.abs(mouseY - topY);
        let yDist2 = Math.abs(mouseY - bottomY);

        if (yDist1 < yDist2)
        {
            return yDist1;
        }
        else
        {
            return yDist2;
        }
    }
    if (mouseY >= topY && mouseY <= bottomY)
    {
        let xDist1 = Math.abs(mouseX - leftX);
        let xDist2 = Math.abs(mouseX - rightX);

        if (xDist1 < xDist2)
        {
            return xDist1;
        }
        else
        {
            return xDist2;
        }
    }

    /* Calculate distance to corners of card. */
    let xDistLeft   = Math.abs(mouseX - leftX);
    let xDistRight  = Math.abs(mouseX - rightX);
    let yDistTop    = Math.abs(mouseY - topY);
    let yDistBottom = Math.abs(mouseY - bottomY);

    closestXDist = xDistLeft < xDistRight  ? xDistLeft : xDistRight;
    closestYDist = yDistTop  < yDistBottom ? yDistTop  : yDistBottom;

    return Math.floor(
        Math.sqrt(
            Math.pow(closestXDist, 2) + // A^2
            Math.pow(closestYDist, 2)   // B^2
        )
    );
};


$(document).mousemove(function(e)
{
    let mX                = e.pageX;
    let mY                = e.pageY;
    let cardBasicJQuery   = $("#cardBasic");
    let cardPremiumJQuery = $("#cardPremium");
    let cardProJQuery     = $("#cardPro");

    /* Move physical image. */
    let cardWidth  = cardBasicJQuery.width();
    let cardHeight = cardBasicJQuery.height();

    if (mY >= $("#cardTabBorder").offset().top && mY <= ($("#cardTabBorder").offset().top + $("#cardTabBorder").height()))
    {
        let maxDist              = cardBasicJQuery.offset().top - $("#cardTabBorder").offset().top;
        let mouseInCardMinHeight = (cardHeight >> 1);
        let mouseInCardMaxHeight = (mouseInCardMinHeight + (cardHeight >> 2));
        let mouseInCardDist      = mouseInCardMaxHeight - mouseInCardMinHeight;

        /* Height to set = distance * (totalCardMove / maxDist) */
        let distanceCardBasic   = calculateDistance(cardBasicJQuery,   mX, mY);
        let distanceCardPremium = calculateDistance(cardPremiumJQuery, mX, mY);
        let distanceCardPro     = calculateDistance(cardProJQuery,     mX, mY);

        let basicY   = (distanceCardBasic   / maxDist) * mouseInCardDist;
        let premiumY = (distanceCardPremium / maxDist) * mouseInCardDist;
        let proY     = (distanceCardPro     / maxDist) * mouseInCardDist;

        basicY   = basicY   > mouseInCardDist ? mouseInCardDist : basicY;
        premiumY = premiumY > mouseInCardDist ? mouseInCardDist : premiumY;
        proY     = proY     > mouseInCardDist ? mouseInCardDist : proY;

        /* Pixel proximity virtual mouse. */
        if (basicY < 15)   { $("#basicMouse img").css("content",   "url(img/EZCARDS/Hand.png)"); } else { $("#basicMouse img").css("content",   "url(img/EZCARDS/Muis.png)"); }
        if (premiumY < 15) { $("#premiumMouse img").css("content", "url(img/EZCARDS/Hand.png)"); } else { $("#premiumMouse img").css("content", "url(img/EZCARDS/Muis.png)"); }
        if (proY < 15)     { $("#proMouse img").css("content",     "url(img/EZCARDS/Hand.png)"); } else { $("#proMouse img").css("content",     "url(img/EZCARDS/Muis.png)"); }

        /* If on top. */
        if (basicY < 0)   { $("#basicMouse").css("opacity",   "0"); } else { $("#basicMouse").css("opacity",   "1"); }
        if (premiumY < 0) { $("#premiumMouse").css("opacity", "0"); } else { $("#premiumMouse").css("opacity", "1"); }
        if (proY < 0)     { $("#proMouse").css("opacity",     "0"); } else { $("#proMouse").css("opacity",     "1"); }

        $("#basicMouse").css("left", cardBasicJQuery.offset().left + ((cardWidth  >> 1) + (cardWidth  >> 2)));
        $("#basicMouse").css("top",  cardBasicJQuery.offset().top  + mouseInCardMinHeight + basicY);

        $("#premiumMouse").css("left", cardPremiumJQuery.offset().left + ((cardWidth  >> 1) + (cardWidth  >> 2)));
        $("#premiumMouse").css("top",  cardPremiumJQuery.offset().top  + mouseInCardMinHeight + premiumY);

        $("#proMouse").css("left", cardProJQuery.offset().left + ((cardWidth  >> 1) + (cardWidth  >> 2)));
        $("#proMouse").css("top",  cardProJQuery.offset().top  + mouseInCardMinHeight + proY);
    }
});