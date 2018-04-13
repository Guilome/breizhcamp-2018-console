var service = require('./service');
var menu = require('./menu');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function() {
  chargement();
};

function chargement(){
  rl.question(menu.afficher(), function(saisie) {
    switch (saisie) {
      case '1':
        service.init(function(nb) {
          console.log('[init]', nb, 'sessions trouvées.')
        });
        chargement();
        break;
      case '2':
        service.listerSessions(function(values) {
          values.forEach(function(val) {
             console.log(val.name+ " ("+ val.speakers+")\n")
          });
        });
        chargement();
        break;
      case '3':
        service.listerPresentateurs(function(fullNames) {
          fullNames.forEach(function(fullName) {
            console.log(fullName.name)
          });
        });
        chargement();
        break;
      case '4':
        var vues = [];
        rl.question("Quel mot recherchez-vous ? : ", function(recherche) {
          service.listerSessions(function(values) {
            values.forEach(function(val) {
              var lowerName = (val.name).toLowerCase();
               if (lowerName.includes(recherche.toLowerCase())) {
                 vues.push({
                   "session":val
                 });
               }
            });
         });
       });
        var i = 1;
        vues.forEach(function(vue){
          console.log(i+". "+vue.name);
          i++;
        })
        menu.menuSession();
        chargement();
        break;
      case '99':
        rl.close();
        break;
    }
  });
}
