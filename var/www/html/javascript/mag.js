chords = []

$(function () {
  const addChord = $("#addChord");
  const addButton = $("#addBtn");
  const removeButton = $("#removeBtn");
  const submitButton = $("#melodyBtn");

  addButton.click(function() {
    addChord.append($(".d-none").clone().removeClass('d-none').addClass('inUse'));
  });

  removeButton.click(function() {
    $("#addChord .inUse").last().remove();
  });

  submitButton.click(function() {
    $(".chordGroup").each(function(index, obj) {
      chords.push($(this).find('.chordName').find('.btn').text() + $(this).find('.chordMod').find('.btn').text());
    });

    document.getElementById("musicFrame").innerHTML = "<img id=\"loading\" src=\"assets/loading.gif\" alt=\"Loading...\"></img>";
    chords.shift()
    console.log(chords);
    makeMelody(chords);
    chords.length = 0;
  });

  $("#addChord").on('click', '.dropdown-item', function() {
    $(this).closest('.dropdown').find('.btn').text($(this).text())
  })

});

function makeMelody(chords) {
  const http = new XMLHttpRequest();
  const url = '/API/test/';
  let encoded = encodeURI((chords).join(" "));
  http.open("GET", url + encoded, true);
  http.setRequestHeader( "Content-Type", "application/json" );
  http.send();

  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("filename").innerHTML = http.responseText;
      document.getElementById("filename").href = '/midi/' + http.responseText;
      document.getElementById("musicFrame").innerHTML = "<iframe src=\"http://docs.google.com/gview?url=http://lfreeze.ml/pdf/"+ http.responseText.replace("mid", "pdf") +"&embedded=true\" style=\"width:100%; height:500px;\" frameborder=\"0\"></iframe>"
    }
  }
}

