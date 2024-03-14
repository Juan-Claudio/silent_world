import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Player from "../../controller/Player.js";
import Place from "../../controller/Place.js";

const chars = ["C","I","K", "L", "M", "N", "O", "P", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Z", "Y", "X", "W"];

function change_char(id, curr_letter, add=true)
{
    let new_index = chars.indexOf(curr_letter)
    new_index = (add) ? new_index+1 : new_index-1;
    if(new_index<0){ new_index = chars.length-1; }
    else if(new_index>chars.length-1){ new_index=0; }

    $('#'+id).html(chars[new_index]);
    goodCode();
}

function goodCode()
{
    let code = '';
    for(let i=0; i<5; i++)
    {
        code+=$('#box'+i).text();
    }
    if(code==="1329N")
    {
        $('#'+id).css('background-image',"url('public/img/accessories/car_code_back_animated.gif')");
        for(let i=0; i<5; i++)
        {
            code+=$('#box'+i).hide();
        }
        Player.did._.unlock_car_code = true;
        setTimeout(()=>{
            WebPage.car_code.hide();
            Place.change_back();
        }, 4000);
    }
}


const id = 'car_code';
const class_name = "code_box curs-goto";
const width = 984;
const height = 584;

const html = new Html();
const css = {};
const events = [];



html
.div({id})
    .div({id:"box0", class:class_name }).text('C').end()
    .div({id:"box1", class:class_name }).text('L').end()
    .div({id:"box2", class:class_name }).text('I').end()
    .div({id:"box3", class:class_name }).text('C').end()
    .div({id:"box4", class:class_name }).text('K').end()
.end()



css['#'+id] = {
	/*BACKGROUND*/
	'background-image': 'url("public/img/accessories/car_code_back_fix.png")',
	'background-position': "center",
	'background-size': "cover",
	
	/*FLEX*/
	display:"flex",
	'justify-content': "center",
	'align-items': "center",

	/*POSITION*/
	position: "absolute",
    left: `calc(50% - ${width/2}px)`,
    top: `calc(50% - ${height/2}px)`,
	'z-index': 8,

	/*SIZE*/
	width,
	height,

	/*BORDER*/
	'border-radius': "15%"
};
css['.code_box'] = {
    /*BACKGROUND*/
	'background-color':"#000",

	/*BORDER*/
	border:"none",
	'border-bottom':"red 3px solid",

	/*MARGING-PADDING*/
	'margin-right': 8,

	/*SIZE*/
	width:80,
	height: 80,

	/*TEXT*/
	color:'#f00',
	'text-align': "center",
	'font-size': "4em"
};



events[0] = ()=>{ $('.code_box').on('click', function(){
    change_char( $(this).attr('id'), $(this).text() );
}) }

events[1] = ()=>{ $('.code_box').on('dbclick', function(){
    change_char( $(this).attr('id'), $(this).text(), false );
}) }

export default [id, {html:html.export, css, events}];