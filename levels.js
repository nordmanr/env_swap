function loadLevel1() {
    var ceil, floor, b1;

    floor = new Rectangle(0, H-UNIT_SIZE*2, W*100, UNIT_SIZE*2);
    ceil = new Rectangle(0, 0, W*100, UNIT_SIZE*2);
    ceil.reaction = "PUSH DOWN";
    b1 = new Rectangle(UNIT_SIZE*20, H-UNIT_SIZE*3, UNIT_SIZE*4, UNIT_SIZE+1);
    b1.horizontalVelocity = -.2*UNIT_SIZE;


    ENVIROMENT.push(floor);
    ENVIROMENT.push(ceil);
    ENVIROMENT.push(b1);

//    for(tri of rectangleOfTri("grey", UNIT_SIZE*20, H-UNIT_SIZE*3, UNIT_SIZE*4, UNIT_SIZE+1, false, "PUSH", true)){
//        ENVIROMENT.push(tri);
//    }

//    ENVIROMENT.push(triangle("#bbbbbb", UNIT_SIZE*40, H-UNIT_SIZE*2+1, UNIT_SIZE*41, H-UNIT_SIZE*4, UNIT_SIZE*42, H-UNIT_SIZE*2+1, false, "PUSH UP", true));

    
}