function applyColorToElements() {
  // Find all elements with the specified classes
  var elements = document.querySelectorAll('.gtm-debug-card__subtitle.wd-nominated-tag-type, .tag-details__property-value');

  const ERROR = {
    FAIL: "#ffcccc",
    RUNNING: "#ddddff",
    EXCEPTION: "#ffddff",
    NONE: "#ffffff"
  }

  // Loop through each element
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var errorType = ERROR.NONE;

    // Check if the element contains an error
    if (element.innerHTML.includes("Failed")) {
      element.style.color = "red";
      errorType = ERROR.FAIL;
    } else if (element.innerHTML.includes("Exception thrown")) {
      element.style.color = "magenta";
      errorType = ERROR.EXCEPTION;
    } else if (element.innerHTML.includes("Still running")) {
      element.style.color = "blue";
      errorType = ERROR.RUNNING;
    }

    var parent = element.closest('.gtm-debug-card'); // Find the ancestor element with class gtm-debug-card
    if (parent && errorType != ERROR.NONE) {
      parent.querySelector('.gtm-debug-card__title').style.backgroundColor = errorType;
    }
  }
}

// Apply initial color changes
applyColorToElements();

// Create a mutation observer to observe changes on the page
var observer = new MutationObserver(function (mutationsList, observer) {
  for (var mutation of mutationsList) {
    // Check if the mutation involves nodes being added or removed
    if (mutation.type === 'childList') {
      // Apply color changes when nodes are added or removed
      applyColorToElements();
    }
  }
});

// Observe changes on the page including child node additions or removals,
// only when the URL matches the specific pattern
if (window.location.href.startsWith("https://tagassistant.google.com/")) {
  observer.observe(document.body, { childList: true, subtree: true });
}

