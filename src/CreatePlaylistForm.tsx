import { useState } from "react";
import { Playlist, Song } from "./App";

type CreatePlaylistFormProps = {
  onCreatePlaylist: (arg0: Playlist) => void;
  selectedSongs: Song[];
};

export const CreatePlaylistForm = ({
  onCreatePlaylist,
  selectedSongs,
}: CreatePlaylistFormProps) => {
  const [name, setName] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onCreatePlaylist({
          name,
          songs: selectedSongs,
        });
      }}
    >
      <input
        placeholder="Playlist Name"
        required
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        maxLength={100}
      />
      <button
        type="submit"
        disabled={selectedSongs.length === 0 || name === ""}
        onClick={() => {}}
      >
        Create a playlist
      </button>
    </form>
  );
};
