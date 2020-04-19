const commandblocks={
  command(tile,msg,parentthis){
    if(msg.substring(0,1)!="/") msg="/"+msg;
    var argstmp = msg.substring(1).split('"');
    var args=[];
    for(var i=0;i<argstmp.length;i++){
      if(i%2==0){
        if(argstmp[i].trim()!=''){
          args=args.concat(argstmp[i].trim().split(' '));
        }
      }
      else{
        args.push(argstmp[i].trim());
      }
    }
    if(args.length==0){
      return false;
    }
    var cmd = args[0];
    args = args.splice(1);
  try{
    switch(cmd){
      case 'overwrite':
        parentthis.setMessageBlockText(null,tile,args.join(' '));
        return true;
      break;
      case 'say':
        Call.sendMessage(args.join(' '));
        return true;
      break;
      case 'title':
        Vars.ui.scriptfrag.addMessage(args.join(' '));
        return false;
      break;
      case 'setblock':
        //Call.setTile(Vars.world.tile(tile.x, tile.y), Blocks.air, tile.team, rot);
        if(args.length>=3&&args.length<=5){
          var cx=args[0]; var cy=args[1]; var cblock=args[2];
          if(cx>=0&&cy>=0){
            if(true){
              if(args.length==3) Call.setTile(Vars.world.tile(cx, cy), Blocks[cblock], tile.team, 0);
              if(args.length==4){ 
                if(args[3]>=0&&args[3]<=3) Call.setTile(Vars.world.tile(cx, cy), Blocks[cblock], tile.team, args[3]);
                else throw "Rotation should be 0~3";
              }
              if(args.length==5){ 
                if(args[3]>=0&&args[3]<=3) Call.setTile(Vars.world.tile(cx, cy), Blocks[cblock], args[4], args[3]);
                else throw "Rotation should be 0~3";
              }
            }
            else throw "No such Block or Entity";
          }
          else{
            throw "Coordinates should be above 0";
          }
        }
        else{
          Call.sendMessage("E:Missing params.");
          return false;
        }
      break;
      default:
        return false;
    }
  }
  catch(err){
    Call.sendMessage("E:"+err);
    return false;
  }
  }
};
this.global.commandblocks=commandblocks;
