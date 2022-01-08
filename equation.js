var equationDiv = document.getElementById("equation");

function renderEquation()
{
    katex.render(
        `
        \\color{white}
    
        \\vec{w} =
    
        a\\textcolor{turquoise}{\\vec{u}} +
        b\\textcolor{orange}{\\vec{v}} =
    
        ${round1(scalars[0])}\\textcolor{turquoise}{
            \\begin{bmatrix}
                ${round1(u.x)} \\\\ ${round1(u.y)}
            \\end{bmatrix}
        } +
        ${round1(scalars[1])}\\textcolor{orange}{
            \\begin{bmatrix}
                ${round1(v.x)} \\\\ ${round1(v.y)}
            \\end{bmatrix}
        } =
    
        \\textcolor{turquoise}{
            \\begin{bmatrix}
                ${round1(scalarMult(scalars[0], u).x)} \\\\
                ${round1(scalarMult(scalars[0], u).y)}
            \\end{bmatrix}
        } +
        \\textcolor{orange}{
            \\begin{bmatrix}
                ${round1(scalarMult(scalars[1], v).x)} \\\\
                ${round1(scalarMult(scalars[1], v).y)}
            \\end{bmatrix}
        } =
    
        \\begin{bmatrix} ${round1(targetVector.x)} \\\\ ${round1(targetVector.y)} \\end{bmatrix}
        `,
        equationDiv);
}

function round1(number)
{
    if (("" + number).includes(".")) return number.toFixed(1);
    return number;
}