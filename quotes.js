let quoteData;
let windowWidth;
let currentColor;
const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

function getQuotes() {
  return $.ajax({
    headers: {
      accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (json) {
      if (typeof json == 'string') {
        quoteData = JSON.parse(json);
      }
    }
  });
}

function getRandomQuote() {
  return quoteData.quotes[Math.floor(Math.random() * quoteData.quotes.length)];
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function updateQuote() {
  let { quote, author } = getRandomQuote();
  
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
      encodeURIComponent('"' + quote + '" ' + author)
  );
  
  $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' +
      encodeURIComponent(author) +
      '&content=' +
      encodeURIComponent(quote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );
  
  $('#quote-text').animate({ opacity: 0 }, 500, function() {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(quote);
  });
    
  $('#quote-author').animate({ opacity: 0 }, 500, function() {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').text(author);
  });
  
  currentColor = getRandomColor();

  if (windowWidth >= 600) {
    $('body').animate({ backgroundColor: currentColor, color: currentColor }, 1000);
    $('.button').animate({ backgroundColor: currentColor }, 1000);
  } else {
    $('body').animate({ backgroundColor: currentColor }, 1000);
    $('.button').animate({ color: currentColor }, 1000);
  }
}

$(() => {
  getQuotes().then(() => {
    windowWidth = window.innerWidth;
    updateQuote();
  });
  
  $('#new-quote').on('click', updateQuote);
  $(window).on('resize', () => {
    if (windowWidth < 600 && window.innerWidth >= 600) {
      $('body').css({ color: currentColor });
      $('.button').css({ backgroundColor: currentColor, color: '#fff' });
    } else if (window.innerWidth < 600) {
      $('body').css({ color: '#fff' });
      $('.button').css({ backgroundColor: '#fff', color: currentColor });
    }
    windowWidth = window.innerWidth;
  });
});