function userAdminAndDash() {
    var mainMod = this;
//Private

//Public
    mainMod.moduleConfig = ko.observable();
    mainMod.locale = function(attName, par){
         return koMods.translator.translateAtt(mainMod.moduleConfig().name,attName, par);
    }

    mainMod.welcomeMsg = ko.observable("Welcome To Main userAdminAndDash Model");
    mainMod.onkoModAppear = function(){
          console.log(mainMod.moduleConfig().name+" onLoad");
    };


}

koMods["userAdminAndDash"] = new userAdminAndDash();
