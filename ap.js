

const replaceDict = {
    "KEKW": "img/KEKW.jpg",
    "peepoHappy": "img/peepoHappy.png",
    "kappa": "img/kappa.png",
    "spurdo": "img/spurdo.png"
};

$.each(replaceDict, function(key, value) {
    var emoteList = "<div class='emote'><img src='" + value +  "' height='25px' alt=" + key +"></div>";
    $("#emotes-dialog").append(emoteList);
});


$("#bottom-popup").click(function() {
      $("#message-box").scrollTop($("#message-box").prop("scrollHeight"));
      $('#bottom-popup').fadeOut();
    });

    $('img').click(function() {
    var alt = $(this).attr('alt');
    var oldText = $('#text-input').val();
    $('#text-input').val(oldText + " " + alt);
    
  });




const settingsButton = document.getElementById("settings-button");
      const settingsDialog = document.getElementById("settings-dialog");
      const closeButton = document.getElementById("close-btn");


     






      // Obsługa zdarzenia kliknięcia przycisku "Ustawienia"
      
     
      settingsButton.addEventListener("click", function () {

        let settingsWindow = $('#settings-dialog').css('display');

       
        
        if(settingsWindow == 'none'){
          settingsDialog.style.display = "block";
        }else{
          settingsDialog.style.display = "none";
        }
      });

      


      // Obsługa zdarzenia kliknięcia przycisku "Zamknij"
      closeButton.addEventListener("click", function () {
        settingsDialog.style.display = "none";
      });


$("#emotes-button").click(function(){
  let emotesDialogVis = $('#emotes-dialog').css('display');

  if(emotesDialogVis == 'none'){
      $('#emotes-dialog').css('display', 'block');
        }else{
          $('#emotes-dialog').css('display', 'none');
        }

  




})







const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const colorPicker = document.getElementById("color-picker");
const nicknameInput = document.getElementById("nick");
const submitButton = document.getElementById("sett-button");

submitButton.addEventListener("click", () => {
  const color = colorPicker.value;
  const nickname = nicknameInput.value;
  setCookie("color", color, 365);
  setCookie("nick", nickname, 365);
  settingsDialog.style.display = "none";

});




// sprawdzenie, czy ciasteczko "color" istnieje
if (document.cookie.split(';').some((item) => item.trim().startsWith('color='))) {
  // pobranie wartości ciasteczka "color"
  const colorValue = document.cookie.split(';').find((item) => item.trim().startsWith('color=')).split('=')[1];
  // przypisanie wartości do color picker
  colorPicker.value = colorValue;
}

// sprawdzenie, czy ciasteczko "nick" istnieje
if (document.cookie.split(';').some((item) => item.trim().startsWith('nick='))) {
  // pobranie wartości ciasteczka "nick"
  const nickValue = document.cookie.split(';').find((item) => item.trim().startsWith('nick=')).split('=')[1];
  // przypisanie wartości do text input
  nicknameInput.value = nickValue;
}





// wybieramy formularz i nasłuchujemy na jego zdarzenie submit
document.getElementById("myForm").addEventListener("submit", function(event) {
  // blokujemy domyślne zachowanie formularza
  event.preventDefault();
  
  // pobieramy dane z formularza
  var formData = new FormData(event.target);
  const input = document.querySelector('input[type="text"]');
  // wysyłamy dane do serwera za pomocą AJAX
  
  if (input.value.trim() !== '') {

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "save_message.php");
  
  xhr.send(formData);
  
  // czyszczenie pola input po wysłaniu wiadomości
  event.target.reset();
  }

});



    var limit = 15;     
    var offset = 0;
    var firstLoad = true;
    var LastId;

function loadMessages(limit, offset){
  $.ajax({
            url: 'pobierz_dane.php', 
            type: 'POST',
            data: {limit: limit, offset: offset},
            dataType: 'json',
            success: function(response) {
              console.log(response);
              
              
                var len = response.length;
                

                for(var i=0; i<len; i++) {
                    var id = response[i].id;
                    var nick = response[i].nick;
                    var message = response[i].message;
                    var color = response[i].color
                    var html = messageStyle(color, nick, message); 
                    $('#message-box').prepend(html);         
                    if(firstLoad == true){
                      firstLoad = false;
                      LastId = id;
                      
                }
                
             
                

                    }
      
            }
        });
             
    }

    
loadMessages(limit, offset);



$(document).ready(function(){
  $('#message-box').scroll(function(){
    if ($(this).scrollTop() == 0) {
      var scrollPos = $(this).outerHeight(true);
      offset += 15;
      loadMessages(limit,offset);
      $("#message-box").scrollTop($("#message-box").scrollTop() + scrollPos);

    }
  });
});



 function UpdateChat(){
  $.ajax({
            url: 'Update_chat.php', 
            type: 'POST',
            data: {LastId: LastId},
            dataType: 'json',
            success: function(response) {
              console.log(response);
              
              
                var newmessagelen = response.length;
                
                

                for(var i=0; i< newmessagelen; i++) {
                  LastId++;
                  offset++;
                  var id = response[i].id;
                    
                    var scrollBottom = isScrollBottom();
                    var nick = response[i].nick;
                    var message = response[i].message;
                    var color = response[i].color
                    var html = messageStyle(color, nick, message); 
                    $('#message-box').append(html);

                    if(scrollBottom == true){
                      $('#message-box').scrollTop($('#message-box').prop('scrollHeight'));

                    }else{
                      $('#bottom-popup').html('<p>Nowe wiadomości</p>').fadeIn();
                    }
                  
                }
                
             
                
                  
              }
          });
               
      }

setInterval(UpdateChat, 1000);

function messageStyle(color, nick, message){

  
    for (const [key, value] of Object.entries(replaceDict)) {
    message = message.replace(new RegExp(key, "g"), `<img src="${value}" height="25" alt="${key}">`);
    }

  var html = "<div style='max-width: 300px; word-wrap: break-word;'><span style='color:" + color + "';><b>" + nick + "</b>:</span> " + message + "</div>";
    
  return html;
}
function newMessageScroll(){


}

function isScrollBottom() {
  const $element = $('#message-box'); 
  const elementHeight = $element.outerHeight();
  const scrollHeight = $element[0].scrollHeight;
  const scrollTop = $element.scrollTop();

  if (scrollTop + elementHeight >= scrollHeight) {
    return true;
  } else {
    return false;
  }
}
