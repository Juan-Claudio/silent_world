import Html from "../../../libs/jstools/slabjs/Html.js";

let id = '';
let css = {};
let html = new Html();

id = 'back_layer';



css['#'+id] = {
    //BACK
    'background-color': 'rgba(0,0,0,0.8)',
    
    //POSITION
    left:0, top:0,

    //SIZE
    width:'100vw',
    height:'100vh',

    "z-index":2
}



html = html.div({ id, class:'fix'}).end().export;



export default ['backlayer', { css, html }];