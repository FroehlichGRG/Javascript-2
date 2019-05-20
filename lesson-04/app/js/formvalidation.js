class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
            message: /([^\s])/
        };
        this.errors = {
            name: 'The name field can contain only letters',
            phone: 'Write the phone number of the following type +7(000)000-0000',
            email: 'E-mail has the form mymail@mail.ru, or my.mail@mail.ru, or my-mail@mail.ru',
            message: 'The field must not be empty'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }

    _validateForm(){
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors)
        {
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByClassName("validation")];
        for (let field of formFields)
        {
            this._validate(field);
        }
        if(![...document.querySelectorAll('.invalid')].length){
            this.valid = true;
        }
    }

    _validate(field){
        if (this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)){
                field.classList.add('invalid');
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }

    _addErrorMsg(field){
        let errMsg = document.createElement('div');
        errMsg.classList.add(this.errorClass);
        errMsg.textContent = this.errors[field.name];
        field.parentNode.appendChild(errMsg);
    }

    _watchField(field){
        field.addEventListener('input', () => {
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (field.parentNode.lastChild !== field){
                    field.parentNode.lastChild.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (field.parentNode.lastChild.nodeName !== 'DIV'){
                    this._addErrorMsg(field);
                }
            }

        })
    }
}