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
      <figure className="container_imag">
        <img src={Blockchange} alt="blockchain" />
      </figure>
      <figure className="container_imag">
        <img src={Communication} alt="communication" />
      </figure>
      <figure className="container_imag">
        <img src={Management} alt="management" />
      </figure>
      <figure className="container_imag">
        <img src={Media} alt="media" />
      </figure>
      <figure className="container_imag">
        <img src={RemoteLife} alt="remoteLife" />
      </figure>
      <figure className="container_imag">
        <img src={VirtualReality} alt="virtualReality" />
      </figure>
    </>
  );
};

export { BackgroundImages };
