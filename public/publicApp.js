$(document).ready(function() {
  M.updateTextFields();
  
  $.ajax({
    method: "GET",
    url: "api/scrape"
  })
});

$('#textarea1').val('New Text');
  M.textareaAutoResize($('#textarea1'));

$("#get").hide();

var currentUser = {};

$("#formSubmitBtn").on("click", function(event) {
  event.preventDefault();

 
 
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/api/submit",
    data: {
      username: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val()
    }
  }).then(function(){
    currentUserFunk($("#username").val());
    $('#formContainer').hide();
    $("#get").show();
    setTimeout(function(){ console.log(currentUser) }, 3000);
  });
});


$("#get").on("click", function(event) {
  event.preventDefault();
  // Do an api call to the back end for json with all animals sorted by weight
  $.getJSON("/api/articles", function(data) {
    console.log(data);
    for (let x = 0; x < data.length; x++) {
      if (data[x].teaser === '') {
        data[x].teaser = '...';
      }
      let newDiv = `<div><h4>${data[x].title}</h4><br/><p>${data[x].teaser}</p><br/><p><a href='${data[x].link}'>Link</a></p></div>`;
      $("#insert").append(newDiv);
      $("#insert").append(`<div class="row">
                            <form class="col s12">
                              <div class="row">
                                <div class="input-field col s12">
                                  <textarea id="${data[x]._id}TA" class="materialize-textarea"></textarea>
                                  <label for="${data[x]._id}TA">Textarea</label>
                                </div>
                              </div>
                            </form>
                          </div>`);
      $("#insert").append(`<button class="saveBtn" id="${data[x]._id}">Save</button>`)
    }
  });
});

$(document).on("click", ".saveBtn", function(event) {
  event.preventDefault();
  const articleID = $(this).attr("id");
  const commentData = ($('#' + articleID + 'TA').val().trim());
  // $.getJSON("/api/articles/:id", function())
});

function currentUserFunk(user) {
  $.getJSON("/api/current/" + user)
  .then(function(data) {
    currentUser = data;
  });
};

console.log("JS file loaded");