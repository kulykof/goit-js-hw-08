import throttle from 'lodash.throttle';

const refs = {
    FEEDBACK_FORM_STATE: 'feedback-form-state',
    feedbackForm: document.querySelector('.feedback-form'),
};

let feedbackFormObj = JSON.parse(localStorage.getItem(refs.FEEDBACK_FORM_STATE)) || {};

if (localStorage.getItem(refs.FEEDBACK_FORM_STATE)) {
    const { email, message } = refs.feedbackForm.elements;
    const localStorageObj = JSON.parse(localStorage.getItem(refs.FEEDBACK_FORM_STATE));
    const { email: currentEmail, message: currentMessage } = localStorageObj;
    email.value = currentEmail || "";
    message.value = currentMessage || "";
}

refs.feedbackForm.addEventListener('submit', onFormSubmit);
refs.feedbackForm.addEventListener('input', throttle(onFormInput, 500));

function onFormInput({ target: { name, value } }) {
    feedbackFormObj[name] = value;
    localStorage.setItem(refs.FEEDBACK_FORM_STATE, JSON.stringify(feedbackFormObj));
}

function onFormSubmit(e) {
    e.preventDefault();
    if (e.currentTarget.email.value && e.currentTarget.message.value) {
        console.log(feedbackFormObj);
        feedbackFormObj = {};
        localStorage.removeItem(refs.FEEDBACK_FORM_STATE);
        e.currentTarget.reset();
    }
}