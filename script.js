var jatekTer = document.getElementById("jatekter");
var balPanel = document.createElement("div");
var kartyaBox = document.createElement("div");
var pontokBox = document.createElement("div");
var tabla = document.createElement("div");
var korokBox = document.createElement("div");
var playerdiv = document.createElement("div");
var bottomdiv = document.createElement("div");
var felhuzodiv = document.createElement("div");


var KartyaData = [
{id:1,value:-3,sign:''},
{id:2,value:2,sign:''},
{id:3,value:5,sign:''},
{id:4,value:4,sign:''},
{id:5,value:3,sign:''},
{id:6,value:0,sign:'pap'},
{id:7,value:-6,sign:''},
{id:8,value:6,sign:''},
{id:9,value:0,sign:'taliga'},
{id:10,value:2,sign:''},
{id:11,value:0,sign:'hegy'},
{id:12,value:-5,sign:''},
{id:13,value:4,sign:''},
{id:14,value:0,sign:'sarkany'},
{id:15,value:5,sign:''},
{id:16,value:6,sign:''},
{id:17,value:-4,sign:''},
{id:18,value:1,sign:''},
{id:19,value:-1,sign:''},
{id:20,value:-2,sign:''},
{id:21,value:1,sign:''},
{id:22,value:3,sign:''},
{id:23,value:0,sign:'hegy'},
]


var VarData = [
{id:1,color:"kek",value:1},
{id:2,color:"kek",value:2},
{id:3,color:"kek",value:3},
{id:4,color:"kek",value:4},
{id:5,color:"piros",value:1},
{id:6,color:"piros",value:2},
{id:7,color:"piros",value:3},
{id:8,color:"piros",value:4},
{id:9,color:"sarga",value:1},
{id:10,color:"sarga",value:2},
{id:11,color:"sarga",value:3},
{id:12,color:"sarga",value:4},
{id:13,color:"zold",value:1},
{id:14,color:"zold",value:2},
{id:15,color:"zold",value:3},
{id:16,color:"zold",value:4},
]

var cellak = [];

function JatekterBetoltes()
{
    balPanel.appendChild(kartyaBox);
    balPanel.appendChild(pontokBox);
    jatekTer.appendChild(balPanel);
    jatekTer.appendChild(tabla);
    jatekTer.appendChild(korokBox);
}
function JatekterElrendezes()
{
    balPanel.id = "balpanel";
    kartyaBox.id = "kartyabox";
    pontokBox.id = "pontokbox";
    tabla.id = "tabla";
    korokBox.id = "korokbox";
}
function TablaGeneralas()
{
    var k = 1;
    for(var i = 0; i < 5; i++)
    {
        var sorDiv = document.createElement("div");
        sorDiv.classList += " sordiv";
        for(var j = 0; j<6;j++)
        {
            var oszlopDiv = document.createElement("div");
            oszlopDiv.classList += " oszlopdiv";
            oszlopDiv.setAttribute("onclick","KepAtteves(this)");
            sorDiv.appendChild(oszlopDiv);
            oszlopDiv.id = k++;
        }
        tabla.appendChild(sorDiv);
    }
    playerdiv.id = "Playerdiv";
    bottomdiv.id = "Bottomdiv";
    felhuzodiv.id = "Felhuzodiv";
    document.body.appendChild(playerdiv);
    playerdiv.appendChild(bottomdiv);
    playerdiv.appendChild(felhuzodiv);
}
function CellakRandomizalasa(){

    for(let i = 0; i< 23;i++)
    {
        var cella = {id: i+1};
        cella.type = "kártya";
        cella.kartya = KartyaData[i];
        cellak.push(cella);
    }
}
//Globál változók

var kivalaszt = false;
var kivalasztMast = true;
var kivKartyaId = null;
var kivVarId = null;
var huzottkartya = false;
var Ertekek = [];
var kezdoKartyaId;
var Ertekek = [];
var  ptszam= 50;
var ermek =[];
var hanyadikkor = 1;

function KepAtteves(div){
    if(kivalasztMast == false){
        if(kivKartyaId != null){
            var index = div.id;
            var kep = document.createElement("img");
            document.getElementById(index).removeAttribute("onclick");
            var cella = {};
            cella.id = index;
            cella.type = "kártya";
            cella.kartya = cellak[kivKartyaId].kartya;
            Ertekek[index] = cella;
            var hely = document.getElementById(index);
            kep.src = "img/Lapok/"+cellak[kivKartyaId].kartya.id+".jpg";
            hely.appendChild(kep);
            kivalaszt = false;
            kivalasztMast = true;
            if(huzottkartya){
                felhuzodiv.removeChild(document.getElementById(-1));
                huzottkartya = false;
            }
            kivKartyaId = null;
            console.clear();
            Kiszamolas();
        }
        else if(kivVarId != null){
            var index = div.id;
            var kep = document.createElement("img");
            document.getElementById(index).removeAttribute("onclick");
            var hely = document.getElementById(index);
            var cella = {};
            cella.id = index;
            cella.type = "vár";
            cella.kartya = VarData[kivVarId-1];
            Ertekek[index] = cella;
            kep.src = "img/tornyok/kek/"+kivVarId+".png";
            hely.appendChild(kep);
            kivalaszt = false;
            kivalasztMast = true;
            kivVarId = null;
            console.clear();
            Kiszamolas();
        }
    }
}
//Sor Oszlop kiszámoló
function Kiszamolas(){
    console.log("---------Sor összegek---------");
    for(var i = 0; i < 30;i+=6){
        var db = 0;
        for(var j = 1; j < 7;j++){
            for(var k = 0; k < Ertekek.length;k++){
                if(Ertekek[k]!=undefined){
                    if(Ertekek[k].id == (i+j) && Ertekek[k].type == "kártya"){
                        db += Ertekek[k].kartya.value;
                    }
                }
            }
        }
        console.log((Math.floor((i/6))+1)+". sor: "+db);
    }
    console.log("---------Oszlop összegek---------");
    for(var i = 1; i < 7;i++){
        var db = 0;
        for(var j = 0; j < 30;j+=6){
            for(var k = 0; k < Ertekek.length;k++){
                if(Ertekek[k]!=undefined){
                    if(Ertekek[k].id == (i+j) && Ertekek[k].type == "kártya"){
                        db += Ertekek[k].kartya.value;
                    }
                }
            }
        }
        console.log((i)+". oszlop: "+db); 
    }
}
function Nincstele(){
    var db = 0;
    if(Ertekek.length == 0){
        return true;
    }
    else{
        for(let i = 1;i<Ertekek.length;i++){
            db++;
            if(Ertekek[i] == undefined){
                return true;
            }
        }
        if(db==Ertekek.length-1 && Ertekek.length != 31){
            return true;
        }
        else{
            return false;
        }
    }
}

function RandomPakli()
{
    var Paklidiv = document.createElement("div");
    var cardbackimg = document.createElement("img");
    cardbackimg.src = "img/cardback.png";
    cardbackimg.id = "Kartyaback";
    Paklidiv.appendChild(cardbackimg);
    for(var i = 0; i<22;i++){
        cardbackimg.setAttribute("onclick","randomKartya()");
    }
    kartyaBox.appendChild(Paklidiv);
    hanyadikkor++;
}
var kartyalista = [];
function randomKartya(){
        if(kivalaszt == false && Nincstele()){
            kivalaszt = true;
            kivalasztMast = false;
            var kartyakep = document.createElement("img");
            var random = Math.floor(Math.random()*23);
            while(kartyalista.includes(random)){
                random = Math.floor(Math.random()*23);
            }
            kartyalista.push(random);
            kartyakep.src = "img/Lapok/"+cellak[random].kartya.id+".jpg";
            kartyakep.id = -1;
            kivKartyaId = random;
            huzottkartya = true;
            felhuzodiv.appendChild(kartyakep);
        }
}
function KezdoKezGen(){
    VarGeneralas();
    var random = Math.floor(Math.random()*23);
    while(kartyalista.includes(random)){
        random = Math.floor(Math.random()*23);
    }
    kartyalista.push(random);
    let kezdKartya = document.createElement("div");
    let img = document.createElement("img");
    img.src = "img/Lapok/"+cellak[random].kartya.id+".jpg";
    kezdKartya.appendChild(img);
    kezdoKartyaId = random;
    kezdKartya.setAttribute("onclick","kezdKartyaAttaves(this)");
    bottomdiv.appendChild(kezdKartya);
}
function VarGeneralas(){;
    for(var i = 0;i<4;i++){
        let egyes = document.createElement("div");
        let img = document.createElement("img");
        img.src = "img/tornyok/kek/1.png";
        egyes.appendChild(img);
        egyes.setAttribute("onclick","varAtteves(this,1)");
        bottomdiv.appendChild(egyes);
    }
    for(var i = 0; i<3;i++){
        let kettes = document.createElement("div");
        let img = document.createElement("img");
        img.src = "img/tornyok/kek/2.png";
        kettes.appendChild(img);
        kettes.setAttribute("onclick","varAtteves(this,2)");
        bottomdiv.appendChild(kettes);
    }
    for(var i = 0; i<2;i++){
        let harmas = document.createElement("div");
        let img = document.createElement("img");
        img.src = "img/tornyok/kek/3.png";
        harmas.appendChild(img);
        harmas.setAttribute("onclick","varAtteves(this,3)");
        bottomdiv.appendChild(harmas);
    }
    let negyes = document.createElement("div");
    let img = document.createElement("img");
    img.src = "img/tornyok/kek/4.png";
    negyes.appendChild(img);
    negyes.setAttribute("onclick","varAtteves(this,4)");
    bottomdiv.appendChild(negyes);
}

function varAtteves(div,x){
    if(kivalaszt == false && Nincstele()){
        div.removeAttribute("onclick");
        div.classList.add("Eltuntet");
        kivalaszt = true;
        kivalasztMast = false;
        kivVarId = x;
    }
}
function kezdKartyaAttaves(div){
    if(kivalaszt == false && Nincstele()){
        div.removeAttribute("onclick");
        div.classList.add("Eltuntet");
        kivalaszt = true;
        kivalasztMast = false;
        kivKartyaId = kezdoKartyaId;
    }
}

function Ermekfunct() {
    //az érme játék elején 50, és a kör végi pontok alapján nő vagy csökken, még az nincs meg mikor van kör vége ezé csak berakom az érméket.
    var ermejelen= 69;
    var divkepeknek = document.createElement("div");
    divkepeknek.id="ermekdiv";
    pontokBox.appendChild(divkepeknek);
    
    var erme1 = document.createElement("img");erme1.src = "img/Érmék/1tr.png"; var darab1=0;
    var erme5 = document.createElement("img");erme5.src = "img/Érmék/5tr.png";var darab5=0;
    var erme10 = document.createElement("img");erme10.src = "img/Érmék/10tr.png";var darab10=0;
    var erme50 = document.createElement("img");erme50.src = "img/Érmék/50tr.png";var darab50=0;
    var erme100 = document.createElement("img");erme100.src = "img/Érmék/100tr.png";var darab100=0;
    /*
    divkepeknek.appendChild(erme1);
    divkepeknek.appendChild(erme5);
    divkepeknek.appendChild(erme10);
    divkepeknek.appendChild(erme50);
    */
    while (ermejelen>0) {
        while(ermejelen>=100)
        {
            darab100++;
            ermejelen-=100;
        }
        document.getElementById("ermekdiv").innerHTML+=darab100;
            divkepeknek.appendChild(erme100);

        while(ermejelen>=50){
            darab50++;
            ermejelen-=50;
        }
        document.getElementById("ermekdiv").innerHTML+=darab50;
        divkepeknek.appendChild(erme50);

        while(ermejelen>=10){
            darab10++;
            ermejelen-=10;
        }
        document.getElementById("ermekdiv").innerHTML+=darab10;
        divkepeknek.appendChild(erme10);

        while(ermejelen>=5){
            darab5++;
            ermejelen-=5;
        }
        document.getElementById("ermekdiv").innerHTML+=darab5;
        divkepeknek.appendChild(erme5);
        while(ermejelen>=1){
            darab1++;
            ermejelen-=1;
        }
        document.getElementById("ermekdiv").innerHTML+=darab1;
        divkepeknek.appendChild(erme1);

    }
    pontokBox.appendChild(divkepeknek);
    
}

function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    CellakRandomizalasa();
    RandomPakli();
    KezdoKezGen();
    Ermekfunct();
}
Main();