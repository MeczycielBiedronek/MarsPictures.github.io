const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const submitDate = document.getElementById('submitDate');



let myAPIkey = 'SOJbqDZ8CiITsmKYt9LBwHedrfy77N7hkhQSOgxQ';
const json_place = document.getElementById('json_place');
let prepDiv = (i, j, k, img_src, l, c) => {
    return `<div id="photo${i}"class="marsPhotos" style="background-image:url('${img_src}');">
    <div class="picNum">Picture ${i+1} of ${l}<br>
    <h3>Taken by the Curiosity's<br><span>${c}</span></h3>
    </div>
    <a href="#photo${j}"><div class="back">back</div></a>
    <a href="#photo${k}"><div class="next">next</div></a>
    </div>`
}

submitDate.addEventListener('click', (event)=>{
    event.preventDefault();
    json_place.innerHTML='<div class="loader">Receiving pictures from Mars <br><br><div class="lds-ripple"><div></div><div></div></div></div>';
    // Date picker
let d = day.value
let m = month.value
let y = year.value
 console.log('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + y + '-' + m + '-' + d + '&api_key=' + myAPIkey)

 // API call
    fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + y + '-' + m + '-' + d + '&api_key=' + myAPIkey)
    .then(res => res.json())

    .then((out) => {
       // console.log(Object.keys(out));
        //console.log(out);
        //let myJSON = JSON.stringify(out);
        console.log('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + y + '-' + m + '-' + d + '&api_key=' + myAPIkey);

        setTimeout(function(){ 
            json_place.innerHTML=" ";
            for(let prop in out) {
                            let lvl1 = out[prop];
                            //console.log(JSON.stringify(lvl1));
                            if(lvl1.length === 0){
                                json_place.innerHTML="No pictures from that date <br>Sorry :(";
                            }else{

                                // Displays pictures with camera name
                                for (let i = 0; i < lvl1.length; i++) {
                                    let lvl2 = lvl1[i];
                                    let img_src = lvl2['img_src'];
                                    let camera = lvl2['camera']
                                    let cameraName = camera.full_name

                                   // console.log(cameraName)
                            //// build  <a> and div

                            // adding controllers (next prev)
                                    if(i === 0){
                                        let j = lvl1.length-1;
                                        let k = i+1;
                                        json_place.insertAdjacentHTML('beforeend', prepDiv(i, j, k, img_src, lvl1.length, cameraName));
                                    } else if (i === lvl1.length-1){
                                       
                                       let j = i-1;
                                       json_place.insertAdjacentHTML('beforeend', prepDiv(i, j, 0, img_src, lvl1.length, cameraName));
                                    } else {
                                         let j = i-1;
                                         let k = i+1;
                                        json_place.insertAdjacentHTML('beforeend', prepDiv(i, j, k, img_src, lvl1.length, cameraName));
                                    }
                            
                                    
                                }
                            }
                    //// build div element
                            
         }
         }, 2000);
/// Travers Object

   
}).catch(err => console.error(err));



})

