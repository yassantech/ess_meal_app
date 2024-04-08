// const signupButton = document.getElementById('signup-button'),
// loginButton = document.getElementById('login-button'),
// userForms = document.getElementById('user_options-forms')

// /**
// * Add event listener to the "Sign Up" button
// */
// signupButton.addEventListener('click', () => {
// userForms.classList.remove('bounceRight')
// userForms.classList.add('bounceLeft')
// }, false)

// /**
// * Add event listener to the "Login" button
// */
// loginButton.addEventListener('click', () => {
// userForms.classList.remove('bounceLeft')
// userForms.classList.add('bounceRight')
// }, false)



// const stripe = Stripe('pk_test_51LcU7wCx6tTJLllEOgkJxPeNIrOLFy4i2cnKYT6SEeYuRvG5rDadENAAIPREeXbNAik0Cwj6L3v65HLfbf714yag00FWrYTHxN');
// const elements = stripe.elements({
//     mode: 'payment',
//     currency: 'usd',
//     amount: 1099,
// });

// const card = elements.create('card');
// card.mount('#card-element');

// const form = document.getElementById('payment-form');

// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   stripe.createToken(card).then(function(result) {
//     if (result.error) {
//       const errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send token to your server to process payment.
//       fetch('/charge', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({token: result.token.id})
//       })
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(data) {
//         console.log(data);
//         // Handle server response here
//       });
//     }
//   });
// });


// primary_key = '966873d1c6e14865b9d5311c844a210d'
// secondary_key = '49f367f646604ea19f0715b78478eec3'



function validateForm(event) {
  event.preventDefault();
  var username = document.getElementById("parmentName").value;
  if (username == "") {
      alert("Please enter your username");
      return false;
  }
  return displayModal()
}

function displayModal() {
  var username = document.getElementById("parmentName").value;
  document.getElementById("modalUsername").innerHTML = username;
  document.getElementById("paymentModal").style.display = "block";
}

function submitPayment() {
  const paymentAmount = document.getElementById("totalAmountToBePaid").value;
  const username = "42a15ed7-ee5b-4e3b-aea1-1075cb644201";
  const password = "e3a7fbbdd1ce4dd69377290566bbb656"; 
  const authorizationToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjQyYTE1ZWQ3LWVlNWItNGUzYi1hZWExLTEwNzVjYjY0NDIwMSIsImV4cGlyZXMiOiIyMDI0LTA0LTA1VDE3OjAzOjAzLjA2NCIsInNlc3Npb25JZCI6ImNhMzZmMDdmLTc1YmYtNGRiOS1iYzQ0LWU0ZjEyMjYwOGNlNiJ9.NGKkiMGnt2dnuOKG0Jqs1Pdl_diYnxXIqsrgxbW8y9rFs1HO7nUrOYVSUDNnU5oTPZDo55RmFRsZLKBtlxh_aJ5QZZks3XEhGAXKG5OtOeMc3AKEeS6cCP3GwjN182r9b-DVOXz48gOyP4SO4WH53i3NBwgXFeY8mQAd3Ryr9RxhCanJ5NTHYD1HiPmBCK9joWllaEUxKYzQPUfSUgu21IU1F9Acm4ets4jX9Uwo5dCOCMxLJcOFpOcK79hz0cRJzEEWmeVq5l3scM039mku-kMBr4CEy3meSupk6jexfs1bO0rtS15YSlbXjVEdXseP5GCJGT8U0WTLiaN9p-pP4Q";

  const requestBody = {
    "amount": paymentAmount,
    "currency": "EUR",
    "externalId": "097411065",
    "payer": {
    "partyIdType": "MSISDN",
    "partyId": "260962217114"
    },
    "payerMessage": "Meal Subscription",
    "payeeNote": "Pay to Subscribe To the selected Meal"
  }

  fetch('https://sandbox.momodeveloper.mtn.com/collection/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'b44728c249c24d8bb11d8b8592f4f5a7',
      'X-Target-Environment': 'sandbox',
      'X-Reference-Id': '28cffd27-1fc6-4c53-8198-868311ff0c7b',
      'Authorization': 'Basic Auth ' + authorizationToken
    }
  })


  fetch('https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'b44728c249c24d8bb11d8b8592f4f5a7',
      'X-Target-Environment': 'sandbox',
      'X-Reference-Id': '28cffd27-1fc6-4c53-8198-868311ff0c7b',
      'Authorization': 'Bearer ' + authorizationToken
    }
  })
  .then(response => {
    if (response.ok) {
      // Payment submission successful, proceed to next step
      return response.json();
    } else {
      // Handle error response
      throw new Error('Payment submission failed');
    }
  })
  .then(data => {
    // Step 2: Check if payment was successful
    // Assuming your API returns a boolean value indicating payment success
    if (data.paymentSuccessful) {
      // Payment successful, proceed to next step
      return fetch('paymentCheckEndpoint');
    } else {
      // Payment not successful, handle accordingly
      throw new Error('Payment was not successful');
    }
  })
  .then(checkResponse => {
    // Step 3: Handle payment check response
    if (checkResponse.ok) {
      // Payment check successful, show success alert to user
      alert("Payment successful!");
      
      // Step 4: Issue request to another API
      // Example:
      fetch('anotherEndpoint', {
        method: 'POST',
        body: JSON.stringify({ /* Include necessary information */ }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(anotherResponse => {
        if (anotherResponse.ok) {
          // Handle success response from another API
        } else {
          // Handle error response from another API
        }
      })
      .catch(error => {
        // Handle error from another API request
      });
    } else {
      // Handle error response from payment check
      throw new Error('Payment check failed');
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the process
    alert("Error: " + error.message);
  })
  .finally(() => {
    // Close the modal after payment submission, regardless of outcome
    document.getElementById("paymentModal").style.display = "none";
  });
  // alert("Payment of $" + paymentAmount + " submitted successfully!");
  // document.getElementById("paymentModal").style.display = "none";
}
