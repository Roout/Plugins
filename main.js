/**
 * Created by Roout on 28.04.2016.
 */
// ==UserScript==
// @name            Berkut crab
// @version         1.0
// @run-at          document-end
// @require         http://code.jquery.com/jquery-2.1.3.min.js
// @include         /^https?://steamcommunity.com/market/
// @grant           none
// @noframes
// ==/UserScript==


(function __main(){
    // initialization
    $("#my_market_activelistings_number").after("<span id='__global_price'></span>");

    //def&dec
    function calc(){
        var size=0, money =0;
        var price_cnt = $('.market_listing_price > span > span[style^=\"color\"]');
        size = price_cnt.length;
        Array.prototype.forEach.call(price_cnt,function(e){
            var parts = e.innerHTML.match(/(\d+)\.(\d+)/i),
                integer = parts[1],
                fract   = parts[2],
                wholeNumber = +(+integer + (+fract)/100).toFixed(2);
            money+= wholeNumber;
            money = +money.toFixed(2);
            // console.log(money+" - "+wholeNumber);
        });

        return ("  |  Calculated: "+money+"$ from "+size+" lots");

    };
    function loop(){
        $("#__global_price").text(calc());
        setInterval(loop,5*60*1000);
    };
    //calls
    loop();
})();
