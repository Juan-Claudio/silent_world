import Player from "./Player.js";
export default class Where_do_I
{
    static borders = {
        l : '0,0,20,675(0',      //left
        r : '1180,0,1200,675(0', //right
        t : '21,0,1179,20(0',    //top
        b : '21,655,1179,675(0'  //bottom
    }
    
    //zone_str = "x,y,x’,y’" : zone = int[x, y, x', y']
    //OR
    //zone_str = "x,y,x’,y’(i" : zone = int[x, y, x', y']
    static str_to_arr(stri)
    {
        if(/^[lrtb]{1}$/.test(stri))
        {
            stri = this.borders[stri];
        }

        if(/^(\-*\d{1,4},){3}\-*\d{1,4}(\([0-9]+){0,1}$/.test(stri))
        {
            return stri.split(')')[0].split(',')
            .map((val)=>{ return parseInt(val); });
        }

        return [-10,-10,-1,-1];
    }

    static contains(coor, zone)
    {
        let is_into = coor[0] <= zone[2];
        is_into &= coor[0] >= zone[0];
        is_into &= coor[1] <= zone[3];
        is_into &= coor[1] >= zone[1];
        return is_into;
    }

    
    static click_coor(world_window)
    {
        let mouseCoor = [0,0];
        mouseCoor[0] = window.event.clientX - document.getElementById(world_window).offsetLeft + window.pageXOffset;
        mouseCoor[1] = window.event.clientY - document.getElementById(world_window).offsetTop + window.pageYOffset;
        return [
            Math.floor(mouseCoor[0]),
            Math.floor(mouseCoor[1])
        ];
    }

    static click(world_window, is_move=false)
    {
        let curr_place = Player.is._.into;
        let cursor_xy = this.click_coor(world_window);
        let all_zone_coor = Object.keys(Player.game_vars[curr_place]);
        let interaction = (is_move) ? 'cursor' : 'click';

        
        return all_zone_coor.filter((coor)=>{
            return (
                (Player.game_vars[curr_place][coor][interaction]!=undefined
                || /^[lrtb]$/.test(coor))
                && this.contains(cursor_xy, this.str_to_arr(coor))
            );
        });
    }

    static move(world_window)
    {
        return this.click(world_window, true);
    }
}