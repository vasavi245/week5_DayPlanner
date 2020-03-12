//global variables
var m = moment();
var newDay = moment().hour(0);
var currentTime = m.hour();

function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (value) {
      $(`#text${key}`).text(value);
  }
}

$( document ).ready(function() {
  // adding clock to currentDay id
function clock() {
  var dateString = moment().format('MMMM Do YYYY, h:mm:ss a');
  $('#currentDay').html(dateString);
}

setInterval(clock, 1000);

  for (let hour = 9; hour < 18; hour++) {
    $('.container').append(`<div class='row time-block' data-time='${hour}'>
      
           <div class='col-sm col-md-2 hour'>
             <p>${formatAMPM(hour)}</p>
           </div>
  
           <div class='col-sm col-md-10 d-flex'>
              <div class='input-group'>
                <textarea class="form-control description" id=text${hour}></textarea>
                <div class='input-group-append'>
                  <button class='saveBtn d-flex justify-center align-center' id=${hour}>
                    <i class='far fa-save fa-2x save-icon'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`);
  
     

      getLocalStorage(hour);
  }

  function formatAMPM(hours) {
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ampm;
}
formatAMPM();

//Checking time to determine present, past, or future
$.each($('.time-block'), function(index, value) {
  let dateHour = $(value).attr('data-time');
  if (Number(dateHour) === m.hour()) {
    $(this).find('textarea').addClass('present');
  } else if (Number(dateHour) < m.hour()) {
    $(this).find('textarea').addClass('past').attr('disabled', 'disabled');
    $(this).find('.saveBtn').addClass('disabled').attr('disabled', true);
  } else {
    $(this).find('textarea').addClass('future');
  }
});

console.log(currentTime);

if (currentTime >=0 && currentTime < 9){
  localStorage.clear();
}


var saveBtn = $('.saveBtn');
saveBtn.on('click', function(event){
    event.preventDefault();
    let eventId = $(this).attr('id');
    let eventText =$(this).siblings(".description").val();
    localStorage.setItem(eventId, eventText);
});});

