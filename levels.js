function loadLevel1() {
    var ceil, floor, b1;

    floor = new Rectangle(0, H-UNIT_SIZE*2, W*100, UNIT_SIZE*2);
    ceil = new Rectangle(0, 0, W*100, UNIT_SIZE*2);
    ceil.reaction = "PUSH DOWN";
    b1 = new Rectangle(UNIT_SIZE*20, H-UNIT_SIZE*3, UNIT_SIZE*4, UNIT_SIZE+1);
    b1.horizontalVelocity = -.2*UNIT_SIZE;
    t1 = new Triangle(new Point(UNIT_SIZE*40, H-UNIT_SIZE*1.8), new Point(UNIT_SIZE*50, H-UNIT_SIZE*3), new Point(UNIT_SIZE*50, H-UNIT_SIZE*1.8));
    t1.horizontalVelocity = -.2*UNIT_SIZE;
    t2 = new Triangle(new Point(UNIT_SIZE*50-2, H-UNIT_SIZE*3), new Point(UNIT_SIZE*60, H-UNIT_SIZE*1.8), new Point(UNIT_SIZE*50, H-UNIT_SIZE*1.8));
    t2.horizontalVelocity = -.2*UNIT_SIZE;


    ENVIROMENT.push(floor);
    ENVIROMENT.push(ceil);
    ENVIROMENT.push(b1);
    ENVIROMENT.push(t1);
    ENVIROMENT.push(t2);


    
}