# Password Security Analyzer 🔐

A web-based password security analyzer that evaluates password strength in real time and provides instant feedback to users.

## Why I built this project

I built this project to learn more about cybersecurity concepts and improve my web development skills by creating a practical tool that helps users understand password security. Through this project, I wanted to learn how passwords can be evaluated, how security requirements affect password strength, and how interactive applications can provide real-time feedback to users.

## Features

- Real-time password analysis
- Show/hide password visibility
- Password requirement checklist:
  - Minimum length check
  - Uppercase letter detection
  - Lowercase letter detection
  - Number detection
  - Special character detection
- Password strength score calculation
- Visual strength meter
- Strength rating:
  - Weak
  - Medium
  - Strong
  - Excellent

## Screenshots

### Main password analyzer interface
![Main password analyzer interface](images/screenshot1.png)

### Excellent password example
![Excellent password example](images/screenshot2.png)

### Strong password example
![Strong password example](images/screenshot3.png)

## Technologies Used

- HTML
- CSS
- JavaScript

## How It Works

The application analyzes a password as the user types.

Each security requirement contributes one point to the overall score:

- Length requirement: +1
- Uppercase letter: +1
- Lowercase letter: +1
- Number: +1
- Special character: +1

The total score (0-5) is converted into a percentage and displayed through a visual strength bar.

## Future Improvements

Planned features:

- Password security suggestions
- Common password detection
- Password entropy calculation
- Estimated cracking time
- Secure password generator
- Improved password security recommendations

## Project Status

🚧 Currently under development

More security features and improvements will be added over time.

## Author

Created by Alex F. as a personal project exploring cybersecurity concepts, password security, and web development using HTML, CSS, and JavaScript.