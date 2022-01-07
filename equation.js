var equationDiv = document.getElementById("equation");

katex.render(
    `
    \\color{white}
    \\vec{w} =
    a\\textcolor{turquoise}{\\vec{u}} +
    b\\textcolor{orange}{\\vec{v}} =
    2\\textcolor{turquoise}{\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}} +
    2\\textcolor{orange}{\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}} =
    \\textcolor{turquoise}{\\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix}} +
    \\textcolor{orange}{\\begin{bmatrix} 0 \\\\ 2 \\end{bmatrix}} =
    \\begin{bmatrix} 2 \\\\ 2 \\end{bmatrix}
    `,
    equationDiv);