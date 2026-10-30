console.log("script.js is running!")

const nameInput = document.querySelector('#name-input');
const greetBtn = document.querySelector('#greet-btn');
const output = document.querySelector("#output");

if (nameInput && greetBtn && output) {
    function greet() {
        const name = nameInput.value;
        output.textContent = `Hi ${name}!`;
    }

    greetBtn.addEventListener("click", greet);
}

const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
    function toggleTheme() {
        const isDark = document.body.classList.toggle("dark");
        themeBtn.textContent = isDark ? "Light mode" : "Dark mode";
        themeBtn.setAttribute("aria-pressed", String(isDark));
    }

    themeBtn.addEventListener("click", toggleTheme);
}

const preferenceForm = document.querySelector("#preference-form");
const recommendation = document.querySelector("#recommendation");
const recommendationText = document.querySelector("#recommendation-text");
const useRecommendationButton = document.querySelector("#use-recommendation");
const messageTextarea = document.querySelector("#message");

if (preferenceForm && recommendation && recommendationText && useRecommendationButton && messageTextarea) {
    const layoutSuggestions = {
        compact: "a compact 60% layout that saves desk space",
        tkl: "a TKL layout with dedicated arrow keys and no number pad",
        full: "a full-size layout with a dedicated number pad"
    };
    const soundSuggestions = {
        quiet: "quiet, smooth switches",
        tactile: "tactile switches with a noticeable bump",
        clicky: "clicky switches with a pronounced sound"
    };
    const useSuggestions = {
        typing: "a comfortable typing setup, with keycaps that feel good for long sessions",
        gaming: "a responsive gaming setup, with a layout that leaves room for mouse movement",
        both: "a balanced setup suited to both work and play"
    };
    let currentRecommendation = "";

    preferenceForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const answers = new FormData(preferenceForm);
        const layout = answers.get("layout");
        const sound = answers.get("sound");
        const useCase = answers.get("useCase");

        currentRecommendation = `I'd like ${layoutSuggestions[layout]}, ${soundSuggestions[sound]}, and ${useSuggestions[useCase]}.`;
        recommendationText.textContent = currentRecommendation;
        recommendation.hidden = false;
        useRecommendationButton.hidden = false;
        useRecommendationButton.disabled = false;
        useRecommendationButton.textContent = "Add this to my message";
    });

    preferenceForm.addEventListener("change", () => {
        recommendation.hidden = true;
        useRecommendationButton.disabled = false;
        useRecommendationButton.textContent = "Add this to my message";
    });

    useRecommendationButton.addEventListener("click", () => {
        const existingMessage = messageTextarea.value.trim();
        messageTextarea.value = existingMessage
            ? `${existingMessage}\n\n${currentRecommendation}`
            : currentRecommendation;
        messageTextarea.focus();
        useRecommendationButton.textContent = "Added to your message";
        useRecommendationButton.disabled = true;
    });
}