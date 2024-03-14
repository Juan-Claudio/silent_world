import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";

export default ['popinfo', function(data)
{
    const width = 400;
    const height = 140;
    const className = 'popinfo';
    const css = {};
    
    css[`.${className}`] = {

        'background-color':'rgba(233, 233, 237,0.9)',
    
        'border-top':'solid 14px #618d90',
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

    css[`.${className} *`] = { 'margin-top':15, 'margin-bottom':15 };

    css[`.${className}_btn`] = {
        'margin-top':5,
        'margin-bottom':5,
        width:"90%",
        border:"solid 1px #888",
        'border-radius':10,
        'background-color':"rgba(0,0,0,0.1)"
    };

    css[`.${className}_btn:hover`] = {
        'background-color':"#000"
    };
    
    const html = new Html()
        .div({ class:className+' fix curs-default' }) // flex fcol sparound-c
            .btn({ class:className+'_btn mt-2 curs-thumb' })
                .text(Trad.word('read'))
            .end()
            .text(data.message)
            .btn({ class:className+'_btn mt-2 curs-thumb' })
                .text(Trad.word('read'))
            .end()
        .end().export
    
    const events = [ ()=> $('.'+className+'_btn').on('click', function(){
        WebPage.popinfo.pop();
        if(WebPage.popinfo.size()==0){ WebPage.backlayer.hide() }
    }) ];

    return {html,css,events};
}];
