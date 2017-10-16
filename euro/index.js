$(document).ready(function(){
  var targets = $('#target');
  var results = $('#results');
  var resultsLibra = $('#resultsLibra');


  load('Fair Cambio Fortaleza', 'http://www.faircambiofortaleza.com.br/cotacoes',
    '//*[@id="target"]/div[3]/div/div/div[1]/table/tbody/tr[5]/td[4]', 'EURO');
                       

  load('SADOC Cambio', 'http://www.sadoc.com.br/index.php?pag=cambio',
      '//*[@id="content"]/div/div[1]/div/div[1]/div/div/div/div/div/div/div/div/div[6]/div[1]/text()', 'EURO');

  load('Tourstar', 'http://www.tourstar.tur.br/portal/pag_generica/index.php?id=3278',
      '//*[@id="est_cap_cot_moe_dir_001_002"]/span[2]/b', 'EURO');

  load('EuroCambio', 'http://eurocambio.tur.br/index.php/cambio-2',
      '//*[@id="wp-table-reloaded-id-4-no-1"]/tbody/tr[2]/td[4]', 'EURO');

  load('Fortur Cambio', 'http://www.forturcambio.com.br/',
      '//*[@id="cambio"]/div[2]/table[2]/tbody/tr[2]/td[4]', 'EURO');
// --

  load('Fair Cambio Fortaleza', 'http://www.faircambiofortaleza.com.br/cotacoes',
    '//*[@id="target"]/div[3]/div/div/div[1]/table/tbody/tr[7]/td[4]', 'LIBRA');

  load('SADOC Cambio', 'http://www.sadoc.com.br/index.php?pag=cambio',
      '//*[@id="content"]/div/div[1]/div/div[1]/div/div/div/div/div/div/div/div/div[7]/div[1]/text()', 'LIBRA');

  load('Tourstar', 'http://www.tourstar.tur.br/portal/pag_generica/index.php?id=3278',
      '//*[@id="est_cap_cot_moe_dir_001_002"]/span[2]/b', 'LIBRA');


  load('EuroCambio', 'http://eurocambio.tur.br/index.php/cambio-2',
      '//*[@id="wp-table-reloaded-id-4-no-1"]/tbody/tr[3]/td[4]', 'LIBRA');


  load('Fortur Cambio', 'http://www.forturcambio.com.br/',
      '//*[@id="cambio"]/div[2]/table[2]/tbody/tr[3]/td[4]', 'LIBRA');


  function load(name, url, xpath, type){
    doAjax(name, url, xpath, targets, results, type);
  }

  function doAjax(name, url, xpath, targets, results, type){
    // if the URL starts with http
    if(url.match('^http')){
      $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml'&callback=?",
        function(data){

          if(data.results[0]){
            var dataResult= $(filterData(data.results[0]));
            targets.append(dataResult);

            var result = '0,00';
            if(name!='Tourstar'){
		if(name=='Fair Cambio Fortaleza' )
                  debugger;
              result = $(_x(xpath)).text();
            }else{
		if(type=='EURO') {
              	   result = $($(_x(xpath))[1]).text();
		}else{
 		   result = $($(_x(xpath))[7]).text();
                }
            }
            
            result = result.replace('R$', '').trim().substring(0,4);
	    if(type=='EURO'){
            	results.append('<br/><a href="'+url+'" >'+name+'</a> ' + result);
	    }else {
		resultsLibra.append('<br/><a href="'+url+'" >'+name+'</a> ' + result);
            }
          } else {
            debugger;
            return 'Error!!!';
          }
        }
      );
    } else {
      debugger;
      $.ajax({
        url: url,
        timeout:5000,
        success: function(data){
          return data;
        },
        error: function(req,error){
          return 'Error!!!';
        },
        beforeSend: function(data){
        }
      });
    }
  }

  function filterData(data){
    // filter all the nasties out
    // no body tags
    data = data.replace(/<?\/body[^>]*>/g,'');
    // no linebreaks
    data = data.replace(/[\r|\n]+/g,'');
    // no comments
    data = data.replace(/<--[\S\s]*?-->/g,'');
    // no noscript blocks
    data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
    // no script blocks
    data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
    // no self closing scripts
    data = data.replace(/<script.*\/>/,'');
    // [... add as needed ...]
    return data;
  }
});

function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }
    return xnodes;
}
