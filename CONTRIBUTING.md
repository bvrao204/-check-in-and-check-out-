# Contributing to VNR Hostels Check-In and Check-Out System

First off, thank you for considering contributing to this project! It's people like you that make it a great tool for managing accommodations.

## How Can I Contribute?

### Reporting Bugs

If you find a bug in the application, please search the existing issues to check if it has already been reported. If it hasn't, you can open a new issue using our **Bug Report Template** and provide:
* A clear and descriptive title.
* Detailed steps to reproduce the behavior.
* What you expected to happen vs what actually happened.
* Screenshots or video recordings if applicable.
* Information about your browser type, version, and device.

### Suggesting Enhancements

We are always looking for ways to improve the user experience, aesthetics, and functionality. If you have an idea for a new feature:
* Check if there is already a similar suggestion in the issues list.
* Open an issue using the **Feature Request Template**.
* Explain the problem your idea solves and how it should work.

### Pull Requests

If you want to contribute code changes directly:
1. **Fork the repository** and create your branch from `main`.
2. Write clean HTML, CSS (complying with the glassmorphism aesthetic guidelines), and vanilla JavaScript.
3. Ensure no local storage data assumptions break existing functionalities.
4. Open a Pull Request using our **Pull Request Template** describing your changes.

## Code Standards
* **HTML**: Use semantic HTML5 elements where appropriate. Keep IDs unique for correct JS targeting.
* **CSS**: Stick to established HSL variable tokens defined at `:root` in `styles.css`. Maintain the premium glassmorphic styling system.
* **JavaScript**: Use ES6+ clean syntax, write self-documenting functions, and handle state persistence carefully using the client-side `localStorage` wrapper patterns.
