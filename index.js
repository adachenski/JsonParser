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
                //console.log(json);
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
        console.log(json)
        var tr, tr2;
        var firstRowParams;
        var row2TD;
        var row2Parms;
        var card;
        var anchor;
        var param = [];
        var tableCss = "style='border:1px solid black; padding:5px'";
        for (var i = 0; i < json.length; i++) {
            param.push(json[i].parameters);
            // console.log(param[i]);
            tr = $('<tr/>');
           
            tr2 = $('<tr/>', {
                class: 'collapse',
                id: 'param_' + i
            });
            card = $('<div/>');
            firstRowParams = $('<td/>');
            anchor = $('<a/>')
                // .css({'border':'1px solid black', 'padding':'5px'})
                .attr('data-toggle', 'collapse')
                .attr('href', '#param_' + i)
                .attr('aria-expanded', 'false')
                .attr('data-toggle', 'collapse')
                .attr('aria-controls', '#param_' + i)
                .attr('class', 'btn btn-primary')
                .text('Params');

            row2TD = $('<div/>',{
                class: 'card card-body'
            });

            tr.append("<td " + tableCss + ">" + json[i].id + "</td>");
            tr.append("<td " + tableCss + ">" + json[i].disabled + "</td>");
            tr.append("<td " + tableCss + ">" + json[i].name + "</td>");
            tr.append("<td " + tableCss + ">" + json[i].description + "</td>");
            tr.append("<td " + tableCss + ">" + json[i].group + "</td>");

            firstRowParams.append(anchor);
            tr.append(firstRowParams);

            console.log("empty")
            //second row
            for (key in json[i].parameters){
                row2Parms = $('<td/>').attr('class','col-xs-1').text(key);
                card.append(row2Parms);
                console.log( key + ": " + json[i].parameters);
            }

            row2TD.append(card);
            tr2.append(row2TD);

            $('table').append(tr);
            $('table').append(tr2);
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
