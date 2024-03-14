import WebPage from "../../../libs/jstools/slabjs/WebPage.js";
import Html from "../../../libs/jstools/slabjs/Html.js";
import Trad from "../../../libs/jstools/Trad.js";

/*data
* .song_name
* .message
*/
export default ['audio', function(data)
{
    const id = data.song_name+'_audio_song';
    const message = Trad.word(data.message);



    const html = new Html()
        .audio({ id, autoplay:'', loop:'', controls:''})
            .source({ src:`public/sound/${data.song_name}.wav`, type:"audio/ogg" })
            .text('Your browser does not support the audio element.')
        .end().export



    const events = [ ()=>{
        setTimeout(()=>{
            if(document.getElementById(id).paused){ WebPage.unmold.popinfo({message}).append(); }
            else{console.info('Autoplay allowed');}
        }, 100);
    }];

    return {html,events};
}];