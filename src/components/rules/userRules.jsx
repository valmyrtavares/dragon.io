import style from '../../assets/style/UserRules.module.scss';
import { GlobalContext } from '../../GlobalContext'; //
import React, { useContext } from 'react';
import { getDataByField, updateObjectBySpecificKey } from '../../api/Api';
import { formatCpf } from '../../helper/Helper';
import BriefMessage from '../Messages/BriefMessage';

const UserRules = () => {
  const [isAccepted, setIsAccepted] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const { cpf } = useContext(GlobalContext);

  React.useEffect(() => {
    const handleSmoothScroll = (event) => {
      const target = event.target;
      if (
        target.tagName === 'A' &&
        target.getAttribute('href').startsWith('#')
      ) {
        event.preventDefault();
        const elementId = target.getAttribute('href').substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  const handleChange = async (event) => {
    const checked = event.target.checked;
    setIsAccepted(checked);
    console.log('CPF GLOBAL', cpf);
    let currentClientNumberCpf;
    currentClientNumberCpf = formatCpf(cpf);

    let customer = await getDataByField(
      'customer',
      'cpf',
      currentClientNumberCpf
    );
    customer.acceptTerms = checked;
    console.log('Cliente com checked', customer);

    const successUpdate = await updateObjectBySpecificKey(
      'customer',
      'cpf',
      currentClientNumberCpf,
      customer
    );
    if (successUpdate) setSuccessMessage(true);
  };
  return (
    <div className={style.containerRules}>
      {successMessage && (
        <BriefMessage
          setClose={setSuccessMessage}
          message={`O portador do número de CPF ${formatCpf(
            cpf
          )} aceitou os termos de uso da Dragon Computadores`}
          adress="/form"
        />
      )}
      <h2>Regras de Uso para Anunciantes na Plataforma Dragon Computadores</h2>
      <div className={style.navigationLinks}>
        <ul>
          <li>
            <a href="#objetivo">Objetivos</a>
          </li>
          <li>
            <a href="#responsabilidades-anunciante">
              Responsabilidades do Anunciante
            </a>
          </li>
          <li>
            <a href="#uso-plataforma">Uso da Plataforma</a>
          </li>
          <li>
            <a href="#servicos-avaliacao">Serviços de Avaliação</a>
          </li>
          <li>
            <a href="#responsabilidades-dragon">Responsabilidades da Dragon</a>
          </li>
          <li>
            <a href="#penalidades">Penalidades</a>
          </li>
          <li>
            <a href="#vigencia-alteracoes">Vigência e Alterações</a>
          </li>
          <li>
            <a href="#como-funciona">Como funciona</a>
          </li>
        </ul>
      </div>

      <ul id="objetivo">
        1. Objetivo:
        <li>
          Estabelecer as diretrizes e resposabilidades dos anunciantes que
          utilizam a plataforma da Dragon Computadores para divulgar e vender
          computadores usados.
        </li>
      </ul>
      <ul id="responsabilidades-anunciante">
        2. 2. Responsabilidades do Anunciante:
        <li>
          Veracidade das Informações: Todas as informações e imagens publicadas
          nos anúncios são de responsabilidade exclusiva do anunciante. A Dragon
          Computadores não se responsabiliza por dados incorretos ou enganosos.
        </li>
        <li>
          Atualização do Anúncio: O anunciante deve informar imediatamente a
          Dragon Computadores caso o item anunciado já tenha sido vendido por
          outros meios ou se não deseja mais disponibilizá-lo para venda.
          Anúncios desatualizados serão removidos após notificação.
        </li>
        <li>
          Avaliação Pós-Venda: Caso o item seja vendido através da plataforma, o
          anunciante deve trazer o computador para avaliação pela Dragon
          Computadores, conforme acordado previamente.
        </li>
      </ul>
      <ul id="uso-plataforma">
        3. Uso da Plataforma:
        <li>
          A Dragon Computadores disponibiliza a plataforma como um serviço de
          intermediação e será a única responsável por intermediar a comunicação
          e negociação entre anunciantes e compradores. Não haverá contato
          direto entre as partes.
        </li>
        <li>
          Restrição de Produtos: Apenas computadores que foram originalmente
          vendidos pela Dragon Computadores podem ser anunciados e
          comercializados na plataforma. É proibido anunciar produtos de outras
          marcas ou origens, ou qualquer item que não seja relacionado a
          computadores.
        </li>
      </ul>
      <ul id="servicos-avaliacao">
        4. Serviços de Avaliação:
        <li>
          A Dragon Computadores oferece o serviço de avaliação das condições dos
          equipamentos como parte do processo de venda.
        </li>
        <li>
          Itens de Armazenamento (HDs, SSDs, etc.): Por se tratarem de itens com
          vida útil limitada, não garantimos o funcionamento ou a durabilidade
          de itens de armazenamento. A avaliação desses itens será feita com
          base em testes técnicos, mas sem qualquer garantia futura.
        </li>
      </ul>
      <ul id="responsabilidades-dragon">
        5. Responsabilidade da Dragon Computadores:
        <li>
          A Dragon Computadores atua como facilitadora, oferecendo a plataforma
          para divulgação dos anúncios e intermediando todo o processo de
          negociação, mas não se responsabiliza por: Qualquer problema
          relacionado à condição do produto anunciado (danos, defeitos, etc.),
          exceto conforme avaliado e informado durante o processo de avaliação.
          Conteúdo publicado pelos anunciantes (informações, imagens, etc.).
        </li>
      </ul>
      <ul id="penalidades">
        6. Penalidades por Descumprimento:
        <li>
          Anúncios que violarem estas regras, incluindo a divulgação de produtos
          não vendidos originalmente pela Dragon Computadores, serão removidos
          sem aviso prévio.
        </li>
        <li>
          Anunciantes que descumprirem as regras de forma reiterada poderão ter
          o acesso à plataforma suspenso ou bloqueado permanentemente.
        </li>
      </ul>
      <h2>7. Aceitação das Regras:</h2>
      <p>
        Ao utilizar a plataforma, o anunciante declara estar ciente e de acordo
        com todas as regras aqui estabelecidas, assumindo total responsabilidade
        pelo conteúdo de seus anúncios e pelas obrigações descritas.
      </p>
      <h2 id="vigencia-alteracoes">8. Vigência e Alterações:</h2>
      <p>
        Estas regras entram em vigor a partir da data de publicação e podem ser
        alteradas a qualquer momento pela Dragon Computadores, com aviso prévio
        aos usuários.
      </p>
      <h2>Revenda Oficial – Venda seu Computador Usado!</h2>
      <p>
        Se você comprou um computador na Dragon Computadores e deseja
        revendê-lo, agora ficou mais fácil! Criamos um espaço exclusivo para
        nossos clientes anunciarem seus equipamentos usados diretamente em nosso
        site.
      </p>
      <h2 id="como-funciona">Como funciona?</h2>
      <p>1 Você cadastra seu computador para revenda.</p>
      <p>2 Nós anunciamos para milhares de compradores em potencial.</p>
      <p>
        3 Quando a venda for concluída,{' '}
        <span style={{ fontWeight: 'bold' }}>
          cobramos uma taxa de 20% sobre o valor final do anúncio, o total da
          venda menos os 20% da taxa de serviço se torna crédito para a compra
          de outros produtos na Dragon Computadores.
        </span>
      </p>
      <h2>Termo de Reconhecimento</h2>
      <p>
        Ao cadastrar seu computador para revenda, você reconhece e concorda que
        <span style={{ fontWeight: 'bold' }}>
          20% do valor total da venda serão descontados automaticamente
        </span>{' '}
        como taxa de serviço. Esse valor cobre os custos de divulgação,
        intermediação e suporte durante a negociação.
      </p>
      <h2>Quer revender seu computador Dragon? Anuncie agora!</h2>
      <div className={style.acceptTerms}>
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          checked={isAccepted}
          onChange={handleChange}
        />

        <label htmlFor="acceptTerms" style={{ fontWeight: 'bold' }}>
          Eu aceito os termos de uso para publicar o meu computador na vitrine
          da Dragon Computadores
        </label>
      </div>
    </div>
  );
};
export default UserRules;
