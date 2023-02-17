var jatekTer = document.getElementById("jatekter");

var balPanel = document.createElement("div");
var kartyaBox = document.createElement("div");
var pontokBox = document.createElement("div");
var tabla = document.createElement("div");
var korokBox = document.createElement("div");

function JatekterBetoltes()
{
    balPanel.appendChild(kartyaBox);
    balPanel.appendChild(pontokBox);
    jatekTer.appendChild(balPanel);
    jatekTer.appendChild(tabla);
    jatekTer.appendChild(korokBox);

    kartyaBox.innerHTML = "kartyaBox";
    pontokBox.innerHTML = "pontokBox";
    tabla.innerHTML = "tabla";
    korokBox.innerHTML = "korokBox";
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
            oszlopDiv.id = k;
            k++;
            sorDiv.appendChild(oszlopDiv);
        }
        tabla.appendChild(sorDiv);
    }
}
function TablaFeltoltes(db)
{
    // tölts be egy képek az első cellába
    // véletlenszerűen válassz ki egy képet és tedd az első cellába
    // véletlen helyre helyezd el a véletlen kiválasztott képet
    // paraméter segítségével megadott darabszámú képet helyezz el, véletlen helyre
    // Generálja ki a 23 képet a 30 helyre véletlenszerűen,
    // a maradékra pedig véletlen tornyokat tegyen.
    var ht = new Array();
    var laptomb = new Array();

    for(var i = 0; i< db;i++)
    {
        var kep = document.createElement("img");
        var lapszam = Math.floor(Math.random()*23+1);
        kep.src = "img/Lapok/"+lapszam+".jpg";
        var velcella = Math.floor(Math.random()*30+1);
        while(ht.includes(velcella))
        {
            velcella = Math.floor(Math.random()*30+1);
        }
        laptomb[velcella-1] = lapszam;
        var cella = document.getElementById(velcella);
        ht.push(velcella);
        cella.appendChild(kep);
    }
    var tt = new Array("kek","piros","sarga","zold");
    for(var i = 0;i< 7;i++)
    {
        var kep = document.createElement("img");
        var toronyszam = Math.floor(Math.random()*4+1);
        kep.src = "img/tornyok/"+tt[Math.floor(Math.random()*4+1)-1]+"/"+toronyszam+".png";
        var velcella = Math.floor(Math.random()*30+1);
        while(ht.includes(velcella))
        {
            velcella = Math.floor(Math.random()*30+1);
        }
        laptomb[velcella-1] = "t"+toronyszam;
        var cella = document.getElementById(velcella);
        ht.push(velcella);
        cella.appendChild(kep);
    }

    var sorErtekek = SorErtek(laptomb);
    var oszlopErtekek = OszlopErtek(laptomb);
    console.log(sorErtekek);
    console.log(oszlopErtekek);

}
function SorErtek(laptomb)
{
    var lapertek = [-3,2,5,4,3,0,-6,6,0,2,0,-5,4,0,5,6,-4,1,-1,-2,0,3,1];
    var set = new Array();
    var ans = 0;
    for(var i = 0;i<30;i+=6)
    {
        ans = 0;
        for(var j = 0;j<6;j++)
        {
            let ertek = laptomb[i+j];
            if(ertek[0]=="t"){
                //console.log("TORONY\nérték:"+ertek[1])
                ans+=parseInt(ertek[1]);
            }
            else{
                //console.log("LAP\nérték:"+(lapertek[ertek-1]))
                ans +=parseInt(lapertek[ertek-1]);
            }
            //console.log("ANS:"+ans)
        }
        set.push(ans);
        //console.log("PUSH:"+ans)
    }
    return set;
}

function OszlopErtek(laptomb)
{
    var lapertek = [-3,2,5,4,3,0,-6,6,0,2,0,-5,4,0,5,6,-4,1,-1,-2,0,3,1];
    var set = new Array();
    var ans = 0;
    for(var i = 0;i<30;i+=5)
    {
        
        for(var j = 0;j<5;j++)
        {
            ans = 0;
            let ertek = laptomb[j+i];
            if(ertek[0]=="t"){
                //console.log("TORONY\nérték:"+ertek[1])
                ans+=parseInt(ertek[1]);
            }
            else{
                //console.log("LAP\nérték:"+(lapertek[ertek-1]))
                ans +=parseInt(lapertek[ertek-1]);
            }
            //console.log("ANS:"+ans)
        }
        set.push(ans);
        //console.log("PUSH:"+ans)
    }
    return set;
}
function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    TablaFeltoltes(23);
}
Main();