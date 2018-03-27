$(document).ready(function () {

    function readBlob(opt_startByte, opt_stopByte) {

        var files = document.getElementById('files').files;
        if (!files.length) {
            alert('Please select a file!');
            return;
        }

        var file = files[0];
        var start = parseInt(opt_startByte) || 0;
        var stop = parseInt(opt_stopByte) || file.size - 1;

        var reader = new FileReader();

        // If we use onloadend, we need to check the readyState.
        reader.onloadend = function (evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                // document.getElementById('byte_content').textContent = evt.target.result;
                //console.log(evt.target.result)
                var json2 = evt.target.result;
                var json = JSON.parse(json2);
                console.log(json2.length)
                console.log(json.length)
              
                printOnScreen(json);
                //initialTable(evt.target.result);
                // document.getElementById('byte_range').textContent = 
                //     ['Read bytes: ', start + 1, ' - ', stop + 1,
                //      ' of ', file.size, ' byte file'].join('');
            }
        };

        var blob = file.slice(start, stop + 1);
        reader.readAsBinaryString(blob);
    }

    document.querySelector('.readBytesButtons').addEventListener('click', function (evt) {
        if (evt.target.tagName.toLowerCase() == 'button') {
            var startByte = evt.target.getAttribute('data-startbyte');
            var endByte = evt.target.getAttribute('data-endbyte');
            readBlob(startByte, endByte);
        }
    }, false);


    function printOnScreen(json) {
        //console.log(json)
        var tr, tr2;
        var firstRowParams;
        var row2TD;
        var row2Parms;
        var finalRow;
        var card, card2;
        var anchor;
        var param = [];
        var tableCss = "style='border-left:1px solid black; padding: 5px;'";
        for (var i = 0; i < json.length; i++) {
            param.push(json[i].parameters);
          
           
            tr2 = $('<div/>', {
                class: 'collapse',
                id: 'param_' + i
            });
            card = $('<div/>').attr("class","row");
            firstRowParams = $('<div/>');
            var par = json[i].parameters;
            var count = Object.keys(par).length;
            anchor = $('<a/>')
                // .css({'border':'1px solid black', 'padding':'5px'})
                .attr('data-toggle', 'collapse')
                .attr('href', '#param_' + i)
                .attr('aria-expanded', 'false')
                .attr('data-toggle', 'collapse')
                .attr('aria-controls', '#param_' + i)
                .attr('class', 'btn btn-primary')
                .text(count);

            row2TD = $('<div/>',{
                class: 'row card card-body'
            });
            console.log(json[i].parameters);
            tr = $('<div class="row" style="border:1px solid black"></div>');
            tr.append("<div class='col-1'" + tableCss + ">" + json[i].id + "</div>");
            tr.append("<div class='col-1'" + tableCss + ">" + json[i].disabled + "</div>");
            tr.append("<div class='col-1'" + tableCss + ">" + json[i].name + "</div>");
            tr.append("<div class='col-6'" + tableCss + ">" + json[i].description + "</div>");
            tr.append("<div class='col-2'" + tableCss + ">" + json[i].group + "</div>");
           // tr.append("<div class='col-xs-1'" + tableCss + ">" + json[i].parameters + "</div>");

            firstRowParams.append(anchor);
            tr.append(firstRowParams);
            // paramTable(param);
            var finalObj = json[i].parameters;
            for (key in finalObj){
                card2 = $('<div/>');
                row3TD = $('<div/>',{
                    class: 'row card card-body'
                });
                var innerAncor = $('<div/>')
                // .attr('data-target', '#params_' + key)
                // .attr('data-toggle', 'modal')
                // .attr('class', 'btn btn-primary')
                .text(key);

                row2Parms = $('<div/>').attr('class','col-3').html(innerAncor);

                card.append(row2Parms);
               
               var totlaObj = finalObj[key]
               for(totalKey in totlaObj){
                finalRow = $('<div/>').attr('class','col-xs-2').text(totalKey+" : "+totlaObj[totalKey]);
                card2.append(finalRow);
                  // console.log(totalKey+" : "+totlaObj[totalKey])
               }
              
            }
            row2TD.append(card);

            tr2.append(row2TD);

            $('#main').append(tr);

            $('#main').append(tr2);
        }
    };
  
    // paramTable(param);
    // var paramsAttributes =  (function(){
    //     console.log(param.length)
    //     for (var i = 0; i < param.length; i+=1){
    //         console.log(param[i])
    //     }
    // })();

});
