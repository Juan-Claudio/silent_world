import Place from '../../controller/Place.js';
import Player from '../../controller/Player.js';
import Randata from '../../../libs/jstools/Randata.js';
import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";

export default function()
{
    const html = new Html();
    const css = {};
    const events = [];

    const width = 324;
    const height = 675;
    const x = `calc(50% - ${width/2}px)`;
    const y = `calc(50% - ${height/2}px)`;
    const d = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday','thursday','friday','saturday'];
    const day = Trad.word(days[d.getDay()]);

    let date = (d.getDate()<10) ? '0'+d.getDate() : d.getDate();
        date += '/';
        date += (d.getMonth()+1<10) ? '0'+(d.getMonth()+1) : d.getMonth()+1;
        date += '/';
        date += d.getFullYear();
    

    /***********
    *** HTML ***
    ************/
    function all_contacts()
    {
        const contacts_name = ['Mickey','president_of_republic','spanish_presidence','french_president_cabinet','sabeludia_headquarter','europe_emergency_number','foreign_emergency_number'];
        const code = new Html();
        for(let i = 0; i<contacts_name.length; i++)
        {
            code.div({id:`smartphone_contact_${i}`}).text(Trad.word(contacts_name[i])).end()
        }
        return code.export;
    }

    function keyboard()
    {
        const keys_sub = ['⚯','ABC','DEF','#','GHI','JKL','MNO','+','PQRS','TUV','WXYZ',''];
        const keys_sup = ['1','2','3','←','4','5','6','0','7','8','9',''];
        const keyboard_code = new Html().table();
        let key_text = '';
        
        for(let i = 0; i<keys_sub.length; i++)
        {
            key_text = keys_sup[i] + '<div class="sub">' + keys_sub[i] + '</div>';
            
            if(keys_sub[i]===''){ key_text = new Html().img({id:"call_number-btn", src:"public/img/smartphone/call_key.png"}).export }
            
            if(i==0 || i==4 || i==8){ keyboard_code.tr() }

            keyboard_code.td().text(key_text).end()

            if(i==3 || i==7 || i==11){ keyboard_code.end() }
        }
        return keyboard_code.end().export;
    }


    html
    //SCREENSAVER LAYER
    .div({id:'smartphone_screensaver', class:'smartphone_layer curs-pointer'})
        .div({id:'smartphone_date'}).text(day+'<br>'+date).end()
    .end()

    //DESKTOP LAYER
    .div({id:'smartphone_desktop', class:'smartphone_layer hidden'})
        .img({id:'smartphone_gps-btn', src:'public/img/smartphone/gps_icon.png', class:"abs curs-thumb"})
        .img({id:'smartphone_call-btn', src:'public/img/smartphone/call_icon.png', class:"abs curs-thumb"})
        .img({id:'smartphone_mail-btn', src:'public/img/smartphone/aroba_icon.png', class:"abs"})
        .img({id:'smartphone_sms-btn', src:'public/img/smartphone/message_icon.png', class:"abs"})
        .img({id:'smartphone_picture-btn', src:'public/img/smartphone/picture_icon.png', class:"abs"})
    .end()

    //CALLS LAYER
    .div({id:'smartphone_call', class:'smartphone_layer hidden'})
        .div({id:"smartphone_contacts", class:"abs"}).html(all_contacts()).end()
        .div({id:"smartphone_typing_number", class:"abs"})
            .div({class:'sub'}).end()
        .end()
        .div({id:"smartphone_keyboard", class:"abs"}).html(keyboard()).end()
    .end()

    //GPS LAYER
    .div({id:'smartphone_gps', class:'smartphone_layer hidden'})
        .div({id:'where_to_go', class:"map_point"})
            .img({src:'public/img/smartphone/itinerary.png'})
        .end()
        .div({id:'gps_home', class:"map_point"})
            .img({src:'public/img/smartphone/house.png'})
        .end()
        .div({id:'gps_savoieville', class:"map_point hidden"})
            .img({src:'public/img/smartphone/building.png'})
        .end()
        .div({id:'gps_tchequeville', class:"map_point hidden"})
            .img({src:'public/img/smartphone/various_buildings.png'})
        .end()
    .end()

    //GPS FORM
    .div({id:"gps-form", class:'hidden'})
        .p().input({id:'city-input', type:"text", placeholder:Trad.word('city')}).end()
        .p().text(Trad.word('latitude')).end()
        .p()
            .input({id:'deg_lat', type:"number"}).text('°')
            .input({id:'min_lat', type:"number"}).text("'")
            .input({id:'sec_lat', type:"number"}).text('"')
            .br(2).input({id:'card_lat', type:"text"})
        .end()
        .p().text(Trad.word('longitude')).end()
        .p()
            .input({id:'deg_lon', type:"number"}).text('°')
            .input({id:'min_lon', type:"number"}).text("'")
            .input({id:'sec_lon', type:"number"}).text('"')
            .br(2).input({id:'card_lon', type:"text"})
        .end()
        .p().btn({id:'reveal-btn'}).text(Trad.word('go')).end(2)
    .end()

    //BUTTON GOTO DESKTOP
    .div({id:'goto_desktop', class:"curs-thumb"}).end()


    /***********
    **** CSS ***
    ************/
   //GENERAL
    css['#goto_desktop'] = {
        'border-radius':"100%",
        width:60,height:61,
        position:'absolute',
        left:`calc(50% - 30px)`,
        bottom:20
    };
    
    css['.smartphone_layer'] = {
        'background-image':"url('public/img/objects/max/o29.gif')",
        width,height,
        position:'fixed',
        left:x,top:y
    };

    //LAYER -> screensaver
    css['#smartphone_date'] = {
        'background-color':"rgba(0,0,0,0.6)",
        'border-radius':20,
        color:'#fff',
        width:252,
        height:50,
        position:'fixed',
        left:`calc(50vw - 126px)`,
        top:`calc(50vh - 25px)`,
        'text-align':"center",
        'padding-top':10
    };

    //LAYER -> desktop
    css['#smartphone_gps-btn'] = { top:`calc(50% - 32px)`, left:`calc(50% - 32px)` }
    css['#smartphone_call-btn'] = { bottom:100, left:31 }
    css['#smartphone_sms-btn'] = { bottom:100, left:98 }
    css['#smartphone_mail-btn'] = { bottom:100, left:165 }
    css['#smartphone_picture-btn'] = { bottom:100, left:232 }

    //LAYER -> call
    css['#smartphone_contacts'] = {
        'background-color':"rgba(0,0,0,0.4)",
        'box-sizing':'border-box',
        width:271,height:180,
        top:125, left:28,
        'text-align':"center",
        color:"#fff",
        'font-weight':"bold",
        padding:5
    };

    css['#smartphone_contacts > div'] = {
        'margin-bottom':5,
        cursor:'pointer'
    }

    css['#smartphone_typing_number'] = {
        'background-color':"rgba(255,255,255,0.6)",
        'border-radius':15,
        width:271,height:68,
        top:305, left:28,
        'font-size':30,
        'text-align':"center",
        'padding-top':5,
        'box-sizing':'border-box'
    };
    

    css['#smartphone_keyboard'] = {
        width:271,
        bottom:95, left:28
    };

    css['#smartphone_keyboard td'] = {
        'background-color':"rgba(0,0,0,0.4)",
        'border-radius':10,
        width:64, height:64,
        'text-align':"center",
        'font-size':30,
        color:"#fff",
        cursor:"pointer"
    };

    css['.sub'] = { 'font-size':15 }

    //LAYER -> GPS
    css['.map_point'] = {
        'background-color':"rgba(0,0,139,0.8)",
        'border-radius':"100%",
        position:'absolute',
        width:64,height:64,
        display:'flex',
        'justify-content':"center",
        'align-items':"center",
        cursor:'pointer'
    };

    css['#gps_home'] = {left:220,bottom:160};
    css['#gps_savoieville'] = {left:120,bottom:234};
    css['#gps_tchequeville'] = {left:56,bottom:360};
    css['#where_to_go'] = { right:30,top:130 };

    //LAYER GPS FROM
    css['#gps-form'] = {
        'background-color':"rgba(0,0,0,0.75)",
        'border-radius':15,
        color:'#fff',
        'font-weight':"bold",
        'text-align':"center",
        width:width-80,height:340,
        position:'absolute',
        left:`calc(50% - ${(width-80)/2}px)`,
        top:`calc(55% - 170px)`
    };
    css['input[type="number"]'] = { width:50 }
    css['input[type="text"]'] = { width:80 }
    

    /***********
    ** EVENTS **
    ************/

    //button goto desktop
    events.push(()=>{
        $('#goto_desktop, #smartphone_screensaver').on('click', function(){
            $('.smartphone_layer').attr('class', 'smartphone_layer hidden');
            $("#smartphone_desktop").attr('class', 'smartphone_layer');
        })
    })

    //button to call
    events.push(()=>{
        $('#smartphone_call-btn').on('click', function(){
            $('.smartphone_layer').attr('class', 'smartphone_layer hidden');
            $("#smartphone_call").attr('class', 'smartphone_layer');
        })
    })

    //button goto GPS
    events.push(()=>{
        $('#smartphone_gps-btn').on('click', function(){
            $('.smartphone_layer').attr('class', 'smartphone_layer hidden');
            $("#smartphone_gps").attr('class', 'smartphone_layer');
            $('.smartphone_layer').css({'background-image':"url('public/img/smartphone/bg_map.gif')"});
            if(Player.game_vars._.savoie){ $("#gps_savoieville").attr('class','map_point'); }
            if(Player.game_vars._.tcheque){ $("#gps_tchequeville").attr('class','map_point'); }
        })
    })

    //CALL LAYER EVENTS
    events.push(()=>{
        $("#smartphone_keyboard td").on('click',function(){
            let char_typed = $(this).html().split('<')[0];
            let info = '';
            
            //make phone call in events of #call_number-btn ↓
            if(char_typed===''){ return }

            let div_phone_number_html = $("#smartphone_typing_number").html();
            
            let number_typed = div_phone_number_html.split('<')[0];

            if(number_typed==='')
            {
                $("#smartphone_typing_number").html(char_typed+div_phone_number_html);
                return;
            }

            
            number_typed = number_typed.replaceAll(' ','');

            if(char_typed==='←')
            {
                number_typed = number_typed.substring(0,number_typed.length-1);
            }
            else{ number_typed += char_typed }

            if(number_typed.length>10){ return; }

            switch(number_typed)
            {
                case '0601010000':
                case '601010000':info='president_of_republic' ;break;
                case '0901110011':
                case '901110011':info="sabeludia_headquarter"; break;
                case '0171737738':
                case '171737738':info="Mickey"; break;
                case '911':info="foreign_emergency_number";break;
                case '112':info="europe_emergency_number";break;
                case '0142928100':info="french_president_cabinet";break;
                case '913353535':info="spanish_presidence";break;
                case '':info='';break;
                default:info="unknown";break;
            }

            let sep_nb = (number_typed.length%2===0) ? 2 : 3;
            let new_number = '';
            let k = 1;

            for(let i = 0; i<number_typed.length; i++)
            {
                new_number += number_typed[i];
                if(i!==0 && k%sep_nb===0 && i!==(number_typed.length-1)){ new_number+=' ' }
                k++;
            }

            $("#smartphone_typing_number").html(div_phone_number_html.replace(/[\d ]+</,new_number+'<'));
            $('#smartphone_typing_number > div').text(Trad.word(info));
        })
    });

    events.push(()=>{
        $('#smartphone_contacts > div').on('click', function(){
            let div_phone_number_html = $("#smartphone_typing_number").html();
            let id = $(this).attr('id').split('_')[2];
            let text = $(this).text();
            let number = '';
            switch(id)
            {
                case '0':number = '171 737 738';break;
                case '1':number = '601 010 000';break;
                case '2':number = '913 353 535';break;
                case '3':number = '01 42 92 81 00';break;
                case '4':number = '09 01 11 00 11';break;
                case '5':number = '112';break;
                case '6':number = '911';break;
            }
            $("#smartphone_typing_number").html(div_phone_number_html.replace(/[\d ]*</,number+'<'));
            $('#smartphone_typing_number > div').text(text);
        })
    });

    events.push(()=>{
        $("#call_number-btn").on('click',function(){
            let number_typed = $("#smartphone_typing_number").html().split('<')[0];
            const infos = ['_nobody','_unallocated','<p>bip bip bip...</p>',`_answering_machine+ +${number_typed}</p>`]
            let info = '';

            switch(number_typed)
            {
                case '06 01 01 00 00':
                case '601 010 000':info='_not_near_people' ;break;
                case '09 01 11 00 11':
                case '901 110 011':info="_closed_but"; break;
                case '01 71 73 77 38':
                case '171 737 738':info="_mickey_busy"; break;
                case '911':info="_emergency_busy";break;
                case '112':info="_emergency_busy";break;
                case '01 42 92 81 00':info="_not_possible_call_out";break;
                case '913 353 535':info="_not_possible_call_out";break;
                case '':return;
                default:info="_unknown";break;
            }
            if(info==='_unknown'){ info = Randata.in(infos); }
            Place.message(info);
        })
    });

    //GPS LAYER EVENTS
    events.push(()=>{
        $('.map_point').on('click',function(){
            let id = $(this).attr('id');
            switch(id)
            {
                case 'gps_home':
                    Place.goto('z1m1');
                    Place.goto_layer('0');
                    WebPage.look_window.pop();
                    break;
                case 'gps_savoieville':
                    Place.goto('z2r1');
                    Place.goto_layer('0');
                    WebPage.look_window.pop();
                    break;
                case 'gps_tchequeville':
                    if(!Player.did._.unlock_car_code)
                    {
                        Player.info('_need_car_to_go');
                        break;
                    }
                    Place.goto('z3r1');
                    Place.goto_layer('0');
                    WebPage.look_window.pop();
                    break;
                case 'where_to_go':
                    let itinerary_class = $("#gps-form").attr('class');
                    if(itinerary_class==='hidden')
                    {
                        $("#gps-form").attr('class','');
                    }
                    else
                    {
                        $("#gps-form").attr('class','hidden');
                    }
                    break;
            }
        })
    });

    events.push(()=>{
        $('#reveal-btn').on('click',function(){
            let city = $('#city-input').val().toLowerCase();
            let deg_lat = parseInt($('#deg_lat').val());
            let min_lat = parseInt($('#min_lat').val());
            let sec_lat = parseInt($('#sec_lat').val());
            let card_lat = $('#card_lat').val().toLowerCase();

            let deg_lon = parseInt($('#deg_lon').val());
            let min_lon = parseInt($('#min_lon').val());
            let sec_lon = parseInt($('#sec_lon').val());
            let card_lon = $('#card_lon').val().toLowerCase();

            let lat = deg_lat+''+min_lat+''+sec_lat;
            let lon = deg_lon+''+min_lon+''+sec_lon;
            let card = card_lat+card_lon;

            let savoie_ok = city===Trad.word('savoieville');
                savoie_ok &= card===Trad.word('north')+Trad.word('east');
                savoie_ok &= lat==='45120';
                savoie_ok &= lon==='6402';

            let tcheque_ok = city===Trad.word('tchequeville');
                tcheque_ok &= card===Trad.word('north')+Trad.word('east');
                tcheque_ok &= lat==='50510';
                tcheque_ok &= lon==='142514';

            if(savoie_ok)
            {
                Place.message('¡+Savoieville+ +unlocked+!');
                $("#gps_savoieville").attr('class','map_point');
                Player.game_vars._.savoie = true;
                return;
            }
            else if(tcheque_ok)
            {
                Place.message('¡+Tchequeville+ +unlocked+!');
                $("#gps_tchequeville").attr('class','map_point');
                Player.game_vars._.tcheque = true;
                return;
            }

            Place.message('_wrong_coordinates');
        })
    });


    return {html:html.export, css, events}
}