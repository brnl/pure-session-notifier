console.log("################################")
console.log("   START BM_SESSION_VALIDATOR   ")
console.log("################################")

function bmsv_checkSession() {
  // Retrieve the token value from the HTML input element
  var bmsv_token = document.getElementsByName('__RequestVerificationToken')[0].value;

  // Create an instance of XMLHttpRequest
  var bmsv_xhr = new XMLHttpRequest();
  bmsv_xhr.open("GET", '/api/session/poll', true);

  // Set the __RequestVerificationToken header
  bmsv_xhr.setRequestHeader('__RequestVerificationToken', bmsv_token);

  // Define the callback function to handle the response
  bmsv_xhr.onreadystatechange = function() {
      if (bmsv_xhr.readyState == 4) {
          var bmsv_statusMessage = '';
          if (bmsv_xhr.status == 200 && bmsv_xhr.responseText === 'true') {
              // Emoticon for 'ok'
              bmsv_statusMessage = '<span style="color: green">session: ✅</span>';
              console.log('BM Session OK');
          } else {
              // Emoticon for 'x'
              bmsv_statusMessage = '<span style="color: red">session: ❌</span>';
              console.log('BM Session Failed:', bmsv_xhr.statusText);
          }

          // Find the flags ul element
          var bmsv_flagsUl = document.querySelector('.right .links.flags');

          // Create or update the status message element
          var bmsv_statusElement = document.getElementById('bmsv_sessionStatus');
          if (!bmsv_statusElement) {
              bmsv_statusElement = document.createElement('li');
              bmsv_statusElement.id = 'bmsv_sessionStatus';
              bmsv_statusElement.style.paddingRight = "15px"
              bmsv_flagsUl.insertBefore(bmsv_statusElement, bmsv_flagsUl.firstChild);
          }
          bmsv_statusElement.innerHTML = bmsv_statusMessage;
      }
  };

  bmsv_xhr.send();
}

// Run the bmsv_checkSession function every 10 seconds
setInterval(bmsv_checkSession, 10000);

// Run initially to set the status right away
bmsv_checkSession();

console.log("##############################")
console.log("   END BM_SESSION_VALIDATOR   ")
console.log("##############################")
