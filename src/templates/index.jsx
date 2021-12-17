import "./styles.css";

import { Component } from "react";

import { loadPostsAndPhotos } from "../utils/load-posts-photos";

import { Posts } from "../components/Posts";
import { Button } from "../components/button";
import { TextInput } from "../components/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerpage: 5,

    //crio essa chave para manipulando o evento, e coloco como vazia justamente pra checar isso com uma função, se está vazio
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPostsAndPhotos();
  }

  loadPostsAndPhotos = async () => {
    const { page, postsPerpage } = this.state;

    const postAndPhotos = await loadPostsAndPhotos();

    this.setState({
      posts: postAndPhotos.slice(page, postsPerpage),
      allPosts: postAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerpage, allPosts, posts } = this.state;

    const nextPage = page + postsPerpage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerpage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  //sempre que vamos manipular um evento sempre escrevemos "handle" + algum outro nome como padrão
  //esse handleChange recebe o evento
  handleChange = (e) => {
    //quero receber desse evento o value, então faço destructor , pego o target do evento, só que tbm quero jogar isso no state, então crio uma chave para isso
    const { value } = e.target;

    //aqui eu seto o valor da minha chave state, no caso, ela vai receber o value
    this.setState({ searchValue: value });
  };

  render() {
    //pego o searchValue e jogo ele no estado do elemento, que está no componente TextInput "value={searchValue}"
    const { posts, page, postsPerpage, allPosts, searchValue } = this.state;

    const noMorePosts = page + postsPerpage >= allPosts.length;

    //como não podemos manipular o estado, pq dessa forma não teriamos os posts de volta quando fossemos filtrar os posts, já que eles estão salvos na memoria em states na chave allPosts, só poderiamos manipular caso eles viessem de uma api

    //então aqui criamos uma variavel "filteredPosts" e então vamos colocar ela aonde anteriormente usavamos posts, então vamos fazer uma confição, se "!!" estiver alguma coisa em "searchValue" um valor que deixe ele true "?" execute "allPosts.filter" se não : posts
    const filteredPosts = !!searchValue
      ? //aqui uso o metodo filter() para filtrar os posts de allPosts, no caso o post no singular já que é cada post de allPosts
        allPosts.filter((post) => {
          //então eu retorno os titulos de post, uso o metodo toLowerCase() para dessa forma pegar o titilo de cada pots e converter pra minusculo para garantir que mesmo que tenha letra maiuscula ela vai ser sempre minuscula na hora da busca, uso o metodo includes() para incluir dentro o "searchValue.toLowerCase()" ou seja o que eu digitar no search tbm em minusculo
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : //se não tiver nenhum valor no input "searchValue" ou seja, se eu não buscar nada no input ele vai me retorar os posts
        posts;
    return (
      /*
      avaliação de curto-circuito (short-circuit)
      coloquei duas !! para o searchValue ou seja se essa string estiver vazia isso vai ser false, se for uma string que tem um valor é true, ou seja se escrevermos algo para buscar no input search o valor vai ser verdadeiro, e com os && significa que se "searchValue" for verdadeiro executa o que vem depois do &&, com isso lá no input sempre que eu escrever algo vai mostrar o que tem dentro do h1 é isso ocorre pq estamos manipulando o estado "searchValue" a partir do que estamos digitando no input
      {!!searchValue && <h1>Oque voçê buscar é ?: {searchValue}</h1>}



      já mais ali em baixo usei 
      */
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Oque voçê buscar é ?: {searchValue}</h1>}

          <TextInput
            //
            searchValue={searchValue}
            //
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <>
            <Posts posts={filteredPosts} />
          </>
        )}
        {filteredPosts.length === 0 && (
          <>
            <p>Não existem posts =( </p>
          </>
        )}

        <div className="btn-container">
          {!searchValue && (
            // já aqui iremos fazer outra avaliação de short-circuit, mas aqui vai ser diferente com apenas 1 "!" isso significa que, se não tiver busca "!searchValue" execute o que vem depois do &&, ou seja, se a gente não buscar nada no input search ai o botão fica visivel, se a gente digitar o botão some
            <Button
              text="Mais Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
