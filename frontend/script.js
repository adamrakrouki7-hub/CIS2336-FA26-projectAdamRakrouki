const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(function(question) {
    question.addEventListener("click", function() {
        const answerId = question.getAttribute("aria-controls");
        const answer = document.getElementById(answerId);
        answer.hidden = !answer.hidden;
        question.setAttribute("aria-expanded", String(!answer.hidden));
    });

});
/*highlight*/

const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".header nav a");
navLinks.forEach(function(link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")) {

        link.classList.add("active");

        link.setAttribute("aria-current", "page");
    }
});


/* Room JS */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const date = document.getElementById("date").value;
        const start = document.getElementById("startTime").value;
        const end = document.getElementById("endTime").value;
        const message = document.getElementById("bookingMessage");

        const today = new Date();
        const selectedDate = new Date(date + "T" + start);

        const toMinutes = time => {
            const [h, m] = time.split(":").map(Number);
            return h * 60 + m;
        };

        const duration = toMinutes(end) - toMinutes(start);

        if (!email.toLowerCase().endsWith("@cougarnet.uh.edu")) {
            message.textContent = "Please use your UH email.";
        }
        else if (selectedDate <= today) {
            message.textContent = "Please select a valid date and time.";
        }
        else if (duration <= 0 || duration > 180) {
            message.textContent = "Reservations must be between 1 minute and 3 hours.";
        }
        else {
            message.textContent = "Your reservation has been submitted";
            bookingForm.reset();
        }
    });
}
