var consults = document.getElementsByClassName("consult");

function detail_page(self){
  location.href = "/admin/menu/consulting/" + (consults.length - self.rowIndex);
};
for (var i = 0; i < consults.length; i++) {
  consults[i].addEventListener("click", function(){detail_page(this)}, false);
}

var notices = document.getElementsByClassName("notice");

function detail_page_notice(self){
  location.href = "/admin/menu/noticetable/" + (notices.length - self.rowIndex);
};
for (var i = 0; i < notices.length; i++) {
  notices[i].addEventListener("click", function(){detail_page_notice(this)}, false);
}

var user_notices = document.getElementsByClassName("user_notice");

function detail_user_notice(self){
  location.href = "/notice/" + (user_notices.length - self.rowIndex);
};
for (var i = 0; i < user_notices.length; i++) {
  user_notices[i].addEventListener("click", function(){detail_user_notice(this)}, false);
}
