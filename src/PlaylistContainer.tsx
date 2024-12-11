import { Playlist } from "./App";
import { Songs } from "./Songs";

type PlaylistContainerProps = {
  playlist: Playlist;
};

export const PlaylistContainer = ({ playlist }: PlaylistContainerProps) => {
  const { name, songs } = playlist;

  return (
    <div key={name}>
      <h2>{name}</h2>
      <Songs songs={songs} onSongSelection={() => {}} />
      <button>Edit Playlist</button>
    </div>
  );
};
