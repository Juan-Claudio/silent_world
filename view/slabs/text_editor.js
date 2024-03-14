import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";

export default ['text_editor', function(){
    const html = new Html();
    const css = {};
    const events = [];
    
    
    html
    .div({ id:"text_editor_container", class:'fix' })
    
        .div({ id:"text_editor_bar" })
            .div({ style:"color:rgb(180, 185, 248);text-align: left;width:50%;margin-left:5px;" }).text("Vitext | notes.txt").end()
            .div({ id:"text_editor_close" }).text("- + x").end()
        .end()
    
        .text(Trad.word("_sleep_with_keys"))
    
    .end()
    
    
    css['#text_editor_container'] = {
        'background-color': "rgb(180, 185, 248)",
    
        border: "2px ridge blue",
        'border-radius': 5,
        width:"60%",
        height: "85%",
    
        position: 'fixed',
        top:50, left:50,
        'z-index':2
    };
    
    css['#text_editor_container p'] = {
        'margin-left':15
    };
    
    css['#text_editor_close'] = {
        'background-color': "rgb(180, 185, 248)",
    
        border: "2px ridge #00f",
        'border-radius': 5,
        width: "60%",
        height: "85%",
    
        margin:"auto",
        'margin-top': 50
    };
    
    css['#text_editor_bar'] = {
        'background-color': "#008",
                    
        'border-bottom': "2px ridge #00f",
    
        display: "flex",
        'flex-direction': "row",
        'justify-content': "space-around",
    
        width:"100%",
        height:20
    };
    
    css['#text_editor_close'] = {
        /*CURSOR*/
        cursor: "pointer",
    
        /*MARGIN*/
        'margin-right': 10,
    
        /*TEXT*/
        'font-family': "'Courier New', Courier, monospace",
        color: "rgb(180, 185, 248)",
        'text-align': "right",
    
        /*SIZE*/
        width:"50%"
    };
    
    
    events.push(
        ()=>{
            $('#text_editor_close').on('click',()=>{
                WebPage.text_editor.pop();
            })
        }
    );
    
    return {html:html.export, css, events};
}]