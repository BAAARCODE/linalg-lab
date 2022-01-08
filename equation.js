var equationDiv = document.getElementById("equation");
var rounded = false; 

const equals = "=";
const approx = "\\approx";

function renderEquation()
{
    rounded = false;
    var vars = {
        a: round1(scalars[0]),
        b: round1(scalars[1]),
        ux: round1(u.x),
        uy: round1(u.y),
        vx: round1(v.x),
        vy: round1(v.y),
        mux: round1(scalarMult(scalars[0], u).x),
        muy: round1(scalarMult(scalars[0], u).y),
        mvx: round1(scalarMult(scalars[1], v).x),
        mvy: round1(scalarMult(scalars[1], v).y),
        tx: round1(targetVector.x),
        ty: round1(targetVector.y)
    }

    var eqSymbol;
    if (rounded) eqSymbol = approx;
    else eqSymbol = equals;

    katex.render(
        `
        \\color{white}
    
        \\vec{w} =
    
        a\\textcolor{turquoise}{\\vec{u}} +
        b\\textcolor{orange}{\\vec{v}} ${eqSymbol}
    
        ${vars.a}\\textcolor{turquoise}{
            \\begin{bmatrix}
                ${vars.ux} \\\\ ${vars.uy}
            \\end{bmatrix}
        } +
        ${vars.b}\\textcolor{orange}{
            \\begin{bmatrix}
                ${vars.vx} \\\\ ${vars.vy}
            \\end{bmatrix}
        } ${eqSymbol}
    
        \\textcolor{turquoise}{
            \\begin{bmatrix}
                ${vars.mux} \\\\
                ${vars.muy}
            \\end{bmatrix}
        } +
        \\textcolor{orange}{
            \\begin{bmatrix}
                ${vars.mvx} \\\\
                ${vars.mvy}
            \\end{bmatrix}
        } ${eqSymbol}
    
        \\begin{bmatrix} ${vars.tx} \\\\ ${vars.ty} \\end{bmatrix}
        `,
        equationDiv);
}

function round1(number)
{
    const numString = "" + number;
    if (numString.includes(".") && numString.substring(numString.indexOf(".")).length > 2) 
    {
        rounded = true;
        return number.toFixed(1);
    }
    return number;
}