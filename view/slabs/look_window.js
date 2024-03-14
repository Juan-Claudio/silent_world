import Place from '../../controller/Place.js';
import Player from '../../controller/Player.js';
import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";
import smartphone from './smartphone.js';

/*data
* .
*/
export default ['look_window',function(data){
    const html = new Html();
    let css = {};
    let events = [];
    let lang_dir = (Trad.choosen_language===1 && Player.es_objects.includes(data.item)) ? 'es/' : '';
    let smartphone_code = (data.item==='o29') ? smartphone() : {};
    let smartphone_html = (data.item==='o29') ? smartphone_code.html : '' ;
    let background_item = (data.item==='o29') ? 'transparent' : `url('public/img/${lang_dir}objects/max/${data.item}.gif`;

    html
    .div({id:'look_window', class:'fix'})
        .div({id:'item_view'}).html(smartphone_html).end()
        .div({id:"look_window_close"}).end()
    .end()




    css['#look_window'] = {
        'background-color':"#000",
        'background-image':`url('public/img/accessories/backpack_background.jpg`,
        'background-position':"center",
        'background-size':"cover",
        'background-repeat':"no-repeat",
        width:"100vw",
        height:"100vh",
        position:'fixed',
        left:0, top:0
    };

    css['#item_view'] = {
        
        'background-image':background_item,
        'background-position':"center",
        'background-repeat':"no-repeat",
        width:1200,
        height:675,
        position:'fixed',
        left:"calc(50% - 600px)",
        top:"calc(50% - 337px)"
    };

    css['#look_window_close'] = {
        'background-image':`url('public/img/accessories/white_cross.gif`,
        width:64,
        height:64,
        position:'fixed',
        right:10,
        top:10,
        cursor:"pointer"
    };



    events.push(()=>{
        $("#look_window_close").on('click',function(){
            WebPage.look_window.pop();
        })
    });

    events.push(()=>{
        $("#item_view").on('click',function(){
            lang_dir = (Trad.choosen_language===1) ? 'es/' : '';
            switch(data.item)
            {
                case 'o10':
                    //converted in o9
                    Place.loose('o10');
                    Place.take('o9',true,'no','no','no');
                    $("#item_view").css({'background-image':`url('public/img/${lang_dir}objects/max/o9.gif`});
                    break;
                case 'o11':
                    //converted in o28
                    Place.loose('o11');
                    Place.take('o28',true,'no','no','no');
                    $("#item_view").css({'background-image':`url('public/img/${lang_dir}objects/max/o28.gif`});
                    break;
                case 'o24':
                    //in memory m10
                    Place.memorize('m10',true,'no');
                    break;
                case 'o27':
                    //navigate in pages: o36,37,38,40
                    let pages = ['o27','o36','o37','o38','o40'];
                    let curr_page = $("#item_view").css('background-image').split('/').reverse()[0].replace(/(.gif)|("\))/g,'');
                    //console.log('curr_page => '+curr_page)
                    let next_page = pages.indexOf(curr_page)+1;
                    //console.log('indexOf curr_page +1 => '+next_page)
                    if(next_page===pages.length){ next_page=1 }
                    //console.log('NEXt PAGE => '+pages[next_page])
                    $("#item_view").css({'background-image':`url('public/img/objects/max/${pages[next_page]}.gif`});
                    break;
                case 'o34':
                    //converted in o41
                    Place.loose('o34');
                    Place.take('o41',true,'no','no','no');
                    $("#item_view").css({'background-image':`url('public/img/${lang_dir}objects/max/o41.gif`});
                    break;
                case 'o39':
                    //navigate in pages: o42
                    $("#item_view").css({'background-image':`url('public/img/objects/max/o42.gif`});
                    break;
                default:break;
            }
        })
    });

    if(data.item==='o29')
    {
        Object.assign(css, smartphone_code.css);
        events = events.concat(smartphone_code.events);
    }

    return {html:html.export, css, events};
}];