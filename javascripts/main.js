console.log('This would be the main JS file.');

var btn = document.querySelectorAll('#sidebar > a')[0];
btn.onClick = function(e){
    e.preventDefault();
    btn.remove();
};
