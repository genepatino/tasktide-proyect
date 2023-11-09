import Blockchange from "../../images/Blockchain.png";
import Communication from "../../images/Communication.png";
import Management from "../../images/Management.png";
import Media from "../../images/Media.png";
import RemoteLife from "../../images/RemoteLife.png";
import VirtualReality from "../../images/VirtualReality.png";

import "./styles.css";

const BackgroundImages: React.FC = () => {
  return (
    <>
      <figcaption className="container_imag">
        <img src={Blockchange} alt="blockchain" />
      </figcaption>
      <figcaption className="container_imag">
        <img src={Communication} alt="communication" />
      </figcaption>
      <figcaption className="container_imag">
        <img src={Management} alt="management" />
      </figcaption>
      <figcaption className="container_imag">
        <img src={Media} alt="media" />
      </figcaption>
      <figcaption className="container_imag">
        <img src={RemoteLife} alt="remoteLife" />
      </figcaption>
      <figcaption className="container_imag">
        <img src={VirtualReality} alt="virtualReality" />
      </figcaption>
    </>
  );
};

export { BackgroundImages };
