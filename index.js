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
        var tr;
        var param = [];
        var tableCss = "style='border:1px solid black; padding:5px'";
        for (var i = 0; i < json.length; i++) {
            param.push(json[i].parameters);
            // console.log(param[i]);
            tr = $('<tr/>');
            tr.append("<td " + tableCss + ">" + json[i].id + "</td>");
            tr.append("<td " + tableCss + ">" + json[i].disabled + "</td>");
            tr.append("<td " + tableCss + ">" + json[i].name + "</td>");
            tr.append("<td " + tableCss + ">" + json[i].description + "</td>");
            tr.append("<td " + tableCss + ">" + json[i].group + "</td>");
            tr.append("<td>" + json[i].parameters + "</td>");
            // paramTable(param);
            $('table').append(tr);
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
