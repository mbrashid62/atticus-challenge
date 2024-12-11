import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Songs } from "./Songs";
import { CreatePlaylistForm } from "./CreatePlaylistForm";
import { PlaylistContainer } from "./PlaylistContainer";

export type Song = {
  title: string;
  artist: string;
  album: string;
  song_length: string;
  isSelected: boolean;
};

export type Playlist = {
  name: string;
  songs: Song[];
};

function mapResponseToSongs(input: unknown): Song[] {
  if (!Array.isArray(input)) {
    throw new Error("Invalid data format");
  }

  return input.map((item) => ({
    title: String(item.title || ""),
    artist: String(item.artist || ""),
    album: String(item.album || ""),
    song_length: String(item.song_length || ""),
    // add this property to make CRUD operations easier
    isSelected: false,
  }));
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://storage.googleapis.com/atticus-frontend-assessment/api/songs.json",
          { signal: controller.signal }
        );

        const json = await response.json();

        setSongs(mapResponseToSongs(json.songs));
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const selectedSongs = useMemo(
    () => songs.filter((songs) => songs.isSelected),
    [songs]
  );

  const handleCreatePlaylist = useCallback((playlist: Playlist) => {
    setSongs((prev) => {
      return prev.map((s) => {
        return {
          ...s,
          isSelected: false,
        };
      });
    });

    setPlaylists((prev) => {
      return [...prev, playlist];
    });
  }, []);

  if (loading) {
    <div>
      <h1>Loading...</h1>
    </div>;
  }

  if (!loading && songs.length === 0) {
    return (
      <div>
        <h1>No songs. Sit tight.</h1>
      </div>
    );
  }

  const handleSongSelection = (song: Song, action: "add" | "remove") => {
    setSongs((prev) =>
      prev.map((s) =>
        s.title === song.title ? { ...s, isSelected: action === "add" } : s
      )
    );
  };

  const handleUpdatePlaylist = (playlistToUpdate: Playlist, song: Song) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) => {
        if (playlist.name === playlistToUpdate.name) {
          return {
            ...playlist,
            songs: [...playlist.songs, song],
          };
        }

        return playlist; // No changes for other playlists
      })
    );
  };

  return (
    <div className="app-container">
      <h1>Song Data</h1>
      <Songs songs={songs} onSongSelection={handleSongSelection} />
      <CreatePlaylistForm
        selectedSongs={selectedSongs}
        onCreatePlaylist={handleCreatePlaylist}
      />
      {playlists.map((playlist) => {
        return (
          <PlaylistContainer
            key={playlist.name}
            playlist={playlist}
            allSongs={songs}
            updatePlaylist={handleUpdatePlaylist}
          />
        );
      })}
      {loading && <span>loading...</span>}
    </div>
  );
}

export default App;
