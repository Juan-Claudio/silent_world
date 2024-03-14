import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";


export default ['popchoice', function(data)
{
    const width = (typeof(data.width)==='number') ? data.width : 400;
    const height = (typeof(data.height)==='number') ? data.height : 200;
    const className = 'popchoice';
    const css = {};
    
    css[`.${className}`] = {

        'background-color':'rgba(233, 233, 237,0.9)',
    
        'border-top':'solid 20px #618d90',
        'border-bottom':'solid 3px #618d90',
        'border-radius':20,

        overflow:"auto",
    
        padding:10,
        
        //POSITION
        left:`calc(50vw - ${width/2}px)`,
        top:`calc(50vh - ${height/2}px)`,
        'z-index':4,
        
        //SIZE
        width,
        height,
        
        //TEXT
        color:'#000',
        'font-family':'Courier',
        'text-align':'center'
    };

    css[`.${className} .i`] = { 'font-size':'small', 'text-align':"left", 'font-style':"italic" };

    css[`.${className} p`] = { 'text-align':"justify" };

    css[`.${className}_btn`] = {
        'margin-left':5,
        'margin-right':5,
        width:"30%",
        border:"solid 1px #888",
        'border-radius':10,
        'background-color':"rgba(0,0,0,0.1)",
        bottom:15
    };
    
    css[`#opt1-btn`] = { left:40 };

    css[`#opt2-btn`] = { right:40 };

    css['#close_popchoice-btn'] = {
        left:`calc(50vw + ${width/2-8}px)`,
        top:`calc(50vh - ${height/2}px)`,
        'z-index':5,
        cursor:'pointer'
    };


    const html = new Html()
        .div({id:'close_popchoice-btn', class:'abs'}).text('×').end()
        .div({ class:className+' abs curs-default' }) // flex fcol sparound-c
            .p().text(data.message).end()
            .btn({ id:'opt1-btn', class:className+'_btn mt-2 curs-thumb abs' })
                .text(data.option1)
            .end()
            .btn({ id:'opt2-btn', class:className+'_btn mt-2 curs-thumb abs' })
                .text(data.option2)
            .end()
        .end().export
    
    const events = [

        ()=>{ WebPage.backlayer.show() },

        ()=>{ $('#opt1-btn').on('click', data.event1) },

        ()=>{ $('#opt2-btn').on('click', data.event2) },

        ()=> $('#close_popchoice-btn, #opt2-btn, #opt1-btn').on('click', function(){
            WebPage.popchoice.pop();
            if(WebPage.popchoice.size()==0){ WebPage.backlayer.hide() }
        })
    ];

    return {html,css,events};
}];
