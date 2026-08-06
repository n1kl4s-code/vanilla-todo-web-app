export class Toast {
    /**
     * 
     * @param {string} title
     The title of the `Toast`.
     * @param {"success" | "warning" | "error" | "information"} type
     The specific type of the `Toast` - either `success`, `warning`, `error` or `information`. 
     */
    constructor(title, type) {
        this.title = title;
        this.type = type;
        // 3000ms until Toast gets destroyed
        this.duration = 3000;
        // keep track if toast is rendered or not
        this.isRendered = false;
        // save html reference (for deletion and updating)
        this.reference = null;
    };

    // function to build toast as html element
    render(parentElement = document.body) {
        // create toast html element
        const toastBaseContainer = document.createElement("div");
        toastBaseContainer.classList.add("toast");
        toastBaseContainer.classList.add(this.type);

        // add and play entry animation
        toastBaseContainer.style.setProperty("animation", "toast-in 300ms ease-out 0ms forwards");

        const toastIconContainer = document.createElement("div");
        toastIconContainer.classList.add("toast-icon");
        const toastIconInner = document.createElement("div");
        toastIconInner.classList.add("toast-icon-inner");
        toastIconContainer.appendChild(toastIconInner);

        const toastTitleDisplay = document.createElement("span");
        toastTitleDisplay.classList.add("toast-title");
        toastTitleDisplay.textContent = this.title;

        const toastDismissButton = document.createElement("div");
        toastDismissButton.classList.add("dismiss-toast-btn");
        toastDismissButton.onclick = () => {
            this.destroy();
        };

        toastBaseContainer.append(toastIconContainer, toastTitleDisplay, toastDismissButton);
        // after creation
        this.isRendered = true;
        // save created html element in this.reference
        this.reference = toastBaseContainer;
        parentElement.appendChild(toastBaseContainer);
        // destroy toast automatically after duration + 600ms (for extry and exit animations to play)
        this.timeOut = setTimeout(() => {this.destroy();}, this.duration + 600);
    };

    // function to delete/destroy toast html element
    destroy() {
        if (this.isRendered && this.reference) {
            // add and play exit animation
            this.reference.style.setProperty("animation", "toast-out 300ms ease-in forwards");
            this.reference.onanimationend = () => {
                // delete toast html
                this.reference.remove();
                // clear timeout for toast dismissal (leads to infinite loop because dismissing leads to destroy() breaking)
                clearTimeout(this.timeOut);
                // reset isRendered and reference
                this.isRendered = false;
                this.reference = null;
            };
        } else {
            // display error toast
            new Toast("Dismissal failed.", "error").render();
        };
    };

    // function for updating a toast while still rendered (instead of creating a new one)
    update() {
        if (this.reference && this.isRendered) {
            // update values of rendered reference
        };
    };
};