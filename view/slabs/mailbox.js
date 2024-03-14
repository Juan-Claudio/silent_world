import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";
import Place from "../../controller/Place.js";

export default ['mailbox', function(){
    const html = new Html();
    const css = {};
    const events = [];


    html
    .div({ id:'mail_box_container', class:'window' })
        .div({ class:"bar" })
            .div({ style:"color:rgb(180, 185, 248);text-align: left;width:50%;margin-left:5px;" }).text("Efemail | "+Trad.word('mail_address')).end()
            .div({ id:"mailbox_close", class:'box_close curs-pointer' }).text("- + x").end()
        .end()
        .div({id:'tools_bar'})
            .img({src:'public/img/computer/receive.png', class:'m-2 curs-pointer'})
            .img({id:'write-btn', src:'public/img/computer/write.png', class:'m-2 curs-pointer'})
        .end()
        .div({id:'received_mails'})
            .table()
                .tr({class:'txt-bold txt-center'})
                    .td()
                        .img({ src:'public/img/computer/box.png' })
                    .end()

                    .td()
                        .img({ src:'public/img/computer/not_read.png' })
                    .end()

                    .td()
                        .img({ src:'public/img/computer/attachment.png' })
                    .end()

                    .td().text(Trad.word('subject')).end()
                    .td().text(Trad.word('from')).end()
                    .td().text(Trad.word('date')).end()
                    .td().text(Trad.word('size')).end()
                .end()
                .tr({id:'received_mail', class:'txt-center curs-pointer'})
                    .td()
                        .img({ src:'public/img/computer/box.png' })
                    .end()

                    .td()
                        .img({id:'mail_read_state', src:'public/img/computer/not_read.png' })
                    .end()

                    .td().text('×').end()
                    .td().text(Trad.word('emergency_mail_subject')).end()
                    .td().text('Admin').end()
                    .td().text('17-07-2023').end()
                    .td().text('1ko').end()
                .end()
            .end()
        .end()
        .div({id:'reading_zone'}).end()
    .end()

    .div({id:'write_mail', class:'window hidden'})
        .div({ class:"bar" })
            .div({ style:"color:rgb(180, 185, 248);text-align: left;width:50%;margin-left:5px;" }).text(Trad.sentence('write_from+ +mail_address')).end()
            .div({ id:"new_mail_close", class:'box_close curs-pointer' }).text("- + x").end()
        .end()
        .div({class:'txt-center p-2'})
            .btn({id:'send-btn', class:"curs-pointer"}).text(Trad.word('send')).end()
        .end()
        .div({class:'p-2'})
            .label({for:'send_to-input'}).text(Trad.sentence('to+:+ ')).end()
            .br()
            .input({id:"send_to-input", class:'w-80'})
        .end()
        .div({class:'p-2'})
            .label({for:'send_subject'}).text(Trad.sentence('subject+:+ ')).end()
            .br()
            .input({id:'send_subject', class:'w-80'})
        .end()
        .div({class:'p-2'})
            .textarea({id:'send_mess_body', class:'w-100', rows:"8"}).end()
        .end()
    .end()


    css['.window'] = {
        'background-color': "rgb(180, 185, 248)",

        border: "2px ridge #00f",
        'border-radius': 5,
        
        position:"fixed",

        'over-flow':"auto"
    };

    css['#mail_box_container'] = {
        left:"2.5vw", top:"2.5vh",
        'z-index':2,

        width:"95vw",
        height:"95vh",
    };

    css['.bar'] = {
        'background-color': "#008",
                    
        'border-bottom': "2px ridge #00f",
    
        display: "flex",
        'flex-direction': "row",
        'justify-content': "space-around",
    
        width:"100%",
        height:20
    };

    css['.box_close'] = {
        'border-radius': 5,
        width: "60%",
        height: "85%",
        'text-align':"right",
        color:"rgb(180, 185, 248)",
        'margin-right':10
    };

    css['#tools_bar'] = {
        'background-color':"rgba(0,0,0,0.2)",
        'border-bottom':"2px solid rgba(0,0,0,0.4)"
    };

    css['#received_mails'] = {
        'padding-top':15,
        'padding-left':15,
        'border-bottom':"2px solid rgba(0,0,0,0.4)",
        'text-align':"center"
    };

    css['td'] = {
        padding:15
    };

    css['#reading_zone'] = {
        'background-color':"rgba(255,255,255,0.2)",
        padding:15
    };

    css['#write_mail'] = {
        left:"23vw", top:"23vh",
        'z-index':3,

        width:"54vw",
        height:"54vh",
    };

    function show_mess()
    {
        $('#reading_zone').html(Trad.word('_emergency_mail_content'));
        $('#mail_read_state').attr('src','public/img/computer/read.png');
    }

    function hide_mess()
    {
        $('#reading_zone').html('');
        $('#mail_read_state').attr('src','public/img/computer/not_read.png');
    }

    function check()
    {
        let to = $('#send_to-input').val();
        let subject = $('#send_subject').val();
        let body = $('#send_mess_body').val();

        if(to===''){ Place.message(Trad.word('_mail_no_to'));return }
        
        if(subject==''){ Place.message(Trad.word('_mail_no_subject'));return; }

        if(body==''){ Place.message(Trad.word('_mail_no_body'));return; }

        if(to!=='inspecteur.marquez.ortiz@commissariatparis.fr'
        && to!=='inspector.marquez.ortiz@comisariasevilla.es')
        {
            Place.message(Trad.word('_mail_to_error'));
            return;
        }

        Place.message(Trad.word('_win_game'));

    }

    events.push(()=>{
        $('#received_mail').on('click',()=>{
            if($('#reading_zone').text()=='')
            {
                show_mess();return;
            }
            hide_mess();
        });
    });

    events.push(()=>{
        $('#mailbox_close').on('click',()=>{
            WebPage.mailbox.pop();
        })
    })

    events.push(()=>{
        $('#write-btn').on('click',function(){
            let oldClass = $("#write_mail").attr('class');
            $("#write_mail").attr('class', oldClass.replace('hidden',''));
        })
    });

    events.push(()=>{
        $('#new_mail_close').on('click',function(){
            let oldClass = $("#write_mail").attr('class');
            $("#write_mail").attr('class', oldClass+'hidden');
        })
    })

    events.push(()=>{
        $('#send-btn').on('click',()=>{
            check();
        })
    })

    return {html:html.export, css, events};
}];