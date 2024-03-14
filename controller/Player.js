import Trad from "../../libs/jstools/Trad.js";
import Decode from "./Decode.js";
import WebPage from "../../libs/jstools/slabjs/WebPage.js";
import Html from "../../libs/jstools/slabjs/Html.js";
import Place from "./Place.js";

export default class Player
{
    //file es language
    static es_places = [
        'z1m4_z2','z2re5','z2re5_taken',
        'z2re6_taken1', 'z3me2_z8','z3me7'
    ];
    static es_objects = [
        'm5', 'm6', 'm11', 'o8', 'o9',
        'o13','o14','o22','o23','o26',
        'o28','o30','o31','o32','o35',
        'o41'
    ];
    
    //function vars
    static item_option = 'look';
    static to_combine = [];
    
    //environment_vars
    static did = {waiting_for_loading:true};
    static hears = {waiting_for_loading:true};
    static is = {waiting_for_loading:true};
    static have = {waiting_for_loading:true};
    static game_vars = {waiting_for_loading:true};

    static infos()
    {
        console.log(this.is);
    }

    static load_data()
    {
        $.post('model/game_data.json', function(data,status){
            if(status=='success'){
                Player.did=data;
                Player.hears=Player.did;
                Player.is=Player.did;
                Player.have=Player.did;
                Player.game_vars=Player.did;
            }
            else{ console.error(status); }
        }, 'json')
    }

    static load_game()
    {
        let message = Trad.sentence('_paste_your_game_data_here');
            message+= '<br>'+new Html().input({id:'data-input', type:'text', style:'width:90%', value:''}).export
        WebPage.unmold.popchoice({
            message,
            option1:Trad.word('load_data'),
            option2:Trad.word('close'),
            event1: function(){
                let data = $('#data-input').val();
                Player.game_vars._ = JSON.parse(data);
                Player.info( Trad.sentence('¡+Game_loaded+!') );
                Place.goto(Player.game_vars._.into);
            },
            event2: function(){}
        }).append();
    }

    static save_game()
    {
        WebPage.unmold.popchoice({
            message:Trad.sentence('_save_text_choice_copy+<br><br>+_save_text_choice_save'),
            option1:Trad.word('save_data'),
            option2:Trad.word('copy_data'),
            event1: function(){ Player.info(Trad.sentence('<p>+not_available_yet+</p>')) },
            event2: function(){ 
                navigator.clipboard.writeText(JSON.stringify(Player.game_vars._));
                Player.info( Trad.sentence('¡+Data_copied+!') );
            }
        }).append()
    }
    
    static info(mess)
    {
        WebPage.backlayer.show();
        WebPage.unmold.popinfo({message:Trad.sentence(mess)}).append();
    }

    static reset_place(zone)
    {
        let autoaction_id = '-10,-10,-1,-1';

        if(WebPage.audio!=undefined) WebPage.audio.pop();

        if(Player.game_vars[zone][autoaction_id]!= undefined
            && Player.game_vars[zone][autoaction_id]['auto']!=undefined)
        {
            Decode.all_fction([autoaction_id], 'auto');
        }
    }

    static refresh(zone)
    {
        let lang_dir = '';
        let back_precision = Player.is._.back_precision[zone] ?? '';
        let back = new Image();

        if(Trad.choosen_language===1 && this.es_places.includes(zone+back_precision))
        {
            lang_dir = 'es/';
        }

        back.src = `public/img/${lang_dir}places/${zone}${back_precision}.jpg`;
        
        //TODO add change back with time to do animate gif
        back.onload = function(){
            let ctx = document.getElementById('world_window').getContext("2d");
            ctx.drawImage(back, 0, 0);
        }                
    }
}
