function app() {
    var mainMod = this;
//Private
    var mainModules = {};
//Public
    mainMod.moduleConfig = ko.observable();
    mainMod.locale = function(attName, par){
         return koMods.translator.translateAtt(mainMod.moduleConfig().name,attName, par);
    };

    mainMod.onkoModAppear = function(_mainModules){
          console.log("app onLoad");
          for(var i in _mainModules){
              mainModules[_mainModules[i].name] = _mainModules[i];
          }
    };

    mainMod.loadMainModule = function(mainModName){
        var mod2L = mainModules[mainModName];
        $(".mainModule").hide("fast");
        $("#side-menu li").removeClass("active");
        if(!mod2L.type || mod2L.type !== "page"){
            $("#menItm_"+mod2L.name).addClass("active");
            $("#koMod"+mod2L.name).show();
            koMods[mod2L.name].onkoModAppear();
        }
    };

}

koMods["app"] = new app();
