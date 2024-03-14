import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";

import Player from '../../controller/Player.js';
import Place from '../../controller/Place.js';
import Events from '../../controller/Events.js';

export default ['lateral_menu',function(){
    const html = new Html();
    const css = {};
    const events = [];

    

    /*********
    ** HTML **
    *********/
    function inventory()
    {
        let lang_dir = '';
        let items_html_code = new Html();
        let all_object = Player.game_vars._.in_objects;
        let memory = Player.game_vars._.in_memory;
        let all_items = all_object.concat(memory);

        for(let x of all_items)
        {
            if(Trad.choosen_language===1 && Player.es_objects.includes(x)){ lang_dir='es/' }
            else{ lang_dir='' }
            items_html_code.img({id:`${x}-item`, src:`public/img/${lang_dir}objects/min/${x}.jpg`})
        }

        return items_html_code.export;
    }


    html
    .div({id:'lateral_menu_container', class:'fix'})
        .div({id:'game_options', class:'options'})
            .btn({id:'save-btn'}).img({src:"public/img/accessories/download.svg"}).end()
            .btn({id:'load-btn'}).img({src:"public/img/accessories/hourglass-split.svg"}).end()
            .btn({id:'quit-btn'}).img({src:"public/img/accessories/door-open-fill.svg"}).end()
        .end()

        .div({id:'item_options', class:'options'})
            .btn({id:'use-btn'}).img({src:"public/img/cursors/opened_hand.png"}).end()
            .btn({id:'look-btn'}).img({src:"public/img/cursors/eye.png"}).end()
            .btn({id:'combine-btn'}).img({src:"public/img/accessories/combine.png"}).end()            
            .btn({id:'break-btn'}).img({src:"public/img/accessories/break.png"}).end()
        .end()

        .div({id:'inventory', class:'options'}).html(inventory()).end()
    .end()




    /*********
    *** CSS **
    *********/
    css['#game_options'] = { height:"40px" };
    css['#item_options'] = { height:"80px" };
    

    css['#lateral_menu_container'] = {
        'box-sizing':"border-box",
        right:0,top:0,
        width:200,
        height:"100vh",
        'background-color':"rgba(255,255,255,0.2)",
        padding:5
    };

    css['.options'] = {
        'background-color':"#000",
        display:"flex",
        'justify-content':"space-around",
        'align-items':"center",
        'margin-bottom':10,
        'border-radius':5,
        padding:10
    };

    css['#item_options > button'] = {
        'background-color':"transparent",
        'box-sizing':"content-box",
        'border':"none",
        'border-radius':5,
        height:64,
        width:32,
        'text-align':'center'
    };

    css['#look-btn'] = {'background-color':"rgba(200,255,200,0.3)"};

    css['#inventory'] = {
        display:"block",
        'text-align':"center",
        'overflow':"auto",
        'max-height':"calc(100vh - 220px)"
    };

    css['#inventory > img'] = {
        'margin-bottom':10,
        cursor:"pointer",
        'border-radius':10
    };



    /***********
    ** EVENTS **
    ************/

    /* GAME BUTTONS */
    events.push(()=>{
        $("#game_options > button").on('click',function(){
            let action = $(this).attr('id').split('-')[0];
            switch(action)
            {
                case 'save':Player.save_game();break;
                case 'load':Player.load_game();break;
                case 'quit':
                    let leave = confirm(Trad.word('_sure_leave'));
                    if(leave===true){ document.location.href = 'https://www.sabeludia.com' }
                    break;
                default: console.error(action+" -> is invalid game action.");break;
            }
        })
    });

    /* ITEMS BUTTONS */
    events.push(()=>{
        $("#item_options > button").on('click',function(){
            $("#item_options > button").css({'background-color':"transparent"});
            $(this).css({'background-color':"rgba(200,255,200,0.3)"});
            Player.item_option = $(this).attr('id').split('-')[0];
        })
   });

    /* ITEMS CLICK */
    events.push(()=>{
        $("#inventory > img").on('click',function(){
            let item = $(this).attr('id').split('-')[0];
            switch(Player.item_option)
            {
                case 'use':
                    Player.did._.using_object = item;
                    break;
                case 'look':
                    WebPage.unmold.look_window({item}).append();
                    break;
                case 'combine':
                    if(Player.to_combine.includes(item))
                    {
                        Player.to_combine.splice( Player.to_combine.indexOf(item), 1);
                        $(this).css('border','none');
                    }
                    else
                    { 
                        Player.to_combine.push(item);
                        $(this).css('border','2px solid #00b6c8');
                    }
                    let combination = Player.to_combine.sort().join(',');
                    //console.warn('combination => '+combination);
                    switch(combination)
                    {
                        case 'o1,o2,o3':
                            Place.loose('o1');
                            Place.loose('o2');
                            Place.loose('o3');
                            Place.take('o4',true, 'no', 'no');
                            break;
                        case 'o13,o5,o6,o7':
                            Place.loose('o5');
                            Place.loose('o6');
                            Place.loose('o7');
                            Place.loose('o13');
                            Place.take('o8',true, 'no', 'no');
                            Player.game_vars._.discover_map = true;
                            break;
                        case 'm10,m8':
                            Place.message(Trad.word('_same_person'));
                            break;
                        default:return;
                    }
                    break;
                case 'break':
                    if(item[0]==='m'){ Place.message(Trad.word('_no_break_memory'));return; }
                    if(item==='o12'){ Place.take('o6',true, 'no', 'no'); Place.loose('o12') }
                    else{ Place.message(Trad.word('_why_angry')) }
                    break;
            }
            Events.close_lateral_menu();
        })
    })

    return {html:html.export, css, events};
}];