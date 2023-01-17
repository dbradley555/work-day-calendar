// defining variables for elements

const currentDay = $('#currentDay');
const hourNineInput = $('#hour-9-input');
const hourTenInput = $('#hour-10-input');
const hourElevenInput = $('#hour-11-input');
const hourTwelveInput = $('#hour-12-input');
const hourThirteenInput = $('#hour-13-input');
const hourFourteenInput = $('#hour-14-input');
const hourFifteenInput = $('#hour-15-input');
const hourSixteenInput = $('#hour-16-input');
const hourSeventeenInput = $('#hour-17-input');
const saveBtn = $('.saveBtn');

// define object for text content
let textAreaContent = {
  nineAM: '',
  tenAM: '',
  elevenAM: '',
  twelvePM: '',
  onePM: '',
  twoPM: '',
  threePM: '',
  fourPM: '',
  fivePM: '',
};

// function being called at page load
$(function () {
  saveBtn.click(addToLocalStorage);
  updateClock();
  pullFromLocalStorage();
  showCurrentDate();
});

// function to show date in specific format in title
function showCurrentDate() {
  let currentDate = dayjs().format('dddd MMMM D, YYYY');
  currentDay.text(currentDate);
}

// function to update the styles depending on time
function updateClock() {
  // set variable to dayjs hour
  let clockHour = dayjs().format('HH');
  // convert hour string to number
  let clockHourNumber = parseInt(clockHour);
  //  set variable for id of specific hour
  let i = 0;

  while (i < 23) {
    let clockHourID = `hour-${i}`;
    let clockHourEl = $(`#${clockHourID}`);
    if (i < clockHourNumber) {
      // if hour time block is < x , set time block to past style
      clockHourEl.addClass('past');
    }
    // if hour time block is > x , set time block to future style
    else if (i > clockHourNumber) {
      clockHourEl.addClass('future');
    }
    // if hour number = x , set x time block to present style
    else {
      clockHourEl.addClass('present');
    }
    i++;
  }
  // update every second
  setTimeout(updateClock, 1000);
}

// function to add text to local storage when clicking save
function addToLocalStorage() {
  let textAreaContent = {
    nineAM: hourNineInput.val(),
    tenAM: hourTenInput.val(),
    elevenAM: hourElevenInput.val(),
    twelvePM: hourTwelveInput.val(),
    onePM: hourThirteenInput.val(),
    twoPM: hourFourteenInput.val(),
    threePM: hourFifteenInput.val(),
    fourPM: hourSixteenInput.val(),
    fivePM: hourSeventeenInput.val(),
  };
  localStorage.setItem('textAreaContent', JSON.stringify(textAreaContent));
}

// function to pull from local storage on page load any previous input
function pullFromLocalStorage() {
  let storedTextAreaContent = JSON.parse(
    localStorage.getItem('textAreaContent')
  );

  textAreaContent = storedTextAreaContent;

  renderTextAreaContent();
}

// set the saved text content to the calendar values upon load
function renderTextAreaContent() {
  hourNineInput.text(textAreaContent.nineAM);
  hourTenInput.text(textAreaContent.tenAM);
  hourElevenInput.text(textAreaContent.elevenAM);
  hourTwelveInput.text(textAreaContent.twelvePM);
  hourThirteenInput.text(textAreaContent.onePM);
  hourFourteenInput.text(textAreaContent.twoPM);
  hourFifteenInput.text(textAreaContent.threePM);
  hourSixteenInput.text(textAreaContent.fourPM);
  hourSeventeenInput.text(textAreaContent.fivePM);
}
