var c = document.getElementById("vectors");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

const unitLength = 50.0;

const origin = {x: 0, y: 0};

var centre = {x: c.width / 2, y: c.height / 2};

var u = option_vectors.u;
var v = option_vectors.v;
var mouseVect = {x: 0, y: 0};
var targetVector = {x: 0, y: 0};
var ihat = {x: 1, y: 0};
var jhat = {x: 0, y: 1};

var scalars = [0, 0];

var vectorWidth = 4;
var arrowheadLength = 25;

var movingVector = "targetVector";

window.addEventListener('mousemove', e =>
{
    redraw({x: e.clientX, y: e.clientY});
});

document.addEventListener('keydown', e =>
{
    switch (e.key)
    {
        case " ":
            if (movingVector == "targetVector") movingVector = "none";
            else movingVector = "targetVector";
            break;
        case "u":  
        case "v":
            if (movingVector == e.key)
            {
                movingVector = "none";
                option_snap = select_snap.value;
                option_bg = select_bg.value;
                drawBackground();
                redraw(origin);
            }
            else 
            {
                movingVector = e.key;
                option_snap = "coordinates";
                option_bg = "grid";
                drawBackground();
            }
            break;
    }
});

function redraw(mouseVector)
{
    ctx.clearRect(0, 0, c.width, c.height);

    mouseVect = toUnits(mouseVector);

    if (movingVector != "none")
    {
        if (option_snap == "coordinates")
        {
            window[movingVector] = {x: Math.round(mouseVect.x), y: Math.round(mouseVect.y)};
        }
        else
        {
            window[movingVector] = mouseVect;
        }
    }

    linearCombination();

    if (option_snap == "coefficients")
    {
        scalars = [Math.round(scalars[0]), Math.round(scalars[1])];
        window[movingVector] = vectorAdd(scalarMult(scalars[0], u), scalarMult(scalars[1], v));
    }
    
    if (movingVector != "u" && movingVector != "v")
    {
        drawVector(ctx, scalarMult(scalars[1], v), scalarMult(scalars[0], u), "#103834");
        drawVector(ctx, scalarMult(scalars[0], u), scalarMult(scalars[1], v), "#402900");

        drawOriginVector(ctx, scalarMult(scalars[0], u), "turquoise");
        drawOriginVector(ctx, scalarMult(scalars[1], v), "orange");
    }
    else
    {
        input_vectors[movingVector].x.value = window[movingVector].x;
        input_vectors[movingVector].y.value = window[movingVector].y;

        drawOriginVector(ctx, scalarMult(1, u), "turquoise");
        drawOriginVector(ctx, scalarMult(1, v), "orange");
    }
    
    drawOriginVector(ctx, targetVector, "white", 2);

    fillCircle(ctx, centre.x, centre.y, 5, "white");

    if (option_snap != "none" || movingVector == "none")
    {
        fillCircle(ctx, mouseVector.x, mouseVector.y, 7, "rgba(255, 255, 255, 0.4)");
    }

    renderEquation();
}

function updateVector(vector)
{
    window[vector].x = option_vectors[vector].x;
    window[vector].y = option_vectors[vector].y;
    drawBackground();
    redraw(origin);
}

function resizeCanvas()
{    
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    centre = {x: c.width / 2, y: c.height / 2};
    drawBackground();
}
  
window.onresize = resizeCanvas;

function scalarMult(s, v)
{
    return {x: s * v.x, y: s * v.y};
}

function vectorAdd(u, v)
{
    return {x: u.x + v.x, y: u.y + v.y};
}

function toUnits(v)
{
    return {x: (v.x - centre.x) / unitLength, y: -(v.y - centre.y) / unitLength};
}

function toPixels(v)
{
    return {x: (v.x * unitLength) + centre.x, y: (v.y * -unitLength) + centre.y}
}

function linearCombination()
{
    var augmat = [
        [u.x, v.x, targetVector.x],
        [u.y, v.y, targetVector.y]
    ];

    // Set first entry of first row to 1 via row operations
    if (augmat[0][0] != 0)
    {
        let f = augmat[0][0];
        for (let i = 0; i < augmat[0].length; i++)
        {
            augmat[0][i] /= f;
        }
    }
    else if (augmat[1][0] != 0)
    {
        let temp = augmat[0];
        augmat[0] = augmat[1];
        augmat[1] = temp;

        let f = augmat[0][0];
        for (let i = 0; i < augmat[0].length; i++)
        {
            augmat[0][i] /= f;
        }
    }
    else
    {
        scalars = [0, 0];
        return;
    }

    // Set first entry of second row to 0
    let f = augmat[1][0];
    for (let i = 0; i < augmat[0].length; i++)
    {
        augmat[1][i] -= augmat[0][i] * f;
    }

    // Set pivot of second row to 1
    if (augmat[1][1] != 0)
    {
        let f = augmat[1][1];
        for (let i = 0; i < augmat[0].length; i++)
        {
            augmat[1][i] /= f;
        }
    }
    else
    {
        scalars = [0, 0];
        return;
    }

    f = augmat[0][1];
    for (let i = 0; i < augmat[0].length; i++)
    {
        augmat[0][i] -= augmat[1][i] * f;
    }

    scalars = [augmat[0][2], augmat[1][2]];
}

function drawOriginVector(context, vector, style)
{
    drawVector(context, {x: 0, y:0}, vector, style);
}

function drawVector(context, origin, vector, style)
{
    let uo = toPixels(origin);
    let u = toPixels(vectorAdd(vector, origin));
    
    let angle = 0;
    if (vector.x < 0)
    {
        angle = -Math.atan(vector.y / vector.x);
    }
    else if (vector.x > 0)
    {
        angle = -Math.atan(vector.y / vector.x) + Math.PI;
    }
    else
    {
        if (vector.y > 0) angle = Math.PI / 2;
        else angle = -Math.PI / 2;
    }

    drawLine(
        context,
        uo.x,
        uo.y,
        u.x + Math.min(vectorLength(vector) * unitLength, arrowheadLength / 2) * Math.cos(angle),
        u.y + Math.min(vectorLength(vector) * unitLength, arrowheadLength / 2) * Math.sin(angle),
        style,
        vectorWidth
        );
    fillArrowHead(context, u.x, u.y, angle, Math.PI / 6, Math.min(arrowheadLength, vectorLength(vector) * unitLength), style);
}

function vectorLength(v)
{
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function fillArrowHead(context, x, y, dir, angleWidth, length, style)
{
    let pos = {x: x, y: y};

    context.beginPath();
    
    context.moveTo(x, y);
    
    let sideLength = length * Math.cos(angleWidth / 2);
    let circleRadius = length * Math.sin(angleWidth / 2);

    let firstLineAngle = dir - (Math.PI - angleWidth / 2) + Math.PI;
    pos.x += sideLength * Math.cos(firstLineAngle);
    pos.y += sideLength * Math.sin(firstLineAngle);
    context.lineTo(pos.x, pos.y);
    
    let circleAngle = firstLineAngle + Math.PI / 2 + Math.PI;
    pos.x += circleRadius * Math.cos(circleAngle);
    pos.y += circleRadius * Math.sin(circleAngle);
    context.lineTo(pos.x, pos.y);

    let circlePos = {x: pos.x, y: pos.y};

    pos.x -= circleRadius * Math.cos(circleAngle + (Math.PI - angleWidth));
    pos.y -= circleRadius * Math.sin(circleAngle + (Math.PI - angleWidth));
    context.lineTo(pos.x, pos.y);

    context.fillStyle = style;
    context.fill();
    context.closePath();

    // context.fillCircle(circlePos.x, circlePos.y, circleRadius, "white");
}

function fillCircle(context, x, y, radius, style)
{
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = style;
    context.fill();
    context.closePath();
}

function drawLine(context, x1, y1, x2, y2, style, width)
{
    context.beginPath();
    context.strokeStyle = style;
    context.lineWidth = width;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
