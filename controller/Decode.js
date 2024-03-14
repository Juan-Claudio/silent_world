import Player from "./Player.js";
import Place from "./Place.js";

export default class Decode
{
    //ID fonction to coded function //add layer filter
    static get_functions(ids, type='click')
    {
        let fctions_list = [];
        ids = ids.map((index)=>{
            let layer = '';

            if(/[lrtb]/.test(index)){ layer = '0'; }
            else{  layer = index.split('(')[1]; }

            if(layer===Player.game_vars._.layer+'' || layer==undefined)
            {
                return Player.game_vars[Player.is._.into][index][type];
            }
        });
        ids.forEach(subArr => {
            if(subArr!=undefined)
            {
                fctions_list = fctions_list.concat(subArr);
            }
        });
        return fctions_list;
    }
    
    
    //DECODE CONDITIONS SEQUENCE
    /**
     * 
     * @param {bool[]} conditions  [true,false...]
     * @param {string} combination '&' or '|'
     * @returns {bool} c1&&c2&&... OR c1||c2||...
     */
    static conditions_group(conditions, combination='&')
    {
        if(conditions.length==0){ return true }
        if(conditions[0]===''){ return true }

        let truth = (combination=='&') ? true : false;

        for(let x in conditions)
        {
            if(combination==='&')
            {
                truth &= conditions[x];
            }
            else
            {
                truth |= conditions[x];
            }
        }
        if(truth===1){ return true; }
        else if(truth===0){ return false; }
        return truth;
    }

    /**
     * Compare value1 with value2
     * @param {any} val1 
     * @param {any} val2 
     * @param {string} sign 
     * @returns true|false
     */
    static compare(val1, val2, sign)
    {
        //console.warn('COMPARE => '+val1+' '+sign+'? '+val2)
        switch(sign)
        {
            case '=': return val1==val2;
            case '↓': return val1<val2;
            case '↑': return val1>val2;
            case '«': return val1<=val2;
            case '»': return val1>=val2;
            default: return false;
        }
    }

    /**
     * Use Player.envars
     * @param {string} condition coded single condition
     * @returns true|false
     */
    static condition(condition)
    {
        let vals = [];
        let pat = /[=↓↑«»]/;
        let sign = '';
        let modifier = condition[0];
        let val_in_object = false;
        let keys = '';

        condition = condition.substring(1);

        if(condition.split('.').length>1)
        {
            val_in_object = true;
            if(/[_!]/.test(modifier))
            {
                keys = condition.split('.');
                keys[1] = keys[1].replace(/;/g,',');
            }
        }

        if(/[\+\-]/.test(modifier))
        {
            sign = condition.match(pat)[0];
            vals = condition.split(sign);

            if(val_in_object)
            {
                keys = vals[0].split('.');
                keys[1] = keys[1].replace(/;/g,',');
                vals[0] = Player.is._[keys[0]][keys[1]];
            }
            else
            {
                vals[0] = Player.is._[vals[0]];
            }
        }

        switch(modifier)
        {
            case '_': 
                if(val_in_object){ return Player.is._[keys[0]][keys[1]]; }
                else{ return Player.is._[condition]; }

            case '!':
                if(val_in_object){ return !Player.is._[keys[0]][keys[1]]; }
                else{ return !Player.is._[condition]; }

            case '+':
            case '-':
                
                if(modifier=='+')
                {
                    return this.compare(vals[0], vals[1], sign);
                }
                return !this.compare(vals[0], vals[1], sign);
                
            case '←': return !Player.have._.in_objects.includes(condition);
            case '→': return Player.have._.in_objects.includes(condition);
            case 'ø': return !Player.have._.in_discard_pile.concat(Player.have._.in_objects).includes(condition);
            case 'º': return Player.have._.in_discard_pile.concat(Player.have._.in_objects).includes(condition);
        }
    }

    /**
     * Decode string sequence of conditions
     * @param {string} conditions 
     * @returns true|false
     */
    static conditions_list(conditions)
    {
        let conditions_to_compare = [];
        let sub_conditions = [];
        let conditions_arr = conditions.split('[')
        
        conditions_arr.shift();
        if(conditions_arr[0]===''){ return true }
        else
        {
            for(let x in conditions_arr)
            {
                sub_conditions = conditions_arr[x].split('|').map((val)=>{
                    return Decode.condition(val)
                });
                conditions_to_compare.push(Decode.conditions_group(sub_conditions,'|'));
            }
            return Decode.conditions_group(conditions_to_compare, '&');
        }
    }

    //DECODE FUNCTION
    static all_fction(fctions_id, type='click')
    {
        let fctions = this.get_functions(fctions_id, type);
        for(let i = 0; i<fctions.length; i++)
        {
            Decode.fction(fctions[i]);
        }
    }

    static fction(fction_str)
    {
        fction_str = fction_str.replace(/\s/g,'');
        let fction_arr = fction_str.split('>');
        let fction_name = fction_arr[0];
        let fction_param = fction_arr[1];
        
        fction_param = fction_param.split(',').map((val)=>{
            if(val[0]==='['){ return Decode.conditions_list(val); }
            return val;
        });

        this.exec_fction(fction_name, fction_param);
    }

    static exec_fction(name, param)
    {
        //console.info('EXEC FUNCTION: '+name+'('+param.join(', ')+')');
        switch(param.length)
        {
            case 0:
                Place[name]();return;
            case 1:
                Place[name](param[0]);return;
            case 2:
                Place[name](param[0],param[1]);return;
            case 3:
                Place[name](
                    param[0],param[1],
                    param[2]
                );return;
            case 4:
                Place[name](
                    param[0],param[1],
                    param[2],param[3]
                );return;
            case 5:
                Place[name](
                    param[0],param[1],
                    param[2],param[3],
                    param[4]
                );return;
            case 6:
                Place[name](
                    param[0],param[1],
                    param[2],param[3],
                    param[4],param[5]
                );return;
            default:
                console.error('Too much params');return;
        }
    }

    static cursor(id_game_window, cursor_code_id)
    {
        if(cursor_code_id.length==0)
        {
            if( $(id_game_window).attr('class')!='curs-default' )
            {
                $(id_game_window).attr('class','curs-default');
            }
            return;
        }

        if(Player.is._.using_object)
        {
            $(id_game_window).attr('class','curs-object');
            return;
        }

        if(/^[lrtb]$/.test(cursor_code_id[0]) && Player.game_vars._.layer==0)
        {
            if( $(id_game_window).attr('class')!='curs-'+cursor_code_id[0] )
            {
                $(id_game_window).attr('class','curs-'+cursor_code_id[0]);
            }
            return;
        }
        else if(/^[lrtb]$/.test(cursor_code_id[0]))
        {
            return;
        }
        
        let place = Player.is._.into;
        let cursor_code = [];
        let cursor_code_id_split_layer = '';
        
        for(let i=0; i<cursor_code_id.length; i++)
        {
            cursor_code_id_split_layer = cursor_code_id[i].split('(')
            
            /* IF   cursor code id == "x,y,x‘,y‘(i" and layer==i
             * OR   cursor code id == "x,y,x‘,y‘"
             * THEN cursor interpreted
             * ELSE cursor-default */
            if(cursor_code_id_split_layer[1]==undefined
                || cursor_code_id_split_layer[1]===Player.game_vars._.layer+'')
            {
                cursor_code = Player.game_vars[place][cursor_code_id[i]]['cursor'].split(':');
                cursor_code[0] = Decode.conditions_list(cursor_code[0]);

                if(cursor_code[0])
                {
                    if( $(id_game_window).attr('class')!='curs-'+cursor_code[1] )
                    {
                        $(id_game_window).attr('class','curs-'+cursor_code[1]);
                    }
                    return;
                }
                else
                {
                    continue;
                }
            }
        }
        if( $(id_game_window).attr('class')!='curs-default' )
        {
            $(id_game_window).attr('class','curs-default');
        }
    }
}