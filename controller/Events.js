import Trad from "../../libs/jstools/Trad.js";
import traductions from "../model/trads.js";

//WebPage and all slubs and molds
import WebPage from "../../libs/jstools/slabjs/WebPage.js";
import elevator_screen from "../view/slabs/elevator_screen.js";
import floors_menu from "../view/slabs/floors_menu.js";
import lateral_menu from "../view/slabs/lateral_menu.js";
import popwait from '../view/slabs/popwait.js';
import backlayer from '../view/slabs/backlayer.js';
import popinfo from '../view/slabs/popinfo.js';
import audio from '../view/slabs/audio.js';
import car_code from '../view/slabs/car_code.js';
import computer from "../view/slabs/computer.js";
import text_editor from "../view/slabs/text_editor.js";
import mailbox from "../view/slabs/mailbox.js";
import look_window from "../view/slabs/look_window.js";
import popchoice from "../view/slabs/popchoice.js";

import Player from "./Player.js";
import Where_do_I from "./Where_do_I.js";
import Decode from "./Decode.js";
//import Place from "./Place.js";


export default class Events
{
    static initiated = false;
    static click_ival = 0;
    static timeout_click_count_reinit = 1000; //ms

    static world_window = '#world_window';

    static init()
    {
        $(document).ready(()=>{

            Trad.load_trads(traductions);
            Trad.set_language();
            $('title').text( Trad.word('silent_world') );

            this.load_slabs_molds();
            
            this.load_data(function(){
                Player.refresh('z1m1');
                Player.reset_place('z1m1');
                Events.click();
                Events.cursor_move();
                Events.lateral_menu();

                console.info('GAME ALL LOADED');
            });
        })
    }

    static load_slabs_molds()
    {
        //imports
        WebPage.import([
            lateral_menu,
            popwait,
            backlayer,
            popinfo,
            audio,
            elevator_screen,
            car_code,
            computer,
            look_window,
            popchoice
        ]);
        WebPage.set_container_selector('#elevator_screen');
        WebPage.import_one(floors_menu()[0], floors_menu()[1]);
        WebPage.set_container_selector('.computer_background');
        WebPage.import_one(text_editor[0], text_editor[1]);
        WebPage.import_one(mailbox[0], mailbox[1]);
        WebPage.set_container_selector('body');

        //appends
        WebPage.backlayer.append().hide();
        WebPage.popwait.append().hide();
        WebPage.car_code.append().hide();
    }

    static load_data(actions_when_loaded)
    {
        WebPage.backlayer.show();
        WebPage.popwait.show();
        Player.load_data();
        let ival = setInterval(function(){
            if(Player.did.waiting_for_loading==undefined)
            {
                clearInterval(ival);
                WebPage.popwait.hide();
                WebPage.backlayer.hide();
                actions_when_loaded();
            }
        },500)
    }
    
    static click()
    {
        $(this.world_window).on('click',()=>{
            
            let zones = Where_do_I.click(this.world_window.substring(1));
            let index = '';
            let click_count = {};

            Events.close_lateral_menu();
            
            for(let i = 0; i<zones.length;i++)
            {
                index = zones[i];
                click_count = Player.did._.these_clicks;
                if(click_count[index]!=undefined){ click_count[index]++; }
                else(click_count[index]=1)
                this.click_counter();
            }
            
            Decode.all_fction( zones )

            if(Player.is._.using_object!==false){ Player.is._.using_object=false }
        })
    }

    static cursor_move()
    {
        $(this.world_window).on('mousemove',()=>{
            
            Decode.cursor(
                this.world_window,
                Where_do_I.move(this.world_window.substring(1))
            );
                        
        });
    }

    static click_counter()
    {
        clearTimeout(this.click_ival);
        if(JSON.stringify(Player.did._.these_clicks)!='{}')
        {
            this.click_ival = setTimeout(() => {
                Player.did._.these_clicks={};
            }, this.timeout_click_count_reinit);
        }
    }

    static lateral_menu()
    {
        $("#lateral_menu-btn").on('click', function(){
            if($("#lateral_menu_container").length===0)
            {
                WebPage.unmold.lateral_menu().append();
                $("#lateral_menu-btn").css('right','203px');
                $("#lateral_menu-btn > img").attr('src','public/img/accessories/caret-right-fill.svg');
                //Player.infos();
                return;
            }
            Events.close_lateral_menu();
        });
    }

    static close_lateral_menu()
    {
        if($("#lateral_menu_container").length!==0)
        {
            WebPage.lateral_menu.pop();
            $("#lateral_menu-btn").css('right',0);
            $("#lateral_menu-btn > img").attr('src','public/img/accessories/caret-left-fill.svg');
            Player.item_option = 'look';
            Player.to_combine = [];
        }
    }
}
if(Events.initiated===false){ Events.init(); Events.initiated=true }