// Config file - modif infos here

// Container configuration is : config_ask_name=1; config_send_result=1; config_send_method=POST; config_send_url=/cgi/rcv.cgi

// config_ask_name : set to 0 or 1.  If result sent to server, this should be set to 1
var config_ask_name = 0;

// config_send_result : set to 0 or 1
var config_send_result = 0;

//config_send_method : set to POST or GET
var config_send_method = "POST";

// config_send_url : eg.  /cgi/rcv.cgi  Only used when config_send_result is set to 1
var config_send_url = "/cgi/rcv.cgi";

// config_bkg : optional image of level background for branding  eg: img/logo_oecd.png
//var config_bkg = "img/logo_bnp.png";
var config_bkg = "";

// config_msg : set to one of the following message tab according to language
// available : lang_msg_fr  lang_msg_en
var config_msg = lang_msg_fr;
