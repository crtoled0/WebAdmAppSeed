function Translator() {
    var mainMod = this;
//Private
    var modLocales = {};
    var loadLocalInfo = function(callback){
            var locInfoUrl = "http://ip-api.com/json";
            $.get(locInfoUrl, function(_locInfo){
               callback(_locInfo);
            });
    };
//Public
    mainMod.lang = ko.observable("en");
    mainMod.loadModuleLocale = function(modConfig, callback){
      $.getJSON( "."+modConfig.locale+"/"+mainMod.lang()+".json", function(_jsonAtts) {
           modLocales[modConfig.name] = {atts:_jsonAtts};
           if(callback)
              callback();
      });
    };
    mainMod.translateAtt = function(modName, attName, keys){
      if(modLocales[modName].atts[attName]){
           if(!keys){
              return modLocales[modName].atts[attName];
           }
           else{
             for(var key in keys){
               return modLocales[modName].atts[attName].replace("__"+key+"__",keys[key]);
             }
           }
       }
       else{
           return attName;
       }
    };
    mainMod.loadDefaultLang = function(callback){
          var localLang;
          $.get("./json/countryMapp.json",function(ctryMapp){
              if(!localStorage.getItem("loadedLang")){
                  loadLocalInfo(function(_countryNode){
                     localLang = ctryMapp.countries[_countryNode.countryCode]?ctryMapp.countries[_countryNode.countryCode].lang:"en";
                     mainMod.lang(localLang);
                     callback();
                  });
              }
              else{
                mainMod.lang(localStorage.getItem("loadedLang"));
                callback();
              }
              console.log("Lang:"+mainMod.lang());
          });
    }
}

koMods["translator"] = new Translator();
