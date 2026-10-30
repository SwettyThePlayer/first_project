const greetingForm = document.querySelector("#greeting-form");
const nameInput = document.querySelector("#name-input");
const output = document.querySelector("#output");

if (greetingForm && nameInput && output) {
    greetingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();
        output.textContent = name ? `Hi ${name}!` : "Hi there!";
    });
}

const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
    const themeStorageKey = "ck-theme";

    function updateThemeButton() {
        const isDark = document.body.classList.contains("dark");
        themeBtn.textContent = isDark ? "Light mode" : "Dark mode";
        themeBtn.setAttribute("aria-pressed", String(isDark));
    }

    try {
        const savedTheme = localStorage.getItem(themeStorageKey);
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.body.classList.toggle("dark", savedTheme ? savedTheme === "dark" : prefersDark);
    } catch (error) {
        console.warn("Could not read the saved theme preference.", error);
    }

    updateThemeButton();

    themeBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        updateThemeButton();
        try {
            localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
        } catch (error) {
            console.warn("Could not save the theme preference.", error);
        }
    });
}

const preferenceForm = document.querySelector("#preference-form");
const recommendation = document.querySelector("#recommendation");
const recommendationText = document.querySelector("#recommendation-text");
const useRecommendationButton = document.querySelector("#use-recommendation");
const messageTextarea = document.querySelector("#message");
const messageCount = document.querySelector("#message-count output");

function updateMessageCount() {
    if (!messageTextarea || !messageCount) {
        return;
    }

    const length = messageTextarea.value.length;
    messageCount.textContent = `${length} characters${length > 500 ? " — consider shortening" : ""}`;
}

if (messageTextarea && messageCount) {
    updateMessageCount();
    messageTextarea.addEventListener("input", updateMessageCount);

    messageTextarea.form.addEventListener("reset", () => {
        setTimeout(updateMessageCount);
    });
}

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
        updateMessageCount();
        messageTextarea.focus();
        useRecommendationButton.textContent = "Added to your message";
        useRecommendationButton.disabled = true;
    });
}