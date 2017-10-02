"use strict";

var appDomain = "/almonadmin";
var koModules = [
  {name:"app",module:"/js/komodels/app.js",locale:"/locale/app/", mainModule:true},
  {name:"userAdminAndDash",module:"/js/komodels/userAdminAndDash.js",template:"/templates/userAdminAndDash.html",locale:"/locale/userAdminAndDash/" ,default:true},
  {name:"categories",module:"/js/komodels/categories.js",template:"/templates/categories.html",locale:"/locale/categories/"},
  {name:"products",module:"/js/komodels/products.js",template:"/templates/products.html",locale:"/locale/products/"},
  {name:"myEvents",module:"/js/komodels/myEvents.js",template:"/templates/myEvents.html",locale:"/locale/myEvents/"},
  {name:"login",module:"/js/komodels/login.js",template:"/templates/login.html",locale:"/locale/login/", type:"page"}
];

//---------- App Config
var koMods = {};
var loadKOModule = function(mod,callback){
  if(!mod.type || mod.type !== "page"){
        var modName = mod.name;
        koMods["translator"].loadModuleLocale(mod);
        $("body").append("<script type=\"text/javascript\" src=\""+appDomain+mod.module+"\"></script> ");
        if(mod.mainModule){
          var inter = setInterval(function(){
              if(koMods[modName]){
                 koMods[modName].moduleConfig(mod);
                 clearInterval(inter);
                 ko.applyBindings(koMods[modName]);
                 koMods[modName].onkoModAppear(koModules);
                 if(callback)
                     callback();
                return ;
              }
          },100);
        }
        else{
          $.get(appDomain+mod.template, function(htmlTlp) {
              var midtUpObj = $("<div class=\"mainModule animated fadeInRightBig\" id=\"koMod"+modName+"\" style=\"display:none;\">"+htmlTlp+"</div>");
              $("koTlpCont").append(midtUpObj);
              var inter = setInterval(function(){
                  if(koMods[modName]){
                     koMods[modName].moduleConfig(mod);
                     clearInterval(inter);
                     ko.applyBindings(koMods[modName], document.getElementById("koMod"+modName));
                     if(mod.default){
                         $("#koMod"+modName).fadeIn();
                         koMods[modName].onkoModAppear();
                     }
                     if(callback)
                         callback();
                  }
              },100);
          });
        }
   }
   else{
     if(callback)
         callback();
   }
};

var loadTranslatorModule = function(callback){
     $("body").append("<script src=\"js/kocommon/translator.js\"> </script>");
     var inter = setInterval(function(){
         if(koMods["translator"]){
            clearInterval(inter);
            koMods["translator"].loadDefaultLang(function(){
              if(callback)
                  callback();
            });
         }
     },100);
};

var loadAllModules = function(idx, callback){
    if(idx < koModules.length){
      loadKOModule(koModules[idx],function(){
          loadAllModules(idx+1, callback);
      });
    }
    else{
       if(!callback)
          callback();
        return ;
    }
};

$(document).ready(function(){
        loadTranslatorModule(function(){
          loadAllModules(0, function(){
              console.log("Modules Loaded");
          });
        });
});
