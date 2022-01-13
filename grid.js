var gc = document.getElementById("grid");
var gctx = gc.getContext("2d");

gc.width = window.innerWidth;
gc.height = window.innerHeight;

function drawBackground()
{
    gc.width = window.innerWidth;
    gc.height = window.innerHeight;

    gctx.clearRect(0, 0, gc.width, gc.height);

    switch (option_bg)
    {
        case "grid":
            drawGrid(ihat, jhat, 10, 100, scaledMeasurements.vectorWidth, scaledMeasurements.gridline);
            break;
        case "vectors":
            drawOriginVector(gctx, scalarMult(1, u), "#103834");
            drawOriginVector(gctx, scalarMult(1, v), "#402900");
            break;
        case "grid-vectors":
            drawGrid(ihat, jhat, 10, 100, scaledMeasurements.vectorWidth, scaledMeasurements.gridline);
            drawOriginVector(gctx, scalarMult(1, u), "#103834");
            drawOriginVector(gctx, scalarMult(1, v), "#402900");
            break;
        case "coefficient-grid":
            drawGrid(u, v, 10, 100, scaledMeasurements.vectorWidth, scaledMeasurements.gridline);
            break;
    }
}

function drawGrid(vector1, vector2, length, centreColour, axisWidth, minorWidth)
{
    for (var i = -length + 1; i < length; i++)
    {
        drawGridLine(scalarMult(i, vector1), vector2, length, centreColour - centreColour / length * Math.abs(i), minorWidth);
        drawGridLine(scalarMult(i, vector2), vector1, length, centreColour - centreColour / length * Math.abs(i), minorWidth);
    }
    drawGridLine(origin, vector1, length, centreColour, axisWidth);
    drawGridLine(origin, vector2, length, centreColour, axisWidth);
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

drawBackground();