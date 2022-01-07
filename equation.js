var equationDiv = document.getElementById("equation");

function renderEquation()
{
    katex.render(
        `
        \\color{white}
    
        \\vec{w} =
    
        a\\textcolor{turquoise}{\\vec{u}} +
        b\\textcolor{orange}{\\vec{v}} =
    
        ${scalars[0]}\\textcolor{turquoise}{
            \\begin{bmatrix}
                ${u.x} \\\\ ${u.y}
            \\end{bmatrix}
        } +
        ${scalars[1]}\\textcolor{orange}{
            \\begin{bmatrix}
                ${v.x} \\\\ ${v.y}
            \\end{bmatrix}
        } =
    
        \\textcolor{turquoise}{
            \\begin{bmatrix}
                ${scalarMult(scalars[0], u).x} \\\\
                ${scalarMult(scalars[0], u).y}
            \\end{bmatrix}
        } +
        \\textcolor{orange}{
            \\begin{bmatrix}
                ${scalarMult(scalars[1], v).x} \\\\
                ${scalarMult(scalars[1], v).y}
            \\end{bmatrix}
        } =
    
        \\begin{bmatrix} ${targetVector.x} \\\\ ${targetVector.y} \\end{bmatrix}
        `,
        equationDiv);
}
