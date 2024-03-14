import Html from "../../../libs/jstools/slabjs/Html.js";

const id = "popwait";

const css = {};
css['#'+id] = {
    top: 'calc(50vh - 256px)',
    left: 'calc(50vw - 216px)',
    width:512,
    height:532,
    'z-index':3,
    color:'#fff'
}

const html = new Html()
.div({ id, class:'abs flex fcol-c' })
    .h1().text('Loading...').end()
    .img({
        src:"public/img/houses_loading.gif",
        alt:"progress in infinite street of houses",
        style:'border-radius:20px;'
    })
.end().export;

export default ['popwait', { css, html }];
