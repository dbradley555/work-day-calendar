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

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  saveBtn.click(addToLocalStorage);

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  updateClock();
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  pullFromLocalStorage();
  // TODO: Add code to display the current date in the header of the page.
  showCurrentDate();
});

function showCurrentDate() {
  let currentDate = dayjs().format('dddd MMMM D, YYYY');
  currentDay.text(currentDate);
}

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

function pullFromLocalStorage() {
  let storedTextAreaContent = JSON.parse(
    localStorage.getItem('textAreaContent')
  );

  textAreaContent = storedTextAreaContent;

  renderTextAreaContent();
}

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
