console.log('This would be the main JS file.');

var btn = document.querySelectorAll('#sidebar .button')[0];
btn.onClick = function(){
    btn.remove();
}
