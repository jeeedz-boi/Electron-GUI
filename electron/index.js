const electron = require("electron");
const ipc = electron.ipcRenderer;
const glob = require("glob")
var path = require('path');
var fs = require('file-system');


const result_img6 = document.getElementById('result-img6');
const result_img5 = document.getElementById('result-img5');
const result_img4 = document.getElementById('result-img4');
const result_img3 = document.getElementById('result-img3');
const result_img2 = document.getElementById('result-img2');
const result_img1 = document.getElementById('result-img1');
const real_img = document.getElementById('real-img');
const thermal_img = document.getElementById('thermal-img');
const result_img_alert = document.getElementById('result-img-alert');

var normalImg = [];
var feverImg = [];
var currentImg = [];
var testDemo  = document.getElementById('test-demo');
var feverTest = document.getElementById('fever-demo');
var i = 0;

function updateResultImage(data,temp){
    
    const result_img1_src = document.getElementById('result-img1').src;
    const result_img2_src = document.getElementById('result-img2').src;
    const result_img3_src = document.getElementById('result-img3').src;
    const result_img4_src = document.getElementById('result-img4').src;
    const result_img5_src = document.getElementById('result-img5').src;
    const result_img6_src = document.getElementById('result-img6').src;
    result_img1.setAttribute('src', result_img2_src);
    document.getElementById("temp-result-img1").innerHTML = document.getElementById("temp-result-img2").innerHTML
    result_img2.setAttribute('src', result_img3_src);
    document.getElementById("temp-result-img2").innerHTML = document.getElementById("temp-result-img3").innerHTML
    result_img3.setAttribute('src', result_img4_src);
    document.getElementById("temp-result-img3").innerHTML = document.getElementById("temp-result-img4").innerHTML
    result_img4.setAttribute('src', result_img5_src);
    document.getElementById("temp-result-img4").innerHTML = document.getElementById("temp-result-img5").innerHTML
    result_img5.setAttribute('src', result_img6_src);
    document.getElementById("temp-result-img5").innerHTML = document.getElementById("temp-result-img6").innerHTML
    result_img6.setAttribute('src', data);
    document.getElementById("temp-result-img6").innerHTML = temp
}

ipc.on('update-new-img', function(event, data){
    updateResultImage(data)
})

ipc.on('update-result-img-alert', function(event, data){
    result_img_alert.setAttribute('src', data);
})

ipc.on('update-real', function(event, data){
    real_img.setAttribute('src', data);
})

ipc.on('update-thermal', function(event, data){
    thermal_img.setAttribute('src', data);
})

// Get recent file
var getMostRecent = function (dir, cb) {

	var dir = path.resolve(dir);
	var files = fs.readdir(dir, function (err, files) {
		var sorted = files.map(function(v) {
			var filepath = path.resolve(dir, v);
			return {
				name:v,
				time:fs.statSync(filepath).mtime.getTime()
			}; 
		})
		.sort(function(a, b) { return b.time - a.time; })
		.map(function(v) { return v.name; });

		if (sorted.length > 0) {
			cb(null, sorted[0]);
		} else {
			cb('Y U NO have files in dis dir?');
		}
	})
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

setInterval(function(){
    // Get recent file
    getMostRecent('Current/', function (err, recent) {
        real_img.setAttribute('src', "Current/"+recent);
        
        // if (err) console.error(err);
        // console.log(recent);
    });

    getMostRecent('Normal/', function (err, recent) {
        fs.readFile((`Normal/${recent}`),(err, data) => { 
            data = data.toString()
            temp = parseFloat(data.split(",")[0]).toFixed(2)+"&#176;C"
            updateResultImage(`Normal/${recent.split(".")[0]}.jpg`, temp)
        })
        // if (err) console.error(err);
        // console.log(recent);
    });


    getMostRecent('Fever/', function (err, recent) {
        result_img_alert.setAttribute('src', `Fever/${recent.split(".")[0]}.jpg`);
        fs.readFile((`Fever/${recent}`),(err, data) => {
            data = data.toString()
            temp = parseFloat(data.split(",")[0]).toFixed(2)+"&#176;C"
            document.getElementById("temp-result-img-alert").innerHTML = temp
        })
        // if (err) console.error(err);
        // console.log(recent);
    });
    // fs.recurse('Normal/', ['*.jpg'], function(filepath, relative, filename) {
    //     normalImg.push(filename)
    // });

    // fs.recurse('Fever/', ['*.jpg'], function(filepath, relative, filename) {
    //     feverImg.push(filename)
    // });

    // fs.recurse('Current/', ['*.jpg'], function(filepath, relative, filename) {
    //     // currentImg.push(filename)  
    //     real_img.setAttribute('src', "Current/"+filename);
    //     if(normalImg.includes(filename)){
    //         fs.readFile((`Normal/${filename.split(".")[0]}.txt`),(err, data) => { 
    //             data = data.toString()
    //             temp = parseFloat(data.split(",")[0]).toFixed(2)+"&#176;C"
    //             updateResultImage("Current/"+filename, temp)
    //         }) 
    //     }
    //     if(feverImg.includes(filename)){
    //         result_img_alert.setAttribute('src', "Current/"+filename);
    //         fs.readFile((`Fever/${filename.split(".")[0]}.txt`),(err, data) => { 
    //             data = data.toString()
    //             temp = parseFloat(data.split(",")[0]).toFixed(2)+"&#176;C"
    //             document.getElementById("temp-result-img-alert").innerHTML = temp
    //         })
    //     }
    // });

}, 100);

// testDemo.onclick = function (){
//     real_img.setAttribute('src', "Current/"+currentImg[i]);
//     if(normalImg.includes(currentImg[i])){
//         var imgPath = "Normal/"+currentImg[i]
//         fs.readFile((`${imgPath.split(".")[0]}.txt`),(err, data) => { 
//             data = data.toString()
//             temp = parseFloat(data.split(",")[0]).toFixed(2)+"&#176;C"
//             console.log(i)
//             updateResultImage(imgPath, temp)
//         }) 
//     }
//     if(feverImg.includes(currentImg[i])){
//         result_img_alert.setAttribute('src', "Fever/"+currentImg[i]);
//         fs.readFile((`Fever/${currentImg[i].split(".")[0]}.txt`),(err, data) => { 
//             data = data.toString()
//             temp = parseFloat(data.split(",")[0]).toFixed(2)+"&#176;C"
//             document.getElementById("temp-result-img-alert").innerHTML = temp
//         })
//     }
//     i++;
// }
// feverTest.onclick = function (){
//     real_img.setAttribute('src', "Fever/img-20201011-2430.jpg");
//     result_img_alert.setAttribute('src', "Fever/img-20201011-2430.jpg");
//     fs.readFile((`Fever/img-20201011-2430.txt`),(err, data) => { 
//         data = data.toString()
//         temp = parseFloat(data.split(",")[0]).toFixed(2)+"&#176;C"
//         document.getElementById("temp-result-img-alert").innerHTML = temp
//     })
// }