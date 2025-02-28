import style from '../../assets/style/UserRules.module.scss';

const UserRules = () => {
  return (
    <div className={style.containerRules}>
      <h2>Regras de Uso para Anunciantes na Plataforma Dragon Computadores</h2>

      <ul>
        1. Objetivo:
        <li>
          Estabelecer as diretrizes e reslionsabilidades dos anunciantes que
          utilizam a plataforma da Dragon Computadores para divulgar e vender
          computadores usados.
        </li>
        li
      </ul>
      <ul>
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
      <ul>
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
      <ul>
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
      <ul>
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
      <ul>
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
      <h2>8. Vigência e Alterações:</h2>
      <p>
        Estas regras entram em vigor a partir da data de publicação e podem ser
        alteradas a qualquer momento pela Dragon Computadores, com aviso prévio
        aos usuários.
      </p>
      <div className={style.acceptTerms}>
        <input type="checkbox" id="acceptTerms" name="acceptTerms" />
        <label htmlFor="acceptTerms">
          Eu aceito os termos de uso para publicar o meu computador na vitrine
          da Dragon Computadores
        </label>
      </div>
    </div>
  );
};
export default UserRules;
