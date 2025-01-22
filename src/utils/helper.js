// Function to get error message
export const getErrorMessage = (error) => {
  if (!error) {
    return "Unable to fetch the data. Please try again later.";
  }

  if ("status" in error) {
    // Check for specific error properties
    return "error" in error ? error.error : JSON.stringify(error.data);
  }

  return error.message || "An unknown error occurred.";
};

// Function to save theme in localStorage
export const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

// Function to get theme from localStorage
export const getTheme = () => {
  return localStorage.getItem("theme");
};

// Utility function to merge class names using clsx and tailwind-merge
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
