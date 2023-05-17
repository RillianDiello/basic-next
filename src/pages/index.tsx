import SEO from '../components/SEO';
import styles from '../styles/Home.module.scss';

/**
 * Paginas Criadas no lado do servidor
 * São paginas que são geradas pelo servidor do Next, ou seja quando a pagina
 * vai ser carregada, o Next gera tudo que é necessário (html, css, js) no servidor
 * e retorna a pagina pronta.
 * Isso faz com que a pagina so seja carregada quando todos os dados estiverem prontos
 */

export default function Home() {
  return (
    <>
      <SEO title="Dev News" excludTitleSufix />
      <main className={styles.content}>
        <section className={styles.section}>
          <span>Olá Dev</span>
          <h1>
            Bem vindo ao <br />
            <span>Dev</span>News
          </h1>
          <p>
            Um blog com conteudos de <span>Desenvolvimento</span>
          </p>
        </section>
        <img src="/home.svg" alt="Home Image" />
      </main>
    </>
  );
}
