class ValidateForm {
    constructor(formID) {
        this.isValidForm = true
        this.form = document.querySelector(`#${formID}`);
        this.formElements = this.form.querySelectorAll('.required')
        this.form.addEventListener('submit', (e) => {
            this.isSending = true
            e.preventDefault()
            this.checkFieldBeforeSending()
        })

        this.formElements.forEach(elem => elem.addEventListener('blur', (e) => {
            this.isSending = false
            this.checkFieldBeforeSending([e.currentTarget])
        }))
        this.findInputPhone()
    }

    findInputPhone() {
        this.formElements.forEach(elem => {
            if (elem.name === 'phone') this.maskPhone(elem)
        })
    }

    checkFieldBeforeSending(elem) {
        const formElements = elem || this.formElements
        formElements.forEach(elem => {
            if (elem.id === 'name') {
                this.checkText(elem) ? this.setValidClass(elem) : this.setInvalidClass(elem);
            } else if (elem.id === 'email') {
                this.checkEmail(elem) ? this.setValidClass(elem) : this.setInvalidClass(elem);
            } else if (elem.id === 'phone') {
                this.checkPhone(elem) ? this.setValidClass(elem) : this.setInvalidClass(elem);
            }
        })
        if (this.isValidForm && this.isSending) this.sendForm()
    }

    checkEmail(elem) {
        let value = elem.value.trim()
        let arr = value.split('@');
        let mailbox = arr[0];
        let hostname = arr[1] || "";
        let replaceMailbox = mailbox.replace(/[0-9a-z-_.]/gi, "");
        let replaceHostname = hostname.replace(/[0-9a-z-.]/g, "");

        if (mailbox.length > 31 || mailbox.length < 5) return false               //mailbox must be between 5 and 31 characters
        else if (replaceMailbox.length > 0) return false
        else if (replaceHostname.length > 0) return false
        else if (hostname.length > 12 || hostname.length < 5) return false        //hostname must be between 5 and 12 characters
        else if (value.search(/-{2,}/) > 0) return false                  //check if there is more than one hyphen in a row
        else if (value.search(/\.{2,}/) > 0) return false                 //check if there is more than one hyphen in a row
        else if (value.search(/\.([a-z]{2,4})$/) < 0) return false        // checking if a string ends with a dot and between 2 and 4 letters

        return true
    }

    checkText(elem) {
        let value = elem.value.trim()
        let replace = value.replace(/^[A-Za-zа-яёА-ЯЁ\s]{1,}[-]{0,1}[A-Za-zа-яёА-ЯЁ\s]{0,}$/gi, "");

        return !(replace.length > 0 || value.length === 0 || value.length > 200);


    }

    checkPhone(elem) {
        const phone = elem.value;
        const reges = /\+\d{3} \(\d{2}\) \d{3}\-\d{2}\-\d{2}/;
        return phone.search(reges) !== -1;
    }

    maskPhone(elem, masked = '+___ (__) ___-__-__') {

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }

        }

        elem.addEventListener("input", mask);
        elem.addEventListener("focus", mask);
        elem.addEventListener("blur", mask);

    }

    serializeForm() {
        return new FormData(this.form)
    }

    sendForm() {
        const data = this.serializeForm()
        // fetch('/email', {
        //     "method": 'POST',
        //     "body": data,
        // }).then(response => {
        //     if (response.ok) {
        //         this.showMessage()
        //         this.form.reset()
        //     } else {
        //         return response.json().then(error => {
        //             const e = new Error('Error')
        //             e.data = error
        //             throw e
        //         })
        //     }
        // })
        // .catch(error => {
        // this.showMessage(`${error.name}: Возникла проблема. Обратитесь в службу поддержки.`)
        // }).finally(() => this.spinnerEffectLoading(false))

    }

    setValidClass(elem) {
        elem.classList.remove('invalid')
        elem.classList.add('valid')
    }

    setInvalidClass(elem) {
        elem.classList.remove('valid')
        elem.classList.add('invalid')
        elem.value.length > 0 ? elem.classList.add('not-empty') : elem.classList.remove('not-empty')
    }
}