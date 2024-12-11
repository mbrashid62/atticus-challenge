import { useState } from "react";
import { Playlist, Song } from "./App";
import { Songs } from "./Songs";
import { Modal } from "./Modal";

type PlaylistContainerProps = {
  playlist: Playlist;
  allSongs: Song[];
  updatePlaylist: (playlist: Playlist, song: Song) => void;
};

export const PlaylistContainer = ({
  playlist,
  allSongs,
  updatePlaylist,
}: PlaylistContainerProps) => {
  const { name, songs } = playlist;
  const [showEdit, setShowEdit] = useState<boolean>(false);

  return (
    <div key={name}>
      <h2>{name}</h2>
      <Songs songs={songs} onSongSelection={() => {}} />
      <button onClick={() => setShowEdit(true)}>Edit Playlist</button>
      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)}>
        <h1>Add a song</h1>
        <div style={{ maxHeight: "500px", overflow: "auto" }}>
          <Songs
            songs={allSongs.filter(
              (s) => !songs.some((parentSong) => parentSong.title === s.title)
            )}
            onSongSelection={(song) => {
              updatePlaylist(playlist, song);
              setShowEdit(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
