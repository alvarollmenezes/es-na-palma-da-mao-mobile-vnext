# DOCUMENTAÇÃO DO ESPM-DEVKIT
Bem vindo à documentação do Kit de Desenvolvimento do *app mobile* do projeto Espírito Santo na Palma da Mão. Esperamos que encontre o que precisa para colaborar de forma eficiente com o projeto.

## SUMÁRIO

- [COMPONENTES](#componentes)
    - [module-page](#module-page)
    - [module-index](#module-index)
    - [nav-header](#nav-header)
    - [nav-title](#nav-title)
    - [main-footer-bar](#main-footer-bar)
    - [large-button](#large-button)
- [ÍCONES](#ícones)

## COMPONENTES

Documentação dos componentes básicos de desenvolvimento do app ESPM.  

Para a demonstração do uso dos componentes, vamos utilizar uma versão fictícia do módulo "Detran", com as páginas `detran-service` e `vehicles`. Com isso em mente, substitua as referências deste módulo para o contexto que estiver sendo trabalhado por você.

**Atenção!** Para utilizar cada um dos componentes a seguir, é necessário antes fazer o respectivo *import* no módulo da página, conforme exemplo abaixo.

<blockquote>

Em `detran-service.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetranServicePage } from './detran-service';

/*
    Importe o módulo do componente desejado. (aqui temos o module-index, que veremos mais à frente).
    Obs.: Todos os componentes podem ser importados deste mesmo caminho: '@espm/shared/components'
*/
import { ModuleIndexComponentModule  } from '@espm/shared/components';

@NgModule({
  declarations: [
    DetranServicePage,
  ],
  imports: [
    IonicPageModule.forChild(DetranServicePage),
    ModuleIndexComponentModule /* Declare o módulo do componente importado nos imports do módulo da página. IMPORTANTE! */
  ],
})
export class DetranServicePageModule {}
```
Obs.: Este procedimento também pode ser realizado para importar um componente para dentro de outro.

<br></blockquote>
___

### module-page

#### Descrição
O `module-page` é um componente que serve de *template* para as páginas do ESPM, podendo ser utilizado para desenvolver qualquer funcionalidade de forma simples, uma vez que já vem formatado e contém o cabeçalho e rodapé padrões do app. Utilize-o para garantir que estará seguindo a identidade visual do app.

#### Parâmetros que o componente recebe
|Parâmetro|Tipo|Descrição|
|-|-|-|
|title|`string`|Título da página.|

#### Diretivas que podem ser utilizadas numa `module-page`
|Diretiva|Descrição|
|-|-|
|no-header|Oculta todo o cabeçalho da página.|
|no-footer|Oculta o rodapé da página.|
|no-scroll|Bloqueia a rolagem do conteúdo da página.|

#### Diretivas que podem ser utilizadas nos elementos filhos de uma `module-page` (em qualquer nível de hierarquia)
|Diretiva|Descrição|
|-|-|
|separator|Ao utilizar em um `<span>`, cria uma linha divisória, útil para separar as seções de uma mesma tela.|
|shadow|Pode ser utilizado em qualquer elemento filho. Irá criar uma pequena sombra, dando o efeito de profundidade baseado no [Material Design](https://material.io/design/).|

#### Como usar este componente
<blockquote>

No `.html` da sua página:
- Uso básico

```html
<!-- Insira as tags do componente e atribua o valor do parâmetro title.  -->
<module-page
    [title]="'Detran ES'">
    <!-- Coloque seu conteúdo aqui. Por exemplo: -->
    <p>Olá, Espírito Santo!</p>
</module-page>
```

- Com as diretivas
```html
<!-- Para usar as diretivas, basta adicioná-las, em qualquer ordem e combinação. -->
<module-page
    [title]="'Detran ES'"
    no-header
    no-footer
    no-scroll>
    <p>Olá, Espírito Santo!</p>

    <!-- Para criar um separador, siga a linha a seguir: -->
    <span separator shadow></span>
</module-page>
```
<br></blockquote>

#### Resultado
TODO: Adicionar imagens.
[<div style="text-align: right;">voltar para o topo</div>](#sumário)
___

### module-index

#### Descrição
O `module-index` é um componente que, utilizando o [`module-page`](#module-page), oferece a possiblidade de criar um índice ou página inicial para um determinado módulo, apenas especificando os títulos e ações. Útil principalmente quando houver múltiplas funcionalidades em um mesmo módulo.

#### Parâmetros que o componente recebe
|Parâmetro|Tipo|Descrição|
|-|-|-|
|title|`string`|Título da página.|
|icon|`string`|Ícone que será exibido no banner central.|
|menus|`Array`|Lista de títulos e páginas que os botões irão abrir.

#### Como usar este componente
<blockquote>

No `.html` da sua página:
```html
<!--
    Basta inserir as tags do componente e atribuir os valores dos parâmetros. E só.

    Atenção! Para inserir diretamente as strings no .html, é necessário colocar tanto as aspas duplas, quanto as aspas simples. Para fazer referência a uma variável, omita as aspas.
-->
<module-index
    [title]="'Detran ES'"
    [icon]="'custom-modulo-taxi'"
    [menus]=menusList>
    <!-- Obs.: Este componente não aceita a inserção de outros elementos em seu conteúdo. -->
</module-index>
```
No `.ts` da sua página:
```typescript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'detran-service',
  templateUrl: 'detran-service.html'
})
export class DetranServicePage {
    /* Defina e atribua os valores à variável 'menusList' */
    menusList = [
        {
            buttonTitle: "CNH",
            targetPage: "DriverLicenseStatusPage"
            /* targetPage deve ser o nome da classe que representa a página */
        },
        {
            buttonTitle: "Meus Veículos",
            targetPage: "VehiclesPage"
        }
    ];

    constructor() {}
}
```
<br></blockquote>

#### Resultado
TODO: Adicionar imagens.
[<div style="text-align: right;">voltar para o topo</div>](#sumário)
___

### nav-header

#### Descrição
O `nav-header` é a barra de navegação padrão do ESPM, ela já conta com o botão de navegação "voltar".

#### Parâmetros que o componente recebe

|Parâmetros|Tipo|Descrição|
|-|-|-|
|title|`string`|Título da página.|

#### Como usar

<blockquote>

No `.html` da sua página ou componente:
```html
<!-- Insira as tags do componente e atribua o título desejado. -->
<nav-header
    [title]="'Detran ES'"
></nav-header>
```
<br></blockquote>

#### Resultado
TODO: Adicionar imagens.
[<div style="text-align: right;">voltar para o topo</div>](#sumário)
___
### nav-title

#### Descrição
O `nav-title` é o componente responsável por, de fato, exibir e formatar o título das páginas do ESPM, sendo usado pelo [`nav-header`](#nav-header) e podendo ser usado de forma independente, caso seja conveniente.

#### Parâmetros que o componente recebe

|Parâmetros|Tipo|Descrição|
|-|-|-|
|title|`string`|Título da página.|

#### Classes modificadoras
|Classe|Descrição|
|-|-|
|sign-primary|Deixa o sinal no canto na cor azul.|
|sign-secondary|Deixa o sinal no canto na cor rosa. (padrão)|
|sign-white|Deixa o sinal no canto na cor branca.|
|content-primary|Deixa o texto do título na cor azul. (padrão)|
|content-white|Deixa o texto do título na cor branca.|

#### Como usar

<blockquote>

No `.html` da sua página ou componente:
- Uso padrão
```html
<!-- Insira as tags do componente e atribua o título desejado. -->
<nav-title
    [title]="'Detran ES'"
></nav-title>
```
- Uso com as classes modificadoras
```html
<!-- Insira as classes como em qualquer elemento html. -->
<nav-title
    [title]="'Detran ES'"
    class="sign-primary content-white"
></nav-title>
```
<br></blockquote>

#### Resultado
TODO: Adicionar imagens.
[<div style="text-align: right;">voltar para o topo</div>](#sumário)
___
### main-footer-bar
blabla

#### Parâmetros que o componente recebe

|Parâmetros|Tipo|Descrição|
|-|-|-|
||||

#### Diretivas

#### Como usar

#### Resultado

<blockquote>
bla
<br></blockquote>

[<div style="text-align: right;">voltar para o topo</div>](#sumário)
___
### large-button
blabla

#### Parâmetros que o componente recebe

|Parâmetros|Tipo|Descrição|
|-|-|-|
||||

#### Diretivas

#### Como usar

#### Resultado

<blockquote>
bla
<br></blockquote>

[<div style="text-align: right;">voltar para o topo</div>](#sumário)
___

## ÍCONES
Como adicionar novos ícones.  
Ícones já disponíveis pra usar no projeto.

[<div style="text-align: right;">voltar para o topo</div>](#sumário)