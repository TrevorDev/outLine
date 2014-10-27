var Collision = {}
Collision.rect = function(a, b, xMove, yMove){
	//The sides of the rectangles
    var leftA, leftB;
    var rightA, rightB;
    var topA, topB;
    var bottomA, bottomB;

    //Calculate the sides of rect A
    leftA = a.x;
    rightA = a.x + a.width;
    topA = a.y;
    bottomA = a.y + a.height;

    //Calculate the sides of rect B
    leftB = b.x;
    rightB = b.x + b.width;
    topB = b.y;
    bottomB = b.y + b.height;

    //If any of the sides from A are outside of B
    if( bottomA <= topB )
    {
        return 0;
    }

    if( topA >= bottomB )
    {
        return 0;
    }

    if( rightA <= leftB )
    {
        return 0;
    }

    if( leftA >= rightB )
    {
        return 0;
    }

    if(xMove>0){
        return leftB-rightA;
    }else if(xMove<0){
        return rightB-leftA;
    }else if(yMove>0){
        return topB-bottomA;
    }else if(yMove<0){
        return bottomB-topA;
    }

    return 1;
}