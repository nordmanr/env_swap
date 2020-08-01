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
// To find orientation of ordered triplet (p, q, r). 
// The function returns following values 
// 0 --> p, q and r are colinear 
// 1 --> Clockwise 
// 2 --> Counterclockwise 
function orientation(p, q, r) {
    var val = (q.y - p.y) * (r.x - q.x) - 
            (q.x - p.x) * (r.y - q.y); 
  
    if (val == 0) return 0; // colinear 
  
    return (val > 0)? 1: 2; // clock or counterclock wise 
}


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
    increaseVerticalVelocity(inc) {
        this._verticalVelocity += inc;
    }
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
        this._p1.x += this._horizontalVelocity; 
        this._p2.x += this._horizontalVelocity;
        this._p3.x += this._horizontalVelocity;
        this._p4.x += this._horizontalVelocity;
        this._left = this._p1.x;
         
        this._p1.y += this._verticalVelocity;
        this._p2.y += this._verticalVelocity;
        this._p3.y += this._verticalVelocity;
        this._p4.y += this._verticalVelocity;
        this._top = this._p1.y;
    }
}

class Triangle extends Shape {

}

/*
function rectangle(color, left, top, width, height, fatal, reaction, move) {
    var rectangle = [];
    rectangle.type="RECT";
    rectangle.color=color;
    rectangle.p1x=left;
    rectangle.p1y=top;
    rectangle.p2x=left+width;
    rectangle.p2y=top;
    rectangle.p3x=left+width;
    rectangle.p3y=top+height;
    rectangle.p4x=left;
    rectangle.p4y=top+height;
    rectangle.fatal=fatal;
    rectangle.reaction=reaction;
    rectangle.move=move;
    return rectangle;
}
function rectangleOfTri(color, left, top, width, height, fatal, reaction, move) {
    var tt = triangle("orange", left, top, left+width, top, left+width/2, top+height/2, fatal, reaction+" UP", move);
    var bt = triangle("green", left, top+height, left+width/2, top+height/2, left+width, top+height, fatal, reaction+" DOWN", move);
    var lt = triangle("cyan", left, top, left+width/2, top+height/2, left, top+height, fatal, reaction+" LEFT", move);
    var rt = triangle("red", left+width, top, left+width, top+height, left+width/2, top+height/2, fatal, reaction+" RIGHT", move);

    return [tt, bt, lt, rt];

}
function triangle(color, p1x, p1y, p2x, p2y, p3x, p3y, fatal, reaction, move) {
    var triangle = [];
    triangle.type="TRI";
    triangle.color=color;
    triangle.p1x=p1x;
    triangle.p1y=p1y;
    triangle.p2x=p2x;
    triangle.p2y=p2y;
    triangle.p3x=p3x;
    triangle.p3y=p3y;
    triangle.fatal=fatal;
    triangle.reaction=reaction;
    triangle.move=move;
    return triangle;
}*/