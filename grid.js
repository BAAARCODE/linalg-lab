var gc = document.getElementById("grid");
var gctx = gc.getContext("2d");

gc.width = window.innerWidth;
gc.height = window.innerHeight;

function drawGrid(vector1, vector2, length, centreColour, axisWidth, minorWidth)
{
    for (var i = -length + 1; i < length; i++)
    {
        drawGridLine(scalarMult(i, vector1), vector2, length, centreColour - centreColour / length * Math.abs(i), minorWidth);
        drawGridLine(scalarMult(i, vector2), vector1, length, centreColour - centreColour / length * Math.abs(i), minorWidth);
    }
    drawGridLine(origin, ihat, length, centreColour, axisWidth);
    drawGridLine(origin, jhat, length, centreColour, axisWidth);
}

function drawGridLine(originVector, vector, length, centreColour, width)
{
    var end1 = toPixels(vectorAdd(originVector, scalarMult(length, vector)));
    var end2 = toPixels(vectorAdd(originVector, scalarMult(-length, vector)));

    var gradient = gctx.createLinearGradient(end1.x, end1.y, end2.x, end2.y);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.5, "rgb(" + centreColour + ", " + centreColour + ", " + centreColour + ")");
    gradient.addColorStop(1, "black");

    gctx.beginPath();
    gctx.strokeStyle = gradient;
    gctx.lineWidth = width;
    gctx.moveTo(end1.x, end1.y);
    gctx.lineTo(end2.x, end2.y);
    gctx.stroke();
    gctx.closePath();
}

drawGrid(ihat, jhat, 5, 100, 5, 1);
