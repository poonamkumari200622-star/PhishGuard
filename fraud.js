
// ==========================================
// PHISHGUARD - 3D FRAUD MESSAGE CARDS
// ==========================================

const fraudDeck = document.getElementById("fraudDeck");
const deckCounter = document.getElementById("deckCounter");
const nextButton = document.getElementById("nextFraud");

if (fraudDeck && deckCounter && nextButton) {

    const fraudCards = Array.from(
        fraudDeck.querySelectorAll(".fraud-card")
    );

    let currentCard = 0;
    let isAnimating = false;

    // Display the cards in a 3D stack
    function showFraudCard() {

        fraudCards.forEach((card, index) => {

            card.classList.remove(
                "active",
                "stack-1",
                "stack-2",
                "stack-3",
                "moving-back"
            );

            const position =
                (index - currentCard + fraudCards.length)
                % fraudCards.length;

            if (position === 0) {
                card.classList.add("active");
            } else {
                card.classList.add(`stack-${position}`);
            }

        });

        // Update message number
        deckCounter.textContent =
            `${String(currentCard + 1).padStart(2, "0")} / ${String(fraudCards.length).padStart(2, "0")}`;
    }

    // Move to the next fraud message
    function nextMessage() {

        if (isAnimating || fraudCards.length === 0) {
            return;
        }

        isAnimating = true;

        const oldCard = fraudCards[currentCard];

        // Animate the current card backwards
        oldCard.classList.remove("active");
        oldCard.classList.add("moving-back");

        // Select the next card
        currentCard =
            (currentCard + 1) % fraudCards.length;

        // Bring the next card forward
        const newCard = fraudCards[currentCard];

        newCard.classList.remove("stack-1");
        newCard.classList.add("active");

        // Update counter
        deckCounter.textContent =
            `${String(currentCard + 1).padStart(2, "0")} / ${String(fraudCards.length).padStart(2, "0")}`;

        // Reset card positions after animation
        setTimeout(() => {

            showFraudCard();
            isAnimating = false;

        }, 650);
    }

    // Click on the front card
    fraudCards.forEach(card => {

        card.addEventListener("click", () => {

            if (card.classList.contains("active")) {
                nextMessage();
            }

        });

    });

    // Click on Next Message button
    nextButton.addEventListener("click", nextMessage);

    // Initial display
    if (fraudCards.length > 0) {
        showFraudCard();
    }

}

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");

    });

    // Close menu after clicking a link
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-open");
        });

    });

}
