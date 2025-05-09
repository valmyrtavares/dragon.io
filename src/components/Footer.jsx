import style from '../assets/style/Footer.module.scss';
import LogoImage from '../assets/image/Logo.png';
import { Link } from 'react-router-dom';
import useIsMobile from '../hook/useIsMobile';

const Footer = () => {
  const isMobile = useIsMobile(650); // Define o breakpoint para considerar mobile

  const callSeller = () => {
    const phoneNumber = '551132229446'; // Coloque aqui o número com DDI (55), DDD (11), e o número (999999999)
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent()}`;
    window.open(url, '_blank'); // Abre em nova aba
  };

  return (
    <footer
      className={isMobile ? style.footerContainerMobile : style.footerContainer}
    >
      <div className={isMobile ? style.footerLogoMobile : style.footerLogo}>
        <Link to="https://dragoncomputadores.com.br/">
          <img src={LogoImage} alt="Logo dragon" />
        </Link>
        <p>
          &copy; {new Date().getFullYear()} R. Álvares Penteado, 177 – Centro
          Histórico de São Paulo, São Paulo – SP, 01012-001
        </p>
      </div>
      <div className={isMobile ? style.emailFooterMobile : style.emailFooter}>
        <h2>Contato</h2>
        <p>Atendimento: Seg~Sex 10:00h as 18:00h Sábado: 10:00h as 14:00h</p>
        <p className={style.email}>
          Email:{' '}
          <a href="mailto:contato@dragoncomputadores.com.br">
            contato@dragoncomputadores.com.br
          </a>
        </p>
      </div>
      <div className={isMobile ? style.zapFooterMobile : style.zapFooter}>
        <p>Ou se preferir fale agora mesmo conosco pelo WhatsApp </p>
        {isMobile ? (
          <button className={style.btnContactFooterMobile} onClick={callSeller}>
            <div className={style.whatsappLogo}></div>
            <span>Fale Conosco</span>
          </button>
        ) : (
          <button className={style.btnContactFooter} onClick={callSeller}>
            <span>Fale conosco</span>
          </button>
        )}
      </div>
    </footer>
  );
};
export default Footer;
