var config = {
  apiKey: "AIzaSyBiLM01CIZdzyQsXeldj38WhGU77g0oa9A",
  authDomain: "vistamar-f5112.firebaseapp.com",
  databaseURL: "https://vistamar-f5112.firebaseio.com",
  projectId: "vistamar-f5112",
  storageBucket: "vistamar-f5112.appspot.com",
  messagingSenderId: "39724864320"
};
firebase.initializeApp(config);

var rangeOp     = $('#rangeOption');
var varietiesOp = $('#varietiesOption');
var vintageOp   = $('#vintageOption');

const table = $('#tablaVinos');

const dbRefVinos      = firebase.database().ref().child('VINOS');

const dbRefVarieties  = firebase.database().ref().child('VARIETIES');
const dbRefRange      = firebase.database().ref().child('RANGE');
const dbRefVintage    = firebase.database().ref().child('VINTAGE');

const dbRefQRangeVarietiesVintage      = firebase.database().ref().child('QRangeVarietiesVintage');
const dbRefQRangeVintageVarieties      = firebase.database().ref().child('QRangeVintageVarieties');

const dbRefQVintageVarietiesRange      = firebase.database().ref().child('QVintageVarietiesRange');
const dbRefQVintageRangeVarieties      = firebase.database().ref().child('QVintageRangeVarieties');

const dbRefQVarietiesVintageRange      = firebase.database().ref().child('QVarietiesVintageRange');
const dbRefQVarietiesRangeVintage      = firebase.database().ref().child('QVarietiesRangeVintage');


rangeOp.change( function(){
    animal();
});

varietiesOp.change(function () {
    animal();
});

vintageOp.change(function () {
    animal();
});

$(document).ready(function (){

  //  QUERYS

    const qVinosAll = dbRefVinos.orderByKey();

    const qRangeAll = dbRefRange.orderByKey();
    const qVarietiesAll = dbRefVarieties.orderByKey();
    const qVintageAll = dbRefVintage.orderByKey();


    //  GET FILTER All DATA 
    
    qVintageAll.once("value", function(snapshot) {
        vintageOp.append($('<option>').text("All Vintage")); 
        snapshot.forEach(function(child) {
            //console.log(child.val());
            vintageOp.append($('<option>').text(child.val()));   
        });
    });

    qVarietiesAll.once("value", function(snapshot) {
        varietiesOp.append($('<option>').text("All Varieties"));
        snapshot.forEach(function(child) {
            //console.log(child.val()); 
            varietiesOp.append($('<option>').text(child.val()));  
        });
    });
    qRangeAll.once("value", function(snapshot) {
        rangeOp.append($('<option>').text("All Range"));
        snapshot.forEach(function(child) {
        //console.log(child.val());   
        rangeOp.append($('<option>').text(child.val()));
        });
    });

    //  GET ALL DATA TABLE

    qVinosAll.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            table.append('<tr><td>'+child.val().RANGE+
                         '</td><td>'+child.val().VARIETIES+
                         '</td><td>'+child.val().VINTAGE+
                         '</td><td>'+child.val().AWARD+
                         '</td><td>'+child.val().INFO+'</td></tr>');

        });
    });
});



function animal() {
    var dataA = $('#rangeOption option:selected').val() ;
    var dataB = $('#varietiesOption option:selected').val() ;
    var dataC = $('#vintageOption option:selected').val() ;

    console.log('DATA A: '+ dataA);
    console.log('DATA B: '+ dataB);
    console.log('DATA C: '+ dataC);
    
    if (dataA == "All Range" && dataB == "All Varieties" && dataC == "All Vintage") {
      console.log("0");

      //  QUERYS

      const qRangeAll     = dbRefRange.orderByKey();
      const qVarietiesAll = dbRefVarieties.orderByKey();
      const qVintageAll   = dbRefVintage.orderByKey();

      //  RELOAD FILTERS
      
      qVintageAll.once("value", function(snapshot) {
          vintageOp.empty();
          vintageOp.append($('<option>').text("All Vintage")); 
          snapshot.forEach(function(child) {
              //console.log(child.val());
              vintageOp.append($('<option>').text(child.val()));   
          });
      });

      qVarietiesAll.once("value", function(snapshot) {
          varietiesOp.empty();
          varietiesOp.append($('<option>').text("All Varieties"));
          snapshot.forEach(function(child) {
              //console.log(child.val()); 
              varietiesOp.append($('<option>').text(child.val()));  
          });
      });
      qRangeAll.once("value", function(snapshot) {
          rangeOp.empty();
          rangeOp.append($('<option>').text("All Range"));
          snapshot.forEach(function(child) {
          //console.log(child.val());   
          rangeOp.append($('<option>').text(child.val()));
          });
      });

      // RELOAD DATA ON TABLE
      const qVinosAll = dbRefVinos.orderByKey();

      qVinosAll.once("value", function(snapshot) {
                $('#tablaVinos tbody').empty();
                snapshot.forEach(function(child) {   
                    table.append('<tr><td>'+child.val().RANGE+
                                 '</td><td>'+child.val().VARIETIES+
                                 '</td><td>'+child.val().VINTAGE+
                                 '</td><td>'+child.val().AWARD+
                                 '</td><td>'+child.val().INFO+'</td></tr>');
          });
      });
      
    }else if (dataA == "All Range" && dataB == "All Varieties" && dataC != "All Vintage") {
        console.log("1");

        const query = dbRefVinos.orderByChild("VINTAGE").equalTo(dataC);
        // RELOAD TABLE
        $('#tablaVinos tbody').empty();
        query.once("value", function(snapshot) {
            $('#tablaVinos tbody').empty();
            snapshot.forEach(function(child) {
                table.append('<tr><td>'+child.val().RANGE+
                             '</td><td>'+child.val().VARIETIES+
                             '</td><td>'+child.val().VINTAGE+
                             '</td><td>'+child.val().AWARD+
                             '</td><td>'+child.val().INFO+'</td></tr>');  
            });
        });

        // RELOAD FILTERS

        // Parche de String No necesita por que es una fecha :)
       
        const dbRefQVintageRangeVarieties     = firebase.database().ref().child('QVintageRangeVarieties/'+dataC);
        const queryRange                      = dbRefQVintageRangeVarieties.orderByValue()
        queryRange.once("value", function(snapshot) {
                  rangeOp.empty();
                  rangeOp.append($('<option>').text("All Range"));
                  snapshot.forEach(function(child) {
                    var aux =  child.key;
                    aux     = RangeDbase2Option(aux);  // CONVERTIR DATO DE BASE A OPTION
                    rangeOp.append($('<option>').text(aux));    
                    console.log("qRange :" + aux);
              });
        });

        const dbRefQVintageVarietiesRange     = firebase.database().ref().child('QVintageVarietiesRange/'+dataC);
        const queryVarieties                  = dbRefQVintageVarietiesRange.orderByValue();
        queryVarieties .once("value", function(snapshot) {
                  varietiesOp.empty();
                  varietiesOp.append($('<option>').text("All Varieties"));
                  snapshot.forEach(function(child) {
                    var aux =  child.key;
                    aux     = VarietiesDbase2Option(aux);
                    varietiesOp.append($('<option>').text(aux));    
                    console.log("qVarietes :" + aux);
              });
        });

    }else if (dataA == "All Range" && dataB != "All Varieties" && dataC == "All Vintage") {
        console.log("2");


        const query = dbRefVinos.orderByChild("VARIETIES").equalTo(dataB);
        
        // RELOAD TABLE
        $('#tablaVinos tbody').empty();
        query.once("value", function(snapshot) {
            $('#tablaVinos tbody').empty();
            snapshot.forEach(function(child) {
                table.append('<tr><td>'+child.val().RANGE+
                             '</td><td>'+child.val().VARIETIES+
                             '</td><td>'+child.val().VINTAGE+
                             '</td><td>'+child.val().AWARD+
                             '</td><td>'+child.val().INFO+'</td></tr>');  
            });
        });

        // RELOAD FILTERS
       
        dataB = VarietiesOption2Dbase(dataB); 
        console.log("new data B:", dataB);
        const dbRefQVarietiesRangeVintage   = firebase.database().ref().child('QVarietiesRangeVintage/'+dataB);
        const queryRange                    = dbRefQVarietiesRangeVintage.orderByValue();
        queryRange.once("value", function(snapshot) {
                  rangeOp.empty();
                  rangeOp.append($('<option>').text("All Range"));
                  snapshot.forEach(function(child) {
                    var aux =  child.key;
                    aux = RangeDbase2Option(aux);   // DESCONVERTIR DE BASE A OPTION
                    rangeOp.append($('<option>').text(aux));    
                    console.log("qRange :" + aux);
              });
        });

        const dbRefQVarietiesVintageRange    = firebase.database().ref().child('QVarietiesVintageRange/'+dataB);
        const queryVintage                   = dbRefQVarietiesVintageRange.orderByValue();
        queryVintage .once("value", function(snapshot) {
                  vintageOp.empty();
                  vintageOp.append($('<option>').text("All Vintage"));
                  snapshot.forEach(function(child) {
                    var aux =  child.key;
                    vintageOp.append($('<option>').text(aux));     // DESCONVERTIR DE BASE A OPTION
                    console.log("qVintage :" + aux);
              });
        });


    }else if (dataA == "All Range" && dataB != "All Varieties" && dataC != "All Vintage") {
        console.log("3");

        const query =dbRefVinos.orderByChild("VARIETIES_VINTAGE").equalTo(dataB+"_"+dataC);
        
        // RELOAD TABLE
        $('#tablaVinos tbody').empty();
        query.once("value", function(snapshot) {
            $('#tablaVinos tbody').empty();
            snapshot.forEach(function(child) {
                table.append('<tr><td>'+child.val().RANGE+
                             '</td><td>'+child.val().VARIETIES+
                             '</td><td>'+child.val().VINTAGE+
                             '</td><td>'+child.val().AWARD+
                             '</td><td>'+child.val().INFO+'</td></tr>');  
            });
        });


        varietiesOp.empty();
        varietiesOp.append($('<option>').text("All Varieties"));
        varietiesOp.append($('<option>').text(dataB).attr("selected","selected")); 

        // RELOAD ANOTHER OPTION
        
        dataB = VarietiesOption2Dbase(dataB);

       
        const dbRefQVarietiesVintageRange     = firebase.database().ref().child('QVarietiesVintageRange/'+dataB+'/'+dataC);
        const queryRange                      = dbRefQVarietiesVintageRange.orderByKey();
        queryRange.once("value", function(snapshot) {
                  rangeOp.empty();
                  rangeOp.append($('<option>').text("All Range"));
                  snapshot.forEach(function(child) {
                    var aux =  child.val();
                    aux = RangeDbase2Option(aux);
                    rangeOp.append($('<option>').text(aux));    
                    console.log("qRange :" + aux);
              });
        });




    }else if (dataA != "All Range" && dataB == "All Varieties" && dataC == "All Vintage") {
        console.log("4");
       
        const query =dbRefVinos.orderByChild("RANGE").equalTo(dataA);
        $('#tablaVinos tbody').empty();
        // RELOAD TABLE
        query.once("value", function(snapshot) {
            $('#tablaVinos tbody').empty();
            snapshot.forEach(function(child) {
                table.append('<tr><td>'+child.val().RANGE+
                             '</td><td>'+child.val().VARIETIES+
                             '</td><td>'+child.val().VINTAGE+
                             '</td><td>'+child.val().AWARD+
                             '</td><td>'+child.val().INFO+'</td></tr>');  
            });
        });
        // RELOAD ANOTHER OPTION

        // Parche de String 
        dataA = RangeOption2Dbase(dataA);
                  
        const dbRefQRangeVarietiesVintage      = firebase.database().ref().child('QRangeVarietiesVintage/'+dataA);
        const queryVarieties                   = dbRefQRangeVarietiesVintage.orderByValue();
        queryVarieties.once("value", function(snapshot) {
                  varietiesOp.empty();
                  varietiesOp.append($('<option>').text("All Varieties"));
                  snapshot.forEach(function(child) {
                    var aux =  child.key;
                    aux = VarietiesDbase2Option(aux);
                    varietiesOp.append($('<option>').text(aux));    
                    console.log("qVarietes :" + aux);
              });
        });

        const dbRefQRangeVintageVarieties     = firebase.database().ref().child('QRangeVintageVarieties/'+dataA);
        const queryVintage                    = dbRefQRangeVintageVarieties.orderByValue();
        queryVintage .once("value", function(snapshot) {
                  vintageOp.empty();
                  vintageOp.append($('<option>').text("All Vintage"));
                  snapshot.forEach(function(child) {
                    vintageOp.append($('<option>').text(child.key));    
                    console.log("qVintage :" + child.key);
              });
        });
    
    }else if (dataA != "All Range" && dataB == "All Varieties" && dataC != "All Vintage") {
        console.log("5");

        const query =dbRefVinos.orderByChild("RANGE_VINTAGE").equalTo(dataA+"_"+dataC);
        $('#tablaVinos tbody').empty();
        // RELOAD TABLE
        query.once("value", function(snapshot) {
            $('#tablaVinos tbody').empty();
            snapshot.forEach(function(child) {
                table.append('<tr><td>'+child.val().RANGE+
                             '</td><td>'+child.val().VARIETIES+
                             '</td><td>'+child.val().VINTAGE+
                             '</td><td>'+child.val().AWARD+
                             '</td><td>'+child.val().INFO+'</td></tr>');  
            });
        });

        rangeOp.empty();
        rangeOp.append($('<option>').text("All Range"));
        rangeOp.append($('<option>').text(dataA).attr("selected","selected")); 

        varietiesOp.empty();
        varietiesOp.append($('<option>').text("All Varieties"));
        varietiesOp.append($('<option>').text(dataB).attr("selected","selected")); 

        
        dataA = RangeOption2Dbase(dataA);
        // RELOAD ANOTHER OPTION

        // Parche de String No necesita por que es una fecha :)
       
        const dbRefQRangeVintageVarieties     = firebase.database().ref().child('QRangeVintageVarieties/'+dataA+'/'+dataC);
        const queryVarieties                   = dbRefQRangeVintageVarieties.orderByKey();
        queryVarieties.once("value", function(snapshot) {
                  varietiesOp.empty();
                  varietiesOp.append($('<option>').text("All varietiesOp"));
                  snapshot.forEach(function(child) {
                    var aux =  child.val();
                    aux = RangeDbase2Option(aux);
                    varietiesOp.append($('<option>').text(aux));    
                    console.log("qRange :" + aux);
              });
        });
    }else if (dataA != "All Range" && dataB != "All Varieties" && dataC == "All Vintage") {
        console.log("6");

        const query =dbRefVinos.orderByChild("RANGE_VARIETIES").equalTo(dataA+"_"+dataB);
        $('#tablaVinos tbody').empty();
        // RELOAD TABLE
        query.once("value", function(snapshot) {
            $('#tablaVinos tbody').empty();
            snapshot.forEach(function(child) {
                table.append('<tr><td>'+child.val().RANGE+
                             '</td><td>'+child.val().VARIETIES+
                             '</td><td>'+child.val().VINTAGE+
                             '</td><td>'+child.val().AWARD+
                             '</td><td>'+child.val().INFO+'</td></tr>');  
            });
        });

        varietiesOp.empty();
        varietiesOp.append($('<option>').text("All Varieties"));
        varietiesOp.append($('<option>').text(dataB).attr("selected","selected")); 

        rangeOp.empty();
        rangeOp.append($('<option>').text("All Range"));
        rangeOp.append($('<option>').text(dataA).attr("selected","selected")); 

        // RELOAD ANOTHER OPTION
        
        dataA = RangeOption2Dbase(dataA);
        dataB = VarietiesOption2Dbase(dataB);

        const dbRefQRangeVarietiesVintage   = firebase.database().ref().child('QRangeVarietiesVintage/'+dataA+'/'+dataB);
        const queryVintage                = dbRefQRangeVarietiesVintage.orderByKey();
        queryVintage.once("value", function(snapshot) {
                  vintageOp.empty();
                  vintageOp.append($('<option>').text("All Vintage"));
                  snapshot.forEach(function(child) {
                    var aux =  child.val();
                    vintageOp.append($('<option>').text(aux));    
                    console.log("qVintage6 :" + aux);
              });
        });
    }else if (dataA != "All Range" && dataB != "All Varieties" && dataC != "All Vintage") {
        console.log("7");

        const query =dbRefVinos.orderByChild("RANGE_VARIETIES_VINTAGE").equalTo(dataA+"_"+dataB+"_"+dataC);
        $('#tablaVinos tbody').empty();
        // RELOAD TABLE
        query.once("value", function(snapshot) {
            $('#tablaVinos tbody').empty();
            snapshot.forEach(function(child) {
                table.append('<tr><td>'+child.val().RANGE+
                             '</td><td>'+child.val().VARIETIES+
                             '</td><td>'+child.val().VINTAGE+
                             '</td><td>'+child.val().AWARD+
                             '</td><td>'+child.val().INFO+'</td></tr>');  
            });
        });

    }

}

function RangeOption2Dbase(data) {
   var dataAux;
        if (data == "Gran Reserva") {
          return  dataAux ="GranReserva" ;
        }else if (data == "Corte de Campo"){
          return  dataAux = "CortedeCampo"; 
        }else if (data == "Sepia Reserva"){
          return  dataAux = "SepiaReserva";
        }else if (data =="Late Harvest"){
          return  dataAux = "LateHarvest";
        } else {
          return data;
        }

}

function RangeDbase2Option(data) {
   var dataAux;
        if (data == "GranReserva") {
          return  dataAux ="Gran Reserva" ;
        }else if (data == "CortedeCampo"){
          return  dataAux = "Corte de Campo"; 
        }else if (data == "SepiaReserva"){
          return  dataAux = "Sepia Reserva";
        }else if (data =="LateHarvest"){
          return  dataAux = "Late Harvest";
        } else {
          return data;
        }

}

function VarietiesOption2Dbase(data){
     var dataAux;
        if (data == "Cabernet Sauvignon / Syrah" ) {
          return  dataAux =  "CabernetSauvignonSyrah" ;
        }else if (data == "Andes - Cab. Sauv /Carmenère/ Petite Sirah /Petit Verdot" ){
          return  dataAux = "AndesCabSauvCarmenerePetiteSirahPetitVerdot"; 
        }else if (data == "Coastal - Chardonnay / Viognier"){
          return  dataAux =  "CoastalChardonnayViognier";
        }else if (data == "Cabernet Sauvignon"){
          return  dataAux =  "CabernetSauvignon";
        }else if (data == "Carmenère" ){
          return  dataAux = "Carmenere";
        }else if (data == "Pinot Noir" ){
          return  dataAux =  "PinotNoir";
        }else if (data == "Sauvignon Blanc" ){
          return  dataAux =  "SauvignonBlanc";
        } else {
          return data;
        }
}
function VarietiesDbase2Option(data){
     var dataAux;
        if (data == "CabernetSauvignonSyrah") {
          return  dataAux = "Cabernet Sauvignon / Syrah" ;
        }else if (data == "AndesCabSauvCarmenerePetiteSirahPetitVerdot"){
          return  dataAux = "Andes - Cab. Sauv /Carmenère/ Petite Sirah /Petit Verdot"; 
        }else if (data == "CoastalChardonnayViognier" ){
          return  dataAux = "Coastal - Chardonnay / Viognier";
        }else if (data =="CabernetSauvignon" ){
          return  dataAux = "Cabernet Sauvignon";
        }else if (data =="Carmenere"  ){
          return  dataAux = "Carmenère";
        }else if (data =="PinotNoir"  ){
          return  dataAux = "Pinot Noir";
        }else if (data == "SauvignonBlanc"){
          return  dataAux = "Sauvignon Blanc";
        } else {
          return data;
        }
}

