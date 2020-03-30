'use strict';
//////////////constructor instaniate all the objects\\\\\\\\\\\\\\

function GalleryOfHornes(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    GalleryOfHornes.all.push(this)
}
GalleryOfHornes.all=[]
/////////////get the data from json\\\\\\\\\\\\

$.get('data/page-1.json')
    .then(data => {
        data.forEach((value) => {
            let horn = new GalleryOfHornes(value.image_url, value.title, value.description, value.keyword, value.horns)
            horn.runderAllHornes();
            horn.runderOptions();

        });
        
         


    });
/////////////////the function which runder the json data using GalleryOfHornes constructor\\\\\\\\\\\\\\\\

GalleryOfHornes.prototype.runderAllHornes = function () {
    let contaner = $('<div></div>');
   $('.photo-template').append(contaner);
   let titlHorne = $('<h2></h2>').text(this.title);
   contaner.append(titlHorne);
   let imglHorne = $('<img></img>').attr('src',this.image_url);
   imglHorne.attr('alt',this.title)
   contaner.append(imglHorne);
   let parlHorne = $('<p></p>').text(this.description);
   contaner.append(parlHorne);
}

////////////////function runders the select options \\\\\\\\\\\\\\\\
var arrKey =[];
GalleryOfHornes.prototype.runderOptions = function () {
    if (!arrKey.includes(this.keyword)){
        arrKey.push(this.keyword)
        let optionlHorne = $('<option></option>').text(this.keyword);
        optionlHorne.attr('value',this.keyword)
        $('select').append(optionlHorne);    
    }
}

//////////////////////event lestiner for select options\\\\\\\\\\\\\\\\\\\\\

var allcjosen = [];
$('select').on('change', function()  {
    var chosenHorne = this.value; 
    allcjosen = []; 
    for(let i = 0 ; i < GalleryOfHornes.all.length ; i++){
        if (GalleryOfHornes.all[i].keyword == chosenHorne){
            allcjosen.push(GalleryOfHornes.all[i]);
        }
    }
    
    runderFilteredOptions();
 }
 )       

 //////////////////////function runders filtered options\\\\\\\\\\\\\\\\\\\\\

function runderFilteredOptions (){
    
    $('.photo-template').empty();
    allcjosen.forEach((value)=>{
        let contaner2 = $('<div></div>');
        $('.photo-template').append(contaner2);
        let titlHorne = $('<h2></h2>').text(value.title);
        contaner2.append(titlHorne);
       let imglHorne = $('<img></img>').attr('src',value.image_url);
       imglHorne.attr('alt',value.title)
       contaner2.append(imglHorne);
       let parlHorne = $('<p></p>').text(value.description);
       contaner2.append(parlHorne);
       

    })

}

