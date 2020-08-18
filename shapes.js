



class Point {
    constructor(a, b){
        this.x = a;
        this.y = b;
    }
}

class Shape {
    constructor(){
        this._color = ENVIROMENT.color;
        this._reaction = "PUSH UP";
        this._fatal = false;
        this._type = "SHAPE"

        this._horizontalVelocity = 0;
        this._verticalVelocity = 0;
    }

    set color(val) {
        this._color = val;
    }
    get color() {
        return this._color;
    }
    set reaction(val) {
        this._reaction = val;
    }
    get reaction() {
        return this._reaction;
    }
    set fatal(val) {
        this._fatal = val;
    }
    get fatal() {
        return this._fatal;
    }
    set horizontalVelocity(val) {
        this._horizontalVelocity = val;
    }
    increaseHorizontalVelocity(inc) {
        this._horizontalVelocity += inc;
    }
    set verticalVelocity(val) {
        this._verticalVelocity = val;
    }
    get verticalVelocity(){
        return this._verticalVelocity;
    }
    increaseVerticalVelocity(inc) {
        this._verticalVelocity += inc;
    }

    toInsertableArray() {}
}

class Rectangle extends Shape {
    constructor(left, top, width, height){
        super();

        this._p1 = new Point(left, top);
        this._p2 = new Point(left+width, top);
        this._p3 = new Point(left+width, top+height);
        this._p4 = new Point(left, top+height);

        this._width = width;
        this._height = height;
        this._top = top;
        this._left = left;

        this._type = "RECT"
    }

    set top(val) {
        this._top = val;
        this._p1.y = val;
        this._p2.y = val;
        this._p3.y = val + this._height;
        this._p4.y = val + this._height;
    }
    get top(){
        return this._top;
    }
    set left(val) {
        this._left = val;
        this._p1.x = val;
        this._p2.x = val + this._width;
        this._p3.x = val + this._width;
        this._p4.x = val;
    }
    set width(val) {
        this._width = val;
        this._p2.x = this._p1.x + this._width;
        this._p3.x = this._p1.x + this._width;
    }
    set height(val) {
        this._height = val;
        this._p3.y = this._p1.y + this._height;
        this._p4.y = this._p1.y + this._height;
    }
    get height(){
        return this._height;
    }

    toInsertableArray() {
        var drawElement = [];
        drawElement.color = this._color;
        drawElement.points = [];
        drawElement.points.push(this._p1);
        drawElement.points.push(this._p2);
        drawElement.points.push(this._p3);
        drawElement.points.push(this._p4);
        return drawElement;
    }

    move() {
        this.left = this._p1.x + this._horizontalVelocity;
        this.top = this._p1.y + this._verticalVelocity;
    }

    snapToLineSegment(sideToSnapWith, snapToThisLineP1, snapToThisLineP2){
        var yDelta = snapToThisLineP2.y-snapToThisLineP1.y;
        var xDelta = snapToThisLineP2.x-snapToThisLineP1.x;
        var riseOverRun = yDelta/xDelta;
        var runOverRise = (riseOverRun==0 ? 99999999 : 1/riseOverRun);

        switch(sideToSnapWith){
            case "TOP":
                break;
            case "RIGHT":
                break;
            case "BOTTOM":
                this._p4.y = snapToThisLineP1.y + riseOverRun*(this._p4.x-snapToThisLineP1.x);
                this._p3.y = snapToThisLineP1.y + riseOverRun*(this._p3.x-snapToThisLineP1.x);
                this._p2.y = snapToThisLineP1.y + riseOverRun*(this._p3.x-snapToThisLineP1.x) - this._height;
                this._p1.y = snapToThisLineP1.y + riseOverRun*(this._p4.x-snapToThisLineP1.x) - this._height;
                break;
            case "LEFT":
                break;

        }
    }
}

class Triangle extends Shape {
    constructor(p1, p2, p3){
        super();

        this._color = "green";

        this._p1 = p1;
        this._p2 = p2;
        this._p3 = p3;

        this._type = "TRI"
    }

    toInsertableArray() {
        var drawElement = [];
        drawElement.color = this._color;
        drawElement.points = [];
        drawElement.points.push(this._p1);
        drawElement.points.push(this._p2);
        drawElement.points.push(this._p3);
        return drawElement;
    }

    move() {
        this._p1.x += this._horizontalVelocity;
        this._p2.x += this._horizontalVelocity;
        this._p3.x += this._horizontalVelocity;


        this._p1.y += this._verticalVelocity;
        this._p2.y += this._verticalVelocity;
        this._p3.y += this._verticalVelocity;
    }
}



function getCollidingPointSet(shape1, shape2) {
    var points1 = shape1.toInsertableArray().points;
    var points2 = shape2.toInsertableArray().points;

    var pointSet = [];
    var indices = [];

    for (var i=0; i<points1.length; i++) {
        for (var j=0; j<points2.length; j++) {
            var a1 = points1[i];
            var a2 = ( i == points1.length-1 ? points1[0] : points1[i+1] );
            var b1 = points2[j];
            var b2 = ( j == points2.length-1 ? points2[0] : points2[j+1] );

            if ((i==1 || i==3) && doIntersect(a1, a2, b1, b2)) {
                indices.push(j);
                indices.push(j==points2.length-1 ? 0 : j+1);
            }
        }
    }

    pointSet.push(points2[indices[0]]);
    pointSet.push(points2[indices[1]]);

    return pointSet;
}

function checkCollision(shape1, shape2) {
    var points1 = shape1.toInsertableArray().points;
    var points2 = shape2.toInsertableArray().points;
    var check = false;

    for (var i=0; i<points1.length; i++) {
        for (var j=0; j<points2.length; j++) {
            var a1 = points1[i];
            var a2 = ( i == points1.length-1 ? points1[0] : points1[i+1] );
            var b1 = points2[j];
            var b2 = ( j == points2.length-1 ? points2[0] : points2[j+1] );

            check = check || doIntersect(a1, a2, b1, b2);
        }
    }

    return check;
}


// Credit for line intersection code given to
// https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
function doIntersect(p1, q1, p2, q2) { 
    // Find the four orientations needed for general and 
    // special cases 
    var o1 = orientation(p1, q1, p2); 
    var o2 = orientation(p1, q1, q2); 
    var o3 = orientation(p2, q2, p1); 
    var o4 = orientation(p2, q2, q1); 
  
    // General case 
    if (o1 != o2 && o3 != o4) 
        return true; 
  
    // Special Cases 
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1 
    if (o1 == 0 && onSegment(p1, p2, q1)) return true; 
  
    // p1, q1 and q2 are colinear and q2 lies on segment p1q1 
    if (o2 == 0 && onSegment(p1, q2, q1)) return true; 
  
    // p2, q2 and p1 are colinear and p1 lies on segment p2q2 
    if (o3 == 0 && onSegment(p2, p1, q2)) return true; 
  
    // p2, q2 and q1 are colinear and q1 lies on segment p2q2 
    if (o4 == 0 && onSegment(p2, q1, q2)) return true; 
  
    return false; // Doesn't fall in any of the above cases 
} 
function onSegment(p, q, r) { 
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && 
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) 
    return true; 
  
    return false; 
}
function orientation(p, q, r) {
    var val = (q.y - p.y) * (r.x - q.x) - 
            (q.x - p.x) * (r.y - q.y); 
  
    if (val == 0) return 0; // colinear 
  
    return (val > 0)? 1: 2; // clock or counterclock wise 
}