import { useMemo, useState } from "react";
import { Song } from "./App";

type SongComponentProps = {
  song: Song;
  onSongSelection: (song: Song, action: "add" | "remove") => void;
};

type SongWithSelectedState = Song & {
  isSelected: boolean;
};

type SongsProps = {
  songs: SongWithSelectedState[];
  onSongSelection: (song: Song, action: "add" | "remove") => void;
};

const SongComponent = ({ song, onSongSelection }: SongComponentProps) => {
  return (
    <tr
      className={`songs-row ${song.isSelected ? "selected" : "unselected"}`}
      tabIndex={0}
      onClick={() => {
        onSongSelection(song, song.isSelected ? "remove" : "add");
      }}
    >
      <td>{song.title}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.song_length}</td>
    </tr>
  );
};
export const Songs = ({ songs, onSongSelection }: SongsProps) => {
  const [sortProperty, setSortProperty] = useState<
    "title" | "artist" | "album" | "song_length" | null
  >(null);

  const songsCopy = useMemo(() => {
    if (!sortProperty) {
      return songs;
    }

    return [...songs].sort((a, b) => {
      return a[sortProperty].localeCompare(b[sortProperty]);
    });
  }, [songs, sortProperty]);

  const handleHeaderClick = (
    property: "title" | "artist" | "album" | "song_length"
  ) => {
    setSortProperty(property);
  };

  if (songs.length === 0) {
    return <div>Empty songs</div>;
  }

  return (
    <div className="songs-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick("title")}>Title</th>
            <th onClick={() => handleHeaderClick("artist")}>Artist</th>
            <th onClick={() => handleHeaderClick("album")}>Album</th>
            <th onClick={() => handleHeaderClick("song_length")}>Length</th>
          </tr>
        </thead>
        <tbody>
          {songsCopy.map((song) => (
            <SongComponent
              key={`${song.title}-${song.artist}`}
              song={song}
              onSongSelection={onSongSelection}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
