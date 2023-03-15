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

//Globál változók

var cellak = [];

var kivalaszt = false;
var kivalasztMast = true;
var kivKartyaId = null;
var kivVarId = null;
var huzottkartya = false;
var ertekek = [];
var kezdoKartyaId = null;

var kartyalista = [];

//Nem resetelendő globál változók
var kezdoKor = true; 
var pontSzam = 50;
var round = 1;



//Divek játékhozfűzése
function JatekterBetoltes()
{
    balPanel.appendChild(kartyaBox);
    balPanel.appendChild(pontokBox);
    jatekTer.appendChild(balPanel);
    jatekTer.appendChild(tabla);
    jatekTer.appendChild(korokBox);

    document.body.appendChild(playerdiv);
    playerdiv.appendChild(bottomdiv);
    playerdiv.appendChild(felhuzodiv);
}
//Id adás
function JatekterElrendezes()
{
    balPanel.id = "balpanel";
    kartyaBox.id = "kartyabox";
    pontokBox.id = "pontokbox";
    tabla.id = "tabla";
    korokBox.id = "korokbox";

    playerdiv.id = "Playerdiv";
    bottomdiv.id = "Bottomdiv";
    felhuzodiv.id = "Felhuzodiv";
}
//Tábla feltöltése divekkel
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
}

//Jelenlegi kör megjelenítése
function KorokHelyzete(){ 
    for (let i = 1; i < 4; i++) {
        
        var divek=document.createElement("div");
        divek.id="div"+i+"kor"
        divek.innerText=i+".Kör!"
        if (i==round) {
            divek.style.fontWeight="bold";
            divek.style.border= "3px solid #333333";
            divek.style.backgroundColor="#D3D3D3"
        }
        korokBox.appendChild(divek);
        
    }
}

//Cellak tömb feltöltése
function CellakFeltoltes(){

    for(let i = 0; i< 23;i++)
    {
        var cella = {id: i+1};
        cella.type = "kártya";
        cella.kartya = KartyaData[i];
        cellak.push(cella);
    }
}

//tábla divek onlcickje
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
            ertekek[index] = cella;
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
            if(!Nincstele()){
                round++;
                kezdoKor = false;
                Osszegzes();
                UjKor();
            }
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
            ertekek[index] = cella;
            kep.src = "img/tornyok/kek/"+kivVarId+".png";
            hely.appendChild(kep);
            kivalaszt = false;
            kivalasztMast = true;
            kivVarId = null;
            if(!Nincstele()){
                round++;
                kezdoKor = false;
                Osszegzes();
                UjKor();
            }
        }
    }
}
//Sor Oszlop kiszámoló
function Osszegzes(){
    /*console.log("---------Sor összegek---------");
    for(var i = 0; i < 30;i+=6){
        var db = 0;
        for(var j = 1; j < 7;j++){
            for(var k = 0; k < ertekek.length;k++){
                if(ertekek[k]!=undefined){
                    if(ertekek[k].id == (i+j) && ertekek[k].type == "kártya"){
                        db += ertekek[k].kartya.value;
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
            for(var k = 0; k < ertekek.length;k++){
                if(ertekek[k]!=undefined){
                    if(ertekek[k].id == (i+j) && ertekek[k].type == "kártya"){
                        db += ertekek[k].kartya.value;
                    }
                }
            }
        }
        console.log((i)+". oszlop: "+db); 
    }*/
    for(var i = 0; i < ertekek.length;i++){
        if(ertekek[i]!=undefined){
            if(ertekek[i].kartya.sign="pap"){
                console.log(i);
                VarazsloHely(i);
                break;
            }
        }
    }

    var Sorok = [];
    //sorok
    for(var i = 0; i < 30;i+=6){
        var sorOsszegek = [];
        var sorVarOsszegek = [];
        var jelzes = "";
        for(var j = 1; j < 7;j++){
            if(ertekek[(i+j)].type=="kártya"){
                sorOsszegek.push(ertekek[(i+j)].kartya.value);
                if(ertekek[(i+j)].kartya.sign==""){
                    jelzes = ertekek[(i+j)].kartya.sign;
                }
            }
            else{
                if(ertekek[(i+j)].megnovelt != undefined){
                    sorVarOsszegek.push(ertekek[(i+j)].kartya.value+1);
                }
                else{
                    sorVarOsszegek.push(ertekek[(i+j)].kartya.value);
                }
            }
        }
        if(jelzes!="" || jelzes!="hegy"){
            if(jelzes=="sarkany"){
                for(var k = 0;k<sorOsszegek.length;k++){
                    if(sorOsszegek[k]>0){
                        sorOsszegek[k]=0;
                    }
                }
            }
            else if(jelzes=="taliga"){
                for(var k = 0;k<sorOsszegek.length;k++){
                    sorOsszegek[k] *= 2;
                }
            }
        }
        Sorok.push(Sum(sorOsszegek)*Sum(sorVarOsszegek));
    }

    var Oszlopok = [];
    //Oszlopok

    var oszlopOsszegek = [];
    var oszlopVarOsszegek = [];
}

function Sum(t){
    let ans = 0; 
    for(var i = 0;i<t.length;i++){
        ans+=t[i];
    }
    return ans;
}

function VarazsloHely(x){
    //tetején
    if((x-6)<=0 && x%6!=1 && x%6!=0){
        //balra check
        console.log(x-1+"bal")
        if(ertekek[x-1].type == "vár" && ertekek[x-1].kartya.value != 4){
            ertekek[x-1].megnovelt = true;
        }
        //jobbra check
        console.log(x+1+"jobb")
        if(ertekek[x+1].type == "vár" && ertekek[x+1].kartya.value != 4){
            ertekek[x+1].megnovelt = true;
        }
        //le check
        console.log(x+6+"le")
        if(ertekek[x+6].type == "vár" && ertekek[x+6].kartya.value != 4){
            ertekek[x+6].megnovelt = true;
        }
    }
    //alján
    else if((x+6)>=31 && x%6!=1 && x%6!=0){
        //balra check
        if(ertekek[x-1].type == "vár" && ertekek[x-1].kartya.value != 4){
            ertekek[x-1].megnovelt = true;
        }
        //jobbra check
        if(ertekek[x+1].type == "vár" && ertekek[x+1].kartya.value != 4){
            ertekek[x+1].megnovelt = true;
        }
        //fel check
        if(ertekek[x-6].type == "vár" && ertekek[x-6].kartya.value != 4){
            ertekek[x-6].megnovelt = true;
        }
    }
    //bal szélén
    else if(x%6==1 && (x-6)>0 && (x+6)<31){
        //jobbra check
        if(ertekek[x+1].type == "vár" && ertekek[x+1].kartya.value != 4){
            ertekek[x+1].megnovelt = true;
        }
        //le check
        if(ertekek[x+6].type == "vár" && ertekek[x+6].kartya.value != 4){
            ertekek[x+6].megnovelt = true;
        }
        //fel check
        if(ertekek[x-6].type == "vár" && ertekek[x-6].kartya.value != 4){
            ertekek[x-6].megnovelt = true;
        }
    }
    //jobb szélén
    else if(x%6==0 && (x-6)>0 && (x+6)<31){
        //balra check
        if(ertekek[x-1].type == "vár" && ertekek[x-1].kartya.value != 4){
            ertekek[x-1].megnovelt = true;
        }
        //le check
        if(ertekek[x+6].type == "vár" && ertekek[x+6].kartya.value != 4){
            ertekek[x+6].megnovelt = true;
        }
        //fel check
        if(ertekek[x-6].type == "vár" && ertekek[x-6].kartya.value != 4){
            ertekek[x-6].megnovelt = true;
        }
    }
    //tetején bal sarok
    else if((x-6)<=0 && x%6==1){
        //jobbra check
        if(ertekek[x+1].type == "vár" && ertekek[x+1].kartya.value != 4){
            ertekek[x+1].megnovelt = true;
        }
        //le check
        if(ertekek[x+6].type == "vár" && ertekek[x+6].kartya.value != 4){
            ertekek[x+6].megnovelt = true;
        }
    }
    //tetején jobb sarok
    else if((x-6)<=0 && x%6==0){
        //balra check
        if(ertekek[x-1].type == "vár" && ertekek[x-1].kartya.value != 4){
            ertekek[x-1].megnovelt = true;
        }
        //le check
        if(ertekek[x+6].type == "vár" && ertekek[x+6].kartya.value != 4){
            ertekek[x+6].megnovelt = true;
        }
    }
    //alján bal sarok
    else if((x+6)>=31 && x%6==1){
        //jobbra check
        if(ertekek[x+1].type == "vár" && ertekek[x+1].kartya.value != 4){
            ertekek[x+1].megnovelt = true;
        }
        //fel check
        if(ertekek[x-6].type == "vár" && ertekek[x-6].kartya.value != 4){
            ertekek[x-6].megnovelt = true;
        }
    }
    //alján jobb sarok
    else if((x+6)>=31 && x%6==0){
        //balra check
        if(ertekek[x-1].type == "vár" && ertekek[x-1].kartya.value != 4){
            ertekek[x-1].megnovelt = true;
        }
        //fel check
        if(ertekek[x-6].type == "vár" && ertekek[x-6].kartya.value != 4){
            ertekek[x-6].megnovelt = true;
        }
    }
    //nincs szélen
    else{
        //balra check
        if(ertekek[x-1].type == "vár" && ertekek[x-1].kartya.value != 4){
            ertekek[x-1].megnovelt = true;
        }
        //jobbra check
        if(ertekek[x+1].type == "vár" && ertekek[x+1].kartya.value != 4){
            ertekek[x+1].megnovelt = true;
        }
        //le check
        if(ertekek[x+6].type == "vár" && ertekek[x+6].kartya.value != 4){
            ertekek[x+6].megnovelt = true;
        }
        //fel check
        if(ertekek[x-6].type == "vár" && ertekek[x-6].kartya.value != 4){
            ertekek[x-6].megnovelt = true;
        }
    }
}

function Nincstele(){
    var db = 0;
    if(ertekek.length == 0){
        return true;
    }
    else{
        for(let i = 1;i<ertekek.length;i++){
            db++;
            if(ertekek[i] == undefined){
                return true;
            }
        }
        if(db==ertekek.length-1 && ertekek.length != 31){
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
    cardbackimg.setAttribute("onclick","randomKartya(this)");
    kartyaBox.appendChild(Paklidiv);
}

function randomKartya(img){
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
        if(kartyalista.length==23){
            img.removeAttribute("onclick");
            img.src = "img/kifogyottCardback.png";
        }
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
    var ermejelen = pontSzam;
    var divkepeknek = document.createElement("div");
    divkepeknek.id="ermekdiv";
    pontokBox.appendChild(divkepeknek);
    
    var erme1 = document.createElement("img");erme1.src = "img/Érmék/1tr.png"; var darab1=0;
    var erme5 = document.createElement("img");erme5.src = "img/Érmék/5tr.png";var darab5=0;
    var erme10 = document.createElement("img");erme10.src = "img/Érmék/10tr.png";var darab10=0;
    var erme50 = document.createElement("img");erme50.src = "img/Érmék/50tr.png";var darab50=0;
    var erme100 = document.createElement("img");erme100.src = "img/Érmék/100tr.png";var darab100=0;
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

function UjKor(){
    if(round==4){
        //tabla.innerText += "VÉGEVAAN";
    }
    else{
        GlobalValtozoVisszaAllitas();
        tabla.innerHTML = "";
        kartyaBox.innerHTML = "";
        bottomdiv.innerHTML = "";
        felhuzodiv.innerHTML = "";
        pontokBox.innerHTML = "";
        korokBox.innerHTML = "";
        Main();
    }
}

function GlobalValtozoVisszaAllitas(){
    kivalaszt = false;
    kivalasztMast = true;
    kivKartyaId = null;
    kivVarId = null;
    huzottkartya = false;
    ertekek = [];
    kezdoKartyaId = null;
    kartyalista = [];
    cellak = [];
}

function Main()
{
    if(kezdoKor){
        JatekterBetoltes();
        JatekterElrendezes();
    }
    TablaGeneralas();
    KorokHelyzete();
    CellakFeltoltes();
    RandomPakli();
    KezdoKezGen();
    Ermekfunct();
}
Main();

