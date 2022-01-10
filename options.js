var g = document.getElementById("option-list");
var eq = document.getElementById("equation");

var select_bg = document.getElementById("options-background");
var option_bg = select_bg.value;

var select_snap = document.getElementById("options-snap");
var option_snap = select_snap.value;

var checkbox_equation = document.getElementById("show-equation-checkbox");
var option_equation = checkbox_equation.checked;

var input_vectors = 
{
    u:
    {
        x: document.getElementById("u-x"),
        y: document.getElementById("u-y")
    },
    v:
    {
        x: document.getElementById("v-x"),
        y: document.getElementById("v-y")
    }
}
var option_vectors = 
{
    u:
    {
        x: parseInt(input_vectors.u.x.value),
        y: parseInt(input_vectors.u.y.value)
    },
    v:
    {
        x: parseInt(input_vectors.v.x.value),
        y: parseInt(input_vectors.v.y.value)
    }
}

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

function showHideEquation()
{
    option_equation = checkbox_equation.checked;
    if (option_equation) eq.style.display = 'flex';
    else eq.style.display = 'none';
}

for (const [key_vect, val_vect] of Object.entries(input_vectors)) {
    for (const [key_axis, val_axis] of Object.entries(val_vect)) {
        val_axis.addEventListener('change', e => {
            option_vectors[key_vect][key_axis] = val_axis.value;
            updateVector(key_vect);
        });
    } 
}