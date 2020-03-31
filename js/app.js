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

GalleryOfHornes.all = []
var page1 = [];
var page2 = [];
var arrKey1 = [];
var arrKey2 = [];

///////////////////////////function merge template\\\\\\\\\\\\\\\\\\\\\

GalleryOfHornes.prototype.toHtml = function () {

    let templateOfHorne = $('#horne-template').html();

    let htmlTemplete = Mustache.render(templateOfHorne, this)
    return htmlTemplete;
}

//////////////////////////get the data from json\\\\\\\\\\\\\\\\\\\\\\


$.get('data/page-1.json')
    .then(data => {
        
        function SortByName(a, b){
            var aName = a.title;
            var bName = b.title;
            return ((aName < bName) ? 1 : ((aName > bName) ? -1 : 0));
        }
        data.sort(SortByName);
       
        data.forEach((value) => {
            let horn = new GalleryOfHornes(value.image_url, value.title, value.description, value.keyword, value.horns)
            page1.push(horn)
            let temp = horn.toHtml();
            $('.photo-template').append(temp);
        });


        runderOptions();

    });
$.get('data/page-2.json')
    .then(data => {
        function SortByName(a, b){
            var aName = a.title;
            var bName = b.title;
            return ((aName < bName) ? 1 : ((aName > bName) ? -1 : 0));
        }
        data.sort(SortByName);
        data.forEach((value) => {
            let horn = new GalleryOfHornes(value.image_url, value.title, value.description, value.keyword, value.horns)
            page2.push(horn)

        });


    });

////////////////function runders the select options for page 1 \\\\\\\\\\\\\\\\

function runderOptions() {
    arrKey1 = [];
    page1.forEach(val => {
        if (!arrKey1.includes(val.keyword)) {
            arrKey1.push(val.keyword)
            var optionlHorne = $('<option></option>').text(val.keyword);
            optionlHorne.attr('value', val.keyword)
            $('#filter').append(optionlHorne);

        }

    })
}

///////////////function runders the select options for page 2 \\\\\\\\\\\\\\\\


function runderOptions2() {
    arrKey2 = [];
    page2.forEach(val => {
        if (!arrKey2.includes(val.keyword)) {
            arrKey2.push(val.keyword)
            var optionlHorne = $('<option></option>').text(val.keyword);
            optionlHorne.attr('value', val.keyword)
            $('#filter').append(optionlHorne);
        }

    })
}


//////////////////////event lestiner for select options\\\\\\\\\\\\\\\\\\\\\

var allcjosen = [];
$('#filter').on('change', function () {

    var chosenHorne = this.value;
    $('.photo-template div').hide();
    $(`.${chosenHorne}`).show();


}
)

//////////////////////event lestiner for button 1 options\\\\\\\\\\\\\\\\\\\\\


$('#page1').on('click', function (event) {
    event.preventDefault();

    $('.photo-template div').hide();
    runderPage1();
    $('#filter').empty();
    runderOptions()
    // console.log(arrKey1);


})

//////////////////////function runder page 1\\\\\\\\\\\\\\\\\\\\\


function runderPage1() {

    $('div').removeClass();
    page1.forEach(val => {
        let temp = val.toHtml();
        $('.photo-template').append(temp);

    })
}

//////////////////////event lestiner for button 2 options\\\\\\\\\\\\\\\\\\\\\

$('#page2').on('click', function () {
    $('.photo-template div').hide();
    runderPage2();
    $('#filter').empty();
    runderOptions2()
})

//////////////////////function runder page 2\\\\\\\\\\\\\\\\\\\\\


function runderPage2() {
    $('div').removeClass();

    page2.forEach(val => {
        let temp = val.toHtml();
        $('.photo-template').append(temp);
    })
}




 
function SortByHorneUP(a, b){
    var aName = a.horns
    var bName = b.horns
    return ((aName < bName) ? 1 : ((aName > bName) ? -1 : 0));
}

function SortByHorneDown(a, b){
    var aName = a.horns
    var bName = b.horns
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

$('#sort').on('change', function () {

    let chosenSort = this.value;
    console.log(chosenSort);
    // let upSort = 
    if (chosenSort == 'up'){
        $('.photo-template div').hide();
        page1.sort(SortByHorneUP) 
        page2.sort(SortByHorneUP)
        runderPage1()
        
        

         
    }else if(chosenSort == 'down'){
         $('.photo-template div').hide();
        page1.sort(SortByHorneDown) 
         page2.sort(SortByHorneDown)
        runderPage1()
        //  console.log(page1);

    }



}
)  
