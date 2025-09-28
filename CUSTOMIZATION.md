# Guia de Personalização - Site Gestão Empresarial

Este guia contém instruções detalhadas para personalizar o site de acordo com suas necessidades específicas.

## 🎨 Personalização Visual

### Alterando Cores

#### Cores Principais
No arquivo `assets/css/style.css`, localize a seção `:root` e modifique:

```css
:root {
  /* Cores principais */
  --primary-color: #f97316;      /* Cor principal (laranja) */
  --primary-dark: #ea580c;       /* Versão escura da cor principal */
  --secondary-color: #10b981;    /* Cor secundária (verde) */
  --accent-color: #3b82f6;       /* Cor de destaque (azul) */
  
  /* Cores de fundo */
  --bg-color: #ffffff;           /* Fundo principal (tema claro) */
  --bg-secondary: #f8fafc;       /* Fundo secundário */
  --bg-tertiary: #e2e8f0;        /* Fundo terciário */
  
  /* Cores de texto */
  --text-color: #1e293b;         /* Texto principal */
  --text-secondary: #64748b;     /* Texto secundário */
  --text-muted: #94a3b8;         /* Texto esmaecido */
}
```

#### Tema Escuro
Para personalizar o tema escuro, modifique:

```css
[data-theme="dark"] {
  --bg-color: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --text-color: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-muted: #64748b;
}
```

### Alterando Fontes

#### Fonte Principal
Para alterar a fonte, modifique no `<head>` do HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

E no CSS:
```css
:root {
  --font-family: 'SuaFonte', sans-serif;
}
```

#### Tamanhos de Fonte
```css
:root {
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
}
```

## 📝 Personalizando Conteúdo

### Informações da Empresa

#### Título e Descrição Principal
No arquivo `index.html`, localize a seção hero:

```html
<h1 class="hero__title">
    <span class="typewriter">Gestão Empresarial Completa</span>
</h1>
<p class="hero__description">
    Software profissional desenvolvido em WPF com padrão MVVM 
    para gerenciar vendas, ordens de serviço, cadastros e 
    relatórios da sua empresa.
</p>
```

#### Efeito Typewriter
Para alterar os textos do efeito typewriter, modifique no `assets/js/script.js`:

```javascript
const texts = [
    'Seu Texto 1',
    'Seu Texto 2',
    'Seu Texto 3',
    'Seu Texto 4'
];
```

### Funcionalidades

#### Adicionando Nova Funcionalidade
Para adicionar uma nova funcionalidade, copie este modelo:

```html
<div class="feature-card">
    <div class="feature-card__icon">
        <i class="fas fa-seu-icone"></i>
    </div>
    <h3 class="feature-card__title">Nome da Funcionalidade</h3>
    <p class="feature-card__description">
        Descrição detalhada da funcionalidade e seus benefícios.
    </p>
    <span class="feature-card__tag">CATEGORIA</span>
</div>
```

#### Categorias de Tags
- `ESSENCIAL` - Funcionalidades básicas
- `PROFISSIONAL` - Funcionalidades avançadas
- `BÁSICO` - Funcionalidades simples
- `AVANÇADO` - Funcionalidades complexas
- `ÚTIL` - Funcionalidades auxiliares
- `ANALÍTICO` - Funcionalidades de análise
- `CONTROLE` - Funcionalidades de controle
- `VERSÃO PRO` - Funcionalidades premium

### Planos e Preços

#### Alterando Preços
Localize a seção de planos e modifique:

```html
<div class="plan-card__price">
    <span class="plan-card__currency">R$</span>
    <span class="plan-card__amount">497</span>
    <span class="plan-card__period">pagamento único</span>
</div>
```

#### Adicionando/Removendo Recursos
Para cada plano, você pode adicionar ou remover recursos:

```html
<!-- Recurso incluído -->
<div class="plan-card__feature">
    <i class="fas fa-check"></i>
    <span>Nome do recurso</span>
</div>

<!-- Recurso não incluído -->
<div class="plan-card__feature plan-card__feature--disabled">
    <i class="fas fa-times"></i>
    <span>Nome do recurso</span>
</div>

<!-- Recurso Pro -->
<div class="plan-card__feature plan-card__feature--pro">
    <i class="fas fa-check"></i>
    <span>Nome do recurso</span>
</div>
```

## 🖼️ Personalizando Imagens

### Carrossel de Imagens

#### Substituindo Imagens
1. Adicione suas imagens na pasta `assets/images/`
2. Atualize os caminhos no HTML:

```html
<div class="carousel-slide">
    <img src="assets/images/sua-imagem.png" alt="Descrição" class="carousel-image">
    <div class="carousel-caption">
        <h3>Título da Imagem</h3>
        <p>Descrição da funcionalidade</p>
    </div>
</div>
```

3. Atualize as thumbnails:

```html
<div class="thumbnail" data-slide="0">
    <img src="assets/images/sua-imagem.png" alt="Thumbnail">
</div>
```

#### Adicionando Mais Slides
Para adicionar um novo slide:

1. Adicione o slide no carrossel
2. Adicione um indicador
3. Adicione uma thumbnail
4. Atualize o JavaScript se necessário

### Imagem Hero
Para alterar a imagem principal da seção hero, substitua o arquivo ou modifique o CSS:

```css
.hero__image-container {
    background-image: url('caminho/para/sua-imagem.png');
}
```

## 🔗 Personalizando Links

### Links de Contato

#### WhatsApp
```html
<a href="https://wa.me/5562999687459" class="contact__card-link">
    +55 62 99968-7459
</a>
```

#### Email
```html
<a href="mailto:seuemail@dominio.com" class="contact__card-link">
    seuemail@dominio.com
</a>
```

#### YouTube
```html
<a href="https://www.youtube.com/@seucanal" class="btn btn--primary">
    <i class="fab fa-youtube"></i>
    Como Usar
</a>
```

### Links dos Botões de Ação

#### Botões de Planos
Para cada botão de plano, você pode definir diferentes ações:

```html
<!-- Link para WhatsApp -->
<a href="https://wa.me/5562999687459?text=Olá! Gostaria de adquirir o Plano Vitalício" class="btn btn--outline">
    <i class="fas fa-whatsapp"></i>
    Adquirir Plano
</a>

<!-- Link para formulário -->
<a href="https://forms.google.com/seu-formulario" class="btn btn--primary">
    <i class="fas fa-rocket"></i>
    Começar Agora
</a>
```

## ⚙️ Configurações Avançadas

### Velocidade das Animações

#### Carrossel
Para alterar a velocidade do carrossel automático:

```javascript
// No arquivo script.js, localize:
this.autoPlayInterval = setInterval(() => {
    this.nextSlide();
}, 5000); // Altere 5000 para o valor desejado em milissegundos
```

#### Efeito Typewriter
```javascript
let typeSpeed = isDeleting ? 50 : 100; // Velocidade de digitação
typeSpeed = 2000; // Pausa no final
typeSpeed = 500; // Pausa antes do próximo texto
```

### Responsividade

#### Breakpoints
Para alterar os pontos de quebra responsivos:

```css
/* Tablet */
@media (max-width: 768px) {
    /* Estilos para tablet */
}

/* Mobile */
@media (max-width: 480px) {
    /* Estilos para mobile */
}
```

### SEO e Meta Tags

#### Atualizando Meta Tags
No `<head>` do HTML:

```html
<title>Seu Título - Software de Gestão</title>
<meta name="description" content="Sua descrição para SEO">
<meta name="keywords" content="gestão, software, empresa, WPF, MVVM">
<meta property="og:title" content="Seu Título">
<meta property="og:description" content="Sua descrição">
<meta property="og:image" content="url-da-imagem-de-compartilhamento">
```

## 🎯 Dicas de Personalização

### 1. Mantendo a Consistência
- Use sempre as variáveis CSS definidas
- Mantenha o padrão de nomenclatura
- Teste em diferentes dispositivos

### 2. Performance
- Otimize imagens antes de adicionar
- Use formatos modernos (WebP quando possível)
- Mantenha o CSS organizado

### 3. Acessibilidade
- Mantenha os atributos `alt` nas imagens
- Use cores com contraste adequado
- Teste a navegação por teclado

### 4. Backup
- Sempre faça backup antes de modificações
- Use controle de versão (Git)
- Teste as alterações localmente

## 📞 Suporte

Se precisar de ajuda com personalizações mais avançadas, entre em contato através dos canais disponíveis no site.

---

**Lembre-se**: Sempre teste suas modificações em diferentes navegadores e dispositivos antes de publicar!

