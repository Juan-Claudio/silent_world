import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";
import Randata from "../../../libs/jstools/Randata.js";

/*data
* .id
*/
export default ['computer', function(data)
{
    function change_class(selector, oldClass='', newClass='')
    {
        if(oldClass===''){ $(selector).attr('class', newClass); return; }
        let className = $(selector).attr('class');
        $(selector).attr('class', className.replace(oldClass,newClass));
    }
    function hide(selector, oldClass=''){ change_class(selector, oldClass, 'hidden') }
    function show(selector, newClass=''){ change_class(selector, 'hidden', newClass); }
    
    const id = 'computer_of_'+data.id;
    const html = new Html();
    const css = {};
    const events = [];

    const pass_width = 350;
    const pass_height = 100;

    const days = ['sunday', 'monday', 'tuesday', 'wednesday','thursday','friday','saturday']
    const hour = Randata.full_hour();
    const date = new Date();
    const day = Trad.word(days[date.getDay()]);

    let ddmmyyyy = day+' · ';
    ddmmyyyy += (date.getDate()<10) ? '0'+date.getDate() : date.getDate();
    ddmmyyyy += '/';
    ddmmyyyy += (date.getMonth()+1<10) ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    ddmmyyyy += '/';
    ddmmyyyy += date.getFullYear();
    ddmmyyyy += ' · '+hour;

    let try_count = 3;

    html        
    .div({ class:"computer_background fix" })

        .div({ id:id+"_exit", class:'fix curs-b' }).end()

        .div({ id:id+"_password", class:'fix hidden fcol-c' })
            .input({ id:id+"_pass", type:"password", placeholder:Trad.word('pass_placeholder') })
            .btn({ id:id+"_btn_enter" }).text(Trad.word('enter')).end()
            .p({ id:id+"_error_txt" }).end()
        .end()

        .div({id:id+"_menuBar", class:'hidden'})
            .img({ id:id+"_start", class:'curs-pointer', src:"public/img/computer/earth.png", width:"28px", title:"démarrer"})

            .div({ id:id+"_hour", title:Trad.word("date_and_time") })
                .text(ddmmyyyy)
            .end()
        .end()

        .img({ id:id+"_file1", class:"computer_file hidden", src:"public/img/computer/icon1.png", width:"50px" })
        .img({ id:id+"_file2", class:"computer_file hidden", src:"public/img/computer/icon2.png", width:"50px" })
        .img({ id:id+"_file3", class:"computer_file hidden", src:"public/img/computer/icon3.png", width:"50px" })
    
    .end()
    

    

    css['#'+id+"_exit"] = {
        left:0, bottom:0,
        width:"100%",
        height:60
    };

    css['.computer_background'] = {
        //BACK
        'background-image': "url('public/img/computer/init_background.jpg')",
        'background-position':"center",
        
        //POSITION
        left:0, top:0,
        'z-index':1,

        //SIZE
        width:'100vw',
        height:'100vh'
    };

    css[`#${id}_password`] = {
        'background-color':"rgba(0,0,0,0.7)",
        padding:10,
        width:pass_width,
        height:pass_height,
        left:`calc(50% - ${pass_width/2}px)`,
        top:`calc(50% - ${pass_height/2}px)`,
        color:"#f00",
        'border-radius':15
    };

    css[`#${id}_pass`] = {
        width:"70%",
        height:20,
        'text-align':"center",
        'margin-bottom':10
    };

    css[`#${id}_btn_enter`] = {
        width:"40%",
        cursor:"pointer"
    };

    css[`#${id}_menuBar`] = {
        'background-color':"#008",
        color:"#fff",
        padding:5
    };

    css['.computer_file'] = {
        margin:20,
        cursor:"pointer"
    };

    function submit(){
        let granted_house = data.id === 'house';
        granted_house &= $(`#${id}_pass`).val().toLowerCase()==='jdr154lk';

        let granted_cave = data.id === 'cave';
        granted_cave &= $(`#${id}_pass`).val()==='juMAnji';

        if(granted_house || granted_cave)
        {
            let index = (data.id=='house') ? 2 : 3;
            hide(`#${id}_password`, 'flex'); //no hide -> remove better?
            show(`#${id}_menuBar`, 'flex spatween-c'); //menu bar, icons
            show('#'+id+"_file1");
            show('#'+id+"_file"+index);
            
            $('.computer_background').css({
                'background-image':'none',
                'background-color':"#000"
            })
        }
        else
        {
            try_count--;
            if(try_count<=0){ try_count=3; }
            $(`#${id}_error_txt`).text(Trad.sentence('Remaining+:')+' '+try_count);
        }
    }


    events.push(
        ()=>{ $('#'+id+"_exit").on('click', ()=>{
            if(WebPage.text_editor!=undefined){ WebPage.text_editor.pop() }
            if(WebPage.mailbox!=undefined){ WebPage.mailbox.pop() }
            WebPage.computer.pop();
        }) }
    );

    events.push(()=>{ $('.computer_background').on('click', function(){
        show(`#${id}_password`,'flex');
        $('.computer_background').off('click');
    }) });

    events.push(()=>{ $(`#${id}_btn_enter`).click( ()=>{submit()} ) });

    events.push(()=>{ $('#'+id+"_pass").on('keyup',function(e){ 
        if(e.which==13)submit();
    }) });

    events.push(()=>{
        $('#'+id+"_file2").on('click',()=>{
            WebPage.unmold.text_editor().append();
        })
    });

    events.push(()=>{
        $('#'+id+"_file3").on('click',()=>{
            WebPage.unmold.mailbox().append();
        })
    });


    return {html:html.export,css,events};
}];