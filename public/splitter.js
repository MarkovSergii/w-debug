/**
 * Created by user on 28.01.2017.
 */
$(document).ready(function(){

    let splitted;
    let leftsize = $('body')[0].offsetWidth - 350;
    splitted = $('.split-me').touchSplit({leftMax:leftsize, leftMin:350, dock:""})

    window.onresize = function(){
        let leftsize = $('body')[0].offsetWidth - 350;

        if (splitted) splitted.destroy();
        splitted = $('.split-me').touchSplit({leftMax:leftsize, leftMin:350, dock:""})
    }


})