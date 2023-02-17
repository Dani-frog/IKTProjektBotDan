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
    //tabla.innerHTML = "tabla";
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
            var kep = document.createElement("img");
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
    var ht =new Array();
    for(var i = 0; i< db;i++)
    {
        var kep = document.createElement("img");
        kep.src = "img/Lapok/"+Math.floor(Math.random()*23+1)+".jpg";
        var velcella = Math.floor(Math.random()*30+1);
        
        while(ht.includes(velcella))
        {
            velcella = Math.floor(Math.random()*30+1);
        }
        var cella = document.getElementById(velcella);
        ht.push(velcella);
        cella.appendChild(kep);
    }
    var tt =new Array("kek","piros","sarga","zold");
    for(var i = 0; i< 7;i++)
    {
        var kep = document.createElement("img");

        kep.src = "img/tornyok/"+tt[Math.floor(Math.random()*4+1)-1]+"/"+Math.floor(Math.random()*4+1)+".png";
        while(ht.includes(velcella))
        {
            velcella = Math.floor(Math.random()*30+1);
        }
        var cella = document.getElementById(velcella);
        ht.push(velcella);
        cella.appendChild(kep);
    }

}
function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    TablaFeltoltes(23);
}
Main();