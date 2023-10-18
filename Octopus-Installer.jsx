/* ----------------------------------------------------------------------------------------------------------------------
//DESCRIPTION:Startup Script that installs the octopus project

+    This script is part of project-octopus.net

+   Author: Gerald Singelmann, gs@cuppascript.com
+   Supported by: Satzkiste GmbH, post@satzkiste.de

+    Modified: 2023-04-26
 
+    License (MIT)
		Copyright 2023 Gerald Singelmann/Satzkiste GmbH
		Permission is hereby granted, free of charge, to any person obtaining 
		a copy of this software and associated documentation files (the "Software"), 
		to deal in the Software without restriction, including without limitation 
		the rights to use, copy, modify, merge, publish, distribute, sublicense, 
		and/or sell copies of the Software, and to permit persons to whom the 
		Software is furnished to do so, subject to the following conditions:
		The above copyright notice and this permission notice shall be included 
		in all copies or substantial portions of the Software.
		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
		OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
		THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
		DEALINGS IN THE SOFTWARE.
// ---------------------------------------------------------------------------------------------------------------------- */

#targetengine "gs_octopus_installer"
#include "./includes.jsxinc"

init();
init_classes();

push_logs();

var dbg = true;
var what_was_done = {
  neu: [],
  weg: [],
  anders: []
};
log( "user ID: " + uid );
log("is beta: " + user_is_beta);
log( "is dev: " +  user_is_dev);

install_files();
scripts = init_scripts();

if (scripts) {
  add_menus();
  log("Added menus\r\r");

  app.eventListeners.add("beforeQuit", function () {
    try {
      log("uninstalling scripthub-menu on closedown");

      var _main = app.menus.item("$ID/Main");
      var hub_menu = _main.submenus.item(gd.hub_name);
      if (hub_menu && hub_menu.isValid) {
        log("removing menu")
        hub_menu.remove();
        log("removed menu");
      } else {
        log("hub menu not valid");
      }
    } catch (e) { log(e) }
  })
} else {
  log("Scriptliste kann nicht gelesen werden");
}

if ( what_was_done.neu.length || what_was_done.weg.length  || what_was_done.anders.length ) {
  var msg = [];
  if ( what_was_done.neu.length ) {
    msg.push( "Neue Scripte\n- " + what_was_done.neu.join("\n- ") )
  }
  if ( what_was_done.weg.length ) {
    msg.push( "Gelöschte Scripte\n- " + what_was_done.weg.join("\n- ") )
  }
  if ( what_was_done.anders.length ) {
    msg.push( "Aktualisierte Scripte\n- " + what_was_done.anders.join("\n- ") );
  }
  if ( msg.length ) {
    var ui_is_light = app.generalPreferences.uiBrightnessPreference > 0.5

    _w = new Window("palette");
    var _row = _w.add("group {orientation: 'row', alignChildren: 'top'}")
    if ( ui_is_light ) {
      _row.add("image", undefined, unescape("%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00@%00%00%00@%08%06%00%00%00%AAiq%DE%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD%7E%FC%00%00%06%D1IDATx%9C%ED%5BOk%1BG%14%7F%DB%04%97%96%18%A9%B8%04%9A%8BU%0A%09%94%14+%E8%03H%3E%F5T%AAB%EF%DE%5Ct%B5%FA%09%A2%7C%828%D7%BDD%FE%00%A5%F2%B5%97%AE%3F%C0%92%D5%A5%87@%89%7C%E9%29%A6%12%81%94%04%C2%96%B7%FCF%3C%8Dfwg%B5%1A%C9M%FC%03c%EDjV3%EF%F7%FE%CC%9B7%B3%5E%92%24%F41%E3%93%8FZ%FAk%02%AE%09%A0%9BW%60%0C%99%F0%A2%A0IDu%22%EA%8861%11M%89h%92%B4z%93%CA%7D%5C%A5%20%08%81%BB%10%B8m%F1%C8%05%11%85Dt%92%B4z%F1J%7Dn%9B%00/%0A%1AD%D4%87%E0%FB%15%7E%EA%8C%88%FC%A4%D5%9B%96yhk.%E0E%01ky%60%A9i%1B%FC%08kh%96%1A%C7%A6-%00%1A%1F%AEQp%1DO%93V%AFo%3D%9EM%12%E0E%01k%FC%D1%06%BA%FA%DA6@n%C4%05%10%DCX%EB%07%9B%E8%0F%F1%E4%C4%A6%A1%F3%3C%C0%8B%02%1F%BE%B9%29%E1%09%04X%C1%A9%05@%F8g.%FB%C8@%C3%B6%A13%0B@%B0%B32C%07%B0%9EN%5D%BA%00%07%BC%9A%C3%DF_%0B%9C%10%E0E%01%A7%AFG%9B%17%A7%3C%5CY@%C7%A2%CD%95%80+%02Jec%DB%84+%02%EA%FF%0F%F1%3F%5C%0B8%B7m%F8%A1%16D%AC%97%C6%D7%04l%7B%00%8E0%B2%FDYW%A9p%EEJ%AC%7Ec%87%A6%EF%DF-%DC%EB%DF%FE%8EF%D3%09M%DE%BD%A6%E6%E7%7B%D4%B9u%87%EA7wh%F2%F65%0D/_%94%E9%FB%ACLQ%C4%15%01%A1%FA%C0%C2%D4o%7C%BA%F0e%FF%F6%7D%EA%FE%F5%FB%FC%DA%DF%BBK%F1%BF%97%E4%7Fy%97%FC%BD%7B%B4%BFs%8B%C6%7C%3D%09%29%7EsY%B6%EFR%E9%B7%13%02%B8%3E%E7E%C1%AC%B3%7B%A7%D6%AD7%E8%F8%F6%FD%85%EF%1FN%C2%85k%D6%7C%FC%ED%CF%A9%E0l%01l%1D%07%9F%ED%AD%D2%F5y%D2%EA%85%16%ED%E6p%19%04G%E1%EB%BFi%FA%FE%ED%FC%86%0F%C1u%F3%E7%EB%F8%CD%AB%F4%F3%F0%D5%8B%94%10J%5De%D1r%0A0%E3.%CA%0E%D2%29%01%FA%0D%D6.%A3%B1%B3%BB%D4%98%5D%80%D1%D9%FD*%FD%A3%94%98%B7K%EDr%D0_%A5L%EE%B4%24%E6E%C1%B4%B1%B3%5B%0B%EF%FD07%EF%D9%FBw%D4%FC%F3%D7%A5%B6%1C%18G%DF%7COm%08%7Fz%F9bn1%168MZ%BD%D2%DAO%C7%E8%98%00%0EH%C7%2C%1C%077%D6%28%9B%B7%EE%02%12%9D%DD%3Bi%E4W%D6b%01%8E%FA%D6%15%A0%A51%3A%26%80W%85%7F8%EB%80h%CC%9C%95%DD%0B%90p%5D%14u%B5%28%9Aa7hP%F5%87%5C%13%B0%B2ij8%13%F3%FBt%D5m0%13%0A%5D%00%85%CD%81%A8%B3%F1%7E%DC%B0%88%7DT%85%26k*%8B%B1%C6%1BUL%3D%0B%B9%D3%A0%17%05%5DTue%91%91%3F%3F%F2%A2%20F%E13%0B%DD5%D6%04k%AE%0A%ACEy@%9E%96%B9%CE%1Fc%D3c%01%B8We%C0ch%5D%E2%08Au%AD%C8%24%00%DA%D573.%B4k%D6L%28I%80%E9%0F+j%7F%94A%E0%10%BF%9F%0B%1E%8F-Yy%16%A0%9B%F7%C3%A4%D5%E3%7B%0F%A0%21%05%16%F4%B9%17%05C%C4%8B%D8@%9CI%A3E81%3C%B3%9Fg%95L%8E%17%05%9C%3D%3D%E7%E9%D7%8B%82%04%B9%C8J%04H%06/%92V%8F%B5J%88%C0%FC%DD%A9%D6%FE%C8%10/%08%C2%97%B5%88%10%01%CF%94%DD%1D%236%99%60%DAn%3F%06%29F%D8%AE%05%D2i%87%DD%C2%8B%82%3E%22%B2o%20A%C7%18%C1P%D7%DA%B8%E0%B9%14I%AB7%C2%14%A8c%A8%07%60%5C%1F%C3j%0Ey%87X%D4%06%DB%B0%CE%25%D8%120%05%EB/%89%E8%09L%BE%09%12%7E2%C4%06%C6SX%CA%89%A6%FD%0BC%C1D%7F%5E%CE%F3%BE%C1%15j%86%C5%96%B2%D8%18%84%BF%D4%DA%18%CF%0C%E4%11%20%E7%DC%06*%BDc%A1%91%D4%B7XK%226%1C%E2%EF%01%3A%1F%E1%E4%86%C4@%AB%1A%CFtB%E4%7C%8F%CF%26%93%3F%E0%B8%931%DE%AE%F6%9F%B2v%A7%F3%08%90%7E%D3%C0%20%7D%11%9D%DB%D2%0C%11%1B%26%D0%C4%08k%00%DD%1F%CF%F1%9D%8C%13%85Y%1D%8A%1C%0F%0D_%1D%09%D3%0EA%26%F7%F9%0F%EEM%8AJ%E4%99%04@%20e%9A%FB%E2%9E%C4%9C%00%C4%86%18%27@L%BB%B3*%1E%E8y%831@%21%DEp%9E%91%BA%1F%82%B0%29%E6%3C%C3%F7*h%AA1%9F%C2%DAr%B7%CA%CB%24B%03q%8CM%1F%EC%00%B1%C1%14%E9y@%8F%C5%AAM%7F%3E%CC%28%A2va%B6%FC%9B%BF%F1%BC%9E%13x%D3%29X%B8%E3%17%A2%3E%A0%94a%B4%84%5C%02%C0%BA%B4%82%E7%88%B4%0A%13%90%A2%9F%FBQB%1F%F2%80x%DD%20%FCz%21A%81y%9B%08P%02%A8%FE%FBho%22%A1%06KPmT_2F%18-%CDf5%D8%C5%C3%BAv%C7%5C%82%F2%A2@%8F%C6%BF%24%AD%9E1%F9@%16%27%83%91%0A%A8%A6E%CE%01%DC%C6%07%F1s%E2%98%04/%0A%C8%B0%05%FFD%1C%C9%D1%CF%1D%0E%C9%80%C2iP%24%3Er%AA%E2%CF%3E%82%A0%8C%F2O%B3%84%07t%F3W%E4-%C4%16%91ZOE%2C%AA%C9%94%1B%96%F0%D8%D0%C7%01%ACT%0A%FF8%AB%5Eh%95%07%F0%20%C4T%F7%00f%1Dk%E6%9C%16%29%D8WsV%89%BE%D6%DEH%80%2C%A4%C0%C2F%FA%7D%8Ck%60H%CDu%9C%E5-%CCJU%85A%84%1C%AC%24%E0%04%7F%3C%FD%8D%F4E%0B%B4%27%A7%C5%91%F2U%FC%97%16%D6%81P%ED%A2%9Df%8C%A9%89iR%12q%01%8B%EC%E6%D5%11%AAV%84%A4%A6%EB%C2U%0ED%3E%A0%A0kA%F7%C9X%98m%13A%AF%03%7F.%2C%7D%21%60%1B%FD%3C%0F%EB%DC%17%18a%E0j%10r%89%AC%9F%FE%3E3%EC%E0H%B2x%CA%0B1%7B%84e%8E%BD%95EU%02%A4%10%03X%81%0At%D2U%A4ff%19y%B9%24%A0%A6%D6%F3%88%EAUN%91%E7%A2*%01r%CD%DE%C6t%A5%A6%AF0C%80%13SD%86%9F%CA%F9%7D%20N%94%AB6%A5%F6%FDlP%89%00%0CZ%AF%BC%CC%B4s%FB%D2%7F%CF%0B%8A%A9%F2%BB6%02%AA%22%AFh%E9%BD%12%D6%B21%82iO%25%20%F3WY%0C%1B%23%87%F0g%1FE%8F%2522N%94%CF%10%17%D6%7E%F0%C2%F5%CE%90%14%863%C7%26%AA3*%20%B2E%2C%D5%EE%D4%96%1A.yV%E9%BA%10%9E%B1%C97F%D2%BC%80%05Fq%E5%B7%AC%97%26%F0%C2%83%F5K%0FU%E0%FA%90%94%D4%DA%3E%2C%822r%FF%AD%C0%F9%1B%23%BC%A6%CFyW%60%96%B4z%5B%3DT%B9%89cr%7EF%AE%3E%BB%0Ag%8A7%F6%CE%10%FC%5Ee%87%13%CC%02%95_%7C%AC%8A%EB%B7%C7%AF%C0%18%B6%07%22%FA%0Fq%19%CC9s%D40I%00%00%00%00IEND%AEB%60%82") );
      // _row.add("image", undefined, unescape("%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%94%00%00%00%21%08%06%00%00%00%3F%3B%82%12%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD%7E%FC%00%00%04%EDIDATx%9C%ED%5B%D1m*%3B%10u%9E%5E%03%BC%12H%09PB%F8%9D%BF%A4%04R%02%94%10J%80%12%E0%CF%BF%A4%84PB%28%E1RB%AEF%3A%1B%19s%EC%B5%8D%97%87%12%1F%09%A1%ECn%3C%3B%E3%E3%99%F1%8Cy%F8%FA%FA2%0D%0D%B5%F0O%B3dCM%FC%5B2%96%88%3C%19c%26%C6%98g%7C%FBX%EA%DF%D6%DAU%9B%AD%DF%85%AC%90%07%22%BD%05H%14%C2%B2%11%EB%F7%20%99P%22%A2DZ%14Z%E6%60%8Cy%B1%D6%1E%7F%BB%C1%7F%3A%92%08%25%22kc%CC%9C%DC%DA%E8%C7Z%7Bp%9E%5D%80x%23%EFY%25%D3%D4Z%7B%1A%CA%A6%90m%F0%AEcc%CC%BB%B5v6%94%BC%86K%F4%E6P%98%24F%A6%99%B5%F6%DD%BF%A8%E1MD%94h%7B/4%8Eqm%3A%E0%3CtDj%F8%9F%10%DD%E5%89%C88%10%E6%5E%18%99%3A%C0%0B%CD%E0%95%5CLD%84%91%B3%E1%87%20%1A%F2%02ySr%18%01y%D6%DE%E5%A3%B5%F61%F1%7FG%D8%04%B8P%B2%AE0%CE%0E%CF%7E%26z%A6Wk%ED%26%20o%811%7C%C2k8W9%BBX%0E%88%C5%F7%E9%5D%FE%DE%90@%9F%B9%E7%B5%97%B1q%03%F6%A3%3A%E0%FD%7D%5B%3DF%C6%7E%86%BE%21%FB%9EB%B6%8A%A1%AF%0E%C5%BCI%F2%8E%0D/%E4%E7Lc%EC%16%29%F4%1E%08%B2%26%CA%1A%87d%DB%1A%DE%CE%91%F7%16%D0w%82%7B%9F%C8%25Kd%EC%A1%8F%BF%3B%EE%C6%0D%DA%A36Dd%84%F7%D9%F6%D8w%ED%E4%A4%C9%08%12JD%26%24%B1%3E%C5B%5D%00%8C%E5%D4%80%20%C8%FEVyP%81%BC9%26%23G%C66%A4%AF%83%3D%EC%7D%0B%A4%BCO1bI9S%F0@%AE%F5%81%ED%EA.%26%10%06e%1E@%C3%CD%AA%DBI%EA%0A%F3CG%17BI%E8%0B%86%E7%88%3C7L%B1%BA%9Bz%B47k%ED2A%F7%A7%8C%C9%7BC%DE9%18%A0%8F%FF%3E%3B%E8%FC%1D%1A%9D%F0%9F%8D%18%A1%7C%EFdH%92%9D%02FBFV%E6%7E5%BFxq/%20%E1%AFQ%28e%F2%CE%8A%B0%EA%8DEd%86%DC%C8%B5%C7Bw%B2%09u%B5n%F26X%14G%E4Zk2%B1J%D4%89%5B%82%19%00%B4%AB%E1%EBqM%21%FA.zy%F0%16%BE%81%958%AF7%94wd%86%8C%1085%7F%D3%09%7B%ED%26M%BF%E15%19%19o%96K%0D%25%F3%5E%9A%C3L%A9%CD%80EP%26o%17y%9E%DDK%99%88Md%B5%B3%DCr%E8%DC%91%91X%93%EFu%AD%1C%EE%5E%08%C5%0C9d%9B%26+%9C%C3%BB%F8%E4N%99%80%98%0E%EC%DE%A0%84B%99%85%C9Uo%FB%21%22%1F%25%3B%3B%171B%25%25%D3%09%28M%EE%EF%86P%C0%85%3D%B0A%28%C5%60-%A8%1E%84%C2%AD%E9J%24%22%F2%A7%B4%24%13%23Tj2%DD%87Z%C9%7DC%05%20%87%7B%EC%8E%18%050%EABa%AE%C4%20%A1%B0%DB%F0W%D1%08%15%D6%1C0%A6%A7%D4%B2%86%AC%CB%94x%DF%8B%851@%8Ew%B3%85%A6%B9%9D%B5%F6%01%C4%0AE%8Cy%AE%A7%EA%CB%A1%AE%D9%DD%B8%ED%13%17GR%1C%BDu%3E%91E%28%846_%8Fk%B7%F7l%C1%14%11%CA%A9%CDe%03%C4%9A%A2i%CFt%AAJ%28%D6%3AyJ%F1RP%92%25x%8C%A4%CCc%3D_%99%A3%C4@%E5E%9Eg%F7r%3B%06%3E%D8.%D1%9F%D0T%E2o%AF%5D%80%1A%91@%2C%9F%D4Ys%10%25T%A4%06%B3%ED%E9%C7%8D%02-%8D%03k8%22%BC%FA%13%14%22d%0C%17%3B1F%CA%80%BCqd%87%C3%AE%A74N%E9%A2%C0%82du0%FF%9D%18%A1%E6%DD%16%1F%7D%C8%8F%CA%B5%24_fVX%EF-%1B%A0%8E%C2%8C%B7%F7%EB%17h%3C.PY%F6%5D%FA%B1%A7%B5%C0%92%C4%05N%3C%9CA%27D%AF%13%020R%AE%03%9E%8E%C9%3B%1BSuC%EF%CE_%18%AB%C4%D3%A7%13l%C7%BF%C3%06%C8%C4%92%5D%B6pY%08%1Aa%CC/%EF%CCY%AC%8E%D6%C9V%5B%A83X%B0%28%03%DD%FDy%EB%1D%D7%C5%5D%1D%01%0E%1C%D7%88%E1%ACU%02r%7FD%9E%3F%EB%ED%15%C8%BB%18%C3%19%8B%1D_I%C5E%8B%C9%197tZ%D6E%B78%A2%C7W%12%C7r%91%7D%CA6%B9%B0%89f%E8%AC%20%19%D5I%9F%A6%ACh%84%C3Yi%8D%06%A1%2C%B9%5DS%20o%93y%A4x%95%B0%C2%83dr%C6%88%D9n%A8%1F%81%BC%97%1C%D9%CE%AA%94k%8CG%E26%C3%AA%60%8A%9EpO%FBW%0F%B9%CAB%C6%7F%18%83%85%DA%A33%3E%EB%BDu%24I%92%EB%C9c%93%7F%C0%3D%5D%ED%B9%BD%C5%13%C8%F2B%C6%DE%C1k%C7%C8%D4U%E9%A7D%9F%1D%8Ea%E7%D8w%E9%7CB%24%5D%E1%BDf%25e%91%F6%CB%E1J%E8%3B%B1%F9%5B%D0%7E9%DCP%15%8DP%0DU%D1%08%D5P%15%8DP%0DU%D1%08%D5P%15m%97%D7P%0F%C6%98%BF*%A0f%23%2CT%03%E5%00%00%00%00IEND%AEB%60%82") );
    } else {
      _row.add("image", undefined, unescape("%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00@%00%00%00@%08%06%00%00%00%AAiq%DE%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD%7E%FC%00%00%0F%12IDATx%9C%ED%5B%09p%1B%D5%19%7E%D2%EAZ%1D%96-%DF%96e+v%9C8%89%13%1B%C2%91%D0%A4%01%C2M%03%0E%8164%1C%99%A6C%29%D06%F4%A0%E9P%3A%E9Ih%29%F4%9A%942%0Dm%DAtH8%8A%03%09%04%12%8E%140%94%12%07%12%88%9D%D8%96%EF%DB%B2u%AE%B4%D2%EE%AA%F3-za%23%2Cc%C9%16dZ%FE%19%8F%A5%DD%B7%EF%BD%FF%FA%FE%E3%ADT%B1X%8C%FC%3F%93%FA%FF%9A%7BB%88%E64%D8%C3%A4tu%F7%BE%8D%F4%3E%A3R%0F%FC%D3q%C9%AE%99%9C%FF%B4r%010%3B%1E%8D%D4%0FD%B8%DA%7E%9E%B3%16%E9XU%81%8E%25%95%ACE%BE%1F%10%05%E2%0A%F9%89_%8C%8AfF3R%A27%EE%B5i%F5%3F%7D%D4%7EQW%BAk%7E%EA%02%00%D3%BD%E1%E0%1D-%9C%B7%C2%CChUK%AD%05d%91%C5F%16%99m%C4%C4%247%D0%A0%28%90F%EF%10y%C1%DD%27%D84%FA%D7%ED%06%E3%CD%E9%08%E2S%11%C0%F5%7D%07%CA%87%23%E1%DF%B4q%BE+J%F4F%DD%D1%C0%18%B9%A5%B4%9A%5Cl%B3%A75%DF%03%5DGIK%D0%1B%EA%A9YgL%F5%D9O%1C%04/%ED%DC%FB%E7%17%C7%FA%5D%C5%3A%B6%FE%D7s%CE%D5%0DGB%E4%BE%AAs%D2f%1E%F4%ED%F2%85%A4%DAde%97%B65%1CN%F5%D9OL%00%D7%F4%BC%F0%A5%AA%E6%9D%E3%ACZ%B3ak%F5%E7%D4%EB%8Ag%93%23%811%B2%D0l%23%15q%1F%9F%0EA%08oz%87%EB%B0N*%D3%7C%22Q%E0%F3%EDO%BF%D2%C7%07W%60%93Jf%8F%F8%C7%C8%0D%C5%B3%A7%3D%7F%C3p%17q%85%7C%B20%07xn%13%21d%CA%91%22%A3%02%80%AF%BF6%3E%D4%BC%22%A7%88%FDf%D9%022%14%09%9Dr%DF%CCh%26%05%BA%A9%10%C0%B0%BE%A0%5C%1E%89%CF%3Fh%FB%8F3%95%E73%E6%02%60%FE%B0%CF%FD%DE%A6Y%B5%AC%89%D1%92%1D%03m%E4%27%AES%5Dt%DD4%B5%8F%90%D80%DCy%F2%3B%84%E9%13%A2%D9%A9%CC%911%01%80%F9o%94-0%B7%87%7C%24%28F%E5k%F5%F9%E5%B2%B9%FE%A9%B7E%F6%FF%E9%D0s%EE%5EY%A8%F5%05%A7*%1C.%96%0A%0Ed%C4%05%80%F4W%E4%3B%CC%D4%DF%83%82%20o%14%1A%02%F3p%05%98k%BA%B4%7F%AC%8F%D8%F5Fry%C5%19%1F%99%01I%93_%8C%16Ou%EA%8C%08%60%24%12%BE%16a%0DLBK%17%E7%DAO%FA%FA%D7J%AB%A757%CC%7E%98%0FM+l*i%C6%05%F0%C5%DE%FD%CBr%B5z+%3E%EFw%F7%11%C4%F9B%1D%3B%EDy%21L%F8%3B%AC%07%D1d%A6h%C6%05%C0K%E2YK%B3%0B%E5%CF@g%8A%D0%E9%10e%9A%C8f%DFO%D6%15WN%1B8%13i%C6A%10%C5%0C5w0%00%7F%FD%C7@%5BZsa%1E0%0C%81.2%E7%907%3C%C3%1F%8B%1DG%02%E3D%AFf%DE%9E%EA%1A%19%C1%00%98%3C%F2%F3y%E6%1C%19%AC%A6%EB%AF%00S%98%3D%22%07%DCJ%89%29%13%D1c%A5%17%BF6%D5%B93%22%80%07%BA%DE%23%DF.%AF%99%11%DFW%12*D%FCMF%21I%F0%A42gF%F2%00%98%EBL3%3F%15%82%85%E4i%0D%9D%A9%3C%F3%3F%D5%12%03F%D8%B4%FA%7D%A9%3C3%E3%02%B0%1B%8C%07%26%BB%3F%11%88As%CA%3A%01%9Fq-%95l1%DE%20%91%F6%96_%FE%83T%F6%3B%E3%02%10c%B1W%12%8B%1E%24/%94%FE%D4%DB%7C%CA%BD7%BC%1F%20%3B%FE%00%9Cw%1E%7F3p%7BKc%CC%C5%F9I*%84%EEP%B51%FB%D5T%F7%3B%E3%20%08%04%9E%DF%F2X%D8%15%F2%1B%90%05v%87%03%81J6%EB%10%27%09%86%01%9E%5BpvV%BEY9%1E%A0%F6%FD%D6%B7%88N%CD%F4%14%E9%D8%5B%8Fs%DE%C6%F3s%8A%EF%A80Z%7E%3A%11%E0Q%0BB4PV%81%3B%06%DA%A4%95%B6%92%9BS%DDoF0%C0%AA%D1%B5%20La%83s%8C%D6%FB%FEUy%D5%F9%87%7C%A3%0F%F5%D5%DC%60%C9%D3%19%C2%CA%B1%18winiOK%D0%B3%E8%95%F1%01%1D%21d%FD%CB%15%AB%7Ev%D4%FFQ%F3%87K@%D3%24%EE%26%D4%D2%60Ugg%E5%FF2%9D%9E%60F%04P%AC7n9%E0%EE%93%3F%B7%87%7C%EF%C4/%AFW%1Dz8%7B%2C%CA%7B%13%C7%EB%D4%EA%BC%25%D6%822B%08%10%DC%B3%F8%C4%93k+%8CY%1F%99%17B%81U@%FBh%9CB%20p%A1%C1Hh0U%DF%A7%94%11%01%A0w%DF%E4w%87%11%0A%0Bt%EC%0F%E3%977%5E%92k%BF%7F%A5%AD%A40q%7C%9D%25%97%15c%B1%3DgZr%AB%CF%CF%29.%ED%0A%07%B6%27%8B%F7%98%13L%A3%7B%BC%7B%B8%8B%3C%D4%DB%2C%D5%98s%96%A4%BB%D7%8Cu%84%8A%F5%C6%7D%AE%90%BF%FE%0E%C7%FCs/%EB%7Cv%E4%C6%E2%D9%11%27k%29%99%A8%FF%07%A6%EEr.r%ECw%F7%3Dj%D2h%C8%ED%8E%F9I3%3Dh%1D%FD%05%00%EB%60%24%14%BB4%B7%F4%CB%D39%17%C8%98%00%AC%1A%DDN%17%E7%AB%87%A6%BEU%B6%20%EF%E3%C6S%CC%98%8C%90%E7%D3%06%C8%8F%5DM%12%98%9F%EEIQ%C6%04%A0Q%A9%FA%D2%7DV.%A2%DC%7D%A4%C2%F8%A1%B5%C0%FFq%7Ep%7BK%23%C9%D2h%3D%CB%B2%8Bn%9D%89c%B2%8C%09%C0+D%D6_h+9%F9%9D%FA%EDT%08%D6%00%90%7B%C33D%0E%8E%0F%86f%B1%96%B7%F0%D8%85%B6%92qX%D6L%9E%0FN*%0047%DA9%DF_YF%93%C3%A8T%3A5Q%0D%1B%19%CDcSA%5CW%C8%BFf%A3%02%C8%5C%9C%EF%A4%00%86%26i%92%D08%0F%AC%C0_+%E7%D3%14%E9%D9%1F%A6R%E1%A5BI%A3%00%BA%BA%C7%82%9E%97%BFQ%B6%A0%F2%EEYu%B6M%CEZ%F3%5D%CEE%15sM%D6M%B5%C7%9F%18%C1%FDd%CFBpN%83%F9dw61%A5%A5%21r%A2%7B0%7D%E5%B5%AF%3B%E6i%A1%84L0%0FJ*%80%CEP%A0%E1%BB%E5%0B5%89%9ABm%7FKiu%5EO8%D8%94L%08%87%FD%EEg%94%9D%1B%F8%EFB%CB%87%D6%D0%AEH%8D%13%13%9E%FE%08%C7%1F%F6%BBy%FA%1D%EB%3B%0C%E6J%E51%F9LRR%01%E8%D4%EA%D9%94y%DA%D9%A1%9A%81in%2C%AB%B1%B5r%BEc%89-h%9C%CF%AD%CA/%CBV%3E%DB0%D2E%CC%8CvJ%DB%0E%89%C2%A87%1AySYO%E0%F4%A8%95%F3%DD%3B%99%D5%29i%AA%E3@%13%0A%00L-%CE%CA3S%06%7E%ECj%1A%1C%E09%E7Kc%FD%DB%B6t%BE%1B%C0%E6%00T%9B%9C%B5%C6%BEp%F0%EF8%FA%C23+%3B%F6%BC%B9%C8l%ABSv%806%BB%9A%04%23%A3%91h%FC%87%10%CD%8A%18%9FX8%05Ea%04G%DD%7F%E9%3F%11%A0%D7%B0%D6%ED%8E%F9%06X%E5d%CC%5C%D6%F9%EC%BE%8D%23%AFsUFk%27r%8F%95%1D%7B%9EJK%00bL*%A6%1AD%EE%3D%CF%94%7D%1D%92%8D%E7%9DW%7E%B5Do%AC%D9%D2%F1n%00%89%086%B6%B9%F2L%ED%95%F9%8E%15F5%B3%F3%C6%E2%D9%E7*c%F9%D6%DEf%BE%DC%60%BE%BF%D6l%3B%B9%0E%0EF%94n%15P%94%C7%10%B6V%A5%F6b-3%A3%FD%03%C6R%82%00%21%DC+%BB%9E%BBw%A2%3D%C3E.%B0%15_Z%AC7%B2C%7C%88%7C%D5%3E7%EF%92%5C%7B%FD%B2%F6%DD%C7%26%B3%88%8FM%85%8F%07%BD%7E%8A%C0%D0%B2%18%8B9%CE%C8%CA%ADyb%A8%C3%05%B7%20%F1%8A%0E%3E%AFd%0C%A5mD%12wt%87%03%EB/%CA%FD%C0%22%A0%EDV%CE%27%D0%3C%9F%96%C1%94p%8A%C42%8C%DCAE%A49%ECw%F7%28-%04%C2%1D%8D%84%BF%03%90M%DC%A7%3B%CA%DF%83%B1/%B8%FB%1A%C6%05%7E%F9%AF%BB%8E%0E%C1%ED.%B4%95%CC%C3%BB%08i%0B@%A3R%8Da%C1e%ED%BB%DDN%D6%BC%B3+%14x%89%97%A4%25/W%AC%AA%7C%DB%3Bz%10%E7%7D%B4%A6%27q%13%87%9B%E8%D4%CC%16%22%9F%D4d%15%D1%BC%1E%DD%E1r%83%A9%8B%BA%03%18N%24%83%9Ay%8F%5E%AA4Z%96%FF%B1%A79%AA%1C%F2%3D%E7%22m%1B%E7%DB%A3%BC%06%ED/0%E5%D8%0E%B8%FBq%0E%B1%04%D1K%ABR%B7%1C%F6%BB%C3%08%BDBL%BA%28m%01%F0%92dB%AF%DF%27Dm%AF%8C%0Dxo*%A9%D2%0EGB%5Bq%0Fe%AE%C3%60Z%FEo%EF%F0%B6%DFu%BF%7F%F0%DE%8Ew%0FB%03p%93%B0%24V%0F%F0%A1%0D%F4%F8%1B%DA%19%8B%F2%ED%8CJ%AD%A3%96%82%08%A0S%AB9%BAVb%B7%08%AEP%A4g%EFR%B6%D5%E1v%1B%ECs%AD%C0%1B%E5X%D4%07%B8We%B4n%9C%C5ZDN%12%CE%1E%89%84%E4%DA%D9%A17%99%27%B2%9A%A4%02@_%9D%86%27%AF%10%C9%0BKbM%B1%9E%DD%D64gM6%0E*%CE%B1%E6%DB%28%FA%C3%3D%80%0D%10F%9E%CE%F0GO%94_%E8%E2%FC%AD%B5%16%5B%FD%7DUg%CB%9B%02c%F7w%1D%15*%8DY%EBY%86%C9%A1%EB%F4%F3%5C%24%16%8B%0D%D0%EFH%96%12iw%D9e%BF%19%88%84%1A%A8%BB%918%1E%D4Zl%E7%E2%0C%12%DF%9F%1E%E9%FEk+%E7%8B%A2%5D%3E%C0s%BF%8D%1F%BBK%C3%91%B0%E1CE%8AgMY%00%60%EAX%D0%23%D7%EDK%B3%3F%C8%DE%C0%24%915%19%96%7D%DE+D%D6%D2%F1%90.%92%23%00%21%12%27%00%23%8D%04%60%1E%1D%1F%BB%DE%B8%9DQ%A9z%A0%0D%FA%9C%3B%CA%FBL%8C%B6W%B96%18%C6%7F%20%F8E%1D%7Bz%21%E8%17g%7Da%F5%5B%DE%91fek%0D%F3%3B%0D%96%0D0%FF%D8%E2%5B%3C%D9Z%DD%DF%9E%1F%ED%8D%D6%17%94%17%9A%18m%0C%20Z%A0h%BE%24%3B%2CI%EA%02%F9%3A%C3%13%F0g%2C%D4%13%0E%AE%03%92b3%85%3A%83%0CvQI%925%89k%F0%B9%7B*%CE%C8S%02%21L%1E%A6%FB%8B%8Ew%BC%B5%96%DC%B5%10%A0O%88%DEJ%01%10%CCX5%BA%F7%27Z%1BL%01%C1%BFS%BE%D0%1E%8DI%DB%F1%FD%B5%CA%AB%E7%3F%3A%D8%7E%8A%10%00%8A%12%21%5B%B0%07%CC_a%B4T5z%86%EE%FCs%D1%0A%16%20%AAW3r6%8AH%93%2C%95N*%00L%F8%F8P%87%EC%9F%88%C1%EF%07%3C%9DR%2C%B6%13%E5%28%B4J%D1%BA%3B%1Cxds%C5%99%1AZ%BF%23t%DD%DD%F6%B6%F7%91%BE%13%079I%5C%0B%B7%A1%C5%CBX%94%BF%8C%02%22%5E%8F%81%CBh%D5%EAqe%EA%0Bf%03%A2%B0%B6%92%CD%92%E7ZS%E0%D4w%86%02w%E3%1E%84%F0%FB%EE%F7%03J%21%DCV%3AO%EF%17%22%3B%E1%0E%C0%0C%A5%05U%9B%B2%ADqe%0C%25%E3s%D2b%A8%CC%60%FE%CA%D6%DE%E6%EDX%04%FEL%09%9A%C5%0B%8AX%F4%BA%C2YF0%0F%8D%EF%1Ct%8Dfi%B4%AB%9B%E6%AC%99P%DA%8CJUF%05%D5%CAy%23/U%AC%DAuu%F7%3E%9C%E5%D7%E3Z%81%9E%25%7E.%8AD%A9%08X%13%89I%CB%FF1%D0%F6%EA%2C%D6%92%07%0B%04%83%0F%CE%5D%E2%F8y%C7%3B%8D%08o%B4%B8%C2%B1%D9%FE%B1%BE%0D%CB%DAw%9Fgb4%8D%3E%21%BAx%A5%ADd%0E%EE%03%3B%B24%DA%3D%13%ED%074i%14%80%E6%B4*%F5%CD%B7%B54%8Ax%B1%01%E1%EE%FB%AD%FF%21%23%D1%F06l%C6%1D%E5%AF%A7%1AE%E6%96%A3%D5%9D%95%CC%D4%E2%05%92%3C%18%16%E4%15%22%3D%24%01p%A9%FB%D4Yr%3D%25%06S%27%E6rGy/p%08%EE%83%7B%97%AB%CB%3D%B0%84%BD%23%DD%ED%CA%E8%00W%BD%7BV%DD%BC%AB%F2%CB7%FC%A8%E2%8C%BA%CFe%17%1A%B1%CE%B3%23%3D%01%8A_%29%0B%80%0Aa%895%BF2%24%09%DB%5E%F7%0C5T%9B%AC%CB1%A1%9C.%5B%F2%E4%17%13%21%E5l%8D%EE%1E%24I%C9%E6%19%E4C%3F%A3%09%11%B2%CBR%83%E9%0F%24%0E%B8%CAd%27%20%0A+%F0_%88IAX%98%8A%90Q%B8%83_%88.U%CEwh%CE%9A%D9%E3Bd%CB%E6%F6%A6%A8%D2%25N%BE%95%22%0A%E4W%9DG%A2%F3%CD9I%99%07M%A9%21%12%EF%B9%9D2%11%A2%C0%CAx%C3%E3Ew%FFh%91%9E%AD%A9%B5%E4%3E%B8%AC%7D%F7%98%C3%60%3A3%B1O%C7K%E2yT%C3%87%7C%A3%81%83%15W%9D%CC%CEb%84%20%C6%D9aM%7BGzrZ%82%1EF%ADR%CD%3E%C1%F9%AA%8Bt%EC%D1d%FDA%00%DD%F5%7D%07%1E%DA5%E8%DA%AEQ%A9%96%D6e%E5%CA9%06%0EU%5E%F5%0C%86%ABM%D9%EB%3F%AEy%92vG%08Q%00%D2%86%F6%CAX%F3%B1a%3EtS%3F%CF%85W%E5%97%D9%5Ep%F7%81%B9%D5t%2C%00%E9%9AB%A7%5C%0Eb%7C%2CF%0E%29%E7B%01%14%14%05%3B%18%95Hla@%14%1E%9Ek%B2%AE%AA1%E7%B8%BD%D1%C8%A4%EF%F2%C6%05%7D%3E%89%03h%3B%E7%93%DF*%3FV%FD%C5%29u%8D%A6%DD%12%03CfF%C3%AB%F5%EC%5D%27%82%DE%FA*c%D6%0A%1A%22I%BC4%0D%08%D1+%95X%81jO9%07%0E4%8F%04%C6%EA%00ZyZ%83%8De%98%87%1E%C8%3BO%EE%3A%5D%E0z%A6%7D%AA/T%D1%08%90%0AM%EB%5C%00%CC%83%B1%F7%02%E3%0B%8D%8C%E6%29%89%C4%0A%E0%AFJB%09%8B%F4%99%C4%FB%82%065%B3+%D1%3D%E2%85%8F%DC%04Q%02%1E%80%D3%AA%D1U%28%8B%A4%99%A6%B4%05%80%3E%DD%93%C3%9D%F2%A6/%CE%B5%17%05D%E18B%13%C2%17%E2%3Be%A0P%C7%D6%C1U%E2%9D%DE%A1d%88%DC%1F%0E%F6b%0C%04%CAK%E2%8D%B8%D6%1C%F4%3C%8E%F4%16QBY%24%CD%24%A5-%00%A0%B7%9A%90M%08E%08A%C8%15%02bT%0E%91%14x%FAy%EEaZ%0Cm%ED9%16q%18L%D7%26%9B%0Fu%02%3D9%5E%5D%E0%B4/mk%88%AD.p%16Ax8eJ%C7%BC%A7B%D3%FE%BD%00%80%27%2C%89%EBK%F4%C6%96%E1H%B8%83v%8C%E1%FB%21Q%EC%C4%7B%81%08S%BB%06%5D%07a5%08%87%C8%FE%90%DF%27%CE%85%CE%D2Y%D6%BC%15%CA%8E%12%B2%C1%E6%A0%E7%20%8A%AD%D3R%00%C9%08%82%A94f%3D%08f%60%25%22%899%1B%3D%C3%27n.%A9%D2%01%ED%9F%19%E9nFB%93%F8%F8%E2%13O%B6%A1%09%8As%01T%87%B0%A8%C9%12%99%E9RF_%91Q6B%01%7C%5D%0B%BE%ACG2%858%CD%AA%99y%13%3D%83%04G%ADR%AD%7D%D7%EF%BE%13%B5D%26%99%07e%CC%02%90%29%A2HA%9EN%5D%80%9A%F1mC%AFv%FB%84%88c%87%7D%A5*%23%8B%A7@%19%B3%00%00%21%F2x%20%3B%80%AC%CC%60Zqu%F7%BE%CE%0B%5D%CF%F0%E7X%F3%1D%A6%29%B6%C93M%19%FD%C1%84%93%B5%7Cm%B3%ABi%C7%D7K%E7i%E2%07%25rw%16%E5oW8%F0%FCi%C0%7F%E6%7F5F%7F%21%C6%89%C2Rth%C2%92%E8%D1%A8%D4%CF%A5%FBF%C7L%D3g%BF%1D%3E%0D%F6%F0%A9%D2g%028%0D%F6%F0%E9%11%21%E4%BF%C9%BB%CBn%D9%60%89%1D%00%00%00%00IEND%AEB%60%82") );
      // _row.add("image", undefined, unescape("%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%94%00%00%00%21%08%06%00%00%00%3F%3B%82%12%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD%7E%FC%00%00%04%EFIDATx%9C%ED%5C%8Dm%22%3D%10u%3E%5D%03%5C%09%A4%84%A1%84PBR%02%29%01J8J%80%12%A0%04RB%A6%84P%C2G%099%8D%EEmd%CC%B3%D7k%BC%1C%BA%F8I%28%CA%EE%E2Y%8F%9F%E7%D7%C9%C3%E7%E7%A7kh%A8%85%FF%9A%26%1Bj%A2%11%AA%A1*%1A%A1%1A%AA%A2%11%AA%A1*%7E%94%0C%A6%AAO%CE9q%CE%3D%E3g%88%95%FD.%22%EB%B6%5C%DF%0B%83%B2%3C%10%E9W%84D1%AC%1A%B1%BE%0F%B2%09%A5%AAF%A4e%A1f%D49%F7%22%22%C7%EF%AE%F0%7F%1DY%84R%D5%8DsnAnm%ED%23%22%EA%3D%BB%04%F1%26%C1%B3F%A6%99%88%9C%C6%D2%29d%3B%BC%EB%D49%F7%26%22%F3%B1%E45%5C%A27%86%C2%2212%CDE%E4-%BCh%EEMU%8Dh%87%C05Nqm6%E2%3AtDj%F8KHfy%AA%3A%8D%B8%B9%17F%A6%0E%B0BsX%A5%B3%5B%AA%CA%C8%D9%F0%8F%20%E9%F2%22qS%B6%1B%01y6%C1%E5%A3%88%3Cf%7Ew%82%24%C0%87%91u%8Dq%F6x%F6%23%D32%BD%8A%C86%22o%891B%C2%9B%3B79%FBT%0C%88%CD%F7%11%5C%FEJH0%9FE%60%B5W%A9q%23%FA%A3s%C0%FB%87%BAzL%8C%FD%8C%F9%C6%F4%7B%8A%E9*%85%BE%3A%14%B3%26%D9%19%1B%5E%28%8C%99%A6%C8%16%29%EC%1E%08%B2%21%93u%1E%C9v5%AC%9D%27%EFWd%BE%82%7B%1F%88%25Kd%1C0%9F0%3B%EE%C6%8D%EA%A36Tu%82%F7%D9%F5%E8w%E3%C5%A4%D9%88%12JU%85%04%D6%A7%94%AB%8B%80%B1%9C*%10%049%DC*%0E*%90%B7%C0b%0C%91%B1%8B%CD%D7%C3%01%FA%BE%05r%DE%A7%18%29%0B%C5%26%A8%E4Z%1FXVw%B1%80P%28%B3%00%7Bd%87%0F%F6q%CE%FD%EC%5C%C5%D7%8B%8A%3C%E2%5Eh%DE%DF%BA%EF%E1%F3E%EE%84%BC%95%27kN%E6%FC%84P%20%07O%28%FE%E6%20w%CCb%C0%12%86d%DA%C35%3Ex%F3%5EE%0CA/RY%5Eh%9D%1CY%B0%1C0%122%B22%85Z%7C%F1r%F6%C5%3F%01%7F%8DB%29%93wV%845k%AC%AAs%C4F%BE%3E%96%96%C9f%D4%D5%BA%C5%B3%C5Y%DB%F3%88%B56da%8D%A8%E2%97%60F%00%EDj%84%F3%B8%A6%10%7D%17%BD%3CX%8BP%C1F%9C%D7%1B%CA%3B2E%26%08%9C%1B%BF%D9%82%BDv%8Bf%3F%91%D402%DE%2C%96%1AK%E6%BD4%87%D9%A4%B6%23%16A%99%BC%3D%B9%96%BA%97%B3%10%DB%C4ng.e%EC%D8%91%91%D8%82%EFM%AD%18%EE%5E%08%C5%149f%9Bf%90%3B%87u%09%C9%9D%B3%00%A99%B0%7B%A3%12%0Ae%16%26%D7%AC%ED%BB%AA%BE%97dv%3ER%84%CA%0A%A63P%1A%DC%DF%0D%A1%80%0B%7DX%0A%7E%C5%3B%8C%D6%82%EAA%CC%DD%BA%AED%A2%AA%FF%97%96dR%84%CA%0D%A6%FBP+%B8o%A8%00%C4p%8F%DD%11%A3%08%26%9D+%1C*1J%28d%1B%E1.%9A%A0%C2%3A%04%8C%E99%B5%AC1%EB2%25%D6%F7bc%8C%10%E3%DDl%A3Yl%E7%95%08b%1Ec1%D4R%F5%C5P%D7d7%7E%FB%C4%C7%91%14Go%1DO%0C%22%14%5C%5B8%8Fk%D3%7B%B6a%8A%08%85%F7+rQ%20%D6%0CM%7B6%A7%AA%84b%AD%93%A7%1C+%85I%B2%00%8F%91%94Y%AC%E7+c%94%14%A8%BC%C4%F3%EC%DE%D0%8EA%08%96%25%86%0B%9AK%FC%DD%B5%1B%D0%3C%12%88%15%92z%D0%1A%24%09%95%A8%C1%ECz%FAq%93HKCY%C3%11%EE5%5C%A0%18%21S%B8%C8%C4%18%29%23%F2%A6%89%0C%87%5D%CF%A9%24%D3M%81%0D%C9%EA%60%E1%3B1B-%BA%14%1F%7D%C8%F7%CA%B5%A4P%E6%20%B7%DE%5B6@%1D%85%29%EF%10%D6/%D0x%5C%A2%B2%1C%9A%F4%232%8C%18X%90%B8dm%0E%5B%10%BBN%08%C0H%B9%89X%3A%26%EFlL%9B%1Bzw%E1%C6Xg%9E%3E%15%A4%E3_n%03db%C1.%DB%B8%CC%05M0%E6gp%E6%2CUG%EBd%9B.%CC%18%2C%99%97%C1%DC%C3u%EB%1D%D7%C7%5D%1D%01%8E%1C%D7H%E1%ACU%02r%BF%27%9E%3F%3BzS%20%EFb%0Co%2Cv%7C%25%17%17-%26o%DC%D8iY%1F%DD%E6H%1E_%C9%1C%CB%C7%E0S%B6%D9%85M%11YE%9A%A5%7D%B0E%9F%E5%ECh%B8%C3yi%8D%06%AE%2C%BB%5DS%20o%3B%F0H%F1%3Ac%87G%C9%E4%8D%91%D2%DDX%7F%04%F2Vrd%7BP%A5%DC%7C%3C%02%B79v%05%9B%E8%09%F7%5E%D1%BD%1E4Y%C8%F8%99%E8x%1F%BD%F1Y%EF%AD%23I%96%DC@%1E%5B%7C%C5%3D%DB%EDC%7B%8B%27%90%E5%85%8C%BD%87%D5N%91%A9%AB%D2%CF%C8%7C%F68%86%3DD%BF+%EF%13%23%E9%1A%EF5/%29%8B%B4%7F%96Q%09%7D%276%BF%0B%DA_%0E7TE%23TCU4B5%D4%83s%EE7%FB%04b%F5%7E%9A%BF%0A%00%00%00%00IEND%AEB%60%82") );
    }
    _row.add('statictext', undefined, "Änderungen im Projekt Octopus\n\n" + msg.join("\n\n"), {multiline: true});
    _w.cancelElement = _w.add('button', undefined, 'OK');
    _w.cancelElement.onClick = function() {
      this.window.close();
    }
    _w.show();
    
  }
}




function install_files() {
  // -------------------------------------------------------------------------------------
  //  Remote JSON laden
  // -------------------------------------------------------------------------------------
  try {
    // if ( user_is_beta ) {
    //   var _json_path = download("data", gd.json_url + "?is_beta=true", "", gd.config_name, undefined, true);
    // } else {
      var _json_path = download("data", gd.json_url, "", gd.config_name, undefined, true);
    // }
    log ("config geladen");
  } catch(e) {
    log( "Fehler beim Config-Laden", e)
  }
  if ( ! _json_path ) return;
  var _remote_data = read_file(_json_path);
  var remote_satz = new Satz(_remote_data);
  
  // -------------------------------------------------------------------------------------
  //  Local JSON laden
  //  Das Hub-Panel liest den Pfad aus den PrivateData
  // -------------------------------------------------------------------------------------
  var _local_data = read_file(gd.ud_path + "/" + gd.local_config_name);
  app.insertLabel(gd.hub_name + "_config_path", gd.ud_path + "/" + gd.local_config_name);
  var local_satz = new Satz(_local_data);
  if ( ! _local_data ) {
    log("Lokale Config-Datei wurde erzeugt")
  }

  var _rs;

  // -------------------------------------------------------------------------------------
  //  veraltete löschen
  // -------------------------------------------------------------------------------------
  for (var sid in local_satz.scripts) {
    if (!remote_satz.get_script(sid)) {
      log ("Script wird gelöscht", sid);
      var _s = local_satz.get_script(sid);
      _s.uninstall();
      if ( is_installable( _s.status ) ) {
        what_was_done.weg.push( sid );
      }
    }
  }
  // -------------------------------------------------------------------------------------
  //  neue installieren
  // -------------------------------------------------------------------------------------
  for (var sid in remote_satz.scripts) {
    _rs = remote_satz.get_script(sid);
    if (!local_satz.get_script(sid) && _rs && is_installable( _rs.status )) {
      log("Neues Script", sid);
      // Extrawurst. Der Starter soll lokal vorliegen, aber hidden bleiben.
      // Müsste ich eigentlich darüber lösen, dass ich die in_id_folder und in_menu abfrage. Wenn beide false -> nicht anzeigen.
      if ( _rs.in_id_folder || _rs.in_id_startup || _rs.in_menu ) { 
        what_was_done.neu.push( sid );
      } else {
      }
      var _s = remote_satz.get_script(sid);
      try {
        _s.download();
      } catch(e) {
        log ( "Fehler beim Laden des Scripts", sid );
      }
      _s.install();
      // -------------------------------------------------------------------------------------
      // Es soll nur den Installer geben, der autom installiert wurde, nicht den manuellen
      // -------------------------------------------------------------------------------------
      // if ( sid == "octopus_installer" ) {
      //   var sp = get_script_path();
      //   if ( sp.dbg == false ) {
      //     // Nicht in VSCode
      //     var _manuelles_script = new File( sp.path );
      //     if ( ! user_is_dev ) _manuelles_script.remove();
      //     log ("Manuell installierter Installer wurde entfernt");
      //   }
      // }
    }
  }
  // -------------------------------------------------------------------------------------
  //  neue Versionsnummern installieren
  // -------------------------------------------------------------------------------------
  log( "--- Check auf neue Scriptversionen" )
  for (var sid in local_satz.scripts) {
    var _ls = local_satz.get_script(sid);
    var _rs = remote_satz.get_script(sid);
    if ( _rs && is_installable( _rs.status )) {
      if (_rs.version != _ls.version) {
        log("Neue Version", sid);
        what_was_done.anders.push( sid );
        _ls.uninstall();
        try { 
          _rs.download();
        } catch(e) {
          log ( "Fehler beim Laden des Scripts", sid );
        }
        _rs.install();
      } else {
        log( sid + " ist in Version " + _rs.version + " bereits installiert")
      }
      // ---------------------------------------------------------------------------------------------
      //  in_id_startup von local auf remote_satz übertragen, damit der stand gleich bleibt
      if ( remote_satz.scripts[sid].in_id_startup !== local_satz.scripts[sid].in_id_startup) {
        log("in_id_startup wird übertragen für", sid);
        remote_satz.scripts[sid].in_id_startup = local_satz.scripts[sid].in_id_startup
        if ( ! local_satz.scripts[sid].in_id_startup ) {
          _ls.uninstall( "startuponly" );
        }
      }
    }
  }

  remote_satz.save();
}
function is_installable( status ) {
  if ( status == "public" ) return true;
  if ( status == "beta" && user_is_beta ) return true;
  if ( status == "dev" && user_is_dev ) return true;
  return false;
}

function init_scripts() {
  log("--- Scripts initialisieren");
  var rs = [];

  var f_cfg = new File( gd.ud_path + "/" + gd.local_config_name);
  if (!f_cfg.exists) {
    return null;
  }
  try {
    var j_cfg = JSON.parse(fread(f_cfg));
  } catch (e) {
    return null;
  }
  for (var _s in j_cfg.scripts) {
    log (" - " + j_cfg.scripts[_s].script_id + " ins Menü?");
    log( "   menuflag: " + j_cfg.scripts[_s].in_menu.toString() 
          + ", is public: " + (j_cfg.scripts[_s].status == "public") 
          + ", is beta: " + (j_cfg.scripts[_s].status == "beta")
          + ", your are beta: " + user_is_beta
    );
    if (
      j_cfg.scripts[_s].in_menu &&
      (
        j_cfg.scripts[_s].status == "public" ||
        (j_cfg.scripts[_s].status == "beta" && user_is_beta)
      )
    ) {
      var _aux = { path: null, script_menu_action: null, event_listeners: [], menu_item: null }
      _aux.path = gd.ud_base;
      if (j_cfg.scripts[_s].subpath) {
        _aux.path += "/" + j_cfg.scripts[_s].subpath;
      }
      _aux.path += "/" + j_cfg.scripts[_s].filename;

      _aux.script_id = j_cfg.scripts[_s].script_id;
      _aux.sub_menu = j_cfg.scripts[_s].sub_menu;
      _aux.menu_position = j_cfg.scripts[_s].menu_position;
      _aux.rel_menu_item = j_cfg.scripts[_s].menu_item;
      if (typeof j_cfg.scripts[_s].menu_label == "string") {
        _aux.menu_label = j_cfg.scripts[_s].menu_label;
      } else {
        _aux.menu_label = localize(j_cfg.scripts[_s].menu_label);
      }
      _aux.menu_separator = j_cfg.scripts[_s].menu_separator;

      rs.push(_aux);
    } // if in_menu
  }     // cfg loop

  return rs;
}
function fread(f) {
  f.encoding = "UTF-8";
  f.open("r");
  var aux = f.read();
  f.close();
  return aux;
}
function fwrite(f, ctnt, append) {
  f.encoding = "UTF-8";
  if ( append ) {
    f.open("a")
  } else {
    f.open("w");
  }
  var aux = f.write( ctnt );
  f.close();
  return aux;
}




/**
 * 
 * @param {data|file} data_type: data wird in file geschrieben, file wird einfach kopiert
 * @param {string} src_base_path: Pfad zum repos auf Fileserver oder url zum Download
 * @param {string} subpath: subpfad vom repos aus, ohne Dateiname
 * @param {string} filename: Dateiname von sowohl quelle als auch Ziel
 * @param {string} tgt_basepath: idR der Pfad zum userData Ordner
 * @param {boolean} overwrite 
 * @returns Pfad zur neuen Datei
 */
function download(data_type, src_base_path, subpath, filename, tgt_basepath, overwrite) {
  if (!data_type) data_type = "file";

  var url = null;
  if (src_base_path.substr(0, 4).toLowerCase() == "http") url = src_base_path;

  var tgt_path;
  if (!tgt_basepath) tgt_basepath = gd.ud_path;
  if (subpath) {
    var tgt_path = tgt_basepath + "/" + subpath + "/" + filename;
    ensure_path_exists(subpath, tgt_basepath);
  } else {
    var tgt_path = tgt_basepath + "/" + filename;
  }

  if (url) {
    var request = {
      url: url,
      command: "", // defaults to ""
      port: "", // defaults to ""
      method: "GET",
    }
    if (data_type == "data") {
      var response = restix.fetch(request);
      if (response.error) throw new Error(response.error + "\n" + response.errorMsg);
      var json = clean_from_api( response.body );
      var f = new File(tgt_path);
      // f.encoding = gd.encoding;
      f.open("w");
      f.write(JSON.stringify(json, undefined, 2));
      f.close();
      return unescape(tgt_path)

    } else {
      if (overwrite || !File(tgt_path).exists) {
        var temp = new File(tgt_path);
        var response = restix.fetchFile(request, temp);
        if (response.error) throw new Error(response.error + "\n" + response.errorMsg);
      }
    }

  } else {
    if (subpath) {
      var src_path = src_base_path + "/" + subpath + "/" + filename;
    } else {
      var src_path = src_base_path + "/" + filename;
    }
    var src = new File(src_path);
    if (src.exists) {
      src.copy(tgt_path);
      return unescape(tgt_path);
    } else {
      throw ("File does not exist" + ": '" + src_path + "'");
    }
  }
}

// --------------------------------------------------------------------------------------------------------
//  Die Laravel-API gibt die Daten ganz anders zurück als ursprünglich geplant.
//  Also bau ich hier einen Adapter, dann ist die API unabhängig vom Script
//  API-Struktur in /api-response-v.json
// --------------------------------------------------------------------------------------------------------
function clean_from_api( body ) {
  var json = {
    repos: gd.json_url,
    scripts: []
  }
  if ( typeof body == "string" ) body = JSON.parse( body );
  for ( var n = 0; n < body.data.length; n++ ) {
    var rs = {};
    var b = body.data[n];
    if ( b.hasOwnProperty('media')) {
      rs.script_id = b.script_id;
      rs.description = {
        de: b.description_de,
        en: b.description_en
      };
      rs.subpath = b.subpath;
      rs.status = b.status;
      rs.type = b.type;
      rs.version = b.version;
      rs.in_id_folder = b.in_id_folder;
      rs.in_id_startup = b.in_id_startup;
      rs.in_menu = b.in_menu;
      rs.in_hub_panel = b.in_hub_panel;
      rs.help_url = b.help_url;
      rs.menu_label = {
        de: b.title_de,
        en: b.title_en
      }
      
      rs.filename = "";
      rs.url = "";
      rs.order = 0;
      for ( var p in b.media ) {
        if ( b.media[p].hasOwnProperty('order') && b.media[p].order > rs.order) {
          rs.filename =  b.media[p].file_name;
          rs.url =  b.media[p].original_url
          rs.order = b.media[p].order
        } // has order
      }   // media loop
    }     // has media
    json.scripts.push( rs );
  }       // data-loop
  return json;
}


function add_menus() {
  log("--- Adding Menus")
  // var _type_name = app.findKeyStrings("Tabelle");

  // Dashboard ans Ende
  scripts.sort( function(a,b){
    if ( a.script_id == "Dashboard" ) {
      return 1
    } else if ( b.script_id == "Dashboard" ) {
      return -1;
    }
    return 0;
  })
  var _main = app.menus.item("$ID/Main");
  log("Got main-menu object")
  var _table_menu = _main.menuElements.item("$ID/Table");
  var hub_menu = _main.submenus.add(gd.hub_name, LocationOptions.AFTER, _table_menu);
  for (var n = 0; n < scripts.length; n++) {
    var _scr = scripts[n];
    log( "Checking " + (n+1), scripts[n].script_id);
    var menu_label = scripts[n].menu_label ? scripts[n].menu_label : scripts[n].script_id;
    var schon_da = false;
    for (var m = 0; m < hub_menu.menuItems.length; m++) {
      if (hub_menu.menuItems[m].name == menu_label) schon_da = true;
    }
    if (!schon_da) {
      scripts[n].ix = n;
      // scripts[n].name = scripts[n].path.split("/").pop().replace(/\.jsx$/i, "");
      if ( scripts[n].script_id == "Dashboard") {
        hub_menu.menuSeparators.add( LocationOptions.AT_END );
      } 
      log("Installing in hub-menu '" + scripts[n].script_id + "'")
      scripts[n].script_menu_action = app.scriptMenuActions.add(menu_label);
      scripts[n].event_listeners.push(scripts[n].script_menu_action.eventListeners.add("onInvoke", function (e) {
        log("invoking", e.target.name);
        log("We have " + scripts.length + " Scripts registered")
        var _script;
        findscript: for (var n = 0; n < scripts.length; n++) {
          log( e.target.name + " ?= " + scripts[n].menu_label );
          if (scripts[n].menu_label == e.target.name) {
            _script = scripts[n];
            break findscript;
          }
        }
        log( "Loop done" );
        try {
          log("Checking Script Object", _script.path )
        } catch( err ) {
          log(err);
        }
        if (_script) {
          var _scriptpath = unescape( Folder.userData ) + "/" + _script.path;
          log( "Script liegt im Pfad '" + _scriptpath + "': " + File(_scriptpath).exists.toString() );
          if ( File(_scriptpath).exists ) {
            try {
              app.doScript(File(_scriptpath), undefined, undefined, UndoModes.ENTIRE_SCRIPT, _script.menu_labels);
            } catch(e) {
              log( "Beim Aufruf des Scriptes ist ein Fehler aufgetreten\n" + e );
              cs_alert("stop", "Beim Aufruf des Scriptes ist ein Fehler aufgetreten\n" + e, "Problem", "OK")
            }
          } else {
            log ("Das Script liegt nicht am vorgesehenen Ort\n" + (_scriptpath) );
            cs_alert( "stop", "Das Script liegt nicht am vorgesehenen Ort\n" + (_scriptpath) + "\nEs ist nicht klar, wie das passieren konnte.", "Script nicht vorhanden", "OK" )
          }
        } else {
          log("Script nicht gefunden")
        }
      })
      );
      scripts[n].menu_item = hub_menu.menuItems.add(scripts[n].script_menu_action);
      if (scripts[n].sub_menu) {
        log( "installing custom menu-item")
        var _menu = app.menus.item(scripts[n].sub_menu);
        if (!_menu.isValid) _menu = _main.submenus.item(scripts[n].sub_menu);
        if (scripts[n].rel_menu_item) {
          var _rel = _menu.menuElements.item(scripts[n].rel_menu_item);
          if (_rel.isValid == false) _rel = _menu.submenus.item(scripts[n].rel_menu_item);
          var _pos = scripts[n].menu_position == "before" ? LocationOptions.BEFORE : LocationOptions.AFTER;
          _menu.menuItems.add(
            scripts[n].script_menu_action,
            _pos,
            _rel
          )
          if (scripts[n].menu_separator) {
            _menu.menuSeparators.add(_pos, _rel)
          }
        } else {
          if (scripts[n].menu_separator) {
            _menu.menuSeparators.add()
          }
          _menu.menuItems.add(scripts[n].script_menu_action);
        }
      } // main menu
    } // schon da
  }

}
function remove() {
  var _main = app.menus.item("$ID/Main");
  var hub_menu = _main.submenus.item(gd.hub_name)
  hub_menu.remove();
}
function log(a, b) {
  if ( ! gd.do_log ) return;

  var now = new Date();
  var now_str = get_now_string();

  var faux = new Folder(gd.ud_path + "/logs");
  if (!faux.exists) faux.create();
  var flog = new File(faux.toString() + "/" + gd.scriptname + ".txt");
  flog.open("a");
  flog.write(now_str + "  ")
  if (b) {
    flog.writeln(a + ": " + b);
  } else {
    flog.writeln(a);
  }
  flog.close();
}
function open_log() {
  if ( ! gd.do_log ) return;
  var flog = new File(gd.ud_path + "/logs/" + gd.scriptname + ".txt");
  flog.execute();
}




function get_paths_to_script_folder() {
  var panel_folder = app.scriptPreferences.scriptsFolder
  var startup_folder_path = panel_folder.parent.fullName + "/Startup Scripts";
  var startup_folder = new Folder(startup_folder_path);
  if (!startup_folder.exists) startup_folder.create();

  return {
    "panel": panel_folder.fullName,
    "startup": startup_folder_path
  }
}

function ensure_path_exists(sub_path, base_path, is_file_path) {
  if (!sub_path) return base_path;
  var path = unescape(base_path);
  sub_path = sub_path.replace(/^\//, "");
  var bits = sub_path.split("/");
  if (is_file_path) {
    // Das letzte bit ist der Dateiname
    bits.pop();
  }
  for (var n = 0; n < bits.length; n++) {
    if (!Folder(path + "/" + bits[n]).exists) Folder(path + "/" + bits[n]).create();
    path += "/" + bits[n];
  }
  return path;
}
function read_file(file_path) {
  // Es soll möglich sein, ein Fileobject zu übergeben
  if (file_path.constructor.name == "File") {
    if (file_path.exists) {
      file_path = file_path.fullName;
    } else {
      file_path = file_path.name;
    }
  }
  // Wir haben absoluten Pfad
  if (file_path.charAt(0) == "/" || file_path.charAt(0) == "~") {
    var f = new File(file_path);
    if (!f.exists) {
      return null;
    }
    // f.encoding = gd.encoding;
    f.open("r");
    var rs = f.read();
    f.close();
    return rs;
  }
  // Wir haben relativen Pfad
  file_path = file_path.replace(/^\.\//, "");
  var doc_path, desktop_path, script_path, user_path;
  if (app.documents.length && app.activeDocument.saved) doc_path = File(app.activeDocument.fullName).parent.fullName;
  desktop_path = Folder.desktop.fullName;
  script_path = File(get_script_path().path).parent.fullName;
  user_path = Folder.userData.fullName + "/" + gd.ud_base;

  var read_this_path = "";
  if (doc_path && File(doc_path + "/" + file_path).exists) {
    read_this_path = doc_path + "/" + file_path;
  } else if (File(desktop_path + "/" + file_path).exists) {
    read_this_path = desktop_path + "/" + file_path;
  } else if (File(script_path + "/" + file_path).exists) {
    read_this_path = script_path + "/" + file_path;
  } else if (File(user_path + "/" + file_path).exists) {
    read_this_path = user_path + "/" + file_path;
  }
  if (read_this_path) {
    var f = new File(read_this_path);
    // f.encoding = gd.encoding;
    f.open("r");
    var rs = f.read();
    f.close();
    return rs;
  } else {
    return null;
  }
}

function get_script_path( ) {
  var scriptPath, scriptFolderPath;
  try {
    scriptPath  = app.activeScript.fullName;
    return { path: scriptPath, dbg: false };
  } 
  catch (e) { 
    /* We're running from the ESTK*/
    scriptPath = e.fileName
    return { path: scriptPath, dbg: true };
  }
  return scriptPath;
}  








function init_classes() {

  // wir haben den Namen der neu geladenen JSON und den Namen der lokalen, angereicherten JSON
  gd = {};
  gd.scriptname = 'Octopus-Installer';
  gd.hub_name = "Octopus";
  gd.config_name = "config.json";
  gd.local_config_name = "local_config.json";
  gd.ud_base = "cs_octopus_" + app.version.split(".").shift();   // Der Name des Ordners in userData
  gd.ud_path = ensure_path_exists(gd.ud_base, Folder.userData);
  gd.encoding = "UTF-8";  // Beim lesen und schreiben ("ISO-8859-1" auf Windows?)
  gd.json_url = "https://octopus.cuppascript.de/api/v1/scripts";  // urls mit Dateiname
  // gd.json_url = "/Users/me/Dropbox/Documents/CS4 Scriptfolder/ octopus/scripthub/hub"; // muss ohne Dateiname sein

  // gd.do_log = beta;
  // if ( File( gd.ud_path + "/do_log.txt").exists ) {
  //   var aux = fread( File( gd.ud_path + "/do_log.txt") );
  //   gd.do_log =  ( aux == "true" ); 
  // }
  gd.do_log = true;

  log( "--------------------")
  log( gd.scriptname + " started");
  
  // ------------------------------------------------------------------------------------------------
  // Script-Class
  // ------------------------------------------------------------------------------------------------
  if (typeof Skript !== "object") {
    Skript = function (cfg, repos) {
      this.repos = repos;
      var _props = {
        script_id: "test",
        // description: "test",
        url: "",
        subpath: "",
        filename: "",
        status: "public",
        type: "script",
        version: "0.1",
        in_id_folder: false,
        in_menu: false,
        in_hub_panel: true,
        sub_menu: "",
        menu_position: "",
        menu_item: "",
        menu_label: "",
        menu_separator: false
      }
      // this.create_log = [];
      for (var _p in _props) {
        if (cfg.hasOwnProperty(_p)) {
          this[_p] = cfg[_p]
        } else {
          this[_p] = _props[_p]
        }
      }
      for ( var _p in cfg ) {
        if ( ! this.hasOwnProperty(_p) ) {
          this[_p] = cfg[_p];
        }
      }
      // Ich will den Pfad zum userData Ordner als Property haben
      if (this.subpath) {
        this.backend_path = ensure_path_exists(this.subpath, gd.ud_path) + "/" + this.filename;
      } else {
        this.backend_path = gd.ud_path + "/" + this.filename;
      }

    }
    // Der Pfad zum Script im repository
    Skript.prototype.repos_path = function () {
      if (this.subpath) {
        return this.repos + "/" + this.subpath + "/" + this.filename;
      } else {
        return this.repos + "/" + this.filename;
      }
    }
    // Der Pfad zum Script im UserData-Hub-Folder
    Skript.prototype.ud_path = function () {
      if (this.subpath) {
        return ensure_path_exists(this.subpath, gd.ud_path) + "/" + this.filename;
      } else {
        return gd.ud_path + "/" + this.filename;
      }
    }
    // Der Pfad zum Script im "Script Panel" oder "Startup Script" Folder
    Skript.prototype.id_path = function () {
      var panel = null, startup = null;
      var scriptfolder_paths = get_paths_to_script_folder();

      if (this.type == "startup") {
        return {
          panel: null,
          startup: ensure_path_exists(this.subpath, scriptfolder_paths.startup) + "/" + this.filename
        }
//        return ensure_path_exists(this.subpath, scriptfolder_paths.startup) + "/" + this.filename;
      } else if (this.type == "hybrid") {
        return {
          panel: ensure_path_exists(this.subpath, scriptfolder_paths.panel) + "/" + this.filename,
          startup: ensure_path_exists(this.subpath, scriptfolder_paths.startup) + "/" + this.filename
        }
      } else {
        return {
          panel: ensure_path_exists(this.subpath, scriptfolder_paths.panel) + "/" + this.filename,
          startup: null
        }
//        return ensure_path_exists(this.subpath, scriptfolder_paths.panel) + "/" + this.filename;
      }
    }
    Skript.prototype.download = function () {
      // Aus dem Internet oder aus einem Fileserver-Hub?
      if (this.url) {
        var src_url = this.url;
        log( "download from url", this.script_id)
        var request = {
          url: src_url,
          command: "", // defaults to ""
          port: "", // defaults to ""
          method: "GET",
        }
        var temp = new File(this.ud_path());
        var response = restix.fetchFile(request, temp);
        if (response.error) throw new Error(response.error + "\n" + response.errorMsg);
        return this.ud_path();

      } else {
        log("download from hub");
        var src_file = new File(this.repos_path());
        if (src_file.exists) {
          var aux = this.ud_path();
          var rs = src_file.copy(this.ud_path())
        } else {
          throw new Error("Script-Datei '" + this.script_id + "' liegt nicht vor im Repository");
        }
      }
    }
    Skript.prototype.install = function () {
      var a = this;
      if ( is_installable(this.status) && (this.in_id_folder || this.in_id_startup)) {
        var src_file = new File(this.ud_path());
        var tgt_path = this.id_path();
        log( "Kopiere in ID-Folder", this.script_id);
        log( "...von '" + this.ud_path() + "' in '" + tgt_path.panel + "'")
        if (!src_file.exists) {
          throw new Error("Script '" + this.script_id + "' ist anscheinend nicht runtergeladen");
          return;
        }
        if ( tgt_path.panel ) {
          var aux = src_file.copy(tgt_path.panel);
          log( "...panel-copy success: " + aux.toString() )
        }
        if ( tgt_path.startup ) {
          if ( this.in_id_startup ) {
            var aux = src_file.copy(tgt_path.startup);
            log( "...startup-copy success: " + aux.toString() )
          }
        }
      }
    }
    Skript.prototype.uninstall = function ( startup_only ) {
      log("uninstalling", this.script_id);
      var tgt_path = this.id_path();
      var tgt;

      if ( tgt_path.panel && ! startup_only ) {
        tgt = new File( tgt_path.panel );
        if (tgt.exists) tgt.remove();
      }
      if ( tgt_path.startup ) {
        tgt = new File( tgt_path.startup );
        if (tgt.exists) tgt.remove();
      }
    }
  }
  // ------------------------------------------------------------------------------------------------
  // Satz-Class
  // ------------------------------------------------------------------------------------------------
  if (typeof Satz !== "object") {
    Satz = function (rawdata) {
      if (!rawdata) {
        var data = {};
        this.scripts = {};
      } else {
        var data = JSON.parse(rawdata);
        this.repos_path = data.repos_path;
        this.scripts = {};
        for (var n = 0; n < data.scripts.length; n++) {
          // Damit sind Kommentare im JSON möglich
          if (typeof data.scripts[n] !== "string") {
            this.scripts[data.scripts[n].script_id] = new Skript(data.scripts[n], this.repos_path);
          }
        }
      }
    }
    Satz.prototype.get_script = function (script_id) {
      if (this.scripts.hasOwnProperty(script_id)) {
        return this.scripts[script_id];
      }
      return null;
    }
    Satz.prototype.save = function () {
      // -------------------------------------------------------------------------------------
      //  remote_satz.scripts ist { id: {} }
      //  aber in der config ist data.scripts [ {id:...} ]
      // -------------------------------------------------------------------------------------
      var _l = {
        repos_path: this.repos_path,
        scripts: []
      }
      for ( var _s in this.scripts ) {
        _l.scripts.push( this.scripts[_s] );
      }
    
      var f = new File(gd.ud_path + "/" + gd.local_config_name);
      f.encoding = gd.encoding;
      f.open("w");
      f.write(JSON.stringify(_l, undefined, 2));
      f.close();
    }
  }

  log ("Klassen instantiiert");
}





















// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
//  JSON und RESTIX
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
function init() {

  uid = ($.os.substring(0, 7)=="Windows") ? $.getenv("USERNAME") : $.getenv("USER")
  user_is_beta = (
      uid == "cstef" || 
      uid == "rseid" || 
      uid == "aflae" || 
      uid == "Nicole Weckler" || 
      uid == "Gerald Singelmann" || 
      uid == "me"
    );
  user_is_dev = (uid == "Gerald Singelmann" || uid == "me");
  


  // ------------------------------------------------------------------------------------------------
  // Globale base64 Variablen
  // ------------------------------------------------------------------------------------------------
  END_OF_INPUT = -1;

  base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
  );

  reverseBase64Chars = new Array();
  for (var i=0; i < base64Chars.length; i++){
    reverseBase64Chars[base64Chars[i]] = i;
  }


  // ------------------------------------------------------------------------------------------------
  // JSON
  // ------------------------------------------------------------------------------------------------
  if (typeof JSON !== "object") {
    JSON = {};
  }
  
  (function () {
    "use strict";
    
    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    
    function f(n) {
      // Format integers to have at least two digits.
      return (n < 10)
          ? "0" + n
          : n;
    }
    
    function this_value() {
      return this.valueOf();
    }
    
    if (typeof Date.prototype.toJSON !== "function") {
      
      Date.prototype.toJSON = function () {
        
        return isFinite(this.valueOf())
            ? (
                this.getUTCFullYear()
                + "-"
                + f(this.getUTCMonth() + 1)
                + "-"
                + f(this.getUTCDate())
                + "T"
                + f(this.getUTCHours())
                + ":"
                + f(this.getUTCMinutes())
                + ":"
                + f(this.getUTCSeconds())
                + "Z"
            )
            : null;
      };
      
      Boolean.prototype.toJSON = this_value;
      Number.prototype.toJSON = this_value;
      String.prototype.toJSON = this_value;
    }
    
    var gap;
    var indent;
    var meta;
    var rep;
    
    
    function quote(string) {
      
      // If the string contains no control characters, no quote characters, and no
      // backslash characters, then we can safely slap some quotes around it.
      // Otherwise we must also replace the offending characters with safe escape
      // sequences.
      
      rx_escapable.lastIndex = 0;
      return rx_escapable.test(string)
          ? "\"" + string.replace(rx_escapable, function (a) {
        var c = meta[a];
        return typeof c === "string"
            ? c
            : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
      }) + "\""
          : "\"" + string + "\"";
    }
    
    
    function str(key, holder) {
      
      // Produce a string from holder[key].
      
      var i;          // The loop counter.
      var k;          // The member key.
      var v;          // The member value.
      var length;
      var mind = gap;
      var partial;
      var value = holder[key];
      
      // If the value has a toJSON method, call it to obtain a replacement value.
      
      if (
          value
          && typeof value === "object"
          && typeof value.toJSON === "function"
      ) {
        value = value.toJSON(key);
      }
      
      // If we were called with a replacer function, then call the replacer to
      // obtain a replacement value.
      
      if (typeof rep === "function") {
        value = rep.call(holder, key, value);
      }
      
      // What happens next depends on the value's type.
      
      switch (typeof value) {
        case "string":
          return quote(value);
        
        case "number":
          
          // JSON numbers must be finite. Encode non-finite numbers as null.
          
          return (isFinite(value))
              ? String(value)
              : "null";
        
        case "boolean":
        case "null":
          
          // If the value is a boolean or null, convert it to a string. Note:
          // typeof null does not produce "null". The case is included here in
          // the remote chance that this gets fixed someday.
          
          return String(value);
          
          // If the type is "object", we might be dealing with an object or an array or
          // null.
        
        case "object":
          
          // Due to a specification blunder in ECMAScript, typeof null is "object",
          // so watch out for that case.
          
          if (!value) {
            return "null";
          }
          
          // Make an array to hold the partial results of stringifying this object value.
          
          gap += indent;
          partial = [];
          
          // Is the value an array?
          
          if (Object.prototype.toString.apply(value) === "[object Array]") {
            
            // The value is an array. Stringify every element. Use null as a placeholder
            // for non-JSON values.
            
            length = value.length;
            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || "null";
            }
            
            // Join all of the elements together, separated with commas, and wrap them in
            // brackets.
            
            v = partial.length === 0
                ? "[]"
                : gap
                    ? (
                        "[\n"
                        + gap
                        + partial.join(",\n" + gap)
                        + "\n"
                        + mind
                        + "]"
                    )
                    : "[" + partial.join(",") + "]";
            gap = mind;
            return v;
          }
          
          // If the replacer is an array, use it to select the members to be stringified.
          
          if (rep && typeof rep === "object") {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
              if (typeof rep[i] === "string") {
                k = rep[i];
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (
                      (gap)
                          ? ": "
                          : ":"
                  ) + v);
                }
              }
            }
          } else {
            
            // Otherwise, iterate through all of the keys in the object.
            
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (
                      (gap)
                          ? ": "
                          : ":"
                  ) + v);
                }
              }
            }
          }
          
          // Join all of the member texts together, separated with commas,
          // and wrap them in braces.
          
          v = partial.length === 0
              ? "{}"
              : gap
                  ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                  : "{" + partial.join(",") + "}";
          gap = mind;
          return v;
      }
    }
    
    // If the JSON object does not yet have a stringify method, give it one.
    
    if (typeof JSON.stringify !== "function") {
      meta = {    // table of character substitutions
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\"": "\\\"",
        "\\": "\\\\"
      };
      JSON.stringify = function (value, replacer, space) {
        
        // The stringify method takes a value and an optional replacer, and an optional
        // space parameter, and returns a JSON text. The replacer can be a function
        // that can replace values, or an array of strings that will select the keys.
        // A default replacer method can be provided. Use of the space parameter can
        // produce text that is more easily readable.
        
        var i;
        gap = "";
        indent = "";
        
        // If the space parameter is a number, make an indent string containing that
        // many spaces.
        
        if (typeof space === "number") {
          for (i = 0; i < space; i += 1) {
            indent += " ";
          }
          
          // If the space parameter is a string, it will be used as the indent string.
          
        } else if (typeof space === "string") {
          indent = space;
        }
        
        // If there is a replacer, it must be a function or an array.
        // Otherwise, throw an error.
        
        rep = replacer;
        if (replacer && typeof replacer !== "function" && (
            typeof replacer !== "object"
            || typeof replacer.length !== "number"
        )) {
          throw new Error("JSON.stringify");
        }
        
        // Make a fake root object containing our value under the key of "".
        // Return the result of stringifying the value.
        
        return str("", {"": value});
      };
    }
    
    
    // If the JSON object does not yet have a parse method, give it one.
    
    if (typeof JSON.parse !== "function") {
      JSON.parse = function (text, reviver) {
        
        // The parse method takes a text and an optional reviver function, and returns
        // a JavaScript value if the text is a valid JSON text.
        
        var j;
        
        function walk(holder, key) {
          
          // The walk method is used to recursively walk the resulting structure so
          // that modifications can be made.
          
          var k;
          var v;
          var value = holder[key];
          if (value && typeof value === "object") {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = walk(value, k);
                if (v !== undefined) {
                  value[k] = v;
                } else {
                  delete value[k];
                }
              }
            }
          }
          return reviver.call(holder, key, value);
        }
        
        
        // Parsing happens in four stages. In the first stage, we replace certain
        // Unicode characters with escape sequences. JavaScript handles many characters
        // incorrectly, either silently deleting them, or treating them as line endings.
        
        text = String(text);
        rx_dangerous.lastIndex = 0;
        if (rx_dangerous.test(text)) {
          text = text.replace(rx_dangerous, function (a) {
            return (
                "\\u"
                + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            );
          });
        }
        
        // In the second stage, we run the text against regular expressions that look
        // for non-JSON patterns. We are especially concerned with "()" and "new"
        // because they can cause invocation, and "=" because it can cause mutation.
        // But just to be safe, we want to reject all unexpected forms.
        
        // We split the second stage into 4 regexp operations in order to work around
        // crippling inefficiencies in IE's and Safari's regexp engines. First we
        // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
        // replace all simple value tokens with "]" characters. Third, we delete all
        // open brackets that follow a colon or comma or that begin the text. Finally,
        // we look to see that the remaining characters are only whitespace or "]" or
        // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.
        
        if (
            rx_one.test(
                text
                    .replace(rx_two, "@")
                    .replace(rx_three, "]")
                    .replace(rx_four, "")
            )
        ) {
          
          // In the third stage we use the eval function to compile the text into a
          // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
          // in JavaScript: it can begin a block or an object literal. We wrap the text
          // in parens to eliminate the ambiguity.
          
          j = eval("(" + text + ")");
          
          // In the optional fourth stage, we recursively walk the new structure, passing
          // each name/value pair to a reviver function for possible transformation.
          
          return (typeof reviver === "function")
              ? walk({"": j}, "")
              : j;
        }
        
        // If the text is not JSON parseable, then a SyntaxError is thrown.
        
        throw new SyntaxError("JSON.parse");
      };
    }
  }());
  


  // ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------
  // HTTP
  // ------------------------------------------------------------------------------------------------

	/****************
	# Connect InDesign to the web
	* HTTPS supported 
	* Works form CS4 to CC 2018 (ExtendScript based library)
	* Based on VBScript/ServerXMLHTTP (Win) AppleScript/curl (Mac) relies on app.doScript()

	## Getting started
	See examples/connect.jsx

	* @Version: 1.2
	* @Date: 2019-02-20
	* @Author: Gregor Fellenz, http://www.publishingx.de
	* Acknowledgments: 
	** Library design pattern from Marc Aturet https://forums.adobe.com/thread/1111415
	*/

	$.global.hasOwnProperty('restix') || (function (HOST, SELF) {
		HOST[SELF] = SELF;

		/****************
		* PRIVATE
		*/
		var INNER = {};
		INNER.version = "2019-02-20-1.2";


		/** Returns if the operating system is windows 
		* @return {String} true | false
		*/
		INNER.isWindows = function () {
			return ($.os.indexOf("Windows") > -1);
		}

		/** Check the request information object and construct a full URL
		* @param {request} Request information object
		* @returns{request} Request information object or throws an error
		*/
		INNER.checkRequest = function (request) {
			if (request.url == undefined || request.url == "") throw Error("No property [url] found/set");
			if (request.url.toString().slice(-1) == "/") request.url = request.url.toString().slice(0, -1);

			if (request.command == undefined) request.command = "";
			if (request.command.toString()[0] == "/") request.command = request.command.toString().substr(1);

			if (request.port == undefined) request.port = "";
			if (isNaN(request.port)) throw Error("[port] is Not a Number");

			// Add port
			if (request.port != "") {
				request.fullURL = request.url + ":" + request.port;
			}
			else {
				request.fullURL = request.url;
			}

			// Add command 
			if (request.command != "") {
				request.fullURL = request.fullURL + "/" + request.command;
			}


			if (request.method == undefined || request.method == "") request.method = "GET";
			if (!(request.method == "GET" || request.method == "POST" || request.method == "PUT" || request.method == "PATCH" || request.method == "DELETE")) throw Error("Method " + request.method + " is not supported");  // Missing HEAD 

			if (request.method == "POST" && (request.binaryFilePath == undefined || request.binaryFilePath == "")) request.binaryFilePath = false;

			if (request.headers == undefined) request.headers = [];
			if (!(request.headers instanceof Array)) throw Error("Provide [headers] as Array of {name:'',value''} objects");
			if (request.body == undefined || request.body == "") request.body = false;

			if (request.body && request.binaryFilePath) throw Error("You must not provide [body] and [binaryFilePath]");

			request.unsafe = false;

			if (request.proxy == undefined) request.proxy = false;

			return request;
		}

		/** The main connection function. Need to be slashed
		* @return {response} Response result object 
		*/
		INNER.processRequest = function (request, outFile) {
			var response = {
				error: false,
				errorMsg: "",
				body: "",
				httpStatus: 900
			};

			var scriptCommands = [];
			var systemCmd = "";
			var result = "";

			if (INNER.isWindows()) {
				// Since Win10 Update Feb 2019 msxml3 does not work anymore...
				scriptCommands.push('Dim xHttp : Set xHttp = CreateObject("MSXML2.ServerXMLHTTP.6.0")');
				// Konstanten für ADODB.Stream
				scriptCommands.push('Const adTypeBinary = 1');
				scriptCommands.push('Const adSaveCreateOverWrite = 2');
				scriptCommands.push('Const adModeReadWrite = 3');

				scriptCommands.push('Dim res');
				scriptCommands.push('On Error Resume Next');
				scriptCommands.push('xHttp.Open "' + request.method + '", "' + request.fullURL + '", False');

				if (request.proxy != false) {
					// xHttp.SetProxy 1
					scriptCommands.push('xHttp.setProxy 2, "' + request.proxy + '"');
				}

				for (var i = 0; i < request.headers.length; i++) {
					scriptCommands.push('xHttp.setRequestHeader "' + request.headers[i].name + '","' + request.headers[i].value + '"');
				}
				if (request.unsafe) {
					//~ ' 2 stands for SXH_OPTION_IGNORE_SERVER_SSL_CERT_ERROR_FLAGS
					//~ ' 13056 means ignore all server side cert error
					scriptCommands.push('xHttp.setOption 2, 13056');
				}

				if (request.body) {
					scriptCommands.push('xHttp.Send "' + request.body.replace(/"/g, '""').replace(/\n|\r/g, '') + '"');
				}
				else if (request.method == "POST" && request.binaryFilePath) {
					// http://www.vbforums.com/showthread.php?418570-RESOLVED-HTTP-POST-a-zip-file
					scriptCommands.push('    Dim sFile');
					scriptCommands.push('    sFile = "' + request.binaryFilePath + '"');


					scriptCommands.push('    Set objStream = CreateObject("ADODB.Stream")');
					scriptCommands.push('    objStream.Type = adTypeBinary');
					scriptCommands.push('    objStream.Mode = adModeReadWrite');
					scriptCommands.push('    objStream.Open');
					scriptCommands.push('    objStream.LoadFromFile(sFile)');

					scriptCommands.push('    xHttp.SetRequestHeader "Content-Length", objStream.Size');
					scriptCommands.push('    xHttp.Send objStream.Read(objStream.Size)');
					scriptCommands.push('    Set objStream= Nothing');
				}
				else {
					scriptCommands.push('xHttp.Send');
				}
				
				scriptCommands.push('If err.Number = 0 Then');

				if (outFile) {
					scriptCommands.push('    Set objStream = CreateObject("ADODB.Stream")');
					scriptCommands.push('    objStream.Type = adTypeBinary');
					scriptCommands.push('    objStream.Mode = adModeReadWrite');
					scriptCommands.push('    objStream.Open');
					scriptCommands.push('    objStream.Write xHttp.responseBody');
					scriptCommands.push('    objStream.SaveToFile "' + outFile.fsName + '" , adSaveCreateOverWrite');
					scriptCommands.push('    objStream.Close');
					scriptCommands.push('    Set objStream= Nothing');
					/*	
						ADODB.Stream let's you also save text data and let's you specify charset (codepage) for text-to-binary data conversion (against of Scripting.TextStream object). 
						Const adTypeText = 2
						Const adSaveCreateOverWrite = 2
						
						'Create Stream object
						Dim BinaryStream
						Set BinaryStream = CreateObject("ADODB.Stream")
						
						'Specify stream type - we want To save text/string data.
						BinaryStream.Type = adTypeText
						
						'Specify charset For the source text (unicode) data.
						If Len(CharSet) > 0 Then
							BinaryStream.CharSet = CharSet
						End If
						
						'Open the stream And write binary data To the object
						BinaryStream.Open
						BinaryStream.WriteText Text
						
						'Save binary data To disk
						BinaryStream.SaveToFile FileName, adSaveCreateOverWrite
					End Function
						*/
					scriptCommands.push('	res = "outFile" & vbCr & "------http_code" &  xHttp.status');
				}
				else {
					// ' give respones
					scriptCommands.push('	res = xHttp.responseText  &  vbCr & "------http_code" &  xHttp.status');
				}

				scriptCommands.push('Else');
				scriptCommands.push('	res =  "xHttpError "  & Err.Description &  " " & Err.Number');
				scriptCommands.push('End If');

				scriptCommands.push('Set xHttp = Nothing');
				scriptCommands.push('returnValue = res');

				scriptCommands = scriptCommands.join("\r\n");

				try {
					result = app.doScript(scriptCommands, ScriptLanguage.VISUAL_BASIC);
				}
				catch (e) {
					result = "doScriptError: " + e.message;
				}

			}
			else { // Mac
				// -L follow redirects 
				var curlString = 'curl --silent --show-error -g -L ';
				for (var i = 0; i < request.headers.length; i++) {
					curlString += (' -H \'' + request.headers[i].name + ': ' + request.headers[i].value + '\'');
				}
				if (request.unsafe) {
					// Es gab einen Fall wo am Mac mit -k es nicht funktioniert hat curl: (35) Server aborted the SSL handshake
					curlString += ' -k ';
				}

				if (request.proxy != false) {
					curlString += ' --proxy ' + request.proxy
				}

				curlString += ' -X ' + request.method;
				if (request.body) {
					curlString += ' -d \'' + request.body.replace(/"/g, '\\"').replace(/\n|\r/g, '') + '\'';
				}
				else if (request.method == "POST" && request.binaryFilePath) {
					curlString += ' --data-binary \'@' + request.binaryFilePath + '\'';
				}

				if (outFile) {
					curlString += ' -w \'outFile\n------http_code%{http_code}\'';
					curlString += ' -o \'' + outFile.fsName + '\''
				}
				else {
					curlString += ' -w \'\n------http_code%{http_code}\'';
				}
				curlString += ' \'' + request.fullURL + '\'';
				//~ 			$.writeln(curlString);
				try {
					result = app.doScript('do shell script "' + curlString + '"', ScriptLanguage.APPLESCRIPT_LANGUAGE);
				}
				catch (e) {
					result = "doScriptError: " + e.message;
				}
			}

			// Fill response 
			if (typeof result == 'undefined') {
				throw Error("No result value. Probably System Script could not run?");
			}
			if (result.match(/^xHttpError|^curl: \(\d+\)|^doScriptError:/)) {
				response.error = true;
				response.errorMsg = result;
			}
			else {
				var resArray = result.split("\r------http_code");
				if (resArray.length == 2) {
					response.httpStatus = resArray[1] * 1;
					response.body = resArray[0];
				}
				else {
					throw Error("Wrong result value: [" + result + "]");
				}
			}

			return response;
		}


		/****************
			* API 
			*/
		/** Process an HTTP Request 
		* @param {request} Request object with connection Information
		* @return {response} Response object {error:error, errorMsg:errorMsg, body:body, httpStatus:httpStatus}
		*/
		SELF.fetch = function (request) {
			request = INNER.checkRequest(request);
			return INNER.processRequest(request, false);
		}

		/** Process an HTTP Request and writes the result to a give File
		* @param {request} Request Object with connection Information
		* @param {outFile} File to write to
		* @return {response} Response object {error:error, errorMsg:errorMsg, body:body, httpStatus:httpStatus}
		*/
		SELF.fetchFile = function (request, outFile) {
			if (outFile == undefined) throw Error("No file provided");
			if (outFile instanceof String) outFile = File(outFile);

			request = INNER.checkRequest(request);
			var response = INNER.processRequest(request, outFile);
			if (!outFile.exists) {
				response.error = true;
				response.errorMsg = "File was not created\n" + response.errorMsg;
			}
			return response;
		}



	})($.global, { toString: function () { return 'restix'; } });



  // ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------
  // MD5
  // ------------------------------------------------------------------------------------------------
  md5 = function(s) {
    function md5cycle(x, k) {
      var a = x[0],
        b = x[1],
        c = x[2],
        d = x[3];

      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);

      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);

      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);

      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[14], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894986606);
      c = ii(c, d, a, b, k[10], 15, -1051523);
      b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359);
      d = ii(d, a, b, c, k[15], 10, -30611744);
      c = ii(c, d, a, b, k[6], 15, -1560198380);
      b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070);
      d = ii(d, a, b, c, k[11], 10, -1120210379);
      c = ii(c, d, a, b, k[2], 15, 718787259);
      b = ii(b, c, d, a, k[9], 21, -343485551);

      x[0] = add32(a, x[0]);
      x[1] = add32(b, x[1]);
      x[2] = add32(c, x[2]);
      x[3] = add32(d, x[3]);

    }

    function cmn(q, a, b, x, s, t) {
      a = add32(add32(a, q), add32(x, t));
      return add32((a << s) | (a >>> (32 - s)), b);
    }

    function ff(a, b, c, d, x, s, t) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function md51(s) {
      txt = '';
      var n = s.length,
        state = [1732584193, -271733879, -1732584194, 271733878],
        i;
      for (i = 64; i <= s.length; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
      }
      s = s.substring(i - 64);
      var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i = 0; i < s.length; i++)
        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
      tail[i >> 2] |= 0x80 << ((i % 4) << 3);
      if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++) tail[i] = 0;
      }
      tail[14] = n * 8;
      md5cycle(state, tail);
      return state;
    }

    /* there needs to be support for Unicode here,
    * unless we pretend that we can redefine the MD-5
    * algorithm for multi-byte characters (perhaps
    * by adding every four 16-bit characters and
    * shortening the sum to 32 bits). Otherwise
    * I suggest performing MD-5 as if every character
    * was two bytes--e.g., 0040 0025 = @%--but then
    * how will an ordinary MD-5 sum be matched?
    * There is no way to standardize text to something
    * like UTF-8 before transformation; speed cost is
    * utterly prohibitive. The JavaScript standard
    * itself needs to look at this: it should start
    * providing access to strings as preformed UTF-8
    * 8-bit unsigned value arrays.
    */
    function md5blk(s) { /* I figured global was faster.   */
      var md5blks = [],
        i; /* Andy King said do it this way. */
      for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) +
          (s.charCodeAt(i + 1) << 8) +
          (s.charCodeAt(i + 2) << 16) +
          (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
    }

    var hex_chr = '0123456789abcdef'.split('');

    function rhex(n) {
      var s = '',
        j = 0;
      for (; j < 4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
        hex_chr[(n >> (j * 8)) & 0x0F];
      return s;
    }

    function hex(x) {
      for (var i = 0; i < x.length; i++)
        x[i] = rhex(x[i]);
      return x.join('');
    }

    function add32(a, b) {
      return (a + b) & 0xFFFFFFFF;
    }

    return hex(md51(s));

  }
}
