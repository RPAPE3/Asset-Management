# Asset Management Frontend

This is the frontend for the Asset Management application. It is built with React and Vite, providing a user-friendly interface for uploading and managing asset data.

## Features
- Upload asset data via JSON file
- Simple and modern UI
- Integration with backend for data validation and storage

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (v8 or higher recommended)

### Installation
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Development Server
Start the app in development mode:
```sh
npm run dev
```
The app will be available at the URL shown in your terminal (typically http://localhost:5173).

### Building for Production
To build the app for production:
```sh
npm run build
```
The output will be in the `dist` folder.

### Previewing the Production Build
To preview the production build locally:
```sh
npm run preview
```

## File Upload Feature
- Click the "Upload Asset Data" section to select a JSON file containing your asset data.
- The file is sent to the backend for validation and processing.
- Only basic file type and JSON parsing checks are performed on the frontend; all structure validation is handled by the backend.
- **Test File:** A sample file named `assets_test_upload.json` is provided in the project root. You can use this file to test uploads. Feel free to change values in the file to verify the application works as expected.

## Project Structure
- `src/components/` - React components
- `src/` - Main source code
- `public/` - Static assets

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License
This project is for internal use. Please contact the maintainer for licensing information.
