/* Bug fix hover images. */
function preloader()
{
    if (document.images)
    {
        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();

        img1.src = "img/chris/basic.png";
        img2.src = "img/chris/premium.png";
        img3.src = "img/chris/pro.png";
    }
}
function addLoadEvent(func)
{
    var oldonload = window.onload;
    if (typeof window.onload != 'function')
    {
        window.onload = func;
    } else
    {
        window.onload = function ()
        {
            if (oldonload)
            {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);