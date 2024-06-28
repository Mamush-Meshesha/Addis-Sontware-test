import createSagaMiddleware from "redux-saga"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "../reducer/rootReducer"
import rootSaga from "../saga/songSaga"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

// {
//       serializableCheck: {
//         ignoredActions: ["song/uploadSong", "song/uploadSongToCloud"],
//         ignoredActionPaths: ["payload"],
//         ignoredPaths: ["song.uploadedFile"],
//       },
//     }

sagaMiddleware.run(rootSaga)

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;