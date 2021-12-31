var g = document.getElementById("optionList");

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