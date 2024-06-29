# Title: Song Management

Description
This project is built using React, Redux Toolkit, Saga, Axios, and TypeScript for the frontend. For the backend, it uses Node/Express, and MongoDB is used for the database.

# Features:

- List all songs
- List songs by album
- List songs by genres
- List songs by artist
- Upload a song
- Edit a song
- Delete a song

## Data Flow
- Fetching Songs
```
- In the component, useEffect dispatches the fetchSongsRequest action.
- This action is sent to the store, where the Saga middleware intercepts it and forwards it to the Saga worker.
- The Saga worker then sends a request to the backend endpoint to fetch songs.
- The Express server handles this request by querying the MongoDB database and returns the data to the Saga worker.
- The worker dispatches a success action to update the store, and the component re-renders with the new state.
```

- Fetching Songs by Album, Genre, and Artist
```
- The process for fetching songs by album, genre, and artist is similar. 
- The component dispatches a specific action (e.g., fetchSongsByAlbumRequest), and the Saga middleware intercepts and processes it. 
- The backend Express server queries MongoDB based on the specified criteria and returns the results.
```
- Uploading a Song
```
- To upload a song, the component dispatches the uploadSongRequest action. The store sends this action to the Saga worker.
- The Saga worker sends a request to the backend API endpoint (/upload) to upload the song file to Cloudinary.
- Once the file is uploaded, Cloudinary returns a URL to the backend, which then sends this URL as a response to the Saga worker.
- The Saga worker dispatches another action to save the song details (title, album, genre, artist, and the Cloudinary URL) into the MongoDB database.
```
- Editing a Song
```
- To edit a song, the component dispatches the editSongRequest action.
- The store sends this action to the Saga worker.
- The Saga worker sends a request to the backend API endpoint to update the song details in MongoDB.
- Once the song is updated, the backend returns the updated song data to the Saga worker, which then dispatches a success action to update the store.
- The component re-renders with the updated song data.
```
- Delete song
```
- To delete a song, the component dispatches the removeSongRequest action. The store sends this action to the Saga worker.
- The Saga worker sends a request to the backend API endpoint to delete the song from MongoDB.
-  Once the song is deleted, the backend returns a response to the Saga worker
-  The worker then dispatches a success action to update the store, and the component re-renders to reflect the changes.
```

![diagram-export-6-23-2024-11_42_39-AM](https://github.com/Mamush-Meshesha/frontend-typescript/assets/118711095/26c828cb-6654-4143-82cc-b5bdd0f5cd92)
