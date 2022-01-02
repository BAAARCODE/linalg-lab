var c = document.getElementById("vectors");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

var unitLength = 50.0;

const origin = {x: 0, y: 0};

var centre = {x: c.width / 2, y: c.height / 2};

var u = {x: 1, y: 2};
var v = {x: -1, y: 2};
var mouseVect = {x: 0, y: 0};

var scalars = [0, 0];

var mouseX = 0;
var mouseY = 0;

var vectorWidth = 4;
var arrowheadLength = 25;

c.addEventListener('mousemove', e => {
    mouseVect = toUnits({x: e.offsetX, y: e.offsetY});
    
    ctx.clearRect(0, 0, c.width, c.height);

    linearCombination();
    
    drawVector(scalarMult(scalars[1], v), scalarMult(scalars[0], u), "#103834");
    drawVector(scalarMult(scalars[0], u), scalarMult(scalars[1], v), "#402900");
    
    drawOriginVector(scalarMult(scalars[0], u), "turquoise");
    drawOriginVector(scalarMult(scalars[1], v), "orange");
    
    drawOriginVector(mouseVect, "white", 2);

    fillCircle(centre.x, centre.y, 5, "white");
  });

  function resizeCanvas() {    
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    centre = {x: c.width / 2, y: c.height / 2};
    drawGrid(u, v, 5, 100, 5, 1);
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
        [u.x, v.x, mouseVect.x],
        [u.y, v.y, mouseVect.y]
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

function drawOriginVector(vector, style)
{
    drawVector({x: 0, y:0}, vector, style);
}

function drawVector(origin, vector, style)
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
        uo.x,
        uo.y,
        u.x + Math.min(vectorLength(vector) * unitLength, arrowheadLength / 2) * Math.cos(angle),
        u.y + Math.min(vectorLength(vector) * unitLength, arrowheadLength / 2) * Math.sin(angle),
        style,
        vectorWidth
        );
    fillArrowHead(u.x, u.y, angle, Math.PI / 6, Math.min(arrowheadLength, vectorLength(vector) * unitLength), style);
}

function vectorLength(v)
{
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function fillArrowHead(x, y, dir, angleWidth, length, style)
{
    let pos = {x: x, y: y};

    ctx.beginPath();
    
    ctx.moveTo(x, y);
    
    let sideLength = length * Math.cos(angleWidth / 2);
    let circleRadius = length * Math.sin(angleWidth / 2);

    let firstLineAngle = dir - (Math.PI - angleWidth / 2) + Math.PI;
    pos.x += sideLength * Math.cos(firstLineAngle);
    pos.y += sideLength * Math.sin(firstLineAngle);
    ctx.lineTo(pos.x, pos.y);
    
    let circleAngle = firstLineAngle + Math.PI / 2 + Math.PI;
    pos.x += circleRadius * Math.cos(circleAngle);
    pos.y += circleRadius * Math.sin(circleAngle);
    ctx.lineTo(pos.x, pos.y);

    let circlePos = {x: pos.x, y: pos.y};

    pos.x -= circleRadius * Math.cos(circleAngle + (Math.PI - angleWidth));
    pos.y -= circleRadius * Math.sin(circleAngle + (Math.PI - angleWidth));
    ctx.lineTo(pos.x, pos.y);

    ctx.fillStyle = style;
    ctx.fill();
    ctx.closePath();

    // ctx.fillCircle(circlePos.x, circlePos.y, circleRadius, "white");
}

function fillCircle(x, y, radius, style)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = style;
    ctx.fill();
    ctx.closePath();
}

function drawLine(x1, y1, x2, y2, style, width)
{
    ctx.beginPath();
    ctx.strokeStyle = style;
    ctx.lineWidth = width;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
