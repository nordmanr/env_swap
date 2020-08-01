function loadLevel1() {
    var tri;

    ENVIROMENT.push(rectangle("grey", 0, H-UNIT_SIZE*2, W*100, UNIT_SIZE*2, false, "PUSH UP", true));
    ENVIROMENT.push(rectangle("grey", 0, 0, W*100, UNIT_SIZE*2, false, "PUSH DOWN", true));
    ENVIROMENT.push(rectangle("grey", UNIT_SIZE*20, H-UNIT_SIZE*3, UNIT_SIZE*4, UNIT_SIZE+1, false, "PUSH UP", true));
    
    for(tri of rectangleOfTri("grey", UNIT_SIZE*20, H-UNIT_SIZE*3, UNIT_SIZE*4, UNIT_SIZE+1, false, "PUSH", true)){
        ENVIROMENT.push(tri);
    }

    ENVIROMENT.push(triangle("#bbbbbb", UNIT_SIZE*40, H-UNIT_SIZE*2+1, UNIT_SIZE*42, H-UNIT_SIZE*2+1, UNIT_SIZE*41, H-UNIT_SIZE*4, false, "PUSH UP", true));

    
}

function rectangle(color, left, top, width, height, fatal, reaction, move) {
    var rectangle = [];
    rectangle.type="RECT";
    rectangle.color=color;
    rectangle.left=left;
    rectangle.top=top;
    rectangle.width=width;
    rectangle.height=height;
    rectangle.fatal=fatal;
    rectangle.reaction=reaction;
    rectangle.move=move;
    return rectangle;
}

function rectangleOfTri(color, left, top, width, height, fatal, reaction, move) {
    var tt = triangle("orange", left, top, left+width, top, left+width/2, top+height/2, fatal, reaction+" UP", move);
    var bt = triangle("green", left, top+height, left+width, top+height, left+width/2, top+height/2, fatal, reaction+" DOWN", move);
    var lt = triangle("cyan", left, top, left, top+height, left+width/2, top+height/2, fatal, reaction+" LEFT", move);
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
}