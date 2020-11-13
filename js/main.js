document.addEventListener('DOMContentLoaded', () => {
    //===================BURGER===================
    function burger() {
        document.querySelector('.menu-header__icon').addEventListener('click', () => {
            document.querySelector('.menu-header__icon').classList.toggle('active');
            document.querySelector('.menu-header__menu').classList.toggle('active');
            document.body.classList.toggle('lock');
        })
    }
    burger();

    //===============TABS===============
    function tab() {
        let tabHead = document.querySelectorAll('.tab-form'),
            tabContent = document.querySelectorAll('.tab-content'),
            tabName;
        tabHead.forEach(form => {
            form.addEventListener('click', selectTabNav)
        });

        function selectTabNav() {
            tabHead.forEach(form => {
                form.classList.remove('active');
            });
            this.classList.add('active');
            tabName = this.getAttribute('data-tab-name');
            console.log(tabName);

            selectTabContent(tabName);
        }

        function selectTabContent(tabName) {
            tabContent.forEach(form => {
                console.log(form.getAttribute('data-tab-name'));
                if (form.classList.contains(tabName)) {
                    console.log('yes');
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                    console.log('no');
                }
            });
        }
    }
    tab();
    //================IBG================
    const ibg = () => {
        const bg = document.querySelectorAll('.ibg');
        for (let i = 0; i < bg.length; i++) {
            if (bg[i].querySelector('img')) {
                bg[i].style.backgroundImage = `url(${bg[i].querySelector('img').getAttribute('src')})`;
            }
        }
    };
    ibg();
    //==============FORM==============
    const forms = document.querySelectorAll('form');
    const message = {
        success: "success",
        failure: "failure",
        loading: "img/icons/ajax-loader.gif"
    };
    forms.forEach(item => postData(item));
    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();        
            let data = new FormData(form);
            ajax('POST','server.php');
        });
        function ajax(method,url ) { 
            const statusLoading = document.createElement('img');
            statusLoading.classList.add('form__message');
            statusLoading.src = message.loading;
            form.insertAdjacentElement('afterend',statusLoading);
            const request = new XMLHttpRequest();
            request.open(method, url);
            request.setRequestHeader("Accept", "application/json");
            // const formData = new FormData(form);
            // request.send(formData);
            // console.log(request.response());
            request.onreadystatechange = function() {
                if (request.readyState !== XMLHttpRequest.DONE) return;
                if (request.status === 200) {
                    statusLoading.remove();    
                    form.reset();                           
                    statusMessage(form, message.success);
                    setTimeout(() => {
                        closeModal();
                    }, 1000)
                } else {
                    statusLoading.remove();
                    form.reset();
                    statusMessage(form, message.failure);
                }
        }
            
              };
              request.send(data);
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         statusLoading.remove();    
            //         form.reset();                           
            //         statusMessage(form, message.success);
            //         setTimeout(() => {
            //             closeModal();
            //         }, 1000)
            //     } else {
            //         statusLoading.remove();
            //         form.reset();
            //         statusMessage(form, message.failure);
            //     }
            // });
   
    }
        



    function statusMessage(form, message) {
        form.classList.add('hide');
        const messageBox = document.createElement('div');
        messageBox.classList.add('form__message');
        messageBox.innerHTML = `
        <h3>${message}</h3>`;
        form.parentElement.append(messageBox);
        setTimeout(() => {
            messageBox.remove();
            form.classList.remove('hide');
        }, 2000);
    }
    //===============MODAL===============
    const modalWindow = document.querySelector('.modal'),
        contactBtn = document.querySelectorAll('.content__link')[0],
        closeBtn = document.querySelector('.modal__close');
    contactBtn.addEventListener('click', openModal);
    modalWindow.addEventListener('click', (e) => {
        if (e.target == modalWindow || e.target.classList.contains('modal__close')) {
            closeModal()
        }
    });

    function openModal() {
        modalWindow.classList.remove('hide');
        document.body.classList.add('lock');
    }

    function closeModal() {
        modalWindow.classList.add('hide');
        document.body.classList.remove('lock');

    }
});