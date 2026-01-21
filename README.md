# Todo App - React Native Assessment

A fully functional Todo app built with React Native, Redux Toolkit, Redux Persist, and Axios. This app implements CRUD operations, local storage persistence, sorting, filtering, and API integration.

## Features

### Part 1: Todo Management (CRUD) with Local Storage
- ✅ **Create**: Add new todos with name, description, due date, and time
- ✅ **Read**: View a list of all todos
- ✅ **Update**: Edit existing todo details
- ✅ **Delete**: Remove todos from the list
- ✅ **Search**: Filter todos by name, description, date, or time
- ✅ **Sorting**: Sort todos by name, date, or time (ascending/descending)
- ✅ **Local Storage**: Todos persist across app restarts using Redux Persist

### Part 2: API Integration
- ✅ **API Call**: Fetch todos from JSONPlaceholder API using Axios
- ✅ **State Management**: API data is stored in Redux state
- ✅ **Display**: Fetched todos are displayed alongside local todos

## Tech Stack

- **React Native** 0.83.1
- **Redux Toolkit** - State management
- **Redux Persist** - Local storage persistence
- **React Native Paper** - UI components
- **Axios** - HTTP client for API calls
- **TypeScript** - Type safety
- **React Native Reanimated** - Animations
- **AsyncStorage** - Local storage backend

## Project Structure

```
TodoApp/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── SearchBar.tsx
│   │   ├── SortOptions.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   └── TodoList.tsx
│   ├── screens/          # Screen components
│   │   └── HomeScreen.tsx
│   ├── slices/           # Redux slices
│   │   └── todosSlice.ts
│   ├── store/            # Redux store configuration
│   │   └── index.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   └── utils/            # Utility functions and themes
│       └── theme.ts
├── App.tsx               # Main app component
└── package.json
```

## Installation

### Prerequisites

- Node.js (>= 20.19.4)
- npm or yarn
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TodoApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro Bundler**
   ```bash
   npm start
   ```

5. **Run on iOS**
   ```bash
   npm run ios
   ```

6. **Run on Android**
   ```bash
npm run android
   ```

## Usage

### Adding a Todo
1. Tap the floating action button (FAB) at the bottom right
2. Fill in the todo name (required)
3. Optionally add a description
4. Select a due date and time
5. Tap "Add" to save

### Editing a Todo
1. Tap the edit icon (pencil) on any todo item
2. Modify the details
3. Tap "Update" to save changes

### Deleting a Todo
1. Tap the delete icon (trash) on any todo item
2. The todo will be removed immediately

### Searching Todos
1. Use the search bar at the top
2. Type to filter by name or description
3. Use the filter button to switch between name, date, and time filters

### Sorting Todos
1. Scroll to the sort options section
2. Tap on any sort option:
   - Name ↑/↓ (alphabetical)
   - Date ↑/↓ (chronological)
   - Time ↑/↓ (by time)
   - None (no sorting)

### Fetching from API
1. Tap the menu icon (three dots) in the header
2. Select "Fetch from API"
3. Todos from JSONPlaceholder will be added to your list

## Redux State Structure

```typescript
{
  todos: {
    todos: Todo[],
    loading: boolean,
    error: string | null,
    sortOption: SortOption,
    filter: {
      type: 'name' | 'date' | 'time' | 'none',
      value: string
    }
  }
}
```

## API Integration

The app fetches todos from:
```
https://jsonplaceholder.typicode.com/todos
```

The API data is transformed to match the app's Todo interface and appended to the existing todos list.

## Local Storage

Todos are automatically saved to AsyncStorage using Redux Persist. The data persists across app restarts, so your todos will be available when you reopen the app.

## Design

The app features a modern, clean UI with:
- Material Design 3 components from React Native Paper
- Smooth animations and transitions
- Responsive layout for different screen sizes
- Color-coded chips for dates and times
- Visual indicators for overdue todos
- Intuitive icons and buttons

## Code Quality

- **Modular Structure**: Components are well-organized and reusable
- **Type Safety**: Full TypeScript implementation
- **Redux Best Practices**: Using Redux Toolkit with proper slices and selectors
- **Error Handling**: API errors are handled gracefully
- **Performance**: Optimized with React.memo and efficient selectors

## Testing

To run tests:
```bash
npm test
```

## Troubleshooting

### iOS Build Issues
- Make sure CocoaPods are installed: `sudo gem install cocoapods`
- Run `pod install` in the ios directory
- Clean build folder in Xcode: Product → Clean Build Folder

### Android Build Issues
- Make sure Android SDK is properly configured
- Check that `ANDROID_HOME` environment variable is set
- Clean build: `cd android && ./gradlew clean`

### Metro Bundler Issues
- Clear cache: `npm start -- --reset-cache`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## License

This project is created for assessment purposes.

## Author

Created as part of a React Native assessment project.
