import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";
import Place from "../../controller/Place.js";


export default function floors_menu()
{
    let html = new Html();
    let css = {};
    let events = [];


    html = html
    .btn({id:'park-btn', class:'floors_menu-btn curs-goto'}).text(Trad.word('_to_parking')).end()
    .btn({id:'mall-btn', class:'floors_menu-btn curs-goto'}).text(Trad.word('_to_mall')).end()
    .btn({id:'warehouse-btn', class:'floors_menu-btn curs-goto'}).text(Trad.word('_to_warehouse')).end()
    .export


    css['.floors_menu-btn'] = {
        width:"65%"
    }


    events = [
        ()=>{ $('#park-btn').on('click',function(){
            WebPage.elevator_screen.pop();
            Place.goto('z2pa5');
        }) },
        ()=>{ $('#mall-btn').on('click',function(){
            WebPage.elevator_screen.pop();
            Place.goto('z2cc5');
        }) },
        ()=>{ $('#warehouse-btn').on('click',function(){
            WebPage.elevator_screen.pop();
            Place.goto('z2h1');
        }) },
    ]

    return ['floors_menu',{html,css,events}];
}