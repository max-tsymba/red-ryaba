/*====================================IMPORT MODULES====================================*/
import { burgerOpener } from './modules/libs';
/*======================================================================================*/


/*======================================DOM LOADED======================================*/
window.addEventListener('DOMContentLoaded', () => {
    burgerOpener('burger', '.header__menu', '.header__menu-close', '.header__menu-link');
    burgerOpener('reg__button', '#overlay', '.close-btn');
});

window.onload = () => {

    AOS.init();
  $(".phone").mask("380999999999", { placeholder: "380_________" });

  //Send form
  let
  formBlock = document.getElementsByTagName("form")[0],
  formBlock_CodeInput = formBlock.querySelector("input[name='code']");

  formBlock.addEventListener("submit", async(event) => {

    event.preventDefault();

    //Values
    let
        xhr = new XMLHttpRequest(),
        data = new FormData(event.target),
        url = formBlock.getAttribute("action"),
        method = formBlock.getAttribute('method'),
        result_Block = formBlock.querySelector(".result-text"),
        submit_button = formBlock.querySelector("input[type='submit'], button[type='submit']"),
        loader = formBlock.getElementsByClassName("loader")[0];

    //Disable submit-button
    submit_button.disabled = true;
    //Show loader
    loader.classList.add('active');

    grecaptcha.ready(function() {
        grecaptcha.execute('6LchsEcbAAAAAAP2kJyZ05L-V82IoKp9E43qU19M', {action: 'submit'}).then(function(token) {

            //Add token
            data.append('g-recaptcha-response', token);

            //Send request
            xhr.open(method, url);
            xhr.responseType = 'text';
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("redirect", "follow");
            xhr.setRequestHeader("referrerPolicy", "no-referrer");
            xhr.setRequestHeader("mode", "cors");
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

            xhr.onload = function() {

                submit_button.disabled = false;
                loader.classList.remove('active');

                if (this.status >= 200 && this.status < 300) {
                    result_Block.style.color = "#44944A";
                } else {
                    result_Block.style.color = "#F13A13";

                    //Clear input
                    formBlock_CodeInput.value = null;
                    //grecaptcha.reset();
                }
                result_Block.textContent = (this.status >= 500) ? "Час очікування відповіді сервера минув" : this.response;
            }

            xhr.send(data);
        });
    });
  });
}
/*======================================================================================*/