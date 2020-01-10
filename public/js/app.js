console.log('Client side java script file');

const weatherForm = document.querySelector('form');     
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


 weatherForm.addEventListener('submit', (e) => {
 e.preventDefault();

    const location = search.value;

        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {

            if(data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            }else {
              console.log(data.forecast);
              console.log(data.location);

              messageOne.textContent = data.forecast;
              messageTwo.textContent = data.location;
            }

         });
          
      });


     //console.log(location);
 })