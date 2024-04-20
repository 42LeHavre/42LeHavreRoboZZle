/* piece size - adjust css if change here */
var psize = 42;

var state = 0;
var selection = "";

var cur_inst;
var cur_col;
var cur_x;
var cur_y;
var cur_a;

var cur_f;
var ip;
var run_stack;
var asked_stop;
var run_prev;

function replaceAt(str, index, character) {
  return (
    str.substr(0, index) + character + str.substr(index + character.length)
  );
}

function aff_level() {
  var i;
  var j;
  var e;
  var col;
  var board = document.getElementById("board");
  var val = parseInt(boardlevel.ftzzle);

  if (((val >> l_num) & 1) != 1) {
    window.location =
      "level" + ((l_num % 5) - l_num + Math.floor(l_num / 5) * 5 + 1) + ".html";
    return;
  }

  board.style.width = psize * l_width + "px";
  board.style.height = psize * l_height + "px";
  i = 0;
  while (i < l_height) {
    j = 0;
    while (j < l_width) {
      col = level[i][j];
      if (col != " ") {
        e = document.createElement("div");
        e.className = "piece ";
        e.style.top = 10 + psize * i + "px";
        e.style.left = 10 + psize * j + "px";
        if (col == "b" || col == "B") e.className += "blue";
        if (col == "r" || col == "R") e.className += "red";
        if (col == "g" || col == "G") e.className += "green";
        board.appendChild(e);
      }
      j++;
    }
    i++;
  }
}

function aff_stars() {
  var i;
  var j;
  var e;
  var board = document.getElementById("board");
  var val = parseInt(boardlevel.ftzzle);

  if (((val >> l_num) & 1) != 1) {
    window.location =
      "level" + ((l_num % 5) - l_num + Math.floor(l_num / 5) * 5 + 1) + ".html";
    return;
  }
  i = 0;
  while (i < l_height) {
    j = 0;
    while (j < l_width) {
      col = level[i][j];
      if (col == "B" || col == "R" || col == "G") {
        e = document.createElement("div");
        e.className = "piece star";
        e.style.top = 10 + psize * i + "px";
        e.style.left = 10 + psize * j + "px";
        e.id = "star_" + i + "_" + j;
        board.appendChild(e);
      }
      j++;
    }
    i++;
  }
}

function show_back_stars() {
  var i;
  var j;
  var col;

  i = 0;
  while (i < l_height) {
    j = 0;
    while (j < l_width) {
      col = level[i][j];
      if (col == "B" || col == "R" || col == "G") {
        document.getElementById("star_" + i + "_" + j).style.visibility =
          "visible";
      }
      j++;
    }
    i++;
  }
}

function aff_arrow() {
  var e;
  var board = document.getElementById("board");

  e = document.createElement("div");
  e.className = "piece arrow";
  e.style.top = 10 + psize * start_y + "px";
  e.style.left = 10 + psize * start_x + "px";
  e.style.transform = "rotate(" + start_a + "deg)";
  e.id = "arrow";
  board.appendChild(e);
}

function repos_arrow() {
  var e = document.getElementById("arrow");
  e.style.top = 10 + psize * cur_y + "px";
  e.style.left = 10 + psize * cur_x + "px";
  e.style.transform = "rotate(" + cur_a + "deg)";
}

function get_cmd_style(cmd) {
  if (cmd == "f") return "forward";
  if (cmd == "l") return "left";
  if (cmd == "i") return "right";
  if (cmd == "n") return "none";
  if (cmd == "r") return "red";
  if (cmd == "g") return "green";
  if (cmd == "b") return "blue";
  if (cmd >= "1" && cmd <= "5") return "f" + cmd;
}

function aff_cmd() {
  var i;
  var e;
  var cmd = document.getElementById("cmd");

  cmd.style.width = (psize + 2) * cmd_inst.length + "px";
  cmd.style.height = psize + "px";
  i = 0;
  while (i < cmd_inst.length) {
    e = document.createElement("div");
    e.className = "cmdinst " + get_cmd_style(cmd_inst[i]);
    e.style.top = "10px";
    e.style.left = 10 + (psize + 2) * i + "px";
    e.id = "cmd_" + cmd_inst[i];
    e.onclick = function () {
      cmd_click(this);
    };
    cmd.appendChild(e);
    i++;
  }
}

function cmd_click(elem) {
  var drag = document.getElementById("drag");

  if (state == 3) return;
  state = 1;
  selection = elem.id;
  drag.style.visibility = "visible";
  drag.className = "drag " + elem.className.replace("cmdinst", "");
}

function aff_inst() {
  var i;
  var j;
  var e;

  var inst = document.getElementById("inst");
  var val = parseInt(boardlevel.ftzzle);

  if (((val >> l_num) & 1) != 1) {
    window.location =
      "level" + ((l_num % 5) - l_num + Math.floor(l_num / 5) * 5 + 1) + ".html";
    return;
  }
  inst.style.height = inst_inst.length * (psize + 2) + "px";
  i = 0;
  while (i < inst_inst.length) {
    if (inst.offsetWidth < (1 + inst_inst[i].length) * (psize + 2))
      inst.style.width = (1 + inst_inst[i].length) * (psize + 2) + "px";
    e = document.createElement("div");
    e.className = "insthdr f" + (i + 1);
    e.style.top = 10 + (psize + 2) * i + "px";
    e.style.left = "10px";
    inst.appendChild(e);
    j = 0;
    while (j < inst_inst[i].length) {
      e = document.createElement("div");
      e.className = "instinst ";
      e.style.top = 10 + (psize + 2) * i + "px";
      e.style.left = 50 + (psize + 2) * j + "px";
      e.id = "inst_" + i + "_" + j;
      e.onclick = function () {
        inst_click(this);
      };
      inst.appendChild(e);
      j++;
    }
    i++;
  }
  document.getElementById("inst_bt").style.width =
    inst.offsetWidth + 100 + "px";
}

function get_inst_pos(e) {
  var i;
  var j;
  i = 0;
  while (i < inst_inst.length) {
    j = 0;
    while (j < inst_inst[i].length) {
      if ("inst_" + i + "_" + j == e.id) return [i, j];
      j++;
    }
    i++;
  }
  return [-1, -1];
}

function get_css_cmd(name) {
  if (name == "f") return "forward";
  if (name == "l") return "left";
  if (name == "i") return "right";
  if (name == "1") return "f1";
  if (name == "2") return "f2";
  if (name == "3") return "f3";
  if (name == "4") return "f4";
  if (name == "5") return "f5";
  return "empty";
}
function get_css_col(name) {
  if (name == "r") return "red";
  if (name == "g") return "green";
  if (name == "b") return "blue";
  return "none";
}

var boardlevel = sessionStorage;

function inst_click(e) {
  var pos;
  var pos2;
  var col;
  var cmd;
  var drag = document.getElementById("drag");

  pos = get_inst_pos(e);
  col = cur_col[pos[0]].charAt(pos[1]);
  cmd = cur_inst[pos[0]].charAt(pos[1]);
  if (state == 0) {
    state = 2; // mean to del or move
    selection = e;
    drag.style.visibility = "visible";
    drag.className = "drag " + e.className.replace("instinst", "");
    return;
  }
  if (state == 1) {
    if (selection == "cmd_f") cmd = "f";
    if (selection == "cmd_l") cmd = "l";
    if (selection == "cmd_i") cmd = "i";
    if (selection == "cmd_1") cmd = "1";
    if (selection == "cmd_2") cmd = "2";
    if (selection == "cmd_3") cmd = "3";
    if (selection == "cmd_4") cmd = "4";
    if (selection == "cmd_5") cmd = "5";
    if (selection == "cmd_n") col = "n";
    if (selection == "cmd_r") col = "r";
    if (selection == "cmd_g") col = "g";
    if (selection == "cmd_b") col = "b";
    //    alert("inst "+e.id+" pos "+pos[0]+" "+pos[1]+"  col '"+col+"'  cmd '"+cmd+"'  #"+cur_inst+"#");

    e.className = "instinst " + get_css_cmd(cmd) + " " + get_css_col(col);
    cur_inst[pos[0]] = replaceAt(cur_inst[pos[0]], pos[1], cmd);
    cur_col[pos[0]] = replaceAt(cur_col[pos[0]], pos[1], col);
    // alert("post inst : %"+cur_inst[pos[0]]+"%,  post col %"+cur_col[pos[0]]+"%");
    state = 0;
    drag.style.visibility = "hidden";
    return;
  }
  if (state == 2) {
    selection.className = "instinst";
    pos2 = get_inst_pos(selection);
    cmd = cur_inst[pos2[0]].charAt(pos2[1]);
    col = cur_col[pos2[0]].charAt(pos2[1]);
    cur_inst[pos2[0]] = replaceAt(cur_inst[pos2[0]], pos2[1], " ");
    cur_col[pos2[0]] = replaceAt(cur_col[pos2[0]], pos2[1], " ");

    e.className = "instinst " + get_css_cmd(cmd) + " " + get_css_col(col);
    cur_inst[pos[0]] = replaceAt(cur_inst[pos[0]], pos[1], cmd);
    cur_col[pos[0]] = replaceAt(cur_col[pos[0]], pos[1], col);

    state = 0;
    drag.style.visibility = "hidden";
    return;
  }
}

function deal_body_event(e) {
  if (e.target != document.body) return;
  if (state == 2) {
    selection.className = "instinst";
    state = 0;
    pos = get_inst_pos(selection);
    cur_inst[pos[0]] = replaceAt(cur_inst[pos[0]], pos[1], " ");
    cur_col[pos[0]] = replaceAt(cur_col[pos[0]], pos[1], " ");
    document.getElementById("drag").style.visibility = "hidden";
  }
  if (state == 1) {
    state = 0;
    document.getElementById("drag").style.visibility = "hidden";
  }
}

function win() {
  var i;
  var j;
  var col;

  total = 0;
  i = 0;
  while (i < l_height) {
    j = 0;
    while (j < l_width) {
      col = level[i][j];
      if (col == "B" || col == "R" || col == "G") {
        e = document.getElementById("star_" + i + "_" + j);
        if (i == cur_y && j == cur_x) e.style.visibility = "hidden";
        if (e.style.visibility != "hidden") total++;
      }
      j++;
    }
    i++;
  }
  if (total != 0) return 0;
  var val = parseInt(boardlevel.ftzzle);
  if (((val >> (l_num + 1)) & 1) != 1) val += 1 << (l_num + 1);
  boardlevel.ftzzle = val;
  if (l_num >= 3) send_info(1);
  return 1;
}

function my_alert_close() {
  var elm = document.getElementById("alert");
  elm.style.display = "none";
}

function my_alert(msg, bt1, action1, bt2, action2) {
  var elm = document.getElementById("alert_msg");
  elm.innerHTML = msg;
  elm = document.getElementById("alert_btn");
  var strbt = "";
  if (bt1 != null && bt1.length > 0)
    strbt =
      "<input type=button onclick='my_alert_close(); " +
      action1 +
      "' value='" +
      bt1 +
      "'>";
  if (bt2 != null && bt2.length > 0)
    strbt =
      strbt +
      "&nbsp;&nbsp;<input type=button onclick='my_alert_close(); " +
      action2 +
      "' value='" +
      bt2 +
      "'>";
  elm.innerHTML = strbt;
  elm = document.getElementById("alert");
  elm.style.display = "block";
  return 0;
}

function run_stop() {
  cur_x = start_x;
  cur_y = start_y;
  cur_a = start_a;
  repos_arrow();
  show_back_stars();
  state = 0;
  run_prev.style.border = "1px solid #222";
  document.getElementById("bt_go").innerHTML = config_msg[5]; // "Go !"
}

function run_next() {
  var ret;
  var col;

  //    alert("step");
  if (asked_stop) return run_stop();
  run_prev.style.border = "1px solid #222";
  run_prev = document.getElementById("inst_" + cur_f + "_" + ip);
  run_prev.style.border = "2px solid yellow";
  col = level[cur_y].charAt(cur_x).toLowerCase();
  if (
    cur_col[cur_f].charAt(ip) == " " ||
    cur_col[cur_f].charAt(ip) == "n" ||
    cur_col[cur_f].charAt(ip) == col
  ) {
    if (cur_inst[cur_f].charAt(ip) == "l") {
      cur_a = (cur_a + 270) % 360;
      repos_arrow();
    }
    if (cur_inst[cur_f].charAt(ip) == "i") {
      cur_a = (cur_a + 90) % 360;
      repos_arrow();
    }
    if (cur_inst[cur_f].charAt(ip) == "f") {
      if (cur_a == 0) cur_x++;
      if (cur_a == 90) cur_y++;
      if (cur_a == 180) cur_x--;
      if (cur_a == 270) cur_y--;
      repos_arrow(); // assume not out because of borders in level description
      if (
        cur_x < 0 ||
        cur_x >= level[0].length ||
        cur_y < 0 ||
        cur_y >= level.level ||
        level[cur_y].charAt(cur_x) == " "
      ) {
        my_alert(config_msg[14], config_msg[4], "run_stop();");
        return;
      } // out of board
      if (win()) {
        if (l_num < 3)
          my_alert(
            config_msg[15],
            config_msg[9],
            "run_stop();",
            config_msg[4],
            'window.location="level' + (l_num + 1) + '.html"'
          ); // next level
        else my_alert(config_msg[16], config_msg[4], "run_stop();"); // all level done
        return;
      }
    }
    if (
      cur_inst[cur_f].charAt(ip) >= "1" &&
      cur_inst[cur_f].charAt(ip) <= "5"
    ) {
      run_stack.push(cur_f);
      run_stack.push(ip + 1);
      cur_f = cur_inst[cur_f].charAt(ip) - 1;
      ip = 0;
      setTimeout(run_next, 0);
      return;
    }
  }
  ip++;
  while (ip >= cur_inst[cur_f].length) {
    if (run_stack.length > 0) {
      ip = run_stack.pop();
      cur_f = run_stack.pop();
    } else return my_alert(config_msg[13], config_msg[4], "run_stop();"); // end of program reached
  }
  setTimeout(run_next, document.getElementById("speed").value);
}

function launch() {
  var val = parseInt(boardlevel.ftzzle);

  if (((val >> l_num) & 1) != 1) {
    window.location =
      "level" + ((l_num % 5) - l_num + Math.floor(l_num / 5) * 5 + 1) + ".html";
    return;
  }
  if (state == 3) asked_stop = 1;
  if (state == 0) {
    state = 3;
    cur_x = start_x;
    cur_y = start_y;
    cur_a = start_a;
    cur_f = 0;
    ip = 0;
    asked_stop = 0;
    run_prev = document.getElementById("inst_0_0");
    run_stack = new Array();
    setTimeout(run_next, 0);
    document.getElementById("bt_go").innerHTML = config_msg[11]; // "Stop"
  }
}

function send_info_get(game_win) {
  var formData, win;

  var xmlHttp = new XMLHttpRequest();

  win = game_win ? "END_GAME" : l_num;

  formData =
    boardlevel.ftz_nom +
    "/" +
    boardlevel.ftz_prenom +
    "/" +
    win +
    "/" +
    boardlevel.ftzzle;
  url = config_send_url + formData;
  xmlHttp.open("GET", url);
  xmlHttp.send();
}

function send_info_post(game_win) {
  var xhr, formData, req_done;

  req_done = 0;
  xhr = new XMLHttpRequest();
  xhr.open("POST", config_send_url);
  xhr.onload = function () {
    if (xhr.status != 200)
      my_alert(
        config_msg[10] + " (code " + xhr.status + ")",
        config_msg[4],
        ""
      );
    req_done = 1;
  };

  formData = new FormData();
  formData.append("name", boardlevel.ftz_nom);
  formData.append("firstname", boardlevel.ftz_prenom);
  if (game_win) formData.append("level", "END_GAME");
  else formData.append("level", l_num);
  formData.append("code", boardlevel.ftzzle);
  xhr.send(formData);
  var xhrTimeout = setTimeout(function () {
    if (req_done == 0) {
      xhr.abort();
      my_alert(config_msg[10] + " (timeout)", config_msg[4], "");
    }
  }, 10000);
}

function send_info(game_win) {
  if (config_send_result != 1) return;

  if (config_send_method == "POST") send_info_post(game_win);
  if (config_send_method == "GET") send_info_get(game_win);
}

function start() {
  var val = parseInt(boardlevel.ftzzle);
  if (((val >> l_num) & 1) != 1) {
    window.location =
      "level" + ((l_num % 5) - l_num + Math.floor(l_num / 5) * 5 + 1) + ".html";
    return;
  }

  if (config_bkg != "")
    document.getElementById("board").style.background =
      "url('" +
      config_bkg +
      "') center center / contain no-repeat, rgba(170,170,170,1)";

  aff_level();
  aff_stars();
  aff_arrow();
  aff_cmd();
  aff_inst();
  cur_inst = inst_inst.slice(0);
  cur_col = inst_inst.slice(0);
  document.body.onclick = function (e) {
    deal_body_event(e);
  };
  document.body.onmousemove = function (e) {
    var d = document.getElementById("drag");
    d.style.top = e.clientY - 20 + "px";
    d.style.left = e.clientX - 20 + "px";
  };
  send_info(0);
}

function do_reset() {
  window.location = "reset.html";
}

function fillb() {
  return (
    '<div class="container" id="container"> \
			<div class="drag" id="drag"></div> \
            <div class="board" id="board"> </div>  <br /> \
            <div class="cmd" id="cmd"> </div>   <br />	\
            <div class="inst_bt" id="inst_bt">		\
             <div class="inst" id="inst"> </div>	\
             <div class="inst" style="width:42px;height:42px;cursor:pointer;display:table;" onclick="launch();"><div id="bt_go" class="ftd"> ' +
    config_msg[5] +
    ' </div></div> \
             <br /><div class="speed">' +
    config_msg[6] +
    ' <input type="range" id="speed" min="50" max="500" step="50"> ' +
    config_msg[7] +
    '</div>\
            </div>\
            <div class="footer rst" onclick="my_alert(\'' +
    config_msg[8] +
    "', '" +
    config_msg[9] +
    "', '', '" +
    config_msg[4] +
    "', 'do_reset();');\"><div class=\"ftd\">" +
    config_msg[12] +
    '</div></div> \
            <div class="footer lvl"><div class="ftd">Level ' +
    l_num +
    '</div></div> \
            <div id="alert" class="alert"> \
               <div class=alert_box> \
                  <div class=alert_box_row> <div class=alert_box_cell id=alert_msg></div></div> \
                  <div class=alert_box_row> <div class=alert_box_cell id=alert_btn></div></div> \
              </div> \
            </div></div>'
  );
}
