import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";

export default ['elevator_screen',function()
{
    let html = new Html();
    let css = {};
    let events = [];
    let id = "elevator_screen";
    
    let world_window_position =  $("#world_window").position();
    let scroll_t = $(document).scrollTop();
    let scroll_l = $(document).scrollLeft();
    let w = 248;
    let h = 160;
    let left = 493 + scroll_l + world_window_position.left;
    let top = 20 + scroll_t + world_window_position.top;
    
    html = html
    .div({id, class:'abs'}).text(Trad.word('_elevator_puns')).end().export;
    

    
    css['#'+id] = {
        'box-sizing':"border-box",
        display:"flex",
        'flex-direction':"column",
        'justify-content':"center",
        'align-items':"flex-end",
        width:w,
        height:h,
        left,
        top,
        'padding-right':12,
        'background-image':"url('public/img/accessories/elevator_screen.png')",
        'text-align':"right",
        'color':"#fff",
        'font-size':"large",
        'font-weight':"bold"
    };

    events.push(
        ()=>{
            $(window).on('resize',function(){
                let world_window_position =  $("#world_window").position();
                let scroll_t = $(document).scrollTop();
                let scroll_l = $(document).scrollLeft();
                let left = 493 + scroll_l + world_window_position.left;
                let top = 20 + scroll_t + world_window_position.top;
                $('#'+id).css({ left, top });
            })
        }
    );

    return {html,css,events};
}];