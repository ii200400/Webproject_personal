var rows = document.getElementsByClassName("consult");

function detail_page(self){
  location.href = "/admin/menu/consulting/" + (i - self.rowIndex);
};
for (var i = 0; i < rows.length; i++) {
  console.log(i);
  rows[i].addEventListener("click", function(){detail_page(this)}, false);
}
