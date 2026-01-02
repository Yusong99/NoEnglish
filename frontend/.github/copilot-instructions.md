# Copilot Instructions for NoEnglish Frontend

## Architecture Overview

This is an Expo React Native app for a Japanese dictionary learning tool. Uses expo-router for file-based navigation with Stack and native tabs. Zustand manages global state (e.g., `spellStore.js` for word recitation). Axios handles API calls to a Spring Boot backend with JWT authentication stored in AsyncStorage.

## Key Components & Patterns

- **Navigation**: File-based routing in `src/app/`. Auth screens (`auth/login.js`) and tab screens (`(tabs)/index.js`) use Stack. Tabs use `NativeTabs` with SF Symbols icons.
- **State Management**: Zustand stores for recitation logic. Example: `useStore` in `spellStore.js` manages `wordsList`, `currentIndex`, `userInput` for kana input validation.
- **API Integration**: Centralized in `utils/api.js` with request/response interceptors. Base URL hardcoded to `http://192.168.124.4:8080`. Auth tokens auto-attached from AsyncStorage.
- **Authentication**: `authService.js` handles login/register with Toast feedback. Stores `token`, `userId`, `avatar` in AsyncStorage. Logout clears token.
- **UI Styling**: React Native Elements (`@rneui/themed`) for components. Custom "silver theme" for inputs (e.g., `inputContainerStyle: { backgroundColor: '#F5F5F5', borderColor: '#D1D9E6' }`).
- **Data Persistence**: AsyncStorage for user data and cached word lists. Example: Recitation words stored as JSON string.

## Developer Workflows

- **Start App**: `npm start` (or `expo start`) launches Metro bundler. Use `--android`/`--ios`/`--web` for platform-specific.
- **Formatting**: `npm run format` runs Prettier on JS/JSON/MD/TS/JSX/TSX files.
- **Debugging**: Console logs for API responses. `AsyncStorage.getAllKeys()` and `multiGet()` for inspecting stored data. Toast messages for user feedback.
- **API Calls**: Use `api.get/post` from `utils/api.js`. Search endpoint: `/api/words/search?q=keyword&page=0&size=10`. Random vocab: `/api/vocab/random?level=N2`.
- **Image Upload**: `uploadAvatar.js` uses FormData for avatar uploads to `/auth/user/avatar`.

## Conventions

- **File Structure**: Screens in `src/app/`, utils in `src/utils/`, store in `src/store/`, assets in `src/assets/`.
- **Error Handling**: API errors logged to console. Toast for user-facing messages (success/error types).
- **Pagination**: FlatList with `onEndReached` for infinite scroll. Track `hasMore` and `loading` states.
- **Debounced Search**: `setTimeout` in `useEffect` for 300ms delay on keyword changes.
- **Chinese Text**: UI labels and comments in Chinese (e.g., "首页", "背词").
- **AsyncStorage Keys**: `token`, `userId`, `userName`, `avatar`, `avatarId`, `wordsList`.

## Common Tasks

- Adding new tab: Create file in `(tabs)/` and update `_layout.js` with `NativeTabs.Trigger`.
- Fetching data: Use `api.get` with params. Handle `res.data.code` for backend status (200=success).
- State updates: Use Zustand actions like `setWords()` to update `wordsList` and reset `currentIndex`.
- Avatar handling: Use `ImagePicker` for selection, then `uploadAvatar(uri)` with userId from AsyncStorage.</content>
  <parameter name="filePath">/Users/xuyusong/IdeaProjects/NoEnglishProject/frontend/.github/copilot-instructions.md
