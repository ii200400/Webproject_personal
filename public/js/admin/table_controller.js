var rows = document.getElementsByClassName("consult");

var detail_page = function(){
  location.href = "/admin/consult_detail";
};
for (var i = 0; i < rows.length; i++) {
  rows[i].addEventListener("click", detail_page, false);
}
