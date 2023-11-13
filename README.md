# exblog

**Version:** 0.0.0

## Overview

This repository contains the source code for a front-end web application built using Vite, TypeScript, and React with Preact signals. The application focuses on utilizing local storage for data storage. Additionally, it integrates chart visualization using Chart.js and React Chartjs-2, and includes a datepicker component for user interaction.

## Installation

1. Clone the repository: `git clone https://github.com/yourusername/exblog.git`
2. Install dependencies: `npm install`

## Usage

The application serves as a tool for tracking exercises. Use the button in the bottom right corner to add a new exercise you have completed. Specify the date and details for each set, including weights and reps. The added exercises will be displayed in the left menu. Click on any exercise to view a line chart illustrating your progress.

### Tracking Exercises

1. Click the button in the bottom right corner to add a new exercise.
2. Specify the date of the exercise and provide details for each set, including weights and reps.

### Viewing Progress

1. In the left menu, click on any exercise to view its details.
2. The line chart will display your progress over time.
3. Data points are calculated based on the total volume, obtained by multiplying the weight and reps for each set and summing them.

## Known Issues

- **Exercise Addition:** No checks are made during the addition of new data points. Users need to be careful about the data they add.
- **Data Deletion:** Deleting an exercise removes all associated data points. To remove a single entry, replace the localStorage JSON under the key `LOCAL_STORAGE_EXERCISE_KEY` directly in the browser.

## Scripts

- **Development:** `npm run dev` - Run Vite in development mode.
- **Build:** `npm run build` - Build the project using TypeScript and Vite.
- **Linting:** `npm run lint` - Lint the project using ESLint.
- **Preview:** `npm run preview` - Preview the production build locally.

## Dependencies

- `@preact/signals-react`: Version 1.3.6
- `chart.js`: Version 4.4.0
- `react`: Version 18.2.0
- `react-chartjs-2`: Version 5.2.0
- `react-datepicker`: Version 4.21.0
- `react-dom`: Version 18.2.0

## Configuration Files

- **`vite.config.js`:** Configurations for Vite, including React plugin and TypeScript paths.
- **`tailwind.config.js`:** Tailwind CSS configuration with typography and daisyui theme.

## Project Structure

The project follows a standard structure for a Vite + TypeScript + React application. Key directories include:

- `src/`: Contains the source code.
- `public/`: Includes static assets used in the application.

## Contributing

Include guidelines for contributors if applicable.

Feel free to further customize or expand this README as needed.
