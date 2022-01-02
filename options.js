var g = document.getElementById("option-list");

var select_bg = document.getElementById("options-background");
var option_bg = select_bg.value;

var select_snap = document.getElementById("options-snap");
var option_snap = select_snap.value;

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

select_snap.addEventListener('change', e => {
    option_snap = select_snap.value;
});