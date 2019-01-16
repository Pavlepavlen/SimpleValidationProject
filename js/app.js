

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const display = new Display();

        display.checkFields();
        display.hideSubmit();
    });

    const customerForm = document.getElementById('customer-form');

    customerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = customerForm.querySelector('.name');
        const course = customerForm.querySelector('.course');
        const author = customerForm.querySelector('.author');

        const customer = new Customer(name.value, course.value, author.value);
        const display = new Display();


        display.feedback(customer);
        display.clearFields();
        
    });

    class Display{
        constructor() {
            this.name = document.getElementById('name');
            this.course = document.getElementById('course');
            this.author = document.getElementById('author');
            this.customers = document.querySelector('.customer-list');
        };

        checkFields() {

            this.name.addEventListener('blur', this.validateField);
            this.course.addEventListener('blur', this.validateField);
            this.author.addEventListener('blur', this.validateField);
        }

        validateField() { 

            if(this.value === '') {
                this.classList.remove('complete');
                this.classList.add('fail');
            } else {
                this.classList.remove('fail');
                this.classList.add('complete');
            }

            const complete = document.querySelectorAll('.complete');
            const btn = document.querySelector('.submitBtn');

            if(complete.length === 3) {
                btn.disabled = false;
                btn.classList.add('active');
            } else {
                btn.disabled = true;
                btn.classList.remove('active');
            }
        }

        unhideSubmit() {
            const btn = document.querySelector('.submitBtn');

            btn.setAttribute('disabled', false);
            btn.classList.add('active');
        }

        hideSubmit() {
            const btn = document.querySelector('.submitBtn');

            btn.setAttribute('disabled', true);
            btn.classList.remove('active');
        }

        clearFields() {
            this.name.value = '';
            this.course.value = '';
            this.author.value = '';

            this.name.classList.remove('complete');
            this.course.classList.remove('complete');
            this.author.classList.remove('complete');

            this.hideSubmit();
        }

        feedback(customer) {
            const feedback = document.querySelector('.feedback');
            const loading = document.querySelector('.loading');

            feedback.classList.add('showItem', 'alert', 'alert-success');
            loading.classList.add('showItem');

            this.hideSubmit();

            setTimeout(() => {
                feedback.classList.remove('showItem', 'alert', 'alert-success');
                loading.classList.remove('showItem');
                this.hideSubmit();

                this.addCustomer(customer);
            }, 2000);
        }

        addCustomer({name, course, author}) {
            console.log(name);
            const newCustomerField = document.createElement('div');
            const customerContainer = document.querySelector('.customer-container');

            const getRandomValue = (min, max) => {
                return Math.floor(Math.random() * (+max - +min) + +min);
            }

            newCustomerField.classList.add('card', 'text-left')
            newCustomerField.insertAdjacentHTML('afterbegin', `<div class="card text-left">
            <img src="img/cust-${getRandomValue(0,6)}.jpg" class="card-img-top" alt="">
            <div class="card-body">
             <!-- customer name -->
             <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name"> ${name}</span></h6>
             <!-- end of customer name -->
             <!-- customer name -->
             <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
               ${course}
              </span></h6>
             <!-- end of customer name -->
             <!-- customer name -->
             <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author"> ${author}</span></h6>
             <!-- end of customer name -->
            </div>
           </div>`)

           customerContainer.prepend(newCustomerField);
        }
    }

    class Customer {
        constructor(name, course, author) {
            this.name = name,
            this.course = course,
            this.author = author
        }
    }
})();