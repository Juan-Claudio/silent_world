import Player from "./Player.js";
import WebPage from "../../libs/jstools/slabjs/WebPage.js";

export default class Place
{    
    static animation = 0;

    static change_back(condition=true, back_code_true="_taken", message_true='no', back_code_false='no', message_false='no')
    {
        let envars = Player.game_vars._;
        if(condition)
        {
            //console.log('BACK_CODE_TRUE ('+back_code_true+')');
            envars.back_precision[envars.into] = back_code_true;
            Player.refresh(envars.into);
            if(message_true!=='no'){ this.message(message_true); }
        }
        else
        {
            if(back_code_false!=='no')
            {
                envars.back_precision[envars.into] = back_code_false;
                Player.refresh(envars.into);
            }
            if(message_false!=='no'){ this.message(message_false); }
        }
    }

    static goto(to, condition=true, message_true='no', message_false='no')
    {
        Place.stop_animation();
        if(condition)
        {
            Player.is._.into = to;
            Player.refresh(to);
            Player.reset_place(to);
            if(message_true!=='no'){ this.message(message_true); }
        }
        else if(message_false!=='no'){ this.message(message_false); }
    }

    static loose(object, condition=true, can_retake=true, back_code_true='no')
    {
        let envars = Player.game_vars._;
        if(Player.have._.in_objects.includes(object) && condition)
        {
            let used_item = Player.have._.in_objects.splice( Player.have._.in_objects.indexOf(object), 1 );
            if(can_retake){ Player.have._.in_discard_pile.push(used_item[0]); }
            if(back_code_true!='no'){ Player.game_vars._.back_precision[envars.into] = back_code_true }
        }
    }

    static look(zoom_id_true, condition=true, message_true='no', zoom_id_false='no', message_false='no')
    {
        let back_code_true = (zoom_id_true[0]!=='_') ? '_'+zoom_id_true : zoom_id_true;
        let back_code_false = zoom_id_false;
        this.change_back(condition, back_code_true, message_true, back_code_false, message_false);
    }

    static memorize(item, condition=true, message_false='_already_memorized', message_true='in_memory')
    {
        if(!Player.have._.in_memory.includes(item) && condition)
        {
            Player.have._.in_memory.push(item);
            if(message_true!=='in_memory'){ this.message(message_true) }
            else{ this.message('<p>+¡+'+item+'+ +'+message_true+'+'+'+!+</p>'); }
        }
        else if(message_false!=='no')
        {
            this.message(message_false);
        }
    }

    static message(message_true, condition=true, message_false='no')
    {
        if(condition)
        {
            Player.info(message_true);
        }
        else if(message_false!=='no')
        {
            Player.info(message_false);
        }
    }

    static sound(song_name, turn_on='on', condition=true, message_true='no', message_false='no')
    {                
        if(turn_on==='on'){ turn_on=true; }
        else if(turn_on==='off'){ turn_on=false; }
        else{ turn_on= (Player.hears._[song_name]) ? false : true ; }

        if(turn_on && condition)
        {
            Player.hears._[song_name] = true;
            
            WebPage.unmold.audio({song_name, message:'_alarm_not_autoplay'}).append();
            console.info('Append and turn on sound named '+song_name)
            
            if(message_true!='no'){ this.message(message_true); }
        }
        else if(!turn_on && condition)
        {
            Player.hears._[song_name] = false;

            WebPage.audio.pop();

            if(message_false!='no'){ this.message(message_false); }
        }
    }

    static switch_val(val, condition=true, latency='no')
    {
        if(condition)
        {
            if(typeof(Player.is._[val])!='boolean')
            { Player.is._[val]=true; }

            if(latency==='yes' || latency==='true' || latency==='latency')
            {
                setTimeout(()=>{
                    if(Player.is._[val]){ Player.is._[val]=false; }
                    else{ Player.is._[val]=true; }
                }, 50)
            }
            else
            {
                if(Player.is._[val]){ Player.is._[val]=false; }
                else{ Player.is._[val]=true; }
            }
        }
        //console.log('SWITCH VAL > val('+val+')='+Player.is._[val]);
        return Player.is._[val];
    }

    static increment_val(var_name, max, condition=true, min='0')
    {
        if(condition)
        {
            let val = parseInt(Player.game_vars._[var_name]);
            val++;
            if(val>parseInt(max)){ Player.game_vars._[var_name]=min;return }
            else{ Player.game_vars._[var_name]=val+'' }
        }
    }

    static take(object, condition=true, message_false='no', background='_taken', message_true='in_backpack')
    {
        if(!Player.have._.in_objects.includes(object) && condition)
        {
            Player.have._.in_objects.push(object);
            if(background!=='no'){ this.change_back(true,background); }
            if(message_true!=='in_backpack' && message_true!=='no'){ this.message(message_true) }
            else if(message_true!=='no'){ this.message('<p>+¡+'+object+'+ +'+message_true+'+!+</p>'); }
        }
        else if(message_false!=='no')
        {
            this.message(message_false);
        }
    }

    static goto_layer(nb, condition=true)
    {
        if(condition){ Player.game_vars._.layer = parseInt(nb); }
    }

    static interact(device_name, interaction_type='show', condition=true, unmold='slab', param_unmold='no')
    {
        if(condition!=true){ return; }

        if( WebPage[device_name]==undefined && WebPage.unmold[device_name]==undefined )
        {
            this.message('Intercation with '+device_name+'...');return;
        }
        //WebPage.unmold.computer({id:rep}).append();
        if(unmold!=='slab')
        {
            if(param_unmold!=='no'){ WebPage.unmold[device_name](param_unmold)[interaction_type](); }
            else{ WebPage.unmold[device_name]()[interaction_type](); }
            
            return;
        }
        WebPage[device_name][interaction_type]();
    }

    static use_computer(computer_name)
    {
        WebPage.unmold.computer({id:computer_name}).append();
    }

    static animate_back(nb_last_frames)
    {
        nb_last_frames = parseInt(nb_last_frames);
        let i = 0;
        let precision = '_a';
        this.animation = setInterval(()=>{
            Place.change_back(true, precision+i);
            i++;
            if(precision === ''){ i=0, precision='_a'; }
            if(i==(nb_last_frames+1)){ precision ='', i='' }
        }, 200);
    }

    static stop_animation()
    {
        clearInterval(this.animation);
    }
}
