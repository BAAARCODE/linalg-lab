var g = document.getElementById("option-list");

var select_bg = document.getElementById("options-background");
var option_bg = select_bg.value;

g.style.display = 'none';

function toggleOptions()
{
    if (g.style.display == 'none')
    {
        g.style.display = 'block';
    }
    else
    {
        g.style.display = 'none';
    }
}

select_bg.addEventListener('change', e => {
    option_bg = select_bg.value;
    drawBackground();
});